import type { Course, Stage } from '@/lib/types';

// ─── 1. JavaScript Essentials ────────────────────────────────────────────────
const jsStages: Stage[] = [
  {
    id: 'js-s1',
    courseId: 'javascript-basics',
    order: 1,
    title: 'Syntax, Variables & Functions',
    description: 'Learn modern const/let declarations, primitive data types, and function syntax.',
    lessons: [
      {
        id: 'js-s1-l1',
        stageId: 'js-s1',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Modern Variables: const, let & Types',
        content: `## Declaring Variables in Modern JavaScript

In modern JavaScript (ES6+), avoid legacy \`var\`. Instead, use:
- **const**: For values and references that will not be reassigned (your default choice!).
- **let**: For variables that will change over time (e.g. counters, accumulators).

\`\`\`javascript
const siteName = "Kivora"; // String
const birthYear = 2004;     // Number
let score = 0;              // Mutable variable
score += 10;                // Allowed with let!
const isActive = true;      // Boolean
\`\`\`

## JavaScript Primitive Types
- \`string\`, \`number\`, \`boolean\`
- \`null\`, \`undefined\`
- \`symbol\`, \`bigint\`

The \`typeof\` operator inspects the type of any value at runtime: \`typeof 42 === "number"\`.`,
        exercise: {
          id: 'js-s1-l1-ex1',
          type: 'code-output',
          question: 'What does `typeof "Hello"` evaluate to in JavaScript?',
          correctAnswer: 'string',
          explanation: '"Hello" is a text primitive, so `typeof "Hello"` returns the string "string".',
          hint: 'The data type for text in JavaScript.',
        },
        exercises: [
          {
            id: 'js-s1-l1-ex1',
            type: 'code-output',
            question: 'What does `typeof "Hello"` evaluate to in JavaScript?',
            correctAnswer: 'string',
            explanation: '"Hello" is a text primitive, so `typeof "Hello"` returns the string "string".',
            hint: 'The data type for text in JavaScript.',
          },
          {
            id: 'js-s1-l1-ex2',
            type: 'multiple-choice',
            question: 'Which keyword should be used by default for variables that will not be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correctAnswer: 2,
            explanation: '`const` is the recommended default in modern JavaScript because it prevents accidental reassignment.',
            hint: 'Short for constant.',
          },
          {
            id: 'js-s1-l1-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nlet count = 5;\ncount += 3;\nconsole.log(count);\n```',
            correctAnswer: '8',
            explanation: '`count += 3` adds 3 to 5, updating `count` to 8.',
            hint: '5 + 3.',
          },
        ],
      },
      {
        id: 'js-s1-l2',
        stageId: 'js-s1',
        courseId: 'javascript-basics',
        order: 2,
        title: 'Functions & Arrow Syntax',
        content: `## Functions in JavaScript

A function bundles reusable logic into a callable block.

\`\`\`javascript
// 1. Traditional function declaration
function calculateArea(width, height) {
  return width * height;
}

// 2. Arrow function with body block
const multiply = (a, b) => {
  return a * b;
};

// 3. Concise arrow function with implicit return
const square = x => x * x;
\`\`\`

## Implicit Return
When an arrow function has only a single expression without curly braces \`{}\`, it automatically returns the result without needing the \`return\` keyword.`,
        exercise: {
          id: 'js-s1-l2-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```javascript\nconst double = n => n * 2;\nconsole.log(double(6));\n```',
          correctAnswer: '12',
          explanation: 'The arrow function `double` multiplies its argument 6 by 2 with an implicit return, producing 12.',
          hint: 'Multiply 6 by 2.',
        },
        exercises: [
          {
            id: 'js-s1-l2-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst double = n => n * 2;\nconsole.log(double(6));\n```',
            correctAnswer: '12',
            explanation: 'The arrow function `double` multiplies its argument 6 by 2 with an implicit return, producing 12.',
            hint: 'Multiply 6 by 2.',
          },
          {
            id: 'js-s1-l2-ex2',
            type: 'multiple-choice',
            question: 'Which arrow function correctly doubles a number with an implicit return?',
            options: ['const d = n => { n * 2 }', 'const d = n => n * 2', 'const d = (n) => return n * 2', 'const d = (n) { n * 2 }'],
            correctAnswer: 1,
            explanation: '`const d = n => n * 2` uses implicit return by omitting curly braces. With braces `{}`, `return` is required.',
            hint: 'No curly braces means automatic return.',
          },
          {
            id: 'js-s1-l2-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst add = (a, b) => a + b;\nconsole.log(add(10, 25));\n```',
            correctAnswer: '35',
            explanation: '`add(10, 25)` evaluates 10 + 25 = 35 and returns it.',
            hint: '10 + 25.',
          },
        ],
      },
      {
        id: 'js-s1-l3',
        stageId: 'js-s1',
        courseId: 'javascript-basics',
        order: 3,
        title: 'Conditionals & Strict Equality',
        content: `## Strict Equality: === vs ==

Always use strict equality (\`===\`) in JavaScript. It compares both **value** and **type** without implicit type coercion:

\`\`\`javascript
5 === 5     // true (both are number 5)
5 === "5"   // false (number !== string)
5 == "5"    // true (danger: implicit coercion!)
\`\`\`

## Ternary Operator: condition ? a : b
A compact expression for inline branching:

\`\`\`javascript
const score = 85;
const result = score >= 60 ? "Pass" : "Fail";
console.log(result); // "Pass"
\`\`\``,
        exercise: {
          id: 'js-s1-l3-ex1',
          type: 'code-output',
          question: 'What is the boolean result of `(42 === "42")` in JavaScript?',
          correctAnswer: 'false',
          explanation: 'Strict equality `===` checks both value and type without conversion. Number 42 is not equal to string "42".',
          hint: 'Are a number and a string the same data type?',
        },
        exercises: [
          {
            id: 'js-s1-l3-ex1',
            type: 'code-output',
            question: 'What is the boolean result of `(42 === "42")` in JavaScript?',
            correctAnswer: 'false',
            explanation: 'Strict equality `===` checks both value and type without conversion. Number 42 is not equal to string "42".',
            hint: 'Are a number and a string the same data type?',
          },
          {
            id: 'js-s1-l3-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst age = 19;\nconst status = age >= 18 ? "adult" : "minor";\nconsole.log(status);\n```',
            correctAnswer: 'adult',
            explanation: '`19 >= 18` is true, so the ternary operator evaluates the first branch: "adult".',
            hint: 'Is 19 >= 18?',
          },
          {
            id: 'js-s1-l3-ex3',
            type: 'multiple-choice',
            question: 'Why is `===` strongly preferred over `==` in JavaScript?',
            options: ['It runs faster on CPUs', 'It avoids unexpected type coercion bugs', 'It only works with numbers', 'It is required by HTML5'],
            correctAnswer: 1,
            explanation: '`===` prevents subtle bugs caused by JavaScript\'s automatic type coercion rules.',
            hint: 'Type safety and predictability.',
          },
        ],
      },
    ],
  },
  {
    id: 'js-s2',
    courseId: 'javascript-basics',
    order: 2,
    title: 'Collections & Modern ES6+',
    description: 'Transform arrays with .map() and .filter(), and master objects and destructuring.',
    lessons: [
      {
        id: 'js-s2-l1',
        stageId: 'js-s2',
        courseId: 'javascript-basics',
        order: 1,
        title: 'Array Methods: map, filter & find',
        content: `## Immutable Array Transformations

Modern JavaScript uses declarative methods instead of manual loops:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// .filter(): keeps items that satisfy the condition
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// .map(): transforms each item into a new value
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// .find(): returns the first matching element
const firstBig = numbers.find(n => n > 3); // 4
\`\`\`

Both \`.map()\` and \`.filter()\` return a **new** array without modifying the original.`,
        exercise: {
          id: 'js-s2-l1-ex1',
          type: 'code-output',
          question: 'What is the length of `[10, 15, 20, 25].filter(x => x > 15)`?',
          correctAnswer: '2',
          explanation: 'Only 20 and 25 are strictly greater than 15. The resulting array has 2 elements.',
          hint: 'How many numbers in the array are strictly greater than 15?',
        },
        exercises: [
          {
            id: 'js-s2-l1-ex1',
            type: 'code-output',
            question: 'What is the length of `[10, 15, 20, 25].filter(x => x > 15)`?',
            correctAnswer: '2',
            explanation: 'Only 20 and 25 are strictly greater than 15. The resulting array has 2 elements.',
            hint: 'How many numbers in the array are strictly greater than 15?',
          },
          {
            id: 'js-s2-l1-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst nums = [1, 2, 3];\nconst squares = nums.map(n => n * n);\nconsole.log(squares[1]);\n```',
            correctAnswer: '4',
            explanation: 'The mapped array is `[1, 4, 9]`. At index 1, the value is 4.',
            hint: 'Index 1 of [1, 4, 9].',
          },
          {
            id: 'js-s2-l1-ex3',
            type: 'multiple-choice',
            question: 'Does `.map()` modify the original array in place?',
            options: ['Yes, it overwrites the original', 'No, it returns a new array', 'Only if the array has numbers', 'Only in strict mode'],
            correctAnswer: 1,
            explanation: '`.map()` is non-mutating: it creates and returns a brand-new array leaving the original unchanged.',
            hint: 'Modern JS methods are immutable.',
          },
        ],
      },
      {
        id: 'js-s2-l2',
        stageId: 'js-s2',
        courseId: 'javascript-basics',
        order: 2,
        title: 'Objects, Destructuring & Spread',
        content: `## Objects and Key-Value Data

Objects group related properties and state:

\`\`\`javascript
const user = {
  id: 101,
  name: "Alex",
  role: "Developer",
  country: "Kyrgyzstan"
};
\`\`\`

## Object Destructuring
Extract properties cleanly without repeating \`user.\`:

\`\`\`javascript
const { name, role } = user;
console.log(f"{name} works as {role}");
\`\`\`

## Spread Operator (...)
Copy and merge objects easily:

\`\`\`javascript
const updatedUser = {
  ...user,
  score: 100 // Adds or overrides property
};
\`\`\``,
        exercise: {
          id: 'js-s2-l2-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```javascript\nconst profile = { name: "Maria", city: "Bishkek" };\nconst { city } = profile;\nconsole.log(city);\n```',
          correctAnswer: 'Bishkek',
          explanation: 'Destructuring `{ city }` extracts the `"Bishkek"` value from the `profile` object.',
          hint: 'The extracted property is city.',
        },
        exercises: [
          {
            id: 'js-s2-l2-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst profile = { name: "Maria", city: "Bishkek" };\nconst { city } = profile;\nconsole.log(city);\n```',
            correctAnswer: 'Bishkek',
            explanation: 'Destructuring `{ city }` extracts the `"Bishkek"` value from the `profile` object.',
            hint: 'The extracted property is city.',
          },
          {
            id: 'js-s2-l2-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst a = [1, 2];\nconst b = [...a, 3];\nconsole.log(b.length);\n```',
            correctAnswer: '3',
            explanation: 'The spread operator `...a` unpacks 1 and 2, and appending 3 produces `[1, 2, 3]` with length 3.',
            hint: 'Count elements in [1, 2, 3].',
          },
          {
            id: 'js-s2-l2-ex3',
            type: 'multiple-choice',
            question: 'Which syntax operator is used for spreading objects and arrays?',
            options: ['...', '::', '->', '&&'],
            correctAnswer: 0,
            explanation: 'The three dots `...` represent the spread / rest operator in modern JavaScript.',
            hint: 'Three consecutive dots.',
          },
        ],
      },
      {
        id: 'js-s2-l3',
        stageId: 'js-s2',
        courseId: 'javascript-basics',
        order: 3,
        title: 'Template Literals & String Methods',
        content: `## Backtick Template Literals

Template literals use backticks (\`\` \`...\` \`\`) to support embedded expressions and multi-line strings:

\`\`\`javascript
const course = "JavaScript";
const lessons = 9;

const summary = \`Course \${course} has \${lessons} lessons.\`;
console.log(summary);
\`\`\`

## Useful String Methods
- \`str.includes("Kivora")\`: Returns boolean whether substring exists.
- \`str.trim()\`: Strips whitespace from both ends.
- \`str.toLowerCase()\`: Converts to lowercase.
- \`str.slice(0, 4)\`: Extracts portion of string.`,
        exercise: {
          id: 'js-s2-l3-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```javascript\nconst text = "  learn JS  ";\nconsole.log(text.trim());\n```',
          correctAnswer: 'learn JS',
          explanation: '`.trim()` removes whitespace from both the beginning and end of the string.',
          hint: 'The string without leading or trailing spaces.',
        },
        exercises: [
          {
            id: 'js-s2-l3-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nconst text = "  learn JS  ";\nconsole.log(text.trim());\n```',
            correctAnswer: 'learn JS',
            explanation: '`.trim()` removes whitespace from both the beginning and end of the string.',
            hint: 'The string without leading or trailing spaces.',
          },
          {
            id: 'js-s2-l3-ex2',
            type: 'code-output',
            question: 'What does `"hello world".includes("world")` evaluate to?',
            correctAnswer: 'true',
            explanation: 'The substring "world" is present in "hello world", so `.includes()` returns true.',
            hint: 'Boolean true or false.',
          },
          {
            id: 'js-s2-l3-ex3',
            type: 'multiple-choice',
            question: 'Which characters enclose a JavaScript template literal?',
            options: ['Single quotes (\' \')', 'Double quotes (" ")', 'Backticks (` `)', 'Square brackets ([ ])'],
            correctAnswer: 2,
            explanation: 'Template literals must be wrapped in backtick characters (` `).',
            hint: 'The key below Esc on most keyboards.',
          },
        ],
      },
    ],
  },
  {
    id: 'js-s3',
    courseId: 'javascript-basics',
    order: 3,
    title: 'DOM & Interactive Events',
    description: 'Query HTML elements, attach click event listeners, and build interactive interfaces.',
    lessons: [
      {
        id: 'js-s3-l1',
        stageId: 'js-s3',
        courseId: 'javascript-basics',
        order: 1,
        title: 'DOM Querying & Text Content',
        content: `## The Document Object Model (DOM)

The DOM represents HTML elements as JavaScript objects you can inspect and modify:

\`\`\`javascript
// Select an element using any CSS selector:
const heading = document.querySelector("#title");
const button = document.querySelector(".btn-submit");

// Update its text content safely:
heading.textContent = "Welcome to Kivora!";

// Update classes:
button.classList.add("active");
\`\`\`

## textContent vs innerHTML
- **\`textContent\`**: Safely sets plain text without risk of XSS injection attacks.
- **\`innerHTML\`**: Parses HTML tags (use with caution with user input).`,
        exercise: {
          id: 'js-s3-l1-ex1',
          type: 'multiple-choice',
          question: 'Which DOM method selects the first element matching a CSS selector?',
          options: ['document.getElement', 'document.querySelector', 'document.findAll', 'document.search'],
          correctAnswer: 1,
          explanation: '`document.querySelector()` accepts any valid CSS selector string and returns the first matching element.',
          hint: 'Standard DOM method with query in its name.',
        },
        exercises: [
          {
            id: 'js-s3-l1-ex1',
            type: 'multiple-choice',
            question: 'Which DOM method selects the first element matching a CSS selector?',
            options: ['document.getElement', 'document.querySelector', 'document.findAll', 'document.search'],
            correctAnswer: 1,
            explanation: '`document.querySelector()` accepts any valid CSS selector string and returns the first matching element.',
            hint: 'Standard DOM method with query in its name.',
          },
          {
            id: 'js-s3-l1-ex2',
            type: 'multiple-choice',
            question: 'Which property safely updates an element\'s plain text without parsing HTML?',
            options: ['innerHTML', 'textContent', 'outerHTML', 'nodeHTML'],
            correctAnswer: 1,
            explanation: '`textContent` treats all input as plain text, preventing cross-site scripting (XSS) vulnerabilities.',
            hint: 'Focuses on pure text content.',
          },
          {
            id: 'js-s3-l1-ex3',
            type: 'fill-blank',
            question: 'Complete the selector to find an element with id="main": `document.querySelector("___main")`',
            correctAnswer: '#',
            explanation: 'In CSS selectors, the hash `#` denotes an ID.',
            hint: 'The hash symbol.',
          },
        ],
      },
      {
        id: 'js-s3-l2',
        stageId: 'js-s3',
        courseId: 'javascript-basics',
        order: 2,
        title: 'Event Listeners & User Interaction',
        content: `## Handling Events with addEventListener

Make pages interactive by reacting to user actions:

\`\`\`javascript
const button = document.querySelector("#counter-btn");
let count = 0;

button.addEventListener("click", () => {
  count += 1;
  button.textContent = \`Clicked: \${count}\`;
});
\`\`\`

## Common DOM Events
- \`click\`: User clicks an element
- \`input\`: User types into a text input
- \`submit\`: User submits a form
- \`keydown\`: User presses a keyboard key`,
        exercise: {
          id: 'js-s3-l2-ex1',
          type: 'multiple-choice',
          question: 'Which method connects an event callback to a DOM element?',
          options: ['attachEvent', 'addEventListener', 'onEvent', 'listenTo'],
          correctAnswer: 1,
          explanation: '`addEventListener(eventName, handler)` is the standard modern DOM method for event handling.',
          hint: 'Standard 16-letter method.',
        },
        exercises: [
          {
            id: 'js-s3-l2-ex1',
            type: 'multiple-choice',
            question: 'Which method connects an event callback to a DOM element?',
            options: ['attachEvent', 'addEventListener', 'onEvent', 'listenTo'],
            correctAnswer: 1,
            explanation: '`addEventListener(eventName, handler)` is the standard modern DOM method for event handling.',
            hint: 'Standard 16-letter method.',
          },
          {
            id: 'js-s3-l2-ex2',
            type: 'fill-blank',
            question: 'Name the event triggered when a user clicks an element: `btn.addEventListener("___", ...)`',
            correctAnswer: 'click',
            explanation: 'The standard mouse click event is named `"click"`.',
            hint: '5 letters starting with c.',
          },
          {
            id: 'js-s3-l2-ex3',
            type: 'multiple-choice',
            question: 'What event triggers as a user types into an `<input>` field?',
            options: ['change', 'input', 'press', 'type'],
            correctAnswer: 1,
            explanation: 'The `"input"` event fires immediately on every keystroke as the user modifies the field value.',
            hint: 'Fires on each input modification.',
          },
        ],
      },
      {
        id: 'js-s3-l3',
        stageId: 'js-s3',
        courseId: 'javascript-basics',
        order: 3,
        title: 'Mini-Project: Interactive Click Counter',
        content: `## Capstone Mini-Project: Interactive State

Let\'s build a responsive counter component that changes styling dynamically:

\`\`\`javascript
const display = document.querySelector("#count-display");
const plusBtn = document.querySelector("#plus-btn");
const minusBtn = document.querySelector("#minus-btn");

let counter = 0;

function updateDisplay() {
  display.textContent = counter;
  if (counter > 0) {
    display.classList.add("text-success");
  } else if (counter < 0) {
    display.classList.add("text-danger");
  } else {
    display.className = "font-bold text-foreground";
  }
}

plusBtn.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

minusBtn.addEventListener("click", () => {
  counter -= 1;
  updateDisplay();
});
\`\`\`

## Architecture Takeaway
State (\`counter\`) drives the UI. When state changes, we re-render the view via \`updateDisplay()\`.`,
        exercise: {
          id: 'js-s3-l3-ex1',
          type: 'code-output',
          question: 'If `counter` starts at 0, plusBtn is clicked twice, and minusBtn once, what is `counter`?',
          correctAnswer: '1',
          explanation: '0 + 1 + 1 - 1 = 1.',
          hint: '0 + 2 - 1.',
        },
        exercises: [
          {
            id: 'js-s3-l3-ex1',
            type: 'code-output',
            question: 'If `counter` starts at 0, plusBtn is clicked twice, and minusBtn once, what is `counter`?',
            correctAnswer: '1',
            explanation: '0 + 1 + 1 - 1 = 1.',
            hint: '0 + 2 - 1.',
          },
          {
            id: 'js-s3-l3-ex2',
            type: 'multiple-choice',
            question: 'What is the role of `updateDisplay()` in the mini-project architecture?',
            options: ['It saves data to a database', 'It syncs the DOM with the updated counter state', 'It prevents clicking', 'It navigates to another page'],
            correctAnswer: 1,
            explanation: '`updateDisplay()` reads the current application state (`counter`) and updates the DOM text and classes.',
            hint: 'Keeps UI in sync with state.',
          },
          {
            id: 'js-s3-l3-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```javascript\nlet val = 10;\nval = val * 2;\nconsole.log(val);\n```',
            correctAnswer: '20',
            explanation: '10 * 2 = 20.',
            hint: '10 multiplied by 2.',
          },
        ],
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
    title: 'HTML5 Semantic Architecture',
    description: 'Learn accessible document structure, headings, links, lists, media, and interactive forms.',
    lessons: [
      {
        id: 'web-s1-l1',
        stageId: 'web-s1',
        courseId: 'web-development',
        order: 1,
        title: 'Semantic HTML5 Elements',
        content: `## Why Semantic HTML Matters

Semantic elements give clear meaning to both the browser and assistive technologies (screen readers), ensuring accessibility (a11y) and optimal SEO:

- \`<header>\`: Introductory container for branding, site title, and navigation.
- \`<nav>\`: Designates primary navigational links.
- \`<main>\`: Holds the unique, dominant content of the page (**only one per document!**).
- \`<article>\`: Self-contained, independently distributable content (e.g. blog post, card).
- \`<section>\`: Thematic grouping of content with a heading.
- \`<footer>\`: Bottom section containing copyrights, legal notices, and contact info.

\`\`\`html
<header>
  <nav><a href="/">Kivora Home</a></nav>
</header>
<main>
  <article>
    <h1>Modern Web Development</h1>
    <p>Semantic tags structure accessible interfaces.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 Kivora Platform</p>
</footer>
\`\`\``,
        exercise: {
          id: 'web-s1-l1-ex1',
          type: 'multiple-choice',
          question: 'Which HTML5 tag is designated specifically for primary navigation links?',
          options: ['<menu-bar>', '<nav>', '<navigation>', '<links>'],
          correctAnswer: 1,
          explanation: 'The `<nav>` tag is standard in HTML5 for navigation link groups.',
          hint: '3-letter abbreviation for navigation.',
        },
        exercises: [
          {
            id: 'web-s1-l1-ex1',
            type: 'multiple-choice',
            question: 'Which HTML5 tag is designated specifically for primary navigation links?',
            options: ['<menu-bar>', '<nav>', '<navigation>', '<links>'],
            correctAnswer: 1,
            explanation: 'The `<nav>` tag is standard in HTML5 for navigation link groups.',
            hint: '3-letter abbreviation for navigation.',
          },
          {
            id: 'web-s1-l1-ex2',
            type: 'multiple-choice',
            question: 'How many `<main>` elements should exist in a single valid HTML document?',
            options: ['Zero or more', 'Exactly one unique to the page', 'One per section', 'Unlimited'],
            correctAnswer: 1,
            explanation: 'According to W3C specifications, an HTML page should only have one visible `<main>` tag representing the core document content.',
            hint: 'Core document content should be unique.',
          },
          {
            id: 'web-s1-l1-ex3',
            type: 'fill-blank',
            question: 'Fill in the closing tag for an article block: `<article>...</___>`',
            correctAnswer: 'article',
            explanation: 'In HTML, tags are closed using the slash followed by the tag name, like `</article>`.',
            hint: 'Same name as opening tag.',
          },
        ],
      },
      {
        id: 'web-s1-l2',
        stageId: 'web-s1',
        courseId: 'web-development',
        order: 2,
        title: 'Headings, Lists & Links',
        content: `## Content Hierarchy: Headings <h1> through <h6>

Headings establish an accessible outline:
- \`<h1>\`: Primary title of the page (use only one per page for SEO).
- \`<h2>\`: Major section headings.
- \`<h3>\`: Subsections within an \`<h2>\`.

\`\`\`html
<h1>Kivora Courses</h1>
<h2>Web Development Track</h2>
<h3>Module 1: HTML Basics</h3>
\`\`\`

## Lists: Ordered & Unordered
- \`<ul>\`: Unordered list (bullet points)
- \`<ol>\`: Ordered list (numbered sequence)
- \`<li>\`: List item inside either list type

## Hyperlinks with <a>
\`\`\`html
<a href="https://kivora.org" target="_blank" rel="noopener">Visit Kivora</a>
\`\`\``,
        exercise: {
          id: 'web-s1-l2-ex1',
          type: 'multiple-choice',
          question: 'Which tag represents a numbered, ordered list in HTML?',
          options: ['<ul>', '<ol>', '<dl>', '<list>'],
          correctAnswer: 1,
          explanation: '`<ol>` stands for Ordered List and numbers items sequentially (1, 2, 3...).',
          hint: 'Short for ordered list.',
        },
        exercises: [
          {
            id: 'web-s1-l2-ex1',
            type: 'multiple-choice',
            question: 'Which tag represents a numbered, ordered list in HTML?',
            options: ['<ul>', '<ol>', '<dl>', '<list>'],
            correctAnswer: 1,
            explanation: '`<ol>` stands for Ordered List and numbers items sequentially (1, 2, 3...).',
            hint: 'Short for ordered list.',
          },
          {
            id: 'web-s1-l2-ex2',
            type: 'multiple-choice',
            question: 'Which attribute defines the destination URL in an `<a>` anchor tag?',
            options: ['src', 'href', 'link', 'url'],
            correctAnswer: 1,
            explanation: 'The `href` (Hypertext REFerence) attribute specifies the target URL.',
            hint: '4 letters starting with h.',
          },
          {
            id: 'web-s1-l2-ex3',
            type: 'fill-blank',
            question: 'What tag wraps every individual list item? `<___>Item text</li>`',
            correctAnswer: 'li',
            explanation: '`<li>` (List Item) is the required child tag inside `<ul>` and `<ol>`.',
            hint: '2-letter abbreviation for list item.',
          },
        ],
      },
      {
        id: 'web-s1-l3',
        stageId: 'web-s1',
        courseId: 'web-development',
        order: 3,
        title: 'Media & Interactive Forms',
        content: `## Images with Alt Text

The \`<img>\` tag is self-closing and requires an \`alt\` attribute for screen readers:

\`\`\`html
<img src="/logo.png" alt="Kivora Platform Logo" width="120" height="40" />
\`\`\`

## Interactive Forms
Forms collect input from users:

\`\`\`html
<form action="/login" method="POST">
  <label for="email">Email address:</label>
  <input type="email" id="email" name="user_email" required placeholder="you@domain.com" />

  <label for="pwd">Password:</label>
  <input type="password" id="pwd" name="user_pwd" required />

  <button type="submit">Log In</button>
</form>
\`\`\`

The \`<label for="id">\` connects labels to inputs, enhancing accessibility and mobile usability.`,
        exercise: {
          id: 'web-s1-l3-ex1',
          type: 'multiple-choice',
          question: 'Why is the `alt` attribute essential on `<img>` tags?',
          options: ['It changes the image resolution', 'It provides text for screen readers and search engines', 'It adds a drop shadow', 'It prevents right-clicking'],
          correctAnswer: 1,
          explanation: 'The `alt` attribute provides accessible alternative text for assistive technologies when images cannot be displayed.',
          hint: 'Accessibility and SEO.',
        },
        exercises: [
          {
            id: 'web-s1-l3-ex1',
            type: 'multiple-choice',
            question: 'Why is the `alt` attribute essential on `<img>` tags?',
            options: ['It changes the image resolution', 'It provides text for screen readers and search engines', 'It adds a drop shadow', 'It prevents right-clicking'],
            correctAnswer: 1,
            explanation: 'The `alt` attribute provides accessible alternative text for assistive technologies when images cannot be displayed.',
            hint: 'Accessibility and SEO.',
          },
          {
            id: 'web-s1-l3-ex2',
            type: 'fill-blank',
            question: 'Which input type masks user keystrokes for secure credentials? `<input type="___">`',
            correctAnswer: 'password',
            explanation: '`<input type="password">` hides typed characters as dots or asterisks.',
            hint: 'Word for secret credentials.',
          },
          {
            id: 'web-s1-l3-ex3',
            type: 'multiple-choice',
            question: 'Which tag groups related form elements and provides action and method attributes?',
            options: ['<fieldset>', '<form>', '<input-group>', '<section>'],
            correctAnswer: 1,
            explanation: 'The `<form>` tag wraps interactive form controls.',
            hint: 'Short 4-letter tag.',
          },
        ],
      },
    ],
  },
  {
    id: 'web-s2',
    courseId: 'web-development',
    order: 2,
    title: 'CSS Fundamentals & Box Model',
    description: 'Style documents with selectors, cascade, specificity, box model, colors, and typography.',
    lessons: [
      {
        id: 'web-s2-l1',
        stageId: 'web-s2',
        courseId: 'web-development',
        order: 1,
        title: 'CSS Selectors & Specificity',
        content: `## How CSS Selects Elements

CSS targets HTML elements using selectors:

\`\`\`css
/* 1. Element Selector: targets all <p> tags */
p {
  color: #1D1D1F;
  line-height: 1.6;
}

/* 2. Class Selector (.): targets elements with class="card" */
.card {
  background: #FFFFFF;
  border-radius: 12px;
}

/* 3. ID Selector (#): targets single unique element */
#main-header {
  border-bottom: 1px solid #E5E5EA;
}
\`\`\`

## Specificity Hierarchy
When multiple rules target the same element:
1. **Inline styles** (\`style="..."\`): highest priority
2. **IDs** (\`#header\`): 100 points
3. **Classes & Pseudo-classes** (\`.card\`, \`:hover\`): 10 points
4. **Element tags** (\`p\`, \`div\`): 1 point`,
        exercise: {
          id: 'web-s2-l1-ex1',
          type: 'multiple-choice',
          question: 'Which character prefixes a class selector in CSS?',
          options: ['#', '.', '$', '@'],
          correctAnswer: 1,
          explanation: 'In CSS, classes are prefixed with a dot `.`, while IDs are prefixed with a hash `#`.',
          hint: 'A single dot.',
        },
        exercises: [
          {
            id: 'web-s2-l1-ex1',
            type: 'multiple-choice',
            question: 'Which character prefixes a class selector in CSS?',
            options: ['#', '.', '$', '@'],
            correctAnswer: 1,
            explanation: 'In CSS, classes are prefixed with a dot `.`, while IDs are prefixed with a hash `#`.',
            hint: 'A single dot.',
          },
          {
            id: 'web-s2-l1-ex2',
            type: 'multiple-choice',
            question: 'Which selector has higher specificity: `#header` or `.header`?',
            options: ['#header', '.header', 'They have identical specificity', 'Depends on font size'],
            correctAnswer: 0,
            explanation: 'An ID selector `#` has specificity (1, 0, 0), overriding class selectors (0, 1, 0).',
            hint: 'ID is more specific than class.',
          },
          {
            id: 'web-s2-l1-ex3',
            type: 'fill-blank',
            question: 'Prefix for ID selectors in CSS: `___header { color: red; }`',
            correctAnswer: '#',
            explanation: 'The hash symbol `#` targets element IDs in CSS.',
            hint: 'Hash or pound symbol.',
          },
        ],
      },
      {
        id: 'web-s2-l2',
        stageId: 'web-s2',
        courseId: 'web-development',
        order: 2,
        title: 'The CSS Box Model',
        content: `## The 4 Layers of the Box Model

Every element on a web page is rendered as a rectangular box composed of 4 concentric layers:

1. **Content**: The actual text, image, or media.
2. **Padding**: Transparent spacing **inside** the border around content.
3. **Border**: The line surrounding the padding.
4. **Margin**: Transparent spacing **outside** the border separating adjacent elements.

\`\`\`css
.box {
  width: 300px;
  padding: 16px;           /* Inside space */
  border: 2px solid #0071E3; /* Boundary line */
  margin: 24px;            /* Outside space */
  box-sizing: border-box;  /* Critical: width includes padding & border! */
}
\`\`\`

## box-sizing: border-box
Always use \`box-sizing: border-box;\`. It ensures that \`width\` and \`height\` encompass padding and borders, preventing layout overflow!`,
        exercise: {
          id: 'web-s2-l2-ex1',
          type: 'multiple-choice',
          question: 'Which box model property creates transparent space INSIDE the border around content?',
          options: ['margin', 'padding', 'outline', 'gap'],
          correctAnswer: 1,
          explanation: '`padding` is the internal clearing space between content and its border. `margin` is external.',
          hint: 'Starts with p.',
        },
        exercises: [
          {
            id: 'web-s2-l2-ex1',
            type: 'multiple-choice',
            question: 'Which box model property creates transparent space INSIDE the border around content?',
            options: ['margin', 'padding', 'outline', 'gap'],
            correctAnswer: 1,
            explanation: '`padding` is the internal clearing space between content and its border. `margin` is external.',
            hint: 'Starts with p.',
          },
          {
            id: 'web-s2-l2-ex2',
            type: 'multiple-choice',
            question: 'Why is `box-sizing: border-box` considered modern best practice?',
            options: ['It speeds up internet connection', 'It includes padding and border within the declared width/height', 'It enables 3D rendering', 'It turns all text blue'],
            correctAnswer: 1,
            explanation: '`border-box` prevents padding from expanding the element beyond its set width.',
            hint: 'Predictable width calculation.',
          },
          {
            id: 'web-s2-l2-ex3',
            type: 'fill-blank',
            question: 'Property for external space outside the border: `___: 20px;`',
            correctAnswer: 'margin',
            explanation: '`margin` creates external clearing around an element.',
            hint: '6 letters starting with m.',
          },
        ],
      },
      {
        id: 'web-s2-l3',
        stageId: 'web-s2',
        courseId: 'web-development',
        order: 3,
        title: 'Colors, Typography & Rounded Corners',
        content: `## Colors & Transparency

CSS supports multiple color formats:
- Hex: \`#0071E3\` (Apple Blue)
- RGB / RGBA: \`rgba(0, 113, 227, 0.1)\` (color with 10% opacity)
- HSL / HSLA: \`hsl(210, 100%, 45%)\`

## Typography Essentials
\`\`\`css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
}
\`\`\`

## Rounded Corners with border-radius
\`\`\`css
.card {
  border-radius: 16px; /* Smooth corners */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
\`\`\``,
        exercise: {
          id: 'web-s2-l3-ex1',
          type: 'multiple-choice',
          question: 'Which CSS property creates rounded corners on an element?',
          options: ['corner-round', 'border-radius', 'box-curve', 'border-round'],
          correctAnswer: 1,
          explanation: '`border-radius` softens element corners by applying a circular or elliptical radius.',
          hint: 'Contains radius.',
        },
        exercises: [
          {
            id: 'web-s2-l3-ex1',
            type: 'multiple-choice',
            question: 'Which CSS property creates rounded corners on an element?',
            options: ['corner-round', 'border-radius', 'box-curve', 'border-round'],
            correctAnswer: 1,
            explanation: '`border-radius` softens element corners by applying a circular or elliptical radius.',
            hint: 'Contains radius.',
          },
          {
            id: 'web-s2-l3-ex2',
            type: 'fill-blank',
            question: "What does the 'A' stand for in RGBA color format? `___`",
            correctAnswer: 'alpha',
            explanation: "In RGBA, 'A' stands for Alpha, which controls transparency from 0.0 (transparent) to 1.0 (opaque).",
            hint: 'First letter of the Greek alphabet.',
          },
          {
            id: 'web-s2-l3-ex3',
            type: 'code-output',
            question: 'What line-height value is recommended for comfortable paragraph reading in web body text?',
            options: ['0.8', '1.0', '1.6', '4.0'],
            correctAnswer: 2,
            explanation: 'A line-height between 1.5 and 1.7 provides optimal typographical readability for human eyes.',
            hint: 'Between 1.5 and 1.7.',
          },
        ],
      },
    ],
  },
  {
    id: 'web-s3',
    courseId: 'web-development',
    order: 3,
    title: 'Modern Layout: Flexbox & CSS Grid',
    description: 'Distribute elements across axes with Flexbox and build 2D multi-column layouts with CSS Grid.',
    lessons: [
      {
        id: 'web-s3-l1',
        stageId: 'web-s3',
        courseId: 'web-development',
        order: 1,
        title: 'Flexbox: Alignment & Distribution',
        content: `## One-Dimensional Layout: Flexbox

Flexbox controls layout along a single axis (row or column):

\`\`\`css
.nav-bar {
  display: flex;
  justify-content: space-between; /* Main Axis: push items to ends */
  align-items: center;          /* Cross Axis: vertically center */
  gap: 16px;                    /* Spacing between child elements */
}
\`\`\`

## Key Flexbox Properties
- \`justify-content\`: \`flex-start\`, \`center\`, \`space-between\`, \`space-around\`
- \`align-items\`: \`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`
- \`flex-direction\`: \`row\` (default) or \`column\`
- \`gap\`: clean spacing between flex items without manual margin hacks!`,
        exercise: {
          id: 'web-s3-l1-ex1',
          type: 'multiple-choice',
          question: 'Which property aligns elements along the MAIN axis in a flex container?',
          options: ['align-items', 'justify-content', 'align-content', 'flex-align'],
          correctAnswer: 1,
          explanation: '`justify-content` distributes items along the main axis. `align-items` controls the cross axis.',
          hint: 'Justify controls main axis spacing.',
        },
        exercises: [
          {
            id: 'web-s3-l1-ex1',
            type: 'multiple-choice',
            question: 'Which property aligns elements along the MAIN axis in a flex container?',
            options: ['align-items', 'justify-content', 'align-content', 'flex-align'],
            correctAnswer: 1,
            explanation: '`justify-content` distributes items along the main axis. `align-items` controls the cross axis.',
            hint: 'Justify controls main axis spacing.',
          },
          {
            id: 'web-s3-l1-ex2',
            type: 'multiple-choice',
            question: 'How do you vertically center flex items along the cross axis?',
            options: ['align-items: center;', 'justify-content: middle;', 'vertical-align: middle;', 'text-align: center;'],
            correctAnswer: 0,
            explanation: '`align-items: center;` vertically centers child elements along the cross axis in a row container.',
            hint: 'align-items with center.',
          },
          {
            id: 'web-s3-l1-ex3',
            type: 'fill-blank',
            question: 'Property that adds space between flex items: `___: 16px;`',
            correctAnswer: 'gap',
            explanation: 'The `gap` property cleanly separates flex and grid items without margins.',
            hint: '3-letter word.',
          },
        ],
      },
      {
        id: 'web-s3-l2',
        stageId: 'web-s3',
        courseId: 'web-development',
        order: 2,
        title: 'CSS Grid: Two-Dimensional Layouts',
        content: `## Two-Dimensional Grids

While Flexbox is 1D (row or column), CSS Grid handles both rows **and** columns simultaneously:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 24px;                             /* Gutter spacing */
}
\`\`\`

## Responsive Auto-Fit Columns
You can build grids that adapt automatically without media queries:

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
\`\`\`

This automatically wraps cards into 1, 2, 3, or 4 columns depending on screen width!`,
        exercise: {
          id: 'web-s3-l2-ex1',
          type: 'multiple-choice',
          question: 'What does the `1fr` unit represent in CSS Grid?',
          options: ['1 fixed pixel', '1 fraction of available space', '1 frame per second', '1 font size'],
          correctAnswer: 1,
          explanation: '`1fr` stands for one fraction of the remaining free space inside the grid container.',
          hint: 'fr stands for fraction of space.',
        },
        exercises: [
          {
            id: 'web-s3-l2-ex1',
            type: 'multiple-choice',
            question: 'What does the `1fr` unit represent in CSS Grid?',
            options: ['1 fixed pixel', '1 fraction of available space', '1 frame per second', '1 font size'],
            correctAnswer: 1,
            explanation: '`1fr` stands for one fraction of the remaining free space inside the grid container.',
            hint: 'fr stands for fraction of space.',
          },
          {
            id: 'web-s3-l2-ex2',
            type: 'multiple-choice',
            question: 'Which display value creates a grid formatting context?',
            options: ['display: flex;', 'display: grid;', 'display: table;', 'display: block;'],
            correctAnswer: 1,
            explanation: '`display: grid;` declares a CSS Grid container on the parent element.',
            hint: 'display: grid.',
          },
          {
            id: 'web-s3-l2-ex3',
            type: 'fill-blank',
            question: 'CSS property defining column tracks: `grid-template-___: 1fr 1fr;`',
            correctAnswer: 'columns',
            explanation: '`grid-template-columns` defines the width and count of vertical column tracks in CSS Grid.',
            hint: 'Word for vertical tracks.',
          },
        ],
      },
    ],
  },
  {
    id: 'web-s4',
    courseId: 'web-development',
    order: 4,
    title: 'Responsive Design & Capstone',
    description: 'Adapt layouts to mobile screens with media queries and build an interactive product card.',
    lessons: [
      {
        id: 'web-s4-l1',
        stageId: 'web-s4',
        courseId: 'web-development',
        order: 1,
        title: 'Media Queries & Mobile-First Design',
        content: `## Mobile-First Philosophy

In Mobile-First design, write baseline styles for small smartphone screens first, then use \`@media (min-width: ...)\` to progressively enhance for larger tablets and desktops:

\`\`\`css
/* Mobile base styles (default) */
.layout {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

/* Tablet & Desktop enhancement (768px and up) */
@media (min-width: 768px) {
  .layout {
    flex-direction: row;
    padding: 32px;
  }
}
\`\`\`

## Essential Viewport Meta Tag
Always include this in your HTML \`<head>\`:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\`\`\``,
        exercise: {
          id: 'web-s4-l1-ex1',
          type: 'multiple-choice',
          question: 'Which CSS rule applies styles conditionally based on screen width?',
          options: ['@import', '@media', '@screen', '@responsive'],
          correctAnswer: 1,
          explanation: '`@media` queries allow conditional CSS application based on viewport characteristics.',
          hint: 'Starts with @media.',
        },
        exercises: [
          {
            id: 'web-s4-l1-ex1',
            type: 'multiple-choice',
            question: 'Which CSS rule applies styles conditionally based on screen width?',
            options: ['@import', '@media', '@screen', '@responsive'],
            correctAnswer: 1,
            explanation: '`@media` queries allow conditional CSS application based on viewport characteristics.',
            hint: 'Starts with @media.',
          },
          {
            id: 'web-s4-l1-ex2',
            type: 'multiple-choice',
            question: 'What does a Mobile-First architecture prioritize in media queries?',
            options: ['max-width queries', 'min-width queries expanding for larger screens', 'Fixed desktop widths', 'Disabling mobile viewports'],
            correctAnswer: 1,
            explanation: 'Mobile-first builds the mobile foundation first, using `min-width` queries to progressively expand for desktop screens.',
            hint: 'min-width queries.',
          },
          {
            id: 'web-s4-l1-ex3',
            type: 'fill-blank',
            question: 'HTML tag that enables proper mobile scaling: `<meta name="___" ...>`',
            correctAnswer: 'viewport',
            explanation: 'The viewport meta tag configures mobile screen scaling and dimensions.',
            hint: 'Word for the visible area of a web page.',
          },
        ],
      },
      {
        id: 'web-s4-l2',
        stageId: 'web-s4',
        courseId: 'web-development',
        order: 2,
        title: 'Capstone: Responsive Card Component',
        content: `## Capstone Mini-Project

Let\'s combine everything: semantic HTML5, Flexbox, Box Model, rounded corners, and responsive media queries!

\`\`\`html
<article class="course-card">
  <div class="card-badge">Bestseller</div>
  <h3 class="card-title">Python Fundamentals</h3>
  <p class="card-desc">Master programming from zero with hands-on practice.</p>
  <div class="card-footer">
    <span class="price">$0.00</span>
    <button class="btn-enroll">Start Learning</button>
  </div>
</article>
\`\`\`

\`\`\`css
.course-card {
  background: #FFFFFF;
  border: 1px solid #E5E5EA;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
\`\`\``,
        exercise: {
          id: 'web-s4-l2-ex1',
          type: 'multiple-choice',
          question: 'Which semantic HTML tag best wraps a self-contained card component?',
          options: ['<div>', '<article>', '<span>', '<aside>'],
          correctAnswer: 1,
          explanation: '`<article>` represents an independent, reusable self-contained component like a product or course card.',
          hint: 'Independent content block.',
        },
        exercises: [
          {
            id: 'web-s4-l2-ex1',
            type: 'multiple-choice',
            question: 'Which semantic HTML tag best wraps a self-contained card component?',
            options: ['<div>', '<article>', '<span>', '<aside>'],
            correctAnswer: 1,
            explanation: '`<article>` represents an independent, reusable self-contained component like a product or course card.',
            hint: 'Independent content block.',
          },
          {
            id: 'web-s4-l2-ex2',
            type: 'multiple-choice',
            question: 'How does `margin-top: auto` behave inside a flex-direction: column card?',
            options: ['It centers the element horizontally', 'It pushes the footer to the very bottom of the card', 'It hides the footer', 'It makes the card full screen'],
            correctAnswer: 1,
            explanation: 'Inside a vertical flex container, `margin-top: auto` absorbs all remaining vertical space, anchoring the footer to the bottom.',
            hint: 'Pushes element to the bottom.',
          },
          {
            id: 'web-s4-l2-ex3',
            type: 'fill-blank',
            question: 'CSS property for smooth soft card drop-shadows: `box-___: 0 4px 16px rgba(...);`',
            correctAnswer: 'shadow',
            explanation: '`box-shadow` creates depth and elevation behind boxes.',
            hint: 'Word for shadow.',
          },
        ],
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
