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

Mandarin Chinese is a tonal language with four core tones plus a neutral tone. The exact same syllable has completely different meanings depending on its pitch contour:

1. **1st Tone (high flat, ā):** \`mā\` (妈) — Mother
2. **2nd Tone (rising, á):** \`má\` (麻) — Hemp / numb
3. **3rd Tone (falling-rising, ǎ):** \`mǎ\` (马) — Horse
4. **4th Tone (falling sharp, à):** \`mà\` (骂) — Scold
5. **Neutral Tone (light, soft, ma):** \`ma\` (吗) — Question particle

\`\`\`
Pinyin tone marks are always written over vowels:
ā (1: high flat 5-5)
á (2: rising 3-5)
ǎ (3: dip & rise 2-1-4)
à (4: sharp fall 5-1)
\`\`\`

Getting the pitch contour right from day one is essential for clear communication.`,
        exercise: {
          id: 'zh-s1-l1-ex1',
          type: 'multiple-choice',
          question: 'Which tone contour represents the 3rd tone in Mandarin (like in mǎ)?',
          options: [
            'High and level (flat pitch)',
            'Rising from mid to high pitch',
            'Falling from mid-low to deep pitch, then rising',
            'Sharp dropping from high to low pitch',
          ],
          correctAnswer: 2,
          explanation:
            'The 3rd tone (ǎ) dips down first into a deep low pitch and then curves gently upward.',
          hint: 'Look at the shape of the diacritic: ǎ goes down then up.',
        },
        exercises: [
          {
            id: 'zh-s1-l1-ex1',
            type: 'multiple-choice',
            question: 'Which tone contour represents the 3rd tone in Mandarin (like in mǎ)?',
            options: [
              'High and level (flat pitch)',
              'Rising from mid to high pitch',
              'Falling from mid-low to deep pitch, then rising',
              'Sharp dropping from high to low pitch',
            ],
            correctAnswer: 2,
            explanation:
              'The 3rd tone (ǎ) dips down first into a deep low pitch and then curves gently upward.',
            hint: 'Look at the shape of the diacritic: ǎ goes down then up.',
          },
          {
            id: 'zh-s1-l1-ex2',
            type: 'multiple-choice',
            question: 'What does the syllable "mā" with the 1st tone (high-level) mean in Mandarin?',
            options: ['Mother (妈)', 'Horse (马)', 'Scold (骂)', 'Hemp (麻)'],
            correctAnswer: 0,
            explanation: '"mā" (妈) with the high flat 1st tone means Mother.',
            hint: 'High and steady pitch represents Mother.',
          },
          {
            id: 'zh-s1-l1-ex3',
            type: 'fill-blank',
            question: 'What pitch direction does the 4th tone (à, as in "mà") have? Type: falling',
            correctAnswer: 'falling',
            explanation: 'The 4th tone (à) is a sharp, decisive falling tone from high pitch down to low pitch.',
            hint: 'Like an exclamation or a karate chop: falling.',
          },
        ],
      },
      {
        id: 'zh-s1-l2',
        stageId: 'zh-s1',
        courseId: 'chinese-intro',
        order: 2,
        title: 'Initials & Finals of Pinyin',
        content: `## Anatomy of a Chinese Syllable

Every standard Chinese syllable consists of up to three parts:
- **Initial (声母 shēngmǔ):** The beginning consonant (e.g. b, p, m, f, d, t, n, l, g, k, h).
- **Final (韵母 yùnmǔ):** The vowel or vowel combination (e.g. a, o, e, i, u, ü, ai, ei, ao, ou, an, en, ang, eng, ong).
- **Tone:** The pitch contour applied across the main vowel.

\`\`\`
Syllable = Initial + Final + Tone
Example: h + ao (3rd tone) = hǎo (好, good)
\`\`\`

### Aspirated vs. Unaspirated Consonants
Mandarin does not distinguish voiced/unvoiced consonants like English /b/ vs /p/. Instead, it distinguishes **unaspirated** (no puff of air) from **aspirated** (strong puff of air):
- **b** is unaspirated (sounds like a soft, voiceless 'p')
- **p** is aspirated (strong burst of breath)
- **d** is unaspirated / **t** is aspirated
- **g** is unaspirated / **k** is aspirated`,
        exercise: {
          id: 'zh-s1-l2-ex1',
          type: 'multiple-choice',
          question: 'In Mandarin Pinyin, what is the crucial acoustic difference between the initial "b" and "p"?',
          options: [
            'Aspiration: "p" has a strong puff of air, while "b" is unaspirated',
            '"b" is always voiced like English boy, "p" is whispered',
            '"b" is only used with back vowels, "p" with front vowels',
            'There is no acoustic difference in modern Mandarin',
          ],
          correctAnswer: 0,
          explanation: 'Mandarin pairs (b/p, d/t, g/k) are distinguished by aspiration (puff of air), not vocal cord vibration.',
          hint: 'Hold a tissue in front of your mouth: it will jump on "p" but not on "b".',
        },
        exercises: [
          {
            id: 'zh-s1-l2-ex1',
            type: 'multiple-choice',
            question: 'In Mandarin Pinyin, what is the crucial acoustic difference between the initial "b" and "p"?',
            options: [
              'Aspiration: "p" has a strong puff of air, while "b" is unaspirated',
              '"b" is always voiced like English boy, "p" is whispered',
              '"b" is only used with back vowels, "p" with front vowels',
              'There is no acoustic difference in modern Mandarin',
            ],
            correctAnswer: 0,
            explanation: 'Mandarin pairs (b/p, d/t, g/k) are distinguished by aspiration (puff of air), not vocal cord vibration.',
            hint: 'Hold a tissue in front of your mouth: it will jump on "p" but not on "b".',
          },
          {
            id: 'zh-s1-l2-ex2',
            type: 'multiple-choice',
            question: 'Which of the following is an example of an Initial (beginning consonant) in Pinyin?',
            options: ['m', 'ang', 'iong', 'eng'],
            correctAnswer: 0,
            explanation: '"m" is an Initial consonant (shēngmǔ), while ang, iong, and eng are compound Finals.',
            hint: 'Initials come at the very start of a syllable.',
          },
          {
            id: 'zh-s1-l2-ex3',
            type: 'fill-blank',
            question: 'What special vowel with two dots represents the rounded French/German "ü" sound in lü and nü? Type: ü',
            correctAnswer: 'ü',
            explanation: 'The letter ü (u with umlaut) represents the close front rounded vowel, found in lǚ (travel) and nǚ (female).',
            hint: 'Shape your lips for "oo" while vocalizing "ee": ü.',
          },
        ],
      },
      {
        id: 'zh-s1-l3',
        stageId: 'zh-s1',
        courseId: 'chinese-intro',
        order: 3,
        title: 'Tone Sandhi & Pronunciation Rules',
        content: `## Tone Sandhi (Changes in Flow)

When syllables are spoken in rapid succession, certain tones naturally mutate to make pronunciation smoother. This phenomenon is called **Tone Sandhi**.

### Rule 1: Two 3rd Tones in a Row (3 + 3 → 2 + 3)
When two third-tone syllables appear back-to-back, the first syllable changes into a second tone (rising):
\`\`\`
Nǐ (3) + hǎo (3) → pronounced "Ní hǎo" (2 + 3)
\`\`\`
Note: In writing, the tone marks remain as written (Nǐ hǎo), but your voice automatically shifts!

### Rule 2: Tone Changes for "Bù" (不, Not)
"Bù" is originally 4th tone:
- Before 1st, 2nd, or 3rd tones: stays 4th tone (bù gāo, bù máng, bù hǎo).
- Before another 4th tone: changes to 2nd tone (**bú** shì, **bú** duì).

### Rule 3: Tone Changes for "Yī" (一, One)
Originally 1st tone (yī). Before 4th tone words, it turns into 2nd tone (**yí** ge). Before 1st, 2nd, or 3rd tones, it turns into 4th tone (**yì** tiān).`,
        exercise: {
          id: 'zh-s1-l3-ex1',
          type: 'multiple-choice',
          question: 'When two 3rd-tone syllables occur consecutively (like "Nǐ" and "hǎo"), what tone is the first syllable spoken as?',
          options: ['2nd tone (rising)', '1st tone (flat high)', '4th tone (falling)', 'Neutral tone'],
          correctAnswer: 0,
          explanation: 'Under 3rd tone sandhi, 3 + 3 turns phonetically into 2 + 3 (Ní hǎo).',
          hint: 'Two deep dips in a row is exhausting, so the first curves up into a rising 2nd tone.',
        },
        exercises: [
          {
            id: 'zh-s1-l3-ex1',
            type: 'multiple-choice',
            question: 'When two 3rd-tone syllables occur consecutively (like "Nǐ" and "hǎo"), what tone is the first syllable spoken as?',
            options: ['2nd tone (rising)', '1st tone (flat high)', '4th tone (falling)', 'Neutral tone'],
            correctAnswer: 0,
            explanation: 'Under 3rd tone sandhi, 3 + 3 turns phonetically into 2 + 3 (Ní hǎo).',
            hint: 'Two deep dips in a row is exhausting, so the first curves up into a rising 2nd tone.',
          },
          {
            id: 'zh-s1-l3-ex2',
            type: 'multiple-choice',
            question: 'How is the negative word "bù" (不) pronounced when placed before a 4th-tone word like "shì" (是)?',
            options: ['bú (2nd tone)', 'bù (4th tone)', 'bǔ (3rd tone)', 'bū (1st tone)'],
            correctAnswer: 0,
            explanation: '"Bù" changes from 4th tone to 2nd tone ("bú") when followed by another 4th-tone syllable.',
            hint: 'Two consecutive sharp drops sound too abrupt, so bù shifts to rising bú.',
          },
          {
            id: 'zh-s1-l3-ex3',
            type: 'fill-blank',
            question: 'In the greeting "Nǐ hǎo", which tone number (1, 2, 3, or 4) is actually pronounced for "Nǐ"? Type: 2',
            correctAnswer: '2',
            explanation: 'Due to tone sandhi, "Nǐ" (3rd tone) is pronounced with the 2nd tone when preceding "hǎo".',
            hint: 'Enter the number 2.',
          },
        ],
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

Here are the most universal Chinese expressions that you will use in every conversation:

- **Nǐ hǎo (你好):** "Hello" (literally *You good*)
- **Nín hǎo (您好):** "Hello" (polite/formal form, used for elders, teachers, clients)
- **Xièxie (谢谢):** "Thank you"
- **Bú kèqi (不客气):** "You're welcome" (literally *Don't be overly courteous*)
- **Zàijiàn (再见):** "Goodbye" (literally *See you again*)

\`\`\`
Politeness Tip:
Nín (您) adds a heart radical (心) beneath nǐ (你).
It demonstrates respect from the bottom of your heart!
\`\`\``,
        exercise: {
          id: 'zh-s2-l1-ex1',
          type: 'translation',
          question: 'What is the standard Mandarin word for "Thank you" in Pinyin (without tone marks)?',
          correctAnswer: 'xiexie',
          explanation: 'Xièxie (谢谢) is the universal word for "thank you" across all Mandarin-speaking regions.',
          hint: 'It starts with x and repeats the syllable twice: xi...',
        },
        exercises: [
          {
            id: 'zh-s2-l1-ex1',
            type: 'translation',
            question: 'What is the standard Mandarin word for "Thank you" in Pinyin (without tone marks)?',
            correctAnswer: 'xiexie',
            explanation: 'Xièxie (谢谢) is the universal word for "thank you" across all Mandarin-speaking regions.',
            hint: 'It starts with x and repeats the syllable twice: xi...',
          },
          {
            id: 'zh-s2-l1-ex2',
            type: 'multiple-choice',
            question: 'How do you greet an elder or professional client respectfully in Chinese?',
            options: ['Nín hǎo (您好)', 'Nǐ hǎo (你好)', 'Zàijiàn (再见)', 'Bú kèqi (不客气)'],
            correctAnswer: 0,
            explanation: 'Nín hǎo (您好) is the respectful and formal variant of Nǐ hǎo.',
            hint: 'Look for the word with an "n" at the end indicating heart-felt respect: Nín.',
          },
          {
            id: 'zh-s2-l1-ex3',
            type: 'multiple-choice',
            question: 'What does the farewell expression "Zàijiàn" (再见) literally mean?',
            options: ['See you again', 'Go in peace', 'Good night', 'Stay safe'],
            correctAnswer: 0,
            explanation: 'Zài (again) + jiàn (to see) literally translates to "See you again".',
            hint: 'Zài means again, jiàn means to see.',
          },
        ],
      },
      {
        id: 'zh-s2-l2',
        stageId: 'zh-s2',
        courseId: 'chinese-intro',
        order: 2,
        title: 'Numbers 1 to 10 & Counting',
        content: `## Counting from 1 to 10 in Mandarin

Mandarin numbers are remarkably logical and concise:

\`\`\`
1 : yī (一)     6 : liù (六)
2 : èr (二)     7 : qī (七)
3 : sān (三)    8 : bā (八)
4 : sì (四)     9 : jiǔ (九)
5 : wǔ (五)    10 : shí (十)
\`\`\`

### Combining Numbers
Once you master 1 to 10, higher numbers follow a simple mathematical formula:
- **11 to 19:** 10 + single digit → \`shí-yī\` (11), \`shí-èr\` (12), \`shí-wǔ\` (15).
- **Tens:** digit + 10 → \`èr-shí\` (20), \`sān-shí\` (30), \`wǔ-shí\` (50).
- **Compound:** \`èr-shí-wǔ\` (25), \`jiǔ-shí-jiǔ\` (99).`,
        exercise: {
          id: 'zh-s2-l2-ex1',
          type: 'multiple-choice',
          question: 'Which number in Mandarin is pronounced "sān" (三)?',
          options: ['3', '4', '2', '5'],
          correctAnswer: 0,
          explanation: '"sān" (三) is the number 3, written with three horizontal strokes.',
          hint: 'Think of 3 parallel lines.',
        },
        exercises: [
          {
            id: 'zh-s2-l2-ex1',
            type: 'multiple-choice',
            question: 'Which number in Mandarin is pronounced "sān" (三)?',
            options: ['3', '4', '2', '5'],
            correctAnswer: 0,
            explanation: '"sān" (三) is the number 3, written with three horizontal strokes.',
            hint: 'Think of 3 parallel lines.',
          },
          {
            id: 'zh-s2-l2-ex2',
            type: 'fill-blank',
            question: 'What is the Pinyin for the number 10 (ten) in Mandarin? Type: shi',
            correctAnswer: 'shi',
            explanation: 'Shí (十) is the number 10 in Mandarin, written like a plus sign cross.',
            hint: 'Starts with sh...',
          },
          {
            id: 'zh-s2-l2-ex3',
            type: 'multiple-choice',
            question: 'Following the formula (10 + 5), how do you say "15" in Mandarin?',
            options: ['shí-wǔ', 'wǔ-shí', 'èr-shí', 'shí-sān'],
            correctAnswer: 0,
            explanation: '15 is formed by 10 (shí) + 5 (wǔ) = shí-wǔ (十五).',
            hint: 'Ten first, then five.',
          },
        ],
      },
      {
        id: 'zh-s2-l3',
        stageId: 'zh-s2',
        courseId: 'chinese-intro',
        order: 3,
        title: 'Polite Inquiries & Courtesy',
        content: `## Asking How Someone Is Doing

In Mandarin, turning a statement into a yes/no question is as simple as adding the particle **ma (吗)** at the end:

\`\`\`
Nǐ hǎo.     = You are well.
Nǐ hǎo ma?  = Are you well? (How are you?)
\`\`\`

### Responding
- **Wǒ hěn hǎo (我很好):** I am very well.
- **Hái kěyǐ (还可以):** Pretty good / not bad.
- **Nǐ ne? (你呢?):** And you?

### Apologizing & Excusing
- **Duìbuqǐ (对不起):** Sorry / Excuse me (literally *I can't face you*)
- **Méi guānxi (没关系):** It doesn't matter / No problem`,
        exercise: {
          id: 'zh-s2-l3-ex1',
          type: 'multiple-choice',
          question: 'What grammatical role does the neutral particle "ma" (吗) serve when added to the end of a sentence?',
          options: [
            'It transforms a statement into a question',
            'It changes the sentence into past tense',
            'It indicates a plural noun',
            'It expresses formal respect',
          ],
          correctAnswer: 0,
          explanation: '"ma" (吗) is the question particle that turns any declarative sentence into a yes/no question.',
          hint: 'Nǐ hǎo (Hello) + ma = Are you well?',
        },
        exercises: [
          {
            id: 'zh-s2-l3-ex1',
            type: 'multiple-choice',
            question: 'What grammatical role does the neutral particle "ma" (吗) serve when added to the end of a sentence?',
            options: [
              'It transforms a statement into a question',
              'It changes the sentence into past tense',
              'It indicates a plural noun',
              'It expresses formal respect',
            ],
            correctAnswer: 0,
            explanation: '"ma" (吗) is the question particle that turns any declarative sentence into a yes/no question.',
            hint: 'Nǐ hǎo (Hello) + ma = Are you well?',
          },
          {
            id: 'zh-s2-l3-ex2',
            type: 'translation',
            question: 'What is the standard Mandarin word for "Sorry / Excuse me" in Pinyin (without tone marks)?',
            correctAnswer: 'duibuqi',
            explanation: 'Duìbuqǐ (对不起) is the standard Chinese apology for "sorry" or "excuse me".',
            hint: 'Starts with dui...',
          },
          {
            id: 'zh-s2-l3-ex3',
            type: 'multiple-choice',
            question: 'How do you politely reply when someone says "Duìbuqǐ" (Sorry)?',
            options: ['Méi guānxi (没关系)', 'Bú kèqi (不客气)', 'Zàijiàn (再见)', 'Nǐ hǎo (你好)'],
            correctAnswer: 0,
            explanation: "Méi guānxi (没关系) means 'It doesn't matter' or 'No worries'.",
            hint: 'Méi means not have / none; guānxi means connection/problem.',
          },
        ],
      },
    ],
  },
  {
    id: 'zh-s3',
    courseId: 'chinese-intro',
    order: 3,
    title: 'Introductions & First Characters',
    description: 'Introduce yourself and decipher foundational Hanzi pictograms.',
    lessons: [
      {
        id: 'zh-s3-l1',
        stageId: 'zh-s3',
        courseId: 'chinese-intro',
        order: 1,
        title: 'Introducing Yourself (Wǒ jiào...)',
        content: `## Stating Your Name & Identity

In Mandarin, stating your name uses the verb **jiào** (叫, to be called):

\`\`\`
Wǒ jiào [Your Name].
(我叫 [Name]) = "My name is [Name]"
\`\`\`

### Key Pronouns & Verbs:
- **Wǒ (我):** I / me
- **Nǐ (你):** You
- **Tā (他 / 她):** He / She
- **Shì (是):** To be (am / is / are)
- **Xuésheng (学生):** Student
- **Lǎoshī (老师):** Teacher

### Examples:
\`\`\`
Wǒ jiào Anna. (My name is Anna.)
Wǒ shì xuésheng. (I am a student.)
Tā shì lǎoshī. (He/She is a teacher.)
\`\`\``,
        exercise: {
          id: 'zh-s3-l1-ex1',
          type: 'multiple-choice',
          question: 'Which sentence correctly means "My name is Anna" in Mandarin?',
          options: ['Wǒ jiào Anna', 'Wǒ shì Anna míngzi', 'Anna jiào wǒ', 'Wǒ yǒu Anna'],
          correctAnswer: 0,
          explanation: '"Wǒ jiào Anna" (我叫 Anna) is the standard formula: Subject (Wǒ) + Verb (jiào) + Name.',
          hint: 'The pattern is subject (Wǒ) + verb (jiào) + name.',
        },
        exercises: [
          {
            id: 'zh-s3-l1-ex1',
            type: 'multiple-choice',
            question: 'Which sentence correctly means "My name is Anna" in Mandarin?',
            options: ['Wǒ jiào Anna', 'Wǒ shì Anna míngzi', 'Anna jiào wǒ', 'Wǒ yǒu Anna'],
            correctAnswer: 0,
            explanation: '"Wǒ jiào Anna" (我叫 Anna) is the standard formula: Subject (Wǒ) + Verb (jiào) + Name.',
            hint: 'The pattern is subject (Wǒ) + verb (jiào) + name.',
          },
          {
            id: 'zh-s3-l1-ex2',
            type: 'multiple-choice',
            question: 'What does the sentence "Wǒ shì xuésheng" (我是学生) mean?',
            options: ['I am a student', 'I am a teacher', 'I am very good', 'My name is Xuésheng'],
            correctAnswer: 0,
            explanation: 'Wǒ (I) + shì (am) + xuésheng (student) means "I am a student".',
            hint: 'xuésheng means student.',
          },
          {
            id: 'zh-s3-l1-ex3',
            type: 'fill-blank',
            question: 'What quick bounce-back particle creates questions like "And you?" (Nǐ ...?). Type: ne',
            correctAnswer: 'ne',
            explanation: '"Nǐ ne?" (你呢?) means "And you?" or "How about you?".',
            hint: 'Two letters: n + e.',
          },
        ],
      },
      {
        id: 'zh-s3-l2',
        stageId: 'zh-s3',
        courseId: 'chinese-intro',
        order: 2,
        title: 'Essential Hanzi Radicals & Pictograms',
        content: `## The Architecture of Chinese Characters (汉字)

Chinese characters are not arbitrary scribbles; they were originally drawings of real-world objects (**pictograms**) that combine into compound ideas!

### 5 Foundational Building Blocks (Radicals):
1. **人 / 亻 (rén):** Person (two walking legs)
   - Example: \`从\` (cóng, two people following each other → to follow)
2. **口 (kǒu):** Mouth / opening (a square opening)
   - Example: \`吃\` (chī, to eat), \`喝\` (hē, to drink)
3. **日 (rì):** Sun / day (a circle with a dot, stylized as a rectangle with a line)
4. **月 (yuè):** Moon / month (a crescent moon)
5. **木 (mù):** Tree / wood (a tree with trunk, branches, and roots)

\`\`\`
Radical Combination Power:
日 (Sun) + 月 (Moon) = 明 (míng, Bright!)
木 (Tree) + 木 (Tree) = 林 (lín, Woods / Grove)
木 + 木 + 木 = 森 (sēn, Forest)
\`\`\``,
        exercise: {
          id: 'zh-s3-l2-ex1',
          type: 'multiple-choice',
          question: 'What does the square radical "口" (kǒu) originally represent?',
          options: ['Mouth / opening', 'Sun / day', 'Person', 'Tree / wood'],
          correctAnswer: 0,
          explanation: '"口" (kǒu) is the pictogram of an open mouth or entrance.',
          hint: 'Think of an open box or mouth.',
        },
        exercises: [
          {
            id: 'zh-s3-l2-ex1',
            type: 'multiple-choice',
            question: 'What does the square radical "口" (kǒu) originally represent?',
            options: ['Mouth / opening', 'Sun / day', 'Person', 'Tree / wood'],
            correctAnswer: 0,
            explanation: '"口" (kǒu) is the pictogram of an open mouth or entrance.',
            hint: 'Think of an open box or mouth.',
          },
          {
            id: 'zh-s3-l2-ex2',
            type: 'multiple-choice',
            question: 'When the pictogram for Sun (日) and Moon (月) combine to form "明" (míng), what does it mean?',
            options: ['Bright / clear', 'Night', 'Eclipse', 'Darkness'],
            correctAnswer: 0,
            explanation: 'When the two brightest celestial bodies (sun + moon) combine, they form 明 (bright / clear).',
            hint: 'Sun plus Moon makes maximum light.',
          },
          {
            id: 'zh-s3-l2-ex3',
            type: 'fill-blank',
            question: 'Which fundamental character depicts a person with two walking legs (rén)? Type: 人',
            correctAnswer: '人',
            explanation: '人 (rén) is the foundational character for person / human.',
            hint: 'Type the character 人.',
          },
        ],
      },
      {
        id: 'zh-s3-l3',
        stageId: 'zh-s3',
        courseId: 'chinese-intro',
        order: 3,
        title: 'Capstone Mini-Dialogue',
        content: `## Putting It All Together

Congratulations on reaching the capstone lesson! You will now read and interpret a complete natural dialogue between two new friends, **Li Ming** and **Elena**:

\`\`\`
A: Nǐ hǎo! (你好！)
B: Nǐ hǎo! (你好！)

A: Wǒ jiào Lǐ Míng. Nǐ jiào shénme míngzi?
   (我叫李明。你叫什么名字？)
   - "My name is Li Ming. What is your name?"

B: Wǒ jiào Elena. Wǒ shì xuésheng. Nǐ ne?
   (我叫埃琳娜。我是学生。你呢？)
   - "My name is Elena. I am a student. And you?"

A: Wǒ yě shì xuésheng. Nǐ hǎo ma?
   (我也是学生。你好吗？)
   - "I am also a student. How are you?"

B: Wǒ hěn hǎo, xièxie! Zàijiàn!
   (我很好，谢谢！再见！)
   - "I am very well, thanks! Goodbye!"

A: Zàijiàn! (再见！)
\`\`\`

You now know how to greet, introduce yourself, ask questions, and be polite in Mandarin Chinese!`,
        exercise: {
          id: 'zh-s3-l3-ex1',
          type: 'multiple-choice',
          question: 'In the dialogue, when Elena asks "Nǐ ne?", what does person A reply?',
          options: [
            'Wǒ yě shì xuésheng (I am also a student)',
            'Duìbuqǐ (Sorry)',
            'Bú kèqi (You are welcome)',
            'Wǒ jiào Alex (My name is Alex)',
          ],
          correctAnswer: 0,
          explanation: 'Person A uses "yě" (also): "Wǒ yě shì xuésheng" (I am also a student).',
          hint: '"yě" means also or too.',
        },
        exercises: [
          {
            id: 'zh-s3-l3-ex1',
            type: 'multiple-choice',
            question: 'In the dialogue, when Elena asks "Nǐ ne?", what does person A reply?',
            options: [
              'Wǒ yě shì xuésheng (I am also a student)',
              'Duìbuqǐ (Sorry)',
              'Bú kèqi (You are welcome)',
              'Wǒ jiào Alex (My name is Alex)',
            ],
            correctAnswer: 0,
            explanation: 'Person A uses "yě" (also): "Wǒ yě shì xuésheng" (I am also a student).',
            hint: '"yě" means also or too.',
          },
          {
            id: 'zh-s3-l3-ex2',
            type: 'multiple-choice',
            question: 'In the sentence "Nǐ jiào shénme míngzi?", what does the word "shénme" (什么) mean?',
            options: ['What', 'Where', 'Who', 'When'],
            correctAnswer: 0,
            explanation: '"shénme" (什么) means "what" in Mandarin Chinese.',
            hint: 'What name are you called?',
          },
          {
            id: 'zh-s3-l3-ex3',
            type: 'translation',
            question: 'How do you say "Goodbye" in Mandarin Pinyin (without tone marks)?',
            correctAnswer: 'zaijian',
            explanation: 'Zàijiàn (再见) is the universal expression for "goodbye" / "see you again".',
            hint: 'Starts with zai...',
          },
        ],
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
