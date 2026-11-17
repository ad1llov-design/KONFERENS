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
      'Серьёзно?! Ты правда нажал это? Мой кот лапой по клавиатуре ответил бы точнее!',
      'Ты что, код пяткой читал? А ну открой глаза и перечитай теорию, гений!',
      'С такими ответами мы до оффера дойдём к 2099 году! Соберись!',
      'Ты только что изобрел новый баг в простейшем вопросе. Гордись, но переделай!',
      'Ctrl+Z твою мысль! Это абсолютно мимо. Сконцентрируйся!',
    ],
    consecutive_fail: [
      'Опять?! Ты испытываешь моё терпение или законы теории вероятностей?!',
      'Даже CSS без браузера плачет от твоих попыток! Хватит тыкать наугад, начни читать!',
      'Если бы за каждый такой ответ брали налог, ты бы уже объявил банкротство! Соберись!',
    ],
    correct: [
      'Ну наконец-то! Аж кофе остыл, пока ты соображал. Ладно, зачёт, иди дальше!',
      'Ого, неужели включился мозг?! Не расслабляйся, следующий вопрос в два раза сложнее!',
      'Повезло или реально понял? Ладно, засчитано, не зазнавайся!',
    ],
    procrastinate: [
      'Ты уже две минуты смотришь в одну строчку. Код сам себя не напишет!',
      'Эй, мы тут программирование учим или медитируем на пиксели?! Жми ответ!',
    ],
  },
  ky: {
    incorrect: [
      'Эй, сен эмне көзүңдү жумуп бастыңбы? Мындай жооп менен кантип программист болосуң?! Ойлончу бир аз!',
      'Кодду бутуң менен окудуңбу? Башынан кайра жакшылап оку, гений!',
      'Мындай темп менен 2099-жылы араң жумушка киресиң! Чогулт өзүңдү!',
      'Жөнөкөй суроодон жаңы баг ойлоп таптың го! Кайра жаса!',
    ],
    consecutive_fail: [
      'Дагыбы?! Сен менин нервимди сынап жатасыңбы же жөн эле кокустан басып жатасыңбы?!',
      'Текшербей туруп баса бергенди токтот! Теорияны окуп чык!',
      'Ар бир туура эмес жоопко айып пул салынса, бат эле банкрот болмоксуң! Ойлон!',
    ],
    correct: [
      'Ооба акыры! Кофе муздап калды го сен ойлонгуча. Болуптур, өтүп кеттиң, кийинкисине өт!',
      'Мээң иштеп баштады окшойт! Бирок көп мактанба, кийинки суроо мындан кыйын!',
      'Жөн эле таптыңбы же чындап билдиңби? Мейли, упай сеники!',
    ],
    procrastinate: [
      'Эки мүнөттөн бери экранды карап отурасың го! Код өзү жазылбайт, кыймылда!',
      'Эй, биз программалоо үйрөнүп жатабызбы же экранды карап медитация кылып жатабызбы?!',
    ],
  },
  en: {
    incorrect: [
      "Are you serious?! Even my toaster writes cleaner logic than this! Wake up and read the prompt!",
      "Did you read the code with your eyes closed?! Undo that thought and try again!",
      "At this pace, we'll reach production in the year 2099! Focus!",
      "You just invented a brand new error code. Impressive, but completely wrong!",
      "Ctrl+Z that thought right now! That wasn't even close. Wake up!",
    ],
    consecutive_fail: [
      "Again?! Are you testing my patience or the laws of random probability?! Stop guessing and read!",
      "Even a broken keyboard gets 50% on coin flips! Pull yourself together!",
      "If each wrong answer cost money, you'd already be bankrupt! Lock in!",
    ],
    correct: [
      "Finally! My coffee got cold waiting for that synapse to fire. Don't get cocky, next one is harder!",
      "Miracle of the century: you actually got it right! Keep moving before you forget it!",
      "Did you guess or did you actually study? Fine, points awarded. Next step!",
    ],
    procrastinate: [
      "You've been staring at that single line for two minutes. The code won't solve itself!",
      "Are we learning to build software or meditating on LCD pixels? Make a move!",
    ],
  },
};

class ToxicTutorEngine {
  private mode: CoachMode = 'friendly';
  private consecutiveMistakes = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as CoachMode | null;
      if (saved === 'friendly' || saved === 'roast') {
        this.mode = saved;
      }
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

  public speakRoast(text: string, locale: Locale): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.mode !== 'roast') return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      const langPrefix = locale === 'ky' ? 'ky' : locale === 'ru' ? 'ru' : 'en';
      const voice = voices.find(
        (v) => v.lang.toLowerCase().startsWith(langPrefix) || (v as unknown as { locale?: string }).locale?.toLowerCase().startsWith(langPrefix)
      );

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      // Slightly faster, punchier delivery for sarcastic roast
      utterance.rate = 1.08;
      utterance.pitch = 0.95;

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
