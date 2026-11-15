import type { Course, Stage } from '@/lib/types';

// ─── 1. JavaScript Essentials ────────────────────────────────────────────────
const jsStages: Stage[] = [
  {
    id: 'js-s1',
    courseId: 'javascript-basics',
    order: 1,
    title: 'Переменные и типы данных',
    description: 'Изучите современные объявления const/let и базовые типы данных JS.',
    lessons: [
      {
        id: 'js-s1-l1',
        stageId: 'js-s1',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Переменные const, let и типы данных',
        content: `## Современное объявление переменных

В современном JavaScript (ES6+) не используется устаревший \`var\`. Вместо него применяются:

- **const:** объявление константы, значение которой нельзя переназначить (выбор по умолчанию!)
- **let:** переменная, значение которой может изменяться во времени

\`\`\`javascript
const pi = 3.14159;
let score = 0;
score += 10; // корректно

const siteName = "Kivora"; // String
const active = true;        // Boolean
const count = 42;           // Number
\`\`\`

JavaScript имеет динамическую типизацию, при этом значения принадлежат конкретным примитивным типам: \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`.`,
        exercise: {
          id: 'js-s1-l1-ex',
          type: 'code-output',
          question: 'Какой тип вернёт выражение `typeof (42 === "42")` в JavaScript?',
          correctAnswer: 'boolean',
          explanation:
            '`42 === "42"` возвращает `false`, так как строгое равенство (`===`) проверяет и значение, и тип без приведения. А `typeof false` — это строка `"boolean"`.',
          hint: 'Строгое равенство возвращает true или false. Какой это тип?',
        },
      },
    ],
  },
  {
    id: 'js-s2',
    courseId: 'javascript-basics',
    order: 2,
    title: 'Функции и стрелочный синтаксис',
    description: 'Объявление переиспользуемой логики через функции и стрелочный синтаксис ES6.',
    lessons: [
      {
        id: 'js-s2-l1',
        stageId: 'js-s2',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Стрелочные функции (Arrow Functions)',
        content: `## Стрелочные функции

Стрелочные функции обеспечивают лаконичный синтаксис и сохраняют лексический контекст \`this\`:

\`\`\`javascript
// Обычная функция
function add(a, b) {
  return a + b;
}

// Стрелочная функция с телом
const multiply = (a, b) => {
  return a * b;
};

// Компактная стрелочная функция (неявный возврат)
const square = x => x * x;
\`\`\`

Если тело функции состоит из одного выражения, фигурные скобки можно опустить, а значение вернётся автоматически без ключевого слова \`return\`.`,
        exercise: {
          id: 'js-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Какая стрелочная функция правильно удваивает число с неявным возвратом (implicit return)?',
          options: ['const d = n => { n * 2 }', 'const d = n => n * 2', 'const d = (n) => return n * 2', 'const d = (n) { n * 2 }'],
          correctAnswer: 1,
          explanation:
            '`const d = n => n * 2` использует неявный возврат, опуская фигурные скобки. При наличии скобок `{}` возврат требует явного слова `return`.',
          hint: 'Без фигурных скобок выражение возвращается автоматически.',
        },
      },
    ],
  },
  {
    id: 'js-s3',
    courseId: 'javascript-basics',
    order: 3,
    title: 'Массивы и методы трансформации',
    description: 'Трансформация коллекций с помощью map, filter и reduce.',
    lessons: [
      {
        id: 'js-s3-l1',
        stageId: 'js-s3',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Трансформация массивов через .map() и .filter()',
        content: `## Неизменяемая трансформация массивов

Современный JS предпочитает декларативные методы трансформации ручным циклам \`for\`:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Фильтрация четных чисел:
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// Умножение каждого числа на два:
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
\`\`\`

Оба метода \`.map()\` и \`.filter()\` возвращают **новый** массив, не изменяя исходный.`,
        exercise: {
          id: 'js-s3-l1-ex',
          type: 'code-output',
          question: 'Чему равна длина массива `[10, 15, 20, 25].filter(x => x > 15)`?',
          correctAnswer: '2',
          explanation: 'Только числа строго больше 15 (это 20 и 25) проходят фильтр, поэтому итоговый массив содержит ровно 2 элемента.',
          hint: 'Посчитайте, сколько чисел строго больше 15.',
        },
      },
    ],
  },
];

