'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

export function PromoBar() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-accent/10 border-b border-accent/20 text-foreground py-1.5 px-4 text-xs transition-colors duration-150 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent text-white shrink-0 text-[10px]">
            <Sparkles className="w-2.5 h-2.5" />
          </span>
          <span className="font-medium text-foreground truncate">
            {t.promo.bannerText}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/courses"
            className="font-semibold text-accent hover:underline flex items-center gap-1 shrink-0"
          >
            <span>{t.promo.actionBtn}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted hover:text-foreground transition-colors p-0.5 rounded-[var(--r-xs)]"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
