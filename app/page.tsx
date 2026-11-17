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
  Sparkles,
  Award,
  Compass,
  Flame,
  Zap,
  Volume2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DemoEnrollModal } from '@/components/modals/DemoEnrollModal';
import { ToxicCoachAvatar } from '@/components/lesson/ToxicCoachAvatar';
import { MemeFloatingSticker } from '@/components/home/MemeFloatingSticker';
import { toxicTutor } from '@/lib/sound/toxic-tutor';
import { useLanguage } from '@/lib/i18n/context';
import { COURSES } from '@/lib/data/courses';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseCategory } from '@/lib/types';

/**
 * Interactive Live Board-Game Road Preview
 * Demonstrates the serpentine path, circular nodes, learner marker, and clickable node previews.
 */
function InteractivePathPreview() {
  const { t, locale } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = locale === 'ru'
    ? [
        {
          num: 1,
          label: 'Переменные и типы данных',
          tag: 'Основы',
          time: '12 мин',
          desc: 'Синтаксис, память, числа и строки с практикой в браузере.',
          done: true,
        },
        {
          num: 2,
          label: 'Управляющие конструкции (if/for)',
          tag: 'Текущий урок',
          time: '18 мин',
          desc: 'Ветвление логики и циклы с проверкой краевых случаев.',
          active: true,
        },
        {
          num: 3,
          label: 'Чекпоинт: Проверочный тест',
          tag: 'Чекпоинт',
          time: '8 мин',
          desc: 'Адаптивный срез знаний для закрепления пройденного модуля.',
          isCheckpoint: true,
        },
        {
          num: 4,
          label: 'Финиш: Итоговый проект',
          tag: 'Цель курса',
          time: '35 мин',
          desc: 'Практический проект для закрепления всех навыков этапа.',
          isFinish: true,
        },
      ]
    : locale === 'ky'
    ? [
        {
          num: 1,
          label: 'Өзгөрмөлөр жана маалымат типтери',
          tag: 'Негиздер',
          time: '12 мүн',
          desc: 'Синтаксис, сандар жана саптар менен браузердеги практика.',
          done: true,
        },
        {
          num: 2,
          label: 'Башкаруу конструкциялары (if/for)',
          tag: 'Учурдагы сабак',
          time: '18 мүн',
          desc: 'Логикалык бутактануу жана циклдер менен иштөө.',
          active: true,
        },
        {
          num: 3,
          label: 'Чекпоинт: Текшерүү тести',
          tag: 'Чекпоинт',
          time: '8 мүн',
          desc: 'Өтүлгөн материалды бышыктоо үчүн адаптивдүү тест.',
          isCheckpoint: true,
        },
        {
          num: 4,
          label: 'Финиш: Жыйынтыктоочу долбоор',
          tag: 'Максат',
          time: '35 мүн',
          desc: 'Бардык көндүмдөрдү бириктирген практикалык долбоор.',
          isFinish: true,
        },
      ]
    : [
        {
          num: 1,
          label: 'Variables & Core Types',
          tag: 'Fundamentals',
          time: '12 min',
          desc: 'Syntax, memory, numbers & strings with interactive code.',
          done: true,
        },
        {
          num: 2,
          label: 'Control Flow & Loops',
          tag: 'Current Step',
          time: '18 min',
          desc: 'Branching logic, boolean conditions, and edge-case handling.',
          active: true,
        },
        {
          num: 3,
          label: 'Checkpoint: Knowledge Quiz',
          tag: 'Checkpoint',
          time: '8 min',
          desc: 'Adaptive module checkpoint before advancing down the track.',
          isCheckpoint: true,
        },
        {
          num: 4,
          label: 'Finish Goal: Capstone Project',
          tag: 'Course Goal',
          time: '35 min',
          desc: 'Real-world practical milestone tying concepts together.',
          isFinish: true,
        },
      ];

  const current = steps[activeStep] || steps[1];

  return (
    <div className="surface rounded-[var(--r-xl)] p-5 md:p-6 border border-border shadow-lg relative overflow-hidden">
      {/* Track Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <p className="text-[11px] font-bold text-accent uppercase tracking-wider">
              {t.home.pathDemoTrack}
            </p>
          </div>
          <p className="text-sm font-bold text-foreground mt-0.5">{t.home.pathDemoStage}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="accent" className="text-[10px] py-0.5">
            <Flame className="w-3 h-3 mr-1 text-amber" />
            {t.home.pathDemoLevel}
          </Badge>
        </div>
      </div>

      {/* Interactive Serpentine Road Nodes */}
      <div className="flex flex-col gap-2.5 relative my-2">
        {steps.map((step, i) => {
          const isSelected = activeStep === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(i)}
              className={[
                'w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-[var(--r-lg)] border text-left transition-all cursor-pointer',
                isSelected
                  ? 'bg-accent/10 border-accent text-foreground shadow-xs ring-1 ring-accent/30'
                  : step.done
                  ? 'bg-surface border-border text-foreground hover:border-border-strong'
                  : step.active
                  ? 'bg-surface-raised border-border text-foreground hover:border-accent/40'
                  : 'bg-background/40 border-border/60 text-muted opacity-75 hover:opacity-100',
              ].join(' ')}
            >
              {/* Circular Game Cell Node */}
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-transform shadow-xs',
                  step.done
                    ? 'bg-success text-white'
                    : step.active
                    ? 'bg-accent text-white ring-2 ring-accent/30'
                    : step.isFinish
                    ? 'bg-surface border-2 border-accent text-accent'
                    : step.isCheckpoint
                    ? 'bg-amber-light text-amber border border-amber/40'
                    : 'bg-surface border border-border text-muted',
                  isSelected ? 'scale-110' : '',
                ].join(' ')}
              >
                {step.done ? (
                  '✓'
                ) : step.active ? (
                  <Compass className="w-4 h-4 text-white" />
                ) : step.isFinish ? (
                  <Flag className="w-3.5 h-3.5" />
                ) : step.isCheckpoint ? (
                  <Target className="w-3.5 h-3.5" />
                ) : (
                  step.num
                )}
              </div>

              {/* Node Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-semibold text-foreground truncate">{step.label}</p>
                  <span className="text-[10px] text-muted shrink-0">{step.time}</span>
                </div>
                <p className="text-[11px] text-muted truncate">{step.desc}</p>
              </div>

              {/* Status Badge */}
              {step.active && (
                <span className="text-[10px] font-bold text-accent bg-accent-light px-2 py-0.5 rounded-full shrink-0 hidden sm:inline">
                  {t.learn.learnerToken}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Step Peek Card */}
      <div className="mt-4 p-3.5 bg-surface-raised rounded-[var(--r-md)] border border-border text-xs flex flex-col gap-1.5 transition-all">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            {current.tag}: {current.label}
          </span>
          <span className="text-[10px] text-muted">{current.time}</span>
        </div>
        <p className="text-muted leading-relaxed text-[11px]">{current.desc}</p>
      </div>

      {/* Progress Footer */}
      <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted">{t.home.pathDemoCompleted}:</span>
          <span className="font-semibold text-foreground">1 / 4 (33%)</span>
        </div>
        <div className="w-28 h-2 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '33%' }} />
        </div>
        <span className="font-bold text-accent text-xs">33%</span>
      </div>
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

  // Micro-badges with minimalist icons
  const heroPills = [
    {
      icon: Target,
      label: locale === 'ru' ? '15 направлений' : locale === 'ky' ? '15 багыт' : '15 Learning Tracks',
    },
    {
      icon: Zap,
      label: locale === 'ru' ? '15–20 мин в день' : locale === 'ky' ? 'Күнүнө 15–20 мүнөт' : '15–20 mins / day',
    },
    {
      icon: Compass,
      label: locale === 'ru' ? 'Интерактивная дорожка' : locale === 'ky' ? 'Интерактивдүү маршрут' : 'Board-Game Road',
    },
    {
      icon: VideoOff,
      label: locale === 'ru' ? 'Без 40-часовых видео' : locale === 'ky' ? 'Узун лекцияларсыз' : 'Zero Passive Videos',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden transition-colors duration-200">
      {/* Subtle Ambient Light Glows */}
      <div className="ambient-orb-blue top-[-100px] right-[-100px]" aria-hidden="true" />
      <div className="ambient-orb-secondary top-[650px] left-[-120px]" aria-hidden="true" />

      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* ── 1. Hero Section: High Impact Conference Demo Presentation ───── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Value Proposition & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Product Badges: Feature announcement & Conference demo */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light border border-accent/20 text-accent text-xs font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>{t.home.badge}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>
                    {locale === 'ru'
                      ? 'Учись нескучно: Коуч Влад и мемы'
                      : locale === 'ky'
                      ? 'Зерикпей үйрөн: Влад жана мемдер'
                      : 'Zero Boredom: Coach Vlad & Memes'}
                  </span>
                </div>
              </div>

              {/* Hero Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-foreground leading-[1.12] mb-5">
                {t.home.heroHeadline1}{' '}
                <span className="text-accent underline decoration-accent/30 underline-offset-8">
                  {t.home.heroHeadline2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-muted leading-relaxed mb-7 max-w-xl">
                {t.home.heroSub}
              </p>

              {/* Micro-Stat Pills with Minimalist Icons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {heroPills.map((pill, i) => {
                  const Icon = pill.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-md)] bg-surface border border-border text-xs text-foreground font-medium shadow-xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span>{pill.label}</span>
                    </span>
                  );
                })}
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto btn-accent-glow">
                    <span>{t.home.startBtn}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowEnrollModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm md:text-base rounded-[var(--r-lg)] bg-surface text-foreground border border-border hover:border-accent/40 font-semibold transition-all active:scale-[0.98] shadow-xs text-center cursor-pointer"
                >
                  {t.promo.consultationTitle}
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Board-Game Road Preview */}
            <div className="lg:col-span-5 relative w-full">
              <InteractivePathPreview />
            </div>
          </div>
        </section>

        {/* ── 1.5 Meme Zone & Coach Vlad Interactive Showcase ─────────────── */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-background via-surface-raised/40 to-background border-t border-border relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 text-xs font-semibold mb-2 border border-rose-500/30">
                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>
                    {locale === 'ru' ? 'Инновационный режим прожарки' : locale === 'ky' ? 'Инновациялык катуу режим' : 'Toxic Roast Innovation'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
                  {locale === 'ru'
                    ? 'Учись без скуки: Сеньор Влад и культовые IT-мемы'
                    : locale === 'ky'
                    ? 'Зерикпей үйрөн: Тимлид Влад жана IT-мемдер'
                    : 'Learn with Zero Boredom: Senior Lead Vlad & Viral Memes'}
                </h2>
                <p className="text-xs md:text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                  {locale === 'ru'
                    ? 'Никакой монотонности. Ошибся в коде — саркастичный сеньор устроит прожарку мужским голосом. Решил чисто — получишь мемный зачёт и похвалу.'
                    : locale === 'ky'
                    ? 'Бир калыптагы тажатма лекциялар жок. Ката кетирсең — сеньор катуу эскертет. Туура тапсаң — стикер аласың.'
                    : 'Zero monotony. Make an error — Senior Vlad roasts your logic in a deep natural voice. Nail the syntax — earn meme badges and respect.'}
                </p>
              </div>

              {/* Live Voice Preview Button */}
              <button
                type="button"
                onClick={() => {
                  toxicTutor.setMode('roast');
                  toxicTutor.playRoastEvent('intro', locale);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--r-md)] bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>
                  {locale === 'ru'
                    ? '🔊 Послушать голос Влада'
                    : locale === 'ky'
                    ? '🔊 Владдын үнүн угуу'
                    : '🔊 Hear Vlad Roast Voice'}
                </span>
              </button>
            </div>

            {/* Grid of Meme Badges & Coach Vlad Spotlight Card */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => {
                  toxicTutor.setMode('roast');
                  toxicTutor.playRoastEvent('intro', locale);
                }}
                role="button"
                tabIndex={0}
                title="Нажмите, чтобы послушать голос Влада"
                className="glass-card rounded-[var(--r-xl)] p-4 border border-rose-500/30 bg-rose-500/5 flex items-center gap-3 shadow-sm hover:border-rose-500/50 hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                <ToxicCoachAvatar mood="angry" size="sm" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30">
                      Toxic Coach
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-foreground truncate">Сеньор Влад</h3>
                  <p className="text-[11px] text-muted line-clamp-2">Мужской голос сеньора, который отчитывает за плохой код.</p>
                </div>
              </div>

              <MemeFloatingSticker type="doge" />
              <MemeFloatingSticker type="einstein" />
              <MemeFloatingSticker type="homer" />
            </div>
          </div>
        </section>

        {/* ── 2. Why Kivora Beats 40-Hour Videos (Problem & Solution) ──────── */}
        <section className="bg-surface border-y border-border py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="default" className="mb-3">{t.home.problemBadge}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t.home.problemTitle}
              </h2>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {t.home.problemSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="glass-card rounded-[var(--r-xl)] p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[var(--r-md)] bg-danger-light text-danger flex items-center justify-center mb-4">
                    <VideoOff className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {t.home.problem1Title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t.home.problem1Desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center gap-1.5 text-xs text-accent font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>
                    {locale === 'ru'
                      ? '15-минутные интерактивные узлы'
                      : locale === 'ky'
                      ? '15 мүнөттүк интерактивдүү сабактар'
                      : '15-minute bite-sized interactive nodes'}
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass-card rounded-[var(--r-xl)] p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[var(--r-md)] bg-amber-light text-amber flex items-center justify-center mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {t.home.problem2Title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t.home.problem2Desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center gap-1.5 text-xs text-accent font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>
                    {locale === 'ru'
                      ? 'Чёткая извилистая дорожка'
                      : locale === 'ky'
                      ? 'Так жана көрүнүктүү маршрут'
                      : 'Winding roadmap with clear milestones'}
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="glass-card rounded-[var(--r-xl)] p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[var(--r-md)] bg-accent-light text-accent flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {t.home.problem3Title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t.home.problem3Desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center gap-1.5 text-xs text-accent font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>
                    {locale === 'ru'
                      ? 'Socratic AI-тьютор 24/7'
                      : locale === 'ky'
                      ? 'Socratic AI-тьютор 24/7'
                      : '24/7 Socratic AI guidance'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. How Kivora Works: The 5-Step Pipeline ────────────────────── */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-3">{t.home.howBadge}</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.howTitle}
            </h2>
            <p className="text-sm md:text-base text-muted">
              {t.home.howSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { num: 1, title: t.home.step1Title, desc: t.home.step1Desc, icon: Compass },
              { num: 2, title: t.home.step2Title, desc: t.home.step2Desc, icon: Target },
              { num: 3, title: t.home.step3Title, desc: t.home.step3Desc, icon: Flame },
              { num: 4, title: t.home.step4Title, desc: t.home.step4Desc, icon: Code },
              { num: 5, title: t.home.step5Title, desc: t.home.step5Desc, icon: Award },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="surface rounded-[var(--r-xl)] p-5 border border-border flex flex-col justify-between hover-lift relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {step.num}
                      </div>
                      <Icon className="w-4 h-4 text-muted" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-1.5">{step.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. Catalog Tracks Preview (15 Tracks Data-Driven Grid) ──────── */}
        <section className="bg-surface border-y border-border py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-semibold transition-all cursor-pointer',
                    selectedCategory === 'all'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.allCategories}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('programming')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-semibold transition-all cursor-pointer',
                    selectedCategory === 'programming'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.techCategory}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('languages')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-semibold transition-all cursor-pointer',
                    selectedCategory === 'languages'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.langCategory}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('professional')}
                  className={[
                    'px-3.5 py-1.5 rounded-[var(--r-sm)] text-xs font-semibold transition-all cursor-pointer',
                    selectedCategory === 'professional'
                      ? 'bg-accent text-white shadow-xs'
                      : 'surface border border-border text-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {t.catalog.profCategory}
                </button>
              </div>
            </div>

            {/* Course Cards Grid */}
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
                    className="glass-card rounded-[var(--r-xl)] p-5 block transition-all group hover-lift"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <Badge variant="default" className="text-[10px]">
                        {course.estimatedHours}h · {loc.level}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-accent transition-colors">
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
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. What's Inside: Real Core Modules ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
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
            <div className="glass-card rounded-[var(--r-xl)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside1Title}</h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside1Desc}</p>
              </div>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">
                  {locale === 'ru' ? 'Диагностика:' : locale === 'ky' ? 'Диагностика:' : 'Diagnostics:'}
                </span>{' '}
                {locale === 'ru'
                  ? 'Точное выявление пробелов и автогенерация персонального темпа.'
                  : locale === 'ky'
                  ? 'Билимдеги кемчиликтерди аныктоо жана жеке темпти автоматтык түзүү.'
                  : 'Pinpoints precise skill gaps and generates calibrated weekly milestones.'}
              </div>
            </div>

            <div className="glass-card rounded-[var(--r-xl)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside2Title}</h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside2Desc}</p>
              </div>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">
                  {locale === 'ru' ? 'Метод Сократа:' : locale === 'ky' ? 'Сократ ыкмасы:' : 'Socratic Method:'}
                </span>{' '}
                {locale === 'ru'
                  ? 'Подсказки, контрпримеры и наводящие вопросы вместо прямых спойлеров.'
                  : locale === 'ky'
                  ? 'Даяр жооптун ордуна багыттоочу кеңештер жана түшүндүрмөлөр.'
                  : 'Guiding hints, alternative analogies, and counter-examples instead of direct answers.'}
              </div>
            </div>

            <div className="glass-card rounded-[var(--r-xl)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{t.home.inside3Title}</h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">{t.home.inside3Desc}</p>
              </div>
              <div className="bg-surface-raised p-3 rounded-[var(--r-md)] border border-border text-xs text-muted">
                <span className="font-semibold text-foreground">
                  {locale === 'ru' ? 'Финишный счётчик:' : locale === 'ky' ? 'Финиш эсептегич:' : 'Finish Goal:'}
                </span>{' '}
                {locale === 'ru'
                  ? 'Измеримый прогресс каждого урока и наглядный счётчик оставшихся шагов.'
                  : locale === 'ky'
                  ? 'Ар бир сабактын так жыйынтыгы жана максатка чейинки калган кадамдар.'
                  : 'Measurable completion metrics with an honest counter of remaining lessons.'}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Trust & Early Adopters Section ───────────────────────────── */}
        <section className="bg-surface border-y border-border py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="surface-raised rounded-[var(--r-xl)] p-6 sm:p-8 border border-border shadow-sm">
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

        {/* ── 7. Transparent Freemium Pricing Tiers ───────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
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
            <div className="glass-card rounded-[var(--r-xl)] p-6 md:p-7 flex flex-col justify-between">
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
            <div className="surface-raised rounded-[var(--r-xl)] p-6 md:p-7 border-2 border-accent shadow-md flex flex-col justify-between relative">
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
                type="button"
                onClick={() => setShowEnrollModal(true)}
                className="w-full py-2.5 px-4 rounded-[var(--r-md)] bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-xs cursor-pointer"
              >
                {t.promo.consultationTitle}
              </button>
            </div>

            {/* Pro Tier */}
            <div className="glass-card rounded-[var(--r-xl)] p-6 md:p-7 flex flex-col justify-between">
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
                type="button"
                onClick={() => setShowEnrollModal(true)}
                className="w-full py-2.5 px-4 rounded-[var(--r-md)] bg-surface text-foreground border border-border font-medium text-sm hover:border-accent/40 transition-colors shadow-xs cursor-pointer"
              >
                {t.promo.consultationTitle}
              </button>
            </div>
          </div>
        </section>

        {/* ── 8. Interactive FAQ Accordion ─────────────────────────────────── */}
        <section className="bg-surface border-t border-border py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
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
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-foreground hover:bg-surface transition-colors cursor-pointer"
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

        {/* ── 9. Final Call to Action ──────────────────────────────────────── */}
        <section className="py-20 border-t border-border bg-surface">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.readyTitle}
            </h2>
            <p className="text-muted mb-8 text-sm md:text-base leading-relaxed">
              {t.home.readySubtitle}
            </p>
            <Link href="/courses">
              <Button size="lg" className="btn-accent-glow">
                <span>{t.home.ctaBtn}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-muted">
              {t.home.noCardNeeded}
            </p>
          </div>
        </section>
      </main>

      {/* Global Clean Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted flex-wrap justify-center sm:justify-start">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Kivora
            </span>
            <Link href="/courses" className="hover:text-foreground transition-colors">{t.nav.courses}</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">{t.nav.dashboard}</Link>
            <Link href="/tutor" className="hover:text-foreground transition-colors">{t.nav.tutor}</Link>
          </div>
          <span className="text-xs text-subtle text-center sm:text-right">
            {t.home.footerStatus}
          </span>
        </div>
      </footer>

      {/* Demo Enrollment & Consultation Modal */}
      <DemoEnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
      />
    </div>
  );
}
