'use client';

import { useEffect } from 'react';
import { X, Sparkles, Volume2 } from 'lucide-react';
import { MemeSticker, type MemeType } from './MemeSticker';
import { useLanguage } from '@/lib/i18n/context';
import { soundManager } from '@/lib/sound/sound-manager';

interface MemePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  sticker: MemeType;
  isCorrect: boolean;
  customText?: string;
  autoCloseMs?: number;
}

export function MemePopupModal({
  isOpen,
  onClose,
  sticker,
  isCorrect,
  customText,
  autoCloseMs = 3500,
}: MemePopupModalProps) {
  const { locale } = useLanguage();

  // Auto-dismiss timer
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, autoCloseMs]);

  if (!isOpen) return null;

  const headerTitle = isCorrect
    ? locale === 'ky'
      ? '🎉 Керемет шешім!'
      : locale === 'ru'
      ? '🎉 Отличный ответ!'
      : '🎉 Excellent Answer!'
    : locale === 'ky'
    ? '⚡ Қателік болды!'
    : locale === 'ru'
    ? '⚡ Есть ошибка!'
    : '⚡ Check your logic!';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-sm sm:max-w-md p-6 rounded-3xl bg-surface border-2 shadow-2xl transition-all duration-300 transform scale-100 motion-safe:animate-in motion-safe:zoom-in-90 ${
          isCorrect
            ? 'border-emerald-500 ring-4 ring-emerald-500/20'
            : 'border-danger ring-4 ring-danger/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-full text-muted hover:text-foreground hover:bg-surface-raised transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Mini Header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-danger text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
            {headerTitle}
          </span>
        </div>

        {/* Large Prominent Vector Meme Sticker */}
        <div className="py-2 flex justify-center">
          <MemeSticker
            sticker={sticker}
            customText={customText}
            size="lg"
            className="w-full justify-center bg-surface-raised/70 border-border/80 shadow-md"
          />
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-border">
          <span className="text-[11px] text-muted">
            {locale === 'ky' ? 'Жалғастыру үшін кез келген жерді басыңыз' : 'Нажмите в любом месте, чтобы продолжить'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer shadow-xs ${
              isCorrect
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-danger hover:bg-danger/90'
            }`}
          >
            {locale === 'ky' ? 'Жабу' : 'Понятно'}
          </button>
        </div>
      </div>
    </div>
  );
}
