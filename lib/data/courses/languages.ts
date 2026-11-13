import type { Course, Stage } from '@/lib/types';

// ─── 1. Chinese Intro ────────────────────────────────────────────────────────
const chineseStages: Stage[] = [
  {
    id: 'zh-s1',
    courseId: 'chinese-intro',
    order: 1,
    title: 'Pinyin & The 4 Tones',
    description: 'Master Chinese pronunciation and tone inflections.',
    lessons: [
      {
        id: 'zh-s1-l1',
        stageId: 'zh-s1',
        courseId: 'chinese-intro',
        order: 1,
        title: 'The Four Tones of Mandarin',
        content: `## Tone Changes Meaning

Mandarin Chinese has four main tones plus a neutral tone. The syllable \`ma\` has completely different meanings depending on its pitch:

1. **1st Tone (high flat, ā):** \`mā\` (妈) — Mother
2. **2nd Tone (rising, á):** \`má\` (麻) — Hemp / numb
3. **3rd Tone (falling-rising, ǎ):** \`mǎ\` (马) — Horse
4. **4th Tone (falling sharp, à):** \`mà\` (骂) — Scold

\`\`\`
Tone marks are always written over vowels:
ā (1), á (2), ǎ (3), à (4)
\`\`\`

Getting the pitch contour right from day one is essential for spoken communication.`,
        exercise: {
          id: 'zh-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which tone contour represents the 3rd tone in Mandarin (like in mǎ)?',
          options: [
            'High and level (flat pitch)',
            'Rising from mid to high pitch',
            'Falling from mid-low, then rising',
            'Sharp dropping from high to low pitch',
          ],
          correctAnswer: 2,
          explanation:
            'The 3rd tone (ǎ) falls first from a mid-low pitch to the bottom of your vocal range, then rises back up.',
          hint: 'Look at the shape of the diacritic: ǎ goes down then up.',
        },
      },
    ],
  },
  {
    id: 'zh-s2',
    courseId: 'chinese-intro',
    order: 2,
    title: 'Greetings & Basic Courtesy',
    description: 'Essential phrases for polite everyday interactions.',
    lessons: [
      {
        id: 'zh-s2-l1',
        stageId: 'zh-s2',
        courseId: 'chinese-intro',
        order: 1,
        title: 'Saying Hello and Thank You',
        content: `## Everyday Courtesies

Here are the most universal Chinese expressions:

- **Nǐ hǎo (你好):** "Hello" (literally *You good*)
- **Xièxie (谢谢):** "Thank you"
- **Bú kèqi (不客气):** "You're welcome" (*Don't be overly courteous*)
- **Zàijiàn (再见):** "Goodbye" (*See you again*)

\`\`\`
When greeting an elder or in formal situations, use:
Nín hǎo (您好) instead of Nǐ hǎo.
\`\`\``,
        exercise: {
          id: 'zh-s2-l1-ex',
          type: 'translation',
          question: 'What is the standard Mandarin word for "Thank you" in Pinyin (with or without tone marks)?',
          correctAnswer: 'xiexie',
          explanation: 'Xièxie (谢谢) is the universal word for "thank you" across all Mandarin-speaking regions.',
          hint: 'It starts with x and repeats the syllable twice: xi...',
        },
      },
    ],
  },
  {
    id: 'zh-s3',
    courseId: 'chinese-intro',
    order: 3,
    title: 'Numbers & Introductions',
    description: 'Count to 10 and state your name clearly.',
    lessons: [
      {
        id: 'zh-s3-l1',
        stageId: 'zh-s3',
        courseId: 'chinese-intro',
        order: 1,
        title: 'Introducing Yourself (Wǒ jiào...)',
        content: `## Saying your name

To say what you are called in Chinese, use the verb **jiào** (叫):

\`\`\`
Wǒ jiào [Your Name].
(我叫 [Name]) = "My name is [Name]"
\`\`\`

- **Wǒ (我):** I / me
- **Jiào (叫):** to be called
- **Shì (是):** to be (am / is / are)

Example:
\`Wǒ jiào Alex. Wǒ shì xuésheng.\` (My name is Alex. I am a student.)`,
        exercise: {
          id: 'zh-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Which sentence correctly means "My name is Anna" in Mandarin?',
          options: ['Wǒ shì Anna míngzi', 'Wǒ jiào Anna', 'Anna jiào wǒ', 'Wǒ yǒu Anna'],
          correctAnswer: 1,
          explanation:
            '`Wǒ jiào Anna` (我叫 Anna) is the natural, standard way to say "My name is Anna" or "I am called Anna".',
          hint: 'The pattern is subject (Wǒ) + verb (jiào) + name.',
        },
      },
    ],
  },
];

