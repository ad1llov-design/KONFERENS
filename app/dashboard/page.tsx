'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, LogOut, User, Sparkles, CheckCircle2, Compass } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { COURSES, getCourse, getLesson, getAllLessons } from '@/lib/data/courses';
import { LEVEL_LABELS } from '@/lib/data/diagnostics';
import { isSupabaseConfigured } from '@/lib/env';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseProgress, CourseId } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ displayName?: string | null; email: string } | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<{ progress: CourseProgress; courseId: CourseId }[]>([]);
  const [demoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    setMounted(true);
    if (!DemoState.isAuthenticated()) {
      router.replace('/auth');
      return;
    }
    setUser(DemoState.getUser());

    // Gather enrolled courses
    const enrolled: { progress: CourseProgress; courseId: CourseId }[] = [];
    for (const course of COURSES) {
      if (DemoState.isEnrolled(course.id)) {
        const prog = DemoState.getProgress(course.id);
        if (prog) enrolled.push({ progress: prog, courseId: course.id });
      }
    }
    setEnrolledCourses(enrolled);
  }, [router]);

  function handleSignOut() {
    DemoState.signOut();
    router.push('/');
  }

  // ─── Real Progress Analyzer Calculations ─────────────────────────────────
  const analyzerStats = useMemo(() => {
    if (enrolledCourses.length === 0) return null;

    let totalCompleted = 0;
    let totalLessonsAcrossEnrolled = 0;

    for (const { courseId, progress } of enrolledCourses) {
      totalCompleted += progress.completedLessons.length;
      totalLessonsAcrossEnrolled += getAllLessons(courseId).length;
    }

    const overallPct = totalLessonsAcrossEnrolled > 0
      ? Math.round((totalCompleted / totalLessonsAcrossEnrolled) * 100)
      : 0;

    // Pick active course (first with incomplete lessons, or first course)
    const activeEntry = enrolledCourses.find(e => {
      const allL = getAllLessons(e.courseId);
      return e.progress.completedLessons.length < allL.length;
    }) ?? enrolledCourses[0];

    const activeCourse = activeEntry ? getCourse(activeEntry.courseId) : null;
    const activeLocCourse = activeCourse ? getLocalizedCourse(activeCourse, locale) : null;
    const nextLessonId = activeEntry?.progress.currentLessonId;
    const nextLesson = (activeEntry && nextLessonId) ? getLesson(activeEntry.courseId, nextLessonId) : null;

    return {
      totalCompleted,
      totalLessonsAcrossEnrolled,
      overallPct,
      activeCourseId: activeEntry?.courseId,
      activeCourseTitle: activeLocCourse?.title ?? activeCourse?.title,
      nextLesson,
      nextLessonId,
    };
  }, [enrolledCourses, locale]);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">

        {demoMode && (
          <div className="mb-6">
            <DemoBanner
              message={t.dashboard.demoBanner}
              missingVars={['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']}
            />
          </div>
        )}

        {/* User Profile Header */}
        <div className="glass rounded-[var(--r-xl)] p-6 mb-8 border border-border/80 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
                <User className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {user?.displayName ?? user?.email ?? t.dashboard.greeting}
                </h1>
                {user?.email && user.displayName && (
                  <p className="text-xs text-muted mt-0.5">{user.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-medium surface px-3 py-1.5 rounded-[var(--r-sm)] border border-border"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t.dashboard.signOutBtn}</span>
            </button>
          </div>
        </div>

        {/* Progress Analyzer Card (Based strictly on real data) */}
        {analyzerStats && (
          <div className="glass rounded-[var(--r-xl)] p-6 mb-8 border border-accent/30 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {t.dashboard.analyzerTitle}
                  </Badge>
                  <span className="text-xs text-muted font-medium">
                    {analyzerStats.overallPct}% {t.learn.completed}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  {analyzerStats.activeCourseTitle}
                </h2>
                <p className="text-xs md:text-sm text-muted mb-4">
                  {t.dashboard.analyzerCompletedRatio}: <strong className="text-foreground">{analyzerStats.totalCompleted}</strong> of {analyzerStats.totalLessonsAcrossEnrolled} lessons.
                </p>

                {analyzerStats.nextLesson && analyzerStats.activeCourseId ? (
                  <div className="surface rounded-[var(--r-md)] p-3.5 border border-border flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-accent font-semibold">
                        {t.dashboard.analyzerNextStep}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {analyzerStats.nextLesson.title}
                      </p>
                    </div>
                    <Link href={`/courses/${analyzerStats.activeCourseId}/learn/${analyzerStats.nextLessonId}`}>
                      <Button size="sm">
                        {t.dashboard.analyzerContinueStudy}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> All enrolled lessons are currently up to date!
                  </p>
                )}
              </div>

              <div className="w-full md:w-56 shrink-0 bg-surface rounded-[var(--r-lg)] p-4 border border-border text-center">
                <p className="text-xs text-muted uppercase font-medium tracking-wider mb-1">
                  {t.dashboard.analyzerActivePace}
                </p>
                <div className="text-3xl font-black text-accent mb-2">
                  {analyzerStats.overallPct}%
                </div>
                <ProgressBar value={analyzerStats.overallPct} showLabel={false} />
              </div>
            </div>
          </div>
        )}

        {/* Enrolled courses list */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            {t.dashboard.yourCourses} ({enrolledCourses.length})
          </h2>

          {enrolledCourses.length === 0 ? (
            <EmptyState
              icon={<Compass className="h-10 w-10 text-accent" />}
              title={t.dashboard.noCoursesTitle}
              description={t.dashboard.noCoursesDesc}
              action={
                <Link href="/courses">
                  <Button>{t.dashboard.browseCoursesBtn} <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {enrolledCourses.map(({ progress, courseId }) => {
                const rawC = getCourse(courseId);
                if (!rawC) return null;
                const course = getLocalizedCourse(rawC, locale);
                const pct = DemoState.getCompletionPercent(courseId);
                const levelName = LEVEL_LABELS[progress.level] || progress.level;

                return (
                  <div key={courseId} className="surface rounded-[var(--r-xl)] p-6 border border-border/80 hover:border-accent/40 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{course.title}</h3>
                          <Badge variant="accent" className="mt-1">{levelName}</Badge>
                        </div>
                        <span className="text-sm font-bold text-accent">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} showLabel={false} className="mb-5" />
                    </div>

                    <div className="flex gap-2.5 pt-4 border-t border-border/60">
                      {progress.currentLessonId ? (
                        <Link href={`/courses/${courseId}/learn/${progress.currentLessonId}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            {t.dashboard.continueBtn} <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/courses/${courseId}/learn`} className="flex-1">
                          <Button className="w-full" size="sm">
                            {t.dashboard.viewPathBtn} <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/tutor?course=${courseId}`}>
                        <Button variant="secondary" size="sm">
                          {t.dashboard.askTutorBtn}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Explore more tracks from the catalog */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">
              {t.dashboard.exploreMore}
            </h2>
            <Link href="/courses" className="text-xs text-accent hover:underline font-semibold flex items-center gap-1">
              {t.dashboard.browseCoursesBtn} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {COURSES.filter(c => !enrolledCourses.some(e => e.courseId === c.id)).slice(0, 6).map(c => {
              const loc = getLocalizedCourse(c, locale);
              return (
                <Link key={c.id} href={`/courses/${c.id}`} className="group block">
                  <Panel className="hover-lift border border-border/80 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={c.category === 'programming' ? 'blue' : c.category === 'languages' ? 'accent' : 'success'} className="text-[10px]">
                          {c.category === 'programming' ? t.catalog.techCategory : c.category === 'languages' ? t.catalog.langCategory : t.catalog.profCategory}
                        </Badge>
                        <span className="text-[11px] text-muted">{c.estimatedHours}h</span>
                      </div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors mb-1">
                        {loc.title}
                      </p>
                      <p className="text-xs text-muted line-clamp-2">{loc.description}</p>
                    </div>
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-3 text-xs text-accent font-medium">
                      <span>{t.catalog.startCourse}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Panel>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