// ─── 2. Web Development ──────────────────────────────────────────────────────
const webDevStages: Stage[] = [
  {
    id: 'web-s1',
    courseId: 'web-development',
    order: 1,
    title: 'Семантическая архитектура HTML5',
    description: 'Доступная и чистая структура страницы с использованием семантических тегов HTML5.',
    lessons: [
      {
        id: 'web-s1-l1',
        stageId: 'web-s1',
        courseId: 'web-development',
        order: 1,
        title: 'Семантическая разметка HTML5',
        content: `## Почему семантика имеет значение

Семантические теги сообщают браузеру и поисковым системам точный смысл содержимого, улучшая доступность (a11y) и SEO:

- \`<header>\` — вводная часть сайта или раздела, логотип и навигация
- \`<nav>\` — блок основных навигационных ссылок
- \`<main>\` — главное уникальное содержимое страницы (строго один на страницу!)
- \`<article>\` — самостоятельный независимый материал (статья, пост, карточка товара)
- \`<section>\` — тематическая смысловая секция с заголовком
- \`<footer>\` — подвал с авторскими правами, контактами и правовой информацией

\`\`\`html
<header>
  <nav><a href="/">Главная</a></nav>
</header>
<main>
  <article>
    <h1>Заголовок статьи</h1>
    <p>Основной текст публикации</p>
  </article>
</main>
\`\`\``,
        exercise: {
          id: 'web-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Какой тег HTML5 лучше всего подходит для оборачивания основных навигационных ссылок сайта?',
          options: ['<menu-bar>', '<nav>', '<navigation>', '<links>'],
          correctAnswer: 1,
          explanation:
            'Спецификация HTML5 закрепляет тег `<nav>` для блоков главной и второстепенной навигации.',
          hint: 'Сокращение из трёх букв от слова navigation.',
        },
      },
    ],
  },
  {
    id: 'web-s2',
    courseId: 'web-development',
    order: 2,
    title: 'Современный CSS: Flexbox и раскладка',
    description: 'Выравнивание и распределение элементов по осям с помощью Flexbox.',
    lessons: [
      {
        id: 'web-s2-l1',
        stageId: 'web-s2',
        courseId: 'web-development',
        order: 1,
        title: 'Выравнивание с Flexbox',
        content: `## Одномерная компоновка элементов

Flexbox оперирует двумя осями: главной осью (**main axis**, по умолчанию горизонтальной) и поперечной осью (**cross axis**, по умолчанию вертикальной).

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* распределяет по главной оси */
  align-items: center;          /* выравнивает по поперечной оси */
  gap: 1.5rem;                  /* отступ между элементами */
}
\`\`\`

Чтобы идеально отцентрировать элемент по вертикали и горизонтали:
\`\`\`css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\``,
        exercise: {
          id: 'web-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Какое CSS-свойство выравнивает элементы по главной оси внутри flex-контейнера?',
          options: ['align-items', 'justify-content', 'align-content', 'flex-align'],
          correctAnswer: 1,
          explanation:
            '`justify-content` управляет распределением пространства и выравниванием по главной оси flex-контейнера.',
          hint: 'Слово justify означает выравнивание по ширине или направлению строки.',
        },
      },
    ],
  },
  {
    id: 'web-s3',
    courseId: 'web-development',
    order: 3,
    title: 'Адаптивный дизайн и Breakpoints',
    description: 'Медиа-запросы, гибкая верстка и подход Mobile-First.',
    lessons: [
      {
        id: 'web-s3-l1',
        stageId: 'web-s3',
        courseId: 'web-development',
        order: 1,
        title: 'Адаптивный дизайн и Breakpoints',
        content: `## Подход Mobile-First

Современная вёрстка строится от мобильных экранов к десктопным с помощью медиа-запросов (\`@media\`):

\`\`\`css
/* Базовые стили для мобильных устройств */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Стили для планшетов и десктопов (от 768px) */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
\`\`\`

Метатег viewport обязателен в HTML:
\`<meta name="viewport" content="width=device-width, initial-scale=1">\``,
        exercise: {
          id: 'web-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Какое правило медиа-запроса применяется в подходе Mobile-First для экранов шире 768px?',
          options: ['@media (max-width: 768px)', '@media (min-width: 768px)', '@media (screen: 768px)', '@media (device: 768px)'],
          correctAnswer: 1,
          explanation:
            'В подходе Mobile-First базовые стили пишутся для телефонов, а для больших экранов задаются правила с `min-width`.',
          hint: 'Минимальная ширина экрана, при которой включаются расширенные стили.',
        },
      },
    ],
  },
];

