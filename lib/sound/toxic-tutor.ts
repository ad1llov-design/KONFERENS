'use client';

import type { Locale } from '@/lib/types';
import { soundManager } from './sound-manager';

export type CoachMode = 'friendly' | 'roast';

const STORAGE_KEY = 'kivora_coach_mode';

const ROAST_QUOTES: Record<
  Locale,
  {
    incorrect: string[];
    consecutive_fail: string[];
    correct: string[];
    procrastinate: string[];
  }
> = {
  ru: {
    incorrect: [
      'Твою дивизию! Какого чёрта ты нажал?! Код пяткой писал, что ли?!',
      'Мать моя женщина... Ты что, компилятор решил сломать?! Перечитай теорию, ёлы-палы!',
      'Блин, ты серьёзно?! Ну это же полнейшая дичь! Даже стажёр в первый день так не накосячит!',
      'Чё за бред в логике?! Руки из плеч достань и перепиши нормально!',
      'Ё-моё, глаза от такого кода слезятся! Соберись, оффер сам себя не получит!',
      'Ctrl+Z срочно! Ты только что задеплоил баг прямо в моё сердце!',
    ],
    consecutive_fail: [
      'Да твою ж налево! Ты специально мои нервы проверяешь или просто прикалываешься?!',
      'Срань господня, опять мимо! Хватит тыкать наугад, открой глаза и читай условия!',
      'Капец... Если бы за каждую такую ошибку штрафовали, ты бы уже банкротом стал! Врубай голову!',
      'Даже CSS без браузера плачет от твоих попыток! Прекрати гадать, прочитай теорию!',
    ],
    correct: [
      'О, чудо! Неужели мозг включился?! Ладно, зачёт, но не зазнавайся — это был детский сад!',
      'Ну наконец-то, ёлы-палы! Аж кофе остыл, пока ты соображал. Ладно, двигай дальше!',
      'Ого, без косяков с первого раза! Смотри-ка, база. Не расслабляйся, дальше будет жёстче!',
      'Повезло или реально допёрло? Ладно, засчитано. Не позорь команду, держи темп!',
    ],
    procrastinate: [
      'Эй, соня! Ты уже три минуты тупишь в одну строчку. Код сам себя не напишет!',
      'Какого чёрта мы сидим? Просыпайся, шевели извилинами, дедлайн горит!',
    ],
  },
  ky: {
    incorrect: [
      'Апей, сен эмне кылып жатасың?! Мындай кодду көргөндө чач тик турат го, эй!',
      'Эй, ботом, баш менен ойлонсоң боло! Мындай темп менен кайсы продго барасың?!',
      'Айланайын, көзүңдү ачып окучу! Тоодой катаны кантип көрбөй калдың?!',
      'Ой тообо, бул эмне деген дичь?! Жакшылап ойлонуп туруп бассаң боло!',
      'Мындай жооп менен офферди 2099-жылы араң аласың! Чогулт өзүңдү тезирээк!',
    ],
    consecutive_fail: [
      'Дагыбы?! Сен менин нервимди сынап жатасыңбы же жөн эле кокустан басып жатасыңбы?!',
      'Токтот кокустан басканды! Эгер ар бир катага айып пул салынса, бат эле банкрот болмоксуң!',
      'Башыңды иштет, эй! Теорияны ач дагы, башынан жакшылап окуп чык!',
    ],
    correct: [
      'Охо, акыры мээң иштеп баштады окшойт! Болуптур, өттүң, бирок көөп кетпе!',
      'Ооба акыры! Кофе муздап калды го сен ойлонгуча. Жарайсың, кийинкисине өт!',
      'Таза өттү! Мыкты, бирок алдыдагы суроо мындан эки эсе кыйын болот, даярдан!',
    ],
    procrastinate: [
      'Эки мүнөттөн бери экранды карап отурасың го! Код өзү жазылбайт, кыймылда тезирээк!',
      'Эй, уктаба! Дедлайн күтпөйт, башыңды иштет!',
    ],
  },
  en: {
    incorrect: [
      "Holy crap! What on earth was that?! Did you write that code with your elbows?!",
      "Damn it! That is pure garbage logic! Even a junior on day one knows better!",
      "What the hell?! Undo that catastrophe before I revoke your Git permissions!",
      "Are you serious right now?! Ctrl+Z that thought immediately and read the theory!",
      "My eyes are burning from this syntax! Wake up, production is on fire!",
    ],
    consecutive_fail: [
      "For Pete's sake! Are you testing my sanity or just playing Russian roulette with the keyboard?!",
      "Again?! If wrong answers were billable, you'd be declared bankrupt by lunch! Read the prompt!",
      "Stop guessing blindly! Even a broken randomizer gets 50%! Focus!",
    ],
    correct: [
      "Miracle of the century: you actually didn't screw this one up! Next one is twice as hard, don't get cocky!",
      "Finally! My coffee went cold waiting for that brainwave. Acceptable, move on!",
      "Zero warnings on the first try. Not bad at all. Keep that momentum going!",
    ],
    procrastinate: [
      "Hey sleepyhead! You've been staring at a single line for three minutes. The code won't compile itself!",
      "What the hell are we waiting for? The sprint deadline is ticking! Make a move!",
    ],
  },
};

