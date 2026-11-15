'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  VideoOff,
  Target,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  Send,
  Star,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
        { label: 'Функции и абстракции', done: false, active: false },
        { label: 'Сундук сокровищ: Итоговый проект', done: false, active: false, isTreasure: true },
      ]
    : locale === 'ky'
    ? [
        { label: 'Өзгөрмөлөр жана маалымат типтери', done: true, active: false },
        { label: 'Башкаруу конструкциялары', done: false, active: true },
        { label: 'Функциялар жана модулдар', done: false, active: false },
        { label: 'Кенч сандыкчасы: Финалдык долбоор', done: false, active: false, isTreasure: true },
      ]
    : [
        { label: 'Variables & Data Types', done: true, active: false },
        { label: 'Control Flow (if/for)', done: false, active: true },
        { label: 'Functions & Modules', done: false, active: false },
        { label: 'Treasure Chest: Capstone Project', done: false, active: false, isTreasure: true },
      ];

  return (
    <div className="flex flex-col gap-2.5">
      {steps.map((step, i) => (
        <div
          key={i}
          className={[
            'flex items-center gap-3 px-4 py-3 rounded-[var(--r-md)] border transition-all',
            step.done
              ? 'surface border-border text-foreground'
              : step.active
              ? 'surface-raised border-accent text-foreground shadow-sm ring-1 ring-accent/30'
              : step.isTreasure
              ? 'bg-surface-raised border-border/80 text-foreground font-semibold'
              : 'bg-background/40 border-border/60 text-muted opacity-60',
          ].join(' ')}
        >
          <div
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              step.done
                ? 'bg-success text-white'
                : step.active
                ? 'bg-accent text-white shadow-xs'
                : step.isTreasure
                ? 'bg-amber text-white'
                : 'bg-surface border border-border text-muted',
            ].join(' ')}
          >
            {step.done ? '✓' : step.isTreasure ? '🏆' : i + 1}
          </div>
          <span className="text-xs md:text-sm font-medium">{step.label}</span>
          {step.active && (
            <ChevronRight className="ml-auto h-4 w-4 text-accent shrink-0" aria-hidden="true" />
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
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
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
                <Link href="/courses">
                  <Button size="lg" variant="secondary">
                    {t.home.seeCoursesBtn}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Path & Treasure Goal Mirror Preview */}
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

        {/* ── 3. How Kivora Works (5 Pedagogical Steps) ───────────────────── */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.howTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.howSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: t.home.step1Num, title: t.home.step1Title, desc: t.home.step1Desc },
              { num: t.home.step2Num, title: t.home.step2Title, desc: t.home.step2Desc },
              { num: t.home.step3Num, title: t.home.step3Title, desc: t.home.step3Desc },
              { num: t.home.step4Num, title: t.home.step4Title, desc: t.home.step4Desc },
              { num: t.home.step5Num, title: t.home.step5Title, desc: t.home.step5Desc },
            ].map((step, idx) => (
              <div
                key={idx}
                className="surface rounded-[var(--r-lg)] p-5 border border-border hover-lift flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-accent mb-3 block">
                    {step.num}
                  </span>
                  <h3 className="font-semibold text-sm text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. 15 Practical Tracks Showcase ──────────────────────────────── */}
        <section className="bg-surface border-t border-border py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t.home.availableTitle}
                </h2>
                <p className="text-sm text-muted">
                  {t.catalog.subtitle}
                </p>
              </div>

              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: t.catalog.allCategories },
                  { id: 'programming', label: t.catalog.techCategory },
                  { id: 'languages', label: t.catalog.langCategory },
                  { id: 'professional', label: t.catalog.profCategory },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CourseCategory | 'all')}
                    className={[
                      'px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border',
                      selectedCategory === cat.id
                        ? 'bg-accent text-white border-accent shadow-xs'
                        : 'bg-surface text-muted border-border hover:border-accent/40 hover:text-foreground',
                    ].join(' ')}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {filteredCourses.map(course => {
                const loc = getLocalizedCourse(course, locale);
                const isTech = course.category === 'programming';
                const isLang = course.category === 'languages';

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="surface-raised rounded-[var(--r-xl)] p-5 border border-border hover-lift flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={isTech ? 'default' : isLang ? 'accent' : 'muted'}>
                          {isTech
                            ? t.catalog.techCategory
                            : isLang
                            ? t.catalog.langCategory
                            : t.catalog.profCategory}
                        </Badge>
                        <span className="text-xs text-muted">{course.estimatedHours} {t.home.hoursUnit}</span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                        {loc.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                        {loc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted">{course.stages.length} {t.courseDetail.stages}</span>
                      <span className="text-accent font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        {t.catalog.startCourse} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <Link href="/courses">
                <Button variant="secondary" size="lg">
                  {t.home.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. AI Suite Section ──────────────────────────────────────────── */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="accent" className="mb-3">{t.home.aiSuiteBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.aiSuiteTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.aiSuiteSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-11 h-11 rounded-[var(--r-md)] bg-accent-light text-accent flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t.home.aiPlannerTitle}
              </h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {t.home.aiPlannerDesc}
              </p>
            </div>

            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-11 h-11 rounded-[var(--r-md)] bg-accent-light text-accent flex items-center justify-center mb-4">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t.home.aiTutorTitle}
              </h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {t.home.aiTutorDesc}
              </p>
            </div>

            <div className="surface rounded-[var(--r-xl)] p-6 border border-border shadow-xs">
              <div className="w-11 h-11 rounded-[var(--r-md)] bg-accent-light text-accent flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t.home.aiAnalyzerTitle}
              </h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {t.home.aiAnalyzerDesc}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/tutor">
              <Button size="lg">
                <MessageSquare className="h-4 w-4" />
                {t.nav.tutor}
              </Button>
            </Link>
          </div>
        </section>

        {/* ── 6. Real Trust & Conference Review Gathering (No Fake Reviews) ── */}
        <section className="bg-surface border-y border-border py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="surface-raised rounded-[var(--r-xl)] p-8 md:p-10 border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <Badge variant="accent">{t.home.trustBadge}</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t.home.trustTitle}
              </h2>
              <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
                {t.home.trustDesc}
              </p>
              <div className="surface rounded-[var(--r-lg)] p-4 border border-border mb-6 flex items-start gap-3">
                <Star className="h-5 w-5 text-amber shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-foreground">
                  {t.home.trustNote}
                </p>
              </div>

              {feedbackSent ? (
                <div className="surface rounded-[var(--r-md)] p-4 border border-success/30 flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <span>
                    {locale === 'ru'
                      ? 'Спасибо! Ваш отзыв сохранён для методической команды конференции.'
                      : locale === 'ky'
                      ? 'Ыраазычылык! Сиздин пикириңиз конференциянын уюштуруу тобуна сакталды.'
                      : 'Thank you! Your feedback has been noted for the conference product team.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder={
                      locale === 'ru'
                        ? 'Напишите ваше впечатление или предложение…'
                        : locale === 'ky'
                        ? 'Өз пикириңизди же сунушуңузду жазыңыз…'
                        : 'Share your impression or suggestion…'
                    }
                    className="flex-1 bg-surface border border-border rounded-[var(--r-md)] px-4 py-2.5 text-sm text-foreground focus-accent placeholder:text-muted"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                    {t.home.trustFeedbackBtn}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 7. Preliminary Freemium Pricing Hypotheses ───────────────────── */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-3">{t.home.pricingBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.pricingTitle}
            </h2>
            <p className="text-sm md:text-base text-muted mb-3">
              {t.home.pricingSubtitle}
            </p>
            <p className="text-xs text-muted font-medium bg-surface-raised border border-border rounded-full px-4 py-1 inline-block">
              {t.home.pricingNote}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Starter Tier */}
            <div className="surface rounded-[var(--r-xl)] p-7 border border-border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {t.home.tierStarterTitle}
                </h3>
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
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {t.home.tierStudentTitle}
                </h3>
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
              <Link href="/courses">
                <Button className="w-full">
                  {t.home.startBtn}
                </Button>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="surface rounded-[var(--r-xl)] p-7 border border-border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {t.home.tierProTitle}
                </h3>
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
              <Link href="/courses">
                <Button variant="secondary" className="w-full">
                  {t.home.startBtn}
                </Button>
              </Link>
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
    </div>
  );
}
