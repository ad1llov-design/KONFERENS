import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Circle, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getCourse } from '@/lib/data/courses';
import type { CourseId } from '@/lib/types';

export function generateStaticParams() {
  return [
    { id: 'python-fundamentals' },
    { id: 'english-a1-a2' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id as CourseId);
  return { title: course?.title ?? 'Course' };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id as CourseId);
  if (!course) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        {/* Hero */}
        <div className="glass rounded-[var(--r-xl)] p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <Badge variant="accent" className="mb-4">
                {course.category === 'programming' ? 'Programming' : course.category === 'languages' ? 'Language' : 'Professional'}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{course.title}</h1>
              <p className="text-muted leading-relaxed mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.estimatedHours} hours</span>
                <span>{course.stages.length} stages</span>
                <span>{course.stages.reduce((n, s) => n + s.lessons.length, 0)} lessons</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Link href={`/courses/${course.id}/diagnostic`}>
                <Button size="lg" className="w-full">
                  Take diagnostic
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/courses/${course.id}/learn`}>
                <Button size="lg" variant="secondary" className="w-full">Go to lessons</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stages */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-5">Course structure</h2>
          <div className="flex flex-col gap-4">
            {course.stages.map((stage, si) => (
              <div key={stage.id} className="surface rounded-[var(--r-lg)] overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent-light text-accent text-xs font-bold flex items-center justify-center">
                    {si + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{stage.title}</h3>
                    <p className="text-xs text-muted">{stage.description}</p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {stage.lessons.map(lesson => (
                    <div key={lesson.id} className="px-5 py-3 flex items-center gap-3">
                      {si === 0 ? (
                        <Circle className="h-4 w-4 text-muted shrink-0" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted shrink-0 opacity-40" />
                      )}
                      <span className="text-sm text-foreground">{lesson.title}</span>
                      <span className="ml-auto text-xs text-muted">{lesson.exercise.type.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Topics preview */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">What you will cover</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {course.topicsPreview.map(topic => (
              <div key={topic} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className={[
                  'h-4 w-4 shrink-0',
                  topic.includes('coming soon') ? 'text-border' : 'text-accent',
                ].join(' ')} />
                <span className={topic.includes('coming soon') ? 'text-muted' : 'text-foreground'}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}