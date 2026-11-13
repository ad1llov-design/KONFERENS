import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { getCourse, COURSES } from '@/lib/data/courses';
import { CourseDetailView } from '@/components/course/CourseDetailView';
import type { CourseId } from '@/lib/types';

export function generateStaticParams() {
  return COURSES.map(course => ({ id: course.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id as CourseId);
  return { title: course?.title ?? 'Course' };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id as CourseId);
  if (!course) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <CourseDetailView course={course} />
      </main>
    </div>
  );
}