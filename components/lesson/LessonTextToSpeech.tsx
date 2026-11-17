'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Play, Pause, Square, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { soundManager } from '@/lib/sound/sound-manager';

interface LessonTextToSpeechProps {
  content: string;
  lessonTitle: string;
  lessonId?: string;
  className?: string;
}

/**
 * Strips code blocks, technical tokens, and markdown markup to produce
 * a clean, natural reading text for text-to-speech engines.
 */
function sanitizeTextForSpeech(raw: string, title: string): string {
  let text = raw;

  // 1. Remove fenced code blocks ```...``` completely
  text = text.replace(/```[\s\S]*?```/g, '');

  // 2. Remove inline code snippets `...`
  text = text.replace(/`([^`]+)`/g, '$1');

  // 3. Remove markdown headers (#, ##, ###)
  text = text.replace(/^#+\s+/gm, '');

  // 4. Remove bold/italic asterisks and underscores
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  // 5. Remove markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 6. Remove HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // 7. Remove list markers (- , * , 1. )
  text = text.replace(/^[\s*-]+(?=\S)/gm, '');
  text = text.replace(/^\d+\.\s+/gm, '');

  // 8. Collapse extra whitespace and empty lines
  text = text.replace(/\n{2,}/g, '. ').replace(/\s+/g, ' ').trim();

  return `${title}. ${text}`;
}

export function LessonTextToSpeech({ content, lessonTitle, lessonId, className = '' }: LessonTextToSpeechProps) {
  const { locale } = useLanguage();
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [rate, setRate] = useState<number>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check Web Speech API support and load available voices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSupported(true);
      if ('speechSynthesis' in window) {
        const updateVoices = () => {
          const available = window.speechSynthesis.getVoices();
          setVoices(available);
        };

        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;

        return () => {
          window.speechSynthesis.onvoiceschanged = null;
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            soundManager.setDucked(false);
          }
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
            soundManager.setDucked(false);
          }
        };
      }
    }
  }, []);

  // Match voice to current locale
  const getBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!voices.length) return null;

    const langPrefix = locale === 'ky' ? 'ky' : locale === 'ru' ? 'ru' : 'en';
    const matching = voices.filter(
      (v) => v.lang.toLowerCase().startsWith(langPrefix) || (v as unknown as { locale?: string }).locale?.toLowerCase().startsWith(langPrefix)
    );

    if (matching.length > 0) {
      return matching.find((v) => v.default) || matching[0];
    }
    return null;
  }, [voices, locale]);

  // Clean up speech on unmount or lesson change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        soundManager.setDucked(false);
        setPlaybackState('idle');
      }
    };
  }, [lessonTitle, content, lessonId]);

  const fallbackSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setVoiceNotice(null);

    const voice = getBestVoice();
    if (!voice) {
      const msg =
        locale === 'ky'
          ? 'Бул тил үчүн үн менен ойнотуу түзмөгүңүздө азырынча жеткиликтүү эмес.'
          : locale === 'ru'
          ? 'Озвучивание для этого языка пока недоступно на вашем устройстве.'
          : 'Speech synthesis voice for this language is currently unavailable on your device.';
      setVoiceNotice(msg);
      return;
    }

    const speechText = sanitizeTextForSpeech(content, lessonTitle);
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.lang = voice.lang;

    utterance.onstart = () => {
      setPlaybackState('playing');
      soundManager.setDucked(true);
    };

    utterance.onpause = () => {
      setPlaybackState('paused');
    };

    utterance.onresume = () => {
      setPlaybackState('playing');
    };

    utterance.onend = () => {
      setPlaybackState('idle');
      soundManager.setDucked(false);
    };

    utterance.onerror = () => {
      setPlaybackState('idle');
      soundManager.setDucked(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStart = () => {
    setVoiceNotice(null);

    // Stop any existing playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Check if neural pre-recorded audio file exists for this lesson
    if (lessonId && locale === 'ru') {
      const audioUrl = `/audio/lessons/${lessonId}.wav`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = rate;

      audio.onplay = () => {
        setPlaybackState('playing');
        soundManager.setDucked(true);
      };

      audio.onpause = () => {
        setPlaybackState('paused');
      };

      audio.onended = () => {
        setPlaybackState('idle');
        soundManager.setDucked(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        // If file doesn't exist, fallback to speech synthesis
        audioRef.current = null;
        fallbackSpeechSynthesis();
      };

      audioRef.current = audio;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          fallbackSpeechSynthesis();
        });
      }
      return;
    }

    fallbackSpeechSynthesis();
  };

  const handlePause = () => {
    if (audioRef.current) {
      if (playbackState === 'playing') {
        audioRef.current.pause();
        setPlaybackState('paused');
      } else if (playbackState === 'paused') {
        audioRef.current.play().catch(() => {});
        setPlaybackState('playing');
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (playbackState === 'playing') {
        window.speechSynthesis.pause();
        setPlaybackState('paused');
      } else if (playbackState === 'paused') {
        window.speechSynthesis.resume();
        setPlaybackState('playing');
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlaybackState('idle');
    soundManager.setDucked(false);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (playbackState === 'playing') {
      // Restart with new rate
      handleStop();
      setTimeout(handleStart, 50);
    }
  };

  if (!supported) return null;

  const ttsLabels = {
    listen: locale === 'ru' ? 'Прослушать объяснение' : locale === 'ky' ? 'Түшүндүрмөнү угуу' : 'Listen to explanation',
    playing: locale === 'ru' ? 'Идёт чтение...' : locale === 'ky' ? 'Окулууда...' : 'Reading aloud...',
    paused: locale === 'ru' ? 'Пауза' : locale === 'ky' ? 'Тындырылды' : 'Paused',
    speed: locale === 'ru' ? 'Скорость' : locale === 'ky' ? 'Ылдамдык' : 'Speed',
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {playbackState === 'idle' ? (
        <button
          type="button"
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-foreground hover:bg-accent-light/30 hover:border-accent/40 text-xs font-medium transition-all shadow-sm"
          title={ttsLabels.listen}
        >
          <Volume2 className="h-3.5 w-3.5 text-accent" />
          <span>{ttsLabels.listen}</span>
        </button>
      ) : (
        <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-surface border border-accent/30 shadow-md">
          {/* Animated sound wave indicator */}
          <div className="flex items-center gap-1 pl-2 pr-1">
            <span
              className={`w-1 h-3 bg-accent rounded-full transition-all ${
                playbackState === 'playing' ? 'animate-pulse' : 'opacity-40'
              }`}
            />
            <span
              className={`w-1 h-4 bg-accent rounded-full transition-all ${
                playbackState === 'playing' ? 'animate-pulse delay-75' : 'opacity-40'
              }`}
            />
            <span
              className={`w-1 h-2 bg-accent rounded-full transition-all ${
                playbackState === 'playing' ? 'animate-pulse delay-150' : 'opacity-40'
              }`}
            />
          </div>

          <span className="text-xs font-semibold text-accent pr-1">
            {playbackState === 'playing' ? ttsLabels.playing : ttsLabels.paused}
          </span>

          {/* Pause / Resume */}
          <button
            type="button"
            onClick={handlePause}
            className="p-1.5 rounded-lg hover:bg-background text-foreground transition-colors"
            title={playbackState === 'playing' ? 'Пауза' : 'Продолжить'}
            aria-label="Pause or Resume speech"
          >
            {playbackState === 'playing' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          {/* Stop */}
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg hover:bg-background text-muted hover:text-foreground transition-colors"
            title="Остановить чтение"
            aria-label="Stop speech"
          >
            <Square className="h-3.5 w-3.5" />
          </button>

          {/* Speed pills */}
          <div className="flex items-center gap-1 border-l border-border pl-2 pr-1 text-[11px]">
            {[0.8, 1.0, 1.2].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRateChange(r)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  rate === r
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-muted hover:text-foreground hover:bg-background'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice unavailability alert */}
      {voiceNotice && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs mt-1 animate-in fade-in duration-150">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
          <span>{voiceNotice}</span>
        </div>
      )}
    </div>
  );
}
