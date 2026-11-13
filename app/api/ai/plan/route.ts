import { type NextRequest, NextResponse } from 'next/server';
import { isOpenAIConfigured } from '@/lib/env';
import { getCourse, getAllLessons } from '@/lib/data/courses';
import type { CourseId, LearningPlan, UserLevel, LearningPlanWeek } from '@/lib/types';

const VALID_COURSE_IDS: CourseId[] = ['python-fundamentals', 'english-a1-a2'];

interface PlanRequestBody {
  courseId: CourseId;
  level: UserLevel;
  weeklyMinutes?: number;
  goal?: string;
}

function generateDefaultPlan(courseId: CourseId, level: UserLevel, weeklyMinutes: number): LearningPlan {
  const course = getCourse(courseId);
  const stages = course?.stages ?? [];

  const weeks: LearningPlanWeek[] = stages.map((stage, idx) => ({
    week: idx + 1,
    focus: stage.title,
    stageId: stage.id,
    lessonIds: stage.lessons.map(l => l.id),
    goalSummary: `Complete ${stage.lessons.length} lessons on ${stage.title}: ${stage.description}`,
  }));

  return {
    courseId,
    level,
    weeklyMinutes,
    totalWeeks: weeks.length,
    weeks,
    generatedAt: new Date().toISOString(),
    isAIGenerated: false,
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Request body must be an object' }, { status: 400 });
  }

  const { courseId, level, weeklyMinutes = 60, goal } = body as Partial<PlanRequestBody>;

  if (!courseId || !VALID_COURSE_IDS.includes(courseId)) {
    return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
  }

  const course = getCourse(courseId);
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  const validLevel: UserLevel = level === 'elementary' || level === 'pre-intermediate' ? level : 'beginner';
  const minutes = typeof weeklyMinutes === 'number' && weeklyMinutes > 0 && weeklyMinutes <= 600 ? weeklyMinutes : 60;

  // If OpenAI is not configured, return deterministic verified plan
  if (!isOpenAIConfigured()) {
    const plan = generateDefaultPlan(courseId, validLevel, minutes);
    return NextResponse.json({ plan, isDemo: true });
  }

  try {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const lessons = getAllLessons(courseId);
    const stagesInfo = course.stages.map(s => ({
      id: s.id,
      title: s.title,
      lessons: s.lessons.map(l => ({ id: l.id, title: l.title })),
    }));

    const prompt = `You are a learning plan generator for Kivora.
Create a weekly learning plan for a student taking the course "${course.title}".
Student level: ${validLevel}.
Available study time: ${minutes} minutes/week.
Goal: ${goal || 'Master the course material steadily'}.

Here is the existing curriculum structure:
${JSON.stringify(stagesInfo, null, 2)}

Return ONLY a valid JSON object matching this schema:
{
  "totalWeeks": number,
  "weeks": [
    {
      "week": number,
      "focus": string,
      "stageId": string,
      "lessonIds": string[],
      "goalSummary": string
    }
  ]
}
Each week should assign a subset of the stageId and lessonIds matching the curriculum above.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error('Empty response from AI');
    }

    const parsed = JSON.parse(rawContent) as { totalWeeks?: number; weeks?: LearningPlanWeek[] };

    if (!Array.isArray(parsed.weeks) || parsed.weeks.length === 0) {
      throw new Error('Invalid plan schema from AI');
    }

    const validLessonIds = new Set(lessons.map(l => l.id));
    const validStageIds = new Set(course.stages.map(s => s.id));

    // Validate and sanitize weeks
    const verifiedWeeks: LearningPlanWeek[] = parsed.weeks.map((w, i) => ({
      week: typeof w.week === 'number' ? w.week : i + 1,
      focus: typeof w.focus === 'string' ? w.focus : `Module ${i + 1}`,
      stageId: validStageIds.has(w.stageId) ? w.stageId : course.stages[i % course.stages.length].id,
      lessonIds: Array.isArray(w.lessonIds) ? w.lessonIds.filter(lid => validLessonIds.has(lid)) : [],
      goalSummary: typeof w.goalSummary === 'string' ? w.goalSummary : 'Study assignments',
    }));

    const finalPlan: LearningPlan = {
      courseId,
      level: validLevel,
      weeklyMinutes: minutes,
      totalWeeks: verifiedWeeks.length,
      weeks: verifiedWeeks,
      generatedAt: new Date().toISOString(),
      isAIGenerated: true,
    };

    return NextResponse.json({ plan: finalPlan, isDemo: false });
  } catch (err: unknown) {
    console.error('[AI Plan] Error:', err);
    // Fallback safely to default verified plan
    const fallbackPlan = generateDefaultPlan(courseId, validLevel, minutes);
    return NextResponse.json({ plan: fallbackPlan, isDemo: true, fallback: true });
  }
}