class ToxicTutorEngine {
  private mode: CoachMode = 'friendly';
  private consecutiveMistakes = 0;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as CoachMode | null;
      if (saved === 'friendly' || saved === 'roast') {
        this.mode = saved;
      }
      this.initVoices();
    }
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      this.cachedVoices = window.speechSynthesis.getVoices();
    };
    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  public getMode(): CoachMode {
    return this.mode;
  }

  public setMode(mode: CoachMode): void {
    this.mode = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }

  public toggleMode(): CoachMode {
    const next = this.mode === 'friendly' ? 'roast' : 'friendly';
    this.setMode(next);
    return next;
  }

  public recordSuccess(): void {
    this.consecutiveMistakes = 0;
  }

  public recordMistake(): number {
    this.consecutiveMistakes += 1;
    return this.consecutiveMistakes;
  }

  public getConsecutiveMistakes(): number {
    return this.consecutiveMistakes;
  }

  public getRoast(type: 'incorrect' | 'correct' | 'procrastinate', locale: Locale): string {
    const bank = ROAST_QUOTES[locale] || ROAST_QUOTES.en;
    let pool: string[];

    if (type === 'incorrect') {
      pool = this.consecutiveMistakes >= 2 ? bank.consecutive_fail : bank.incorrect;
    } else if (type === 'correct') {
      pool = bank.correct;
    } else {
      pool = bank.procrastinate;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  /**
   * Selects natural, deep, realistic male voice prioritizing neural/natural voices
   */
  private selectMaleVoice(locale: Locale): SpeechSynthesisVoice | null {
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const langPrefix = locale === 'ky' ? 'ky' : locale === 'ru' ? 'ru' : 'en';

    // Prioritized masculine name tokens and natural engines
    const maleNamesRu = ['pavel', 'dmitry', 'aleksandr', 'alexander', 'mikhail', 'sergey', 'georgy', 'yuriy', 'google русский'];
    const maleNamesEn = ['guy', 'david', 'ryan', 'george', 'oliver', 'andrew', 'brian', 'mark', 'google us english', 'google uk english'];
    const qualityTags = ['natural', 'neural', 'online', 'premium'];
    const femalePenalties = ['irina', 'elena', 'zira', 'susan', 'victoria', 'female', 'kristina', 'anna'];

    const langVoices = voices.filter(v =>
      v.lang.toLowerCase().startsWith(langPrefix) ||
      (locale === 'ky' && v.lang.toLowerCase().startsWith('ru')) // fallback for Kyrgyz if no native voice installed
    );

    if (langVoices.length === 0) {
      // Fallback to any matching voice
      return voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) || voices[0] || null;
    }

    // Score candidate voices
    const scored = langVoices.map(v => {
      const name = v.name.toLowerCase();
      let score = 10;

      // Check quality
      if (qualityTags.some(q => name.includes(q))) score += 40;

      // Check masculine names
      const maleList = langPrefix === 'ru' || locale === 'ky' ? maleNamesRu : maleNamesEn;
      if (maleList.some(m => name.includes(m))) score += 50;

      // Penalize female voices when looking for male coach
      if (femalePenalties.some(f => name.includes(f))) score -= 60;

      // Bonus for Microsoft Natural / Google voices
      if (name.includes('google') || name.includes('microsoft')) score += 15;

      return { voice: v, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.voice || langVoices[0];
  }

  public speakRoast(text: string, locale: Locale): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.mode !== 'roast') return;

    try {
      window.speechSynthesis.cancel();

      // Humanized text delivery: add natural punctuation breathing pauses
      const formattedText = text.replace(/([?!])\s+/g, '$1 ... ');
      const utterance = new SpeechSynthesisUtterance(formattedText);

      const voice = this.selectMaleVoice(locale);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      // Male baritone resonance: slightly lower pitch, natural speaking speed
      utterance.pitch = 0.88; // Deep masculine tone (prevents high robotic squeak)
      utterance.rate = 1.02;  // Realistic conversational cadence
      utterance.volume = 1.0;

      utterance.onstart = () => {
        soundManager.setDucked(true);
      };
      utterance.onend = () => {
        soundManager.setDucked(false);
      };
      utterance.onerror = () => {
        soundManager.setDucked(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback if speech is blocked
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      soundManager.setDucked(false);
    }
  }
}

export const toxicTutor = new ToxicTutorEngine();
