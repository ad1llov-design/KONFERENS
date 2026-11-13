import type { Locale } from '@/lib/types';

export interface Translations {
  nav: {
    brand: string;
    courses: string;
    dashboard: string;
    tutor: string;
    signIn: string;
    signOut: string;
    profile: string;
    langEn: string;
    langRu: string;
    langKy: string;
  };
  home: {
    badge: string;
    heroHeadline1: string;
    heroHeadline2: string;
    heroSub: string;
    startBtn: string;
    seeCoursesBtn: string;
    pathDemoTrack: string;
    pathDemoStage: string;
    pathDemoLevel: string;
    pathDemoCompleted: string;
    featuresHeading: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    availableTitle: string;
    viewAll: string;
    hoursUnit: string;
    readyTitle: string;
    readySubtitle: string;
    ctaBtn: string;
    noCardNeeded: string;
    footerStatus: string;
    footerDemo: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    allCategories: string;
    techCategory: string;
    langCategory: string;
    profCategory: string;
    hoursUnit: string;
    stagesUnit: string;
    startCourse: string;
    viewDetails: string;
    planned: string;
    filterSearch: string;
  };
  courseDetail: {
    hours: string;
    stages: string;
    lessons: string;
    takeDiagnostic: string;
    goToLessons: string;
    structureTitle: string;
    whatYouCover: string;
    backToCatalog: string;
  };
  diagnostic: {
    badge: string;
    introTitle: string;
    introDesc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    startBtn: string;
    qProgress: string;
    questionLabel: string;
    backBtn: string;
    nextBtn: string;
    finishBtn: string;
    resultTitle: string;
    correctOf: string;
    yourLevel: string;
    scoreLabel: string;
    planTitle: string;
    aiPlanBadge: string;
    structPlanBadge: string;
    planPace: string;
    weekLabel: string;
    lessonsUnit: string;
    startLearningBtn: string;
    backToCourseBtn: string;
  };
  learn: {
    diagnosticHint: string;
    startDiagnostic: string;
    overallProgress: string;
    continueBtn: string;
    reviewBtn: string;
    startBtn: string;
    completed: string;
    current: string;
    available: string;
    locked: string;
    allStagesCompleted: string;
  };
  lesson: {
    breadcrumbPath: string;
    readingTab: string;
    exerciseTab: string;
    completedBadge: string;
    toExerciseBtn: string;
    backToPath: string;
    exerciseHeading: string;
    typeAnswerPlaceholder: string;
    showHintBtn: string;
    checkAnswerBtn: string;
    tryAgainBtn: string;
    nextLessonBtn: string;
    finishCourseBtn: string;
    correctHeading: string;
    incorrectHeading: string;
    askTutorLink: string;
  };
  tutor: {
    backToLesson: string;
    backToPath: string;
    badgeDemo: string;
    inputPlaceholder: string;
    sendBtn: string;
    selectCourseHint: string;
    browseCourses: string;
    enterToSend: string;
    demoBannerText: string;
    errorPrefix: string;
    dismiss: string;
  };
  dashboard: {
    greeting: string;
    signOutBtn: string;
    demoBanner: string;
    yourCourses: string;
    noCoursesTitle: string;
    noCoursesDesc: string;
    browseCoursesBtn: string;
    continueBtn: string;
    viewPathBtn: string;
    askTutorBtn: string;
    exploreMore: string;
    analyzerTitle: string;
    analyzerSubtitle: string;
    analyzerNextStep: string;
    analyzerContinueStudy: string;
    analyzerCompletedRatio: string;
    analyzerActivePace: string;
  };
  auth: {
    signInTab: string;
    registerTab: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordRegisterPlaceholder: string;
    minChars: string;
    signInBtn: string;
    registerBtn: string;
    noAccountPrompt: string;
    haveAccountPrompt: string;
    demoModeNotice: string;
  };
  common: {
    loading: string;
    demoMode: string;
    tryAgain: string;
    error: string;
    beginner: string;
    elementary: string;
    intermediate: string;
    advanced: string;
    preIntermediate: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  // ── English ───────────────────────────────────────────────────────────────
  en: {
    nav: {
      brand: 'Kivora',
      courses: 'Courses',
      dashboard: 'Dashboard',
      tutor: 'AI Tutor',
      signIn: 'Sign in',
      signOut: 'Sign out',
      profile: 'Profile',
      langEn: 'EN',
      langRu: 'RU',
      langKy: 'KY',
    },
    home: {
      badge: 'Conference Preview · MVP',
      heroHeadline1: 'Learn step by step,',
      heroHeadline2: 'with a plan tailored to you.',
      heroSub:
        'Kivora guides you from your current level to your professional goal through structured bite-sized lessons, practical exercises, and an AI tutor that explains rather than just answers.',
      startBtn: 'Start learning',
      seeCoursesBtn: 'Browse catalog',
      pathDemoTrack: 'Python Fundamentals',
      pathDemoStage: 'Stage 2 of 3',
      pathDemoLevel: 'Beginner',
      pathDemoCompleted: '3 of 9 lessons completed',
      featuresHeading: 'What sets Kivora apart',
      f1Title: 'Personalized Learning Track',
      f1Desc:
        'Take a 5-minute diagnostic test. Kivora identifies your baseline and generates a clear roadmap matched to where you actually are.',
      f2Title: 'Short Lessons & Real Practice',
      f2Desc:
        'Every lesson focuses on one core concept and ends with hands-on practice. You read, execute, and receive immediate feedback.',
      f3Title: 'Contextual AI Tutor',
      f3Desc:
        'Stuck on a challenge? The AI tutor provides hints and conceptual breakdowns without giving away solutions prematurely.',
      availableTitle: 'Available Tracks',
      viewAll: 'View all 15 tracks',
      hoursUnit: 'h',
      readyTitle: 'Ready to level up your skills?',
      readySubtitle: 'Pick a track, take the diagnostic, and start your first lesson today.',
      ctaBtn: 'Get started for free',
      noCardNeeded: 'No credit card required. Preliminary pricing shown for demonstration only.',
      footerStatus: 'Kivora — working prototype for university IT conference.',
      footerDemo: 'All educational materials and metrics are real and strictly verifiable.',
    },
    catalog: {
      title: 'Curriculum & Tracks',
      subtitle: 'Choose from 15 practical tracks across Languages, Technology, and Professional Skills.',
      allCategories: 'All Tracks',
      techCategory: 'Technology',
      langCategory: 'Languages',
      profCategory: 'Professional Skills',
      hoursUnit: 'hours',
      stagesUnit: 'modules',
      startCourse: 'Start track',
      viewDetails: 'Track details',
      planned: 'Planned',
      filterSearch: 'Search courses…',
    },
    courseDetail: {
      hours: 'hours estimated',
      stages: 'modules',
      lessons: 'interactive lessons',
      takeDiagnostic: 'Take diagnostic',
      goToLessons: 'Open learning path',
      structureTitle: 'Curriculum Structure',
      whatYouCover: 'What you will master',
      backToCatalog: 'Back to catalog',
    },
    diagnostic: {
      badge: 'Skill Diagnostic',
      introTitle: 'Let’s pinpoint your starting level',
      introDesc:
        'Answer 8 focused questions to discover your current baseline. No stress or grading pressure — this simply calibrates your personal curriculum.',
      bullet1: 'Takes approximately 3–5 minutes',
      bullet2: 'No time limits or penalties',
      bullet3: 'Can be retaken anytime as you progress',
      startBtn: 'Begin diagnostic',
      qProgress: 'Question',
      questionLabel: 'Question',
      backBtn: 'Back',
      nextBtn: 'Next question',
      finishBtn: 'Calculate result',
      resultTitle: 'Diagnostic Complete',
      correctOf: 'correct answers',
      yourLevel: 'Assigned Level',
      scoreLabel: 'Accuracy Score',
      planTitle: 'Personalized Study Plan',
      aiPlanBadge: 'AI Generated Plan',
      structPlanBadge: 'Structured Plan',
      planPace: 'Paced for',
      weekLabel: 'Week',
      lessonsUnit: 'lessons',
      startLearningBtn: 'Start learning path',
      backToCourseBtn: 'Back to course overview',
    },
    learn: {
      diagnosticHint: 'Take the diagnostic test to unlock your customized roadmap and level.',
      startDiagnostic: 'Take diagnostic test',
      overallProgress: 'Track progress',
      continueBtn: 'Continue next lesson',
      reviewBtn: 'Review',
      startBtn: 'Start',
      completed: 'Completed',
      current: 'In Progress',
      available: 'Available',
      locked: 'Locked',
      allStagesCompleted: 'Track completed! Great job.',
    },
    lesson: {
      breadcrumbPath: 'Learning Path',
      readingTab: 'Reading & Theory',
      exerciseTab: 'Interactive Practice',
      completedBadge: 'Completed',
      toExerciseBtn: 'Go to practice',
      backToPath: 'Learning path',
      exerciseHeading: 'Hands-on Exercise',
      typeAnswerPlaceholder: 'Type your solution here…',
      showHintBtn: 'Show hint',
      checkAnswerBtn: 'Check solution',
      tryAgainBtn: 'Try again',
      nextLessonBtn: 'Next lesson',
      finishCourseBtn: 'Finish course',
      correctHeading: 'Correct!',
      incorrectHeading: 'Not quite — here is the explanation:',
      askTutorLink: 'Ask the AI tutor about this lesson',
    },
    tutor: {
      backToLesson: 'Back to lesson',
      backToPath: 'Back to path',
      badgeDemo: 'Demo AI Mode',
      inputPlaceholder: 'Ask a question about this lesson or concept…',
      sendBtn: 'Send message',
      selectCourseHint: 'Open the tutor from any lesson for full context-aware pedagogical guidance.',
      browseCourses: 'Browse courses',
      enterToSend: 'Enter to send · Shift+Enter for new line',
      demoBannerText: 'Using pre-written pedagogical responses. Add OPENAI_API_KEY to activate live AI.',
      errorPrefix: 'Error',
      dismiss: 'Dismiss',
    },
    dashboard: {
      greeting: 'Welcome back,',
      signOutBtn: 'Sign out',
      demoBanner: 'Running in demo mode. All activity and achievements are securely stored in this browser.',
      yourCourses: 'Enrolled Tracks',
      noCoursesTitle: 'No enrolled tracks yet',
      noCoursesDesc: 'Select your first track from the catalog and take the baseline diagnostic.',
      browseCoursesBtn: 'Explore catalog',
      continueBtn: 'Continue',
      viewPathBtn: 'View path',
      askTutorBtn: 'Ask tutor',
      exploreMore: 'Recommended Tracks',
      analyzerTitle: 'Progress Analyzer',
      analyzerSubtitle: 'Objective analysis derived strictly from your verified lesson completions.',
      analyzerNextStep: 'Recommended Next Step',
      analyzerContinueStudy: 'Continue with your active track to keep momentum.',
      analyzerCompletedRatio: 'total lessons mastered',
      analyzerActivePace: 'Continuous active learning',
    },
    auth: {
      signInTab: 'Sign in',
      registerTab: 'Register',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Your password',
      passwordRegisterPlaceholder: 'Create a password (min 8 chars)',
      minChars: 'Minimum 8 characters',
      signInBtn: 'Sign in to Kivora',
      registerBtn: 'Create Kivora account',
      noAccountPrompt: 'Don’t have an account?',
      haveAccountPrompt: 'Already registered?',
      demoModeNotice: 'Supabase credentials not configured. Local guest session active.',
    },
    common: {
      loading: 'Loading…',
      demoMode: 'Demo mode',
      tryAgain: 'Try again',
      error: 'Something went wrong',
      beginner: 'Beginner',
      elementary: 'Elementary',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      preIntermediate: 'Pre-Intermediate',
    },
  },

  // ── Russian ───────────────────────────────────────────────────────────────
  ru: {
    nav: {
      brand: 'Kivora',
      courses: 'Курсы',
      dashboard: 'Кабинет',
      tutor: 'AI-Тьютор',
      signIn: 'Войти',
      signOut: 'Выйти',
      profile: 'Профиль',
      langEn: 'EN',
      langRu: 'RU',
      langKy: 'KY',
    },
    home: {
      badge: 'Превью для конференции · MVP',
      heroHeadline1: 'Обучение шаг за шагом,',
      heroHeadline2: 'по плану под вашу цель.',
      heroSub:
        'Kivora помогает определить текущий уровень, сформировать персональный план и двигаться вперёд короткими уроками — с AI-наставником, который объясняет правила, а не решает за вас.',
      startBtn: 'Начать обучение',
      seeCoursesBtn: 'Каталог курсов',
      pathDemoTrack: 'Python Fundamentals',
      pathDemoStage: 'Этап 2 из 3',
      pathDemoLevel: 'Начинающий',
      pathDemoCompleted: '3 из 9 уроков пройдено',
      featuresHeading: 'В чём ценность Kivora',
      f1Title: 'Персональная траектория',
      f1Desc:
        'Короткая 5-минутная диагностика определит реальный стартовый уровень и построит программу под ваши фактические знания.',
      f2Title: 'Короткие уроки и практика',
      f2Desc:
        'Каждый урок посвящён одной теме и завершается практическим заданием. Читаете теорию, решаете задачу и сразу видите разбор.',
      f3Title: 'AI-наставник с контекстом',
      f3Desc:
        'Возникли сложности? Наставник подскажет ход рассуждений и объяснит ошибку, сохраняя ценность самостоятельного решения.',
      availableTitle: 'Доступные направления',
      viewAll: 'Все 15 направлений',
      hoursUnit: 'ч',
      readyTitle: 'Готовы сделать первый шаг?',
      readySubtitle: 'Выберите направление, пройдите диагностику и решите первое практическое задание сегодня.',
      ctaBtn: 'Начать бесплатно',
      noCardNeeded: 'Банковская карта не требуется. Стоимость указана в качестве демонстрационной гипотезы.',
      footerStatus: 'Kivora — рабочий прототип для университетской IT-конференции.',
      footerDemo: 'Все учебные материалы, расчёты и метрики реальны и верифицируемы.',
    },
    catalog: {
      title: 'Каталог направлений',
      subtitle: '15 практических треков в категориях: Языки, Технологии и Профессиональные навыки.',
      allCategories: 'Все направления',
      techCategory: 'Технологии',
      langCategory: 'Языки',
      profCategory: 'Проф. навыки',
      hoursUnit: 'часов',
      stagesUnit: 'модулей',
      startCourse: 'Начать курс',
      viewDetails: 'О курсе',
      planned: 'В плане',
      filterSearch: 'Поиск по курсам…',
    },
    courseDetail: {
      hours: 'часов программы',
      stages: 'модулей',
      lessons: 'практических уроков',
      takeDiagnostic: 'Пройти диагностику',
      goToLessons: 'К маршруту уроков',
      structureTitle: 'Программа курса',
      whatYouCover: 'Чему вы научитесь',
      backToCatalog: 'Назад в каталог',
    },
    diagnostic: {
      badge: 'Диагностика навыков',
      introTitle: 'Определим вашу стартовую точку',
      introDesc:
        'Ответьте на 8 вопросов, чтобы платформа точно подобрала уровень и выстроила маршрут. Здесь нет оценок — только калибровка вашей программы.',
      bullet1: 'Займёт примерно 3–5 минут',
      bullet2: 'Без ограничения по времени и спешки',
      bullet3: 'Можно пересдать в любой момент',
      startBtn: 'Начать диагностику',
      qProgress: 'Вопрос',
      questionLabel: 'Вопрос',
      backBtn: 'Назад',
      nextBtn: 'Следующий вопрос',
      finishBtn: 'Завершить тест',
      resultTitle: 'Диагностика завершена',
      correctOf: 'правильных ответов',
      yourLevel: 'Присвоенный уровень',
      scoreLabel: 'Точность ответов',
      planTitle: 'Персональный план обучения',
      aiPlanBadge: 'План от AI',
      structPlanBadge: 'Структурный план',
      planPace: 'Темп:',
      weekLabel: 'Неделя',
      lessonsUnit: 'уроков',
      startLearningBtn: 'Перейти к обучению',
      backToCourseBtn: 'Назад к описанию курса',
    },
    learn: {
      diagnosticHint: 'Пройдите диагностику, чтобы открыть персонализированную траекторию.',
      startDiagnostic: 'Пройти диагностику',
      overallProgress: 'Общий прогресс курса',
      continueBtn: 'Продолжить урок',
      reviewBtn: 'Повторить',
      startBtn: 'Начать',
      completed: 'Завершён',
      current: 'Текущий',
      available: 'Доступен',
      locked: 'Закрыт',
      allStagesCompleted: 'Поздравляем! Все модули курса успешно пройдены.',
    },
    lesson: {
      breadcrumbPath: 'Маршрут обучения',
      readingTab: 'Теория',
      exerciseTab: 'Практика',
      completedBadge: 'Пройден',
      toExerciseBtn: 'К заданию',
      backToPath: 'Маршрут',
      exerciseHeading: 'Практическое задание',
      typeAnswerPlaceholder: 'Введите ваш ответ…',
      showHintBtn: 'Показать подсказку',
      checkAnswerBtn: 'Проверить ответ',
      tryAgainBtn: 'Попробовать снова',
      nextLessonBtn: 'Следующий урок',
      finishCourseBtn: 'Завершить курс',
      correctHeading: 'Верно!',
      incorrectHeading: 'Не совсем так — посмотрите разбор:',
      askTutorLink: 'Спросить AI-наставника по этому уроку',
    },
    tutor: {
      backToLesson: 'Назад к уроку',
      backToPath: 'Назад к маршруту',
      badgeDemo: 'Demo AI Mode',
      inputPlaceholder: 'Задайте вопрос по текущему уроку или понятию…',
      sendBtn: 'Отправить',
      selectCourseHint: 'Откройте наставника из урока, чтобы он учитывал контекст изучаемой темы.',
      browseCourses: 'Перейти к курсам',
      enterToSend: 'Enter — отправить · Shift+Enter — перенос строки',
      demoBannerText: 'Используются демонстрационные ответы наставника. Укажите OPENAI_API_KEY для живого AI.',
      errorPrefix: 'Ошибка',
      dismiss: 'Закрыть',
    },
    dashboard: {
      greeting: 'С возвращением,',
      signOutBtn: 'Выйти',
      demoBanner: 'Работает в локальном демо-режиме. Весь прогресс надёжно сохраняется в браузере.',
      yourCourses: 'Ваши курсы',
      noCoursesTitle: 'Пока нет начатых курсов',
      noCoursesDesc: 'Выберите направление в каталоге и пройдите короткую стартовую диагностику.',
      browseCoursesBtn: 'Выбрать курс',
      continueBtn: 'Продолжить',
      viewPathBtn: 'Маршрут',
      askTutorBtn: 'К наставнику',
      exploreMore: 'Рекомендуемые направления',
      analyzerTitle: 'Анализ прогресса',
      analyzerSubtitle: 'Объективная сводка на основе фактически решённых практических заданий.',
      analyzerNextStep: 'Следующий шаг',
      analyzerContinueStudy: 'Продолжайте текущий урок для закрепления практического навыка.',
      analyzerCompletedRatio: 'уроков завершено',
      analyzerActivePace: 'Регулярная учебная динамика',
    },
    auth: {
      signInTab: 'Вход',
      registerTab: 'Регистрация',
      nameLabel: 'Имя',
      namePlaceholder: 'Ваше имя',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Ваш пароль',
      passwordRegisterPlaceholder: 'Придумайте пароль (от 8 символов)',
      minChars: 'Не менее 8 символов',
      signInBtn: 'Войти в Kivora',
      registerBtn: 'Зарегистрироваться',
      noAccountPrompt: 'Ещё нет аккаунта?',
      haveAccountPrompt: 'Уже зарегистрированы?',
      demoModeNotice: 'Supabase не подключён. Работает локальный демо-профиль.',
    },
    common: {
      loading: 'Загрузка…',
      demoMode: 'Демо-режим',
      tryAgain: 'Попробовать снова',
      error: 'Произошла ошибка',
      beginner: 'Начинающий',
      elementary: 'Базовый',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
      preIntermediate: 'Ниже среднего',
    },
  },

  // ── Kyrgyz ───────────────────────────────────────────────────────────────
  ky: {
    nav: {
      brand: 'Kivora',
      courses: 'Курстар',
      dashboard: 'Кабинет',
      tutor: 'AI-Насаатчы',
      signIn: 'Кирүү',
      signOut: 'Чыгуу',
      profile: 'Профиль',
      langEn: 'EN',
      langRu: 'RU',
      langKy: 'KY',
    },
    home: {
      badge: 'Конференция превьюсу · MVP',
      heroHeadline1: 'Кадам сайын үйрөнүңүз,',
      heroHeadline2: 'максатыңызга ылайык план менен.',
      heroSub:
        'Kivora сиздин баштапкы деңгээлиңизди аныктап, так план түзөт жана кыска сабактар аркылуу алдыга жетелейт — даяр жооп бербей, түшүндүрүп үйрөткөн AI-насаатчы менен бирге.',
      startBtn: 'Окууну баштоо',
      seeCoursesBtn: 'Курстар каталогу',
      pathDemoTrack: 'Python Fundamentals',
      pathDemoStage: '2-баскыч (бардыгы 3)',
      pathDemoLevel: 'Башталгыч',
      pathDemoCompleted: '9 сабактын 3ү аяктады',
      featuresHeading: 'Kivora платформасынын артыкчылыгы',
      f1Title: 'Жекече окуу багыты',
      f1Desc:
        '5 мүнөттүк диагностикалык тест аркылуу чыныгы деңгээлиңизди аныктап, сизге туура келген жеке окуу планын түзүп берет.',
      f2Title: 'Кыска сабактар жана практика',
      f2Desc:
        'Ар бир сабак бир темага багытталып, практикалык тапшырма менен жыйынтыкталат. Окуйсуз, аткарасыз жана дароо жыйынтыгын көрөсүз.',
      f3Title: 'Контекстти түшүнгөн AI-насаатчы',
      f3Desc:
        'Кыйынчылык жаралса, AI-насаатчы даяр жоопту бербей, ой жүгүртүү багытын жана катаңызды кылдат түшүндүрөт.',
      availableTitle: 'Жеткиликтүү багыттар',
      viewAll: 'Бардык 15 багыт',
      hoursUnit: 'саат',
      readyTitle: 'Өнүгүүнү баштоого даярсызбы?',
      readySubtitle: 'Багытты тандап, диагностикадан өтүңүз жана биринчи сабакты бүгүн баштаңыз.',
      ctaBtn: 'Акысыз баштоо',
      noCardNeeded: 'Банк картасы талап кылынбайт. Баалар демонстрациялык гипотеза катары гана көрсөтүлгөн.',
      footerStatus: 'Kivora — университеттик IT-конференция үчүн иштеп жаткан прототип.',
      footerDemo: 'Бардык окуу материалдары жана көрсөткүчтөр анык жана текшерилүүчү.',
    },
    catalog: {
      title: 'Окуу багыттарынын каталогу',
      subtitle: 'Тилдер, Технологиялар жана Кесиптик көндүмдөр боюнча 15 практикалык багыт.',
      allCategories: 'Бардык багыттар',
      techCategory: 'Технологиялар',
      langCategory: 'Тилдер',
      profCategory: 'Кесиптик көндүмдөр',
      hoursUnit: 'саат',
      stagesUnit: 'модуль',
      startCourse: 'Курсту баштоо',
      viewDetails: 'Курс жөнүндө',
      planned: 'Планда',
      filterSearch: 'Курстарды издөө…',
    },
    courseDetail: {
      hours: 'окуу сааты',
      stages: 'модуль',
      lessons: 'практикалык сабак',
      takeDiagnostic: 'Диагностикадан өтүү',
      goToLessons: 'Сабактардын тизмеси',
      structureTitle: 'Курстун программасы',
      whatYouCover: 'Эмнелерди үйрөнөсүз',
      backToCatalog: 'Каталогго кайтуу',
    },
    diagnostic: {
      badge: 'Көндүмдөрдү аныктоо',
      introTitle: 'Баштапкы деңгээлиңизди аныктайбыз',
      introDesc:
        'Платформа окуу маршрутун сизге ылайыктап түзүшү үчүн 8 суроого жооп бериңиз. Бул жерде баа коюлбайт — деңгээлди тактоо гана жүрөт.',
      bullet1: 'Болжол менен 3–5 мүнөт убакыт алат',
      bullet2: 'Убакыт чектөөсүз жана шашылышсыз',
      bullet3: 'Каалаган убакта кайра тапшырууга болот',
      startBtn: 'Диагностиканы баштоо',
      qProgress: 'Суроо',
      questionLabel: 'Суроо',
      backBtn: 'Артка',
      nextBtn: 'Кийинки суроо',
      finishBtn: 'Тестти аяктоо',
      resultTitle: 'Диагностика аяктады',
      correctOf: 'туура жооп',
      yourLevel: 'Аныкталган деңгээл',
      scoreLabel: 'Жыйынтык упай',
      planTitle: 'Жеке окуу планы',
      aiPlanBadge: 'AI сунуштаган план',
      structPlanBadge: 'Түзүмдүк план',
      planPace: 'Ылдамдык:',
      weekLabel: 'Апта',
      lessonsUnit: 'сабак',
      startLearningBtn: 'Окууну баштоо',
      backToCourseBtn: 'Курстун маалыматына кайтуу',
    },
    learn: {
      diagnosticHint: 'Жекече окуу маршрутуңузду ачуу үчүн диагностикалык тесттен өтүңүз.',
      startDiagnostic: 'Диагностикадан өтүү',
      overallProgress: 'Жалпы прогресс',
      continueBtn: 'Сабакты улантуу',
      reviewBtn: 'Кайталоо',
      startBtn: 'Баштоо',
      completed: 'Аяктады',
      current: 'Учурдагы',
      available: 'Ачык',
      locked: 'Жабык',
      allStagesCompleted: 'Куттуктайбыз! Курстун бардык модулдары ийгиликтүү аяктады.',
    },
    lesson: {
      breadcrumbPath: 'Окуу маршруту',
      readingTab: 'Теория',
      exerciseTab: 'Практика',
      completedBadge: 'Аяктады',
      toExerciseBtn: 'Тапшырмага өтүү',
      backToPath: 'Маршрут',
      exerciseHeading: 'Практикалык тапшырма',
      typeAnswerPlaceholder: 'Жообуңузду бул жерге жазыңыз…',
      showHintBtn: 'Ишаратты көрүү',
      checkAnswerBtn: 'Жоопту текшерүү',
      tryAgainBtn: 'Кайра аракет кылуу',
      nextLessonBtn: 'Кийинки сабак',
      finishCourseBtn: 'Курсту бүтүрүү',
      correctHeading: 'Туура!',
      incorrectHeading: 'Ката бар — түшүндүрмөнү караңыз:',
      askTutorLink: 'Бул сабак боюнча AI-насаатчыдан суроо',
    },
    tutor: {
      backToLesson: 'Сабакка кайтуу',
      backToPath: 'Маршрутка кайтуу',
      badgeDemo: 'Demo AI режими',
      inputPlaceholder: 'Ушул сабак же түшүнүк боюнча суроо бериңиз…',
      sendBtn: 'Жөнөтүү',
      selectCourseHint: 'Сабактын мазмуну боюнча толук кеңеш алуу үчүн насаатчыны сабактын ичинен ачыңыз.',
      browseCourses: 'Курстарды көрүү',
      enterToSend: 'Enter — жөнөтүү · Shift+Enter — жаңы сапка өтүү',
      demoBannerText: 'Даяр демонстрациялык жооптор иштеп жатат. Чыныгы AI үчүн OPENAI_API_KEY кошуңуз.',
      errorPrefix: 'Ката',
      dismiss: 'Жабуу',
    },
    dashboard: {
      greeting: 'Кош келиңиз,',
      signOutBtn: 'Чыгуу',
      demoBanner: 'Жергиликтүү демо режиминде иштеп жатат. Бардык прогресс браузерде сакталат.',
      yourCourses: 'Сиздин курстарыңыз',
      noCoursesTitle: 'Башталган курстар жок',
      noCoursesDesc: 'Каталогдон багыт тандап, кыска баштапкы диагностикадан өтүңүз.',
      browseCoursesBtn: 'Курс тандоо',
      continueBtn: 'Улантуу',
      viewPathBtn: 'Маршрут',
      askTutorBtn: 'Насаатчыга кайрылуу',
      exploreMore: 'Сунушталган багыттар',
      analyzerTitle: 'Прогрессти талдоо',
      analyzerSubtitle: 'Иш жүзүндө аткарылган практикалык тапшырмалардын негизиндеги так көрсөткүч.',
      analyzerNextStep: 'Кийинки кадам',
      analyzerContinueStudy: 'Көндүмдү бекемдөө үчүн активдүү сабакты улантыңыз.',
      analyzerCompletedRatio: 'сабак аяктады',
      analyzerActivePace: 'Ырааттуу окуу динамикасы',
    },
    auth: {
      signInTab: 'Кирүү',
      registerTab: 'Катталуу',
      nameLabel: 'Аты-жөнүңүз',
      namePlaceholder: 'Сиздин атыңыз',
      emailLabel: 'Электрондук почта',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Сыр сөз',
      passwordPlaceholder: 'Сыр сөзүңүз',
      passwordRegisterPlaceholder: 'Жаңы сыр сөз (8 символдон кем эмес)',
      minChars: '8 символдон кем эмес',
      signInBtn: 'Kivoraга кирүү',
      registerBtn: 'Катталуу',
      noAccountPrompt: 'Аккаунтуңуз жокпу?',
      haveAccountPrompt: 'Катталгансызбы?',
      demoModeNotice: 'Supabase кошулган эмес. Жергиликтүү демо-профиль активдүү.',
    },
    common: {
      loading: 'Жүктөлүүдө…',
      demoMode: 'Демо-режим',
      tryAgain: 'Кайра аракет кылуу',
      error: 'Ката кетти',
      beginner: 'Башталгыч',
      elementary: 'Базалык',
      intermediate: 'Орто',
      advanced: 'Жогорку',
      preIntermediate: 'Ортодон төмөн',
    },
  },
};
