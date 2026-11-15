'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '@/lib/i18n/context';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  function toggle() {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggle}
      type="button"
      className={`flex items-center justify-center w-8 h-8 rounded-[var(--r-md)] border border-border bg-surface text-foreground hover:border-accent/40 transition-all focus-accent cursor-pointer shadow-xs ${className}`}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      title={isDark ? `${t.common.themeLight} (Кликните для переключения)` : `${t.common.themeDark} (Кликните для переключения)`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
