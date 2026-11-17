'use client';

export type CoachMood = 'angry' | 'facepalm' | 'smirk' | 'proud';

interface ToxicCoachAvatarProps {
  mood?: CoachMood;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ToxicCoachAvatar({
  mood = 'angry',
  className = '',
  size = 'md',
}: ToxicCoachAvatarProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div className={`relative shrink-0 select-none ${sizeMap[size]} ${className}`} role="img" aria-label="Сеньор Влад — Тимлид">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="vlad-hoodie-grad" x1="20" y1="60" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="vlad-mug-grad" x1="80" y1="70" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E11D48" />
            <stop offset="1" stopColor="#9F1239" />
          </linearGradient>
          <radialGradient id="vlad-steam-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Steam / Anger Aura */}
        {mood === 'angry' && (
          <>
            <circle cx="60" cy="40" r="35" fill="url(#vlad-steam-grad)" />
            {/* Angry steam puffs */}
            <path d="M40 22Q35 12 42 6" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M78 20Q86 10 80 4" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M60 16Q58 6 64 2" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </>
        )}

        {/* Background Aura Disc */}
        <circle cx="60" cy="60" r="54" fill="#0F172A" stroke="#334155" strokeWidth="2" />

        {/* Dark Hoodie Body */}
        <path
          d="M24 114C24 94 36 82 48 78L60 92L72 78C84 82 96 94 96 114H24Z"
          fill="url(#vlad-hoodie-grad)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Hoodie Strings */}
        <line x1="53" y1="88" x2="52" y2="104" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="67" y1="88" x2="68" y2="104" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        {/* Neck */}
        <rect x="52" y="66" width="16" height="14" rx="3" fill="#D4A373" />

        {/* Head & Jawline (Bearded/Stubble) */}
        <path
          d="M38 42C38 28 48 18 60 18C72 18 82 28 82 42C82 56 74 68 60 70C46 68 38 56 38 42Z"
          fill="#D4A373"
        />

        {/* Dark Hair / Tousled Dev Cut */}
        <path
          d="M36 40C36 24 45 14 60 14C75 14 84 24 84 36C84 26 78 18 68 18C58 18 52 24 46 22C40 24 38 32 36 40Z"
          fill="#1E293B"
        />
        <path d="M42 22L50 28M58 20L64 26M68 22L76 26" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stubble / Beard Shadow */}
        <path
          d="M44 54C48 64 54 68 60 68C66 68 72 64 76 54C76 62 70 70 60 70C50 70 44 62 44 54Z"
          fill="#78350F"
          opacity="0.35"
        />

        {/* Glasses Frame (Rectangle Dark Titanium) */}
        <rect x="42" y="38" width="15" height="10" rx="2" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="63" y="38" width="15" height="10" rx="2" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="57" y1="42" x2="63" y2="42" stroke="#94A3B8" strokeWidth="2" />
        {/* Glasses Glare */}
        <line x1="44" y1="40" x2="48" y2="46" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <line x1="65" y1="40" x2="69" y2="46" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

        {/* Eyebrows */}
        {mood === 'angry' ? (
          <>
            {/* V-shaped furrowed angry brows */}
            <line x1="40" y1="34" x2="55" y2="38" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="34" x2="65" y2="38" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === 'facepalm' ? (
          <>
            <line x1="42" y1="38" x2="54" y2="35" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="78" y1="35" x2="66" y2="38" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : mood === 'proud' ? (
          <>
            <line x1="42" y1="33" x2="54" y2="35" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="78" y1="33" x2="66" y2="35" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          /* smirk */
          <>
            <line x1="42" y1="35" x2="54" y2="37" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="32" x2="66" y2="37" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {/* Nose */}
        <path d="M60 44L57 52H62" stroke="#A16207" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Mouth */}
        {mood === 'angry' ? (
          /* Yelling / grimace */
          <path d="M52 60Q60 56 68 60" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        ) : mood === 'facepalm' ? (
          /* Heavy sigh straight line */
          <line x1="53" y1="60" x2="67" y2="60" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        ) : mood === 'proud' ? (
          /* Reluctant satisfied smile */
          <path d="M52 58C56 62 64 62 68 58" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          /* Smirk / half-smile */
          <path d="M54 60C58 60 64 61 68 57" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Facepalm Hand */}
        {mood === 'facepalm' && (
          <g>
            <circle cx="48" cy="40" r="10" fill="#D4A373" stroke="#A16207" strokeWidth="1.5" />
            <rect x="42" y="28" width="5" height="14" rx="2" fill="#D4A373" stroke="#A16207" strokeWidth="1" />
            <rect x="48" y="26" width="5" height="16" rx="2" fill="#D4A373" stroke="#A16207" strokeWidth="1" />
            <rect x="54" y="28" width="5" height="14" rx="2" fill="#D4A373" stroke="#A16207" strokeWidth="1" />
          </g>
        )}

        {/* Coffee Mug with Steaming Java */}
        <g transform="translate(74, 76)">
          <rect x="0" y="0" width="22" height="24" rx="3" fill="url(#vlad-mug-grad)" stroke="#FDA4AF" strokeWidth="1.5" />
          {/* Mug handle */}
          <path d="M22 6C28 6 28 18 22 18" stroke="#FDA4AF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Mug print: "<dev/>" */}
          <text x="3" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="monospace">
            &lt;/&gt;
          </text>
          {/* Steam from mug */}
          <path d="M6 -2Q4 -8 7 -12" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M14 -2Q17 -8 13 -12" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
