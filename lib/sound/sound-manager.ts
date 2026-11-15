/**
 * Kivora Sound Effects Manager
 * 
 * High-performance, zero-dependency audio synthesizer using the Web Audio API.
 * Synthesizes short, pleasant, non-intrusive micro-reactions for game mechanics:
 * - correct: gentle ascending major chord (C5 -> E5 -> G5)
 * - incorrect: friendly comical marimba descent (E4 -> C#4)
 * - complete: celebratory milestone fanfare (C5 -> G5 -> C6)
 * - checkpoint: sparkling resonant pop (A5 -> D6)
 * 
 * 100% royalty-free, copyright-safe, works offline with zero external network requests.
 */

const STORAGE_KEY_ENABLED = 'kivora-sound-enabled';
const STORAGE_KEY_VOLUME = 'kivora-sound-volume';

export class SoundManager {
  private static instance: SoundManager | null = null;
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.7; // 0.0 to 1.0
  private ducked: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
        if (storedEnabled !== null) {
          this.enabled = storedEnabled === 'true';
        }
        const storedVolume = localStorage.getItem(STORAGE_KEY_VOLUME);
        if (storedVolume !== null) {
          const parsed = parseFloat(storedVolume);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            this.volume = parsed;
          }
        }
      } catch {
        // localStorage not available
      }
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ENABLED, String(enabled));
      } catch {}
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    this.volume = clamped;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
      } catch {}
    }
  }

  public setDucked(ducked: boolean): void {
    this.ducked = ducked;
  }

  private getEffectiveGain(): number {
    if (!this.enabled) return 0;
    const base = this.volume;
    return this.ducked ? base * 0.2 : base;
  }

  /**
   * Correct Answer: Pleasant three-tone ascending chime (C5 -> E5 -> G5)
   * Warm sine tone with gentle harmonic envelope. Duration: ~0.35s
   */
  public playCorrect(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.28, now);
    masterGain.connect(ctx.destination);

    // Three rapid ascending notes: C5 (523Hz), E5 (659Hz), G5 (784Hz)
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.18 },
      { freq: 659.25, time: 0.07, dur: 0.20 },
      { freq: 783.99, time: 0.14, dur: 0.28 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.exponentialRampToValueAtTime(1.0, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Incorrect Answer: Gentle, friendly, comical marimba bounce (E4 -> C#4)
   * Soft, non-punishing, encouraging tone with slight warm vibrato. Duration: ~0.26s
   */
  public playIncorrect(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.25, now);
    masterGain.connect(ctx.destination);

    // Two descending soft notes: E4 (329.6Hz) -> C#4 (277.2Hz)
    const notes = [
      { freq: 329.63, time: 0.00, dur: 0.14 },
      { freq: 277.18, time: 0.10, dur: 0.18 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'triangle'; // warm wooden marimba feel
      osc.frequency.setValueAtTime(freq, now + time);
      // subtle friendly pitch dip
      osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + time + dur);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.exponentialRampToValueAtTime(0.9, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Lesson Completion: Celebratory milestone fanfare (C5 -> G5 -> C6)
   * Rich harmonic bell/fanfare overtone. Duration: ~0.55s
   */
  public playComplete(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.32, now);
    masterGain.connect(ctx.destination);

    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.20 }, // C5
      { freq: 659.25, time: 0.09, dur: 0.22 }, // E5
      { freq: 783.99, time: 0.18, dur: 0.25 }, // G5
      { freq: 1046.50, time: 0.27, dur: 0.40 }, // C6 (High sparkle)
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.exponentialRampToValueAtTime(1.0, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Checkpoint / Node Unlock: Sparkling resonant chime (A5 -> D6)
   * Light, crisp bell chime. Duration: ~0.32s
   */
  public playCheckpoint(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.25, now);
    masterGain.connect(ctx.destination);

    const notes = [
      { freq: 880.00, time: 0.00, dur: 0.20 }, // A5
      { freq: 1174.66, time: 0.08, dur: 0.30 }, // D6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.exponentialRampToValueAtTime(0.9, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Test current sound settings with a soft chime
   */
  public testSound(): void {
    this.playCorrect();
  }
}

export const soundManager = SoundManager.getInstance();
