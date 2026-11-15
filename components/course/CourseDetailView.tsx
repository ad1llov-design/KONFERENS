'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Sparkles,
  Target,
  MessageSquare,
  ChevronDown,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DemoEnrollModal } from '@/components/modals/DemoEnrollModal';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedCourse } from '@/lib/data/course-localization';
import { getLocalizedCourseWithStages } from '@/lib/data/course-content-localization';
import type { Course } from '@/lib/types';

interface CourseDetailViewProps {
  course: Course;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const { t, locale } = useLanguage();
  const loc = getLocalizedCourse(course, locale);
  const localizedCourse = getLocalizedCourseWithStages(course, locale);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const totalLessons = course.stages.reduce((acc, s) => acc + s.lessons.length, 0);

  const categoryLabel =
    course.category === 'programming'
      ? t.catalog.techCategory
      : course.category === 'languages'
      ? t.catalog.langCategory
      : t.catalog.profCategory;

  const categoryBadgeVariant =
    course.category === 'programming'
      ? 'blue'
      : course.category === 'languages'
      ? 'accent'
      : 'success';

  // Localized audience profiles
  const audienceProfiles = locale === 'ru'
    ? [
        { title: 'Студентам и начинающим', desc: 'Освойте фундамент направления с нуля по пошаговой персональной траектории.' },
        { title: 'Практикующим специалистам', desc: 'Закройте пробелы в знаниях после быстрой диагностики и прокачайте навыки.' },
        { title: 'Самостоятельным учащимся', desc: 'Учитесь в удобном ритме с поддержкой AI-тьютора без скучных часовых лекций.' },
      ]
    : locale === 'ky'
    ? [
        { title: 'Студенттерге жана жаңы баштагандарга', desc: 'Багыттын пайдубалын нөлдөн баштап, кадам-кадам жеке маршрут менен үйрөнүңүз.' },
        { title: 'Иштеп жаткан адистерге', desc: 'Тез диагностика аркылуу билимиңизди текшерип, кемчиликтерди жоюңуз.' },
        { title: 'Өз алдынча окугандарга', desc: 'Узун лекцияларсыз, AI-тьютордун жардамы менен өзүңүзгө ыңгайлуу убакта окуңуз.' },
      ]
    : [
        { title: 'Students & Beginners', desc: 'Master foundational concepts from scratch with a personalized step-by-step roadmap.' },
        { title: 'Upskilling Professionals', desc: 'Pinpoint knowledge gaps through adaptive diagnostic tests and sharpen core skills.' },
        { title: 'Independent Learners', desc: 'Learn at your own pace with Socratic AI guidance instead of passive video watching.' },
      ];

