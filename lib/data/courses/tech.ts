import type { Course, Stage } from '@/lib/types';

// ─── 1. JavaScript Essentials ────────────────────────────────────────────────
const jsStages: Stage[] = [
  {
    id: 'js-s1',
    courseId: 'javascript-basics',
    order: 1,
    title: 'Variables & Data Types',
    description: 'Learn modern const/let declarations and fundamental JS types.',
    lessons: [
      {
        id: 'js-s1-l1',
        stageId: 'js-s1',
        courseId: 'javascript-basics',
        order: 1,
        title: 'const, let, and Primitive Types',
        content: `## Modern Variable Declarations

In modern JavaScript (ES6+), avoid \`var\`. Instead use:

- **const:** for values that won't be reassigned (default choice!)
- **let:** for variables whose values will change over time

\`\`\`javascript
const pi = 3.14159;
let score = 0;
score += 10; // valid

const name = "Kivora"; // String
const active = true;   // Boolean
const count = 42;      // Number
\`\`\`

JavaScript is dynamically typed, but variables hold values of specific primitive types: \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, and \`bigint\`.`,
        exercise: {
          id: 'js-s1-l1-ex',
          type: 'code-output',
          question: 'What is the output of `typeof (42 === "42")` in JavaScript?',
          correctAnswer: 'boolean',
          explanation:
            '`42 === "42"` evaluates to `false` because strict equality (`===`) checks both value and type without coercion. The `typeof false` is the string `"boolean"`.',
          hint: 'Strict equality returns true or false. What type is that?',
        },
      },
    ],
  },
  {
    id: 'js-s2',
    courseId: 'javascript-basics',
    order: 2,
    title: 'Functions & Arrow Syntax',
    description: 'Declaring reusable logic with functions and modern arrow functions.',
    lessons: [
      {
        id: 'js-s2-l1',
        stageId: 'js-s2',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Arrow Functions and Returns',
        content: `## Arrow Functions

Arrow functions provide a concise syntax and lexical \`this\` binding:

\`\`\`javascript
// Standard function
function add(a, b) {
  return a + b;
}

// Arrow function with explicit body
const multiply = (a, b) => {
  return a * b;
};

// Concise arrow function (implicit return)
const square = x => x * x;
\`\`\`

If there is only one expression, you can omit the curly braces and the \`return\` keyword is implied.`,
        exercise: {
          id: 'js-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Which arrow function correctly doubles a number with an implicit return?',
          options: ['const d = n => { n * 2 }', 'const d = n => n * 2', 'const d = (n) => return n * 2', 'const d = (n) { n * 2 }'],
          correctAnswer: 1,
          explanation:
            '`const d = n => n * 2` uses an implicit return because it omits curly braces. With curly braces, explicit `return` is required.',
          hint: 'No curly braces means implicit return.',
        },
      },
    ],
  },
  {
    id: 'js-s3',
    courseId: 'javascript-basics',
    order: 3,
    title: 'Arrays & Functional Methods',
    description: 'Transform collections with map, filter, and reduce.',
    lessons: [
      {
        id: 'js-s3-l1',
        stageId: 'js-s3',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Transforming Arrays with .map() and .filter()',
        content: `## Array Transformations

Modern JS favors immutable array transformations over manual \`for\` loops:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Filter even numbers:
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// Map to double each number:
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
\`\`\`

Both \`.map()\` and \`.filter()\` return a **new** array without mutating the original.`,
        exercise: {
          id: 'js-s3-l1-ex',
          type: 'code-output',
          question: 'What is the length of `[10, 15, 20, 25].filter(x => x > 15)`?',
          correctAnswer: '2',
          explanation: 'Only numbers strictly greater than 15 (20 and 25) pass the filter, resulting in an array of 2 elements.',
          hint: 'Count which numbers are strictly greater than 15.',
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
    title: 'Semantic HTML5 Architecture',
    description: 'Accessible structure with semantic HTML tags and page layout.',
    lessons: [
      {
        id: 'web-s1-l1',
        stageId: 'web-s1',
        courseId: 'web-development',
        order: 1,
        title: 'Building with Semantic Tags',
        content: `## Why Semantics Matter

Instead of nesting infinite generic \`<div>\` elements, semantic HTML describes its meaning to browsers, screen readers, and search engines:

- \`<header>\`: Introductory content or navigational aids
- \`<nav>\`: Major navigation links
- \`<main>\`: The dominant content of the document (only one per page!)
- \`<article>\`: Self-contained, syndicatable content (e.g., blog post)
- \`<section>\`: Thematic grouping of content with a heading
- \`<footer>\`: Author, copyright, or related document links

\`\`\`html
<header>
  <nav><a href="/">Home</a></nav>
</header>
<main>
  <article><h1>Title</h1><p>Body</p></article>
</main>
\`\`\``,
        exercise: {
          id: 'web-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which tag should contain the unique primary content of a webpage (only one per page)?',
          options: ['<section>', '<main>', '<article>', '<content>'],
          correctAnswer: 1,
          explanation:
            '`<main>` is the semantic container specifically reserved for the central, non-repeating content of a document.',
          hint: 'It is the main section of the site.',
        },
      },
    ],
  },
  {
    id: 'web-s2',
    courseId: 'web-development',
    order: 2,
    title: 'Modern CSS: Flexbox & Layout',
    description: 'Aligning and distributing space with Flexbox.',
    lessons: [
      {
        id: 'web-s2-l1',
        stageId: 'web-s2',
        courseId: 'web-development',
        order: 1,
        title: 'Centering and Distributing with Flexbox',
        content: `## Flexbox Core Properties

Flexbox operates along two axes: the **main axis** (horizontal by default) and the **cross axis** (vertical by default).

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* distributes along main axis */
  align-items: center;          /* centers along cross axis */
  gap: 1.5rem;                  /* space between items */
}
\`\`\`

To vertically and horizontally center any element inside a container:
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
          question: 'Which property aligns flex items along the cross axis (vertically in row direction)?',
          options: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'],
          correctAnswer: 1,
          explanation: '`align-items` controls alignment along the cross axis, while `justify-content` controls the main axis.',
          hint: 'justify = main axis, align = cross axis.',
        },
      },
    ],
  },
  {
    id: 'web-s3',
    courseId: 'web-development',
    order: 3,
    title: 'Responsive Design & Viewports',
    description: 'Media queries, fluid layouts, and mobile-first principles.',
    lessons: [
      {
        id: 'web-s3-l1',
        stageId: 'web-s3',
        courseId: 'web-development',
        order: 1,
        title: 'Mobile-First Breakpoints',
        content: `## Mobile-First Strategy

Mobile-first means you write base styles for small mobile screens first, then progressively enhance layout on wider viewports using \`min-width\` media queries:

\`\`\`css
/* Base: Mobile single column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Tablet & Desktop enhancement */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
\`\`\`

Always include the meta viewport tag in HTML:
\`<meta name="viewport" content="width=device-width, initial-scale=1">\``,
        exercise: {
          id: 'web-s3-l1-ex',
          type: 'multiple-choice',
          question: 'In mobile-first responsive design, which media query feature is standard?',
          options: ['max-width', 'min-width', 'device-height', 'screen-only'],
          correctAnswer: 1,
          explanation:
            '`@media (min-width: ...)` applies rules as the screen expands, aligning with the mobile-first philosophy of progressive enhancement.',
          hint: 'We start at 0 width and enhance from a minimum width upward.',
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
