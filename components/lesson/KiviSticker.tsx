'use client';

import { useLanguage } from '@/lib/i18n/context';

export type KiviMood = 'celebrate' | 'encourage' | 'thinking' | 'champion';

interface KiviStickerProps {
  mood: KiviMood;
  customText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function KiviSticker({
  mood,
  customText,
  className = '',
  size = 'md',
}: KiviStickerProps) {
  const { locale } = useLanguage();

  const lines: Record<KiviMood, { ru: string; ky: string; en: string }> = {
    celebrate: {
      ru: 'Красава! В самую точку! 🚀',
      ky: 'Азаматсың! Дал өзү болду! 🚀',
      en: 'Nailed it! Spot on! 🚀',
    },
    encourage: {
      ru: 'Почти получилось! Сделай ещё одну попытку 💡',
      ky: 'Аз калды! Дагы бир ирет сынап көр 💡',
      en: 'Almost there! Take another shot 💡',
    },
    thinking: {
      ru: 'Хмм, вот ценная подсказка от Киви: 🧐',
      ky: 'Хмм, Кивиден пайдалуу кыйытма: 🧐',
      en: 'Hmm, here is a clue from Kivi: 🧐',
    },
    champion: {
      ru: 'Урок пройден на отлично! Так держать! 🎖️',
      ky: 'Сабак эң сонун аяктады! Мыкты жыйынтык! 🎖️',
      en: 'Lesson completed like a champion! 🎖️',
    },
  };

  const displayText = customText ?? lines[mood][locale] ?? lines[mood].en;

  // Dimensions based on size prop
  const sizeMap = {
    sm: { box: 'w-10 h-10', text: 'text-xs' },
    md: { box: 'w-16 h-16', text: 'text-sm' },
    lg: { box: 'w-24 h-24', text: 'text-base font-semibold' },
  };

  return (
    <div
      className={`inline-flex items-center gap-3 p-3 rounded-2xl bg-surface/90 border border-border shadow-xs motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 duration-200 ${className}`}
      role="status"
    >
      {/* SVG Mascot Character: Kivi */}
      <div className={`relative shrink-0 ${sizeMap[size].box}`}>
        {mood === 'celebrate' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Sparkle Rays */}
            <path d="M50 4L52 14L50 24L48 14Z" fill="#FBBF24" opacity="0.9" />
            <path d="M14 26L24 30L34 26L24 22Z" fill="#FBBF24" opacity="0.9" />
            <path d="M86 26L76 30L66 26L76 22Z" fill="#FBBF24" opacity="0.9" />
            {/* Body: Sleek Violet/Indigo Spark */}
            <circle cx="50" cy="58" r="32" fill="url(#kivi-violet-grad)" />
            {/* Tummy */}
            <ellipse cx="50" cy="65" rx="18" ry="16" fill="#EDE9FE" opacity="0.95" />
            {/* Star Eyes */}
            <path d="M38 52L40 47L42 52L47 54L42 56L40 61L38 56L33 54Z" fill="#7C3AED" />
            <path d="M62 52L64 47L66 52L71 54L66 56L64 61L62 56L57 54Z" fill="#7C3AED" />
            {/* Cute Smile */}
            <path d="M44 67C46 71 54 71 56 67" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="62" r="4" fill="#F472B6" opacity="0.8" />
            <circle cx="66" cy="62" r="4" fill="#F472B6" opacity="0.8" />
            {/* Mortarboard Graduate Cap */}
            <polygon points="50,18 80,27 50,36 20,27" fill="#1E1B4B" />
            <rect x="42" y="32" width="16" height="8" rx="2" fill="#312E81" />
            {/* Tassel */}
            <path d="M50 27Q68 28 72 40" stroke="#F59E0B" strokeWidth="2" fill="none" />
            <circle cx="72" cy="42" r="2.5" fill="#F59E0B" />
            <defs>
              <linearGradient id="kivi-violet-grad" x1="20" y1="26" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {mood === 'encourage' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Glowing Lightbulb above */}
            <circle cx="50" cy="16" r="10" fill="#FDE047" opacity="0.9" />
            <path d="M46 26H54V29H46Z" fill="#94A3B8" />
            <path d="M47 30H53V32H47Z" fill="#64748B" />
            {/* Body */}
            <circle cx="50" cy="60" r="32" fill="url(#kivi-amber-grad)" />
            {/* Tummy */}
            <ellipse cx="50" cy="67" rx="18" ry="16" fill="#FEF3C7" opacity="0.95" />
            {/* Gentle Warm Eyes */}
            <circle cx="38" cy="55" r="4.5" fill="#B45309" />
            <circle cx="62" cy="55" r="4.5" fill="#B45309" />
            <circle cx="39.5" cy="53.5" r="1.5" fill="#FFFFFF" />
            <circle cx="63.5" cy="53.5" r="1.5" fill="#FFFFFF" />
            {/* Supportive Smile */}
            <path d="M44 68C47 71 53 71 56 68" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
            {/* Encouraging Waving Wing */}
            <path d="M78 62C84 56 87 48 83 45C79 42 75 50 72 58" fill="#F59E0B" />
            <defs>
              <linearGradient id="kivi-amber-grad" x1="20" y1="28" x2="80" y2="92" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {mood === 'thinking' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Insight Spark */}
            <path d="M50 8L52 16L60 18L52 20L50 28L48 20L40 18L48 16Z" fill="#38BDF8" />
            {/* Body: Emerald / Teal Smart Spark */}
            <circle cx="50" cy="60" r="32" fill="url(#kivi-teal-grad)" />
            {/* Tummy */}
            <ellipse cx="50" cy="67" rx="18" ry="16" fill="#CCFBF1" opacity="0.95" />
            {/* Thoughtful Eyes looking up-right */}
            <circle cx="38" cy="54" r="5" fill="#0F766E" />
            <circle cx="62" cy="54" r="5" fill="#0F766E" />
            <circle cx="40" cy="52" r="2" fill="#FFFFFF" />
            <circle cx="64" cy="52" r="2" fill="#FFFFFF" />
            {/* Thoughtful mouth (whistle / pondering) */}
            <ellipse cx="52" cy="68" rx="2.5" ry="3" fill="#0F766E" />
            {/* Wing tapping chin */}
            <ellipse cx="46" cy="74" rx="5" ry="4" fill="#0D9488" />
            <defs>
              <linearGradient id="kivi-teal-grad" x1="20" y1="28" x2="80" y2="92" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2DD4BF" />
                <stop offset="1" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {mood === 'champion' && (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Laurel Leaves / Victory Sparkles */}
            <circle cx="20" cy="25" r="3" fill="#FBBF24" />
            <circle cx="80" cy="25" r="3" fill="#FBBF24" />
            {/* Body */}
            <circle cx="50" cy="58" r="32" fill="url(#kivi-gold-grad)" />
            {/* Tummy */}
            <ellipse cx="50" cy="65" rx="18" ry="16" fill="#FEF3C7" opacity="0.95" />
            {/* Happy Curved Wink Eyes */}
            <path d="M34 53C36 49 42 49 44 53" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
            <path d="M56 53C58 49 64 49 66 53" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
            {/* Big Smile */}
            <path d="M42 63C45 70 55 70 58 63" stroke="#92400E" strokeWidth="3" strokeLinecap="round" fill="#F59E0B" />
            {/* Victory Ribbon & Medal */}
            <path d="M44 76L50 83L56 76" fill="#EF4444" />
            <circle cx="50" cy="85" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <path d="M50 82L51 84L53 84L51.5 85.5L52 87.5L50 86L48 87.5L48.5 85.5L47 84L49 84Z" fill="#78350F" />
            <defs>
              <linearGradient id="kivi-gold-grad" x1="20" y1="26" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Localized text punchline */}
      <div className="flex-1 min-w-0">
        <p className={`text-foreground font-medium ${sizeMap[size].text} leading-tight`}>
          {displayText}
        </p>
      </div>
    </div>
  );
}