// ─── 3. Data Analytics ───────────────────────────────────────────────────────
const dataStages: Stage[] = [
  {
    id: 'da-s1',
    courseId: 'data-analytics',
    order: 1,
    title: 'Data Fundamentals & Statistics',
    description: 'Types of data, measures of central tendency, and variance.',
    lessons: [
      {
        id: 'da-s1-l1',
        stageId: 'da-s1',
        courseId: 'data-analytics',
        order: 1,
        title: 'Mean, Median, and Outliers',
        content: `## Central Tendency

When describing typical values in a dataset:

- **Mean (Average):** Sum of all values divided by count. Sensitive to extreme outliers!
- **Median (Middle):** The middle value when sorted. Robust against outliers.
- **Mode:** The most frequent value.

\`\`\`
Example: Salaries [30k, 32k, 35k, 40k, 1,000,000k]
- Mean = 227.4k (misleadingly high due to the single billionaire!)
- Median = 35k (accurately reflects typical salary)
\`\`\`

Always inspect distribution skewness before relying purely on the mean.`,
        exercise: {
          id: 'da-s1-l1-ex',
          type: 'multiple-choice',
          question: 'If a salary dataset contains a few multi-millionaires, which metric best reflects typical earnings?',
          options: ['Mean', 'Median', 'Standard Deviation', 'Maximum'],
          correctAnswer: 1,
          explanation:
            'The median represents the exact 50th percentile and is resistant to distortion from extreme high outliers.',
          hint: 'The metric that is not pulled by extremes.',
        },
      },
    ],
  },
  {
    id: 'da-s2',
    courseId: 'data-analytics',
    order: 2,
    title: 'Data Cleaning & Aggregation',
    description: 'Handling missing values, filtering, and group-by calculations.',
    lessons: [
      {
        id: 'da-s2-l1',
        stageId: 'da-s2',
        courseId: 'data-analytics',
        order: 1,
        title: 'The Group-By Pipeline (Split-Apply-Combine)',
        content: `## Group-By Logic

Most analytical questions follow the **Split-Apply-Combine** pattern:

1. **Split:** Segment data by a categorical feature (e.g., Country, Plan, Month).
2. **Apply:** Compute a summary statistic for each group (e.g., SUM of revenue, COUNT of users).
3. **Combine:** Assemble into a summarized table.

\`\`\`sql
SELECT country, COUNT(user_id) AS active_users, AVG(engagement_score)
FROM users
GROUP BY country
HAVING COUNT(user_id) > 100;
\`\`\``,
        exercise: {
          id: 'da-s2-l1-ex',
          type: 'multiple-choice',
          question: 'In SQL/data operations, which clause filters aggregated group results (unlike WHERE)?',
          options: ['ORDER BY', 'HAVING', 'JOIN', 'LIMIT'],
          correctAnswer: 1,
          explanation: '`HAVING` filters results after aggregation (GROUP BY), whereas `WHERE` filters rows prior to aggregation.',
          hint: 'WHERE is for rows; HAVING is for groups.',
        },
      },
    ],
  },
  {
    id: 'da-s3',
    courseId: 'data-analytics',
    order: 3,
    title: 'Visual Storytelling & Charts',
    description: 'Choosing the right chart type to communicate insights clearly.',
    lessons: [
      {
        id: 'da-s3-l1',
        stageId: 'da-s3',
        courseId: 'data-analytics',
        order: 1,
        title: 'Selecting the Appropriate Chart',
        content: `## Chart Selection Heuristic

Different visual encodings communicate different data relationships:

- **Line Chart:** Trends over continuous time (e.g., Monthly active users).
- **Bar Chart:** Comparing distinct discrete categories (e.g., Sales by product).
- **Scatter Plot:** Correlation between two continuous variables (e.g., Study hours vs. Exam score).
- **Histogram:** Distribution shape of a single continuous variable.

\`\`\`
Avoid pie charts with more than 3 slices — human eyes struggle
to accurately compare angles and 2D area.
\`\`\``,
        exercise: {
          id: 'da-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Which chart type is most effective to display monthly revenue trends over the past 3 years?',
          options: ['Scatter plot', 'Pie chart', 'Line chart', 'Heatmap'],
          correctAnswer: 2,
          explanation: 'Line charts are the standard visual encoding for continuous temporal trends.',
          hint: 'Data points connected across a time axis.',
        },
      },
    ],
  },
];

