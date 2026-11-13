'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Lock, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getCourse, getAllLessons } from '@/lib/data/courses';
import { DemoState } from '@/lib/demo-state';
import { LEVEL_LABELS } from '@/lib/data/diagnostics';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseId, LessonStatus } from '@/lib/types';

function LearnContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const courseId = id as CourseId;
  const { t, locale } = useLanguage();

  const rawCourse = getCourse(courseId);
  const course = rawCourse ? getLocalizedCourse(rawCourse, locale) : null;

  const [mounted, setMounted] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [level, setLevel] = useState<string>('Beginner');
  const [completionPercent, setCompletionPercent] = useState(0);
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatus>>({});
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!rawCourse) return;
    const isEnrolled = DemoState.isEnrolled(courseId);
    setEnrolled(isEnrolled);
    if (isEnrolled) {
      const userLevel = DemoState.getLevel(courseId);
      setLevel(LEVEL_LABELS[userLevel] || userLevel);
      setCompletionPercent(DemoState.getCompletionPercent(courseId));
      const prog = DemoState.getProgress(courseId);
      setCurrentLessonId(prog?.currentLessonId ?? null);
    }
    // Build status map
    const allLessons = getAllLessons(courseId);
    const statuses: Record<string, LessonStatus> = {};
    for (const l of allLessons) {
      statuses[l.id] = DemoState.getLessonStatus(courseId, l.id);
    }
    setLessonStatuses(statuses);
  }, [courseId, rawCourse]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">
          {t.common.error}. <Link href="/courses" className="text-accent underline font-medium">{t.common.tryAgain}</Link>
        </p>
      </div>
    );
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">

        {/* Course Header Banner */}
        <div className="glass rounded-[var(--r-xl)] p-6 mb-8 border border-border/80 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1.5">{course.title}</h1>
              {enrolled ? (
                <div className="flex items-center gap-2">
                  <Badge variant="accent">{level}</Badge>
                  <span className="text-sm text-muted font-medium">{completionPercent}% {t.learn.completed}</span>
                </div>
              ) : (
                <p className="text-sm text-muted">{t.learn.diagnosticHint}</p>
              )}
            </div>
            {enrolled && currentLessonId && (
              <Link href={`/courses/${courseId}/learn/${currentLessonId}`}>
                <Button>
                  {t.learn.continueBtn}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {!enrolled && (
              <Link href={`/courses/${courseId}/diagnostic`}>
                <Button>
                  {t.learn.startDiagnostic}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          {enrolled && (
            <div className="mt-5">
              <ProgressBar value={completionPercent} label={t.learn.overallProgress} showLabel />
            </div>
          )}
        </div>

        {!enrolled && (
          <div className="surface rounded-[var(--r-md)] p-4 mb-6 border border-accent/20 bg-accent/10 text-sm text-foreground flex items-center justify-between">
            <span>{t.learn.diagnosticHint}</span>
            <Link href={`/courses/${courseId}/diagnostic`}>
              <Button size="sm">{t.learn.startDiagnostic}</Button>
            </Link>
          </div>
        )}

        {/* Stages Tree */}
        <div className="flex flex-col gap-6 mt-6">
          {rawCourse?.stages.map((stage, si) => {
            const stageLessons = stage.lessons;
            const stageCompleted = stageLessons.every(l => lessonStatuses[l.id] === 'completed');
            const stageCurrent = !stageCompleted && stageLessons.some(l =>
              lessonStatuses[l.id] === 'current' || lessonStatuses[l.id] === 'available'
            );

            return (
              <div key={stage.id}>
                {/* Stage header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                    stageCompleted
                      ? 'bg-emerald-500 text-white'
                      : stageCurrent
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-surface border border-border text-muted',
                  ].join(' ')}>
                    {stageCompleted ? <CheckCircle2 className="h-4 w-4" /> : si + 1}
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground text-sm md:text-base">{stage.title}</h2>
                    <p className="text-xs text-muted">{stage.description}</p>
                  </div>
                </div>

                {/* Lessons list */}
                <div className="ml-4 pl-6 border-l-2 border-border/80 flex flex-col gap-2">
                  {stageLessons.map(lesson => {
                    const status = lessonStatuses[lesson.id] ?? (enrolled ? 'locked' : 'available');
                    const isCurrent = status === 'current';
                    const isCompleted = status === 'completed';
                    const isLocked = status === 'locked';
                    const isAvailable = status === 'available';

                    return (
                      <div
                        key={lesson.id}
                        className={[
                          'flex items-center gap-3 px-4 py-3 rounded-[var(--r-md)] border transition-all',
                          isCurrent ? 'glass border-accent/50 shadow-md ring-1 ring-accent/20' : '',
                          isCompleted ? 'bg-surface border-border/80 text-foreground' : '',
                          isAvailable ? 'bg-surface border-border hover:border-accent/30' : '',
                          isLocked ? 'bg-background/40 border-border/50 opacity-50' : '',
                        ].join(' ')}
                      >
                        <div className="shrink-0">
                          {isCompleted && <CheckCircle2 className="h-4 w-4 text-success" />}
                          {isCurrent && <Circle className="h-4 w-4 text-accent animate-pulse" />}
                          {isAvailable && <Circle className="h-4 w-4 text-muted" />}
                          {isLocked && <Lock className="h-4 w-4 text-muted/60" />}
                        </div>
                        <span className={[
                          'text-sm font-medium flex-1',
                          isCurrent ? 'text-foreground font-semibold' : isLocked ? 'text-muted' : 'text-foreground',
                        ].join(' ')}>
                          {lesson.title}
                        </span>
                        {(isCurrent || isAvailable || isCompleted) && (
                          <Link
                            href={`/courses/${courseId}/learn/${lesson.id}`}
                            className={[
                              'flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-[var(--r-sm)] transition-colors',
                              isCurrent
                                ? 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                                : isCompleted
                                ? 'bg-surface border border-border text-muted hover:text-foreground'
                                : 'bg-surface border border-border text-foreground hover:border-accent/40',
                            ].join(' ')}
                          >
                            {isCompleted ? t.learn.reviewBtn : isCurrent ? t.learn.continueBtn : t.learn.startBtn}
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default function LearnPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><LoadingSpinner label="Loading path…" /></div>}>
      <LearnContent {...props} />
    </Suspense>
  );
}
