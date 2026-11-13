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

    // 3 Value Pillars
    featuresHeading: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;

    // Problem vs Solution
    problemBadge: string;
    problemTitle: string;
    problemSubtitle: string;
    problem1Title: string;
    problem1Desc: string;
    problem2Title: string;
    problem2Desc: string;
    problem3Title: string;
    problem3Desc: string;

    // How Kivora Works (5 Steps)
    howTitle: string;
    howSubtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step4Num: string;
    step4Title: string;
    step4Desc: string;
    step5Num: string;
    step5Title: string;
    step5Desc: string;

    // 15 Tracks Catalog Showcase
    availableTitle: string;
    viewAll: string;
    hoursUnit: string;

    // AI Suite
    aiSuiteBadge: string;
    aiSuiteTitle: string;
    aiSuiteSubtitle: string;
    aiPlannerTitle: string;
    aiPlannerDesc: string;
    aiTutorTitle: string;
    aiTutorDesc: string;
    aiAnalyzerTitle: string;
    aiAnalyzerDesc: string;

    // Real Trust & Community Feedback (Zero Fake Reviews)
    trustBadge: string;
    trustTitle: string;
    trustDesc: string;
    trustNote: string;
    trustFeedbackBtn: string;
    trustParticipantsLabel: string;

    // Freemium Pricing Hypotheses
    pricingBadge: string;
    pricingTitle: string;
    pricingSubtitle: string;
    pricingNote: string;
    tierStarterTitle: string;
    tierStarterPrice: string;
    tierStarterPeriod: string;
    tierStarterDesc: string;
    tierStarterFeatures: string[];
    tierStudentTitle: string;
    tierStudentPrice: string;
    tierStudentPeriod: string;
    tierStudentBadge: string;
    tierStudentDesc: string;
    tierStudentFeatures: string[];
    tierProTitle: string;
    tierProPrice: string;
    tierProPeriod: string;
    tierProDesc: string;
    tierProFeatures: string[];

    // FAQ
    faqTitle: string;
    faqSubtitle: string;
    faqList: Array<{ q: string; a: string }>;

    // CTA & Footer
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
    allUpToDate: string;
    profileSettingsBtn: string;
    editProfileTitle: string;
    displayNameLabel: string;
    avatarLabel: string;
    dailyGoalLabel: string;
    minutesUnit: string;
    interfaceLangLabel: string;
    saveChangesBtn: string;
    profileSaved: string;
    closeBtn: string;
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
        'Kivora guides you from your current baseline to your professional goal through structured bite-sized lessons, interactive exercises, and a Socratic AI tutor that explains rather than just answers.',
      startBtn: 'Start learning',
      seeCoursesBtn: 'Browse catalog',
      pathDemoTrack: 'Python Fundamentals',
      pathDemoStage: 'Module 2 of 3',
      pathDemoLevel: 'Beginner',
      pathDemoCompleted: '3 of 9 lessons completed',

      featuresHeading: 'What sets Kivora apart',
      f1Title: 'Personalized Learning Roadmap',
      f1Desc:
        'Take a 3-minute diagnostic test. Kivora identifies your baseline and generates a clear roadmap matched to where you actually are.',
      f2Title: 'Short Lessons & Real Practice',
      f2Desc:
        'Every lesson focuses on one core concept and ends with hands-on practice. You read, execute, and receive immediate feedback.',
      f3Title: 'Contextual Socratic AI Tutor',
      f3Desc:
        'Stuck on a challenge? The AI tutor provides progressive hints and conceptual breakdowns without giving away solutions prematurely.',

      problemBadge: 'Why Traditional Learning Fails',
      problemTitle: 'Why structured micro-steps beat chaotic courses',
      problemSubtitle: 'Over 90% of online learners abandon massive video playlists. Kivora replaces passive watching with an active, game-like guided path.',
      problem1Title: 'Video fatigue & passivity',
      problem1Desc: 'Watching 40-hour video courses creates an illusion of competence, but when faced with an empty editor or a blank page, you freeze.',
      problem2Title: 'Lack of verified baseline',
      problem2Desc: 'Generic courses force you to re-learn what you already know or jump straight into advanced concepts you are not ready for.',
      problem3Title: 'No timely feedback',
      problem3Desc: 'When stuck on an error at midnight, you have no guidance. You waste hours on forum searches instead of continuing your momentum.',

      howTitle: 'How Kivora Works in 5 Clear Steps',
      howSubtitle: 'A structured, progressive learning journey designed for measurable results from day one.',
      step1Num: '01',
      step1Title: 'Select your focus',
      step1Desc: 'Choose from 15 practical tracks across Technology, Languages, and Professional Skills.',
      step2Num: '02',
      step2Title: '3-Minute Diagnostic',
      step2Desc: 'Take a quick, adaptive baseline quiz. Discover your exact starting level without guesswork.',
      step3Num: '03',
      step3Title: 'Personalized AI Roadmap',
      step3Desc: 'Kivora generates weekly milestones matching your current schedule and target mastery.',
      step4Num: '04',
      step4Title: 'Bite-Sized Lessons & Practice',
      step4Desc: 'Engage with 10-minute micro-lessons. Test your understanding immediately with interactive exercises.',
      step5Num: '05',
      step5Title: 'Verified Progress & Mastery',
      step5Desc: 'Track real skill checkpoints, maintain your momentum, and build demonstrable competence.',

      availableTitle: '15 Practical Learning Tracks',
      viewAll: 'View all 15 tracks in catalog',
      hoursUnit: 'h',

      aiSuiteBadge: 'Integrated AI Architecture',
      aiSuiteTitle: 'AI that teaches you how to think, not just gives answers',
      aiSuiteSubtitle: 'Three specialized AI systems working together to accelerate your learning speed.',
      aiPlannerTitle: 'Adaptive Curriculum Planner',
      aiPlannerDesc: 'Calculates the optimal pacing and sequence based on your diagnostic results and available weekly hours.',
      aiTutorTitle: 'Socratic Hints-First Tutor',
      aiTutorDesc: 'Embedded directly into every lesson. Provides guided hints and explanations without spoiling the solution.',
      aiAnalyzerTitle: 'Real-Time Progress Analyzer',
      aiAnalyzerDesc: 'Monitors retention, tracks exercise accuracy, and suggests high-impact next steps to prevent forgetting.',

      trustBadge: 'Conference Preview & Real Community',
      trustTitle: 'Zero fake reviews. Transparent feedback gathering.',
      trustDesc: 'Kivora is currently presented at the university IT conference. We do not use manufactured testimonials or artificial streaks. We are actively collecting real impressions from students and mentors.',
      trustNote: 'Are you testing Kivora at the conference? Your feedback directly shapes our curriculum development and learning algorithms.',
      trustFeedbackBtn: 'Share conference feedback',
      trustParticipantsLabel: 'Active conference testers exploring 15 tracks live',

      pricingBadge: 'Freemium Pricing Hypothesis',
      pricingTitle: 'Simple, transparent student-friendly pricing',
      pricingSubtitle: 'Preliminary pricing hypothesis formulated for conference discussion and validation.',
      pricingNote: 'All participants at the conference have free, unrestricted access to all MVP features.',
      tierStarterTitle: 'Starter',
      tierStarterPrice: '$0',
      tierStarterPeriod: 'forever free',
      tierStarterDesc: 'Perfect for exploring the platform and testing your baseline knowledge.',
      tierStarterFeatures: [
        'Access to all 15 introductory modules',
        'Adaptive baseline diagnostic testing',
        'Interactive exercises with instant check',
        'Local progress synchronization',
      ],
      tierStudentTitle: 'Student',
      tierStudentPrice: '$2.99',
      tierStudentPeriod: '/ month',
      tierStudentBadge: 'Most Popular',
      tierStudentDesc: 'Structured curriculum progression for dedicated learners and students.',
      tierStudentFeatures: [
        'Full access to all 15 complete course tracks',
        'Personalized AI Roadmap generation',
        'Contextual AI Tutor (standard queries)',
        'Detailed skill retention analytics',
        'Certificate of track completion',
      ],
      tierProTitle: 'Pro & Mentorship',
      tierProPrice: '$5.99',
      tierProPeriod: '/ month',
      tierProDesc: 'Unlimited AI capabilities and priority support for high-velocity career switchers.',
      tierProFeatures: [
        'Everything in Student tier',
        'Unlimited high-speed AI Tutor queries',
        'Deep error diagnosis & customized exercises',
        'Offline lesson exports & summary cheatsheets',
        'Direct channel to curriculum authors',
      ],

      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about Kivora and our learning methodology.',
      faqList: [
        {
          q: 'Is Kivora free to use during the conference?',
          a: 'Yes, 100% free! All 15 courses, the diagnostic assessments, interactive exercises, and the AI Tutor are completely open for conference participants without requiring a credit card.',
        },
        {
          q: 'How does the AI Tutor differ from ChatGPT?',
          a: 'Unlike generic chatbots that immediately write the answer for you, Kivora\'s AI Tutor uses a Socratic pedagogical approach: it analyzes your current lesson context, explains the underlying rule, and gives progressive hints so you genuinely learn.',
        },
        {
          q: 'Can I switch between interface languages?',
          a: 'Yes. Kivora supports full trilingual localization in English, Russian, and Kyrgyz. You can switch languages at any time from the top bar or your profile settings.',
        },
        {
          q: 'How are my progress and test results saved?',
          a: 'In this conference preview, your progress is automatically saved to your browser\'s local storage. If you sign in, progress can also sync with your Supabase account.',
        },
        {
          q: 'Why are there 15 tracks across Tech, Languages, and Soft Skills?',
          a: 'Modern professionals need a combination of technical capability (coding/data), global communication (foreign languages), and soft skills (project management, design, negotiation) to excel.',
        },
        {
          q: 'Will I receive a certificate upon finishing a track?',
          a: 'Yes! Once you complete all stages and verified exercises of a track, Kivora issues a verified completion badge reflecting your objective score.',
        },
      ],

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
      lessons: 'lessons total',
      takeDiagnostic: 'Take diagnostic',
      goToLessons: 'Go to curriculum',
      structureTitle: 'Module Structure',
      whatYouCover: 'Key topics covered in this track:',
      backToCatalog: 'Back to catalog',
    },
    diagnostic: {
      badge: 'Skill Assessment',
      introTitle: 'Diagnostic Assessment',
      introDesc: 'questions designed to determine your optimal starting point in',
      bullet1: 'Takes approximately 3–5 minutes',
      bullet2: 'Adaptive questions covering core foundations',
      bullet3: 'Generates your personalized weekly study plan',
      startBtn: 'Begin diagnostic test',
      qProgress: 'Question',
      questionLabel: 'Question',
      backBtn: 'Previous',
      nextBtn: 'Next question',
      finishBtn: 'Submit assessment',
      resultTitle: 'Assessment Complete!',
      correctOf: 'questions answered correctly',
      yourLevel: 'Assigned Starting Level',
      scoreLabel: 'Diagnostic Mastery Score',
      planTitle: 'Your Personalized Learning Roadmap',
      aiPlanBadge: 'AI Generated',
      structPlanBadge: 'Verified Path',
      planPace: 'Recommended pacing',
      weekLabel: 'Module',
      lessonsUnit: 'lessons',
      startLearningBtn: 'Start first lesson',
      backToCourseBtn: 'View full track overview',
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
      allUpToDate: 'All enrolled lessons are currently up to date!',
      profileSettingsBtn: 'Profile Settings',
      editProfileTitle: 'Profile & Learning Preferences',
      displayNameLabel: 'Display Name',
      avatarLabel: 'Select Avatar',
      dailyGoalLabel: 'Daily Study Goal',
      minutesUnit: 'min/day',
      interfaceLangLabel: 'Interface Language',
      saveChangesBtn: 'Save Settings',
      profileSaved: 'Profile updated successfully!',
      closeBtn: 'Close',
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
      pathDemoStage: 'Модуль 2 из 3',
      pathDemoLevel: 'Начинающий',
      pathDemoCompleted: '3 из 9 уроков пройдено',

      featuresHeading: 'В чём ценность Kivora',
      f1Title: 'Персональная траектория',
      f1Desc:
        'Короткая 3-минутная диагностика определит реальный стартовый уровень и построит программу под ваши фактические знания.',
      f2Title: 'Короткие уроки и практика',
      f2Desc:
        'Каждый урок посвящён одной теме и завершается практическим заданием. Читаете теорию, решаете задачу и сразу видите разбор.',
      f3Title: 'AI-наставник с контекстом',
      f3Desc:
        'Возникли сложности? Наставник подскажет ход рассуждений и объяснит ошибку, сохраняя ценность самостоятельного решения.',

      problemBadge: 'Почему традиционные курсы не работают',
      problemTitle: 'Почему структурированные микро-шаги побеждают хаотичные курсы',
      problemSubtitle: 'Более 90% студентов бросают бесконечные видеоплейлисты. Kivora заменяет пассивный просмотр активной игровой практикой с моментальной обратной связью.',
      problem1Title: 'Усталость от видео и пассивность',
      problem1Desc: 'Просмотр 40-часовых лекций создаёт иллюзию понимания, но перед чистым экраном редактора или реальной задачей наступает ступор.',
      problem2Title: 'Отсутствие реальной диагностики',
      problem2Desc: 'Стандартные курсы заставляют слушать то, что вы уже знаете, либо сразу бросают в сложнейшие темы без подготовки.',
      problem3Title: 'Нет помощи в момент ошибки',
      problem3Desc: 'Когда вы застряли на ошибке ночью, рядом никого нет. Вы тратите часы на форумы вместо сохранения динамики обучения.',

      howTitle: 'Как устроена Kivora в 5 простых шагах',
      howSubtitle: 'Понятный, последовательный образовательный процесс для измеримых результатов с первого дня.',
      step1Num: '01',
      step1Title: 'Выберите цель и фокус',
      step1Desc: 'Выберите один из 15 прикладных треков в категориях: Технологии, Языки и Профессиональные навыки.',
      step2Num: '02',
      step2Title: '3-минутная диагностика',
      step2Desc: 'Короткий адаптивный тест определит ваш точный стартовый уровень без догадок.',
      step3Num: '03',
      step3Title: 'Персональный AI-маршрут',
      step3Desc: 'Kivora сформирует пошаговый недельный план с учётом вашего свободного времени.',
      step4Num: '04',
      step4Title: 'Микро-уроки и практика',
      step4Desc: 'Уроки по 10 минут с фокусом на одном понятии и немедленной практической проверкой.',
      step5Num: '05',
      step5Title: 'Подтверждённый прогресс',
      step5Desc: 'Контрольные точки, реальные метрики освоения материала и уверенный рост компетенций.',

      availableTitle: '15 практических направлений',
      viewAll: 'Смотреть все 15 треков в каталоге',
      hoursUnit: 'ч',

      aiSuiteBadge: 'Интегрированный AI-комплекс',
      aiSuiteTitle: 'Искусственный интеллект, который учит мыслить, а не даёт готовые ответы',
      aiSuiteSubtitle: 'Три взаимосвязанных AI-компонента для максимальной скорости освоения материала.',
      aiPlannerTitle: 'Адаптивный планировщик программы',
      aiPlannerDesc: 'Рассчитывает оптимальный темп обучения на основе вашей диагностики и доступных часов в неделю.',
      aiTutorTitle: 'Сократический AI-тьютор с подсказками',
      aiTutorDesc: 'Встроен в каждый урок. Объясняет правила, даёт поэтапные подсказки, но сохраняет ценность вашего решения.',
      aiAnalyzerTitle: 'Анализатор прогресса в реальном времени',
      aiAnalyzerDesc: 'Отслеживает ошибки, выявляет пробелы и подсказывает оптимальные следующие шаги.',

      trustBadge: 'Превью для конференции и живое сообщество',
      trustTitle: 'Ноль фейковых отзывов. Честный сбор обратной связи.',
      trustDesc: 'Kivora представлена на университетской IT-конференции. Мы принципиально не публикуем вымышленные отзывы и нарисованные серии занятий. Мы собираем живые впечатления первых студентов и преподавателей.',
      trustNote: 'Вы тестируете Kivora на конференции? Ваши впечатления напрямую определят следующие функции и образовательные треки.',
      trustFeedbackBtn: 'Оставить отзыв участника конференции',
      trustParticipantsLabel: 'Участников конференции уже пробуют 15 треков вживую',

      pricingBadge: 'Предварительная гипотеза тарифов',
      pricingTitle: 'Понятные, доступные тарифы для студентов',
      pricingSubtitle: 'Гипотеза монетизации, подготовленная для валидации и обсуждения на конференции.',
      pricingNote: 'Для всех участников конференции все функции MVP полностью бесплатны и открыты.',
      tierStarterTitle: 'Starter',
      tierStarterPrice: '$0',
      tierStarterPeriod: 'навсегда бесплатно',
      tierStarterDesc: 'Идеально для знакомства с платформой и проверки своего стартового уровня.',
      tierStarterFeatures: [
        'Доступ ко всем 15 вводным модулям',
        'Адаптивное диагностическое тестирование',
        'Интерактивные упражнения с мгновенной проверкой',
        'Сохранение прогресса в браузере',
      ],
      tierStudentTitle: 'Студент',
      tierStudentPrice: '$2.99',
      tierStudentPeriod: '/ месяц',
      tierStudentBadge: 'Популярный',
      tierStudentDesc: 'Полная образовательная траектория для регулярных занятий.',
      tierStudentFeatures: [
        'Полный доступ ко всем 15 направлениям',
        'Генерация персонального AI-маршрута',
        'Контекстный AI-тьютор (базовые запросы)',
        'Подробная аналитика освоения навыков',
        'Сертификат о прохождении трека',
      ],
      tierProTitle: 'Pro & Менторство',
      tierProPrice: '$5.99',
      tierProPeriod: '/ месяц',
      tierProDesc: 'Безлимитный AI и приоритетная поддержка для быстрого перехода в профессию.',
      tierProFeatures: [
        'Все возможности тарифа «Студент»',
        'Безлимитный скоростной AI-тьютор',
        'Глубокий разбор ошибок и персональные задачи',
        'Экспорт конспектов и шпаргалок',
        'Прямой канал связи с методистами курсов',
      ],

      faqTitle: 'Часто задаваемые вопросы',
      faqSubtitle: 'Всё, что важно знать о платформе Kivora и нашей методике обучения.',
      faqList: [
        {
          q: 'Действительно ли доступ на конференции бесплатный?',
          a: 'Да, на 100%! Все 15 курсов, диагностика, интерактивные задания и AI-наставник полностью открыты для участников конференции без необходимости ввода банковских карт.',
        },
        {
          q: 'Чем AI-тьютор в Kivora отличается от обычного ChatGPT?',
          a: 'Обычный чат-бот сразу пишет готовый код или перевод, лишая вас процесса обучения. Наш тьютор видит текущий урок, объясняет принцип и ведёт вас наводящими вопросами, пока вы не решите задачу сами.',
        },
        {
          q: 'Можно ли переключать язык интерфейса?',
          a: 'Да. Kivora полностью трёхъязычна: доступен английский, русский и кыргызский язык. Переключить язык можно в шапке сайта или в настройках профиля в любой момент.',
        },
        {
          q: 'Где сохраняются мои результаты и прогресс?',
          a: 'В рамках MVP-превью прогресс надёжно сохраняется в локальной памяти вашего браузера. При авторизации данные могут синхронизироваться с облачной базой Supabase.',
        },
        {
          q: 'Почему в каталоге именно 15 курсов по технологиям, языкам и soft skills?',
          a: 'Современному специалисту недостаточно одного навыка. Успешная карьера строится на стыке hard skills (код, аналитика), языков (международные коммуникации) и софт-скиллов (переговоры, управление проектами).',
        },
        {
          q: 'Выдаётся ли сертификат об окончании?',
          a: 'Да, после успешного прохождения всех этапов курса и проверочных заданий платформа формирует подтверждённый цифровой сертификат с объективным баллом.',
        },
      ],

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
      lessons: 'уроков всего',
      takeDiagnostic: 'Пройти диагностику',
      goToLessons: 'К списку уроков',
      structureTitle: 'Структура курса',
      whatYouCover: 'Ключевые темы курса:',
      backToCatalog: 'Назад в каталог',
    },
    diagnostic: {
      badge: 'Определение уровня',
      introTitle: 'Входная диагностика',
      introDesc: 'вопросов для точного определения вашей стартовой точки в курсе',
      bullet1: 'Занимает всего 3–5 минут',
      bullet2: 'Проверяет базовые и прикладные концепции',
      bullet3: 'Формирует персональный учебный план',
      startBtn: 'Начать тест',
      qProgress: 'Вопрос',
      questionLabel: 'Вопрос',
      backBtn: 'Назад',
      nextBtn: 'Следующий вопрос',
      finishBtn: 'Завершить тест',
      resultTitle: 'Диагностика пройдена!',
      correctOf: 'правильных ответов',
      yourLevel: 'Присвоенный стартовый уровень',
      scoreLabel: 'Итоговый балл понимания',
      planTitle: 'Ваш персональный план обучения',
      aiPlanBadge: 'AI-план',
      structPlanBadge: 'Базовая программа',
      planPace: 'Рекомендованный темп',
      weekLabel: 'Модуль',
      lessonsUnit: 'уроков',
      startLearningBtn: 'Перейти к первому уроку',
      backToCourseBtn: 'К описанию курса',
    },
    learn: {
      diagnosticHint: 'Пройдите диагностику, чтобы определить свой уровень и получить адаптированный план.',
      startDiagnostic: 'Пройти диагностику',
      overallProgress: 'Прогресс курса',
      continueBtn: 'Продолжить обучение',
      reviewBtn: 'Повторить',
      startBtn: 'Начать',
      completed: 'Пройден',
      current: 'Текущий',
      available: 'Доступен',
      locked: 'Закрыт',
      allStagesCompleted: 'Курс полностью пройден! Отличная работа.',
    },
    lesson: {
      breadcrumbPath: 'Траектория обучения',
      readingTab: 'Теория и концепции',
      exerciseTab: 'Практическое задание',
      completedBadge: 'Пройден',
      toExerciseBtn: 'К заданию',
      backToPath: 'К плану курса',
      exerciseHeading: 'Практическое задание',
      typeAnswerPlaceholder: 'Введите ваш ответ…',
      showHintBtn: 'Показать подсказку',
      checkAnswerBtn: 'Проверить решение',
      tryAgainBtn: 'Попробовать снова',
      nextLessonBtn: 'Следующий урок',
      finishCourseBtn: 'Завершить курс',
      correctHeading: 'Верно!',
      incorrectHeading: 'Не совсем так. Разбор решения:',
      askTutorLink: 'Спросить у AI-наставника об этом уроке',
    },
    tutor: {
      backToLesson: 'Назад к уроку',
      backToPath: 'К плану курса',
      badgeDemo: 'Демо-режим AI',
      inputPlaceholder: 'Задайте вопрос по текущему уроку или концепции…',
      sendBtn: 'Отправить',
      selectCourseHint: 'Открывайте наставника из урока для точного контекстного разбора.',
      browseCourses: 'Выбрать курс',
      enterToSend: 'Enter для отправки · Shift+Enter для новой строки',
      demoBannerText: 'Используются демонстрационные методические ответы. Подключите OPENAI_API_KEY для живого AI.',
      errorPrefix: 'Ошибка',
      dismiss: 'Закрыть',
    },
    dashboard: {
      greeting: 'С возвращением,',
      signOutBtn: 'Выйти',
      demoBanner: 'Демо-режим активен. Ваши результаты надёжно сохраняются в этом браузере.',
      yourCourses: 'Выбранные направления',
      noCoursesTitle: 'Вы пока не записались ни на один курс',
      noCoursesDesc: 'Выберите направление в каталоге и пройдите короткую диагностику.',
      browseCoursesBtn: 'Перейти в каталог',
      continueBtn: 'Продолжить',
      viewPathBtn: 'К маршруту',
      askTutorBtn: 'К наставнику',
      exploreMore: 'Рекомендуемые направления',
      analyzerTitle: 'Анализатор прогресса',
      analyzerSubtitle: 'Объективный анализ на основе фактически решённых практических заданий.',
      analyzerNextStep: 'Рекомендуемый следующий шаг',
      analyzerContinueStudy: 'Продолжите занятия в активном курсе для закрепления навыков.',
      analyzerCompletedRatio: 'уроков успешно пройдено',
      analyzerActivePace: 'Непрерывное обучение',
      allUpToDate: 'Все уроки по выбранным курсам пройдены и актуальны!',
      profileSettingsBtn: 'Настройки профиля',
      editProfileTitle: 'Профиль и цели обучения',
      displayNameLabel: 'Имя пользователя',
      avatarLabel: 'Выберите аватар',
      dailyGoalLabel: 'Ежедневная цель',
      minutesUnit: 'мин/день',
      interfaceLangLabel: 'Язык интерфейса',
      saveChangesBtn: 'Сохранить настройки',
      profileSaved: 'Профиль успешно обновлён!',
      closeBtn: 'Закрыть',
    },
    auth: {
      signInTab: 'Вход',
      registerTab: 'Регистрация',
      nameLabel: 'Имя и фамилия',
      namePlaceholder: 'Иван Иванов',
      emailLabel: 'Электронная почта',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Ваш пароль',
      passwordRegisterPlaceholder: 'Создайте пароль (от 8 символов)',
      minChars: 'Минимум 8 символов',
      signInBtn: 'Войти в Kivora',
      registerBtn: 'Зарегистрироваться',
      noAccountPrompt: 'Ещё нет аккаунта?',
      haveAccountPrompt: 'Уже зарегистрированы?',
      demoModeNotice: 'Supabase не подключён. Активна гостевая сессия.',
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
      pathDemoStage: '2-модуль (бардыгы 3)',
      pathDemoLevel: 'Башталгыч',
      pathDemoCompleted: '9 сабактын 3ү аяктады',

      featuresHeading: 'Kivora платформасынын артыкчылыгы',
      f1Title: 'Жекече окуу багыты',
      f1Desc:
        '3 мүнөттүк диагностикалык тест аркылуу чыныгы деңгээлиңизди аныктап, сизге туура келген жеке окуу планын түзүп берет.',
      f2Title: 'Кыска сабактар жана практика',
      f2Desc:
        'Ар бир сабак бир темага багытталып, практикалык тапшырма менен жыйынтыкталат. Окуйсуз, аткарасыз жана дароо жыйынтыгын көрөсүз.',
      f3Title: 'Контекстти түшүнгөн AI-насаатчы',
      f3Desc:
        'Кыйынчылык жаралса, AI-насаатчы даяр жоопту бербей, ой жүгүртүү багытын жана катаңызды кылдат түшүндүрөт.',

      problemBadge: 'Эмне үчүн кадимки курстар натыйжа бербейт',
      problemTitle: 'Эмне үчүн кыска системалуу кадамдар башаламан видеолордон артык',
      problemSubtitle: 'Онлайн студенттердин 90%дан ашыгы узун видеолорду аягына чыкпай таштап коюшат. Kivora пассивдүү көрүүнү активдүү практика менен алмаштырат.',
      problem1Title: 'Видеолордон чарчоо жана пассивдүүлүк',
      problem1Desc: '40 сааттык видеону көрүү түшүнүү сезимин берет, бирок код жазууга же реалдуу тапшырмага келгенде токтоп каласыз.',
      problem2Title: 'Баштапкы деңгээлдин такталбагандыгы',
      problem2Desc: 'Жалпы курстар сиз билген нерселерди кайра окутат же даярдыгыңыз жок татаал темага дароо секирет.',
      problem3Title: 'Ката кетиргенде колдоонун жоктугу',
      problem3Desc: 'Түндө маселеге тыгылып калганда жаныңызда эч ким жок. Форумдарда сааттап отуруп, окуу динамикасын жоготосуз.',

      howTitle: 'Kivora кандайча 5 жөнөкөй кадамда иштейт',
      howSubtitle: 'Биринчи күндөн баштап так натыйжаларга жеткирүүчү иреттүү окуу процесси.',
      step1Num: '01',
      step1Title: 'Максатты жана багытты тандаңыз',
      step1Desc: 'Технология, Тилдер жана Кесиптик көндүмдөр боюнча 15 багыттан өзүңүзгө керектүүсүн тандаңыз.',
      step2Num: '02',
      step2Title: '3 мүнөттүк диагностика',
      step2Desc: 'Кыска адаптивдүү тест сиздин чыныгы баштапкы деңгээлиңизди так аныктап берет.',
      step3Num: '03',
      step3Title: 'Жеке AI-окуу планы',
      step3Desc: 'Kivora бош убактыңызга ылайыкташтырылган жумалык этаптуу маршрутту түзөт.',
      step4Num: '04',
      step4Title: 'Микро-сабактар жана практика',
      step4Desc: 'Бир темага фокусталган 10 мүнөттүк сабактар жана дароо интерактивдүү текшерүү.',
      step5Num: '05',
      step5Title: 'Тастыкталган прогресс',
      step5Desc: 'Өздөштүрүүнүн реалдуу көрсөткүчтөрү, текшерилүүчү көндүмдөр жана туруктуу өсүш.',

      availableTitle: '15 практикалык багыт',
      viewAll: 'Каталогдогу бардык 15 тректи көрүү',
      hoursUnit: 'саат',

      aiSuiteBadge: 'Интеграцияланган AI-комплекси',
      aiSuiteTitle: 'Даяр жоопту бербей, ой жүгүртүүгө үйрөтүүчү жасалма интеллект',
      aiSuiteSubtitle: 'Окуу ылдамдыгын жогорулатуу үчүн бирге иштеген үч адистештирилген AI системасы.',
      aiPlannerTitle: 'Адаптивдүү окуу пландоочусу',
      aiPlannerDesc: 'Диагностика жыйынтыгына жана бош сааттарыңызга жараша эң ыңгайлуу окуу темпин эсептейт.',
      aiTutorTitle: 'Сократтык ыкмадагы AI-насаатчы',
      aiTutorDesc: 'Ар бир сабактын ичине камтылган. Даяр жоопту бербестен, этаптуу кеңештер менен жетелейт.',
      aiAnalyzerTitle: 'Реалдуу убакыттагы прогресс талдоочусу',
      aiAnalyzerDesc: 'Каталарды көзөмөлдөп, унутуп калууну алдын алуу үчүн натыйжалуу кийинки кадамдарды сунуштайт.',

      trustBadge: 'Конференция превьюсу жана жандуу коомдоштук',
      trustTitle: 'Жалган пикирлер жок. Ачык кайтарым байланыш.',
      trustDesc: 'Kivora учурда университеттик IT-конференциясында көрсөтүлүүдө. Биз ойдон чыгарылган пикирлерди жарыялабайбыз. Биринчи студенттер менен мугалимдердин чыныгы пикирлерин топтоп жатабыз.',
      trustNote: 'Сиз Kivoraны конференцияда сынап жатасызбы? Сиздин пикириңиз кийинки функцияларды түздөн-түз аныктайт.',
      trustFeedbackBtn: 'Конференция катышуучусунун пикирин калтыруу',
      trustParticipantsLabel: 'Конференция катышуучулары 15 багытты түз эфирде сынап жатышат',

      pricingBadge: 'Баалардын алдын ала гипотезасы',
      pricingTitle: 'Студенттер үчүн түшүнүктүү жана жеткиликтүү баалар',
      pricingSubtitle: 'Конференцияда талкуулоо жана текшерүү үчүн түзүлгөн монетизация гипотезасы.',
      pricingNote: 'Конференциянын бардык катышуучулары үчүн MVP функциялары толугу менен акысыз.',
      tierStarterTitle: 'Starter',
      tierStarterPrice: '$0',
      tierStarterPeriod: 'түбөлүк акысыз',
      tierStarterDesc: 'Платформа менен таанышуу жана өз деңгээлин сынап көрүү үчүн эң сонун.',
      tierStarterFeatures: [
        'Бардык 15 киришүү модулуна жеткилик',
        'Адаптивдүү диагностикалык тест',
        'Дароо текшерилүүчү интерактивдүү көнүгүүлөр',
        'Прогрессти браузерде коопсуз сактоо',
      ],
      tierStudentTitle: 'Студент',
      tierStudentPrice: '$2.99',
      tierStudentPeriod: '/ айына',
      tierStudentBadge: 'Эң популярдуу',
      tierStudentDesc: 'Үзгүлтүксүз билим алуу үчүн толук окуу траекториясы.',
      tierStudentFeatures: [
        'Бардык 15 окуу багытына толук жеткилик',
        'Жеке AI-планды генерациялоо',
        'Контексттик AI-насаатчы (базалык суроолор)',
        'Көндүмдөрдү өздөштүрүүнүн толук аналитикасы',
        'Курсту аяктагандыгы тууралуу тастыктама',
      ],
      tierProTitle: 'Pro & Менторлук',
      tierProPrice: '$5.99',
      tierProPeriod: '/ айына',
      tierProDesc: 'Кесипке тез өтүү үчүн чексиз AI жана артыкчылыктуу колдоо.',
      tierProFeatures: [
        '«Студент» тарифинин бардык мүмкүнчүлүктөрү',
        'Чексиз ылдамдыктагы AI-насаатчы',
        'Каталарды терең талдоо жана жеке тапшырмалар',
        'Конспекттерди жана шпаргалкаларды көчүрүп алуу',
        'Методисттер менен түз байланыш каналы',
      ],

      faqTitle: 'Көп берилүүчү суроолор',
      faqSubtitle: 'Kivora платформасы жана окутуу методикасы тууралуу маанилүү маалыматтар.',
      faqList: [
        {
          q: 'Конференция учурунда платформа чындап эле акысызбы?',
          a: 'Ооба, 100% акысыз! Бардык 15 курс, диагностика, көнүгүүлөр жана AI-насаатчы конференция катышуучулары үчүн банк картасын талап кылбастан толук ачык.',
        },
        {
          q: 'Kivora AI-насаатчысы кадимки ChatGPTтен эмнеси менен айырмаланат?',
          a: 'Жөнөкөй бот дароо даяр жоопту жазып берип, сизди ойлонуудан ажыратат. Биздин насаатчы өтүп жаткан сабакты көрүп турат жана сиз өзүңүз жооп тармайынча багыттоочу суроолор менен жетелейт.',
        },
        {
          q: 'Интерфейс тилин өзгөртүүгө болобу?',
          a: 'Ооба. Kivora толугу менен үч тилдүү: англисче, орусча жана кыргызча. Каалаган учурда сайттын башкы тилкесинен же профиль жөндөөлөрүнөн алмаштыра аласыз.',
        },
        {
          q: 'Менин прогрессим жана жыйынтыктарым кайда сакталат?',
          a: 'MVP превьюсунда сиздин жетишкендиктериңиз браузердин эсинде ишенимдүү сакталат. Киргенден кийин Supabase булут базасына синхрондоштурууга болот.',
        },
        {
          q: 'Эмне үчүн каталогдо дал ушул 15 багыт бар?',
          a: 'Заманбап адиске бир гана көндүм жетишсиз. Ийгиликтүү карьера IT көндүмдөрүнүн (код, аналитика), тилдердин жана коммуникациянын (сүйлөшүүлөр, долбоор башкаруу) айкалышында түзүлөт.',
        },
        {
          q: 'Курсту бүтүргөндө тастыктама берилеби?',
          a: 'Ооба, багыттын бардык этаптарын жана текшерүү тапшырмаларын ийгиликтүү аяктагандан кийин санариптик тастыктама берилет.',
        },
      ],

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
      startCourse: 'Багытты баштоо',
      viewDetails: 'Толук маалымат',
      planned: 'Пландалган',
      filterSearch: 'Курстарды издөө…',
    },
    courseDetail: {
      hours: 'саат көлөмү',
      stages: 'модуль',
      lessons: 'сабак бардыгы',
      takeDiagnostic: 'Диагностикадан өтүү',
      goToLessons: 'Сабактарга өтүү',
      structureTitle: 'Багыттын түзүмү',
      whatYouCover: 'Багытта каралуучу негизги темалар:',
      backToCatalog: 'Каталогго кайтуу',
    },
    diagnostic: {
      badge: 'Деңгээлди аныктоо',
      introTitle: 'Киришүү диагностикасы',
      introDesc: 'суроо сиздин оптималдуу баштапкы чекитиңизди аныктайт:',
      bullet1: 'Болгону 3–5 мүнөт убакытты алат',
      bullet2: 'Негизги жана практикалык түшүнүктөрдү сынайт',
      bullet3: 'Жекече окуу планыңызды түзүп берет',
      startBtn: 'Тестти баштоо',
      qProgress: 'Суроо',
      questionLabel: 'Суроо',
      backBtn: 'Артка',
      nextBtn: 'Кийинки суроо',
      finishBtn: 'Тестти аяктоо',
      resultTitle: 'Диагностика аяктады!',
      correctOf: 'туура жооп берилди',
      yourLevel: 'Аныкталган баштапкы деңгээл',
      scoreLabel: 'Түшүнүү деңгээлинин упайы',
      planTitle: 'Сиздин жеке окуу планыңыз',
      aiPlanBadge: 'AI-план',
      structPlanBadge: 'Базалык программа',
      planPace: 'Сунушталган темп',
      weekLabel: 'Модуль',
      lessonsUnit: 'сабак',
      startLearningBtn: 'Биринчи сабакка өтүү',
      backToCourseBtn: 'Курстун сыпаттамасына кайтуу',
    },
    learn: {
      diagnosticHint: 'Өз деңгээлиңизди аныктап, ылайыкташтырылган план алуу үчүн диагностикадан өтүңүз.',
      startDiagnostic: 'Диагностикадан өтүү',
      overallProgress: 'Багыттын прогресси',
      continueBtn: 'Окууну улантуу',
      reviewBtn: 'Кайталоо',
      startBtn: 'Баштоо',
      completed: 'Аяктады',
      current: 'Учурдагы',
      available: 'Жеткиликтүү',
      locked: 'Жабык',
      allStagesCompleted: 'Багыт толугу менен аяктады! Мыкты иш.',
    },
    lesson: {
      breadcrumbPath: 'Окуу маршруту',
      readingTab: 'Теория жана концепциялар',
      exerciseTab: 'Практикалык тапшырма',
      completedBadge: 'Аяктады',
      toExerciseBtn: 'Тапшырмага өтүү',
      backToPath: 'Планга кайтуу',
      exerciseHeading: 'Практикалык тапшырма',
      typeAnswerPlaceholder: 'Жообуңузду жазыңыз…',
      showHintBtn: 'Кеңеш көрсөтүү',
      checkAnswerBtn: 'Чыгарылышты текшерүү',
      tryAgainBtn: 'Кайра аракет кылуу',
      nextLessonBtn: 'Кийинки сабак',
      finishCourseBtn: 'Багытты аяктоо',
      correctHeading: 'Туура!',
      incorrectHeading: 'Толук дал келбейт. Туура жооптун түшүндүрмөсү:',
      askTutorLink: 'Бул сабак боюнча AI-насаатчыдан суроо',
    },
    tutor: {
      backToLesson: 'Сабакка кайтуу',
      backToPath: 'Планга кайтуу',
      badgeDemo: 'Демо AI режими',
      inputPlaceholder: 'Сабак же түшүнүк боюнча сурооңузду жазыңыз…',
      sendBtn: 'Жөнөтүү',
      selectCourseHint: 'Так түшүндүрмө алуу үчүн насаатчыны сабактын ичинен ачыңыз.',
      browseCourses: 'Багытты тандоо',
      enterToSend: 'Enter жөнөтөт · Shift+Enter жаңы сапка өтөт',
      demoBannerText: 'Демонстрациялык методикалык жооптор колдонулууда. Чыныгы AI үчүн OPENAI_API_KEY кошуңуз.',
      errorPrefix: 'Ката',
      dismiss: 'Жабуу',
    },
    dashboard: {
      greeting: 'Кайрадан кош келиңиз,',
      signOutBtn: 'Чыгуу',
      demoBanner: 'Демо-режим активдүү. Бардык жетишкендиктериңиз браузерде сакталат.',
      yourCourses: 'Тандалган багыттар',
      noCoursesTitle: 'Сиз азырынча бир дагы багытка жазыла элексиз',
      noCoursesDesc: 'Каталогдон багыт тандап, кыска диагностикадан өтүңүз.',
      browseCoursesBtn: 'Каталогго өтүү',
      continueBtn: 'Улантуу',
      viewPathBtn: 'Маршрутка',
      askTutorBtn: 'Насаатчыга',
      exploreMore: 'Сунушталган багыттар',
      analyzerTitle: 'Прогресс талдоочусу',
      analyzerSubtitle: 'Иш жүзүндө аткарылган практикалык тапшырмаларга негизделген так талдоо.',
      analyzerNextStep: 'Сунушталган кийинки кадам',
      analyzerContinueStudy: 'Көндүмдөрдү бекемдөө үчүн активдүү курсту улантыңыз.',
      analyzerCompletedRatio: 'сабак ийгиликтүү өздөштүрүлдү',
      analyzerActivePace: 'Үзгүлтүксүз окуу',
      allUpToDate: 'Тандалган курстар боюнча бардык сабактар аткарылды жана актуалдуу!',
      profileSettingsBtn: 'Профиль жөндөөлөрү',
      editProfileTitle: 'Профиль жана окуу максаттары',
      displayNameLabel: 'Колдонуучунун аты',
      avatarLabel: 'Аватар тандаңыз',
      dailyGoalLabel: 'Күнүмдүк максат',
      minutesUnit: 'мүнөт/күн',
      interfaceLangLabel: 'Интерфейс тили',
      saveChangesBtn: 'Жөндөөлөрдү сактоо',
      profileSaved: 'Профиль ийгиликтүү жаңыртылды!',
      closeBtn: 'Жабуу',
    },
    auth: {
      signInTab: 'Кирүү',
      registerTab: 'Катталуу',
      nameLabel: 'Аты-жөнү',
      namePlaceholder: 'Асан Үсөнов',
      emailLabel: 'Электрондук дарек',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Сыр сөз',
      passwordPlaceholder: 'Сыр сөзүңүз',
      passwordRegisterPlaceholder: 'Сыр сөз түзүңүз (кеминде 8 белги)',
      minChars: 'Кеминде 8 белги',
      signInBtn: 'Kivoraга кирүү',
      registerBtn: 'Катталуу',
      noAccountPrompt: 'Аккаунтуңуз жокпу?',
      haveAccountPrompt: 'Катталгансызбы?',
      demoModeNotice: 'Supabase кошула элек. Конок сессиясы иштеп жатат.',
    },
    common: {
      loading: 'Жүктөлүүдө…',
      demoMode: 'Демо-режим',
      tryAgain: 'Кайра аракет кылуу',
      error: 'Ката кетти',
      beginner: 'Башталгыч',
      elementary: 'Базалык',
      intermediate: 'Орто',
      advanced: 'Өркүндөтүлгөн',
      preIntermediate: 'Базалыктан төмөн',
    },
  },
};
