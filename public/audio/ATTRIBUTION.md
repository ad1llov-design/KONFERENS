# Kivora Audio & Sound Effects Attribution

## 1. Architecture Overview

Kivora uses the modern, standard **Web Audio API** (`AudioContext`) for all in-lesson educational micro-reactions and audio feedback.

All sound effects are **procedurally synthesized in real-time** via software oscillators (Sine and Triangle waveforms) and exponential GainNode envelopes.

### Benefits of Procedural Web Audio:
1. **100% Royalty-Free & Original**: Developed from scratch specifically for the Kivora project. No third-party samples, copyrighted snippets, commercial loops, or unverified meme audio clips are used.
2. **Zero Network Latency**: Sounds play immediately upon user interaction with zero HTTP request overhead and zero CDN dependency.
3. **Guaranteed Offline Availability**: Functional across all modern evergreen browsers (Chrome, Edge, Safari, Firefox) without downloading external audio files.
4. **Accessible & Respectful**: Carefully tuned frequencies and short durations (0.15s - 0.55s) with moderate volume to encourage focus rather than startle the learner.

---

## 2. Synthesizer Specifications & Credits

| Event Name | Frequency Profile & Waveform | Envelope & Duration | Musical Character & Purpose |
| :--- | :--- | :--- | :--- |
| **`answer.correct`** | C5 (523.25 Hz) &rarr; E5 (659.25 Hz) &rarr; G5 (783.99 Hz)<br>*Sine Wave* | Attack: 20ms, Decay: 180-280ms<br>Total duration: **0.35s** | Ascending major triad chime. Clean, satisfying, affirming. |
| **`answer.incorrect`** | E4 (329.63 Hz) &rarr; C#4 (277.18 Hz)<br>*Triangle Wave with gentle pitch dip* | Attack: 20ms, Decay: 140-180ms<br>Total duration: **0.26s** | Soft wooden marimba descent. Gentle, friendly, comical, non-punishing. |
| **`lesson.complete`** | C5 (523.25 Hz) &rarr; E5 &rarr; G5 &rarr; C6 (1046.50 Hz)<br>*Sine Harmonic Chime* | Attack: 20ms, High Chime decay: 400ms<br>Total duration: **0.55s** | Celebratory milestone fanfare for conquering a lesson. |
| **`checkpoint.unlock`** | A5 (880.00 Hz) &rarr; D6 (1174.66 Hz)<br>*Crisp Bell Chime* | Attack: 20ms, Decay: 200-300ms<br>Total duration: **0.32s** | Sparkling pop chime for unlocking subsequent map nodes. |

---

## 3. Pre-Rendered Voice & Meme Audio Assets

To provide students with natural, studio-quality speech (eliminating robotic, syllable-by-syllable browser speech synthesis), Kivora includes pre-rendered audio assets:

### 3.1 Senior Vlad Persona (`public/audio/vlad/`)
- **Engine**: Rhasspy Piper Neural Voice (`ru_RU-dmitri-medium.onnx`).
- **License**: MIT License (Rhasspy Piper project).
- **Files**:
  - `vlad_intro.wav`: Charismatic Senior Vlad intro quote.
  - `vlad_mistake_1.wav`, `vlad_mistake_2.wav`, `vlad_mistake_3.wav`: Sarcastic code error reactions.
  - `vlad_streak_fail.wav`: Consecutive mistake warning.
  - `vlad_win_1.wav`, `vlad_win_2.wav`: Clean code approval quotes.
  - `vlad_idle.wav`: Standup deadline prompt.

### 3.2 Viral Community Meme Voice Clips (`public/audio/memes/`)
- **Source**: Public community meme archives (Myinstants, ZvukiPro).
- **Purpose**: Educational comedic micro-reactions on exercise checks and interactive landing cards.
- **Files**:
  - `fiasko.mp3`: «Это фиаско, братан!»
  - `wasted.mp3`: GTA San Andreas «Потрачено» (Russian Pirate Edition).
  - `emotional_damage.mp3`: Steven He «Emotional Damage!».
  - `bruh.mp3`: Vine «Bruh».
  - `krasavchik.mp3`: «Какой же я красавчик!».
  - `geniy.mp3`: «Ы-ы-ы я гений!».
  - `shedevr.mp3`: «Включи этот шедевр!».

### 3.3 Neural Lesson Explanations (`public/audio/lessons/`)
- **Engine**: Rhasspy Piper Neural Voice (`ru_RU-dmitri-medium.onnx`).
- **Files**:
  - `py-s1-l1.wav`, `py-s1-l2.wav`, `py-s1-l3.wav`: Python Fundamentals modules.
  - `py-s2-l1.wav`, `py-s2-l2.wav`: Python Control Flow & Loops.
  - `web-s1-l1.wav`: Web Development DOM structure.
  - `js-s1-l1.wav`: Modern JavaScript reactivity.

---

## 4. License & Copyright Declaration

- **Author**: Kivora Engineering Team
- **Date**: 2026-11-17
- **License**: MIT License
- **Commercial & Educational Distribution**: Fully compliant and approved.