  const courseFaqs = locale === 'ru'
    ? [
        { q: 'Нужен ли предварительный опыт для старта?', a: 'Нет, курс начинается с входной диагностики, которая определяет ваш уровень и выстраивает посильный маршрут от основ до практики.' },
        { q: 'Сколько времени занимает обучение?', a: `Программа рассчитана примерно на ${course.estimatedHours} академических часов. Вы можете проходить уроки в своём темпе — по 20–30 минут в день.` },
        { q: 'Как проверяются задания?', a: 'Каждый урок включает интерактивное упражнение с автоматической проверкой и подробным объяснением решения, а AI-тьютор всегда готов подсказать следующий шаг.' },
      ]
    : locale === 'ky'
    ? [
        { q: 'Баштоо үчүн мурунку тажрыйба керекпи?', a: 'Жок, курс киришүү диагностикасынан башталат. Ал сиздин деңгээлиңизди аныктап, негизги кадамдардан баштап ылайыктуу жолду түзөт.' },
        { q: 'Окуу канча убакытты алат?', a: `Программа болжол менен ${course.estimatedHours} академиялык саатка эсептелген. Күнүнө 20–30 мүнөт бөлүп, өз темпиңизде окуй аласыз.` },
        { q: 'Тапшырмалар кандай текшерилет?', a: 'Ар бир сабакта автоматтык текшерүү менен интерактивдүү көнүгүү бар. Чечимдин толук түшүндүрмөсү берилет жана AI-тьютор жардамга келет.' },
      ]
    : [
        { q: 'Do I need prior experience before starting?', a: 'No, each course begins with an adaptive diagnostic assessment to calibrate your starting level and build a tailored path.' },
        { q: 'How much time does it take to complete?', a: `The syllabus covers approximately ${course.estimatedHours} learning hours. You can study at your own pace — e.g. 20–30 minutes daily.` },
        { q: 'How are practical exercises assessed?', a: 'Every lesson features an interactive hands-on exercise with instant evaluation, rationale, and on-demand Socratic AI hints.' },
      ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      {/* ── 1. Commercial Hero Header ─────────────────────────────────────── */}
      <div className="surface rounded-[var(--r-xl)] p-6 md:p-8 mb-10 border border-border shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={categoryBadgeVariant}>
                {categoryLabel}
              </Badge>
              <Badge variant="muted">{loc.level}</Badge>
              <Badge variant="accent">
                <Sparkles className="w-3 h-3 mr-1" />
                {t.courseDetail.freeDemoBadge}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              {loc.title}
            </h1>
            <p className="text-muted leading-relaxed mb-6 text-sm md:text-base max-w-2xl">
              {loc.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-accent" />
                {course.estimatedHours} {t.courseDetail.hours}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="h-4 w-4 text-accent" />
                {course.stages.length} {t.courseDetail.stages}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Target className="h-4 w-4 text-accent" />
                {totalLessons} {t.courseDetail.lessons}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link href={`/courses/${course.id}/diagnostic`}>
              <Button size="lg" className="w-full">
                {t.courseDetail.takeDiagnostic}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/courses/${course.id}/learn`}>
              <Button size="lg" variant="secondary" className="w-full">
                {t.courseDetail.goToLessons}
              </Button>
            </Link>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="px-4 py-2 text-xs font-semibold text-accent hover:underline text-center"
            >
              {t.courseDetail.consultationBtn}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Who is this course for (Кому подойдёт курс) ────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">
          {t.courseDetail.whoIsItForTitle}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {audienceProfiles.map((p, i) => (
            <div key={i} className="surface rounded-[var(--r-lg)] p-5 border border-border shadow-xs">
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center mb-3">
                {i + 1}
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1.5">{p.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. What you will master (Чему вы научитесь) ───────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">
          {t.courseDetail.skillsTitle}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {loc.topicsPreview.map(topic => (
            <div
              key={topic}
              className="flex items-center gap-3 text-sm surface p-4 rounded-[var(--r-md)] border border-border shadow-xs"
            >
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
              <span className="text-foreground font-medium text-xs md:text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Learning Format (Формат обучения) ──────────────────────────── */}
      <section className="mb-12 surface rounded-[var(--r-xl)] p-6 md:p-8 border border-border">
        <h2 className="text-xl font-bold text-foreground mb-5">
          {t.courseDetail.formatTitle}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-surface-raised p-4 rounded-[var(--r-md)] border border-border">
            <BookOpen className="w-5 h-5 text-accent mb-2" />
            <h4 className="font-bold text-foreground mb-1">Микро-уроки</h4>
            <p className="text-muted leading-relaxed">Пошаговая теория с понятными разборами без воды.</p>
          </div>
          <div className="bg-surface-raised p-4 rounded-[var(--r-md)] border border-border">
            <CheckCircle2 className="w-5 h-5 text-success mb-2" />
            <h4 className="font-bold text-foreground mb-1">Мгновенная проверка</h4>
            <p className="text-muted leading-relaxed">Интерактивные упражнения с подробным обоснованием.</p>
          </div>
          <div className="bg-surface-raised p-4 rounded-[var(--r-md)] border border-border">
            <MessageSquare className="w-5 h-5 text-accent mb-2" />
            <h4 className="font-bold text-foreground mb-1">AI-Тьютор</h4>
            <p className="text-muted leading-relaxed">Сократические подсказки и разбор ошибок 24/7.</p>
          </div>
          <div className="bg-surface-raised p-4 rounded-[var(--r-md)] border border-border">
            <Award className="w-5 h-5 text-amber mb-2" />
            <h4 className="font-bold text-foreground mb-1">Финишный счётчик</h4>
            <p className="text-muted leading-relaxed">Наглядная настольная дорожка до цели курса.</p>
          </div>
        </div>
      </section>

      {/* ── 5. Detailed Program Syllabus (Программа курса) ────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-5">
          {t.courseDetail.syllabusTitle}
        </h2>
        <div className="flex flex-col gap-4">
          {localizedCourse.stages.map((stage, si) => (
            <div key={stage.id} className="surface rounded-[var(--r-lg)] overflow-hidden border border-border shadow-xs">
              <div className="px-5 py-4 border-b border-border flex items-center gap-3 bg-surface-raised/60">
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                  {si + 1}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm md:text-base">{stage.title}</h3>
                  <p className="text-xs text-muted mt-0.5">{stage.description}</p>
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {stage.lessons.map(lesson => (
                  <div key={lesson.id} className="px-5 py-3 flex items-center gap-3 hover:bg-surface-raised/40 transition-colors">
                    {si === 0 ? (
                      <Circle className="h-4 w-4 text-accent shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted shrink-0 opacity-40" />
                    )}
                    <span className="text-xs sm:text-sm text-foreground font-medium">{lesson.title}</span>
                    <span className="ml-auto text-[10px] text-muted bg-surface px-2 py-0.5 rounded border border-border/40 shrink-0">
                      {lesson.exercise.type.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Course FAQ & Prerequisites (Часто задаваемые вопросы) ──────── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">
          {t.courseDetail.faqTitle}
        </h2>
        <div className="flex flex-col gap-3">
          {courseFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="surface rounded-[var(--r-md)] border border-border overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-foreground hover:bg-surface-raised transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={[
                      'h-4 w-4 text-muted transition-transform shrink-0 ml-3',
                      isOpen ? 'rotate-180 text-accent' : '',
                    ].join(' ')}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-muted leading-relaxed border-t border-border">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Commercial Banner & Consultation Modal Trigger ─────────────── */}
      <div className="surface-raised rounded-[var(--r-xl)] p-6 md:p-8 border border-border text-center">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
          Готовы начать изучение «{loc.title}»?
        </h3>
        <p className="text-xs md:text-sm text-muted max-w-lg mx-auto mb-6">
          Пройдите входную диагностику за 3 минуты или запишитесь на персональную консультацию.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/courses/${course.id}/diagnostic`}>
            <Button size="md">
              {t.courseDetail.takeDiagnostic}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <button
            onClick={() => setShowEnrollModal(true)}
            className="px-5 py-2.5 rounded-[var(--r-md)] border border-border bg-surface text-foreground font-medium text-sm hover:border-accent/40 shadow-xs transition-colors"
          >
            {t.courseDetail.consultationBtn}
          </button>
        </div>
      </div>

      {/* Enrollment & Consultation Modal */}
      <DemoEnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        courseTitle={loc.title}
      />
    </div>
  );
}
