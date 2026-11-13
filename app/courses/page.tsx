import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Code, Briefcase } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import { COURSES } from '@/lib/data/courses';

const CATEGORY_ICONS = {
  programming: Code,
  languages: BookOpen,
  professional: Briefcase,
};

const COMING_SOON = [
  { title: 'JavaScript Essentials', category: 'programming', level: 'Beginner' },
  { title: 'Chinese A1', category: 'languages', level: 'A1' },
  { title: 'UI/UX Design Basics', category: 'professional', level: 'Beginner' },
  { title: 'Digital Marketing', category: 'professional', level: 'Beginner' },
];

export const metadata = { title: 'Courses' };

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Courses</h1>
          <p className="text-muted">Pick a course, take the diagnostic, and start building real skills.</p>
        </div>

        {/* Available courses */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Available now</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {COURSES.map(course => {
              const Icon = CATEGORY_ICONS[course.category];
              return (
                <Link key={course.id} href={`/courses/${course.id}`} className="group block">
                  <div className="surface rounded-[var(--r-xl)] p-6 h-full hover-lift transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-[var(--r-sm)] bg-accent-light flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {course.estimatedHours}h
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted mb-5 leading-relaxed">{course.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="muted">{course.level}</Badge>
                      <span className="text-xs font-medium text-accent flex items-center gap-1">
                        Start course <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Coming soon */}
        <section>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Coming soon</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {COMING_SOON.map(item => {
              const Icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 px-5 py-4 rounded-[var(--r-md)] bg-background border border-border opacity-60"
                >
                  <Icon className="h-5 w-5 text-muted shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted">{item.level}</p>
                  </div>
                  <Badge variant="muted" className="ml-auto">Planned</Badge>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
