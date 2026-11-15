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
    title: 'Variables & Data Types',
    description: 'Store and manipulate numbers, text strings, and ordered collections.',
    lessons: [
      {
        id: 'py-s1-l1',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'Variables and Assignment',
        content: `## Variables Store Data

A **variable** is a named location in memory used to store values. In Python, you create a variable using the assignment operator \`=\`:

\`\`\`python
user_name = "Alice"
user_age = 22
account_balance = 150.75
is_active = True
\`\`\`

The variable name is on the left, and the value is on the right. Python automatically determines the data type.

## Naming Rules in Python

- Use letters, digits, and underscores (\`_\`): e.g., \`total_score\`, \`player_1\`
- Must start with a letter or underscore — **never a digit**
- Python is strictly case-sensitive: \`Score\` and \`score\` are different variables
- Adopt the **snake_case** convention with meaningful names (\`user_email\` instead of \`x\`)

## Line-by-Line Breakdown

\`\`\`python
score = 100        # Variable 'score' is initialized with integer 100
score = score + 25 # Evaluates 100 + 25 = 125, updates 'score'
print(score)       # Displays: 125
\`\`\`

## Summary
Variables store values and allow you to update and reuse calculations throughout your program.`,
        exercise: {
          id: 'py-s1-l1-ex1',
          type: 'multiple-choice',
          question: 'Which variable name is valid according to Python syntax rules?',
          options: ['1st_place', 'first place', 'first_place', 'first-place'],
          correctAnswer: 2,
          explanation: '`first_place` is valid: it starts with a letter and uses an underscore. Numbers at the start (1st_place), spaces, and hyphens are forbidden in Python.',
          hint: 'Variable names cannot start with numbers and cannot contain hyphens or spaces.',
        },
        exercises: [
          {
            id: 'py-s1-l1-ex1',
            type: 'multiple-choice',
            question: 'Which variable name is valid according to Python syntax rules?',
            options: ['1st_place', 'first place', 'first_place', 'first-place'],
            correctAnswer: 2,
            explanation: '`first_place` is valid: it starts with a letter and uses an underscore. Numbers at the start (1st_place), spaces, and hyphens are forbidden in Python.',
            hint: 'Variable names cannot start with numbers and cannot contain hyphens or spaces.',
          },
          {
            id: 'py-s1-l1-ex2',
            type: 'code-output',
            question: 'What does this code print to the console?\n\n```python\nx = 10\nx = x + 5\nprint(x)\n```',
            correctAnswer: '15',
            explanation: '`x` starts at 10. `x + 5` evaluates to 15, which is then assigned back to `x`. `print(x)` outputs 15.',
            hint: 'Calculate 10 + 5.',
          },
          {
            id: 'py-s1-l1-ex3',
            type: 'fill-blank',
            question: 'Complete the statement to print the value of `user_name`: `___(user_name)`',
            correctAnswer: 'print',
            explanation: '`print()` is Python\'s built-in function to display text and variable values.',
            hint: 'Standard 5-letter output function starting with p.',
          },
        ],
      },
      {
        id: 'py-s1-l2',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'Numbers, Math & F-Strings',
        content: `## Numeric Types: int and float

Python provides two primary numeric types:
- **int**: whole numbers (\`42\`, \`-7\`, \`0\`)
- **float**: decimal numbers (\`3.14\`, \`-0.5\`)

\`\`\`python
price = 19.99  # float
quantity = 3   # int
total = price * quantity  # 59.97 (float)
\`\`\`

## String Formatting with f-strings

Use modern **f-strings** (\`f"..."\`) to embed variables and expressions inside curly braces \`{}\`:

\`\`\`python
name = "Alex"
age = 20
print(f"Hello, {name}! In 5 years you will be {age + 5}.")
# Output: Hello, Alex! In 5 years you will be 25.
\`\`\`

## Arithmetic Operators
- \`+\` Addition, \`-\` Subtraction
- \`*\` Multiplication, \`/\` Float division (e.g. \`7 / 2 = 3.5\`)
- \`//\` Integer division (e.g. \`7 // 2 = 3\`)
- \`%\` Modulo remainder (e.g. \`7 % 2 = 1\`)`,
        exercise: {
          id: 'py-s1-l2-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```python\na = 9\nb = 2\nprint(a // b)\n```',
          correctAnswer: '4',
          explanation: 'Integer division `//` discards the fractional part: 9 divided by 2 is 4.5, so the result is 4.',
          hint: 'Integer division rounds down to the whole integer part.',
        },
        exercises: [
          {
            id: 'py-s1-l2-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\na = 9\nb = 2\nprint(a // b)\n```',
            correctAnswer: '4',
            explanation: 'Integer division `//` discards the fractional part: 9 divided by 2 is 4.5, so the result is 4.',
            hint: 'Integer division rounds down to the whole integer part.',
          },
          {
            id: 'py-s1-l2-ex2',
            type: 'multiple-choice',
            question: 'Which prefix activates variable interpolation inside `{}` in Python strings?',
            options: ['$', '@', 'f', 'v'],
            correctAnswer: 2,
            explanation: 'Placing the letter `f` immediately before the opening quote activates f-string formatting.',
            hint: 'Short for formatted string.',
          },
          {
            id: 'py-s1-l2-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nx = 11\ny = 3\nprint(x % y)\n```',
            correctAnswer: '2',
            explanation: 'The modulo operator `%` returns the remainder: 11 = 3 * 3 + 2, so the remainder is 2.',
            hint: 'What is the remainder when 11 is divided by 3?',
          },
        ],
      },
      {
        id: 'py-s1-l3',
        stageId: 'py-s1',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'Lists and Indexing',
        content: `## Ordered Collections: Lists

A **list** is an ordered, mutable collection of items in square brackets \`[]\`:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
scores = [95, 88, 72, 100]
mixed = ["Alice", 25, True]
\`\`\`

## Zero-Based Indexing
In Python, elements are indexed starting from **0**:
- \`fruits[0]\` is \`"apple"\` (first item)
- \`fruits[1]\` is \`"banana"\` (second item)
- \`fruits[-1]\` is \`"cherry"\` (negative index counts from the end)

## Essential List Operations
\`\`\`python
fruits.append("date") # Adds element to the end
len(fruits)           # Returns total count: 4
fruits[0] = "apricot" # Replaces element at index 0
\`\`\``,
        exercise: {
          id: 'py-s1-l3-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```python\ncolors = ["red", "green", "blue"]\nprint(colors[1])\n```',
          correctAnswer: 'green',
          explanation: 'Lists are zero-indexed. `colors[0]` is "red", and `colors[1]` is "green".',
          hint: 'Remember that the first element is at index 0.',
        },
        exercises: [
          {
            id: 'py-s1-l3-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ncolors = ["red", "green", "blue"]\nprint(colors[1])\n```',
            correctAnswer: 'green',
            explanation: 'Lists are zero-indexed. `colors[0]` is "red", and `colors[1]` is "green".',
            hint: 'Remember that the first element is at index 0.',
          },
          {
            id: 'py-s1-l3-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nitems = ["A", "B", "C"]\nitems.append("D")\nprint(len(items))\n```',
            correctAnswer: '4',
            explanation: 'Initial length is 3. `.append("D")` adds a fourth item. `len(items)` returns 4.',
            hint: 'Count total items after appending.',
          },
          {
            id: 'py-s1-l3-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nnums = [10, 20, 30, 40]\nprint(nums[-1])\n```',
            correctAnswer: '40',
            explanation: 'Negative index `-1` accesses the last element of the list, which is 40.',
            hint: 'Index -1 accesses the very last item.',
          },
        ],
      },
    ],
  },
  {
    id: 'py-s2',
    courseId: 'python-fundamentals',
    order: 2,
    title: 'Control Flow & Loops',
    description: 'Make decisions with if/elif/else and repeat tasks with for and while loops.',
    lessons: [
      {
        id: 'py-s2-l1',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'if / elif / else Statements',
        content: `## Branching Logic

Programs use conditionals to make decisions based on dynamic values:

\`\`\`python
temperature = 28

if temperature > 30:
    print("It's hot outside!")
elif temperature > 20:
    print("It's pleasant and warm.")
else:
    print("It's cool.")
\`\`\`

Python evaluates conditions top-to-bottom. As soon as one condition evaluates to \`True\`, its block executes and the rest are skipped.

## Comparison Operators
- \`==\` equal to, \`!=\` not equal to
- \`>\` greater than, \`<\` less than
- \`>=\` greater than or equal, \`<=\` less than or equal

## Indentation
In Python, 4 spaces of indentation define code blocks. Mismatched indentation causes an \`IndentationError\`.`,
        exercise: {
          id: 'py-s2-l1-ex1',
          type: 'multiple-choice',
          question: 'Given `score = 55`, what does this code print?\n\n```python\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")\n```',
          options: ['A', 'B', 'C', 'Nothing'],
          correctAnswer: 2,
          explanation: '55 is not >= 90 (first branch skipped). 55 is not >= 60 (elif skipped). The else branch executes and prints "C".',
          hint: 'Evaluate each condition in sequence: is 55 >= 90? Then >= 60?',
        },
        exercises: [
          {
            id: 'py-s2-l1-ex1',
            type: 'multiple-choice',
            question: 'Given `score = 55`, what does this code print?\n\n```python\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("B")\nelse:\n    print("C")\n```',
            options: ['A', 'B', 'C', 'Nothing'],
            correctAnswer: 2,
            explanation: '55 is not >= 90 (first branch skipped). 55 is not >= 60 (elif skipped). The else branch executes and prints "C".',
            hint: 'Evaluate each condition in sequence: is 55 >= 90? Then >= 60?',
          },
          {
            id: 'py-s2-l1-ex2',
            type: 'multiple-choice',
            question: 'Which operator checks for equality between two values in Python?',
            options: ['=', '==', '===', 'eq'],
            correctAnswer: 1,
            explanation: '`==` is the equality comparison operator. A single `=` is for assignment.',
            hint: 'Double equal sign tests equality.',
          },
          {
            id: 'py-s2-l1-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nx = 10\nif x == 10:\n    print("YES")\nelse:\n    print("NO")\n```',
            correctAnswer: 'YES',
            explanation: 'The condition `x == 10` is True, so the if block executes and prints "YES".',
            hint: 'Does x equal 10?',
          },
        ],
      },
      {
        id: 'py-s2-l2',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'for Loops & range()',
        content: `## Repeating Actions with for Loops

A \`for\` loop iterates over each item in a sequence or collection:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")
\`\`\`

## Generating Number Sequences with range()
- \`range(5)\` produces \`0, 1, 2, 3, 4\` (starts at 0, stops before 5)
- \`range(1, 6)\` produces \`1, 2, 3, 4, 5\`
- \`range(0, 10, 2)\` produces \`0, 2, 4, 6, 8\` (step of 2)

\`\`\`python
total = 0
for n in range(1, 4):  # 1, 2, 3
    total += n
print(total)  # 6
\`\`\``,
        exercise: {
          id: 'py-s2-l2-ex1',
          type: 'code-output',
          question: 'What is the last number printed by this loop?\n\n```python\nfor i in range(3):\n    print(i)\n```',
          correctAnswer: '2',
          explanation: '`range(3)` produces numbers 0, 1, 2. The loop stops before 3, so the last printed number is 2.',
          hint: 'range(n) starts at 0 and stops at n - 1.',
        },
        exercises: [
          {
            id: 'py-s2-l2-ex1',
            type: 'code-output',
            question: 'What is the last number printed by this loop?\n\n```python\nfor i in range(3):\n    print(i)\n```',
            correctAnswer: '2',
            explanation: '`range(3)` produces numbers 0, 1, 2. The loop stops before 3, so the last printed number is 2.',
            hint: 'range(n) starts at 0 and stops at n - 1.',
          },
          {
            id: 'py-s2-l2-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ncount = 0\nfor x in [5, 10, 15]:\n    count += 1\nprint(count)\n```',
            correctAnswer: '3',
            explanation: 'The loop iterates 3 times (once for each item in the list), incrementing `count` to 3.',
            hint: 'How many items are in the list?',
          },
          {
            id: 'py-s2-l2-ex3',
            type: 'multiple-choice',
            question: 'What numbers are generated by `range(2, 5)`?',
            options: ['[2, 3, 4, 5]', '[2, 3, 4]', '[0, 1, 2, 3, 4]', '[3, 4, 5]'],
            correctAnswer: 1,
            explanation: '`range(start, stop)` starts at `start` (2) and stops before `stop` (5), generating 2, 3, 4.',
            hint: 'Stop parameter is exclusive.',
          },
        ],
      },
      {
        id: 'py-s2-l3',
        stageId: 'py-s2',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'while Loops & break Statements',
        content: `## Conditional Repetition: while Loops

A \`while\` loop repeats as long as its condition remains \`True\`:

\`\`\`python
count = 1

while count <= 3:
    print(f"Step {count}")
    count += 1
# Step 1, Step 2, Step 3
\`\`\`

## Breaking Out Early with break
The \`break\` keyword exits a loop immediately:

\`\`\`python
number = 1
while True:
    if number == 4:
        break
    print(number)
    number += 1
# Prints: 1, 2, 3
\`\`\`

## Skipping Iterations with continue
The \`continue\` keyword skips the remainder of the current iteration and jumps to the next test.`,
        exercise: {
          id: 'py-s2-l3-ex1',
          type: 'code-output',
          question: 'How many times does this code print "Hi"?\n\n```python\nn = 0\nwhile n < 4:\n    print("Hi")\n    n += 1\n```',
          correctAnswer: '4',
          explanation: '`n` takes values 0, 1, 2, 3 (4 iterations). When `n` reaches 4, `n < 4` is False, and the loop terminates.',
          hint: 'Trace the values of n: 0, 1, 2, 3.',
        },
        exercises: [
          {
            id: 'py-s2-l3-ex1',
            type: 'code-output',
            question: 'How many times does this code print "Hi"?\n\n```python\nn = 0\nwhile n < 4:\n    print("Hi")\n    n += 1\n```',
            correctAnswer: '4',
            explanation: '`n` takes values 0, 1, 2, 3 (4 iterations). When `n` reaches 4, `n < 4` is False, and the loop terminates.',
            hint: 'Trace the values of n: 0, 1, 2, 3.',
          },
          {
            id: 'py-s2-l3-ex2',
            type: 'multiple-choice',
            question: 'Which statement immediately exits a loop in Python?',
            options: ['stop', 'exit', 'break', 'return'],
            correctAnswer: 2,
            explanation: 'The `break` statement immediately terminates the innermost enclosing loop.',
            hint: 'Starts with b.',
          },
          {
            id: 'py-s2-l3-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nx = 1\nwhile x < 10:\n    if x == 3:\n        break\n    x += 1\nprint(x)\n```',
            correctAnswer: '3',
            explanation: 'When `x` reaches 3, the if condition triggers `break`. The loop terminates and `print(x)` outputs 3.',
            hint: 'At what value does the break trigger?',
          },
        ],
      },
    ],
  },
  {
    id: 'py-s3',
    courseId: 'python-fundamentals',
    order: 3,
    title: 'Functions & Anatomy of def',
    description: 'Master function definitions, parameters, return values, and variable scope.',
    lessons: [
      {
        id: 'py-s3-l1',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'Anatomy of def & Function Basics',
        content: `## What is a Function?

A **function** is a reusable, named block of code that performs a specific action. You define functions in Python using the \`def\` keyword:

\`\`\`python
def greet_learner():
    print("Welcome to Python!")

greet_learner()  # Call the function
\`\`\`

## The 6 Essential Parts of a Function Definition
1. **\`def\` keyword**: Signals to Python that a function definition begins.
2. **Function Name**: Descriptive snake_case name (e.g., \`calculate_tax\`).
3. **Parameters in Parentheses \`()\`**: Input values accepted by the function.
4. **Colon \`:\`**: Concludes the definition header (mandatory!).
5. **Indented Body**: 4 spaces defining the block of code inside the function.
6. **Return Statement**: Sends the result back to the caller.

\`\`\`python
def calculate_area(width, height):
    return width * height

room_area = calculate_area(5, 4)
print(room_area)  # 20
\`\`\``,
        exercise: {
          id: 'py-s3-l1-ex1',
          type: 'fill-blank',
          question: 'Complete the line to define a function named `say_hello`: `___ say_hello():`',
          correctAnswer: 'def',
          explanation: 'In Python, functions are defined using the `def` keyword.',
          hint: 'The 3-letter keyword short for define.',
        },
        exercises: [
          {
            id: 'py-s3-l1-ex1',
            type: 'fill-blank',
            question: 'Complete the line to define a function named `say_hello`: `___ say_hello():`',
            correctAnswer: 'def',
            explanation: 'In Python, functions are defined using the `def` keyword.',
            hint: 'The 3-letter keyword short for define.',
          },
          {
            id: 'py-s3-l1-ex2',
            type: 'multiple-choice',
            question: 'What punctuation character MUST end the `def` header line in Python?',
            options: [';', '{', ':', '->'],
            correctAnswer: 2,
            explanation: 'A colon `:` is required at the end of the `def` header line in Python syntax.',
            hint: 'Two dots stacked vertically.',
          },
          {
            id: 'py-s3-l1-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ndef double(n):\n    return n * 2\n\nprint(double(7))\n```',
            correctAnswer: '14',
            explanation: '`double(7)` passes 7 as argument `n`, computes `7 * 2 = 14`, and returns it to `print()`.',
            hint: 'What is 7 * 2?',
          },
        ],
      },
      {
        id: 'py-s3-l2',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'Parameters & return vs print',
        content: `## Parameters: Passing Input Data

Parameters allow functions to accept dynamic arguments:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
\`\`\`

## return vs print: The Critical Difference
- **\`print()\`** merely displays text on the screen for humans to see. It does NOT save the value for the program to use.
- **\`return\`** passes the computed value back to the caller, allowing you to store it in a variable or use it in further calculations.

\`\`\`python
def add(a, b):
    return a + b

total = add(10, 20)  # total now stores 30!
print(total * 2)     # Outputs: 60
\`\`\`

If a function does not have a \`return\` statement, it implicitly returns \`None\`.`,
        exercise: {
          id: 'py-s3-l2-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```python\ndef multiply(x, y):\n    return x * y\n\nresult = multiply(4, 5)\nprint(result)\n```',
          correctAnswer: '20',
          explanation: '`multiply(4, 5)` returns 20, which is stored in `result` and printed.',
          hint: 'Multiply 4 by 5.',
        },
        exercises: [
          {
            id: 'py-s3-l2-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ndef multiply(x, y):\n    return x * y\n\nresult = multiply(4, 5)\nprint(result)\n```',
            correctAnswer: '20',
            explanation: '`multiply(4, 5)` returns 20, which is stored in `result` and printed.',
            hint: 'Multiply 4 by 5.',
          },
          {
            id: 'py-s3-l2-ex2',
            type: 'multiple-choice',
            question: 'What does a Python function return if it contains no `return` statement?',
            options: ['0', 'False', 'None', '"" (empty string)'],
            correctAnswer: 2,
            explanation: 'Python functions that do not explicitly return a value return `None` by default.',
            hint: 'Python\'s special null value.',
          },
          {
            id: 'py-s3-l2-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ndef square(n):\n    return n * n\n\nprint(square(3) + square(4))\n```',
            correctAnswer: '25',
            explanation: '`square(3)` is 9, `square(4)` is 16. `9 + 16 = 25`.',
            hint: 'Compute 3*3 + 4*4.',
          },
        ],
      },
      {
        id: 'py-s3-l3',
        stageId: 'py-s3',
        courseId: 'python-fundamentals',
        order: 3,
        title: 'Default Arguments & Scope',
        content: `## Default Parameter Values

You can provide default values for parameters. If the caller omits the argument, Python uses the default:

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))            # Hello, Alice!
print(greet("Bob", "Good morning")) # Good morning, Bob!
\`\`\`

## Local vs Global Scope
- **Local variables**: Created inside a function and only accessible within that function.
- **Global variables**: Defined outside all functions and accessible throughout the file.

\`\`\`python
bonus = 10  # Global variable

def calculate_pay(hours):
    rate = 20  # Local variable
    return (hours * rate) + bonus

print(calculate_pay(5))  # (5 * 20) + 10 = 110
\`\`\`

Variables defined inside \`calculate_pay\` cannot be accessed outside of it.`,
        exercise: {
          id: 'py-s3-l3-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```python\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\n```',
          correctAnswer: '25',
          explanation: 'The second argument `exp` defaults to 2. `5 ** 2` evaluates to 25.',
          hint: '5 raised to the power of 2.',
        },
        exercises: [
          {
            id: 'py-s3-l3-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\n```',
            correctAnswer: '25',
            explanation: 'The second argument `exp` defaults to 2. `5 ** 2` evaluates to 25.',
            hint: '5 raised to the power of 2.',
          },
          {
            id: 'py-s3-l3-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(2, 3))\n```',
            correctAnswer: '8',
            explanation: 'Passing 3 overrides the default `exp=2`. `2 ** 3 = 8`.',
            hint: '2 * 2 * 2.',
          },
          {
            id: 'py-s3-l3-ex3',
            type: 'multiple-choice',
            question: 'Where can a local variable defined inside a function be accessed?',
            options: ['Anywhere in the program', 'Only inside that function', 'In any file that imports it', 'Only inside loops'],
            correctAnswer: 1,
            explanation: 'Local variables exist only within the scope of the function where they are declared.',
            hint: 'Local scope is confined to its enclosing function.',
          },
        ],
      },
    ],
  },
  {
    id: 'py-s4',
    courseId: 'python-fundamentals',
    order: 4,
    title: 'Data Structures & Mini-Project',
    description: 'Work with key-value dictionaries and build an interactive student grade analyzer.',
    lessons: [
      {
        id: 'py-s4-l1',
        stageId: 'py-s4',
        courseId: 'python-fundamentals',
        order: 1,
        title: 'Dictionaries & Key-Value Pairs',
        content: `## Dictionaries in Python

A **dictionary** (\`dict\`) stores associative pairs of **keys** and **values** inside curly braces \`{}\`:

\`\`\`python
student = {
    "name": "Maria",
    "age": 21,
    "course": "Python",
    "score": 92
}
\`\`\`

## Accessing and Updating Values
Access values using their key in square brackets \`[]\`:

\`\`\`python
print(student["name"])    # Maria
student["score"] = 96     # Updates score
student["grade"] = "A"    # Adds new key-value pair
\`\`\`

## Safe Access with .get()
Using \`student.get("city", "Unknown")\` prevents \`KeyError\` if the key doesn't exist.`,
        exercise: {
          id: 'py-s4-l1-ex1',
          type: 'code-output',
          question: 'What does this code print?\n\n```python\nperson = {"name": "Alex", "age": 25}\nprint(person["name"])\n```',
          correctAnswer: 'Alex',
          explanation: '`person["name"]` accesses the value corresponding to key `"name"`, which is "Alex".',
          hint: 'Look at the value of the key "name".',
        },
        exercises: [
          {
            id: 'py-s4-l1-ex1',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nperson = {"name": "Alex", "age": 25}\nprint(person["name"])\n```',
            correctAnswer: 'Alex',
            explanation: '`person["name"]` accesses the value corresponding to key `"name"`, which is "Alex".',
            hint: 'Look at the value of the key "name".',
          },
          {
            id: 'py-s4-l1-ex2',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nd = {"a": 1, "b": 2}\nd["c"] = 3\nprint(len(d))\n```',
            correctAnswer: '3',
            explanation: '`d` begins with 2 pairs. Adding key `"c"` increases the length to 3.',
            hint: 'Count total key-value pairs in the dictionary.',
          },
          {
            id: 'py-s4-l1-ex3',
            type: 'multiple-choice',
            question: 'Which bracket type is used to define a dictionary in Python?',
            options: ['[]', '()', '{}', '<>'],
            correctAnswer: 2,
            explanation: 'Dictionaries are defined using curly braces `{}` with key: value pairs.',
            hint: 'Curly braces.',
          },
        ],
      },
      {
        id: 'py-s4-l2',
        stageId: 'py-s4',
        courseId: 'python-fundamentals',
        order: 2,
        title: 'Mini-Project: Student Grade Analyzer',
        content: `## Capstone Mini-Project

Let\'s combine everything you\'ve learned: variables, lists, dictionaries, conditionals, and functions!

\`\`\`python
students = [
    {"name": "Alice", "score": 92},
    {"name": "Bob", "score": 78},
    {"name": "Charlie", "score": 85}
]

def calculate_average(records):
    total = sum(s["score"] for s in records)
    return total / len(records)

def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "C"

avg = calculate_average(students)
print(f"Average Class Score: {avg:.1f}")
# Output: Average Class Score: 85.0
\`\`\`

## Program Architecture
1. **Data Model**: List of student dictionaries.
2. **Aggregation Function**: Computes mean score using \`sum()\` and \`len()\`.
3. **Classification Function**: Maps numeric scores to letter grades via conditionals.
4. **Report Output**: Formats final results cleanly with an f-string.`,
        exercise: {
          id: 'py-s4-l2-ex1',
          type: 'code-output',
          question: 'What is the average of scores [80, 90, 100]?\n\n```python\nscores = [80, 90, 100]\nprint(sum(scores) // len(scores))\n```',
          correctAnswer: '90',
          explanation: 'Sum is 270. Divided by 3 items gives 90.',
          hint: '(80 + 90 + 100) / 3.',
        },
        exercises: [
          {
            id: 'py-s4-l2-ex1',
            type: 'code-output',
            question: 'What is the average of scores [80, 90, 100]?\n\n```python\nscores = [80, 90, 100]\nprint(sum(scores) // len(scores))\n```',
            correctAnswer: '90',
            explanation: 'Sum is 270. Divided by 3 items gives 90.',
            hint: '(80 + 90 + 100) / 3.',
          },
          {
            id: 'py-s4-l2-ex2',
            type: 'multiple-choice',
            question: 'What grade does `get_grade(85)` return based on the mini-project code?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 1,
            explanation: '85 is not >= 90, but 85 >= 80 evaluates to True, returning "B".',
            hint: '85 is between 80 and 89.',
          },
          {
            id: 'py-s4-l2-ex3',
            type: 'code-output',
            question: 'What does this code print?\n\n```python\nstudents = [{"name": "A", "score": 100}]\nprint(students[0]["name"])\n```',
            correctAnswer: 'A',
            explanation: '`students[0]` gets the first dictionary, and `["name"]` retrieves "A".',
            hint: 'Accessing dictionary inside list.',
          },
        ],
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
