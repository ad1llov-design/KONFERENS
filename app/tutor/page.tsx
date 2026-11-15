'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Send, ArrowLeft, Bot, User, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { COURSES, getCourse, getLesson } from '@/lib/data/courses';
import { getLocalizedLesson } from '@/lib/data/course-content-localization';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseId, TutorMessage, TutorContext, Locale } from '@/lib/types';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

let msgSequence = 0;
function createMessageId(role: 'user' | 'assistant') {
  msgSequence += 1;
  return `${role}-${msgSequence}`;
}

function getWelcomeMessages(cId: CourseId, lId: string | null, locale: Locale): TutorMessage[] {
  const c = getCourse(cId);
  const rawL = lId ? getLesson(cId, lId) : null;
  const l = rawL ? getLocalizedLesson(cId, rawL, locale) : null;
  const courseLoc = c ? getLocalizedCourse(c, locale) : null;
  const courseTitle = courseLoc?.title ?? c?.title ?? cId;
  const lessonTitle = l ? l.title : null;

  let content = '';
  if (locale === 'ru') {
    content = lessonTitle
      ? `Привет! Я твой персональный AI-наставник по курсу **«${courseTitle}»**.\n\nСейчас мы разбираем урок **«${lessonTitle}»**. Спрашивай о синтаксисе, сложных терминах или логике упражнения — я дам наводящую подсказку и помогу разобраться шаг за шагом!`
      : `Привет! Я твой персональный AI-наставник по курсу **«${courseTitle}»**.\n\nЗадавай любые вопросы по программе, терминам или концепциям — я помогу разложить материал по полочкам!`;
  } else if (locale === 'ky') {
    content = lessonTitle
      ? `Салам! Мен **«${courseTitle}»** курсу боюнча жеке AI-насаатчыңмын.\n\nАзыр биз **«${lessonTitle}»** сабагын өтүп жатабыз. Каалаган сурооңду бер — мен маанисин түшүндүрүп, багыт берип жардам берем!`
      : `Салам! Мен **«${courseTitle}»** курсу боюнча жеке AI-насаатчыңмын.\n\nКурс боюнча каалаган сурооңду бер — мен сизге үйрөнүүгө жардам берем!`;
  } else {
    content = lessonTitle
      ? `Hi! I'm your AI tutor for **${courseTitle}**.\n\nWe're focusing on **"${lessonTitle}"**. Ask me anything about concepts, syntax, or tricky exercises — I'll give hints and clear explanations to guide you forward!`
      : `Hi! I'm your AI tutor for **${courseTitle}**.\n\nAsk me anything about the curriculum, terminology, or practical problems — what would you like to explore?`;
  }

  return [
    {
      id: 'welcome',
      role: 'assistant',
      content,
      createdAt: new Date().toISOString(),
    },
  ];
}

function TutorChatInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('course') as CourseId | null;
  const lessonIdParam = searchParams.get('lesson');

  const { t, locale } = useLanguage();

  const rawCourse = courseIdParam ? getCourse(courseIdParam) : null;
  const course = rawCourse ? getLocalizedCourse(rawCourse, locale) : null;
  const rawLesson = courseIdParam && lessonIdParam ? getLesson(courseIdParam, lessonIdParam) : null;
  const lesson = (rawLesson && courseIdParam) ? getLocalizedLesson(courseIdParam, rawLesson, locale) : null;

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
      setMessages(saved.length > 0 ? saved : getWelcomeMessages(courseIdParam, lessonIdParam, locale));
    }
  }, [courseIdParam, lessonIdParam, locale]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(textToSend?: string) {
    const text = textToSend ?? input;
    if (!text.trim() || loading || !courseIdParam) return;
    setError(null);

    const userMsg: TutorMessage = {
      id: createMessageId('user'),
      role: 'user',
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const level = DemoState.getLevel(courseIdParam);
    const ctx: TutorContext = {
      courseId: courseIdParam,
      courseName: course?.title ?? courseIdParam,
      level,
      lessonId: lessonIdParam ?? undefined,
      lessonTitle: lesson?.title,
      locale,
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
        id: createMessageId('assistant'),
        role: 'assistant',
        content: data.message,
        createdAt: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);
      if (courseIdParam) DemoState.addTutorMessage(courseIdParam, assistantMsg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.common.error;
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

  const starterChips = locale === 'ru'
    ? ['Объясни проще', 'Дай подсказку', 'Проверь моё решение', 'Покажи другой пример', 'Сделай мини-тест']
    : locale === 'ky'
    ? ['Жөнөкөй түшүндүрүп бер', 'Багыт / кеңеш бер', 'Менин чыгарылышымды текшер', 'Башка мисал көрсөт', 'Чакан тест өткөр']
    : ['Explain simply', 'Give me a hint', 'Check my answer', 'Show another example', 'Give me a mini-quiz'];

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full flex flex-col">

        {/* Top Header / Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {courseIdParam ? (
              <Link
                href={lesson ? `/courses/${courseIdParam}/learn/${lessonIdParam}` : `/courses/${courseIdParam}/learn`}
                className="flex items-center gap-1.5 text-xs md:text-sm text-muted hover:text-foreground transition-colors font-medium surface px-3 py-1.5 rounded-[var(--r-sm)] border border-border"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.tutor.backToLesson}
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h1 className="text-xl font-bold text-foreground">{t.nav.tutor}</h1>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {aiDemoMode && <Badge variant="demo">{t.tutor.badgeDemo}</Badge>}
            {course && <Badge variant="accent">{course.title}</Badge>}
            {lesson && <Badge variant="muted">{lesson.title}</Badge>}
          </div>
        </div>

        {/* Course Selector if no course param in URL */}
        {!courseIdParam && (
          <div className="glass rounded-[var(--r-xl)] p-8 mb-6 border border-border/80 shadow-xl">
            <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              {t.tutor.selectCourseHint}
            </h2>
            <p className="text-xs text-muted mb-6">
              Pick any of our 15 tracks to start a guided, level-aware tutoring session.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {COURSES.map(c => {
                const loc = getLocalizedCourse(c, locale);
                return (
                  <button
                    key={c.id}
                    onClick={() => router.push(`/tutor?course=${c.id}`)}
                    className="text-left surface p-3.5 rounded-[var(--r-md)] border border-border/80 hover:border-accent hover:bg-surface-raised transition-all group"
                  >
                    <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                      {loc.title}
                    </p>
                    <span className="text-[11px] text-muted">{loc.level}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {aiDemoMode && (
          <div className="mb-4">
            <DemoBanner message={t.tutor.demoBannerText} missingVars={['OPENAI_API_KEY']} />
          </div>
        )}

        {/* Chat Window */}
        {courseIdParam && (
          <div className="flex-1 flex flex-col glass rounded-[var(--r-xl)] border border-border/80 shadow-2xl overflow-hidden min-h-[460px]">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 max-h-[58vh]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={['flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : ''].join(' ')}
                >
                  {/* Avatar */}
                  <div className={[
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1',
                    msg.role === 'assistant' ? 'bg-accent/15 border border-accent/25 text-accent' : 'bg-surface border border-border text-foreground',
                  ].join(' ')}>
                    {msg.role === 'assistant'
                      ? <Bot className="h-4 w-4" />
                      : <User className="h-4 w-4" />
                    }
                  </div>

                  {/* Bubble */}
                  <div className={[
                    'max-w-[80%] rounded-[var(--r-lg)] px-4 py-3 text-sm leading-relaxed shadow-sm',
                    msg.role === 'assistant'
                      ? 'bg-surface border border-border text-foreground rounded-tl-[var(--r-xs)]'
                      : 'bg-accent text-white rounded-tr-[var(--r-xs)]',
                  ].join(' ')}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p className={[
                      'text-[10px] mt-1.5 opacity-60 font-mono',
                      msg.role === 'user' ? 'text-right' : '',
                    ].join(' ')}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 mt-1 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-surface border border-border rounded-[var(--r-lg)] rounded-tl-[var(--r-xs)] px-4 py-3">
                    <div className="flex gap-1.5 items-center h-5">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
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
                    {t.tutor.dismiss}
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Starter Suggestion Chips */}
            {messages.length <= 1 && (
              <div className="px-5 py-2 border-t border-border/40 bg-surface/50 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-muted font-semibold uppercase tracking-wider">
                  Tips:
                </span>
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(chip)}
                    className="text-xs bg-surface border border-border/70 hover:border-accent text-foreground hover:text-accent px-2.5 py-1 rounded-full transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="border-t border-border p-4 bg-surface/80">
              <div className="flex gap-3 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.tutor.inputPlaceholder}
                  disabled={loading}
                  rows={2}
                  className="flex-1 resize-none px-4 py-2.5 rounded-[var(--r-md)] border border-border bg-background text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:opacity-50 leading-relaxed"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  loading={loading}
                  className="shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-muted mt-2 text-center">
                {t.tutor.enterToSend}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><span className="text-sm text-muted">Loading tutor…</span></div>}>
      <TutorChatInner />
    </Suspense>
  );
}