// ─── 2. German A1 Foundations ────────────────────────────────────────────────
const germanStages: Stage[] = [
  {
    id: 'de-s1',
    courseId: 'german-a1',
    order: 1,
    title: 'Begrüßungen & Grundlagen',
    description: 'Greetings, the German alphabet, and polite basics.',
    lessons: [
      {
        id: 'de-s1-l1',
        stageId: 'de-s1',
        courseId: 'german-a1',
        order: 1,
        title: 'Hallo & Guten Tag',
        content: `## Essential German Greetings

German greetings adjust depending on time and formality:

- **Hallo:** Casual hello (friends, peers)
- **Guten Morgen:** Good morning (until ~11 AM)
- **Guten Tag:** Good day (standard throughout the day)
- **Guten Abend:** Good evening
- **Auf Wiedersehen:** Formal goodbye (on the phone: *Auf Wiederhören*)
- **Tschüss:** Casual bye

\`\`\`
All German nouns are always capitalized!
Der Morgen, der Tag, der Abend.
\`\`\``,
        exercise: {
          id: 'de-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which greeting is most appropriate when greeting a business colleague at 2:00 PM?',
          options: ['Guten Morgen', 'Gute Nacht', 'Guten Tag', 'Schlaf gut'],
          correctAnswer: 2,
          explanation:
            '`Guten Tag` is the formal, polite daytime greeting used from late morning until the evening.',
          hint: 'Morgen is for morning, Tag is for day.',
        },
      },
    ],
  },
  {
    id: 'de-s2',
    courseId: 'german-a1',
    order: 2,
    title: 'Der, Die, Das — Articles',
    description: 'Understanding masculine, feminine, and neuter genders.',
    lessons: [
      {
        id: 'de-s2-l1',
        stageId: 'de-s2',
        courseId: 'german-a1',
        order: 1,
        title: 'The Three German Genders',
        content: `## Grammatical Gender

Every German noun has a fixed grammatical gender:

- **der** (Masculine): \`der Tisch\` (the table), \`der Kaffee\` (the coffee)
- **die** (Feminine): \`die Lampe\` (the lamp), \`die Straße\` (the street)
- **das** (Neuter): \`das Buch\` (the book), \`das Wasser\` (the water)

\`\`\`
Always learn each noun together with its article:
Do not memorize "Tisch" alone — memorize "der Tisch".
\`\`\`

For plurals in the nominative case, all genders use **die**:
\`die Tische\`, \`die Lampen\`, \`die Bücher\`.`,
        exercise: {
          id: 'de-s2-l1-ex',
          type: 'multiple-choice',
          question: 'What is the definite article for the neuter noun "Buch" (book) in the nominative case?',
          options: ['der', 'die', 'das', 'den'],
          correctAnswer: 2,
          explanation: '`das Buch` is grammatically neuter. The nominative neuter article is `das`.',
          hint: 'Neither masculine (der) nor feminine (die).',
        },
      },
    ],
  },
  {
    id: 'de-s3',
    courseId: 'german-a1',
    order: 3,
    title: 'Im Café — Everyday Dialogue',
    description: 'Order food and drinks like a local in German-speaking cities.',
    lessons: [
      {
        id: 'de-s3-l1',
        stageId: 'de-s3',
        courseId: 'german-a1',
        order: 1,
        title: 'Ich möchte bitte einen Kaffee',
        content: `## Ordering politely

To order politely in German, use the conditional form **ich möchte** (*I would like*):

\`\`\`
- Ich möchte bitte einen Kaffee. (I would like a coffee, please.)
- Ich hätte gerne ein Wasser. (I would gladly have a water.)
- Was kostet das? (How much does that cost?)
- Die Rechnung, bitte! (The bill, please!)
\`\`\`

Notice the accusative case change for masculine nouns:
\`der Kaffee\` → \`einen Kaffee\`.`,
        exercise: {
          id: 'de-s3-l1-ex',
          type: 'fill-blank',
          question: 'Complete the polite order: "Ich ______ bitte ein Glas Wasser."',
          correctAnswer: 'möchte',
          explanation: '`Ich möchte bitte ein Glas Wasser` means "I would like a glass of water, please."',
          hint: 'The verb is möchte (modal-like form for would like).',
        },
      },
    ],
  },
];

