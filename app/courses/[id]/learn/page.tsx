'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Lock, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getCourse, getAllLessons } from '@/lib/data/courses';
import { DemoState } from '@/lib/demo-state';
import { LEVEL_LABELS } from '@/lib/data/diagnostics';
import type { CourseId, LessonStatus } from '@/lib/types';

function LearnContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const courseId = id as CourseId;
  const course = getCourse(courseId);

  const [mounted, setMounted] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [level, setLevel] = useState<string>('Beginner');
  const [completionPercent, setCompletionPercent] = useState(0);
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatus>>({});
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!course) return;
    const isEnrolled = DemoState.isEnrolled(courseId);
    setEnrolled(isEnrolled);
    if (isEnrolled) {
      setLevel(LEVEL_LABELS[DemoState.getLevel(courseId)]);
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
  }, [courseId, course]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Course not found. <Link href="/courses" className="text-accent underline">Back</Link></p>
      </div>
    );
  }

  if (!mounted) {
    return <div className="min-h-screen" />; // prevent hydration mismatch
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">

        {/* Header */}
        <div className="glass rounded-[var(--r-xl)] p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{course.title}</h1>
              {enrolled ? (
                <div className="flex items-center gap-2">
                  <Badge variant="accent">{level}</Badge>
                  <span className="text-sm text-muted">{completionPercent}% complete</span>
                </div>
              ) : (
                <p className="text-sm text-muted">Take the diagnostic to get your personal path.</p>
              )}
            </div>
            {enrolled && currentLessonId && (
              <Link href={`/courses/${courseId}/learn/${currentLessonId}`}>
                <Button>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {!enrolled && (
              <Link href={`/courses/${courseId}/diagnostic`}>
                <Button>
                  Start diagnostic
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          {enrolled && (
            <div className="mt-5">
              <ProgressBar value={completionPercent} label="Overall progress" showLabel />
            </div>
          )}
        </div>

        {!enrolled && (
          <div className="mb-6">
            <DemoBanner message="Complete the diagnostic to unlock your personalized learning path." />
          </div>
        )}

        {/* Stages */}
        <div className="flex flex-col gap-6 mt-6">
          {course.stages.map((stage, si) => {
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
                    stageCompleted ? 'bg-success text-white' : stageCurrent ? 'bg-accent text-white' : 'bg-border text-muted',
                  ].join(' ')}>
                    {stageCompleted ? <CheckCircle2 className="h-4 w-4" /> : si + 1}
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">{stage.title}</h2>
                    <p className="text-xs text-muted">{stage.description}</p>
                  </div>
                </div>

                {/* Lessons in stage */}
                <div className="ml-4 pl-6 border-l-2 border-border flex flex-col gap-2">
                  {stageLessons.map(lesson => {
                    const status = lessonStatuses[lesson.id] ?? (enrolled ? 'locked' : 'available');
                    const isCurrent = status === 'current';
                    const isCompleted = status === 'completed';
                    const isLocked = status === 'locked';
                    const isAvailable = status === 'available';

                    return (
                      <div key={lesson.id}
                        className={[
                          'flex items-center gap-3 px-4 py-3 rounded-[var(--r-md)] border transition-all',
                          isCurrent ? 'glass border-accent/40 shadow-sm' : '',
                          isCompleted ? 'bg-success-light border-success/20' : '',
                          isAvailable ? 'bg-surface border-border hover:border-accent/30' : '',
                          isLocked ? 'bg-background/40 border-border opacity-50' : '',
                        ].join(' ')}
                      >
                        <div className="shrink-0">
                          {isCompleted && <CheckCircle2 className="h-4 w-4 text-success" />}
                          {isCurrent && <Circle className="h-4 w-4 text-accent" />}
                          {isAvailable && <Circle className="h-4 w-4 text-muted" />}
                          {isLocked && <Lock className="h-4 w-4 text-muted" />}
                        </div>
                        <span className={[
                          'text-sm font-medium flex-1',
                          isCompleted ? 'text-success' : isCurrent ? 'text-foreground' : isLocked ? 'text-muted' : 'text-foreground',
                        ].join(' ')}>
                          {lesson.title}
                        </span>
                        {(isCurrent || isAvailable || isCompleted) && (
                          <Link
                            href={`/courses/${courseId}/learn/${lesson.id}`}
                            className={[
                              'flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-[var(--r-sm)] transition-colors',
                              isCurrent ? 'bg-accent text-white hover:bg-accent-hover' : 'text-muted hover:text-foreground',
                            ].join(' ')}
                          >
                            {isCompleted ? 'Review' : isCurrent ? 'Continue' : 'Start'}
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner label="Loading path…" /></div>}>
      <LearnContent {...props} />
    </Suspense>
  );
}
