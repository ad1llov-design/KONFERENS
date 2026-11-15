'use client';

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '@/lib/i18n/context';
import type { ThemeMode } from '@/lib/types';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: t.common.themeLight, icon: Sun },
    { mode: 'dark', label: t.common.themeDark, icon: Moon },
    { mode: 'system', label: t.common.themeSystem, icon: Monitor },
  ];

  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-[var(--r-md)] border border-border bg-surface text-muted hover:text-foreground hover:border-accent/40 transition-colors focus-accent"
        aria-label={t.common.themeLabel}
        title={t.common.themeLabel}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <CurrentIcon className="w-4 h-4 transition-transform duration-200" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-[var(--r-md)] bg-surface border border-border shadow-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted px-2 py-1">
            {t.common.themeLabel}
          </div>
          {options.map(opt => {
            const Icon = opt.icon;
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setOpen(false);
                }}
                className={[
                  'w-full flex items-center justify-between px-2.5 py-1.5 rounded-[var(--r-sm)] text-xs font-medium transition-colors',
                  isSelected
                    ? 'bg-accent-light text-accent'
                    : 'text-foreground hover:bg-surface-raised',
                ].join(' ')}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
