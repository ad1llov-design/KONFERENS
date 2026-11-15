'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Check } from 'lucide-react';
import { soundManager } from '@/lib/sound/sound-manager';
import { useLanguage } from '@/lib/i18n/context';
import { DemoState } from '@/lib/demo-state';

interface SoundToggleProps {
  className?: string;
  showVolumeSlider?: boolean;
}

export function SoundToggle({ className = '', showVolumeSlider = false }: SoundToggleProps) {
  const { locale } = useLanguage();
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(soundManager.isEnabled());
    setVolume(soundManager.getVolume());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }
    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenu]);

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    soundManager.setEnabled(next);
    if (next) {
      soundManager.testSound();
    }
    try {
      if (DemoState.isAuthenticated()) {
        DemoState.updateProfile({ soundEnabled: next });
      }
    } catch {}
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundManager.setVolume(newVol);
    try {
      if (DemoState.isAuthenticated()) {
        DemoState.updateProfile({ soundVolume: newVol });
      }
    } catch {}
  };

  const labels = {
    title: locale === 'ru' ? 'Звуковые эффекты' : locale === 'ky' ? 'Үн эффекттери' : 'Sound Effects',
    soundOn: locale === 'ru' ? 'Звуки включены' : locale === 'ky' ? 'Үн күйгүзүлгөн' : 'Sound enabled',
    soundOff: locale === 'ru' ? 'Звуки выключены' : locale === 'ky' ? 'Үн өчүрүлгөн' : 'Sound muted',
    toggle: locale === 'ru' ? 'Вкл / Выкл звук' : locale === 'ky' ? 'Үндү күйгүзүү / өчүрүү' : 'Toggle sound',
    volume: locale === 'ru' ? 'Громкость' : locale === 'ky' ? 'Үндүн көлөмү' : 'Volume',
    testSound: locale === 'ru' ? 'Проверить звук' : locale === 'ky' ? 'Үндү текшерүү' : 'Test sound',
  };

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={toggleSound}
        className={`p-2 rounded-lg transition-colors duration-150 flex items-center justify-center ${
          enabled
            ? 'text-accent hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-accent'
            : 'text-muted hover:text-foreground hover:bg-surface focus-visible:ring-2 focus-visible:ring-muted'
        }`}
        title={`${labels.title}: ${enabled ? labels.soundOn : labels.soundOff}`}
        aria-label={labels.toggle}
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 opacity-70" />}
      </button>

      {showVolumeSlider && (
        <button
          type="button"
          onClick={() => setOpenMenu(!openMenu)}
          className="text-[10px] text-muted hover:text-foreground px-1 py-0.5 rounded transition-colors"
          title={labels.volume}
        >
          {Math.round(volume * 100)}%
        </button>
      )}

      {/* Volume dropdown menu */}
      {openMenu && (
        <div className="absolute right-0 top-full mt-1.5 w-48 p-3 rounded-xl bg-surface border border-border shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">{labels.title}</span>
            <button
              type="button"
              onClick={toggleSound}
              className={`text-xs px-2 py-0.5 rounded font-medium ${
                enabled ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted/20 text-muted'
              }`}
            >
              {enabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>{labels.volume}</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              disabled={!enabled}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent disabled:opacity-40"
            />
            <button
              type="button"
              disabled={!enabled}
              onClick={() => soundManager.testSound()}
              className="w-full mt-2 py-1 px-2 text-xs font-medium rounded-lg bg-surface hover:bg-background border border-border text-foreground transition-colors flex items-center justify-center gap-1 disabled:opacity-40"
            >
              <Check className="h-3 w-3" /> {labels.testSound}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
