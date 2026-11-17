'use client';

import { useLanguage } from '@/lib/i18n/context';

export type MemeType =
  | 'facepalm'
  | 'this-is-fine'
  | 'panic-cat'
  | 'galaxy-brain'
  | 'gigachad'
  | 'emotional-damage';

interface MemeStickerProps {
  sticker: MemeType;
  customText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MemeSticker({
  sticker,
  customText,
  className = '',
  size = 'md',
}: MemeStickerProps) {
  const { locale } = useLanguage();

  const captions: Record<MemeType, { ru: string; ky: string; en: string }> = {
    facepalm: {
      ru: 'Ctrl+Z твою мысль срочно! 🤦‍♂️',
      ky: 'Ctrl+Z тезирээк! Башынан ойлончу 🤦‍♂️',
      en: 'Ctrl+Z that thought immediately! 🤦‍♂️',
    },
    'this-is-fine': {
      ru: 'Всё горит, но код почему-то прошёл 🔥☕',
      ky: 'Баары күйүп жатат, бирок код өттү окшойт 🔥☕',
      en: 'Everything is on fire, but it compiles 🔥☕',
    },
    'panic-cat': {
      ru: 'Панический рефакторинг в проде! ⌨️💥',
      ky: 'Проддо шашылыш оңдоо жүрүп жатат! ⌨️💥',
      en: 'Panic refactoring directly in production! ⌨️💥',
    },
    'galaxy-brain': {
      ru: 'Ментальный компилятор 300 IQ! 🧠✨',
      ky: '300 IQ космостук мээ иштеди! 🧠✨',
      en: 'Galaxy Brain 300 IQ activation! 🧠✨',
    },
    gigachad: {
      ru: 'С первого раза без единого варнинга. База. 💪🗿',
      ky: 'Биринчи аракеттен эле таза өттү. Мыкты! 💪🗿',
      en: 'First attempt, zero warnings. Absolute Chad. 💪🗿',
    },
    'emotional-damage': {
      ru: 'Критический эмоциональный урон! 💔⚡',
      ky: 'Өтө катуу тийди! Эмоционалдык сокку! 💔⚡',
      en: 'Critical Emotional Damage! 💔⚡',
    },
  };

  const displayText =
    customText ?? captions[sticker]?.[locale] ?? captions[sticker]?.en;

  const sizeMap = {
    sm: { box: 'w-10 h-10', text: 'text-xs' },
    md: { box: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-xs sm:text-sm' },
    lg: { box: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-sm sm:text-base font-semibold' },
  };

  return (
    <div
      className={`inline-flex items-center gap-3 p-3 rounded-2xl bg-surface/95 border border-border shadow-md motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 duration-200 ${className}`}
      role="status"
    >
      {/* 100% Vector SVG Meme Sticker */}
      <div className={`relative shrink-0 ${sizeMap[size].box}`}>
        {sticker === 'facepalm' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background disc */}
            <circle cx="50" cy="50" r="46" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="2" />
            {/* Head */}
            <circle cx="50" cy="50" r="32" fill="#FBBF24" />
            {/* Sweat drop */}
            <path d="M72 30C72 34 68 38 68 38C68 38 64 34 64 30C64 26 72 24 72 30Z" fill="#38BDF8" />
            {/* Slapped hand on face */}
            <path d="M30 65C30 45 42 35 56 35C64 35 70 42 70 48C70 54 62 60 55 60C45 60 40 68 36 72" fill="#F59E0B" />
            {/* Palm & fingers */}
            <rect x="42" y="32" width="6" height="20" rx="3" fill="#D97706" />
            <rect x="50" y="30" width="6" height="23" rx="3" fill="#D97706" />
            <rect x="58" y="32" width="6" height="20" rx="3" fill="#D97706" />
            <rect x="66" y="36" width="6" height="15" rx="3" fill="#D97706" />
            {/* Peeking grimace eye */}
            <path d="M32 46C34 42 40 42 42 46" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            {/* Sigh mouth */}
            <path d="M38 68Q48 64 54 70" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}

        {sticker === 'this-is-fine' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background disc */}
            <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
            {/* Flames behind */}
            <path d="M15 80Q20 50 30 62Q38 35 50 55Q62 30 72 58Q82 45 88 80Z" fill="#F97316" opacity="0.9" />
            <path d="M22 80Q28 58 35 68Q45 48 55 65Q68 45 78 72Q84 62 86 80Z" fill="#FBBF24" opacity="0.95" />
            {/* Dog Head */}
            <ellipse cx="50" cy="54" rx="20" ry="18" fill="#F59E0B" />
            {/* Bowler Hat */}
            <rect x="36" y="35" width="28" height="6" rx="3" fill="#1E293B" />
            <rect x="41" y="24" width="18" height="13" rx="3" fill="#334155" />
            {/* Snout */}
            <ellipse cx="50" cy="58" rx="10" ry="8" fill="#FDE68A" />
            <ellipse cx="50" cy="54" rx="3" ry="2" fill="#0F172A" />
            {/* Calm blank eyes */}
            <circle cx="43" cy="48" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="57" cy="48" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="44" cy="48" r="1.5" fill="#0F172A" />
            <circle cx="56" cy="48" r="1.5" fill="#0F172A" />
            {/* Calm serene smile */}
            <path d="M46 62Q50 64 54 62" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            {/* Coffee mug */}
            <rect x="66" y="66" width="12" height="12" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
            <path d="M78 69Q83 72 78 75" stroke="#64748B" strokeWidth="1.5" fill="none" />
          </svg>
        )}

        {sticker === 'panic-cat' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background disc */}
            <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            {/* Cat Head */}
            <circle cx="50" cy="52" r="26" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
            {/* Ears */}
            <polygon points="30,34 38,20 46,32" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
            <polygon points="34,32 38,24 43,31" fill="#F472B6" />
            <polygon points="54,32 62,20 70,34" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
            <polygon points="57,31 62,24 66,32" fill="#F472B6" />
            {/* Wide Panic Eyes */}
            <circle cx="40" cy="50" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <circle cx="60" cy="50" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <circle cx="40" cy="50" r="2" fill="#0F172A" />
            <circle cx="60" cy="50" r="2" fill="#0F172A" />
            {/* Panic mouth "O" */}
            <ellipse cx="50" cy="62" rx="4" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
            {/* Rapid keyboard paws */}
            <ellipse cx="36" cy="74" rx="7" ry="5" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            <ellipse cx="64" cy="74" rx="7" ry="5" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            {/* Keyboard */}
            <rect x="24" y="80" width="52" height="12" rx="3" fill="#1E293B" />
            <path d="M28 84H72M28 88H68" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            {/* Motion lines */}
            <path d="M22 66L14 62M78 66L86 62M50 20L50 12" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}

