'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '@/lib/sound/sound-manager';
import { toxicTutor, type CoachMode } from '@/lib/sound/toxic-tutor';
import { useLanguage } from '@/lib/i18n/context';

interface TalkingMascotProps {
  initialMode?: CoachMode;
  onModeChange?: (mode: CoachMode) => void;
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
  interactive?: boolean;
  speechText?: string;
  className?: string;
}

export function TalkingMascot({
  initialMode,
  onModeChange,
  size = 'md',
  showControls = true,
  interactive = true,
  speechText,
  className = '',
}: TalkingMascotProps) {
  const { locale } = useLanguage();
  const [mode, setMode] = useState<CoachMode>(initialMode || 'friendly');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState(speechText || '');
  const [mouthPhase, setMouthPhase] = useState<'open' | 'half' | 'closed'>('closed');

  // Sync mode with toxicTutor on mount if not explicitly set
  useEffect(() => {
    if (!initialMode) {
      setMode(toxicTutor.getMode());
    }
  }, [initialMode]);

  // Subscribe to real audio playback events from SoundManager for real lip-sync!
  useEffect(() => {
    const unsubscribe = soundManager.onSpeechChange((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsubscribe;
  }, []);

  // Update speech text if passed from props
  useEffect(() => {
    if (speechText) {
      setCurrentText(speechText);
    }
  }, [speechText]);

  // Animated mouth flap timer when isSpeaking is true
  useEffect(() => {
    if (!isSpeaking) {
      setMouthPhase('closed');
      return;
    }

    const phases: Array<'open' | 'half' | 'closed'> = ['open', 'half', 'open', 'closed'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setMouthPhase(phases[idx]);
    }, 140);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  function handleToggleMode() {
    const nextMode: CoachMode = mode === 'friendly' ? 'roast' : 'friendly';
    toxicTutor.setMode(nextMode);
    setMode(nextMode);
    onModeChange?.(nextMode);

    if (nextMode === 'roast') {
      const res = toxicTutor.playRoastEvent('intro', locale);
      setCurrentText(res.text || (locale === 'ky' ? 'Базар жоқ! Қатаң режим қосылды!' : 'Режим прожарки активирован!'));
    } else {
      soundManager.stopAudioFile();
      soundManager.playCorrect();
      setCurrentText(locale === 'ky' ? 'Киви сени колдойт! Баары жакшы болот! 🌟' : 'Киви с тобой! У тебя всё получится! 🌟');
    }
  }

  function handleMascotClick() {
    if (!interactive) return;

    if (mode === 'roast') {
      const res = toxicTutor.playRoastEvent('procrastinate', locale);
      setCurrentText(res.text || (locale === 'ky' ? 'Эй, басыңды істет!' : 'Не спи на уроке!'));
    } else {
      soundManager.playTap();
      const friendlyPhrases = {
        ru: [
          'Ты отлично справляешься! Шаг за шагом к офферу! 🚀',
          'Внимательно читай теорию — там все ответы! 💡',
          'Не бойся ошибок, на них растут сеньоры! 🌟',
        ],
        ky: [
          'Азаматсың! Кадам сайын алдыга жыл! 🚀',
          'Теорияны жакшылап оку, баары жөнөкөй! 💡',
          'Каталардан коркпо, ошентип үйрөнөсүң! 🌟',
        ],
        en: [
          "You're doing great! Keep the momentum high! 🚀",
          'Read the theory carefully — the answer is there! 💡',
          'Mistakes make you stronger! 🌟',
        ],
      }[locale] || [
        "You're doing great! Keep learning! 🚀",
      ];
      const randomMsg = friendlyPhrases[Math.floor(Math.random() * friendlyPhrases.length)];
      setCurrentText(randomMsg);
      // Give a soft 1.5s speech mouth flutter
      soundManager.setSpeaking(true);
      setTimeout(() => soundManager.setSpeaking(false), 1600);
    }
  }

  const isRoast = mode === 'roast';

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  }[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Speech Bubble (when text is active) */}
      {currentText && (
        <div
          className={`mb-2 max-w-xs sm:max-w-sm px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 text-center animate-fadeIn ${
            isRoast
              ? 'bg-danger-light text-danger border border-danger/40 ring-1 ring-danger/20'
              : 'bg-accent-light text-accent border border-accent/40 ring-1 ring-accent/20'
          }`}
        >
          <span>{currentText}</span>
        </div>
      )}

      {/* Mascot Graphic with Animated Speaking Mouth */}
      <div
        onClick={handleMascotClick}
        title={interactive ? (isRoast ? 'Нажми на Влада, чтобы услышать напутствие' : 'Нажми на Киви') : undefined}
        className={`relative ${sizeClasses} cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 select-none`}
      >
        {/* Glow halo when talking */}
        {isSpeaking && (
          <div
            className={`absolute -inset-2 rounded-full blur-md opacity-70 animate-pulse ${
              isRoast ? 'bg-danger/40' : 'bg-accent/40'
            }`}
          />
        )}

        {/* ─── 1. ANGRY VLAD (Roast Mode Face) ─── */}
        {isRoast ? (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-md"
          >
            {/* Hood Outer */}
            <path
              d="M18 85C16 65 20 28 50 20C80 28 84 65 82 85C74 88 26 88 18 85Z"
              fill="#1E1B4B"
              stroke="#4338CA"
              strokeWidth="2.5"
            />
            {/* Hood Inner Shadow */}
            <path
              d="M26 84C24 64 28 34 50 26C72 34 76 64 74 84C66 86 34 86 26 84Z"
              fill="#0F172A"
            />
            {/* Dark Cyberpunk Face */}
            <ellipse cx="50" cy="56" rx="20" ry="22" fill="#E2E8F0" />
            
            {/* Piercing Angry Eyebrows */}
            <path
              d="M34 46L46 51"
              stroke="#991B1B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M66 46L54 51"
              stroke="#991B1B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Glowing Intense Eyes */}
            <circle cx="41" cy="53" r="3.5" fill="#EF4444" />
            <circle cx="59" cy="53" r="3.5" fill="#EF4444" />
            <circle cx="41" cy="53" r="1.5" fill="#FEF08A" />
            <circle cx="59" cy="53" r="1.5" fill="#FEF08A" />

            {/* Angular Sharp Nose */}
            <path d="M50 51L47 61H52" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

            {/* ── Dynamic Lip-Syncing Mouth for Angry Vlad ── */}
            {mouthPhase === 'open' ? (
              // Open mouth shouting with sharp teeth and fiery tongue
              <g>
                <path
                  d="M40 64Q50 78 60 64Q50 63 40 64Z"
                  fill="#7F1D1D"
                  stroke="#991B1B"
                  strokeWidth="2"
                />
                {/* Upper sharp teeth */}
                <polygon points="43,64 45,67 47,64" fill="#FFFFFF" />
                <polygon points="49,64 51,67 53,64" fill="#FFFFFF" />
                <polygon points="55,64 57,67 59,64" fill="#FFFFFF" />
                {/* Fiery red tongue */}
                <ellipse cx="50" cy="71" rx="4" ry="3" fill="#DC2626" />
              </g>
            ) : mouthPhase === 'half' ? (
              // Half open speaking mouth
              <ellipse
                cx="50"
                cy="66"
                rx="7"
                ry="4"
                fill="#7F1D1D"
                stroke="#991B1B"
                strokeWidth="1.8"
              />
            ) : (
              // Closed sarcastic angry smirk
              <path
                d="M40 67C44 65 54 64 60 68"
                stroke="#991B1B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {/* Steam puffs from ears */}
            <path d="M22 42Q18 36 24 32" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M78 42Q82 36 76 32" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        ) : (
          /* ─── 2. FRIENDLY KIWI (Supportive Mentor Face) ─── */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 drop-shadow-md"
          >
            {/* Friendly Round Golden Aura / Head */}
            <circle cx="50" cy="50" r="42" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
            
            {/* Rosy Cheeks */}
            <circle cx="28" cy="58" r="6" fill="#FCA5A5" opacity="0.8" />
            <circle cx="72" cy="58" r="6" fill="#FCA5A5" opacity="0.8" />

            {/* Friendly Arched Joyful Eyebrows */}
            <path
              d="M32 38C36 34 42 34 46 38"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M54 38C58 34 64 34 68 38"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Big Expressive Smiling Eyes with Sparkle */}
            <circle cx="39" cy="48" r="6" fill="#1E293B" />
            <circle cx="61" cy="48" r="6" fill="#1E293B" />
            <circle cx="41" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="63" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="37" cy="50" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="50" r="1" fill="#FFFFFF" />

            {/* Cute button nose */}
            <ellipse cx="50" cy="54" rx="2" ry="1.5" fill="#D97706" />

            {/* ── Dynamic Lip-Syncing Mouth for Friendly Kiwi ── */}
            {mouthPhase === 'open' ? (
              // Wide joyful open mouth with pink tongue
              <g>
                <path
                  d="M38 60C38 72 62 72 62 60Z"
                  fill="#BE185D"
                  stroke="#9D174D"
                  strokeWidth="1.8"
                />
                {/* White upper teeth strip */}
                <path d="M41 60H59V63C59 63 50 64 41 63Z" fill="#FFFFFF" />
                {/* Cheerful Pink tongue */}
                <ellipse cx="50" cy="68" rx="6" ry="3.5" fill="#F472B6" />
              </g>
            ) : mouthPhase === 'half' ? (
              // Half talking cute oval
              <ellipse
                cx="50"
                cy="63"
                rx="7"
                ry="5"
                fill="#BE185D"
                stroke="#9D174D"
                strokeWidth="1.8"
              />
            ) : (
              // Warm friendly curved smile
              <path
                d="M38 59C42 67 58 67 62 59"
                stroke="#92400E"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Top antenna/sprout sprout of wisdom */}
            <path d="M50 14Q44 6 38 10" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 14Q56 6 62 10" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="14" r="3" fill="#10B981" />
          </svg>
        )}
      </div>

      {/* Mode Switcher Toggle Button (Гневная vs Добрая физиономия) */}
      {showControls && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleToggleMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
              isRoast
                ? 'bg-danger text-white border-danger hover:bg-danger/90'
                : 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isRoast ? (
              <>
                <Flame className="w-3.5 h-3.5 text-amber-200" />
                <span>{locale === 'ru' ? '😈 Влад (Прожарка)' : locale === 'ky' ? '😈 Влад (Катуу)' : '😈 Vlad (Roast)'}</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5 text-white" />
                <span>{locale === 'ru' ? '😇 Киви (Добрый)' : locale === 'ky' ? '😇 Киви (Жумшак)' : '😇 Kivi (Support)'}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
