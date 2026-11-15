'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getLesson, getNextLesson, getLessonStage } from '@/lib/data/courses';
import { getLocalizedLesson, getLocalizedStage } from '@/lib/data/course-content-localization';
import { DemoState } from '@/lib/demo-state';
import { useLanguage } from '@/lib/i18n/context';
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
          .replace(/```javascript\n([\s\S]*?)```/g, '<pre>$1</pre>')
          .replace(/```html\n([\s\S]*?)```/g, '<pre>$1</pre>')
          .replace(/```css\n([\s\S]*?)```/g, '<pre>$1</pre>')
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
  const { t, locale } = useLanguage();

  const rawLesson = getLesson(courseId, lessonId);
  const rawStage = getLessonStage(courseId, lessonId);
  const rawNextLesson = getNextLesson(courseId, lessonId);

  const lesson = rawLesson ? getLocalizedLesson(courseId, rawLesson, locale) : undefined;
  const stage = rawStage ? getLocalizedStage(courseId, rawStage, locale) : undefined;
  const nextLesson = rawNextLesson ? getLocalizedLesson(courseId, rawNextLesson, locale) : undefined;

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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">
          {t.common.error}.{' '}
          <Link href={`/courses/${courseId}/learn`} className="text-accent underline font-medium">
            {t.lesson.backToPath}
          </Link>
        </p>
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6" aria-label="Breadcrumb">
          <Link href={`/courses/${courseId}/learn`} className="hover:text-foreground transition-colors font-medium">
            {t.lesson.backToPath}
          </Link>
          <span>/</span>
          <span className="text-muted">{stage?.title}</span>
          <span>/</span>
          <span className="text-foreground font-semibold">{lesson.title}</span>
        </nav>

        {/* Phase Switcher Tabs */}
        <div className="flex gap-1 bg-surface border border-border rounded-[var(--r-md)] p-1 mb-6 max-w-xs shadow-xs">
          <button
            onClick={() => setPhase('reading')}
            className={[
              'flex-1 py-1.5 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-colors',
              phase === 'reading' ? 'bg-surface-raised text-foreground shadow-xs font-semibold' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {t.lesson.readingTab}
          </button>
          <button
            onClick={() => setPhase('exercise')}
            className={[
              'flex-1 py-1.5 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-colors',
              phase === 'exercise' ? 'bg-accent text-white shadow-xs font-semibold' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {t.lesson.exerciseTab}
          </button>
        </div>

        {/* Phase 1: Reading & Step-by-Step Theory */}
        {phase === 'reading' && (
          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{lesson.title}</h1>
              {alreadyCompleted && (
                <Badge variant="success">{t.lesson.completedBadge}</Badge>
              )}
            </div>

            <div className="surface rounded-[var(--r-xl)] p-6 md:p-8 mb-6 border border-border shadow-sm">
              <LessonContent content={lesson.content} />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href={`/courses/${courseId}/learn`}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4" /> {t.lesson.backToPath}
              </Link>
              <Button onClick={() => setPhase('exercise')}>
                {t.lesson.toExerciseBtn}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Phase 2: Active Hands-on Exercise */}
        {phase === 'exercise' && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              {t.lesson.exerciseHeading}
            </h2>

            <div className="surface rounded-[var(--r-xl)] p-6 md:p-8 mb-5 border border-border shadow-sm">
              <p className="text-base font-semibold text-foreground mb-5 whitespace-pre-wrap leading-relaxed">
                {ex.question}
              </p>

              {/* Multiple choice options */}
              {ex.type === 'multiple-choice' && ex.options && (
                <div className="flex flex-col gap-2.5">
                  {ex.options.map((opt, idx) => {
                    const isSelected = userAnswer === idx;
                    const isCorrectAnswer = idx === ex.correctAnswer;
                    const showCorrect = answerState !== 'idle' && isCorrectAnswer;
                    const showIncorrect = answerState === 'incorrect' && isSelected;

                    return (
                      <button
                        key={idx}
                        onClick={() => { if (answerState === 'idle') setUserAnswer(idx); }}
                        disabled={answerState !== 'idle'}
                        className={[
                          'w-full text-left px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-all',
                          answerState === 'idle' && isSelected
                            ? 'border-accent bg-accent-light text-accent shadow-xs'
                            : showCorrect
                            ? 'border-success bg-success-light text-success'
                            : showIncorrect
                            ? 'border-danger bg-danger-light text-danger'
                            : 'border-border bg-surface text-foreground hover:border-accent/40 hover:bg-surface-raised',
                        ].join(' ')}
                      >
                        <span className={[
                          'inline-flex w-5 h-5 rounded-full border items-center justify-center text-xs mr-3 shrink-0 font-bold',
                          answerState === 'idle' && isSelected ? 'border-accent bg-accent text-white' :
                          showCorrect ? 'border-success bg-success text-white' :
                          showIncorrect ? 'border-danger bg-danger text-white' :
                          'border-border text-muted',
                        ].join(' ')}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Text / Code output input */}
              {(ex.type === 'fill-blank' || ex.type === 'translation' || ex.type === 'code-output') && (
                <div>
                  <input
                    type="text"
                    placeholder={t.lesson.typeAnswerPlaceholder}
                    value={typeof userAnswer === 'string' ? userAnswer : ''}
                    onChange={e => { if (answerState === 'idle') setUserAnswer(e.target.value); }}
                    disabled={answerState !== 'idle'}
                    className={[
                      'w-full px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-colors',
                      'bg-surface placeholder:text-subtle text-foreground focus:outline-none focus:ring-2',
                      answerState === 'correct' ? 'border-success focus:ring-success/30' :
                      answerState === 'incorrect' ? 'border-danger focus:ring-danger/30' :
                      'border-border focus:ring-accent/40 focus:border-accent',
                    ].join(' ')}
                    onKeyDown={e => { if (e.key === 'Enter' && answerState === 'idle') checkAnswer(); }}
                  />
                </div>
              )}

              {/* Progressive Pedagogical Hint */}
              {ex.hint && answerState === 'idle' && (
                <div className="mt-5 pt-4 border-t border-border">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center gap-1.5 text-xs text-muted hover:text-amber transition-colors font-medium"
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-amber" /> {t.lesson.showHintBtn}
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 bg-amber-light border border-amber/30 rounded-[var(--r-sm)] px-3.5 py-2.5">
                      <Lightbulb className="h-4 w-4 text-amber mt-0.5 shrink-0" />
                      <p className="text-xs text-foreground font-medium">{ex.hint}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Explanatory Feedback (Success or Correction Breakdown) */}
            {answerState !== 'idle' && (
              <div
                className={[
                  'rounded-[var(--r-xl)] p-5 mb-6 border transition-all',
                  answerState === 'correct'
                    ? 'border-success/40 bg-success-light'
                    : 'border-danger/40 bg-danger-light',
                ].join(' ')}
              >
                <div className="flex items-start gap-3">
                  {answerState === 'correct' ? (
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className={[
                      'font-bold text-sm mb-1',
                      answerState === 'correct' ? 'text-success' : 'text-danger',
                    ].join(' ')}>
                      {answerState === 'correct' ? t.lesson.correctHeading : t.lesson.incorrectHeading}
                    </p>
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">{ex.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation and Submission Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPhase('reading')}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" /> {t.lesson.readingTab}
                </button>
                <Link
                  href={`/courses/${courseId}/learn`}
                  className="text-sm text-muted hover:text-foreground ml-4 transition-colors font-medium"
                >
                  {t.lesson.backToPath}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {answerState === 'idle' ? (
                  <Button onClick={checkAnswer} disabled={userAnswer === null || userAnswer === ''}>
                    {t.lesson.checkAnswerBtn}
                  </Button>
                ) : (
                  <>
                    {answerState === 'incorrect' && (
                      <Button
                        variant="secondary"
                        onClick={() => { setAnswerState('idle'); setUserAnswer(null); setShowHint(false); }}
                      >
                        {t.lesson.tryAgainBtn}
                      </Button>
                    )}
                    <Button onClick={goNext}>
                      {nextLesson ? t.lesson.nextLessonBtn : t.lesson.finishCourseBtn}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Socratic AI Tutor Bridge with Context */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href={`/tutor?course=${courseId}&lesson=${lessonId}`}
                className="inline-flex items-center gap-2 text-xs md:text-sm text-muted hover:text-accent transition-colors font-medium"
              >
                <MessageSquare className="h-4 w-4 text-accent" />
                {t.lesson.askTutorLink}
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><LoadingSpinner label="Loading lesson…" /></div>}>
      <LessonBody {...props} />
    </Suspense>
  );
}
