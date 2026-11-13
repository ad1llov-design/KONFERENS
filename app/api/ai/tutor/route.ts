import { type NextRequest, NextResponse } from 'next/server';
import { isOpenAIConfigured } from '@/lib/env';
import type { TutorContext } from '@/lib/types';

// ─── Input validation ────────────────────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 12;

interface TutorRequestBody {
  message: string;
  context: TutorContext;
  history?: Array<{ role: string; content: string }>;
}

function validateBody(body: unknown): body is TutorRequestBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.message === 'string' &&
    b.message.trim().length > 0 &&
    b.message.length <= MAX_MESSAGE_LENGTH &&
    typeof b.context === 'object' &&
    b.context !== null
  );
}

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(ctx: TutorContext): string {
  const lines = [
    'You are a helpful, encouraging AI tutor on the Kivora learning platform.',
    `The student is studying: ${ctx.courseName}.`,
    `Their current level: ${ctx.level}.`,
  ];
  if (ctx.lessonTitle) {
    lines.push(`They are currently working on the lesson: "${ctx.lessonTitle}".`);
  }
  if (ctx.stageName) {
    lines.push(`This lesson is part of the stage: "${ctx.stageName}".`);
  }
  lines.push(
    '',
    'Your rules:',
    '- Explain clearly and concisely, matched to the student\'s level.',
    '- When a student is struggling with an exercise, give a helpful hint rather than the full answer.',
    '- Only provide the full solution if the student has clearly tried and asks explicitly after several attempts.',
    '- Do not claim to have read the student\'s full course notes or progress data unless it was provided to you here.',
    '- Do not make up facts, citations, or external resources.',
    '- Keep responses focused; avoid unnecessary preamble.',
    '- Respond in the same language the student uses to write to you.',
    '- If a question is completely unrelated to the subject, politely redirect.',
  );
  return lines.join('\n');
}

// ─── Demo responses ───────────────────────────────────────────────────────────

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "Great question! This is a **demo response** because the OpenAI API key isn't configured yet.\n\nIn the real version, I'd give you a tailored explanation based on your course, level, and the specific question you asked. Set `OPENAI_API_KEY` in your `.env.local` file to enable live AI responses.",
  python:
    "In Python, **variables** are like labelled containers — you give a value a name so you can use it later.\n\n```python\nname = \"Alice\"  # str\nage  = 22       # int\n```\n\nThis is a **demo response**. Set `OPENAI_API_KEY` to get real, context-aware answers.",
  english:
    "Great question about English! In a live session, I'd explain the grammar rule step by step, give you an example, and check your understanding.\n\nThis is a **demo response**. Set `OPENAI_API_KEY` to enable the real AI tutor.",
};

function getDemoResponse(ctx: TutorContext): string {
  if (ctx.courseId === 'python-fundamentals') return DEMO_RESPONSES.python;
  if (ctx.courseId === 'english-a1-a2') return DEMO_RESPONSES.english;
  return DEMO_RESPONSES.default;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: 'Invalid request. Required: message (max 1000 chars), context (object).' },
      { status: 400 }
    );
  }

  const { message, context, history = [] } = body;

  // ── Demo mode ──────────────────────────────────────────────────────────────
  if (!isOpenAIConfigured()) {
    // Simulate a short delay so the UI feels responsive
    await new Promise(r => setTimeout(r, 600));
    return NextResponse.json({
      message: getDemoResponse(context),
      isDemo: true,
    });
  }

  // ── Real OpenAI call ───────────────────────────────────────────────────────
  try {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = buildSystemPrompt(context);

    // Sanitise and limit history
    const sanitisedHistory = history
      .slice(-MAX_HISTORY_MESSAGES)
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: String(m.content).slice(0, 2000),
      }));

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      temperature: 0.6,
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitisedHistory,
        { role: 'user', content: message },
      ],
    });

    const responseText = completion.choices[0]?.message?.content?.trim();
    if (!responseText) {
      return NextResponse.json({ error: 'Empty response from AI provider' }, { status: 502 });
    }

    return NextResponse.json({
      message: responseText,
      isDemo: false,
      tokensUsed: completion.usage?.total_tokens,
    });
  } catch (err: unknown) {
    // Don't expose internal error details to the client
    console.error('[AI Tutor] OpenAI error:', err instanceof Error ? err.message : err);

    const isQuota = err instanceof Error && err.message.includes('429');
    return NextResponse.json(
      {
        error: isQuota
          ? 'AI provider rate limit reached. Please try again in a moment.'
          : 'AI provider is temporarily unavailable. Please try again.',
      },
      { status: 503 }
    );
  }
}
