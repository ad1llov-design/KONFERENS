import Link from 'next/link';
import { ArrowRight, Zap, Map, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// A small static demo of the learning path visual
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
              ? 'bg-success-light border-success/20 text-success'
              : step.active
              ? 'glass border-accent/30 text-foreground shadow-sm'
              : 'bg-background/50 border-border text-muted',
          ].join(' ')}
        >
          <div
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              step.done
                ? 'bg-success text-white'
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
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span className="text-xl font-bold tracking-tight">Kivora</span>
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link href="/auth?tab=register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <div className="mb-5">
                <Badge variant="accent">MVP · Conference Preview</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
                Learn step by step,<br />
                <span className="text-accent">with a plan that fits you.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Kivora helps you set a clear learning goal, assess where you are today,
                and move forward through short focused lessons — with an AI tutor
                that explains, not just answers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth?tab=register">
                  <Button size="lg">
                    Start learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="secondary">See courses</Button>
                </Link>
              </div>
            </div>

            {/* Right — path preview */}
            <div>
              <div className="glass rounded-[var(--r-xl)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider font-medium mb-0.5">Python Fundamentals</p>
                    <p className="text-sm font-semibold text-foreground">Stage 2 of 3</p>
                  </div>
                  <Badge variant="amber">Beginner</Badge>
                </div>
                <PathPreview />
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">3 of 9 lessons completed</span>
                  <div className="flex-1 mx-4 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-xs font-medium text-foreground">33%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-surface border-t border-border py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              What makes the difference
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Map,
                  title: 'Your path, not a generic syllabus',
                  desc: 'Start with a short diagnostic test. The platform assigns you a level and builds a learning path matched to where you actually are.',
                },
                {
                  icon: Zap,
                  title: 'Short lessons, real practice',
                  desc: 'Every lesson is focused and ends with a practical exercise. You read, you do, you get feedback — not just text to scroll through.',
                },
                {
                  icon: MessageSquare,
                  title: 'AI tutor that explains',
                  desc: 'Ask your AI tutor anything about the current lesson. It gives hints and explanations — it won\'t just hand you the answer before you try.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="surface rounded-[var(--r-lg)] p-6">
                  <div className="w-10 h-10 rounded-[var(--r-sm)] bg-accent-light flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses preview */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Available now</h2>
              <Link href="/courses" className="text-sm text-accent hover:underline underline-offset-2 font-medium">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  id: 'python-fundamentals',
                  title: 'Python Fundamentals',
                  desc: 'Write your first real programs.',
                  level: 'Beginner',
                  hours: 8,
                  tag: 'Programming',
                },
                {
                  id: 'english-a1-a2',
                  title: 'English A1–A2',
                  desc: 'From your first words to confident conversations.',
                  level: 'A1 → A2',
                  hours: 10,
                  tag: 'Language',
                },
              ].map(course => (
                <Link key={course.id} href={`/courses/${course.id}`} className="block group">
                  <div className="surface rounded-[var(--r-lg)] p-6 hover-lift">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="accent">{course.tag}</Badge>
                      <span className="text-xs text-muted">{course.hours}h</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted mb-4">{course.desc}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="muted">{course.level}</Badge>
                      <span className="text-xs text-accent font-medium flex items-center gap-1">
                        Start <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Coming soon */}
            <div className="mt-6 surface rounded-[var(--r-lg)] p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">More coming soon</p>
                <p className="text-xs text-muted mt-0.5">JavaScript, UI/UX Design, Chinese, Korean, and more.</p>
              </div>
              <Badge variant="muted">Planned</Badge>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface border-t border-border">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Ready to start?</h2>
            <p className="text-muted mb-7">
              Pick a course, take a 5-minute diagnostic, and begin your first lesson today.
            </p>
            <Link href="/auth?tab=register">
              <Button size="lg">
                Create a free account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-muted">
              No credit card required. Pricing shown on this site is preliminary and subject to change.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted">Kivora — working prototype</span>
          <span className="text-xs text-subtle">Content is for demonstration purposes.</span>
        </div>
      </footer>
    </div>
  );
}