// ─── 3. Korean Hangul ────────────────────────────────────────────────────────
const koreanStages: Stage[] = [
  {
    id: 'ko-s1',
    courseId: 'korean-hangul',
    order: 1,
    title: 'The Hangul Alphabet',
    description: 'Learn the scientific, logical Korean writing system.',
    lessons: [
      {
        id: 'ko-s1-l1',
        stageId: 'ko-s1',
        courseId: 'korean-hangul',
        order: 1,
        title: 'Basic Vowels & Consonants',
        content: `## How Hangul Blocks Work

Hangul is an alphabet organized into syllable blocks. Every block must have at least one consonant and one vowel:

\`\`\`
Consonant (ㄱ: g/k, ㄴ: n, ㅁ: m, ㅅ: s)
+ Vowel (ㅏ: a, ㅓ: eo, ㅗ: o, ㅣ: i)
= Syllable Block: 가 (ga), 나 (na), 마 (ma), 사 (sa)
\`\`\`

If a syllable starts with a vowel sound, a silent placeholder consonant **ㅇ** is placed in front:
- \`아\` = "a"
- \`이\` = "i"`,
        exercise: {
          id: 'ko-s1-l1-ex',
          type: 'multiple-choice',
          question: 'What is the pronunciation of the Hangul syllable "가" (ㄱ + ㅏ)?',
          options: ['na', 'ga / ka', 'ma', 'sa'],
          correctAnswer: 1,
          explanation: 'ㄱ represents a g/k sound and ㅏ represents "a", creating the syllable "ga" (or "ka").',
          hint: 'ㄱ is shaped like a gun (g/k sound).',
        },
      },
    ],
  },
  {
    id: 'ko-s2',
    courseId: 'korean-hangul',
    order: 2,
    title: 'Greetings & Politeness',
    description: 'Polite speech endings and essential daily greetings.',
    lessons: [
      {
        id: 'ko-s2-l1',
        stageId: 'ko-s2',
        courseId: 'korean-hangul',
        order: 1,
        title: 'Annyeonghaseyo (안녕하세요)',
        content: `## The Universal Korean Greeting

**안녕하세요 (Annyeonghaseyo)** is the standard, polite greeting used at any time of day:

- Literally: *"Are you in peace?"*
- Polite level: *-yo* ending (존댓말), suitable for strangers, colleagues, and elders.
- When bowing slightly, say: \`안녕하세요!\`

To say "Thank you":
- **감사합니다 (Gamsahamnida)** — formal and respectful.`,
        exercise: {
          id: 'ko-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Which of the following means "Thank you" politely in Korean?',
          options: ['안녕하세요 (Annyeonghaseyo)', '감사합니다 (Gamsahamnida)', '죄송합니다 (Joesonghamnida)', '안녕히 가세요 (Annyeonghi gaseyo)'],
          correctAnswer: 1,
          explanation: '`감사합니다 (Gamsahamnida)` is the standard polite phrase for "Thank you".',
          hint: 'Annyeonghaseyo is Hello; Gamsahamnida is Thank you.',
        },
      },
    ],
  },
  {
    id: 'ko-s3',
    courseId: 'korean-hangul',
    order: 3,
    title: 'Self-Introduction Basics',
    description: 'Saying your name and nationality with -ieyo / -yeyo.',
    lessons: [
      {
        id: 'ko-s3-l1',
        stageId: 'ko-s3',
        courseId: 'korean-hangul',
        order: 1,
        title: 'I am... (저는 ... 이에요/예요)',
        content: `## Sentence Structure: SOV

In Korean, the verb always comes at the end of the sentence:

\`\`\`
Subject (저는 = I am) + Noun (Name/Job) + Copula (이에요 / 예요)
\`\`\`

- After a consonant ending: use **이에요** (\`학생이에요\` = I am a student)
- After a vowel ending: use **예요** (\`민수예요\` = I am Minsoo)

Example:
\`저는 알렉스예요.\` (I am Alex.)`,
        exercise: {
          id: 'ko-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Where does the verb or copula (like "to be") appear in a Korean sentence?',
          options: ['At the very beginning', 'In the middle, before the object', 'At the very end of the sentence', 'Anywhere arbitrarily'],
          correctAnswer: 2,
          explanation: 'Korean is strictly a Subject-Object-Verb (SOV) language; verbs always conclude the clause.',
          hint: 'Opposite of English Subject-Verb-Object (SVO).',
        },
      },
    ],
  },
];

