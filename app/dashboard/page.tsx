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
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { soundManager } from '@/lib/sound/sound-manager';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { COURSES, getCourse, getLesson, getAllLessons } from '@/lib/data/courses';
import { getLocalizedLesson } from '@/lib/data/course-content-localization';
import { getLevelLabel } from '@/lib/data/diagnostics';
import { isSupabaseConfigured } from '@/lib/env';
import { useLanguage } from '@/lib/i18n/context';
import { useTheme } from '@/components/theme/ThemeProvider';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseProgress, CourseId, UserProfile, Locale, ThemeMode } from '@/lib/types';

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
  const { theme, setTheme } = useTheme();
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
  const [editTheme, setEditTheme] = useState<ThemeMode>(theme);
  const [editSoundEnabled, setEditSoundEnabled] = useState(true);
  const [editSoundVolume, setEditSoundVolume] = useState(0.7);
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
      if (currentUser.theme) setEditTheme(currentUser.theme);
      if (typeof currentUser.soundEnabled === 'boolean') {
        setEditSoundEnabled(currentUser.soundEnabled);
      } else {
        setEditSoundEnabled(soundManager.isEnabled());
      }
      if (typeof currentUser.soundVolume === 'number') {
        setEditSoundVolume(currentUser.soundVolume);
      } else {
        setEditSoundVolume(soundManager.getVolume());
      }
    } else {
      setEditSoundEnabled(soundManager.isEnabled());
      setEditSoundVolume(soundManager.getVolume());
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
      theme: editTheme,
      soundEnabled: editSoundEnabled,
      soundVolume: editSoundVolume,
    });
    soundManager.setEnabled(editSoundEnabled);
    soundManager.setVolume(editSoundVolume);
    setUser(DemoState.getUser());
    if (editLocale !== locale) {
      setLocale(editLocale);
    }
    if (editTheme !== theme) {
      setTheme(editTheme);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
  }

  // ─── Progress Analyzer Calculations ─────────────────────────────────
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
    const rawLesson = (activeEntry && nextLessonId) ? getLesson(activeEntry.courseId, nextLessonId) : null;
    const nextLesson = (rawLesson && activeEntry) ? getLocalizedLesson(activeEntry.courseId, rawLesson, locale) : null;

    const isFinished = totalCompleted > 0 && totalCompleted === totalLessonsAcrossEnrolled;

    return {
      totalCompleted,
      totalLessonsAcrossEnrolled,
      overallPct,
      activeCourseId: activeEntry?.courseId,
      activeCourseTitle: activeLocCourse?.title ?? activeCourse?.title,
      nextLesson,
      nextLessonId,
      isFinished,
    };
  }, [enrolledCourses, locale]);

  // ─── Diagnostic Check for Users with No Enrolled Courses ─────────────────
  let diagnosticEntry: { courseId: string; courseTitle: string; diag: unknown } | null = null;
  if (enrolledCourses.length === 0) {
    for (const course of COURSES) {
      const diag = DemoState.getDiagnosticResult(course.id);
      if (diag) {
        const loc = getLocalizedCourse(course, locale);
        diagnosticEntry = { courseId: course.id, courseTitle: loc.title, diag };
        break;
      }
    }
  }

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const currentAvatar = user?.avatar ?? '🦊';
  const dailyGoal = user?.dailyGoalMinutes ?? 30;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
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
        <div className="surface rounded-[var(--r-xl)] p-6 mb-8 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center text-2xl shrink-0">
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
                    <Target className="h-3.5 w-3.5" />
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

        {/* ─── 4-State Recommendation & Progress Analyzer ────────────────── */}
        <div className="mb-8">
          {/* State 1: Active enrolled course with next incomplete lesson */}
          {analyzerStats && !analyzerStats.isFinished && analyzerStats.nextLesson && analyzerStats.activeCourseId && (
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-sm relative overflow-hidden">
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
                    {t.dashboard.analyzerCompletedRatio}: <strong className="text-foreground">{analyzerStats.totalCompleted}</strong> / {analyzerStats.totalLessonsAcrossEnrolled} {t.courseDetail.lessons}.
                  </p>

                  <div className="bg-surface-raised rounded-[var(--r-md)] p-4 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-0.5">
                        {t.dashboard.recommendationTitle}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {analyzerStats.nextLesson.title}
                      </p>
                    </div>
                    <Link href={`/courses/${analyzerStats.activeCourseId}/learn/${analyzerStats.nextLessonId}`}>
                      <Button size="sm">
                        {t.dashboard.recommendationContinueLesson}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="w-full md:w-56 shrink-0 bg-surface-raised rounded-[var(--r-lg)] p-4 border border-border text-center">
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

          {/* State 2: Diagnostic completed, but no plan or active enrollment */}
          {!analyzerStats && diagnosticEntry && (
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Badge variant="accent" className="mb-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {t.dashboard.recommendationTitle}
                  </Badge>
                  <h2 className="text-lg font-bold text-foreground mb-1">
                    {diagnosticEntry.courseTitle}
                  </h2>
                  <p className="text-xs md:text-sm text-muted max-w-xl">
                    {t.dashboard.recommendationPlanDesc}
                  </p>
                </div>
                <Link href={`/courses/${diagnosticEntry.courseId}/diagnostic`}>
                  <Button size="md">
                    {t.dashboard.recommendationOpenPlan}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* State 3: No active course and no diagnostic taken */}
          {!analyzerStats && !diagnosticEntry && (
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-1">
                      {t.dashboard.recommendationNoCoursesTitle}
                    </h2>
                    <p className="text-xs md:text-sm text-muted max-w-lg">
                      {t.dashboard.recommendationNoCoursesDesc}
                    </p>
                  </div>
                </div>
                <Link href="/courses">
                  <Button size="md">
                    {t.dashboard.recommendationExploreBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* State 4: Active courses are 100% completed */}
          {analyzerStats && analyzerStats.isFinished && (
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <h2 className="text-lg font-bold text-foreground">
                      {t.dashboard.recommendationCourseCompletedTitle}
                    </h2>
                  </div>
                  <p className="text-xs md:text-sm text-muted max-w-xl">
                    {t.dashboard.recommendationCourseCompletedDesc}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  {analyzerStats.activeCourseId && (
                    <Link href={`/courses/${analyzerStats.activeCourseId}/learn`}>
                      <Button variant="secondary" size="sm">
                        <RotateCcw className="h-3.5 w-3.5" />
                        {t.dashboard.recommendationReviewTopics}
                      </Button>
                    </Link>
                  )}
                  <Link href="/courses">
                    <Button size="sm">
                      {t.dashboard.browseCoursesBtn}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enrolled courses list */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            {t.dashboard.yourCourses} ({enrolledCourses.length})
          </h2>

          {enrolledCourses.length === 0 ? (
            <div className="surface rounded-[var(--r-xl)] p-8 border border-border text-center">
              <Compass className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">{t.dashboard.noCoursesTitle}</h3>
              <p className="text-xs text-muted max-w-sm mx-auto mb-5">{t.dashboard.noCoursesDesc}</p>
              <Link href="/courses">
                <Button>{t.dashboard.browseCoursesBtn} <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {enrolledCourses.map(({ progress, courseId }) => {
                const rawC = getCourse(courseId);
                if (!rawC) return null;
                const course = getLocalizedCourse(rawC, locale);
                const pct = DemoState.getCompletionPercent(courseId);
                const levelName = getLevelLabel(progress.level, locale);

                return (
                  <div key={courseId} className="surface rounded-[var(--r-xl)] p-6 border border-border hover:border-accent/40 transition-colors flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-foreground">{course.title}</h3>
                          <Badge variant="accent" className="mt-1">{levelName}</Badge>
                        </div>
                        <span className="text-sm font-bold text-accent">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} showLabel={false} className="mb-5" />
                    </div>

                    <div className="flex gap-2.5 pt-4 border-t border-border">
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
                  <Panel className="border border-border h-full flex flex-col justify-between hover:border-accent/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={isTech ? 'default' : isLang ? 'accent' : 'muted'} className="text-[10px]">
                          {isTech ? t.catalog.techCategory : isLang ? t.catalog.langCategory : t.catalog.profCategory}
                        </Badge>
                        <span className="text-[11px] text-muted">{c.estimatedHours} {t.home.hoursUnit}</span>
                      </div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors mb-1">
                        {loc.title}
                      </p>
                      <p className="text-xs text-muted line-clamp-2">{loc.description}</p>
                    </div>
                    <div className="pt-3 border-t border-border flex items-center justify-between mt-3 text-xs text-accent font-medium">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="surface rounded-[var(--r-xl)] p-6 md:p-8 border border-border shadow-2xl max-w-md w-full relative">
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
                Настройте имя, аватар, цель и тему оформления для персонализации интерфейса.
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
                    className="w-full bg-surface-raised border border-border rounded-[var(--r-md)] px-3.5 py-2 text-sm text-foreground focus-accent"
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
                            ? 'border-accent bg-accent-light ring-2 ring-accent scale-105'
                            : 'border-border bg-surface-raised hover:bg-surface',
                        ].join(' ')}
                        title={item.label}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Theme (Light, Dark, System) */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Sun className="h-3.5 w-3.5 text-accent" />
                    {t.dashboard.themeSelectLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { mode: 'light' as ThemeMode, label: t.common.themeLight, icon: Sun },
                      { mode: 'dark' as ThemeMode, label: t.common.themeDark, icon: Moon },
                      { mode: 'system' as ThemeMode, label: t.common.themeSystem, icon: Monitor },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.mode}
                          type="button"
                          onClick={() => setEditTheme(item.mode)}
                          className={[
                            'py-2 px-2.5 rounded-[var(--r-md)] border text-xs font-medium transition-all flex items-center justify-center gap-1.5',
                            editTheme === item.mode
                              ? 'border-accent bg-accent-light text-accent font-semibold'
                              : 'border-border bg-surface-raised text-muted hover:text-foreground',
                          ].join(' ')}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
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
                            ? 'border-accent bg-accent-light text-accent font-semibold'
                            : 'border-border bg-surface-raised text-muted hover:text-foreground',
                        ].join(' ')}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound Effects & Volume */}
                <div className="p-3 rounded-[var(--r-md)] border border-border bg-surface-raised/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      {editSoundEnabled ? (
                        <Volume2 className="h-3.5 w-3.5 text-accent" />
                      ) : (
                        <VolumeX className="h-3.5 w-3.5 text-muted" />
                      )}
                      <span>
                        {locale === 'ru'
                          ? 'Игровые звуковые эффекты'
                          : locale === 'ky'
                          ? 'Оюндун үн эффекттери'
                          : 'Game Sound Effects'}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !editSoundEnabled;
                        setEditSoundEnabled(next);
                        if (next) soundManager.testSound();
                      }}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        editSoundEnabled
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'bg-muted/20 text-muted'
                      }`}
                    >
                      {editSoundEnabled
                        ? locale === 'ru'
                          ? 'ВКЛ'
                          : locale === 'ky'
                          ? 'КҮЙҮК'
                          : 'ON'
                        : locale === 'ru'
                        ? 'ВЫКЛ'
                        : locale === 'ky'
                        ? 'ӨЧҮК'
                        : 'OFF'}
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span>{locale === 'ru' ? 'Громкость' : locale === 'ky' ? 'Үндүн көлөмү' : 'Volume'}</span>
                      <span className="font-mono">{Math.round(editSoundVolume * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        disabled={!editSoundEnabled}
                        value={editSoundVolume}
                        onChange={(e) => setEditSoundVolume(parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent disabled:opacity-40"
                      />
                      <button
                        type="button"
                        disabled={!editSoundEnabled}
                        onClick={() => soundManager.testSound()}
                        className="px-2 py-1 text-[11px] font-medium rounded border border-border bg-surface hover:bg-background text-foreground transition-colors disabled:opacity-40 shrink-0"
                      >
                        {locale === 'ru' ? 'Проверить' : locale === 'ky' ? 'Текшерүү' : 'Test'}
                      </button>
                    </div>
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
                            : 'border-border bg-surface-raised text-muted hover:text-foreground',
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
