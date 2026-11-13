'use client';

import { useLanguage } from '@/lib/i18n/context';
import type { Locale } from '@/lib/types';
import { Globe } from 'lucide-react';

const LOCALES: { code: Locale; label: string; full: string }[] = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ru', label: 'RU', full: 'Русский' },
  { code: 'ky', label: 'KY', full: 'Кыргызча' },
];

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={[
        'inline-flex items-center gap-1 p-1 rounded-[var(--r-sm)] bg-deep border border-border',
        className,
      ].join(' ')}
    >
      {!compact && (
        <Globe className="h-3.5 w-3.5 text-muted ml-1 mr-0.5 shrink-0" aria-hidden="true" />
      )}
      {LOCALES.map(({ code, label, full }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            title={full}
            className={[
              'px-2 py-0.5 text-xs font-semibold rounded-[calc(var(--r-sm)-2px)] transition-all',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
              isActive
                ? 'bg-accent text-white shadow-sm'
                : 'text-muted hover:text-foreground hover:bg-raised',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
