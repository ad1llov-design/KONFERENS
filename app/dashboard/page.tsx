'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, LogOut, User } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { COURSES, getCourse } from '@/lib/data/courses';
import { LEVEL_LABELS } from '@/lib/data/diagnostics';
import { isSupabaseConfigured } from '@/lib/env';
import type { CourseProgress, CourseId } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ displayName?: string | null; email: string } | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<{ progress: CourseProgress; courseId: CourseId }[]>([]);
  const [demoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    setMounted(true);
    // Redirect if not authenticated
    if (!DemoState.isAuthenticated()) {
      router.replace('/auth');
      return;
    }
    setUser(DemoState.getUser());

    // Gather enrolled courses
    const enrolled: { progress: CourseProgress; courseId: CourseId }[] = [];
    for (const course of COURSES) {
      if (DemoState.isEnrolled(course.id)) {
        const prog = DemoState.getProgress(course.id);
        if (prog) enrolled.push({ progress: prog, courseId: course.id });
      }
    }
    setEnrolledCourses(enrolled);
  }, [router]);

  function handleSignOut() {
    DemoState.signOut();
    router.push('/');
  }

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">

        {demoMode && (
          <div className="mb-6">
            <DemoBanner
              message="Running in demo mode. Progress is saved locally in this browser."
              missingVars={['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']}
            />
          </div>
        )}

        {/* User header */}
        <div className="glass rounded-[var(--r-xl)] p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center">
                <User className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {user?.displayName ?? user?.email ?? 'Learner'}
                </h1>
                {user?.email && user.displayName && (
                  <p className="text-sm text-muted">{user.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        {/* Enrolled courses */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your courses</h2>

          {enrolledCourses.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-10 w-10" />}
              title="No courses yet"
              description="Pick a course and take the diagnostic to get started."
              action={
                <Link href="/courses">
                  <Button>Browse courses <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {enrolledCourses.map(({ progress, courseId }) => {
                const course = getCourse(courseId);
                if (!course) return null;
                const pct = DemoState.getCompletionPercent(courseId);
                const level = LEVEL_LABELS[progress.level];
                return (
                  <div key={courseId} className="surface rounded-[var(--r-xl)] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <Badge variant="accent" className="mt-1">{level}</Badge>
                      </div>
                      <span className="text-sm font-bold text-foreground">{pct}%</span>
                    </div>
                    <ProgressBar value={pct} showLabel={false} className="mb-5" />
                    <div className="flex gap-2">
                      {progress.currentLessonId ? (
                        <Link href={`/courses/${courseId}/learn/${progress.currentLessonId}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            Continue <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/courses/${courseId}/learn`} className="flex-1">
                          <Button className="w-full" size="sm">
                            View path <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/tutor?course=${courseId}`}>
                        <Button variant="secondary" size="sm">Ask tutor</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Browse more */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-5">Explore more</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {COURSES.filter(c => !enrolledCourses.some(e => e.courseId === c.id)).map(course => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group block">
                <Panel className="hover-lift">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground group-hover:text-accent transition-colors">{course.title}</p>
                      <p className="text-xs text-muted mt-0.5">{course.level}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
                  </div>
                </Panel>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
