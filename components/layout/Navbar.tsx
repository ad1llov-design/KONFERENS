'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { DemoState } from '@/lib/demo-state';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(DemoState.isAuthenticated());
  }, []);

  const links = [
    { href: '/courses', label: t.nav.courses, icon: BookOpen },
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/tutor', label: t.nav.tutor, icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border/80">
      <div className="max-w-6xl mx-auto px-4 h-15 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors shrink-0"
          aria-label="Kivora home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(242,138,50,0.6)]" />
          <span>Kivora</span>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Main navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-[var(--r-sm)] transition-colors',
                  isActive
                    ? 'bg-accent-light text-accent border border-accent/30'
                    : 'text-muted hover:text-foreground hover:bg-raised',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Language Switcher + User Profile/Auth */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher compact />

          <Link
            href={isAuth ? '/dashboard' : '/auth'}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-[var(--r-sm)] transition-all',
              isAuth
                ? 'bg-raised text-foreground border border-border hover:border-accent/40'
                : 'bg-accent text-white hover:bg-accent-hover shadow-sm',
            ].join(' ')}
          >
            <User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">{isAuth ? t.nav.profile : t.nav.signIn}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
