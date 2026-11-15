'use client';

import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Circle, Lock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import { getLocalizedCourseWithStages } from '@/lib/data/course-content-localization';
import type { Course } from '@/lib/types';

interface CourseDetailViewProps {
  course: Course;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const { t, locale } = useLanguage();
  const loc = getLocalizedCourse(course, locale);
  const localizedCourse = getLocalizedCourseWithStages(course, locale);

  const totalLessons = course.stages.reduce((acc, s) => acc + s.lessons.length, 0);

  const categoryLabel =
    course.category === 'programming'
      ? t.catalog.techCategory
      : course.category === 'languages'
      ? t.catalog.langCategory
      : t.catalog.profCategory;

  const categoryBadgeVariant =
    course.category === 'programming'
      ? 'blue'
      : course.category === 'languages'
      ? 'accent'
      : 'success';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      {/* Hero */}
      <div className="glass rounded-[var(--r-xl)] p-8 mb-8 border border-border/80">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={categoryBadgeVariant}>
                {categoryLabel}
              </Badge>
              <Badge variant="muted">{loc.level}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{loc.title}</h1>
            <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">{loc.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-accent" />
                {course.estimatedHours} {t.courseDetail.hours}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="h-4 w-4 text-accent" />
                {course.stages.length} {t.courseDetail.stages}
              </span>
              <span>
                {totalLessons} {t.courseDetail.lessons}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link href={`/courses/${course.id}/diagnostic`}>
              <Button size="lg" className="w-full">
                {t.courseDetail.takeDiagnostic}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/courses/${course.id}/learn`}>
              <Button size="lg" variant="secondary" className="w-full">
                {t.courseDetail.goToLessons}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stages */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          {t.courseDetail.structureTitle}
        </h2>
        <div className="flex flex-col gap-4">
          {localizedCourse.stages.map((stage, si) => (
            <div key={stage.id} className="surface rounded-[var(--r-lg)] overflow-hidden border border-border/80">
              <div className="px-5 py-4 border-b border-border flex items-center gap-3 bg-surface/80">
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                  {si + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{stage.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{stage.description}</p>
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {stage.lessons.map(lesson => (
                  <div key={lesson.id} className="px-5 py-3 flex items-center gap-3 hover:bg-surface-raised/40 transition-colors">
                    {si === 0 ? (
                      <Circle className="h-4 w-4 text-accent shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted shrink-0 opacity-40" />
                    )}
                    <span className="text-sm text-foreground">{lesson.title}</span>
                    <span className="ml-auto text-xs text-muted bg-surface px-2 py-0.5 rounded border border-border/40">
                      {lesson.exercise.type.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics preview */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">
          {t.courseDetail.whatYouCover}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {loc.topicsPreview.map(topic => (
            <div key={topic} className="flex items-center gap-2.5 text-sm surface p-3.5 rounded-[var(--r-md)] border border-border/70">
              <CheckCircle2 className={[
                'h-4 w-4 shrink-0',
                topic.includes('coming soon') || topic.includes('в плане') ? 'text-border' : 'text-accent',
              ].join(' ')} />
              <span className={topic.includes('coming soon') || topic.includes('в плане') ? 'text-muted' : 'text-foreground'}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
