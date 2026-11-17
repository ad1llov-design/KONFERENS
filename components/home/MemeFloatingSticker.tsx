'use client';

import { soundManager } from '@/lib/sound/sound-manager';

export type MemeCardType = 'doge' | 'einstein' | 'homer' | 'cat';

interface MemeFloatingStickerProps {
  type: MemeCardType;
  className?: string;
  customCaption?: string;
}

export function MemeFloatingSticker({
  type,
  className = '',
  customCaption,
}: MemeFloatingStickerProps) {
  const meta: Record<
    MemeCardType,
    { title: string; caption: string; tag: string; tagColor: string; sound: string }
  > = {
    doge: {
      title: 'Doge Senior Dev',
      caption: customCaption ?? 'Much code. Very syntax. So compile. Wow.',
      tag: 'Classic Meme',
      tagColor: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
      sound: 'shedevr.mp3',
    },
    einstein: {
      title: 'Альберт Эйнштейн',
      caption: customCaption ?? 'Теория относительности багов: чем ближе дедлайн, тем их больше.',
      tag: '300 IQ Theory',
      tagColor: 'bg-sky-500/15 text-sky-500 border-sky-500/30',
      sound: 'geniy.mp3',
    },
    homer: {
      title: 'Гомер в кустах',
      caption: customCaption ?? 'Когда случайно запушил в master в пятницу в 18:00.',
      tag: 'Deploy Friday',
      tagColor: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
      sound: 'fiasko.mp3',
    },
    cat: {
      title: 'Hacker Cat',
      caption: customCaption ?? '10 000 строк кода за ночь на чистом кофеине.',
      tag: 'Speedrun Code',
      tagColor: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
      sound: 'krasavchik.mp3',
    },
  };

  const item = meta[type];

  const handleClick = () => {
    soundManager.playMemeFile(item.sound);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Нажмите, чтобы послушать звук"
      className={`glass-card rounded-[var(--r-xl)] p-3 sm:p-4 border border-border/80 shadow-md flex items-center gap-3 transition-all duration-300 hover:scale-102 hover:border-accent/40 bg-surface/90 cursor-pointer active:scale-98 ${className}`}
    >
      {/* 100% Vector Meme Illustration */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-surface-raised border border-border flex items-center justify-center overflow-hidden p-1">
        {type === 'doge' && (
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Doge Head */}
            <circle cx="40" cy="40" r="32" fill="#EAB308" />
            <polygon points="20,24 16,10 32,18" fill="#CA8A04" />
            <polygon points="60,24 64,10 48,18" fill="#CA8A04" />
            {/* White Muzzle */}
            <ellipse cx="40" cy="48" rx="16" ry="14" fill="#FEF08A" />
            {/* Nose */}
            <polygon points="36,44 44,44 40,48" fill="#1E293B" />
            {/* Eyebrows */}
            <ellipse cx="30" cy="30" rx="4" ry="2" fill="#FEF08A" />
            <ellipse cx="50" cy="30" rx="4" ry="2" fill="#FEF08A" />
            {/* Suspicious Doge Side-eye */}
            <circle cx="30" cy="35" r="4.5" fill="#FFFFFF" />
            <circle cx="50" cy="35" r="4.5" fill="#FFFFFF" />
            <circle cx="32" cy="35" r="2.5" fill="#0F172A" />
            <circle cx="52" cy="35" r="2.5" fill="#0F172A" />
            {/* Smug Doge Mouth */}
            <path d="M34 52C37 54 43 54 46 52" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        {type === 'einstein' && (
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Wild Grey Hair */}
            <circle cx="40" cy="40" r="32" fill="#E2E8F0" />
            <path
              d="M14 42C10 34 16 20 28 16C36 12 48 12 56 18C66 14 74 24 70 36C74 46 66 58 58 60C50 64 30 64 22 58C16 52 12 46 14 42Z"
              fill="#CBD5E1"
            />
            {/* Face */}
            <ellipse cx="40" cy="44" rx="18" ry="20" fill="#FDE68A" />
            {/* Wrinkles */}
            <path d="M32 28Q40 26 48 28M30 32Q40 30 50 32" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
            {/* Intense Eyes */}
            <circle cx="33" cy="40" r="3.5" fill="#0F172A" />
            <circle cx="47" cy="40" r="3.5" fill="#0F172A" />
            {/* White Bushy Mustache */}
            <path
              d="M26 50C32 46 38 52 40 50C42 52 48 46 54 50C50 56 42 54 40 54C38 54 30 56 26 50Z"
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            {/* Sticking Out Pink Tongue! */}
            <path d="M37 54C37 62 43 62 43 54" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="40" y1="55" x2="40" y2="60" stroke="#BE123C" strokeWidth="1" />
          </svg>
        )}

        {type === 'homer' && (
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Bushes in front & back */}
            <circle cx="16" cy="30" r="14" fill="#15803D" />
            <circle cx="64" cy="30" r="14" fill="#15803D" />
            <circle cx="40" cy="20" r="16" fill="#16A34A" />
            {/* Homer Head Disappearing */}
            <ellipse cx="40" cy="42" rx="14" ry="18" fill="#FACC15" />
            {/* Two Strands of Hair */}
            <path d="M36 24Q40 18 44 24" stroke="#0F172A" strokeWidth="1.5" fill="none" />
            {/* Big Wide Eyes */}
            <circle cx="34" cy="38" r="5.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="46" cy="38" r="5.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="35" cy="38" r="2" fill="#0F172A" />
            <circle cx="47" cy="38" r="2" fill="#0F172A" />
            {/* Beard muzzle */}
            <ellipse cx="40" cy="49" rx="8" ry="7" fill="#D97706" />
            {/* Neutral blank mouth */}
            <line x1="36" y1="51" x2="44" y2="51" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
            {/* Foreground Leaves Covering him */}
            <circle cx="28" cy="62" r="14" fill="#22C55E" />
            <circle cx="52" cy="62" r="14" fill="#16A34A" />
            <circle cx="40" cy="68" r="12" fill="#15803D" />
          </svg>
        )}

        {type === 'cat' && (
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Hacker Cat Head */}
            <circle cx="40" cy="38" r="24" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
            <polygon points="22,24 28,12 36,22" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="58,24 52,12 44,22" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            {/* Cyber Matrix Sunglasses */}
            <rect x="26" y="32" width="12" height="8" rx="2" fill="#0284C7" />
            <rect x="42" y="32" width="12" height="8" rx="2" fill="#0284C7" />
            <line x1="38" y1="35" x2="42" y2="35" stroke="#38BDF8" strokeWidth="2" />
            <line x1="28" y1="34" x2="36" y2="38" stroke="#38BDF8" strokeWidth="1" />
            <line x1="44" y1="34" x2="52" y2="38" stroke="#38BDF8" strokeWidth="1" />
            {/* Whiskers */}
            <line x1="16" y1="42" x2="26" y2="44" stroke="#94A3B8" strokeWidth="1" />
            <line x1="64" y1="42" x2="54" y2="44" stroke="#94A3B8" strokeWidth="1" />
            {/* Glowing Matrix Keyboard */}
            <rect x="18" y="60" width="44" height="12" rx="2" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
            <line x1="22" y1="64" x2="58" y2="64" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="24" y1="68" x2="56" y2="68" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        )}
      </div>

      {/* Info text & Tag */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border ${item.tagColor}`}>
            {item.tag}
          </span>
          <span className="text-xs font-bold text-foreground truncate">{item.title}</span>
        </div>
        <p className="text-[11px] sm:text-xs text-muted leading-tight line-clamp-2">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
