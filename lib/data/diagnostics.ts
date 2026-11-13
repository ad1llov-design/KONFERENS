import type { DiagnosticQuestion, CourseId, UserLevel, Locale } from '@/lib/types';
import { EXTRA_DIAGNOSTIC_QUESTIONS } from './diagnostics/extra';
import { DIAGNOSTIC_TRANSLATIONS } from './diagnostics/translations';

// ─────────────────────────────────────────────────────────────────────────────
// Python Fundamentals — Diagnostic Questions
// ─────────────────────────────────────────────────────────────────────────────

const pythonQuestions: DiagnosticQuestion[] = [
  {
    id: 'py-d1',
    courseId: 'python-fundamentals',
    question: 'What is the output of `print(2 + 3 * 4)`?',
    options: ['20', '14', '11', '24'],
    correctAnswer: 1, // 14
    difficulty: 'beginner',
  },
  {
    id: 'py-d2',
    courseId: 'python-fundamentals',
    question: 'Which of these is a valid way to create a list in Python?',
    options: [
      'list = {1, 2, 3}',
      'list = (1, 2, 3)',
      'list = [1, 2, 3]',
      'list = <1, 2, 3>',
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
  },
  {
    id: 'py-d3',
    courseId: 'python-fundamentals',
    question: 'What does `len("hello")` return?',
    options: ['4', '5', '6', 'Error'],
    correctAnswer: 1, // 5
    difficulty: 'beginner',
  },
  {
    id: 'py-d4',
    courseId: 'python-fundamentals',
    question:
      'What is the output?\n```python\nfor i in range(2):\n    print(i)\n```',
    options: ['0 1 2', '1 2', '0 1', '0 1 2 3'],
    correctAnswer: 2, // 0 1
    difficulty: 'elementary',
  },
  {
    id: 'py-d5',
    courseId: 'python-fundamentals',
    question:
      'What does this function return?\n```python\ndef double(n):\n    return n * 2\n\ndouble(6)\n```',
    options: ['6', '62', '12', 'None'],
    correctAnswer: 2, // 12
    difficulty: 'elementary',
  },
  {
    id: 'py-d6',
    courseId: 'python-fundamentals',
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'define', 'def', 'fn'],
    correctAnswer: 2,
    difficulty: 'beginner',
  },
  {
    id: 'py-d7',
    courseId: 'python-fundamentals',
    question:
      'What is the value of `x` after this code?\n```python\nx = 10\nx += 5\nx -= 3\n```',
    options: ['10', '12', '15', '8'],
    correctAnswer: 1, // 12
    difficulty: 'elementary',
  },
  {
    id: 'py-d8',
    courseId: 'python-fundamentals',
    question:
      'What does this print?\n```python\nmy_list = [10, 20, 30]\nprint(my_list[-1])\n```',
    options: ['10', '20', '30', 'Error'],
    correctAnswer: 2, // 30
    difficulty: 'pre-intermediate',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// English A1–A2 — Diagnostic Questions
// ─────────────────────────────────────────────────────────────────────────────

const englishQuestions: DiagnosticQuestion[] = [
  {
    id: 'en-d1',
    courseId: 'english-a1-a2',
    question: 'Which greeting is correct at 9 in the morning?',
    options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'],
    correctAnswer: 1,
    difficulty: 'beginner',
  },
  {
    id: 'en-d2',
    courseId: 'english-a1-a2',
    question: 'Choose the correct sentence:',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.',
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
  },
  {
    id: 'en-d3',
    courseId: 'english-a1-a2',
    question: 'What is the past tense of "go"?',
    options: ['goed', 'goes', 'going', 'went'],
    correctAnswer: 3,
    difficulty: 'elementary',
  },
  {
    id: 'en-d4',
    courseId: 'english-a1-a2',
    question: 'Fill in the blank: "There ___ a book on the table."',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 1,
    difficulty: 'beginner',
  },
  {
    id: 'en-d5',
    courseId: 'english-a1-a2',
    question:
      'Which sentence correctly uses "will" for a spontaneous decision?',
    options: [
      'I am going to answer the phone.',
      'I will answer the phone.',
      'I answered the phone.',
      'I answers the phone.',
    ],
    correctAnswer: 1,
    difficulty: 'elementary',
  },
  {
    id: 'en-d6',
    courseId: 'english-a1-a2',
    question: 'How do you say the number 17 in English?',
    options: ['seventy', 'seventeen', 'seven-ten', 'ten-seven'],
    correctAnswer: 1,
    difficulty: 'beginner',
  },
  {
    id: 'en-d7',
    courseId: 'english-a1-a2',
    question: 'Choose the correct question form:',
    options: [
      'Where you live?',
      'Where do you live?',
      'Where does you live?',
      'Where you are live?',
    ],
    correctAnswer: 1,
    difficulty: 'elementary',
  },
  {
    id: 'en-d8',
    courseId: 'english-a1-a2',
    question: 'Which sentence uses the past simple correctly?',
    options: [
      'Yesterday I go to the market.',
      'Yesterday I goed to the market.',
      'Yesterday I went to the market.',
      'Yesterday I going to the market.',
    ],
    correctAnswer: 2,
    difficulty: 'pre-intermediate',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

const DIAGNOSTIC_QUESTIONS: Partial<Record<CourseId, DiagnosticQuestion[]>> = {
  'python-fundamentals': pythonQuestions,
  'english-a1-a2':       englishQuestions,
  ...EXTRA_DIAGNOSTIC_QUESTIONS,
};

export function getDiagnosticQuestions(courseId: CourseId, locale?: Locale): DiagnosticQuestion[] {
  const base = DIAGNOSTIC_QUESTIONS[courseId] ?? [];
  if (!locale || locale === 'en') return base;

  const locMap = DIAGNOSTIC_TRANSLATIONS[locale];
  if (!locMap) return base;

  return base.map(q => {
    const loc = locMap[q.id];
    if (!loc) return q;
    return {
      ...q,
      question: loc.question || q.question,
      options: loc.options || q.options,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Scoring logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deterministic scoring: each correct answer = 1 point.
 * Levels:
 *   0–37%  → beginner
 *   38–67% → elementary
 *   68–100%→ pre-intermediate
 */
export function scoreDiagnostic(
  courseId: CourseId,
  answers: Record<string, number>
): { score: number; level: UserLevel; correctCount: number; totalCount: number } {
  const questions = getDiagnosticQuestions(courseId);
  let correct = 0;

  for (const q of questions) {
    if (answers[q.id] === q.correctAnswer) {
      correct++;
    }
  }

  const pct = questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const score = Math.round(pct);

  let level: UserLevel = 'beginner';
  if (pct >= 68) level = 'pre-intermediate';
  else if (pct >= 38) level = 'elementary';

  return { score, level, correctCount: correct, totalCount: questions.length };
}

export const LEVEL_LABELS: Record<UserLevel, string> = {
  'beginner':          'Beginner',
  'elementary':        'Elementary',
  'pre-intermediate':  'Pre-Intermediate',
  'intermediate':      'Intermediate',
  'advanced':          'Advanced',
};

export const LEVEL_DESCRIPTIONS: Record<UserLevel, string> = {
  'beginner':
    'You\'re starting fresh — perfect. The course will build from the very basics.',
  'elementary':
    'You have some familiarity. The path starts at the foundations and quickly moves to core concepts.',
  'pre-intermediate':
    'You know the basics. We\'ll move efficiently to deepen your understanding.',
  'intermediate':
    'Solid baseline knowledge. You are ready to dive into practical real-world problems.',
  'advanced':
    'Excellent command of key principles. You are set for mastery.',
};

export const LOCALIZED_LEVEL_LABELS: Record<Locale, Record<UserLevel, string>> = {
  en: LEVEL_LABELS,
  ru: {
    'beginner':         'Начинающий',
    'elementary':       'Базовый',
    'pre-intermediate': 'Уверенный базовый',
    'intermediate':     'Средний',
    'advanced':         'Продвинутый',
  },
  ky: {
    'beginner':         'Башталгыч',
    'elementary':       'Базалык',
    'pre-intermediate': 'Ишенимдүү базалык',
    'intermediate':     'Орто',
    'advanced':         'Өркүндөтүлгөн',
  },
};

export const LOCALIZED_LEVEL_DESCRIPTIONS: Record<Locale, Record<UserLevel, string>> = {
  en: LEVEL_DESCRIPTIONS,
  ru: {
    'beginner':
      'Вы начинаете с самого начала — отлично. Программа курса построена шаг за шагом от ключевых понятий к практике.',
    'elementary':
      'У вас уже есть начальные представления. Программа освежит фундамент и быстро перейдёт к ключевым практическим темам.',
    'pre-intermediate':
      'Вы уверенно знаете основы. Мы сосредоточимся на углублённых навыках и решении реальных задач.',
    'intermediate':
      'Отличная база ключевых принципов. Вы готовы к решению прикладных задач повышенной сложности.',
    'advanced':
      'Превосходное владение ключевыми концепциями. Вы готовы к профессиональному мастерству.',
  },
  ky: {
    'beginner':
      'Сиз нөлдөн баштап жатасыз — эң сонун. Курс негизги түшүнүктөрдөн баштап кадам сайын практикага жетелейт.',
    'elementary':
      'Сизде алгачкы түшүнүктөр бар. Программа пайдубалды бекемдеп, дароо маанилүү практикалык темаларга өтөт.',
    'pre-intermediate':
      'Сиз негиздерди жакшы өздөштүргөнсүз. Биз тереңдетилген көндүмдөргө жана реалдуу маселелерди чечүүгө басым жасайбыз.',
    'intermediate':
      'Негизги принциптер боюнча бекем билим. Татаал практикалык тапшырмаларды аткарууга толук даярсыз.',
    'advanced':
      'Негизги концепцияларды мыкты өздөштүргөнсүз. Кесиптик деңгээлге жетүү үчүн даярсыз.',
  },
};

export function getLevelLabel(level: UserLevel, locale: Locale = 'en'): string {
  return LOCALIZED_LEVEL_LABELS[locale]?.[level] || LEVEL_LABELS[level] || level;
}

export function getLevelDescription(level: UserLevel, locale: Locale = 'en'): string {
  return LOCALIZED_LEVEL_DESCRIPTIONS[locale]?.[level] || LEVEL_DESCRIPTIONS[level] || '';
}
