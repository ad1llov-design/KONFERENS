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
  private currentAudioElement: HTMLAudioElement | null = null;
  private speechListeners: Set<(isSpeaking: boolean) => void> = new Set();
  private _isSpeaking: boolean = false;

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
   * UI Tap / Interactive mascot poke: Soft pleasant bubble click (520Hz -> 440Hz)
   * Duration: ~0.08s
   */
  public playTap(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.07);

    gain.gain.setValueAtTime(gainVal * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Meme Fail: Comedic dramatic descending chord (C#4 -> A3 -> F3)
   * With low-pass resonance to simulate classic fail meme sound. Duration: ~0.45s
   */
  public playMemeFail(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.35, now);
    masterGain.connect(ctx.destination);

    const notes = [
      { freq: 277.18, time: 0.00, dur: 0.16 }, // C#4
      { freq: 220.00, time: 0.14, dur: 0.18 }, // A3
      { freq: 174.61, time: 0.28, dur: 0.28 }, // F3
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Warm triangle wave: zero harsh buzzing or tremolo flutter
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + time + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.7, now + time + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Bruh Sound Effect: Deep comedic resonant downward pitch slide (~115Hz down to ~75Hz)
   * Smooth dual oscillator (triangle + sine) with gentle vocal formant filter. Duration: ~0.38s
   */
  public playBruh(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.4, now);
    masterGain.connect(ctx.destination);

    // Filter simulating a chest vocal formant
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, now);
    filter.Q.setValueAtTime(1.8, now);
    filter.connect(masterGain);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Triangle + sine prevents harsh sawtooth phase beating / tremolo
    osc1.type = 'triangle';
    osc2.type = 'sine';

    // Pitch slide down (115Hz -> 75Hz)
    osc1.frequency.setValueAtTime(115, now);
    osc1.frequency.exponentialRampToValueAtTime(75, now + 0.35);

    osc2.frequency.setValueAtTime(115, now);
    osc2.frequency.exponentialRampToValueAtTime(75, now + 0.35);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.85, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.38);
    osc2.stop(now + 0.38);
  }

  /**
   * Sad Trombone: Classic 4-note comedic descent with smooth pitch slide
   * D4 -> C#4 -> C4 -> B3 (smooth warm brass). Duration: ~0.72s
   * Uses triangle waves and gentle low-pass to eliminate sawtooth harshness/tremolo.
   */
  public playSadTrombone(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.35, now);
    masterGain.connect(ctx.destination);

    const notes = [
      { freq: 293.66, time: 0.00, dur: 0.16, bend: 1.0 },   // D4
      { freq: 277.18, time: 0.16, dur: 0.16, bend: 1.0 },   // C#4
      { freq: 261.63, time: 0.32, dur: 0.16, bend: 1.0 },   // C4
      { freq: 246.94, time: 0.48, dur: 0.32, bend: 0.90 },  // B3 gentle slide down
    ];

    notes.forEach(({ freq, time, dur, bend }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Triangle wave delivers smooth brass warmth without sawtooth buzz/tremolo
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);
      if (bend !== 1.0) {
        osc.frequency.exponentialRampToValueAtTime(freq * bend, now + time + dur);
      }

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.8, now + time + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Meme Win / Giga Victory: Upbeat 8-bit pentatonic arpeggio
   * G4 -> C5 -> E5 -> G5 -> C6 rapid arpeggio with square sparkle. Duration: ~0.4s
   */
  public playMemeWin(): void {
    const ctx = this.initContext();
    if (!ctx) return;
    const gainVal = this.getEffectiveGain();
    if (gainVal <= 0) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(gainVal * 0.25, now);
    masterGain.connect(ctx.destination);

    const notes = [
      { freq: 392.00, time: 0.00, dur: 0.08 }, // G4
      { freq: 523.25, time: 0.07, dur: 0.08 }, // C5
      { freq: 659.25, time: 0.14, dur: 0.09 }, // E5
      { freq: 783.99, time: 0.21, dur: 0.12 }, // G5
      { freq: 1046.50, time: 0.28, dur: 0.25 }, // C6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.exponentialRampToValueAtTime(1.0, now + time + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  /**
   * Plays a pre-recorded / pre-generated audio file (MP3, WAV, OGG)
   * Handles audio ducking, browser autoplay constraints, volume control, and speech events.
   */
  public playAudioFile(url: string, onEnd?: () => void): HTMLAudioElement | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    try {
      this.stopAudioFile();
      const audio = new Audio(url);
      audio.volume = this.volume;
      this.currentAudioElement = audio;
      this.setDucked(true);
      this.setSpeaking(true);

      const cleanup = () => {
        this.setDucked(false);
        this.setSpeaking(false);
        if (this.currentAudioElement === audio) {
          this.currentAudioElement = null;
        }
        onEnd?.();
      };

      audio.onended = cleanup;
      audio.onerror = cleanup;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          this.setDucked(false);
          this.setSpeaking(false);
          this.currentAudioElement = null;
        });
      }
      return audio;
    } catch {
      this.setDucked(false);
      this.setSpeaking(false);
      return null;
    }
  }

  /**
   * Stops currently playing real audio file
   */
  public stopAudioFile(): void {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {}
      this.currentAudioElement = null;
      this.setDucked(false);
    }
    this.setSpeaking(false);
  }

  /**
   * Check if real voice/audio is currently playing
   */
  public isVoiceActive(): boolean {
    return this._isSpeaking;
  }

  /**
   * Subscribe to speech state changes (e.g. for mouth animation / lip-sync)
   */
  public onSpeechChange(listener: (isSpeaking: boolean) => void): () => void {
    this.speechListeners.add(listener);
    listener(this._isSpeaking);
    return () => {
      this.speechListeners.delete(listener);
    };
  }

  /**
   * Manually trigger or override speech state
   */
  public setSpeaking(speaking: boolean): void {
    if (this._isSpeaking === speaking) return;
    this._isSpeaking = speaking;
    this.speechListeners.forEach((fn) => {
      try {
        fn(speaking);
      } catch {}
    });
  }

  /**
   * Convenience: play a viral meme sound from public/audio/memes/
   */
  public playMemeFile(filename: string, onEnd?: () => void): HTMLAudioElement | null {
    const path = `/audio/memes/${filename.replace(/^\/+/, '')}`;
    return this.playAudioFile(path, onEnd);
  }

  /**
   * Convenience: play Senior Vlad's voice line from public/audio/vlad/
   */
  public playVladFile(filename: string, onEnd?: () => void): HTMLAudioElement | null {
    const path = `/audio/vlad/${filename.replace(/^\/+/, '')}`;
    return this.playAudioFile(path, onEnd);
  }

  /**
   * Test current sound settings with a soft chime
   */
  public testSound(): void {
    this.playCorrect();
  }
}

export const soundManager = SoundManager.getInstance();