// ─── 4. Artificial Intelligence ──────────────────────────────────────────────
const aiStages: Stage[] = [
  {
    id: 'ai-s1',
    courseId: 'artificial-intelligence',
    order: 1,
    title: 'How LLMs Work',
    description: 'Tokens, context windows, probability, and transformer fundamentals.',
    lessons: [
      {
        id: 'ai-s1-l1',
        stageId: 'ai-s1',
        courseId: 'artificial-intelligence',
        order: 1,
        title: 'Tokens and Next-Token Prediction',
        content: `## Transformers & Tokens

Large Language Models (LLMs) do not read words or characters directly; they process **tokens** (fragments of words):

- In English, ~1 token ≈ 4 characters or 0.75 words.
- In multilingual languages (Kyrgyz, Russian), subword tokenizers chunk words into syllables or stems.

\`\`\`
Core Mechanism:
Given a sequence of input tokens [t₁, t₂, ... tₙ],
the model calculates a probability distribution over the entire
vocabulary to predict the most probable next token:
P(tₙ₊₁ | t₁, t₂, ..., tₙ)
\`\`\`

Temperature controls randomness: \`0.0\` produces deterministic responses, while higher values (\`0.7 - 1.0\`) increase creative variation.`,
        exercise: {
          id: 'ai-s1-l1-ex',
          type: 'multiple-choice',
          question: 'What happens when you set the sampling temperature of an LLM to 0.0?',
          options: [
            'The model always selects the highest-probability next token (greedy, deterministic)',
            'The output becomes completely random and nonsensical',
            'The context window expands to double capacity',
            'The model refuses to generate tokens',
          ],
          correctAnswer: 0,
          explanation:
            'A temperature of 0.0 forces the model to pick the most likely token (argmax) at each step, making outputs largely deterministic.',
          hint: 'Lower temperature means colder, less variable choices.',
        },
      },
    ],
  },
  {
    id: 'ai-s2',
    courseId: 'artificial-intelligence',
    order: 2,
    title: 'Systematic Prompt Engineering',
    description: 'System roles, few-shot framing, and strict output formatting.',
    lessons: [
      {
        id: 'ai-s2-l1',
        stageId: 'ai-s2',
        courseId: 'artificial-intelligence',
        order: 1,
        title: 'The Components of a Production Prompt',
        content: `## Production Prompt Structure

Robust prompts consist of four key pillars:

1. **Role / Persona:** "You are an expert curriculum architect..."
2. **Context & Constraints:** "The student is a beginner. Keep explanations under 3 sentences."
3. **Few-Shot Examples:** 1–3 demonstrations of expected input/output.
4. **Structured Format:** "Return output strictly as a JSON object with keys: [title, steps]."

\`\`\`
Bad: "Tell me about Python functions."
Good: "You are a Python tutor. In 2 paragraphs, explain what a function parameter is. Use an analogy to a kitchen recipe. Output format: Markdown."
\`\`\``,
        exercise: {
          id: 'ai-s2-l1-ex',
          type: 'multiple-choice',
          question: 'What is "few-shot prompting"?',
          options: [
            'Running the model three times and averaging the answers',
            'Providing 1–3 explicit examples of inputs and desired outputs inside the prompt',
            'Limiting the model to short sentences',
            'Using a prompt with only three words',
          ],
          correctAnswer: 1,
          explanation:
            'Few-shot prompting provides demonstrations inside the prompt context to guide the format and reasoning style of the LLM.',
          hint: 'Zero-shot has 0 examples; few-shot has a few examples.',
        },
      },
    ],
  },
  {
    id: 'ai-s3',
    courseId: 'artificial-intelligence',
    order: 3,
    title: 'RAG & AI Architectures',
    description: 'Retrieval-Augmented Generation, vector embeddings, and real-world AI.',
    lessons: [
      {
        id: 'ai-s3-l1',
        stageId: 'ai-s3',
        courseId: 'artificial-intelligence',
        order: 1,
        title: 'Retrieval-Augmented Generation (RAG)',
        content: `## Grounding AI in Verified Knowledge

LLMs suffer from hallucinations and outdated training cutoffs. **RAG (Retrieval-Augmented Generation)** solves this:

1. Convert knowledge documents into **vector embeddings** (high-dimensional semantic vectors).
2. Store vectors in a vector database (pgvector, Pinecone).
3. When the user asks a question, retrieve the top 3–5 most semantically similar text chunks.
4. Inject retrieved chunks into the prompt context:
   \`"Answer the question using only the verified facts below: ..."\`

This allows LLMs to cite factual proprietary documents with high precision.`,
        exercise: {
          id: 'ai-s3-l1-ex',
          type: 'multiple-choice',
          question: 'What is the primary benefit of RAG compared to fine-tuning an LLM on private data?',
          options: [
            'RAG reduces context windows',
            'RAG allows dynamic real-time knowledge retrieval without costly re-training and reduces hallucinations',
            'RAG eliminates the need for prompts',
            'RAG only works in Python',
          ],
          correctAnswer: 1,
          explanation:
            'RAG enables inserting up-to-date, verified private documents into the prompt at inference time without modifying model weights.',
          hint: 'Think about live updates and avoiding model re-training.',
        },
      },
    ],
  },
];

