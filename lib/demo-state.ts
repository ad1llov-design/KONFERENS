'use client';

import type {
  AppDemoState,
  CourseId,
  CourseProgress,
  DiagnosticResult,
  LessonCompletion,
  TutorMessage,
  UserLevel,
  LearningPlan,
  UserProfile,
} from '@/lib/types';
import { getCourse, getFirstLesson, getNextLesson, getAllLessons } from '@/lib/data/courses';

const STORAGE_KEY = 'kivora_demo_state';

// ─── Default / empty state ───────────────────────────────────────────────────

function emptyProgress(courseId: CourseId): CourseProgress {
  return {
    courseId,
    level: 'beginner',
    enrolledAt: new Date().toISOString(),
    completedLessons: [],
    currentLessonId: getFirstLesson(courseId)?.id ?? null,
    currentStageId:  getCourse(courseId)?.stages[0]?.id ?? null,
    diagnosticAttempt: null,
  };
}

function defaultState(): AppDemoState {
  return {
    isAuthenticated: false,
    user: null,
    progress: {} as Record<CourseId, CourseProgress>,
    tutorMessages: {} as Record<CourseId, TutorMessage[]>,
    learningPlan: null,
  };
}

// ─── Load / Save ─────────────────────────────────────────────────────────────

function loadState(): AppDemoState {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return JSON.parse(raw) as AppDemoState;
  } catch {
    return defaultState();
  }
}

function saveState(state: AppDemoState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage quota or SSR — silent
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const DemoState = {
  get(): AppDemoState {
    return loadState();
  },

  // ── Auth ──────────────────────────────────────────────────────────────────

  signIn(email: string, displayName?: string): void {
    const state = loadState();
    state.isAuthenticated = true;
    state.user = {
      id: 'demo-user',
      email,
      displayName: displayName ?? email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    saveState(state);
  },

  signOut(): void {
    saveState(defaultState());
  },

  isAuthenticated(): boolean {
    return loadState().isAuthenticated;
  },

  getUser() {
    return loadState().user;
  },

  updateProfile(updates: Partial<UserProfile>): void {
    const state = loadState();
    if (!state.user) {
      state.user = {
        id: 'demo-user',
        email: 'learner@kivora.app',
        displayName: 'Learner',
        avatar: '🦊',
        dailyGoalMinutes: 20,
        createdAt: new Date().toISOString(),
      };
    }
    state.user = {
      ...state.user,
      ...updates,
    };
    saveState(state);
  },

  // ── Enrollment ────────────────────────────────────────────────────────────

  enroll(courseId: CourseId): void {
    const state = loadState();
    if (!state.progress[courseId]) {
      state.progress[courseId] = emptyProgress(courseId);
    }
    saveState(state);
  },

  isEnrolled(courseId: CourseId): boolean {
    const state = loadState();
    return Boolean(state.progress[courseId]);
  },

  getEnrolledCourses(): CourseId[] {
    const state = loadState();
    return Object.keys(state.progress) as CourseId[];
  },

  // ── Diagnostic ────────────────────────────────────────────────────────────

  saveDiagnosticResult(result: DiagnosticResult): void {
    const state = loadState();
    if (!state.progress[result.courseId]) {
      state.progress[result.courseId] = emptyProgress(result.courseId);
    }
    state.progress[result.courseId].level = result.level;
    state.progress[result.courseId].diagnosticAttempt = result;
    saveState(state);
  },

  getDiagnosticResult(courseId: CourseId): DiagnosticResult | null {
    return loadState().progress[courseId]?.diagnosticAttempt ?? null;
  },

  // ── Lesson progress ───────────────────────────────────────────────────────

  completeLesson(completion: LessonCompletion): void {
    const { courseId, lessonId } = completion;
    const state = loadState();
    if (!state.progress[courseId]) {
      state.progress[courseId] = emptyProgress(courseId);
    }
    const prog = state.progress[courseId];

    if (!prog.completedLessons.includes(lessonId)) {
      prog.completedLessons.push(lessonId);
    }

    // Advance to next lesson
    const nextLesson = getNextLesson(courseId, lessonId);
    prog.currentLessonId = nextLesson?.id ?? null;
    if (nextLesson) {
      prog.currentStageId = nextLesson.stageId;
    }

    saveState(state);
  },

  getProgress(courseId: CourseId): CourseProgress | null {
    return loadState().progress[courseId] ?? null;
  },

  isLessonCompleted(courseId: CourseId, lessonId: string): boolean {
    return loadState().progress[courseId]?.completedLessons.includes(lessonId) ?? false;
  },

  getLessonStatus(
    courseId: CourseId,
    lessonId: string
  ): 'locked' | 'available' | 'current' | 'completed' {
    const prog = loadState().progress[courseId];
    if (!prog) return 'locked';

    if (prog.completedLessons.includes(lessonId)) return 'completed';
    if (prog.currentLessonId === lessonId) return 'current';

    // Determine if available: all previous lessons in the course completed
    const allLessons = getAllLessons(courseId);
    const idx = allLessons.findIndex(l => l.id === lessonId);
    if (idx <= 0) return 'available'; // first lesson always available

    const prevLesson = allLessons[idx - 1];
    if (prog.completedLessons.includes(prevLesson.id)) return 'available';

    return 'locked';
  },

  getLevel(courseId: CourseId): UserLevel {
    return loadState().progress[courseId]?.level ?? 'beginner';
  },

  getCompletionPercent(courseId: CourseId): number {
    const prog = loadState().progress[courseId];
    if (!prog) return 0;
    const total = getAllLessons(courseId).length;
    if (total === 0) return 0;
    return Math.round((prog.completedLessons.length / total) * 100);
  },

  // ── Tutor messages ────────────────────────────────────────────────────────

  getTutorMessages(courseId: CourseId): TutorMessage[] {
    return loadState().tutorMessages[courseId] ?? [];
  },

  addTutorMessage(courseId: CourseId, message: TutorMessage): void {
    const state = loadState();
    if (!state.tutorMessages[courseId]) {
      state.tutorMessages[courseId] = [];
    }
    state.tutorMessages[courseId].push(message);
    // Keep last 50 messages
    if (state.tutorMessages[courseId].length > 50) {
      state.tutorMessages[courseId] = state.tutorMessages[courseId].slice(-50);
    }
    saveState(state);
  },

  clearTutorMessages(courseId: CourseId): void {
    const state = loadState();
    state.tutorMessages[courseId] = [];
    saveState(state);
  },

  // ── Learning Plan ─────────────────────────────────────────────────────────

  saveLearningPlan(plan: LearningPlan): void {
    const state = loadState();
    if (!state.learningPlans) {
      state.learningPlans = {};
    }
    state.learningPlans[plan.courseId] = plan;
    state.learningPlan = plan;
    saveState(state);
  },

  getLearningPlan(courseId: CourseId): LearningPlan | null {
    const state = loadState();
    return state.learningPlans?.[courseId] ?? (state.learningPlan?.courseId === courseId ? state.learningPlan : null);
  },

  // ── Reset ─────────────────────────────────────────────────────────────────

  reset(): void {
    saveState(defaultState());
  },
};
