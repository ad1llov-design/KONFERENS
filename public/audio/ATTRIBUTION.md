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

## 3. License & Copyright Declaration

- **Author**: Kivora Engineering Team
- **Date**: 2026-11-15
- **License**: MIT License / Dedicated to Public Domain (CC0 Equivalent for Kivora codebase).
- **Commercial Use**: Fully compliant and approved for commercial and educational distribution.
- **Third-Party Assets**: None. No copyrighted media or restricted licenses (such as CC-BY-NC) are included.
