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
import { getDiagnosticQuestions, LEVEL_LABELS, LEVEL_DESCRIPTIONS } from '@/lib/data/diagnostics';
import { DemoState } from '@/lib/demo-state';
import { getCourse } from '@/lib/data/courses';
import type { CourseId, DiagnosticResult, LearningPlan } from '@/lib/types';

function DiagnosticContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const courseId = id as CourseId;

  const course = getCourse(courseId);
  const questions = getDiagnosticQuestions(courseId);

  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Course not found. <Link href="/courses" className="text-accent underline">Back to courses</Link></p>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;

  function selectOption(idx: number) {
    setSelected(idx);
  }

  function nextQuestion() {
    if (selected === null) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      // All answered — score
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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full">
            <div className="glass rounded-[var(--r-xl)] p-8">
              <Badge variant="accent" className="mb-5">Diagnostic</Badge>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Let&apos;s find your starting point
              </h1>
              <p className="text-muted leading-relaxed mb-6">
                Answer <strong>{questions.length} short questions</strong> about {course.title}.
                There&apos;s no pass or fail — this helps us assign you the right level and build your learning path.
              </p>
              <ul className="flex flex-col gap-2 mb-8 text-sm text-muted">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Takes about 3–5 minutes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> No time pressure</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> You can retake it later</li>
              </ul>
              <Button className="w-full" onClick={() => setStep('quiz')} size="lg">
                Start diagnostic
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'quiz' && q) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-10 w-full">
          <div className="mb-6">
            <ProgressBar
              value={progress}
              label={`Question ${currentQ + 1} of ${questions.length}`}
              showLabel
            />
          </div>

          <div className="glass rounded-[var(--r-xl)] p-7">
            <p className="text-sm text-muted mb-1 font-medium">Question {currentQ + 1}</p>
            <h2 className="text-base font-semibold text-foreground mb-6 whitespace-pre-wrap">{q.question}</h2>

            <div className="flex flex-col gap-2.5">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={[
                    'w-full text-left px-4 py-3 rounded-[var(--r-md)] border text-sm font-medium transition-all',
                    selected === idx
                      ? 'border-accent bg-accent-light text-accent'
                      : 'border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-light/40',
                  ].join(' ')}
                >
                  <span className={[
                    'inline-flex w-5 h-5 rounded-full border items-center justify-center text-xs mr-3 shrink-0',
                    selected === idx ? 'border-accent bg-accent text-white' : 'border-border',
                  ].join(' ')}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-7 flex justify-between items-center">
              {currentQ > 0 ? (
                <button
                  onClick={() => { setCurrentQ(c => c - 1); setSelected(answers[questions[currentQ - 1].id] ?? null); }}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : <span />}

              <Button
                onClick={nextQuestion}
                disabled={selected === null}
                loading={submitting && currentQ === questions.length - 1}
              >
                {currentQ < questions.length - 1 ? 'Next' : 'Finish'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-xl w-full">
            <div className="glass rounded-[var(--r-xl)] p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent-light mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-1">Diagnostic complete</h1>
                <p className="text-sm text-muted">{result.correctCount} of {result.totalCount} correct</p>
              </div>

              <Panel variant="accent" className="mb-6">
                <p className="text-xs text-muted uppercase tracking-wider font-medium mb-1">Your level</p>
                <p className="text-2xl font-bold text-accent">{LEVEL_LABELS[result.level]}</p>
                <p className="text-sm text-muted mt-2">{LEVEL_DESCRIPTIONS[result.level]}</p>
              </Panel>

              <div className="mb-6">
                <ProgressBar value={result.score} label="Score" showLabel />
              </div>

              {plan && (
                <div className="surface rounded-[var(--r-lg)] p-5 mb-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <h3 className="text-sm font-semibold text-foreground">Personalized Study Plan</h3>
                    </div>
                    {plan.isAIGenerated ? (
                      <Badge variant="accent">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Plan
                      </Badge>
                    ) : (
                      <Badge variant="muted">Structured Plan</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted mb-4">
                    Paced for {plan.weeklyMinutes} mins/week across {plan.totalWeeks} modules.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {plan.weeks.map(w => (
                      <div key={w.week} className="bg-background/60 rounded-[var(--r-sm)] p-3 text-xs border border-border/60">
                        <div className="flex items-center justify-between font-medium text-foreground mb-1">
                          <span>Week {w.week}: {w.focus}</span>
                          <span className="text-muted">{w.lessonIds.length} lessons</span>
                        </div>
                        <p className="text-muted">{w.goalSummary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Link href={`/courses/${courseId}/learn`}>
                  <Button className="w-full" size="lg">
                    Start learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/courses/${courseId}`}>
                  <Button variant="secondary" className="w-full">Back to course</Button>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner label="Loading diagnostic…" /></div>}>
      <DiagnosticContent {...props} />
    </Suspense>
  );
}