export const TECH_COURSES: Course[] = [
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    tagline: 'The language that powers the interactive modern web.',
    description:
      'Learn modern JavaScript from ground up. Master const/let, arrow functions, and array transformations to build interactive web apps with confidence.',
    level: 'Beginner',
    category: 'programming',
    estimatedHours: 8,
    stages: jsStages,
    topicsPreview: [
      'Modern variables (const/let) and primitive types',
      'Arrow functions and lexical scope',
      'Array methods: .map(), .filter(), .reduce()',
      'DOM manipulation & event listeners',
      'Async/await & fetch APIs (coming soon)',
    ],
  },
  {
    id: 'web-development',
    title: 'HTML & CSS / Web Development',
    tagline: 'Craft modern, accessible, and responsive digital interfaces.',
    description:
      'Master the core architecture of the web: semantic HTML5 for accessibility and modern CSS Flexbox and Grid for responsive layouts across all devices.',
    level: 'Beginner',
    category: 'programming',
    estimatedHours: 8,
    stages: webDevStages,
    topicsPreview: [
      'Semantic HTML5 document architecture',
      'Flexbox layout, alignment, and distribution',
      'CSS Grid and responsive card patterns',
      'Mobile-first media queries & viewports',
      'Web accessibility & contrast standards',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    tagline: 'Turn raw numbers into actionable business decisions.',
    description:
      'Understand how to extract meaning from datasets. Learn measures of central tendency, data cleaning, aggregation patterns, and visual storytelling.',
    level: 'Beginner to Elementary',
    category: 'programming',
    estimatedHours: 9,
    stages: dataStages,
    topicsPreview: [
      'Data types, distributions, and outliers',
      'The split-apply-combine aggregation pipeline',
      'Selecting optimal visual encodings for charts',
      'SQL querying & data filtering essentials',
      'Detecting biases and reporting metrics',
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence & Prompt Engineering',
    tagline: 'Harness LLMs, embeddings, and modern AI pipelines.',
    description:
      'Understand how modern language models generate intelligence. Learn tokenization, few-shot prompt architecture, and Retrieval-Augmented Generation (RAG).',
    level: 'Elementary',
    category: 'programming',
    estimatedHours: 8,
    stages: aiStages,
    topicsPreview: [
      'Tokenization, context windows, and sampling temperature',
      'System prompts, constraints, and few-shot formatting',
      'Retrieval-Augmented Generation (RAG) architecture',
      'Vector databases and semantic embeddings',
      'Preventing hallucinations and prompt security',
    ],
  },
];
