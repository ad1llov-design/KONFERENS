import { type NextRequest, NextResponse } from 'next/server';
import type { CourseId } from '@/lib/types';
import { getLesson, getAllLessons } from '@/lib/data/courses';

const VALID_COURSE_IDS: CourseId[] = ['python-fundamentals', 'english-a1-a2'];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { courseId, lessonId, correct, score } = body as {
    courseId: unknown;
    lessonId: unknown;
    correct?: unknown;
    score?: unknown;
  };

  if (!courseId || !VALID_COURSE_IDS.includes(courseId as CourseId)) {
    return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
  }
  if (!lessonId || typeof lessonId !== 'string') {
    return NextResponse.json({ error: 'Invalid lessonId' }, { status: 400 });
  }

  const typedCourseId = courseId as CourseId;
  const lesson = getLesson(typedCourseId, lessonId);
  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found in this course' }, { status: 404 });
  }

  // Note: in full implementation with Supabase, we would:
  // 1. Get the authenticated user from the session
  // 2. Write lesson_completion row
  // 3. Return updated CourseProgress from DB
  // For now we return a confirmed completion event the client can use.

  const allLessons = getAllLessons(typedCourseId);
  const lessonIdx = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = lessonIdx < allLessons.length - 1 ? allLessons[lessonIdx + 1] : null;

  return NextResponse.json({
    confirmed: true,
    lessonId,
    courseId: typedCourseId,
    nextLessonId: nextLesson?.id ?? null,
    completedAt: new Date().toISOString(),
    correct: Boolean(correct),
    score: typeof score === 'number' ? Math.min(100, Math.max(0, score)) : null,
  });
}
