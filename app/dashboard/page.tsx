'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  LogOut,
  Sparkles,
  CheckCircle2,
  Compass,
  Settings,
  X,
  Target,
  Globe,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { COURSES, getCourse, getLesson, getAllLessons } from '@/lib/data/courses';
import { getLevelLabel } from '@/lib/data/diagnostics';
import { isSupabaseConfigured } from '@/lib/env';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseProgress, CourseId, UserProfile, Locale } from '@/lib/types';

const AVATARS = [
  { emoji: '🦊', label: 'Scholar Fox' },
  { emoji: '🦉', label: 'Owl Strategist' },
  { emoji: '🚀', label: 'Explorer' },
  { emoji: '💡', label: 'Innovator' },
  { emoji: '⚡', label: 'High Voltage' },
  { emoji: '🧠', label: 'Polyglot Mind' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<{ progress: CourseProgress; courseId: CourseId }[]>([]);
  const [demoMode] = useState(!isSupabaseConfigured());

  // Profile modal state
  const [showSettings, setShowSettings] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('🦊');
  const [editGoal, setEditGoal] = useState(30);
  const [editLocale, setEditLocale] = useState<Locale>(locale);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!DemoState.isAuthenticated()) {
      router.replace('/auth');
      return;
    }
    const currentUser = DemoState.getUser();
    setUser(currentUser);
    if (currentUser) {
      setEditName(currentUser.displayName ?? '');
      setEditAvatar(currentUser.avatar ?? '🦊');
      setEditGoal(currentUser.dailyGoalMinutes ?? 30);
    }
    setEditLocale(locale);

    // Gather enrolled courses
    const enrolled: { progress: CourseProgress; courseId: CourseId }[] = [];
    for (const course of COURSES) {
      if (DemoState.isEnrolled(course.id)) {
        const prog = DemoState.getProgress(course.id);
        if (prog) enrolled.push({ progress: prog, courseId: course.id });
      }
    }
    setEnrolledCourses(enrolled);
  }, [router, locale]);

  function handleSignOut() {
    DemoState.signOut();
    router.push('/');
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    DemoState.updateProfile({
      displayName: editName.trim() || 'Learner',
      avatar: editAvatar,
      dailyGoalMinutes: editGoal,
      locale: editLocale,
    });
    setUser(DemoState.getUser());
    if (editLocale !== locale) {
      setLocale(editLocale);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
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

  const currentAvatar = user?.avatar ?? '🦊';
  const dailyGoal = user?.dailyGoalMinutes ?? 30;

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
                {currentAvatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span>{user?.displayName ?? user?.email ?? t.dashboard.greeting}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-muted">
                  {user?.email && <span>{user.email}</span>}
                  <span className="text-border">•</span>
                  <span className="flex items-center gap-1 text-accent font-medium">
                    <Target className="h-3 w-3" />
                    {dailyGoal} {t.dashboard.minutesUnit}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1.5 text-xs text-foreground font-medium surface px-3.5 py-2 rounded-[var(--r-sm)] border border-border hover:border-accent/40 transition-colors"
              >
                <Settings className="h-3.5 w-3.5 text-accent" />
                <span>{t.dashboard.profileSettingsBtn}</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors font-medium surface px-3 py-2 rounded-[var(--r-sm)] border border-border"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t.dashboard.signOutBtn}</span>
              </button>
            </div>
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
                  {t.dashboard.analyzerCompletedRatio}: <strong className="text-foreground">{analyzerStats.totalCompleted}</strong> of {analyzerStats.totalLessonsAcrossEnrolled} {t.courseDetail.lessons}.
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
                  <p className="text-xs text-success flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>{t.dashboard.allUpToDate}</span>
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
                const levelName = getLevelLabel(progress.level, locale);

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
              const isTech = c.category === 'programming';
              const isLang = c.category === 'languages';

              return (
                <Link key={c.id} href={`/courses/${c.id}`} className="group block">
                  <Panel className="hover-lift border border-border/80 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={isTech ? 'blue' : isLang ? 'accent' : 'muted'} className="text-[10px]">
                          {isTech ? t.catalog.techCategory : isLang ? t.catalog.langCategory : t.catalog.profCategory}
                        </Badge>
                        <span className="text-[11px] text-muted">{c.estimatedHours} {t.home.hoursUnit}</span>
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

        {/* ── Profile Settings Modal ────────────────────────────────────────── */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass glass-shine rounded-[var(--r-xl)] p-6 md:p-8 border border-border/80 shadow-2xl max-w-md w-full relative">
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors p-1"
                aria-label={t.dashboard.closeBtn}
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-foreground mb-1">
                {t.dashboard.editProfileTitle}
              </h2>
              <p className="text-xs text-muted mb-6">
                Настройте имя, аватар и ежедневную цель для персонального планирования.
              </p>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                {/* Display Name */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">
                    {t.dashboard.displayNameLabel}
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full bg-surface border border-border rounded-[var(--r-md)] px-3.5 py-2 text-sm text-foreground focus-accent"
                  />
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 block">
                    {t.dashboard.avatarLabel}
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATARS.map(item => (
                      <button
                        key={item.emoji}
                        type="button"
                        onClick={() => setEditAvatar(item.emoji)}
                        className={[
                          'h-11 rounded-[var(--r-md)] border text-xl flex items-center justify-center transition-all',
                          editAvatar === item.emoji
                            ? 'border-accent bg-accent/20 ring-2 ring-accent scale-105'
                            : 'border-border bg-surface hover:bg-surface-raised',
                        ].join(' ')}
                        title={item.label}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interface Language */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-accent" />
                    {t.dashboard.interfaceLangLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { code: 'en' as Locale, label: 'English' },
                      { code: 'ru' as Locale, label: 'Русский' },
                      { code: 'ky' as Locale, label: 'Кыргызча' },
                    ].map(item => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setEditLocale(item.code)}
                        className={[
                          'py-2 px-3 rounded-[var(--r-md)] border text-xs font-medium transition-all text-center',
                          editLocale === item.code
                            ? 'border-accent bg-accent/20 text-accent font-semibold'
                            : 'border-border bg-surface text-muted hover:text-foreground',
                        ].join(' ')}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Goal */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-accent" />
                    {t.dashboard.dailyGoalLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map(minutes => (
                      <button
                        key={minutes}
                        type="button"
                        onClick={() => setEditGoal(minutes)}
                        className={[
                          'py-2 rounded-[var(--r-md)] border text-xs font-medium transition-all text-center',
                          editGoal === minutes
                            ? 'border-accent bg-accent text-white shadow-sm'
                            : 'border-border bg-surface text-muted hover:text-foreground',
                        ].join(' ')}
                      >
                        {minutes}m
                      </button>
                    ))}
                  </div>
                </div>

                {saveSuccess ? (
                  <div className="surface rounded-[var(--r-md)] p-3 border border-success/40 text-xs text-success flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>{t.dashboard.profileSaved}</span>
                  </div>
                ) : (
                  <div className="flex gap-2.5 mt-2">
                    <Button type="submit" className="flex-1">
                      {t.dashboard.saveChangesBtn}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setShowSettings(false)}>
                      {t.dashboard.closeBtn}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
