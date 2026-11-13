'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Code, Briefcase, Search, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import { COURSES } from '@/lib/data/courses';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import type { CourseCategory } from '@/lib/types';

const CATEGORY_ICONS: Record<CourseCategory, typeof Code> = {
  programming: Code,
  languages: BookOpen,
  professional: Briefcase,
};

type FilterCategory = 'all' | CourseCategory;

export default function CoursesPage() {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      // Category filter
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const loc = getLocalizedCourse(course, locale);
        const matchTitle = loc.title.toLowerCase().includes(q) || course.title.toLowerCase().includes(q);
        const matchDesc = loc.description.toLowerCase().includes(q) || course.description.toLowerCase().includes(q);
        const matchTopics = loc.topicsPreview.some(tp => tp.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTopics) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, locale]);

  const counts = useMemo(() => {
    return {
      all: COURSES.length,
      programming: COURSES.filter(c => c.category === 'programming').length,
      languages: COURSES.filter(c => c.category === 'languages').length,
      professional: COURSES.filter(c => c.category === 'professional').length,
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="accent">15 Tracks</Badge>
            <span className="text-xs text-muted flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-accent" />
              {t.home.badge}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t.catalog.title}
          </h1>
          <p className="text-muted max-w-2xl text-sm md:text-base">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={[
                'px-3.5 py-1.5 rounded-[var(--r-md)] text-xs md:text-sm font-medium transition-all',
                selectedCategory === 'all'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface border border-border text-muted hover:text-foreground hover:border-accent/40',
              ].join(' ')}
            >
              {t.catalog.allCategories} ({counts.all})
            </button>
            <button
              onClick={() => setSelectedCategory('programming')}
              className={[
                'px-3.5 py-1.5 rounded-[var(--r-md)] text-xs md:text-sm font-medium transition-all flex items-center gap-1.5',
                selectedCategory === 'programming'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface border border-border text-muted hover:text-foreground hover:border-accent/40',
              ].join(' ')}
            >
              <Code className="h-3.5 w-3.5" />
              {t.catalog.techCategory} ({counts.programming})
            </button>
            <button
              onClick={() => setSelectedCategory('languages')}
              className={[
                'px-3.5 py-1.5 rounded-[var(--r-md)] text-xs md:text-sm font-medium transition-all flex items-center gap-1.5',
                selectedCategory === 'languages'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface border border-border text-muted hover:text-foreground hover:border-accent/40',
              ].join(' ')}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {t.catalog.langCategory} ({counts.languages})
            </button>
            <button
              onClick={() => setSelectedCategory('professional')}
              className={[
                'px-3.5 py-1.5 rounded-[var(--r-md)] text-xs md:text-sm font-medium transition-all flex items-center gap-1.5',
                selectedCategory === 'professional'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface border border-border text-muted hover:text-foreground hover:border-accent/40',
              ].join(' ')}
            >
              <Briefcase className="h-3.5 w-3.5" />
              {t.catalog.profCategory} ({counts.professional})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.catalog.filterSearch}
              className="w-full pl-9 pr-3.5 py-2 rounded-[var(--r-md)] text-sm bg-surface border border-border placeholder:text-subtle text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
            />
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="glass rounded-[var(--r-xl)] p-12 text-center">
            <p className="text-muted text-base mb-4">{t.common.error}</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-accent hover:underline font-medium"
            >
              {t.common.tryAgain}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map(course => {
              const loc = getLocalizedCourse(course, locale);
              const Icon = CATEGORY_ICONS[course.category];
              const badgeVariant =
                course.category === 'programming'
                  ? 'blue'
                  : course.category === 'languages'
                  ? 'accent'
                  : 'success';

              return (
                <Link key={course.id} href={`/courses/${course.id}`} className="group block">
                  <div className="surface rounded-[var(--r-xl)] p-6 h-full hover-lift transition-all duration-200 border border-border/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-[var(--r-sm)] bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.estimatedHours}h</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <Badge variant={badgeVariant} className="text-[10px]">
                          {course.category === 'programming'
                            ? t.catalog.techCategory
                            : course.category === 'languages'
                            ? t.catalog.langCategory
                            : t.catalog.profCategory}
                        </Badge>
                      </div>

                      <h2 className="font-semibold text-lg text-foreground mb-1.5 group-hover:text-accent transition-colors">
                        {loc.title}
                      </h2>
                      <p className="text-xs text-muted mb-4 leading-relaxed line-clamp-3">
                        {loc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted font-medium">{loc.level}</span>
                      <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        {t.catalog.startCourse} <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
