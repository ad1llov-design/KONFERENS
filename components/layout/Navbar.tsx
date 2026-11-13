'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
          aria-label="Kivora home"
        >
          Kivora
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-[var(--r-sm)] transition-colors',
                pathname.startsWith(href)
                  ? 'bg-accent-light text-accent'
                  : 'text-muted hover:text-foreground hover:bg-background',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}

          <Link
            href="/auth"
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-[var(--r-sm)] bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            <span>Sign in</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
