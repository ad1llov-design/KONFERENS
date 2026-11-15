# 🌟 Kivora — Gamified Interactive Learning Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-Procedural_SFX-8B5CF6?style=for-the-badge)
![Web Speech](https://img.shields.io/badge/Web_Speech_API-Text_To_Speech-10B981?style=for-the-badge)
![i18n](https://img.shields.io/badge/Localization-RU_%7C_KY_%7C_EN-F59E0B?style=for-the-badge)

**Next-generation micro-learning ecosystem designed for IT conferences, hackathons, and self-paced mastery.**  
*Combines board-game serpentines, procedural game audio, original vector mascot stickers, accessibility voice synthesis, and trilingual curriculums.*

[🇷🇺 Документация на русском (README.ru.md)](./README.ru.md) • [🌐 Live Demo](http://localhost:3000) • [🔊 Audio Attribution](./public/audio/ATTRIBUTION.md)

</div>

---

## 📑 Table of Contents

1. [Key Features & Innovations](#-key-features--innovations)
2. [Visual Design & Theme System](#-visual-design--theme-system)
3. [Procedural Audio Engine (Web Audio API)](#-procedural-audio-engine-web-audio-api)
4. [Voice Assistant & Text-to-Speech (TTS)](#-voice-assistant--text-to-speech-tts)
5. [Vector Mascot «Kivi» (Киви)](#-vector-mascot-kivi-киви)
6. [Comprehensive Course Catalog & Chinese Track](#-comprehensive-course-catalog--chinese-track)
7. [System Architecture](#-system-architecture)
8. [Getting Started & Local Execution](#-getting-started--local-execution)
9. [Conference Demonstration Script](#-conference-demonstration-script)
10. [Licensing & Attribution](#-licensing--attribution)

---

## 🚀 Key Features & Innovations

### 1. Board-Game Serpentine Roadmap (Настольная Дорожка)
- **Gamified Progression:** Lessons are arranged along a serpentine pathway with stage dividers, active learner avatar tokens, and glowing connection lines.
- **Milestone Finish Goal:** Clean finish flag with real-time completion counter (`X of Y completed · Z remaining`) with **zero treasure chests** or kitsch clutter.
- **Diagnostic-Driven:** 8-question placement test automatically determines learner level (*Beginner*, *Elementary*, *Pre-Intermediate*) and tailors the starting milestone.

### 2. Multi-Step Interactive Lesson Stepper
- **3+ Distinct Exercises per Lesson:** Every lesson contains at least 3 varied checks (Multiple-choice, Code Output, Fill-in-the-Blank, Translation).
- **Interactive Stepper Bar:** Learners navigate between sub-exercises with real-time status indicators (current, completed, pending).
- **Adaptive Feedback:** Instant explanations, intelligent hint reveals, and mascot reactions.

### 3. Integrated Code & Interactive Previews
- **Python Function Decomposition:** Interactive colored parameter breakdown (`def`, name, parameters, type hints, docstring, body, `return`).
- **Live HTML/CSS Sandbox:** Tabbed view with clean code view and live rendered preview showing responsive flexbox cards with modern aesthetics.

---

## 🎨 Visual Design & Theme System

Kivora implements a dual design system built on CSS custom variables and high-contrast accessibility tokens:

| Element | Apple Light Mode (`light`) | Linear Dark Mode (`dark`) |
| :--- | :--- | :--- |
| **Background** | Clean pure light `#FBFBFD` | Deep slate obsidian `#0D0D12` |
| **Surfaces** | Translucent frost `#FFFFFF` with glass border | Smoked acrylic `#16161F` / `#1C1C28` |
| **Primary Accent** | Deep royal indigo `#6366F1` | Electric neon indigo `#818CF8` |
| **Typography** | Crisp dark charcoal `#0F172A` | High-contrast stark white `#F8FAFC` |
| **Borders** | Subtle hairline `rgba(0,0,0,0.08)` | Refined edge `rgba(255,255,255,0.1)` |

*Switch themes instantly via the 1-click toggle in the navigation bar or profile settings.*

---

## 🔊 Procedural Audio Engine (Web Audio API)

All sound effects are **100% procedurally synthesized in real-time** via the browser's native `AudioContext`.
- **Zero External Audio Files:** 0 KB MP3/WAV download overhead, zero network latency, zero broken asset URLs.
- **100% Royalty-Free & Safe:** No copyrighted audio assets. Fully documented under MIT / CC0 in [`public/audio/ATTRIBUTION.md`](./public/audio/ATTRIBUTION.md).
- **Sound Palette:**
  - `answer.correct`: Ascending major triad chord (C5 523Hz → E5 659Hz → G5 784Hz) with gentle lowpass shimmer (~0.35s).
  - `answer.incorrect`: Soft comical marimba descent (D4 293Hz → B3 246Hz → G#3 207Hz) with triangle/sine warmth. Encouraging, never punitive (~0.26s).
  - `lesson.complete`: Jubilant milestone fanfare chord (C5 → E5 → G5 → C6) with dual-envelope harmonics (~0.55s).
  - `checkpoint.unlock`: Sparkling resonant chime (E6 1318Hz + B6 1975Hz) with decaying high-resonance bandpass (~0.32s).
- **User Control & Persistence:** Centralized mute toggle, smooth volume slider, and "Test Sound" button in navigation, roadmap header, and User Profile. State is persisted in `localStorage`.

---

## 🗣️ Voice Assistant & Text-to-Speech (TTS)

Every lesson features an on-demand voice assistant powered by the standard **Web Speech API** (`window.speechSynthesis`):
- **Clean Audio Stream:** Custom regular-expression sanitizer strips code blocks, markdown symbols, and technical syntax so the voice speaks natural explanations.
- **Playback Controls:** One-click Play, Pause, Resume, and Stop controls with live pulsing audio waveform indicator.
- **Speed Selector:** Switch reading speed between `0.8x`, `1.0x`, and `1.2x`.
- **Intelligent Voice Detection:** Automatically scans available device voices for the user's active locale (`ru-RU`, `ky-KG`, `en-US`). If a language voice is missing from the OS, a polite localized notice is displayed without errors.
- **Audio Ducking:** Game sound effects are automatically ducked by 60% while speech synthesis is active to ensure crisp vocal clarity.
- **Clean Unmount:** Playback automatically terminates upon lesson navigation.

---

## 🦊 Vector Mascot «Kivi» (Киви)

Kivi is Kivora's friendly, hand-crafted **100% vector SVG mascot** (a clever little kiwi bird with big bright eyes and expressive feather tufts). Kivi reacts dynamically to the learner's journey with localized speech bubbles in Russian, Kyrgyz, and English:

| Mood | Visual Cues | Speech Bubble Trigger |
| :--- | :--- | :--- |
| **`celebrate`** | Sparkling star eyes, graduation cap, celebratory wave | Triggered on correct answer |
| **`encourage`** | Warm gentle smile, glowing warm heart, comforting pose | Triggered on incorrect answer (friendly reassurance) |
| **`thinking`** | Tapping chin thoughtfully, glowing yellow lightbulb | Displayed inside Hint cards |
| **`champion`** | Golden victory laurel medal, proud heroic pose | Displayed upon completing all exercises in a lesson |

---

## 📚 Comprehensive Course Catalog & Chinese Track

Kivora offers **15 production-ready courses** spanning Technology, Languages, and Professional Skills with **100% trilingual localization (RU / KY / EN)**:

### 🇨🇳 Featured Language Deep-Dive: Chinese Intro (`chinese-intro`)
- **Stage 1: Pinyin & The 4 Tones (Пиньинь и 4 тона / Пиньинь жана 4 тон)**
  - `zh-s1-l1`: The Four Tones of Mandarin (mā, má, mǎ, mà + neutral tone)
  - `zh-s1-l2`: Initials & Finals of Pinyin (aspirated vs. unaspirated consonants, ü)
  - `zh-s1-l3`: Tone Sandhi & Rules (3+3→2+3 sandhi, bù/yī tonal inflections)
- **Stage 2: Greetings & Numbers (Приветствия и числа / Саламдашуу жана сандар)**
  - `zh-s2-l1`: Saying Hello and Thank You (Nǐ hǎo, Nín hǎo, Xièxie, Zàijiàn)
  - `zh-s2-l2`: Numbers 1 to 10 & Counting (yī through shí, compound numbers)
  - `zh-s2-l3`: Polite Inquiries & Courtesy (Nǐ hǎo ma?, Duìbuqǐ, Méi guānxi)
- **Stage 3: Introductions & First Characters (Знакомство и иероглифы / Таанышуу жана алгачкы иероглифтер)**
  - `zh-s3-l1`: Introducing Yourself (Wǒ jiào..., Wǒ shì xuésheng, Nǐ ne?)
  - `zh-s3-l2`: Essential Hanzi Radicals & Pictograms (人, 口, 日, 月, 木, 明)
  - `zh-s3-l3`: Capstone Mini-Dialogue (Live natural conversation between Li Ming & Elena)

*Every single lesson contains at least 3 distinct exercises, detailed explanations, and 100% localized Russian and Kyrgyz texts.*

---

## 🏗 System Architecture

```
kivora/
├── app/                                 # Next.js 16 App Router
│   ├── courses/                         # Course catalog & detail pages
│   │   └── [id]/
│   │       ├── diagnostic/              # 8-question placement diagnostic
│   │       ├── learn/                   # Serpentine game-board roadmap
│   │       └── learn/[lessonId]/        # Interactive lesson with TTS, SFX, Mascot
│   ├── dashboard/                       # User profile, progress & sound settings
│   ├── tutor/                           # AI Tutor with course context
│   └── globals.css                      # Modern CSS variables, glassmorphism, animations
├── components/
│   ├── layout/                          # Navbar with language switcher, sound toggle
│   ├── lesson/                          # CodeBlock, HtmlCssPreview, KiviSticker, LessonTextToSpeech
│   ├── sound/                           # SoundToggle component with volume slider
│   └── ui/                              # High-contrast Buttons, Badges, Modals, ProgressBars
├── lib/
│   ├── data/
│   │   ├── courses/                     # Course structures (tech.ts, languages.ts, professional.ts)
│   │   ├── course-content-localization.ts # 100% localized RU/KY lesson texts & exercises
│   │   └── diagnostics.ts               # Deterministic diagnostic questions
│   ├── sound/
│   │   └── sound-manager.ts             # Web Audio API singleton synthesizer
│   ├── i18n/                            # React Context for RU, KY, EN switching
│   └── demo-state.ts                    # Zero-config localStorage persistence
└── public/
    └── audio/
        └── ATTRIBUTION.md               # Procedural audio specification & CC0 license
```

---

## 💻 Getting Started & Local Execution

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/ad1llov-design/KONFERENS.git
cd KONFERENS
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.  
*The app runs immediately in zero-setup Demo Mode with local storage persistence.*

### 4. Build and Typecheck
```bash
npx tsc --noEmit     # TypeScript type safety check (0 errors)
npm run lint         # ESLint check (0 errors)
npm run build        # Production Next.js build (27 static/dynamic pages)
```

---

## 🎤 Conference Demonstration Script

Follow this 5-minute walkthrough to showcase the platform's core strengths:

1. **Landing Page (`/`):**
   - Toggle language: switch seamlessly between **Русский**, **Кыргызча**, and **English**.
   - Toggle theme: demonstrate high-contrast Apple Light mode and Linear Dark mode.
2. **Sound Controls:**
   - Click the speaker icon in the top navigation bar or course header.
   - Adjust the volume slider and click **"Test Sound"** to demonstrate the synthesized Web Audio triad.
3. **Explore Course Map (`/courses/chinese-intro/learn`):**
   - View the serpentine board-game roadmap with 3 stages and 9 lessons.
   - Observe the active learner token (`🦊`) and milestone goal flag.
   - Click an active node to hear the `playCheckpoint()` resonant chime.
4. **Interactive Lesson (`/courses/chinese-intro/learn/zh-s1-l1`):**
   - Click **"Прослушать объяснение" / "Түшүндүрмөнү угуу"** to hear Web Speech API voice synthesis.
   - Adjust speech rate (`0.8x`, `1.0x`, `1.2x`).
   - Switch to the **Exercise** tab: observe the 3-step stepper (`1`, `2`, `3`).
   - Select an incorrect option → hear comical friendly descent, observe Kivi's `encourage` sticker.
   - Select the correct option → hear ascending major triad, observe Kivi's `celebrate` sticker.
   - Complete all 3 exercises → hear milestone fanfare, observe Kivi's `champion` victory sticker.
5. **Code Playground & Diagnostic:**
   - Open Python Fundamentals lesson `py-s3-l1` to demonstrate interactive `def` keyword breakdown.
   - Open Web Development lesson `web-s1-l1` to show interactive live HTML/CSS render preview.

---

## 📜 Licensing & Attribution

- **Code:** Licensed under the [MIT License](./LICENSE).
- **Audio Synthesizer:** 100% procedurally synthesized code using standard Web Audio API oscillators. Zero external copyrighted audio assets. Fully documented in [`public/audio/ATTRIBUTION.md`](./public/audio/ATTRIBUTION.md).
- **Mascot Stickers:** 100% original SVG vector artwork created specifically for the Kivora project.
