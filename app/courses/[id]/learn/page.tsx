'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Target,
  Flag,
  Flame,
  Award,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getCourse, getAllLessons } from '@/lib/data/courses';
import { DemoState } from '@/lib/demo-state';
import { getLevelLabel } from '@/lib/data/diagnostics';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import { getLocalizedStage, getLocalizedLesson } from '@/lib/data/course-content-localization';
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
      setLevel(getLevelLabel(userLevel, locale));
      setCompletionPercent(DemoState.getCompletionPercent(courseId));
      const prog = DemoState.getProgress(courseId);
      setCurrentLessonId(prog?.currentLessonId ?? null);
    }
    // Build status map
    const all = getAllLessons(courseId);
    const statuses: Record<string, LessonStatus> = {};
    for (const l of all) {
      statuses[l.id] = DemoState.getLessonStatus(courseId, l.id);
    }
    setLessonStatuses(statuses);
  }, [courseId, rawCourse, locale]);

  if (!course || !rawCourse) {
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

  const allLessons = getAllLessons(courseId);
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter(l => lessonStatuses[l.id] === 'completed').length;
  const remainingCount = totalLessons - completedCount;
  const isAllCompleted = completedCount === totalLessons && totalLessons > 0;

  const user = DemoState.getUser();
  const learnerAvatar = user?.avatar ?? '🦊';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-10 w-full overflow-x-hidden">

        {/* ── Header: Course Roadmap Overview ──────────────────────────────── */}
        <div className="surface rounded-[var(--r-xl)] p-6 mb-8 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="accent">
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  {t.lesson.breadcrumbPath}
                </Badge>
                {enrolled && (
                  <Badge variant="default">{level}</Badge>
                )}
                <span className="text-xs text-muted">
                  {t.learn.boardTrackLabel}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{course.title}</h1>
              {!enrolled ? (
                <p className="text-xs md:text-sm text-muted mt-1">{t.learn.diagnosticHint}</p>
              ) : (
                <p className="text-xs md:text-sm text-muted mt-1">
                  {locale === 'ru'
                    ? `${completedCount} из ${totalLessons} уроков пройдено (${completionPercent}%)`
                    : locale === 'ky'
                    ? `${totalLessons} сабактын ${completedCount}ү аяктады (${completionPercent}%)`
                    : `${completedCount} of ${totalLessons} lessons completed (${completionPercent}%)`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {enrolled && currentLessonId && (
                <Link href={`/courses/${courseId}/learn/${currentLessonId}`}>
                  <Button size="md">
                    {t.learn.continueBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {!enrolled && (
                <Link href={`/courses/${courseId}/diagnostic`}>
                  <Button size="md">
                    {t.learn.startDiagnostic}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {enrolled && (
            <div className="mt-5">
              <ProgressBar value={completionPercent} label={t.learn.overallProgress} showLabel />
            </div>
          )}
        </div>

        {/* ── Milestone Progress Counter (Сколько пройдено и сколько осталось) ── */}
        <div className="surface rounded-[var(--r-xl)] p-5 mb-10 border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={[
              'w-12 h-12 rounded-[var(--r-md)] flex items-center justify-center shrink-0 border transition-colors',
              isAllCompleted
                ? 'bg-success text-white border-success shadow-sm'
                : 'bg-accent/10 border-accent/20 text-accent',
            ].join(' ')}>
              <Flag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-foreground">
                {t.learn.finishGoalTitle}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {isAllCompleted ? (
                  <span className="text-success font-medium">✓ {t.learn.finishGoalReached}</span>
                ) : locale === 'ru' ? (
                  <span>
                    <strong className="text-foreground font-semibold">{completedCount}</strong> из{' '}
                    <strong className="text-foreground font-semibold">{totalLessons}</strong> уроков пройдено · осталось{' '}
                    <strong className="text-accent font-semibold">{remainingCount}</strong>
                  </span>
                ) : locale === 'ky' ? (
                  <span>
                    <strong className="text-foreground font-semibold">{totalLessons}</strong> сабактын{' '}
                    <strong className="text-foreground font-semibold">{completedCount}</strong>ү аяктады · калды{' '}
                    <strong className="text-accent font-semibold">{remainingCount}</strong>
                  </span>
                ) : (
                  <span>
                    <strong className="text-foreground font-semibold">{completedCount}</strong> of{' '}
                    <strong className="text-foreground font-semibold">{totalLessons}</strong> lessons completed ·{' '}
                    <strong className="text-accent font-semibold">{remainingCount}</strong> remaining
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-auto self-end">
            <div className="text-right">
              <span className="text-xs text-muted block">{t.learn.overallProgress}</span>
              <span className="text-lg font-black text-accent">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* ── Board-Game Winding Path (Извилистая настольная дорожка) ───────── */}
        <div className="flex flex-col gap-12 relative">
          {rawCourse.stages.map((rawStage, si) => {
            const stage = getLocalizedStage(courseId, rawStage, locale);
            const stageLessons = stage.lessons;
            const stageCompleted = stageLessons.every(l => lessonStatuses[l.id] === 'completed');
            const stageCurrent = !stageCompleted && stageLessons.some(l =>
              lessonStatuses[l.id] === 'current' || lessonStatuses[l.id] === 'available'
            );

            return (
              <div key={stage.id} className="relative">
                {/* Stage Milestone Divider */}
                <div className="flex items-center gap-3 mb-6 bg-surface-raised/70 border border-border/80 px-4 py-2.5 rounded-[var(--r-lg)]">
                  <div className={[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border',
                    stageCompleted
                      ? 'bg-success text-white border-success'
                      : stageCurrent
                      ? 'bg-accent text-white border-accent shadow-xs'
                      : 'bg-surface border-border text-muted',
                  ].join(' ')}>
                    {stageCompleted ? '✓' : si + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-foreground text-sm md:text-base truncate">
                      {stage.title}
                    </h2>
                    <p className="text-xs text-muted truncate">{stage.description}</p>
                  </div>
                  {stageCompleted && (
                    <span className="text-xs font-semibold text-success shrink-0">
                      ✓ {t.learn.completed}
                    </span>
                  )}
                </div>

                {/* Serpentine Board Cells */}
                <div className="flex flex-col gap-6 relative">
                  {stageLessons.map((rawLesson, li) => {
                    const lesson = getLocalizedLesson(courseId, rawLesson, locale);
                    const status = lessonStatuses[lesson.id] ?? (enrolled ? 'locked' : 'available');
                    const isCurrent = status === 'current';
                    const isCompleted = status === 'completed';
                    const isLocked = status === 'locked';
                    const isAvailable = status === 'available';

                    const canAccess = isCurrent || isAvailable || isCompleted;

                    // Board game node types: checkpoint quiz, capstone project, or standard lesson
                    const isCapstone = li === stageLessons.length - 1 && si === rawCourse.stages.length - 1;
                    const isCheckpoint = !isCapstone && li === Math.floor(stageLessons.length / 2);

                    // Serpentine horizontal offset class (alternates left, center, right)
                    // Gives a genuine winding board-game trail look
                    const waveOffsets = [
                      'sm:translate-x-0',
                      'sm:translate-x-8 md:translate-x-12',
                      'sm:translate-x-0',
                      'sm:-translate-x-8 md:-translate-x-12',
                    ];
                    const offsetClass = waveOffsets[li % waveOffsets.length];

                    return (
                      <div
                        key={lesson.id}
                        className={`relative flex items-center gap-4 transition-transform ${offsetClass}`}
                      >
                        {/* Winding Trail Line to next node */}
                        {li < stageLessons.length - 1 && (
                          <div className="absolute left-7 top-14 w-0.5 h-8 border-l-2 border-dashed border-border-strong -z-0 pointer-events-none" />
                        )}

                        {/* Circular Board Game Node */}
                        <div className="relative shrink-0 z-10">
                          {/* Learner Marker / Token (Фишка ученика) */}
                          {isCurrent && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none animate-bounce">
                              <div className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/20 whitespace-nowrap">
                                <span>{learnerAvatar}</span>
                                <span>{t.learn.learnerToken}</span>
                              </div>
                              <div className="w-1.5 h-1.5 bg-accent rotate-45 -mt-0.5" />
                            </div>
                          )}

                          <Link
                            href={canAccess ? `/courses/${courseId}/learn/${lesson.id}` : '#'}
                            className={[
                              'w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center font-bold text-sm relative transition-all duration-200 border-2 select-none',
                              isCompleted
                                ? 'bg-success text-white border-success shadow-xs hover:scale-105'
                                : isCurrent
                                ? 'bg-accent text-white border-accent shadow-md ring-4 ring-accent/25 hover:scale-105'
                                : isAvailable
                                ? 'bg-surface text-foreground border-border hover:border-accent hover:scale-105 shadow-xs'
                                : 'bg-surface-raised text-muted border-border/50 opacity-60 cursor-not-allowed',
                            ].join(' ')}
                            tabIndex={canAccess ? 0 : -1}
                            aria-label={`${lesson.title} (${status})`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : isCurrent ? (
                              <div className="flex flex-col items-center">
                                <span className="text-base font-black">{li + 1}</span>
                              </div>
                            ) : isLocked ? (
                              <Lock className="h-4 w-4" />
                            ) : isCapstone ? (
                              <Award className="h-5 w-5 text-accent" />
                            ) : isCheckpoint ? (
                              <Target className="h-5 w-5 text-accent" />
                            ) : (
                              <span className="text-sm font-semibold">{li + 1}</span>
                            )}
                          </Link>
                        </div>

                        {/* Interactive Board Card Info */}
                        <div className={[
                          'flex-1 surface rounded-[var(--r-md)] p-3.5 sm:p-4 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs',
                          isCurrent
                            ? 'border-accent bg-accent-light/40 ring-1 ring-accent/30'
                            : isCompleted
                            ? 'border-border/80 hover:border-border-strong'
                            : isAvailable
                            ? 'border-border hover:border-accent/40'
                            : 'border-border/60 opacity-60 bg-background/50',
                        ].join(' ')}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                                Урок {li + 1}
                              </span>
                              {isCheckpoint && (
                                <Badge variant="accent" className="text-[10px] py-0">
                                  <CheckSquare className="h-2.5 w-2.5 mr-0.5" />
                                  {t.learn.checkpointLabel}
                                </Badge>
                              )}
                              {isCapstone && (
                                <Badge variant="blue" className="text-[10px] py-0">
                                  <Award className="h-2.5 w-2.5 mr-0.5" />
                                  {t.learn.capstoneLabel}
                                </Badge>
                              )}
                              {isCompleted && (
                                <span className="text-[10px] font-semibold text-success">
                                  ✓ {t.learn.completed}
                                </span>
                              )}
                            </div>

                            <h3 className={[
                              'text-sm font-bold truncate',
                              isCurrent
                                ? 'text-accent'
                                : isCompleted
                                ? 'text-foreground'
                                : canAccess
                                ? 'text-foreground'
                                : 'text-muted',
                            ].join(' ')}>
                              {lesson.title}
                            </h3>
                          </div>

                          {/* CTA button */}
                          <div className="shrink-0 self-end sm:self-auto">
                            {canAccess ? (
                              <Link href={`/courses/${courseId}/learn/${lesson.id}`}>
                                <Button
                                  size="sm"
                                  variant={isCurrent ? 'primary' : 'secondary'}
                                  className="text-xs"
                                >
                                  {isCompleted
                                    ? t.learn.reviewBtn
                                    : isCurrent
                                    ? t.learn.continueBtn
                                    : t.learn.startBtn}
                                  <ChevronRight className="h-3 w-3" />
                                </Button>
                              </Link>
                            ) : (
                              <span className="text-xs text-muted flex items-center gap-1 py-1 px-2.5 bg-surface-raised rounded-[var(--r-sm)] border border-border/50">
                                <Lock className="h-3 w-3" />
                                {t.learn.locked}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Finish Goal Milestone (Финишный флаг в конце настольной дорожки) ── */}
          <div className="mt-4 pt-6 border-t-2 border-dashed border-border-strong text-center">
            <div className={[
              'surface rounded-[var(--r-xl)] p-6 md:p-8 border max-w-lg mx-auto transition-all',
              isAllCompleted
                ? 'border-success bg-success-light/30 shadow-md ring-2 ring-success/30'
                : 'border-border shadow-sm',
            ].join(' ')}>
              <div className={[
                'w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-3 border-2',
                isAllCompleted
                  ? 'bg-success text-white border-success shadow-md'
                  : 'bg-surface-raised text-accent border-accent/40 shadow-xs',
              ].join(' ')}>
                <Flag className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {t.learn.finishGoalTitle}
              </h3>
              <p className="text-xs text-muted max-w-md mx-auto mb-4 leading-relaxed">
                {t.learn.finishGoalSubtitle}
              </p>

              {isAllCompleted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-success text-white font-semibold text-xs rounded-[var(--r-md)] shadow-sm">
                  <Award className="h-4 w-4" />
                  {t.learn.finishGoalReached}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-raised rounded-[var(--r-md)] border border-border text-xs text-muted">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span>
                    <strong className="text-foreground">{remainingCount}</strong> {t.learn.remainingToGoal}
                  </span>
                </div>
              )}
            </div>
          </div>
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