// ─── 4. Spanish A1 Foundations ──────────────────────────────────────────────
const spanishStages: Stage[] = [
  {
    id: 'es-s1',
    courseId: 'spanish-a1',
    order: 1,
    title: 'Saludos y Presentaciones',
    description: 'Greetings, introductions, and numbers 1–20.',
    lessons: [
      {
        id: 'es-s1-l1',
        stageId: 'es-s1',
        courseId: 'spanish-a1',
        order: 1,
        title: '¡Hola! ¿Cómo estás?',
        content: `## Spanish Greetings

Spanish uses inverted question marks \`¿\` and exclamation marks \`¡\` at the start of clauses:

- **¡Hola!:** Hello / Hi
- **¿Cómo estás?:** How are you? (informal)
- **¿Cómo está usted?:** How are you? (formal)
- **Muy bien, gracias:** Very well, thank you
- **Mucho gusto:** Nice to meet you
- **¡Adiós! / ¡Hasta luego!:** Goodbye / See you later

\`\`\`
Remember:
Pronounce all vowels clearly and crisply: A, E, I, O, U.
\`\`\``,
        exercise: {
          id: 'es-s1-l1-ex',
          type: 'multiple-choice',
          question: 'What is the natural polite response to "Mucho gusto" (Nice to meet you)?',
          options: ['Por favor', 'Igualmente', 'De nada', 'Lo siento'],
          correctAnswer: 1,
          explanation: '`Igualmente` means "Equally" or "Likewise", the standard response to "Mucho gusto".',
          hint: 'It shares the root with equal.',
        },
      },
    ],
  },
  {
    id: 'es-s2',
    courseId: 'spanish-a1',
    order: 2,
    title: 'Ser vs. Estar',
    description: 'Mastering the two Spanish verbs for "to be".',
    lessons: [
      {
        id: 'es-s2-l1',
        stageId: 'es-s2',
        courseId: 'spanish-a1',
        order: 1,
        title: 'Permanent Traits vs Temporary States',
        content: `## Ser vs. Estar

Spanish has two different verbs that translate to the English "to be":

1. **SER (Permanent / Identity / Origin):**
   - \`Yo soy de España.\` (Origin)
   - \`Ella es médica.\` (Profession)
   - \`El libro es interesante.\` (Inherent quality)

2. **ESTAR (Location / Condition / Emotion):**
   - \`Estoy cansado.\` (Temporary feeling: I am tired)
   - \`El café está caliente.\` (Current state: The coffee is hot)
   - \`Madrid está en España.\` (Location)

\`\`\`
Rule of thumb:
How you feel and where you are, always use the verb ESTAR.
\`\`\``,
        exercise: {
          id: 'es-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Which verb form correctly completes: "Yo ______ muy feliz hoy" (I am very happy today)?',
          options: ['soy', 'estoy', 'tengo', 'hago'],
          correctAnswer: 1,
          explanation: '`Estoy feliz hoy` uses ESTAR because happiness today is a temporary emotional state.',
          hint: 'Emotions and current feelings use estar.',
        },
      },
    ],
  },
  {
    id: 'es-s3',
    courseId: 'spanish-a1',
    order: 3,
    title: 'En el Restaurante',
    description: 'Order food, ask prices, and handle checks.',
    lessons: [
      {
        id: 'es-s3-l1',
        stageId: 'es-s3',
        courseId: 'spanish-a1',
        order: 1,
        title: 'Para mí, una paella por favor',
        content: `## Ordering in Spanish

Key phrases at a café or restaurant:

- **Para mí, ... por favor:** For me, ... please.
- **¿Qué recomienda?:** What do you recommend?
- **¿Cuánto cuesta?:** How much does it cost?
- **La cuenta, por favor:** The bill, please.

\`\`\`
Example dialogue:
Camarero: ¿Qué van a tomar?
Cliente: Para mí, un café con leche y una tostada, por favor.
\`\`\``,
        exercise: {
          id: 'es-s3-l1-ex',
          type: 'translation',
          question: 'Translate "The bill, please" into standard Spanish (without punctuation).',
          correctAnswer: 'la cuenta por favor',
          explanation: '`La cuenta, por favor` is the universally accepted phrase to request the bill.',
          hint: 'Cuenta means account or bill.',
        },
      },
    ],
  },
];

