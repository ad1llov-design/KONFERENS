'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, BookOpen, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { DemoState } from '@/lib/demo-state';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();
  const [activeCourseId, setActiveCourseId] = useState<string>('python-fundamentals');

  useEffect(() => {
    // Check if user has an enrolled active course
    const enrolled = DemoState.getEnrolledCourses();
    if (enrolled.length > 0) {
      setActiveCourseId(enrolled[0]);
    }
  }, [pathname]);

  const navItems = [
    {
      href: '/',
      label: locale === 'ru' ? 'Главная' : locale === 'ky' ? 'Башкы' : 'Home',
      icon: Home,
      exact: true,
    },
    {
      href: '/courses',
      label: t.nav.courses,
      icon: BookOpen,
      exact: false,
    },
    {
      href: `/courses/${activeCourseId}/learn`,
      label: locale === 'ru' ? 'Дорожка' : locale === 'ky' ? 'Маршрут' : 'Roadmap',
      icon: Compass,
      exact: false,
      activeMatcher: (path: string) => path.includes('/learn'),
    },
    {
      href: '/tutor',
      label: t.nav.tutor,
      icon: MessageSquare,
      exact: false,
    },
    {
      href: '/dashboard',
      label: t.nav.dashboard,
      icon: User,
      exact: false,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/80 bg-background/90 backdrop-blur-xl shadow-lg transition-transform duration-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      aria-label="Mobile Navigation Bar"
    >
      <div className="flex items-center justify-around h-15 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.activeMatcher
            ? item.activeMatcher(pathname)
            : item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-[var(--r-sm)] transition-all select-none',
                isActive
                  ? 'text-accent font-bold scale-105'
                  : 'text-muted hover:text-foreground active:scale-95',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 transition-transform ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent shadow-xs" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[62px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
