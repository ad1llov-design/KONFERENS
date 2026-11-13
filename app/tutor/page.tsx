'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Send, ArrowLeft, Bot, User, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { getCourse, getLesson } from '@/lib/data/courses';
import type { CourseId, TutorMessage, TutorContext } from '@/lib/types';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getWelcomeMessages(cId: CourseId, lId: string | null): TutorMessage[] {
  const c = getCourse(cId);
  const l = lId ? getLesson(cId, lId) : null;
  const topic = l ? `the lesson "${l.title}"` : c?.title ?? 'this course';
  return [
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm your AI tutor for **${c?.title ?? 'this course'}**. I'm here to help you understand ${topic} — ask me anything, and I'll explain it clearly. I'll give you hints rather than just handing over answers straight away.\n\nWhat would you like to know?`,
      createdAt: new Date().toISOString(),
    },
  ];
}

function TutorChatInner() {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('course') as CourseId | null;
  const lessonIdParam = searchParams.get('lesson');

  const course = courseIdParam ? getCourse(courseIdParam) : null;
  const lesson = courseIdParam && lessonIdParam ? getLesson(courseIdParam, lessonIdParam) : null;

  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiDemoMode, setAiDemoMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    if (courseIdParam) {
      const saved = DemoState.getTutorMessages(courseIdParam);
      setMessages(saved.length > 0 ? saved : getWelcomeMessages(courseIdParam, lessonIdParam));
    }
  }, [courseIdParam, lessonIdParam]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading || !courseIdParam) return;
    setError(null);

    const userMsg: TutorMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    const level = DemoState.getLevel(courseIdParam);
    const ctx: TutorContext = {
      courseId: courseIdParam,
      courseName: course?.title ?? courseIdParam,
      level,
      lessonId: lessonIdParam ?? undefined,
      lessonTitle: lesson?.title,
      stageName: undefined,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    if (courseIdParam) DemoState.addTutorMessage(courseIdParam, userMsg);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          context: ctx,
          history: updatedMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `API error ${res.status}`);
      }

      const data = await res.json() as { message: string; isDemo: boolean };
      setAiDemoMode(data.isDemo);

      const assistantMsg: TutorMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        createdAt: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);
      if (courseIdParam) DemoState.addTutorMessage(courseIdParam, assistantMsg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to get a response';
      setError(msg);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 w-full flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {courseIdParam && (
            <Link
              href={lesson ? `/courses/${courseIdParam}/learn/${lessonIdParam}` : `/courses/${courseIdParam}/learn`}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to {lesson ? 'lesson' : 'path'}
            </Link>
          )}
          <div className="ml-auto flex items-center gap-2">
            {aiDemoMode && <Badge variant="demo">Demo AI</Badge>}
            {course && <Badge variant="accent">{course.title}</Badge>}
            {lesson && <Badge variant="muted">{lesson.title}</Badge>}
          </div>
        </div>

        {aiDemoMode && (
          <div className="mb-4">
            <DemoBanner message="AI responses are pre-written demos. Set OPENAI_API_KEY to enable the real tutor." missingVars={['OPENAI_API_KEY']} />
          </div>
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col glass rounded-[var(--r-xl)] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 min-h-[400px] max-h-[60vh]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={['flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : ''].join(' ')}
              >
                {/* Avatar */}
                <div className={[
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1',
                  msg.role === 'assistant' ? 'bg-accent-light' : 'bg-background border border-border',
                ].join(' ')}>
                  {msg.role === 'assistant'
                    ? <Bot className="h-4 w-4 text-accent" />
                    : <User className="h-3.5 w-3.5 text-muted" />
                  }
                </div>

                {/* Bubble */}
                <div className={[
                  'max-w-[75%] rounded-[var(--r-lg)] px-4 py-3 text-sm leading-relaxed',
                  msg.role === 'assistant'
                    ? 'bg-surface border border-border text-foreground rounded-tl-[var(--r-xs)]'
                    : 'bg-accent text-white rounded-tr-[var(--r-xs)]',
                ].join(' ')}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={[
                    'text-xs mt-1.5 opacity-60',
                    msg.role === 'user' ? 'text-right' : '',
                  ].join(' ')}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-accent-light flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-accent" />
                </div>
                <div className="bg-surface border border-border rounded-[var(--r-lg)] rounded-tl-[var(--r-xs)] px-4 py-3">
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-muted rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm text-danger bg-danger-light border border-danger/20 rounded-[var(--r-md)] px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-xs underline underline-offset-2 hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            {!courseIdParam && (
              <p className="text-sm text-muted text-center mb-3">
                Open the tutor from a course lesson for context-aware answers.{' '}
                <Link href="/courses" className="text-accent underline underline-offset-2">Go to courses</Link>
              </p>
            )}
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={courseIdParam ? "Ask anything about this lesson…" : "Select a course to start"}
                disabled={!courseIdParam || loading}
                rows={2}
                className="flex-1 resize-none px-4 py-3 rounded-[var(--r-md)] border border-border bg-surface text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:opacity-50 leading-relaxed"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || loading || !courseIdParam}
                loading={loading}
                className="shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted mt-2 text-center">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-sm text-muted">Loading tutor…</span></div>}>
      <TutorChatInner />
    </Suspense>
  );
}
