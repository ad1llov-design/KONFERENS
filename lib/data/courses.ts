import type { Course, CourseId, Stage, Lesson } from '@/lib/types';
import { LANGUAGE_COURSES } from './courses/languages';
import { TECH_COURSES } from './courses/tech';
import { PROFESSIONAL_COURSES } from './courses/professional';

// ─────────────────────────────────────────────────────────────────────────────
// Python Fundamentals
// ─────────────────────────────────────────────────────────────────────────────

const pythonStages: Stage[] = [
  {
    id: 'py-s1',
    courseId: 'python-fundamentals',
    order: 1,
    title: 'Variables & Types',
    description: 'Store and work with different kinds of data.',
    lessons: [
      {
        id: 'py-s1-l1',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'What is a Variable?',
        content: `## Variables store values

A **variable** is a named container that holds a value. In Python, you create a variable simply by writing a name, an equals sign, and a value:

\`\`\`python
name = "Alice"
age  = 22
score = 9.5
\`\`\`

The variable name is on the left, the value on the right. Python figures out the type automatically.

## Naming rules

- Use letters, digits, and underscores: \`user_score\`, \`item1\`
- Must start with a letter or underscore — not a digit
- Python is case-sensitive: \`Score\` and \`score\` are different variables
- Choose descriptive names; avoid \`x\`, \`y\` for real data`,
        exercise: {
          id: 'py-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which variable name is valid in Python?',
          options: ['1st_place', 'first place', 'first_place', 'first-place'],
          correctAnswer: 2,
          explanation:
            '`first_place` is valid: it starts with a letter and uses only underscores as separators. Numbers at the start (1st_place), spaces (first place), and hyphens (first-place) are not allowed.',
          hint: 'Spaces and hyphens are not allowed in variable names.',
        },
      },
      {
        id: 'py-s1-l2',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'Numbers and Strings',
        content: `## Two essential types

**Integers** (\`int\`) are whole numbers: \`42\`, \`-7\`, \`0\`

**Floats** (\`float\`) have a decimal point: \`3.14\`, \`-0.5\`

**Strings** (\`str\`) are text, wrapped in quotes:

\`\`\`python
greeting = "Hello, world!"
pi       = 3.14159
year     = 2024
\`\`\`

## Combining strings

Use \`+\` to join strings, or an **f-string** for cleaner formatting:

\`\`\`python
name  = "Alex"
age   = 20
print(f"My name is {name} and I am {age} years old.")
# → My name is Alex and I am 20 years old.
\`\`\``,
        exercise: {
          id: 'py-s1-l2-ex',
          type: 'code-output',
          question:
            'What does this code print?\n\n```python\nx = 5\ny = 2\nprint(x + y)\n```',
          correctAnswer: '7',
          explanation:
            '`x + y` adds the integer 5 and the integer 2, giving 7. `print()` outputs it to the console.',
          hint: 'What is 5 + 2?',
        },
      },
      {
        id: 'py-s1-l3',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'Lists',
        content: `## Ordered collections

A **list** holds multiple values in order, separated by commas inside square brackets:

\`\`\`python
fruits  = ["apple", "banana", "cherry"]
scores  = [88, 92, 75, 100]
mixed   = [1, "hello", True]
\`\`\`

## Accessing items

Python counts from zero. The first item is at index **0**:

\`\`\`python
fruits[0]  # "apple"
fruits[2]  # "cherry"
fruits[-1] # "cherry" (last item)
\`\`\`

## Useful list operations

\`\`\`python
len(fruits)       # 3  — number of items
fruits.append("date")  # add to the end
fruits[1] = "blueberry" # replace by index
\`\`\``,
        exercise: {
          id: 'py-s1-l3-ex',
          type: 'code-output',
          question:
            'What does this code print?\n\n```python\ncolors = ["red", "green", "blue"]\nprint(colors[1])\n```',
          correctAnswer: 'green',
          explanation:
            'Lists are zero-indexed. `colors[0]` is "red", `colors[1]` is "green", and `colors[2]` is "blue".',
          hint: 'Remember: Python starts counting from 0.',
        },
      },
    ],
  },
  {
    id: 'py-s2',
    courseId: 'python-fundamentals',
    order: 2,
    title: 'Control Flow',
    description: 'Make decisions and repeat actions in your programs.',
    lessons: [
      {
        id: 'py-s2-l1',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'if / elif / else',
        content: `## Conditional logic

Your program can choose different paths depending on conditions:

\`\`\`python
temperature = 28

if temperature > 30:
    print("It's hot!")
elif temperature > 20:
    print("It's warm.")
else:
    print("It's cool.")
\`\`\`

The code above prints **"It's warm."** because 28 > 20 but not > 30.

## Comparison operators

| Operator | Meaning |
|---|---|
| \`==\` | equal to |
| \`!=\` | not equal to |
| \`>\` / \`<\` | greater / less than |
| \`>=\` / \`<=\` | greater-or-equal / less-or-equal |

## Indentation matters

Python uses indentation (4 spaces) to group code blocks. A wrong indent is a syntax error.`,
        exercise: {
          id: 'py-s2-l1-ex',
          type: 'multiple-choice',
          question:
            'Given `score = 55`, what does this code print?\n\n```python\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")\n```',
          options: ['A', 'B', 'C', 'Nothing'],
          correctAnswer: 2,
          explanation:
            '55 is not ≥ 90, so the first branch is skipped. 55 is not ≥ 60, so the elif is skipped. The else runs and prints "C".',
          hint: 'Check each condition in order: is 55 ≥ 90? Then ≥ 60?',
        },
      },
      {
        id: 'py-s2-l2',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'for Loops',
        content: `## Repeating with for

A \`for\` loop runs the same block of code for each item in a sequence:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry
\`\`\`

## range()

\`range(n)\` generates numbers from 0 to n-1:

\`\`\`python
for i in range(5):
    print(i)   # prints 0, 1, 2, 3, 4
\`\`\`

\`range(start, stop)\` starts at \`start\`:

\`\`\`python
for i in range(1, 6):
    print(i)   # prints 1, 2, 3, 4, 5
\`\`\``,
        exercise: {
          id: 'py-s2-l2-ex',
          type: 'code-output',
          question:
            'What is the last number printed?\n\n```python\nfor i in range(3):\n    print(i)\n```',
          correctAnswer: '2',
          explanation:
            '`range(3)` produces 0, 1, 2. The loop prints each in order, so the last number printed is 2.',
          hint: 'range(3) starts at 0 and stops before 3.',
        },
      },
      {
        id: 'py-s2-l3',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'while Loops',
        content: `## Repeat while a condition holds

A \`while\` loop repeats as long as its condition is \`True\`:

\`\`\`python
count = 0

while count < 3:
    print(count)
    count += 1
# 0
# 1
# 2
\`\`\`

## break — exit early

\`break\` stops the loop immediately:

\`\`\`python
while True:
    answer = input("Type 'quit' to stop: ")
    if answer == "quit":
        break
    print(f"You typed: {answer}")
\`\`\`

## Avoid infinite loops

Always make sure your condition will eventually become \`False\`, or include a \`break\`.`,
        exercise: {
          id: 'py-s2-l3-ex',
          type: 'multiple-choice',
          question:
            'How many times does "Hello" print?\n\n```python\nn = 0\nwhile n < 4:\n    print("Hello")\n    n += 1\n```',
          options: ['3', '4', '5', 'Infinite'],
          correctAnswer: 1,
          explanation:
            'The loop runs while n < 4. n starts at 0 and increments: 0, 1, 2, 3 — all less than 4, so "Hello" prints 4 times. When n reaches 4, the condition is False and the loop stops.',
          hint: 'Trace through: what values does n take?',
        },
      },
    ],
  },
  {
    id: 'py-s3',
    courseId: 'python-fundamentals',
    order: 3,
    title: 'Functions',
    description: 'Organise reusable logic into named blocks.',
    lessons: [
      {
        id: 'py-s3-l1',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'Defining Functions',
        content: `## What is a function?

A function is a named block of code you can run any number of times. Define it with \`def\`:

\`\`\`python
def greet():
    print("Hello, learner!")

greet()   # call it
greet()   # call it again
\`\`\`

## Why use functions?

- **Avoid repetition** — write once, use many times
- **Organise code** — give logical chunks a name
- **Make testing easier** — test each function separately`,
        exercise: {
          id: 'py-s3-l1-ex',
          type: 'fill-blank',
          question:
            'Complete the code to define a function called `welcome`:\n\n```python\n___ welcome():\n    print("Welcome to Kivora!")\n```',
          correctAnswer: 'def',
          explanation:
            'In Python, functions are defined with the `def` keyword, followed by the function name and parentheses.',
          hint: 'The keyword that starts a function definition.',
        },
      },
      {
        id: 'py-s3-l2',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'Parameters & Return',
        content: `## Passing data in and out

**Parameters** let you pass data into a function:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Maria")   # Hello, Maria!
greet("Carlos")  # Hello, Carlos!
\`\`\`

**return** sends a value back to the caller:

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8
\`\`\`

## Default parameters

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ana")           # Hello, Ana!
greet("Ana", "Hi")     # Hi, Ana!
\`\`\``,
        exercise: {
          id: 'py-s3-l2-ex',
          type: 'code-output',
          question:
            'What does this code print?\n\n```python\ndef multiply(a, b):\n    return a * b\n\nprint(multiply(4, 3))\n```',
          correctAnswer: '12',
          explanation:
            'The function `multiply` returns `a * b`. Calling it with 4 and 3 returns 12, which `print()` outputs.',
          hint: 'What is 4 × 3?',
        },
      },
      {
        id: 'py-s3-l3',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'Built-in Functions',
        content: `## Python's ready-made tools

Python comes with many useful functions you don't need to define yourself:

| Function | What it does | Example |
|---|---|---|
| \`print()\` | Display output | \`print("hi")\` |
| \`len()\` | Length of a list/string | \`len([1,2,3])\` → 3 |
| \`type()\` | Type of a value | \`type(42)\` → \`<class 'int'>\` |
| \`int()\` | Convert to integer | \`int("5")\` → 5 |
| \`str()\` | Convert to string | \`str(42)\` → "42" |
| \`range()\` | Sequence of numbers | \`range(5)\` → 0..4 |
| \`max()\` / \`min()\` | Largest / smallest | \`max(3, 7, 2)\` → 7 |
| \`sum()\` | Sum of a list | \`sum([1,2,3])\` → 6 |`,
        exercise: {
          id: 'py-s3-l3-ex',
          type: 'code-output',
          question:
            'What does this code print?\n\n```python\nwords = ["cat", "elephant", "bee"]\nprint(len(words))\n```',
          correctAnswer: '3',
          explanation:
            '`len()` returns the number of items in the list. The list has 3 items ("cat", "elephant", "bee"), so `len(words)` is 3.',
          hint: 'Count the items in the list.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// English A1–A2
// ─────────────────────────────────────────────────────────────────────────────

const englishStages: Stage[] = [
  {
    id: 'en-s1',
    courseId: 'english-a1-a2',
    order: 1,
    title: 'Greetings & Basics',
    description: 'Say hello, introduce yourself, and use essential words.',
    lessons: [
      {
        id: 'en-s1-l1',
        stageId: 'en-s1',
        courseId: 'english-a1-a2',
        order: 1,
        title: 'Hello & Goodbye',
        content: `## Greetings in English

Meeting someone for the first time, or at different times of day:

| Situation | What to say |
|---|---|
| Morning | Good morning! |
| Afternoon | Good afternoon! |
| Evening | Good evening! |
| Any time (informal) | Hi! / Hey! |
| Formal first meeting | How do you do? |

## Saying goodbye

- **Goodbye** — formal
- **Bye / Bye-bye** — informal
- **See you later / See you tomorrow** — when you will meet again
- **Take care** — friendly and warm
- **Have a good day!** — polite and common

## Introducing yourself

> "Hi, my name is Ana. What's your name?"
> "Nice to meet you, Ana. I'm Carlos."
> "Nice to meet you too!"`,
        exercise: {
          id: 'en-s1-l1-ex',
          type: 'multiple-choice',
          question:
            'Which phrase is the most appropriate greeting in a formal business meeting at 10 a.m.?',
          options: [
            'Hey, what\'s up?',
            'Good morning!',
            'Good night!',
            'See you later!',
          ],
          correctAnswer: 1,
          explanation:
            '"Good morning!" is a polite, formal greeting used before noon. "Hey, what\'s up?" is too casual for a business context. "Good night" is a farewell, not a greeting. "See you later" is also a farewell.',
          hint: 'Think about the time of day and the formal setting.',
        },
      },
      {
        id: 'en-s1-l2',
        stageId: 'en-s1',
        courseId: 'english-a1-a2',
        order: 2,
        title: 'Numbers 1–20',
        content: `## Cardinal numbers

Learning numbers is essential for shopping, time, and everyday conversation.

**1–10:**
one, two, three, four, five, six, seven, eight, nine, ten

**11–20:**
eleven, twelve, thirteen, fourteen, fifteen,
sixteen, seventeen, eighteen, nineteen, twenty

## Spelling patterns

- 13–19 all end in **-teen**: thirteen, fourteen…
- Notice the irregular ones: **eleven** (11) and **twelve** (12)

## Practical use

> "I need **three** tickets, please."
> "My phone number is **zero seven** …"
> "She is **nineteen** years old."`,
        exercise: {
          id: 'en-s1-l2-ex',
          type: 'translation',
          question: 'Write the number 15 in words (lowercase English):',
          correctAnswer: 'fifteen',
          explanation:
            '15 is "fifteen". The -teen suffix applies to 13–19, but the base changes slightly: five → fif-teen.',
          hint: 'Five → fif... then add -teen.',
        },
      },
      {
        id: 'en-s1-l3',
        stageId: 'en-s1',
        courseId: 'english-a1-a2',
        order: 3,
        title: 'Family Members',
        content: `## Family vocabulary

| English | Meaning |
|---|---|
| mother / mom | мама |
| father / dad | папа |
| sister | сестра |
| brother | брат |
| grandmother / grandma | бабушка |
| grandfather / grandpa | дедушка |
| aunt | тётя |
| uncle | дядя |
| cousin | двоюродный брат/сестра |
| daughter | дочь |
| son | сын |

## Example sentences

> "This is my **mother**. Her name is Maria."
> "I have one **sister** and two **brothers**."
> "My **grandparents** live in the countryside."`,
        exercise: {
          id: 'en-s1-l3-ex',
          type: 'multiple-choice',
          question:
            'Your father\'s mother is your ___.',
          options: ['aunt', 'cousin', 'grandmother', 'sister'],
          correctAnswer: 2,
          explanation:
            'Your father\'s mother is your grandmother. "Aunt" is a parent\'s sister, "cousin" is an aunt or uncle\'s child, and "sister" is a sibling.',
          hint: 'Think: your father\'s parents are your…',
        },
      },
    ],
  },
  {
    id: 'en-s2',
    courseId: 'english-a1-a2',
    order: 2,
    title: 'Everyday Phrases',
    description: 'Handle real situations: cafés, shops, and directions.',
    lessons: [
      {
        id: 'en-s2-l1',
        stageId: 'en-s2',
        courseId: 'english-a1-a2',
        order: 1,
        title: 'At a Café',
        content: `## Ordering in English

Knowing how to order at a café is one of the most practical skills for travellers.

**Customer:**
> "Could I have a coffee, please?"
> "I'd like a tea with milk."
> "What do you recommend?"
> "How much is it?"

**Staff:**
> "What can I get you?"
> "Would you like anything else?"
> "That's £3.50, please."
> "Here you go. Enjoy!"

## Useful phrases

- **Could I have…** — polite way to order
- **I'd like…** — slightly more formal
- **To go / take away** — to take with you
- **For here** — to eat/drink in the café`,
        exercise: {
          id: 'en-s2-l1-ex',
          type: 'fill-blank',
          question:
            'Complete the polite order:\n"___ I have a cappuccino, please?"',
          correctAnswer: 'Could',
          explanation:
            '"Could I have…" is the standard polite phrase for making a request in English. "Can" also works but is slightly less formal. "Would" is not followed by "I have" in this structure.',
          hint: '"___ I have a cappuccino?" — a polite modal verb.',
        },
      },
      {
        id: 'en-s2-l2',
        stageId: 'en-s2',
        courseId: 'english-a1-a2',
        order: 2,
        title: 'Asking for Directions',
        content: `## Finding your way

**Asking:**
> "Excuse me, how do I get to the train station?"
> "Is there a supermarket near here?"
> "How far is it?"

**Giving directions:**
> "Turn left at the traffic lights."
> "Go straight on."
> "Take the first right."
> "It's about five minutes on foot."
> "It's opposite the bank."

## Key direction words

| Word | Meaning |
|---|---|
| left | налево |
| right | направо |
| straight on | прямо |
| opposite | напротив |
| next to | рядом с |
| turn | повернуть |
| crossroads | перекрёсток |`,
        exercise: {
          id: 'en-s2-l2-ex',
          type: 'multiple-choice',
          question:
            'Someone says: "Take the first right." What do you do?',
          options: [
            'Turn left at the first junction',
            'Go straight for one block',
            'Turn right at the first junction',
            'Walk backwards',
          ],
          correctAnswer: 2,
          explanation:
            '"Take the first right" means turn right at the first junction or turning you encounter.',
          hint: '"Right" is направо.',
        },
      },
      {
        id: 'en-s2-l3',
        stageId: 'en-s2',
        courseId: 'english-a1-a2',
        order: 3,
        title: 'Shopping',
        content: `## In a shop

**Asking about items:**
> "Do you have this in blue?"
> "What size is this?"
> "How much does this cost?"
> "Is there a discount?"

**At the checkout:**
> "I'll take it."
> "Can I pay by card?"
> "Could I have a receipt, please?"

## Sizes and prices

- **Small / Medium / Large / Extra Large** (S / M / L / XL)
- Saying prices: **£12.99** = "twelve pounds ninety-nine"
- **\$5.00** = "five dollars"

## Useful vocabulary

| Word | Meaning |
|---|---|
| sale | распродажа |
| discount | скидка |
| receipt | чек |
| cash / card | наличные / карта |
| fitting room | примерочная |`,
        exercise: {
          id: 'en-s2-l3-ex',
          type: 'translation',
          question:
            'Translate to English: "Сколько это стоит?" (asking in a shop)',
          correctAnswer: 'How much does it cost',
          explanation:
            '"How much does it cost?" or "How much is it?" are both correct ways to ask the price of something in a shop.',
          hint: 'Start with "How much…"',
        },
      },
    ],
  },
  {
    id: 'en-s3',
    courseId: 'english-a1-a2',
    order: 3,
    title: 'Simple Sentences',
    description: 'Build correct sentences using present, past, and future.',
    lessons: [
      {
        id: 'en-s3-l1',
        stageId: 'en-s3',
        courseId: 'english-a1-a2',
        order: 1,
        title: 'Present Simple',
        content: `## Facts and habits

The **Present Simple** describes things that are generally true or happen regularly:

> "I live in Madrid."
> "She works at a school."
> "They play football every Saturday."

## Structure

| Subject | Verb |
|---|---|
| I / You / We / They | base form: **work** |
| He / She / It | base form + **s**: **works** |

**Negatives:** I don't work. She doesn't work.
**Questions:** Do you work? Does she work?

## Spelling — adding -s

- Most verbs: add **s** → plays, reads
- Verbs ending in -ch/-sh/-x/-o: add **es** → watches, goes
- Verb ending in consonant + y: change to **ies** → study → studies`,
        exercise: {
          id: 'en-s3-l1-ex',
          type: 'fill-blank',
          question:
            'Complete the sentence with the correct verb form:\n"She ___ (study) English every morning."',
          correctAnswer: 'studies',
          explanation:
            'With "She" (third person singular), we add -s to the verb. "Study" ends in consonant + y, so we change -y to -ies: "studies".',
          hint: 'He/She/It → verb ends in -s. What happens when verb ends in -y?',
        },
      },
      {
        id: 'en-s3-l2',
        stageId: 'en-s3',
        courseId: 'english-a1-a2',
        order: 2,
        title: 'Past Simple',
        content: `## Completed actions

The **Past Simple** describes actions that are finished:

> "I visited Paris last year."
> "She worked late yesterday."
> "We didn't watch the film."

## Regular verbs: add -ed

| Present | Past |
|---|---|
| work | worked |
| visit | visited |
| play | played |
| study | studied |

## Irregular verbs (must be memorised)

| Present | Past |
|---|---|
| go | went |
| see | saw |
| have | had |
| do | did |
| come | came |

**Questions:** Did you go? (not: Did you went?)
**Negatives:** I didn't go. She didn't see.`,
        exercise: {
          id: 'en-s3-l2-ex',
          type: 'multiple-choice',
          question:
            'Choose the correct past form:\n"Yesterday she ___ to the library."',
          options: ['go', 'goes', 'went', 'gone'],
          correctAnswer: 2,
          explanation:
            '"Go" is an irregular verb. Its Past Simple form is "went". "Goes" is Present Simple (she goes), "gone" is a past participle used with "have" (she has gone).',
          hint: '"Go" is irregular — it does not simply add -ed.',
        },
      },
      {
        id: 'en-s3-l3',
        stageId: 'en-s3',
        courseId: 'english-a1-a2',
        order: 3,
        title: 'Future with "will"',
        content: `## Talking about the future

Use **will** + base verb for predictions, spontaneous decisions, and promises:

> "I will call you tomorrow."
> "It will rain later."
> "We won't be late." (won't = will not)

## Structure

| Positive | I / You / He / She / They **will go** |
|---|---|
| Negative | I **won't go** (will not) |
| Question | **Will** you go? |

## Will vs Going to

- **will** → decision made right now, prediction
- **going to** → plan already decided

> Phone rings → "I **will** answer it." (spontaneous)
> "I **am going to** study medicine." (long-term plan)`,
        exercise: {
          id: 'en-s3-l3-ex',
          type: 'fill-blank',
          question:
            'Complete the sentence:\n"I ___ not be at school tomorrow — I have a doctor\'s appointment." (use the short form of "will not")',
          correctAnswer: "won't",
          explanation:
            '"Won\'t" is the contracted form of "will not". It is very common in spoken and informal written English.',
          hint: 'will not → w…\'t',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Course catalogue
// ─────────────────────────────────────────────────────────────────────────────

export const COURSES: Course[] = [
  // Technology
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    tagline: 'Write your first real programs.',
    description:
      'Start from zero and build a solid foundation in Python. You will understand how programs work, write readable code, and solve small real-world problems — step by step.',
    level: 'Beginner — no experience needed',
    category: 'programming',
    estimatedHours: 8,
    stages: pythonStages,
    topicsPreview: [
      'Variables & data types',
      'Control flow (if/for/while)',
      'Functions',
      'Lists & dictionaries',
      'File I/O (coming soon)',
      'Error handling (coming soon)',
    ],
  },
  ...TECH_COURSES,
  // Languages
  {
    id: 'english-a1-a2',
    title: 'English',
    tagline: 'From your first words to confident conversations.',
    description:
      'Build a practical foundation in English. You will learn everyday vocabulary, essential grammar, and real phrases you can use from day one.',
    level: 'A1 Beginner to A2 Elementary',
    category: 'languages',
    estimatedHours: 10,
    stages: englishStages,
    topicsPreview: [
      'Greetings & introductions',
      'Numbers, colours & family',
      'Everyday situations (café, shopping)',
      'Present, past & future tenses',
      'B1 Grammar (coming soon)',
      'Listening & reading (coming soon)',
    ],
  },
  ...LANGUAGE_COURSES,
  // Professional Skills
  ...PROFESSIONAL_COURSES,
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getCourse(id: CourseId): Course | undefined {
  return COURSES.find(c => c.id === id);
}

export function getStage(courseId: CourseId, stageId: string) {
  return getCourse(courseId)?.stages.find(s => s.id === stageId);
}

export function getLesson(courseId: CourseId, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  for (const stage of course.stages) {
    const lesson = stage.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getAllLessons(courseId: CourseId): Lesson[] {
  const course = getCourse(courseId);
  if (!course) return [];
  return course.stages.flatMap(s => s.lessons);
}

export function getFirstLesson(courseId: CourseId): Lesson | undefined {
  return getAllLessons(courseId)[0];
}

export function getNextLesson(
  courseId: CourseId,
  currentLessonId: string
): Lesson | undefined {
  const lessons = getAllLessons(courseId);
  const idx = lessons.findIndex(l => l.id === currentLessonId);
  if (idx === -1 || idx === lessons.length - 1) return undefined;
  return lessons[idx + 1];
}

export function getLessonStage(courseId: CourseId, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  return course.stages.find(s => s.lessons.some(l => l.id === lessonId));
}

export function getTotalLessons(courseId: CourseId): number {
  return getAllLessons(courseId).length;
}
