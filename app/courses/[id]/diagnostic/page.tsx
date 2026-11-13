'use client';

import { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Panel } from '@/components/ui/Panel';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getDiagnosticQuestions, getLevelLabel, getLevelDescription } from '@/lib/data/diagnostics';
import { DemoState } from '@/lib/demo-state';
import { getCourse } from '@/lib/data/courses';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseId, DiagnosticResult, LearningPlan } from '@/lib/types';

function DiagnosticContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const courseId = id as CourseId;
  const { t, locale } = useLanguage();

  const rawCourse = getCourse(courseId);
  const course = rawCourse ? getLocalizedCourse(rawCourse, locale) : null;
  const questions = getDiagnosticQuestions(courseId, locale);

  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">
          {t.common.error}.{' '}
          <Link href="/courses" className="text-accent underline font-medium">
            {t.common.tryAgain}
          </Link>
        </p>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;

  function selectOption(idx: number) {
    setSelected(idx);
  }

  function nextQuestion() {
    if (selected === null || !q) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      finishDiagnostic(newAnswers);
    }
  }

  async function finishDiagnostic(finalAnswers: Record<string, number>) {
    setSubmitting(true);
    let diagResult: DiagnosticResult;
    try {
      const res = await fetch('/api/diagnostic/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, answers: finalAnswers }),
      });
      if (!res.ok) throw new Error('Scoring failed');
      const data = await res.json() as { result: DiagnosticResult };
      diagResult = data.result;
    } catch {
      const { scoreDiagnostic } = await import('@/lib/data/diagnostics');
      const r = scoreDiagnostic(courseId, finalAnswers);
      diagResult = { courseId, answers: finalAnswers, ...r };
    }

    DemoState.enroll(courseId);
    DemoState.saveDiagnosticResult(diagResult);
    setResult(diagResult);

    // Generate personalized learning plan
    try {
      const planRes = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          level: diagResult.level,
          weeklyMinutes: 60,
          goal: `Build practical competence in ${course?.title ?? courseId}`,
          locale,
        }),
      });
      if (planRes.ok) {
        const planData = await planRes.json() as { plan: LearningPlan };
        if (planData.plan) {
          setPlan(planData.plan);
          DemoState.saveLearningPlan(planData.plan);
        }
      }
    } catch (err) {
      console.warn('Learning plan generation error:', err);
    }

    setStep('result');
    setSubmitting(false);
  }

  if (step === 'intro') {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full">
            <div className="glass rounded-[var(--r-xl)] p-8 border border-border/80 shadow-2xl">
              <Badge variant="accent" className="mb-4">{t.diagnostic.badge}</Badge>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                {t.diagnostic.introTitle}
              </h1>
              <p className="text-muted leading-relaxed mb-6 text-sm">
                {questions.length} {t.diagnostic.introDesc} {course.title}.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {t.diagnostic.bullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {t.diagnostic.bullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  {t.diagnostic.bullet3}
                </li>
              </ul>
              <Button className="w-full" onClick={() => setStep('quiz')} size="lg">
                {t.diagnostic.startBtn}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'quiz' && q) {
    const questionLabel = `${t.diagnostic.questionLabel} ${currentQ + 1} / ${questions.length}`;

    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-10 w-full">
          <div className="mb-6">
            <ProgressBar
              value={progress}
              label={questionLabel}
              showLabel
            />
          </div>

          <div className="glass rounded-[var(--r-xl)] p-7 border border-border/80 shadow-xl">
            <p className="text-xs text-accent mb-2 font-semibold tracking-wide uppercase">
              {course.title} · {t.diagnostic.badge}
            </p>
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-6 whitespace-pre-wrap leading-snug">
              {q.question}
            </h2>

            <div className="flex flex-col gap-2.5">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={[
                    'w-full text-left px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-all',
                    selected === idx
                      ? 'border-accent bg-accent/15 text-accent shadow-sm'
                      : 'border-border bg-surface text-foreground hover:border-accent/40 hover:bg-surface-raised',
                  ].join(' ')}
                >
                  <span className={[
                    'inline-flex w-5 h-5 rounded-full border items-center justify-center text-xs mr-3 shrink-0',
                    selected === idx ? 'border-accent bg-accent text-white' : 'border-border text-muted',
                  ].join(' ')}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-7 flex justify-between items-center pt-4 border-t border-border/60">
              {currentQ > 0 ? (
                <button
                  onClick={() => {
                    const prevIdx = currentQ - 1;
                    setCurrentQ(prevIdx);
                    setSelected(answers[questions[prevIdx].id] ?? null);
                  }}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> {t.diagnostic.backBtn}
                </button>
              ) : <span />}

              <Button
                onClick={nextQuestion}
                disabled={selected === null}
                loading={submitting && currentQ === questions.length - 1}
              >
                {currentQ < questions.length - 1 ? t.diagnostic.nextBtn : t.diagnostic.finishBtn}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'result' && result) {
    const levelName = getLevelLabel(result.level, locale);
    const levelDesc = getLevelDescription(result.level, locale);

    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-xl w-full">
            <div className="glass rounded-[var(--r-xl)] p-8 border border-border/80 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/25 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{t.diagnostic.resultTitle}</h1>
                <p className="text-sm text-muted">
                  {result.correctCount} / {result.totalCount} {t.diagnostic.correctOf}
                </p>
              </div>

              <Panel variant="accent" className="mb-6 bg-accent/10 border-accent/20">
                <p className="text-xs text-muted uppercase tracking-wider font-semibold mb-1">
                  {t.diagnostic.yourLevel}
                </p>
                <p className="text-2xl font-bold text-accent">{levelName}</p>
                <p className="text-sm text-muted mt-2">{levelDesc}</p>
              </Panel>

              <div className="mb-6">
                <ProgressBar value={result.score} label={t.diagnostic.scoreLabel} showLabel />
              </div>

              {plan && (
                <div className="surface rounded-[var(--r-lg)] p-5 mb-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <h3 className="text-sm font-semibold text-foreground">{t.diagnostic.planTitle}</h3>
                    </div>
                    {plan.isAIGenerated ? (
                      <Badge variant="accent">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {t.diagnostic.aiPlanBadge}
                      </Badge>
                    ) : (
                      <Badge variant="muted">{t.diagnostic.structPlanBadge}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted mb-4">
                    {t.diagnostic.planPace} ({plan.weeklyMinutes} min/week, {plan.totalWeeks} modules)
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {plan.weeks.map(w => (
                      <div key={w.week} className="bg-surface-raised rounded-[var(--r-sm)] p-3 text-xs border border-border/60">
                        <div className="flex items-center justify-between font-medium text-foreground mb-1">
                          <span>{t.diagnostic.weekLabel} {w.week}: {w.focus}</span>
                          <span className="text-muted">{w.lessonIds.length} {t.diagnostic.lessonsUnit}</span>
                        </div>
                        <p className="text-muted">{w.goalSummary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                <Link href={`/courses/${courseId}/learn`}>
                  <Button className="w-full" size="lg">
                    {t.diagnostic.startLearningBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/courses/${courseId}`}>
                  <Button variant="secondary" className="w-full">
                    {t.diagnostic.backToCourseBtn}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default function DiagnosticPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><LoadingSpinner label="Loading diagnostic…" /></div>}>
      <DiagnosticContent {...props} />
    </Suspense>
  );
}