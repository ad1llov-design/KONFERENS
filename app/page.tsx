'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Map, MessageSquare, ChevronRight, Code, BookOpen, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/context';
import { COURSES } from '@/lib/data/courses';
import { getLocalizedCourse } from '@/lib/data/course-localization';

function PathPreview() {
  const steps = [
    { label: 'Variables & Types', done: true, active: false },
    { label: 'Control Flow', done: false, active: true },
    { label: 'Functions', done: false, active: false },
  ];

  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, i) => (
        <div
          key={i}
          className={[
            'flex items-center gap-3 px-4 py-3 rounded-[var(--r-md)] border transition-all',
            step.done
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : step.active
              ? 'glass border-accent/40 text-foreground shadow-sm'
              : 'bg-background/40 border-border text-muted',
          ].join(' ')}
        >
          <div
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              step.done
                ? 'bg-emerald-500 text-white'
                : step.active
                ? 'bg-accent text-white'
                : 'bg-border text-muted',
            ].join(' ')}
          >
            {step.done ? '✓' : i + 1}
          </div>
          <span className="text-sm font-medium">{step.label}</span>
          {step.active && (
            <ChevronRight className="ml-auto h-4 w-4 text-accent" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const { t, locale } = useLanguage();

  const featured = [
    COURSES.find(c => c.id === 'python-fundamentals')!,
    COURSES.find(c => c.id === 'english-a1-a2')!,
    COURSES.find(c => c.id === 'ui-ux-design')!,
    COURSES.find(c => c.id === 'chinese-intro')!,
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Navbar */}
      <header className="border-b border-border/80 sticky top-0 z-40 bg-[#0A0F18]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent">
              {t.nav.brand}
            </span>
            <Badge variant="blue" className="text-[10px]">MVP</Badge>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <Link href="/courses" className="hover:text-foreground transition-colors font-medium">
              {t.nav.courses}
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors font-medium">
              {t.nav.dashboard}
            </Link>
            <Link href="/tutor" className="hover:text-foreground transition-colors font-medium">
              {t.nav.tutor}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/auth"
              className="text-sm text-muted hover:text-foreground transition-colors hidden sm:inline"
            >
              {t.nav.signIn}
            </Link>
            <Link href="/auth?tab=register">
              <Button size="sm">{t.home.startBtn}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <Badge variant="accent">{t.home.badge}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
                {t.home.heroHeadline1}{' '}
                <span className="text-accent">{t.home.heroHeadline2}</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                {t.home.heroSub}
              </p>
              <div className="flex flex-wrap gap-3">
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

            {/* Right Column — Mirror Glass Path Preview */}
            <div>
              <div className="glass rounded-[var(--r-xl)] p-6 border border-border/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-0.5">
                      {t.home.pathDemoTrack}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{t.home.pathDemoStage}</p>
                  </div>
                  <Badge variant="amber">{t.home.pathDemoLevel}</Badge>
                </div>
                <PathPreview />
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
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

        {/* 3 Core Pillars Features */}
        <section className="bg-surface/60 border-t border-border py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {t.home.featuresHeading}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Map,
                  title: t.home.f1Title,
                  desc: t.home.f1Desc,
                },
                {
                  icon: Zap,
                  title: t.home.f2Title,
                  desc: t.home.f2Desc,
                },
                {
                  icon: MessageSquare,
                  title: t.home.f3Title,
                  desc: t.home.f3Desc,
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass rounded-[var(--r-lg)] p-6 border border-border/70 hover:border-accent/40 transition-colors">
                  <div className="w-11 h-11 rounded-[var(--r-sm)] bg-accent/15 border border-accent/25 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Categories Showcase */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.availableTitle}
            </h2>
            <p className="text-muted max-w-xl mx-auto text-sm md:text-base">
              {t.catalog.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="surface rounded-[var(--r-lg)] p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-blue" />
                <h3 className="font-semibold text-foreground">{t.catalog.techCategory}</h3>
              </div>
              <p className="text-xs text-muted mb-4">Python, JavaScript, Web Development, Data Analytics, AI.</p>
              <Badge variant="blue">5 {t.courseDetail.stages}</Badge>
            </div>

            <div className="surface rounded-[var(--r-lg)] p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">{t.catalog.langCategory}</h3>
              </div>
              <p className="text-xs text-muted mb-4">English A1-A2, Chinese, German, Korean, Spanish.</p>
              <Badge variant="accent">5 {t.courseDetail.stages}</Badge>
            </div>

            <div className="surface rounded-[var(--r-lg)] p-6 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-foreground">{t.catalog.profCategory}</h3>
              </div>
              <p className="text-xs text-muted mb-4">UI/UX Design, Marketing, Project Management, Entrepreneurship, Communication.</p>
              <Badge variant="success">5 {t.courseDetail.stages}</Badge>
            </div>
          </div>

          {/* Featured Courses Cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {featured.map(c => {
              const loc = getLocalizedCourse(c, locale);
              return (
                <Link key={c.id} href={`/courses/${c.id}`} className="group block">
                  <div className="surface rounded-[var(--r-xl)] p-6 hover-lift border border-border/80 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant={c.category === 'programming' ? 'blue' : c.category === 'languages' ? 'accent' : 'success'}>
                          {c.category === 'programming' ? t.catalog.techCategory : c.category === 'languages' ? t.catalog.langCategory : t.catalog.profCategory}
                        </Badge>
                        <span className="text-xs text-muted">{c.estimatedHours}h</span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                        {loc.title}
                      </h3>
                      <p className="text-sm text-muted mb-4 line-clamp-2">{loc.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="muted">{loc.level}</Badge>
                      <span className="text-xs text-accent font-medium flex items-center gap-1">
                        {t.catalog.startCourse} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/courses">
              <Button size="lg" variant="secondary">
                {t.home.viewAll} (15)
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-surface/80 border-t border-border">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.home.readyTitle}
            </h2>
            <p className="text-muted mb-7 text-sm md:text-base">
              {t.home.readySubtitle}
            </p>
            <Link href="/auth?tab=register">
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

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 bg-[#0A0F18]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted">{t.home.footerStatus}</span>
          <span className="text-xs text-subtle">{t.home.footerDemo}</span>
        </div>
      </footer>
    </div>
  );
}