        {sticker === 'galaxy-brain' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Glowing cosmic disc */}
            <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
            {/* Cosmic rays */}
            <path d="M50 8L52 20L50 24L48 20Z" fill="#38BDF8" />
            <path d="M85 25L75 32L71 28L78 22Z" fill="#C084FC" />
            <path d="M15 25L25 32L29 28L22 22Z" fill="#C084FC" />
            <path d="M88 50L76 52L76 48Z" fill="#38BDF8" />
            <path d="M12 50L24 52L24 48Z" fill="#38BDF8" />
            {/* Translucent Glowing Brain Aura */}
            <circle cx="50" cy="44" r="28" fill="url(#cosmic-grad)" opacity="0.85" />
            {/* Brain convolutions */}
            <path
              d="M36 42C32 38 34 32 40 32C42 26 50 26 52 30C56 26 64 28 64 34C68 36 68 44 64 48C66 54 60 58 54 56C50 60 42 58 40 54C34 54 32 46 36 42Z"
              fill="#A855F7"
              stroke="#E0E7FF"
              strokeWidth="2"
            />
            <path d="M44 36Q50 42 46 50M54 34Q52 44 58 48M40 44H60" stroke="#F0ABFC" strokeWidth="1.5" strokeLinecap="round" />
            {/* Silhouetted Head below */}
            <path d="M38 58C34 66 32 78 30 88H70C68 78 66 66 62 58Z" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
            {/* Glowing eyes */}
            <circle cx="45" cy="68" r="2.5" fill="#38BDF8" />
            <circle cx="55" cy="68" r="2.5" fill="#38BDF8" />
            <defs>
              <radialGradient id="cosmic-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#6366F1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        )}

        {sticker === 'gigachad' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background disc */}
            <circle cx="50" cy="50" r="46" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
            {/* Chiseled Jawline Head */}
            <polygon
              points="30,30 50,22 70,30 72,58 64,74 50,86 36,74 28,58"
              fill="#CBD5E1"
              stroke="#334155"
              strokeWidth="2.5"
            />
            {/* Dark cool sunglasses */}
            <polygon points="32,44 48,44 46,54 34,54" fill="#0F172A" />
            <polygon points="52,44 68,44 66,54 54,54" fill="#0F172A" />
            <line x1="48" y1="47" x2="52" y2="47" stroke="#0F172A" strokeWidth="2" />
            {/* Glare on sunglasses */}
            <line x1="36" y1="46" x2="40" y2="52" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="56" y1="46" x2="60" y2="52" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sharp nose and cheekbones */}
            <path d="M50 50L48 64H53" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="60" x2="40" y2="66" stroke="#64748B" strokeWidth="1.5" />
            <line x1="68" y1="60" x2="60" y2="66" stroke="#64748B" strokeWidth="1.5" />
            {/* Confident smirk */}
            <path d="M42 72C46 75 54 75 58 71" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Chiseled chin cleft */}
            <line x1="50" y1="78" x2="50" y2="82" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        {sticker === 'emotional-damage' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Background disc */}
            <circle cx="50" cy="50" r="46" fill="#FEF2F2" stroke="#F87171" strokeWidth="2" />
            {/* Broken Heart - Left half */}
            <path
              d="M48 30C42 22 30 22 24 30C16 40 22 56 46 76L50 68L44 62L52 54L44 44L52 38L48 30Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            {/* Broken Heart - Right half */}
            <path
              d="M52 34L56 42L48 50L56 58L48 66L54 78C78 58 84 42 76 32C70 24 58 24 52 34Z"
              fill="#DC2626"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            {/* Lightning bolt crack */}
            <path d="M49 22L45 42L55 48L47 68L56 70" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            {/* Sparks */}
            <circle cx="30" cy="24" r="2" fill="#F59E0B" />
            <circle cx="70" cy="26" r="2" fill="#F59E0B" />
            <circle cx="50" cy="85" r="2.5" fill="#EF4444" />
          </svg>
        )}
      </div>

      {/* Localized Punchline Caption */}
      <div className="flex-1 min-w-0">
        <p className={`text-foreground font-semibold ${sizeMap[size].text} leading-tight`}>
          {displayText}
        </p>
      </div>
    </div>
  );
}
