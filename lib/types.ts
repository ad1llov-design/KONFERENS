// ─── Locales ─────────────────────────────────────────────────────────────────
export type Locale = 'en' | 'ru' | 'ky';

// ─── Course Structure ───────────────────────────────────────────────────────

export type CourseId =
  // Languages
  | 'english-a1-a2'
  | 'chinese-intro'
  | 'german-a1'
  | 'korean-hangul'
  | 'spanish-a1'
  // Technology
  | 'python-fundamentals'
  | 'javascript-basics'
  | 'web-development'
  | 'data-analytics'
  | 'artificial-intelligence'
  // Professional Skills
  | 'ui-ux-design'
  | 'digital-marketing'
  | 'project-management'
  | 'entrepreneurship'
  | 'communication-skills';

export type CourseCategory = 'programming' | 'languages' | 'professional';
export type LessonStatus = 'locked' | 'available' | 'current' | 'completed';
export type StageStatus  = 'locked' | 'available' | 'current' | 'completed';
export type UserLevel    = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'pre-intermediate';

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'code-output'
  | 'translation';

export interface Exercise {
  id:            string;
  type:          ExerciseType;
  question:      string;
  /** Optional code snippet to inspect or fix */
  codeSnippet?:  string;
  /** Multiple choice options (if applicable) */
  options?:      string[];
  /**
   * For multiple-choice: index (0-based) of the correct option.
   * For fill-blank / translation / code-output: the exact correct string.
   */
  correctAnswer: string | number;
  explanation:   string;
  hint?:         string;
}

export interface Lesson {
  id:         string;
  stageId:    string;
  courseId:   CourseId;
  order:      number;
  title:      string;
  /** HTML-safe teaching content (plain text with simple markup) */
  content:    string;
  /** In-depth theory / architecture breakdown opened by "Подробнее" button */
  deepDive?:  string;
  /** Primary / single exercise for backward compatibility */
  exercise:   Exercise;
  /** Multi-check exercises: minimum 3 checks per lesson */
  exercises?: Exercise[];
}

export interface Stage {
  id:          string;
  courseId:    CourseId;
  order:       number;
  title:       string;
  description: string;
  lessons:     Lesson[];
}

export interface Course {
  id:             CourseId;
  title:          string;
  tagline:        string;
  description:    string;
  level:          string;
  category:       CourseCategory;
  estimatedHours: number;
  stages:         Stage[];
  /** Topics shown in course catalog as "coming soon" / overview */
  topicsPreview:  string[];
}

// ─── Diagnostic ─────────────────────────────────────────────────────────────

export type DifficultyCeil = 'beginner' | 'elementary' | 'pre-intermediate';

export interface DiagnosticQuestion {
  id:            string;
  courseId:      CourseId;
  question:      string;
  options:       string[];
  correctAnswer: number; // 0-based index
  difficulty:    DifficultyCeil;
}

export interface DiagnosticResult {
  courseId:   CourseId;
  score:      number; // 0–100
  level:      UserLevel;
  correctCount: number;
  totalCount:   number;
  answers:    Record<string, number>; // questionId → chosen option index
}

// ─── Progress ───────────────────────────────────────────────────────────────

export interface LessonCompletion {
  lessonId:    string;
  courseId:    CourseId;
  completedAt: string; // ISO timestamp
  score?:      number; // 0-100 if exercise was graded
  correct?:    boolean;
}

export interface CourseProgress {
  courseId:          CourseId;
  level:             UserLevel;
  enrolledAt:        string;
  completedLessons:  string[];  // lesson IDs
  currentLessonId:   string | null;
  currentStageId:    string | null;
  diagnosticAttempt: DiagnosticResult | null;
}

// ─── Theme ──────────────────────────────────────────────────────────────────
export type ThemeMode = 'light' | 'dark' | 'system';

// ─── User / Session ─────────────────────────────────────────────────────────

export interface UserProfile {
  id:                string;
  email:             string;
  displayName:       string | null;
  avatar?:           string;
  dailyGoalMinutes?: number;
  locale?:           Locale;
  theme?:            ThemeMode;
  soundEnabled?:     boolean;
  soundVolume?:      number;
  createdAt:         string;
}

// ─── AI Tutor ───────────────────────────────────────────────────────────────

export type TutorMessageRole = 'user' | 'assistant' | 'system';

export interface TutorMessage {
  id:        string;
  role:      TutorMessageRole;
  content:   string;
  createdAt: string;
}

export interface TutorContext {
  courseId:   CourseId;
  courseName: string;
  level:      UserLevel;
  lessonId?:  string;
  lessonTitle?: string;
  stageName?: string;
  locale?:    Locale;
}

// ─── Learning Plan ───────────────────────────────────────────────────────────

export interface LearningPlanWeek {
  week:        number;
  focus:       string;
  stageId:     string;
  lessonIds:   string[];
  goalSummary: string;
}

export interface LearningPlan {
  courseId:       CourseId;
  level:          UserLevel;
  weeklyMinutes:  number;
  totalWeeks:     number;
  weeks:          LearningPlanWeek[];
  generatedAt:    string;
  isAIGenerated:  boolean;
}

// ─── App State (demo / local) ────────────────────────────────────────────────

export interface AppDemoState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  progress: Record<CourseId, CourseProgress>;
  tutorMessages: Record<CourseId, TutorMessage[]>;
  learningPlan: LearningPlan | null;
  learningPlans?: Record<string, LearningPlan>;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiError {
  error:   string;
  code?:   string;
  details?: string;
}

export interface ScoreDiagnosticResponse {
  result: DiagnosticResult;
}

export interface CompleteLessonResponse {
  progress:  CourseProgress;
  xpEarned?: number;
}

export interface TutorResponse {
  message:    string;
  isDemo:     boolean;
  tokensUsed?: number;
}
