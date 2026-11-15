'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  VideoOff,
  Target,
  TrendingUp,
  ChevronDown,
  Send,
  Flag,
  BookOpen,
  Code,
  Briefcase,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DemoEnrollModal } from '@/components/modals/DemoEnrollModal';
import { useLanguage } from '@/lib/i18n/context';
import { COURSES } from '@/lib/data/courses';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseCategory } from '@/lib/types';

function PathPreview() {
  const { locale } = useLanguage();
  const steps = locale === 'ru'
    ? [
        { label: 'Переменные и типы данных', done: true, active: false },
        { label: 'Управляющие конструкции (if/for)', done: false, active: true },
        { label: 'Чекпоинт: Проверочный тест', done: false, active: false, isCheckpoint: true },
        { label: 'Финиш: Итоговый проект', done: false, active: false, isFinish: true },
      ]
    : locale === 'ky'
    ? [
        { label: 'Өзгөрмөлөр жана маалымат типтери', done: true, active: false },
        { label: 'Башкаруу конструкциялары', done: false, active: true },
        { label: 'Чекпоинт: Текшерүү тести', done: false, active: false, isCheckpoint: true },
        { label: 'Финиш: Жыйынтыктоочу долбоор', done: false, active: false, isFinish: true },
      ]
    : [
        { label: 'Variables & Data Types', done: true, active: false },
        { label: 'Control Flow (if/for)', done: false, active: true },
        { label: 'Checkpoint: Knowledge Quiz', done: false, active: false, isCheckpoint: true },
        { label: 'Finish Goal: Capstone Project', done: false, active: false, isFinish: true },
      ];

  return (
    <div className="flex flex-col gap-3 relative">
      {steps.map((step, i) => (
        <div
          key={i}
          className={[
            'flex items-center gap-3 px-4 py-3 rounded-[var(--r-md)] border transition-all',
            step.done
              ? 'surface border-border text-foreground'
              : step.active
              ? 'surface-raised border-accent text-foreground shadow-sm ring-1 ring-accent/30'
              : step.isFinish
              ? 'bg-surface-raised border-border text-foreground font-semibold'
              : 'bg-background/40 border-border/60 text-muted opacity-60',
          ].join(' ')}
        >
          {/* Circular Board Game Cell */}
          <div
            className={[
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              step.done
                ? 'bg-success text-white'
                : step.active
                ? 'bg-accent text-white shadow-xs'
                : step.isFinish
                ? 'bg-surface border-2 border-accent text-accent'
                : step.isCheckpoint
                ? 'bg-surface border border-accent/40 text-accent'
                : 'bg-surface border border-border text-muted',
            ].join(' ')}
          >
            {step.done ? (
              '✓'
            ) : step.active ? (
              '🦊'
            ) : step.isFinish ? (
              <Flag className="w-3.5 h-3.5" />
            ) : (
              i + 1
            )}
          </div>
          <span className="text-xs md:text-sm font-medium">{step.label}</span>
          {step.active && (
            <span className="ml-auto text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-full shrink-0">
              Вы здесь
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const filteredCourses = COURSES.filter(
    c => selectedCategory === 'all' || c.category === selectedCategory
  );

  function handleSendFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setFeedbackText('');
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden transition-colors duration-200">
      {/* Subtle ambient light highlight orbs (suppressed on prefers-reduced-motion) */}
      <div className="ambient-orb-blue top-[-100px] right-[-100px]" aria-hidden="true" />
      <div className="ambient-orb-secondary top-[650px] left-[-120px]" aria-hidden="true" />

      {/* Unified Navbar with Theme and Language Selectors */}
      <Navbar />

      <main className="flex-1">
        {/* ── 1. Hero Section: Clear Value Proposition & Product Preview ─── */}
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Heading and Clear CTAs */}
            <div>
              <div className="mb-4">
                <Badge variant="accent">{t.home.badge}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-5">
                {t.home.heroHeadline1}{' '}
                <span className="text-accent">{t.home.heroHeadline2}</span>
              </h1>
              <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-xl">
                {t.home.heroSub}
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link href="/courses">
                  <Button size="lg">
                    {t.home.startBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="px-6 py-3.5 text-base rounded-[var(--r-lg)] bg-surface text-foreground border border-border hover:border-accent/40 font-medium transition-all active:scale-[0.98] shadow-xs"
                >
                  {t.promo.consultationTitle}
                </button>
              </div>
            </div>

            {/* Right Column: Board-Game Road Preview */}
            <div className="relative">
              <div className="surface rounded-[var(--r-xl)] p-7 border border-border shadow-md relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-0.5">
                      {t.home.pathDemoTrack}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{t.home.pathDemoStage}</p>
                  </div>
                  <Badge variant="default">{t.home.pathDemoLevel}</Badge>
                </div>
                <PathPreview />
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">{t.home.pathDemoCompleted}</span>
                  <div className="flex-1 mx-4 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">33%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Who Kivora Helps & Real Learning Pain Points ─────────────── */}
        <section className="bg-surface border-y border-border py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="default" className="mb-3">{t.home.problemBadge}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t.home.problemTitle}
              </h2>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {t.home.problemSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="surface-raised rounded-[var(--r-xl)] p-6 border border-border">
                <div className="w-12 h-12 rounded-[var(--r-md)] bg-danger-light text-danger flex items-center justify-center mb-4">
                  <VideoOff className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t.home.problem1Title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t.home.problem1Desc}
                </p>
              </div>

              <div className="surface-raised rounded-[var(--r-xl)] p-6 border border-border">
                <div className="w-12 h-12 rounded-[var(--r-md)] bg-amber-light text-amber flex items-center justify-center mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t.home.problem2Title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t.home.problem2Desc}
                </p>
              </div>

              <div className="surface-raised rounded-[var(--r-xl)] p-6 border border-border">
                <div className="w-12 h-12 rounded-[var(--r-md)] bg-accent-light text-accent flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t.home.problem3Title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t.home.problem3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. How Kivora Works: The 5-Step Pipeline ────────────────────── */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-3">{t.home.howBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.howTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.howSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: t.home.step1Title, desc: t.home.step1Desc },
              { title: t.home.step2Title, desc: t.home.step2Desc },
              { title: t.home.step3Title, desc: t.home.step3Desc },
              { title: t.home.step4Title, desc: t.home.step4Desc },
              { title: t.home.step5Title, desc: t.home.step5Desc },
            ].map((step, idx) => (
              <div
                key={idx}
                className="surface rounded-[var(--r-xl)] p-5 border border-border flex flex-col justify-between hover-lift relative"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs mb-3 shadow-xs">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Catalog Tracks Preview ────────────────────────────────────── */}
        <section className="bg-surface border-y border-border py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <Badge variant="default" className="mb-2">15 Tracks</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t.home.tracksTitle}
                </h2>
                <p className="text-sm text-muted mt-1 max-w-lg">
                  {t.home.tracksSubtitle}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-medium transition-colors',
                    selectedCategory === 'all'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.allCategories}
                </button>
                <button
                  onClick={() => setSelectedCategory('programming')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-medium transition-colors',
                    selectedCategory === 'programming'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.techCategory}
                </button>
                <button
                  onClick={() => setSelectedCategory('languages')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-medium transition-colors',
                    selectedCategory === 'languages'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.langCategory}
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.slice(0, 6).map(course => {
                const loc = getLocalizedCourse(course, locale);
                const Icon =
                  course.category === 'programming'
                    ? Code
                    : course.category === 'languages'
                    ? BookOpen
                    : Briefcase;

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="surface rounded-[var(--r-xl)] p-5 border border-border hover-lift block transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        {course.estimatedHours}h
                      </Badge>
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-accent transition-colors">
                      {loc.title}
                    </h3>
                    <p className="text-xs text-muted mb-4 line-clamp-2 leading-relaxed">
                      {loc.description}
                    </p>
                    <div className="flex items-center justify-between text-xs font-semibold text-accent pt-3 border-t border-border">
                      <span>{t.catalog.startCourse}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/courses">
                <Button size="md" variant="secondary">
                  {t.catalog.allCategories} (15)
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. What's Inside: Real Core Modules ──────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-3">{t.home.insideBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.insideTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.insideSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside1Title}</h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside1Desc}</p>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">Диагностика:</span> Точное выявление пробелов и автогенерация недельного темпа.
              </div>
            </div>

            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside2Title}</h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside2Desc}</p>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">Метод Сократа:</span> Подсказки, альтернативные примеры и мини-тесты вместо готовых ответов.
              </div>
            </div>

            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside3Title}</h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside3Desc}</p>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">Финишный счётчик:</span> Измеримый прогресс каждого урока и наглядный путь до сертификата.
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Trust & Early Adopters Section ────────────────────────────── */}
        <section className="bg-surface border-y border-border py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="surface-raised rounded-[var(--r-xl)] p-8 border border-border shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-8">
                <Badge variant="accent" className="mb-2">{t.home.feedbackBadge}</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t.home.feedbackTitle}
                </h2>
                <p className="text-xs md:text-sm text-muted">
                  {t.home.feedbackDesc}
                </p>
              </div>

              {feedbackSent ? (
                <div className="surface rounded-[var(--r-md)] p-6 text-center border border-success/40 text-success">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-success" />
                  <p className="font-semibold text-sm">{t.home.feedbackSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder={t.home.feedbackPlaceholder}
                    required
                    className="flex-1 px-4 py-2.5 rounded-[var(--r-md)] text-sm bg-surface border border-border placeholder:text-subtle text-foreground focus-accent"
                  />
                  <Button type="submit" size="md">
                    <Send className="h-4 w-4 mr-1.5" />
                    {t.home.feedbackBtn}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 7. Commercial Consultation & Access Options ──────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-3">{t.home.pricingBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.pricingTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.pricingSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter Tier */}
            <div className="surface rounded-[var(--r-xl)] p-7 border border-border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">{t.home.tierStarterTitle}</h3>
                <p className="text-xs text-muted mb-4">{t.home.tierStarterDesc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-foreground">{t.home.tierStarterPrice}</span>
                  <span className="text-xs text-muted">{t.home.tierStarterPeriod}</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs text-muted mb-6">
                  {t.home.tierStarterFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/courses">
                <Button variant="secondary" className="w-full">
                  {t.home.startBtn}
                </Button>
              </Link>
            </div>

            {/* Student Tier (Highlighted) */}
            <div className="surface-raised rounded-[var(--r-xl)] p-7 border-2 border-accent shadow-md flex flex-col justify-between relative">
              <div className="absolute top-[-11px] right-6">
                <Badge variant="accent">{t.home.tierStudentBadge}</Badge>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">{t.home.tierStudentTitle}</h3>
                <p className="text-xs text-muted mb-4">{t.home.tierStudentDesc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-accent">{t.home.tierStudentPrice}</span>
                  <span className="text-xs text-muted">{t.home.tierStudentPeriod}</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs text-foreground mb-6">
                  {t.home.tierStudentFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="w-full py-2.5 px-4 rounded-[var(--r-md)] bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-xs"
              >
                {t.promo.consultationTitle}
              </button>
            </div>

            {/* Pro Tier */}
            <div className="surface rounded-[var(--r-xl)] p-7 border border-border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">{t.home.tierProTitle}</h3>
                <p className="text-xs text-muted mb-4">{t.home.tierProDesc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-foreground">{t.home.tierProPrice}</span>
                  <span className="text-xs text-muted">{t.home.tierProPeriod}</span>
                </div>
                <ul className="flex flex-col gap-2.5 text-xs text-muted mb-6">
                  {t.home.tierProFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="w-full py-2.5 px-4 rounded-[var(--r-md)] bg-surface text-foreground border border-border font-medium text-sm hover:border-accent/40 transition-colors shadow-xs"
              >
                {t.promo.consultationTitle}
              </button>
            </div>
          </div>
        </section>

        {/* ── 8. Interactive FAQ Accordion ─────────────────────────────────── */}
        <section className="bg-surface border-t border-border py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t.home.faqTitle}
              </h2>
              <p className="text-sm text-muted">
                {t.home.faqSubtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {t.home.faqList.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="surface-raised rounded-[var(--r-lg)] border border-border overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-foreground hover:bg-surface transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={[
                          'h-4 w-4 text-muted transition-transform shrink-0 ml-3',
                          isOpen ? 'rotate-180 text-accent' : '',
                        ].join(' ')}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-muted leading-relaxed border-t border-border">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 9. Final CTA ─────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-border bg-surface">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.readyTitle}
            </h2>
            <p className="text-muted mb-8 text-sm md:text-base">
              {t.home.readySubtitle}
            </p>
            <Link href="/courses">
              <Button size="lg">
                {t.home.ctaBtn}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-muted">
              {t.home.noCardNeeded}
            </p>
          </div>
        </section>
      </main>

      {/* Clean Global Footer */}
      <footer className="border-t border-border py-8 px-6 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="font-semibold text-foreground">Kivora</span>
            <Link href="/courses" className="hover:text-foreground transition-colors">{t.nav.courses}</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">{t.nav.dashboard}</Link>
            <Link href="/tutor" className="hover:text-foreground transition-colors">{t.nav.tutor}</Link>
          </div>
          <span className="text-xs text-subtle text-center sm:text-right">
            {t.home.footerStatus}
          </span>
        </div>
      </footer>

      {/* Demo Enrollment & Educational Consultation Modal */}
      <DemoEnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
      />
    </div>
  );
}
