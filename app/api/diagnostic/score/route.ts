import { type NextRequest, NextResponse } from 'next/server';
import { scoreDiagnostic, getDiagnosticQuestions } from '@/lib/data/diagnostics';
import { COURSES } from '@/lib/data/courses';
import type { CourseId, DiagnosticResult } from '@/lib/types';

const VALID_COURSE_IDS: CourseId[] = COURSES.map(c => c.id);

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

  const { courseId, answers } = body as { courseId: unknown; answers: unknown };

  // Validate courseId
  if (!courseId || !VALID_COURSE_IDS.includes(courseId as CourseId)) {
    return NextResponse.json(
      { error: `Invalid courseId. Must be one of: ${VALID_COURSE_IDS.join(', ')}` },
      { status: 400 }
    );
  }

  // Validate answers
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return NextResponse.json(
      { error: 'answers must be an object mapping questionId to chosen option index' },
      { status: 400 }
    );
  }

  const typedCourseId = courseId as CourseId;
  const typedAnswers = answers as Record<string, unknown>;

  // Validate answer values are integers
  const sanitisedAnswers: Record<string, number> = {};
  for (const [qId, val] of Object.entries(typedAnswers)) {
    const n = Number(val);
    if (!Number.isInteger(n) || n < 0 || n > 10) continue; // skip malformed
    sanitisedAnswers[qId] = n;
  }

  // Validate question IDs belong to this course
  const validQuestions = getDiagnosticQuestions(typedCourseId);
  const validIds = new Set(validQuestions.map(q => q.id));
  const filteredAnswers: Record<string, number> = {};
  for (const [qId, val] of Object.entries(sanitisedAnswers)) {
    if (validIds.has(qId)) filteredAnswers[qId] = val;
  }

  // Score deterministically
  const { score, level, correctCount, totalCount } = scoreDiagnostic(typedCourseId, filteredAnswers);

  const result: DiagnosticResult = {
    courseId: typedCourseId,
    score,
    level,
    correctCount,
    totalCount,
    answers: filteredAnswers,
  };

  return NextResponse.json({ result });
}
