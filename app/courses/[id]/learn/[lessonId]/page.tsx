'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Lightbulb, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getLesson, getNextLesson, getLessonStage } from '@/lib/data/courses';
import { DemoState } from '@/lib/demo-state';
import type { CourseId } from '@/lib/types';

type AnswerState = 'idle' | 'correct' | 'incorrect';

function LessonContent({ content }: { content: string }) {
  return (
    <div
      className="lesson-prose"
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/^## (.+)$/gm, '<h2>$1</h2>')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code>$1</code>')
          .replace(/```python\n([\s\S]*?)```/g, '<pre>$1</pre>')
          .replace(/```\n([\s\S]*?)```/g, '<pre>$1</pre>')
          .replace(/\| (.+) \|/g, (m) => `<div class="table-row">${m}</div>`)
          .replace(/^- (.+)$/gm, '<li>$1</li>')
          .replace(/(<li>[\s\S]*?<\/li>)+/g, (m) => `<ul>${m}</ul>`)
          .replace(/\n\n/g, '<br/>')
          .replace(/\n(?!<)/g, ' '),
      }}
    />
  );
}

function LessonBody({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = use(params);
  const courseId = id as CourseId;
  const router = useRouter();

  const lesson = getLesson(courseId, lessonId);
  const stage = getLessonStage(courseId, lessonId);
  const nextLesson = getNextLesson(courseId, lessonId);

  const [phase, setPhase] = useState<'reading' | 'exercise'>('reading');
  const [userAnswer, setUserAnswer] = useState<string | number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [showHint, setShowHint] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    if (lesson) {
      setAlreadyCompleted(DemoState.isLessonCompleted(courseId, lessonId));
    }
  }, [courseId, lessonId, lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Lesson not found. <Link href={`/courses/${courseId}/learn`} className="text-accent underline">Back to path</Link></p>
      </div>
    );
  }

  const ex = lesson.exercise;

  async function checkAnswer() {
    if (userAnswer === null || userAnswer === '') return;
    const correct =
      ex.type === 'multiple-choice'
        ? userAnswer === ex.correctAnswer
        : String(userAnswer).trim().toLowerCase() === String(ex.correctAnswer).toLowerCase();

    if (correct) {
      setAnswerState('correct');
      if (!alreadyCompleted) {
        DemoState.completeLesson({
          lessonId,
          courseId,
          completedAt: new Date().toISOString(),
          correct: true,
          score: 100,
        });
        setAlreadyCompleted(true);
        // Also ping the backend progress API
        fetch('/api/progress/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, lessonId, correct: true, score: 100 }),
        }).catch(() => {});
      }
    } else {
      setAnswerState('incorrect');
    }
  }

  function goNext() {
    if (nextLesson) {
      router.push(`/courses/${courseId}/learn/${nextLesson.id}`);
    } else {
      router.push(`/courses/${courseId}/learn`);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6" aria-label="Breadcrumb">
          <Link href={`/courses/${courseId}/learn`} className="hover:text-foreground transition-colors">Learning path</Link>
          <span>/</span>
          <span className="text-muted">{stage?.title}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{lesson.title}</span>
        </nav>

        {/* Phase tabs */}
        <div className="flex gap-1 bg-background border border-border rounded-[var(--r-md)] p-1 mb-6 max-w-xs">
          {(['reading', 'exercise'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={[
                'flex-1 py-1.5 text-sm font-medium rounded-[calc(var(--r-sm)-2px)] capitalize transition-colors',
                phase === p ? 'bg-surface text-foreground shadow-sm' : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Reading phase */}
        {phase === 'reading' && (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
              {alreadyCompleted && <Badge variant="success">Completed</Badge>}
            </div>

            <div className="surface rounded-[var(--r-xl)] p-7 mb-6">
              <LessonContent content={lesson.content} />
            </div>

            <div className="flex justify-between items-center">
              <Link
                href={`/courses/${courseId}/learn`}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Path
              </Link>
              <Button onClick={() => setPhase('exercise')}>
                Go to exercise
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Exercise phase */}
        {phase === 'exercise' && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Exercise</h2>

            <div className="glass rounded-[var(--r-xl)] p-7 mb-5">
              <p className="text-sm font-semibold text-foreground mb-5 whitespace-pre-wrap">{ex.question}</p>

              {/* Multiple choice */}
              {ex.type === 'multiple-choice' && ex.options && (
                <div className="flex flex-col gap-2.5">
                  {ex.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => { if (answerState === 'idle') setUserAnswer(idx); }}
                      disabled={answerState !== 'idle'}
                      className={[
                        'w-full text-left px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-all',
                        answerState === 'idle' && userAnswer === idx
                          ? 'border-accent bg-accent-light text-accent'
                          : answerState !== 'idle' && idx === ex.correctAnswer
                          ? 'border-success bg-success-light text-success'
                          : answerState === 'incorrect' && userAnswer === idx
                          ? 'border-danger bg-danger-light text-danger'
                          : 'border-border bg-surface text-foreground hover:border-accent/30',
                      ].join(' ')}
                    >
                      <span className={[
                        'inline-flex w-5 h-5 rounded-full border items-center justify-center text-xs mr-3',
                        answerState === 'idle' && userAnswer === idx ? 'border-accent bg-accent text-white' :
                        answerState !== 'idle' && idx === ex.correctAnswer ? 'border-success bg-success text-white' :
                        answerState === 'incorrect' && userAnswer === idx ? 'border-danger bg-danger text-white' :
                        'border-border',
                      ].join(' ')}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Fill blank / translation / code-output */}
              {(ex.type === 'fill-blank' || ex.type === 'translation' || ex.type === 'code-output') && (
                <div>
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    value={typeof userAnswer === 'string' ? userAnswer : ''}
                    onChange={e => { if (answerState === 'idle') setUserAnswer(e.target.value); }}
                    disabled={answerState !== 'idle'}
                    className={[
                      'w-full px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-colors',
                      'bg-surface placeholder:text-subtle focus:outline-none focus:ring-2',
                      answerState === 'correct' ? 'border-success focus:ring-success/30' :
                      answerState === 'incorrect' ? 'border-danger focus:ring-danger/30' :
                      'border-border focus:ring-accent/30 focus:border-accent',
                    ].join(' ')}
                    onKeyDown={e => { if (e.key === 'Enter' && answerState === 'idle') checkAnswer(); }}
                  />
                </div>
              )}

              {/* Hint */}
              {ex.hint && answerState === 'idle' && (
                <div className="mt-4">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-1.5 text-xs text-muted hover:text-amber transition-colors"
                    >
                      <Lightbulb className="h-3.5 w-3.5" /> Show hint
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 bg-amber-light border border-amber/20 rounded-[var(--r-sm)] px-3 py-2">
                      <Lightbulb className="h-3.5 w-3.5 text-amber mt-0.5 shrink-0" />
                      <p className="text-xs text-amber">{ex.hint}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Feedback */}
            {answerState !== 'idle' && (
              <Panel
                variant={answerState === 'correct' ? 'accent' : 'surface'}
                className={[
                  'mb-5',
                  answerState === 'incorrect' ? '!bg-danger-light !border-danger/20' : '',
                ].join(' ')}
              >
                <div className="flex items-start gap-2.5">
                  {answerState === 'correct'
                    ? <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    : <XCircle className="h-5 w-5 text-danger mt-0.5 shrink-0" />}
                  <div>
                    <p className={[
                      'font-semibold text-sm mb-1',
                      answerState === 'correct' ? 'text-accent' : 'text-danger',
                    ].join(' ')}>
                      {answerState === 'correct' ? 'Correct!' : 'Not quite — see the explanation'}
                    </p>
                    <p className="text-sm text-foreground">{ex.explanation}</p>
                  </div>
                </div>
              </Panel>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPhase('reading')}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Reading
                </button>
                <Link
                  href={`/courses/${courseId}/learn`}
                  className="text-sm text-muted hover:text-foreground ml-4"
                >
                  Path
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {answerState === 'idle' ? (
                  <Button onClick={checkAnswer} disabled={userAnswer === null}>
                    Check answer
                  </Button>
                ) : (
                  <>
                    {answerState === 'incorrect' && (
                      <Button
                        variant="secondary"
                        onClick={() => { setAnswerState('idle'); setUserAnswer(null); setShowHint(false); }}
                      >
                        Try again
                      </Button>
                    )}
                    <Button onClick={goNext}>
                      {nextLesson ? 'Next lesson' : 'Finish course'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Tutor link */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href={`/tutor?course=${courseId}&lesson=${lessonId}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Ask the AI tutor about this lesson
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function LessonPage(props: { params: Promise<{ id: string; lessonId: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner label="Loading lesson…" /></div>}>
      <LessonBody {...props} />
    </Suspense>
  );
}
