'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  Trophy,
  MapPin,
  Flame,
  Award,
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
  const [showChestModal, setShowChestModal] = useState(false);

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
    const allLessons = getAllLessons(courseId);
    const statuses: Record<string, LessonStatus> = {};
    for (const l of allLessons) {
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
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{course.title}</h1>
              {!enrolled ? (
                <p className="text-xs md:text-sm text-muted mt-1">{t.learn.diagnosticHint}</p>
              ) : (
                <p className="text-xs md:text-sm text-muted mt-1">
                  {completedCount} of {totalLessons} {t.courseDetail.lessons} {t.learn.completed.toLowerCase()} ({completionPercent}%)
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

        {/* ── Treasure Goal Banner (Сундук сокровищ в конце пути) ───────────── */}
        <div
          onClick={() => setShowChestModal(true)}
          className={[
            'surface rounded-[var(--r-xl)] p-5 mb-8 border transition-all cursor-pointer',
            isAllCompleted
              ? 'border-amber/50 bg-amber-light shadow-md'
              : 'border-border hover:border-accent/40 shadow-xs',
          ].join(' ')}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowChestModal(true); }}
          aria-label={t.learn.treasureChestTitle}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={[
                'w-12 h-12 rounded-[var(--r-md)] flex items-center justify-center text-2xl shrink-0 border',
                isAllCompleted
                  ? 'bg-amber text-white border-amber shadow-sm animate-bounce'
                  : 'bg-surface-raised border-border text-amber',
              ].join(' ')}>
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm md:text-base font-bold text-foreground">
                    {t.learn.treasureChestGoal}
                  </h3>
                  <Badge variant={isAllCompleted ? 'amber' : 'muted'} className="text-[10px]">
                    {isAllCompleted ? t.learn.treasureChestUnlocked : t.learn.treasureChestLocked}
                  </Badge>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  {isAllCompleted
                    ? t.learn.allStagesCompleted
                    : `${remainingCount} ${t.learn.remainingToGoal}`}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-muted shrink-0" />
          </div>
        </div>

        {/* ── Stages Trail: Treasure Map (Игровой маршрут по этапам) ───────── */}
        <div className="flex flex-col gap-8 relative">
          {rawCourse.stages.map((rawStage, si) => {
            const stage = getLocalizedStage(courseId, rawStage, locale);
            const stageLessons = stage.lessons;
            const stageCompleted = stageLessons.every(l => lessonStatuses[l.id] === 'completed');
            const stageCurrent = !stageCompleted && stageLessons.some(l =>
              lessonStatuses[l.id] === 'current' || lessonStatuses[l.id] === 'available'
            );

            return (
              <div key={stage.id} className="relative">
                {/* Stage Zone Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={[
                    'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border transition-colors',
                    stageCompleted
                      ? 'bg-success text-white border-success'
                      : stageCurrent
                      ? 'bg-accent text-white border-accent shadow-xs'
                      : 'bg-surface border-border text-muted',
                  ].join(' ')}>
                    {stageCompleted ? <CheckCircle2 className="h-5 w-5" /> : si + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted">
                        {t.learn.islandLabel} {si + 1}
                      </span>
                      {stageCompleted && (
                        <span className="text-[10px] font-semibold text-success flex items-center gap-1">
                          ✓ {t.learn.completed}
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold text-foreground text-base md:text-lg">{stage.title}</h2>
                    <p className="text-xs text-muted">{stage.description}</p>
                  </div>
                </div>

                {/* Lesson Nodes Trail */}
                <div className="ml-4 pl-6 border-l-2 border-border flex flex-col gap-3 relative">
                  {stageLessons.map((rawLesson, li) => {
                    const lesson = getLocalizedLesson(courseId, rawLesson, locale);
                    const status = lessonStatuses[lesson.id] ?? (enrolled ? 'locked' : 'available');
                    const isCurrent = status === 'current';
                    const isCompleted = status === 'completed';
                    const isLocked = status === 'locked';
                    const isAvailable = status === 'available';

                    const canAccess = isCurrent || isAvailable || isCompleted;

                    return (
                      <div
                        key={lesson.id}
                        className={[
                          'surface rounded-[var(--r-md)] p-4 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3',
                          isCurrent
                            ? 'border-accent bg-accent-light/40 shadow-sm ring-1 ring-accent/30'
                            : isCompleted
                            ? 'border-border hover:border-border-strong'
                            : isAvailable
                            ? 'border-border hover:border-accent/40'
                            : 'border-border/60 opacity-50 bg-background/50 cursor-not-allowed',
                        ].join(' ')}
                      >
                        {/* Node status indicator and title */}
                        <div className="flex items-center gap-3">
                          <div className="shrink-0" aria-hidden="true">
                            {isCompleted && (
                              <div className="w-7 h-7 rounded-full bg-success-light text-success border border-success/30 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            )}
                            {isCurrent && (
                              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center animate-pulse">
                                <MapPin className="h-4 w-4" />
                              </div>
                            )}
                            {isAvailable && (
                              <div className="w-7 h-7 rounded-full bg-surface-raised border border-border text-muted flex items-center justify-center">
                                <Circle className="h-3.5 w-3.5" />
                              </div>
                            )}
                            {isLocked && (
                              <div className="w-7 h-7 rounded-full bg-surface border border-border/50 text-muted/60 flex items-center justify-center">
                                <Lock className="h-3.5 w-3.5" />
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[11px] font-semibold text-muted">
                                {si + 1}.{li + 1}
                              </span>
                              <Badge
                                variant={
                                  isCompleted ? 'success' : isCurrent ? 'accent' : isAvailable ? 'default' : 'muted'
                                }
                                className="text-[9px] py-0 px-1.5"
                              >
                                {isCompleted
                                  ? t.learn.completed
                                  : isCurrent
                                  ? t.learn.current
                                  : isAvailable
                                  ? t.learn.available
                                  : t.learn.locked}
                              </Badge>
                            </div>
                            <span className={[
                              'text-sm font-semibold block',
                              isCurrent ? 'text-accent' : isLocked ? 'text-muted' : 'text-foreground',
                            ].join(' ')}>
                              {lesson.title}
                            </span>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
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
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Final Treasure Chest Node in Path ──────────────────────────── */}
          <div className="ml-4 pl-6 border-l-2 border-dashed border-border pt-2 pb-6">
            <div className={[
              'surface rounded-[var(--r-xl)] p-6 border text-center transition-all',
              isAllCompleted
                ? 'border-amber bg-amber-light/30 shadow-md ring-2 ring-amber/30'
                : 'border-border/70',
            ].join(' ')}>
              <div className="w-16 h-16 rounded-full bg-surface-raised border border-border mx-auto flex items-center justify-center text-3xl mb-3">
                {isAllCompleted ? '🏆' : '🔒'}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">
                {t.learn.treasureChestTitle}
              </h3>
              <p className="text-xs text-muted max-w-md mx-auto mb-4">
                {t.learn.treasureChestSubtitle}
              </p>
              {isAllCompleted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-light text-success font-semibold text-xs rounded-[var(--r-md)] border border-success/30">
                  <Award className="h-4 w-4" />
                  {t.learn.treasureChestUnlocked}
                </div>
              ) : (
                <p className="text-xs text-muted font-medium">
                  {remainingCount} {t.learn.remainingToGoal}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Treasure Chest Modal ─────────────────────────────────────────── */}
        {showChestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="surface rounded-[var(--r-xl)] p-6 md:p-8 border border-border shadow-2xl max-w-md w-full text-center relative">
              <div className="text-5xl mb-4">
                {isAllCompleted ? '🏆' : '🎁'}
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                {t.learn.treasureChestTitle}
              </h2>
              <p className="text-xs text-muted mb-6 leading-relaxed">
                {isAllCompleted
                  ? t.learn.treasureChestUnlocked
                  : t.learn.treasureChestSubtitle}
              </p>

              <div className="bg-surface-raised rounded-[var(--r-md)] p-4 border border-border mb-6 text-left">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted">{t.learn.overallProgress}:</span>
                  <span className="font-bold text-foreground">{completionPercent}%</span>
                </div>
                <ProgressBar value={completionPercent} showLabel={false} />
                <p className="text-[11px] text-muted mt-2">
                  {completedCount} / {totalLessons} {t.courseDetail.lessons} {t.learn.completed.toLowerCase()}
                </p>
              </div>

              <Button onClick={() => setShowChestModal(false)} className="w-full">
                {t.dashboard.closeBtn}
              </Button>
            </div>
          </div>
        )}
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