export const LANGUAGE_COURSES: Course[] = [
  {
    id: 'chinese-intro',
    title: 'Chinese',
    tagline: 'Unlock the sounds, tones, and foundational words of Mandarin.',
    description:
      'Begin your Mandarin journey with clarity. Learn the four tones, essential survival phrases, and self-introductions through practical pronunciation exercises.',
    level: 'Beginner',
    category: 'languages',
    estimatedHours: 8,
    stages: chineseStages,
    topicsPreview: [
      'The 4 tones and Pinyin pronunciation',
      'Daily greetings & formal courtesy',
      'Numbers 1–99 and counting objects',
      'Self-introduction and asking questions',
      'Basic characters & radicals (coming soon)',
    ],
  },
  {
    id: 'german-a1',
    title: 'German',
    tagline: 'Practical German for study, travel, and clear conversations.',
    description:
      'Build solid A1 German skills. Master essential greetings, noun genders (der/die/das), and authentic everyday dialogues for travel and life in German-speaking countries.',
    level: 'Beginner to Elementary',
    category: 'languages',
    estimatedHours: 9,
    stages: germanStages,
    topicsPreview: [
      'Greetings and the German alphabet',
      'Noun genders: der, die, das',
      'Ordering in cafés and restaurants',
      'Regular present tense verb conjugations',
      'Cases: Nominative and Accusative',
    ],
  },
  {
    id: 'korean-hangul',
    title: 'Korean',
    tagline: 'Read Hangul in hours and speak natural daily expressions.',
    description:
      'Discover the world’s most logical alphabet. Learn to read Hangul syllables, master natural polite greetings, and introduce yourself with confidence.',
    level: 'Beginner',
    category: 'languages',
    estimatedHours: 8,
    stages: koreanStages,
    topicsPreview: [
      'Hangul vowels, consonants, and syllable blocks',
      'Polite speech levels and daily greetings',
      'Introducing your name and nationality',
      'Numbers: Native Korean vs. Sino-Korean',
      'Batchim final consonants (coming soon)',
    ],
  },
  {
    id: 'spanish-a1',
    title: 'Spanish',
    tagline: 'From your first ¡Hola! to confident everyday communication.',
    description:
      'Immerse yourself in practical Spanish. Master natural greetings, understand the crucial distinction between Ser and Estar, and order food with ease.',
    level: 'Beginner',
    category: 'languages',
    estimatedHours: 8,
    stages: spanishStages,
    topicsPreview: [
      'Greetings, courtesy, and Spanish phonetics',
      'The difference between Ser and Estar',
      'Numbers, ordering food, and asking prices',
      'Regular -AR, -ER, -IR verbs in present tense',
      'Daily routine & reflexive verbs (coming soon)',
    ],
  },
];
