'use client';

import { useState, useEffect, useMemo, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  Target,
  Bookmark,
  CheckSquare,
  ChevronRight,
  Flame,
  Smile,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CodeBlock } from '@/components/lesson/CodeBlock';
import { PythonDefBreakdown } from '@/components/lesson/PythonDefBreakdown';
import { HtmlCssPreview } from '@/components/lesson/HtmlCssPreview';
import { LessonTextToSpeech } from '@/components/lesson/LessonTextToSpeech';
import { KiviSticker } from '@/components/lesson/KiviSticker';
import { MemeSticker, type MemeType } from '@/components/lesson/MemeSticker';
import { MemePopupModal } from '@/components/lesson/MemePopupModal';
import { TalkingMascot } from '@/components/mascot/TalkingMascot';
import { LessonDeepDive } from '@/components/lesson/LessonDeepDive';
import { SoundToggle } from '@/components/sound/SoundToggle';
import { soundManager } from '@/lib/sound/sound-manager';
import { toxicTutor, type CoachMode } from '@/lib/sound/toxic-tutor';
import { getLesson, getNextLesson, getLessonStage } from '@/lib/data/courses';
import { getLocalizedLesson, getLocalizedStage } from '@/lib/data/course-content-localization';
import { DemoState } from '@/lib/demo-state';
import { useLanguage } from '@/lib/i18n/context';
import type { CourseId, Exercise } from '@/lib/types';

type AnswerState = 'idle' | 'correct' | 'incorrect';

/**
 * Splits lesson markdown content into blocks (markdown text and syntax-highlighted code blocks)
 */
function RichLessonContent({
  content,
  lessonId,
  courseId,
}: {
  content: string;
  lessonId: string;
  courseId: string;
}) {
  // Regex to split code blocks: ```lang ... ```
  const parts = content.split(/(```[a-zA-Z0-9_\-]*\r?\n[\s\S]*?```)/g);

  const isPythonFunctionLesson =
    courseId === 'python-fundamentals' &&
    (lessonId.includes('s3') || content.includes('def ') || content.includes('def calculate'));

  const isHtmlCssLesson =
    courseId === 'web-development' &&
    (lessonId.includes('s1') || lessonId.includes('s2') || content.includes('<header>') || content.includes('display: flex'));

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        const codeMatch = part.match(/^```([a-zA-Z0-9_\-]*)\r?\n([\s\S]*?)```$/);
        if (codeMatch) {
          const lang = codeMatch[1] || (courseId.includes('python') ? 'python' : courseId.includes('javascript') ? 'javascript' : 'html');
          const code = codeMatch[2];
          return (
            <CodeBlock
              key={index}
              code={code}
              language={lang}
              showLineNumbers={true}
            />
          );
        }

        // Render prose block
        if (!part.trim()) return null;

        return (
          <div
            key={index}
            className="lesson-prose"
            dangerouslySetInnerHTML={{
              __html: part
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-foreground mt-4 mb-2">$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\| (.+) \|/g, (m) => `<div class="table-row">${m}</div>`)
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/(<li>[\s\S]*?<\/li>)+/g, (m) => `<ul>${m}</ul>`)
                .replace(/\n\n/g, '<br/>')
                .replace(/\n(?!<)/g, ' '),
            }}
          />
        );
      })}

      {/* Embedded Python Function Dissection Card when discussing def/functions */}
      {isPythonFunctionLesson && <PythonDefBreakdown />}

      {/* Embedded HTML/CSS Live Preview when discussing Web markup and styles */}
      {isHtmlCssLesson && (
        <HtmlCssPreview
          htmlCode={`<div class="card">\n  <h3>HTML & CSS</h3>\n  <p>Стили преображают страницу</p>\n</div>`}
          cssCode={`.card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n}`}
          previewType="card"
          ruleExplanation="Свойство border-radius: 12px мягко скругляет края блока, а box-shadow создает ощущение парящей карточки над фоном."
        />
      )}
    </div>
  );
}

function LessonBody({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = use(params);
  const courseId = id as CourseId;
  const router = useRouter();
  const { t, locale } = useLanguage();

  const rawLesson = getLesson(courseId, lessonId);
  const rawStage = getLessonStage(courseId, lessonId);
  const rawNextLesson = getNextLesson(courseId, lessonId);

  const lesson = rawLesson ? getLocalizedLesson(courseId, rawLesson, locale) : undefined;
  const stage = rawStage ? getLocalizedStage(courseId, rawStage, locale) : undefined;
  const nextLesson = rawNextLesson ? getLocalizedLesson(courseId, rawNextLesson, locale) : undefined;

  // Normalized list of 3+ exercises
  const exercises: Exercise[] = useMemo(() => {
    if (!lesson) return [];
    return lesson.exercises && lesson.exercises.length > 0 ? lesson.exercises : [lesson.exercise];
  }, [lesson]);

  const [phase, setPhase] = useState<'reading' | 'exercise'>('reading');
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [coachMode, setCoachMode] = useState<CoachMode>('friendly');
  const [currentMeme, setCurrentMeme] = useState<MemeType>('facepalm');
  const [roastSpeechText, setRoastSpeechText] = useState<string>('');
  const [showMobileCompanion, setShowMobileCompanion] = useState(false);
  const [showMemeModal, setShowMemeModal] = useState(false);

  useEffect(() => {
    setCoachMode(toxicTutor.getMode());
  }, []);

  function toggleCoachMode() {
    const next = toxicTutor.toggleMode();
    setCoachMode(next);
  }

  useEffect(() => {
    if (lesson) {
      const isDone = DemoState.isLessonCompleted(courseId, lessonId);
      setAlreadyCompleted(isDone);
      if (isDone) {
        setCompletedExercises(exercises.map((_, i) => i));
      }
    }
  }, [courseId, lessonId, lesson, exercises]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">
          {t.common.error}.{' '}
          <Link href={`/courses/${courseId}/learn`} className="text-accent underline font-medium">
            {t.lesson.backToPath}
          </Link>
        </p>
      </div>
    );
  }

  const ex = exercises[currentExIndex] || lesson.exercise;
  const totalExercises = exercises.length;

  // Exercise selection handler
  function selectExercise(idx: number) {
    setCurrentExIndex(idx);
    setUserAnswer(null);
    setAnswerState('idle');
    setShowHint(false);
    setShowMemeModal(false);
    toxicTutor.stopSpeaking();
  }

  // Answer validation
  async function checkAnswer() {
    if (userAnswer === null || userAnswer === '') return;
    const correct =
      ex.type === 'multiple-choice'
        ? userAnswer === ex.correctAnswer
        : String(userAnswer).trim().toLowerCase() === String(ex.correctAnswer).toLowerCase();

    if (correct) {
      setAnswerState('correct');
      const winMemes: MemeType[] =
        locale === 'ky'
          ? ['bazar-zhoq', 'zharaysyn', 'gigachad']
          : ['gigachad', 'galaxy-brain'];
      const chosenMeme = winMemes[Math.floor(Math.random() * winMemes.length)];
      setCurrentMeme(chosenMeme);
      setShowMemeModal(true);

      if (coachMode === 'roast') {
        toxicTutor.recordSuccess();
        const roastResult = toxicTutor.playRoastEvent('correct', locale);
        setRoastSpeechText(roastResult.text);
      }

      if (!completedExercises.includes(currentExIndex)) {
        const nextCompleted = [...completedExercises, currentExIndex];
        setCompletedExercises(nextCompleted);

        // If all checks are completed, record lesson progress and play complete milestone fanfare
        if (nextCompleted.length >= totalExercises && !alreadyCompleted) {
          if (coachMode === 'friendly') {
            soundManager.playComplete();
          }
          DemoState.completeLesson({
            lessonId,
            courseId,
            completedAt: new Date().toISOString(),
            correct: true,
            score: 100,
          });
          setAlreadyCompleted(true);
          fetch('/api/progress/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseId, lessonId, correct: true, score: 100 }),
          }).catch(() => {});
        } else {
          if (coachMode === 'friendly') {
            soundManager.playCorrect();
          }
        }
      } else {
        if (coachMode === 'friendly') {
          soundManager.playCorrect();
        }
      }
    } else {
      setAnswerState('incorrect');
      const failStreak = toxicTutor.recordMistake();
      const failMemes: MemeType[] =
        locale === 'ky'
          ? ['oy-baygus', 'ayttym-goy', 'facepalm']
          : failStreak >= 2
          ? ['emotional-damage']
          : ['facepalm', 'this-is-fine', 'panic-cat'];
      const chosenMeme = failMemes[Math.floor(Math.random() * failMemes.length)];
      setCurrentMeme(chosenMeme);
      setShowMemeModal(true);

      if (coachMode === 'roast') {
        const roastResult = toxicTutor.playRoastEvent(
          failStreak >= 2 ? 'consecutive_fail' : 'incorrect',
          locale
        );
        setRoastSpeechText(roastResult.text);
      } else {
        soundManager.playIncorrect();
      }
    }
  }

  function handleNextExerciseOrFinish() {
    if (currentExIndex < totalExercises - 1) {
      selectExercise(currentExIndex + 1);
    } else {
      // Go to next lesson or roadmap
      if (nextLesson) {
        router.push(`/courses/${courseId}/learn/${nextLesson.id}`);
      } else {
        router.push(`/courses/${courseId}/learn`);
      }
    }
  }

  // Learning objective & recap text
  const lessonGoalText = locale === 'ru'
    ? `Освоить ключевые концепции темы «${lesson.title}» и применить их в ${totalExercises} интерактивных практических проверках.`
    : locale === 'ky'
    ? `«${lesson.title}» темасынын негизги түшүнүктөрүн өздөштүрүү жана аларды ${totalExercises} практикалык көнүгүүдө колдонуу.`
    : `Master core concepts of "${lesson.title}" and validate understanding across ${totalExercises} interactive checks.`;

  const previousRecapText = locale === 'ru'
    ? `Тема опирается на материал модуля «${stage?.title || 'Основы'}». Если возникают трудности, обратитесь к подсказке или AI-наставнику.`
    : locale === 'ky'
    ? `Бул сабак «${stage?.title || 'Негиздер'}» модулуна таянат. Кыйынчылык болсо, кыйытманы же AI-насаатчыны колдонуңуз.`
    : `Builds upon concepts from "${stage?.title || 'Fundamentals'}". Use progressive hints or AI Tutor if needed.`;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      {/* Main Wide Container (max-w-6xl) - Eliminates dead side space! */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href={`/courses/${courseId}/learn`} className="hover:text-foreground transition-colors font-medium">
            {t.lesson.backToPath}
          </Link>
          <ChevronRight className="h-3 w-3 text-muted/60" />
          <span className="text-muted">{stage?.title}</span>
          <ChevronRight className="h-3 w-3 text-muted/60" />
          <span className="text-foreground font-semibold">{lesson.title}</span>
        </nav>

        {/* Phase Switcher Tabs with Exercise Step Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/80">
          <div className="flex gap-1.5 bg-surface border border-border rounded-[var(--r-md)] p-1 max-w-xs shadow-xs">
            <button
              onClick={() => setPhase('reading')}
              className={[
                'flex-1 py-1.5 px-3 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-all cursor-pointer',
                phase === 'reading'
                  ? 'bg-surface-raised text-foreground shadow-xs font-bold border border-border/60'
                  : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              {t.lesson.readingTab}
            </button>
            <button
              onClick={() => setPhase('exercise')}
              className={[
                'flex-1 py-1.5 px-3 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-all cursor-pointer flex items-center justify-center gap-1.5',
                phase === 'exercise'
                  ? 'bg-accent text-white shadow-xs font-bold'
                  : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              <span>{t.lesson.exerciseTab}</span>
              <span className={[
                'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                phase === 'exercise' ? 'bg-white/20 text-white' : 'bg-surface-raised text-muted',
              ].join(' ')}>
                {completedExercises.length}/{totalExercises}
              </span>
            </button>
          </div>

          {/* Quick status pill, Coach Mode Toggle & Sound Toggle */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Coach Mode Selector: Friendly Kivi vs Toxic Roast Mode */}
            <button
              onClick={toggleCoachMode}
              title={
                coachMode === 'friendly'
                  ? (locale === 'ru' ? 'Режим: Добрый Киви (нажмите для Прожарки)' : locale === 'ky' ? 'Режим: Жумшак Киви (Катуу режим үчүн басыңыз)' : 'Mode: Friendly Kivi (Click for Roast Mode)')
                  : (locale === 'ru' ? 'Режим: Прожарка / Токсичный коуч (нажмите для Доброго)' : locale === 'ky' ? 'Режим: Катуу Коуч (Жумшак режим үчүн басыңыз)' : 'Mode: Roast / Toxic Coach (Click for Friendly)')
              }
              className={[
                'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--r-md)] text-xs font-semibold border transition-all cursor-pointer',
                coachMode === 'roast'
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/40 hover:bg-rose-500/20 shadow-xs ring-1 ring-rose-500/30 animate-pulse'
                  : 'bg-surface text-muted border-border hover:text-foreground hover:bg-surface-raised',
              ].join(' ')}
            >
              {coachMode === 'roast' ? (
                <>
                  <Flame className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  <span className="font-bold text-[11px] sm:text-xs">
                    {locale === 'ru' ? '😈 Влад (Прожарка)' : locale === 'ky' ? '😈 Влад (Катуу)' : '😈 Vlad (Roast)'}
                  </span>
                </>
              ) : (
                <>
                  <Smile className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[11px] sm:text-xs font-semibold">
                    {locale === 'ru' ? '😇 Киви (Добрый)' : locale === 'ky' ? '😇 Киви (Жумшак)' : '😇 Kivi (Friendly)'}
                  </span>
                </>
              )}
            </button>

            <SoundToggle showVolumeSlider={true} />
            {alreadyCompleted ? (
              <Badge variant="success">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                {t.lesson.completedBadge}
              </Badge>
            ) : (
              <Badge variant="amber">
                <Target className="h-3.5 w-3.5 mr-1 text-amber" />
                {completedExercises.length > 0 ? `${completedExercises.length}/${totalExercises}` : 'В процессе'}
              </Badge>
            )}
          </div>
        </div>

        {/* Mobile Learning Goal & AI Companion Collapsible Accordion (Visible on < lg screens) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileCompanion(!showMobileCompanion)}
            className="w-full flex items-center justify-between p-3.5 rounded-[var(--r-md)] bg-surface border border-border shadow-xs text-xs font-semibold text-foreground cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <span>
                {locale === 'ru' ? '🎯 Цель урока и AI-наставник' : locale === 'ky' ? '🎯 Сабактын максаты жана AI-насаатчы' : '🎯 Lesson Goal & AI Tutor'}
              </span>
            </div>
            {showMobileCompanion ? <ChevronUp className="h-4 w-4 text-muted" /> : <ChevronDown className="h-4 w-4 text-muted" />}
          </button>

          {showMobileCompanion && (
            <div className="mt-2.5 p-4 rounded-[var(--r-md)] bg-surface border border-border/80 space-y-3.5 animate-fadeIn text-xs">
              <div className="flex justify-center pb-3 border-b border-border/70">
                <TalkingMascot
                  size="sm"
                  initialMode={coachMode}
                  onModeChange={(m) => setCoachMode(m)}
                  speechText={roastSpeechText}
                  interactive={true}
                  showControls={true}
                />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  {locale === 'ru' ? 'Учебная цель:' : locale === 'ky' ? 'Окуу максаты:' : 'Learning Objective:'}
                </p>
                <p className="text-muted leading-relaxed">{lessonGoalText}</p>
              </div>
              <div className="pt-2 border-t border-border">
                <Link
                  href={`/tutor?course=${courseId}&lesson=${lessonId}`}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-[var(--r-sm)] bg-accent text-white font-medium shadow-xs"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{t.lesson.askTutorLink}</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Responsive 2-Column Desktop Grid (8 cols Main + 4 cols Companion Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left Column (8 cols): Main Lesson Reading or Hands-on Practice ── */}
          <div className="lg:col-span-8 min-w-0">

            {/* Phase 1: Reading & Interactive Theory */}
            {phase === 'reading' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {stage?.title} · Урок {lesson.order}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {lesson.title}
                  </h1>

                  {/* Read Aloud (Text-to-Speech) Control */}
                  <div className="mt-3">
                    <LessonTextToSpeech
                      content={lesson.content}
                      lessonTitle={lesson.title}
                      lessonId={lesson.id}
                    />
                  </div>
                </div>

                <div className="glass-card rounded-[var(--r-xl)] p-6 sm:p-8 border border-border shadow-sm bg-surface">
                  <RichLessonContent
                    content={lesson.content}
                    lessonId={lesson.id}
                    courseId={courseId}
                  />

                  {/* Interactive Detailed Theory Deep Dive ("Подробнее о теме") */}
                  <LessonDeepDive
                    customContent={lesson.deepDive}
                    lessonTitle={lesson.title}
                    courseId={courseId}
                    lessonId={lesson.id}
                  />
                </div>

                {/* Bottom Navigation for Reading Phase */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/courses/${courseId}/learn`}
                    className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors font-medium"
                  >
                    <ArrowLeft className="h-4 w-4" /> {t.lesson.backToPath}
                  </Link>

                  <Button onClick={() => setPhase('exercise')} size="md" className="btn-accent-glow">
                    <span>{t.lesson.toExerciseBtn} ({totalExercises} {locale === 'ru' ? 'проверки' : locale === 'ky' ? 'көнүгүү' : 'checks'})</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Phase 2: Multi-Step Interactive Exercises (At least 3 checks!) */}
            {phase === 'exercise' && (
              <div className="space-y-6">
                {/* Stepper Header with pills */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      <span>{t.lesson.exerciseHeading}</span>
                    </h2>
                    <span className="text-xs font-mono text-muted">
                      Проверка {currentExIndex + 1} из {totalExercises}
                    </span>
                  </div>

                  {/* Visual Step Progress Bar */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-6">
                    {exercises.map((item, idx) => {
                      const isDone = completedExercises.includes(idx);
                      const isCurrent = idx === currentExIndex;
                      return (
                        <button
                          key={item.id || idx}
                          onClick={() => selectExercise(idx)}
                          className={[
                            'flex-1 py-2 px-1.5 sm:px-3 rounded-[var(--r-md)] border text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-h-[40px]',
                            isCurrent
                              ? 'border-accent bg-accent text-white shadow-xs'
                              : isDone
                              ? 'border-success/60 bg-success-light text-success hover:border-success'
                              : 'border-border bg-surface text-muted hover:text-foreground',
                          ].join(' ')}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-bold">
                              {idx + 1}
                            </span>
                          )}
                          <span className="hidden sm:inline truncate">
                            {idx === 0 ? 'Понимание' : idx === 1 ? 'Вывод кода' : 'Практика'}
                          </span>
                          <span className="sm:hidden font-mono text-xs">
                            №{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exercise Question Card */}
                <div className="glass-card rounded-[var(--r-xl)] p-6 sm:p-8 border border-border shadow-sm bg-surface">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="accent">
                      {ex.type === 'multiple-choice'
                        ? 'Выбор ответа'
                        : ex.type === 'code-output'
                        ? 'Предсказание вывода'
                        : 'Заполнение пропуска'}
                    </Badge>
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-foreground mb-4 whitespace-pre-wrap leading-relaxed">
                    {ex.question}
                  </p>

                  {/* Optional Code Snippet to Inspect */}
                  {ex.codeSnippet && (
                    <div className="my-4">
                      <CodeBlock
                        code={ex.codeSnippet}
                        language={courseId.includes('python') ? 'python' : courseId.includes('javascript') ? 'javascript' : 'html'}
                        showLineNumbers={true}
                      />
                    </div>
                  )}

                  {/* Multiple Choice Options */}
                  {ex.type === 'multiple-choice' && ex.options && (
                    <div className="flex flex-col gap-2.5 mt-5">
                      {ex.options.map((opt, idx) => {
                        const isSelected = userAnswer === idx;
                        const isCorrectAnswer = idx === ex.correctAnswer;
                        const showCorrect = answerState !== 'idle' && isCorrectAnswer;
                        const showIncorrect = answerState === 'incorrect' && isSelected;

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (answerState === 'idle') setUserAnswer(idx);
                            }}
                            disabled={answerState !== 'idle'}
                            className={[
                              'w-full text-left px-4 py-3.5 rounded-[var(--r-md)] border text-sm font-medium transition-all cursor-pointer',
                              answerState === 'idle' && isSelected
                                ? 'border-accent bg-accent-light text-accent shadow-xs ring-1 ring-accent'
                                : showCorrect
                                ? 'border-success bg-success-light text-success font-semibold'
                                : showIncorrect
                                ? 'border-danger bg-danger-light text-danger'
                                : 'border-border bg-surface text-foreground hover:border-accent/50 hover:bg-surface-raised',
                            ].join(' ')}
                          >
                            <span
                              className={[
                                'inline-flex w-5 h-5 rounded-full border items-center justify-center text-xs mr-3 shrink-0 font-bold',
                                answerState === 'idle' && isSelected
                                  ? 'border-accent bg-accent text-white'
                                  : showCorrect
                                  ? 'border-success bg-success text-white'
                                  : showIncorrect
                                  ? 'border-danger bg-danger text-white'
                                  : 'border-border text-muted',
                              ].join(' ')}
                            >
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text / Code Output Input */}
                  {(ex.type === 'fill-blank' || ex.type === 'translation' || ex.type === 'code-output') && (
                    <div className="mt-5">
                      <label className="block text-xs font-medium text-muted mb-1.5">
                        {t.lesson.typeAnswerPlaceholder}
                      </label>
                      <input
                        type="text"
                        placeholder="Введите точный ответ..."
                        value={typeof userAnswer === 'string' ? userAnswer : ''}
                        onChange={(e) => {
                          if (answerState === 'idle') setUserAnswer(e.target.value);
                        }}
                        disabled={answerState !== 'idle'}
                        className={[
                          'w-full px-4 py-3 rounded-[var(--r-md)] border text-sm font-mono transition-all',
                          'bg-surface placeholder:text-subtle text-foreground focus:outline-none focus:ring-2',
                          answerState === 'correct'
                            ? 'border-success focus:ring-success/30 bg-success-light/20'
                            : answerState === 'incorrect'
                            ? 'border-danger focus:ring-danger/30 bg-danger-light/20'
                            : 'border-border focus:ring-accent/40 focus:border-accent',
                        ].join(' ')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && answerState === 'idle') checkAnswer();
                        }}
                      />
                    </div>
                  )}

                  {/* Progressive Hint */}
                  {ex.hint && answerState === 'idle' && (
                    <div className="mt-5 pt-4 border-t border-border">
                      {!showHint ? (
                        <button
                          onClick={() => setShowHint(true)}
                          className="flex items-center gap-1.5 text-xs text-muted hover:text-amber transition-colors font-medium cursor-pointer"
                        >
                          <Lightbulb className="h-3.5 w-3.5 text-amber" /> {t.lesson.showHintBtn}
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <KiviSticker mood="thinking" size="sm" customText={ex.hint} />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Explanatory Pedagogical Feedback with Kivi Mascot OR Toxic Roast Meme Sticker */}
                {answerState !== 'idle' && (
                  <div
                    className={[
                      'rounded-[var(--r-xl)] p-4 sm:p-5 border transition-all animate-fadeIn space-y-3.5',
                      answerState === 'correct'
                        ? 'border-success/40 bg-success-light'
                        : 'border-danger/40 bg-danger-light',
                    ].join(' ')}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <TalkingMascot
                        size="sm"
                        initialMode={coachMode}
                        showControls={false}
                        speechText={coachMode === 'roast' ? roastSpeechText : undefined}
                      />
                      <div className="flex-1 w-full min-w-0">
                        <MemeSticker
                          sticker={currentMeme}
                          customText={coachMode === 'roast' ? roastSpeechText || undefined : undefined}
                          size="md"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {answerState === 'correct' ? (
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-danger mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p
                          className={[
                            'font-bold text-sm mb-1',
                            answerState === 'correct' ? 'text-success' : 'text-danger',
                          ].join(' ')}
                        >
                          {answerState === 'correct'
                            ? t.lesson.correctHeading
                            : t.lesson.incorrectHeading}
                        </p>
                        <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
                          {ex.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPhase('reading')}
                      className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors font-medium cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" /> {t.lesson.readingTab}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {answerState === 'idle' ? (
                      <Button
                        onClick={checkAnswer}
                        disabled={userAnswer === null || userAnswer === ''}
                        className="btn-accent-glow"
                      >
                        {t.lesson.checkAnswerBtn}
                      </Button>
                    ) : (
                      <>
                        {answerState === 'incorrect' && (
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setAnswerState('idle');
                              setUserAnswer(null);
                              setShowHint(false);
                            }}
                          >
                            {t.lesson.tryAgainBtn}
                          </Button>
                        )}

                        <Button onClick={handleNextExerciseOrFinish} className="btn-accent-glow">
                          {currentExIndex < totalExercises - 1 ? (
                            <>
                              <span>Следующее задание ({currentExIndex + 2} из {totalExercises})</span>
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              <span>{nextLesson ? t.lesson.nextLessonBtn : t.lesson.finishCourseBtn}</span>
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column (4 cols): Sticky Learning Companion Sidebar ── */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Card 0: Interactive Talking Mascot with Animated Lip-Sync & Face Switcher */}
            <div className="glass-card rounded-[var(--r-xl)] p-5 border border-border shadow-xs bg-surface flex flex-col items-center">
              <TalkingMascot
                size="md"
                initialMode={coachMode}
                onModeChange={(m) => setCoachMode(m)}
                speechText={roastSpeechText}
                interactive={true}
                showControls={true}
              />
            </div>

            {/* Card 1: Learning Goal & Prerequisites */}
            <div className="glass-card rounded-[var(--r-xl)] p-5 border border-border shadow-xs bg-surface">
              <div className="flex items-center gap-2 mb-2 text-foreground font-bold text-sm">
                <Target className="h-4 w-4 text-accent" />
                <span>Учебная цель урока</span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {lessonGoalText}
              </p>

              <div className="pt-3 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted mb-1">
                  <Bookmark className="h-3 w-3 text-amber" />
                  <span>Связь с программой:</span>
                </div>
                <p className="text-[11px] text-muted/90 leading-relaxed">
                  {previousRecapText}
                </p>
              </div>
            </div>

            {/* Card 2: Interactive Lesson Checklist */}
            <div className="glass-card rounded-[var(--r-xl)] p-5 border border-border shadow-xs bg-surface">
              <div className="flex items-center justify-between mb-3 text-foreground font-bold text-sm">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-500" />
                  <span>Чеклист урока</span>
                </div>
                <span className="text-xs font-mono text-muted">
                  {completedExercises.length + (phase === 'exercise' ? 1 : 0)}/{totalExercises + 1}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Theory read item */}
                <div className="flex items-center gap-2 p-2 rounded-[var(--r-sm)] bg-surface-raised border border-border/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span className="text-foreground font-medium">Изучить теорию и примеры</span>
                </div>

                {/* Exercises checklist */}
                {exercises.map((_, i) => {
                  const done = completedExercises.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setPhase('exercise');
                        selectExercise(i);
                      }}
                      className={[
                        'w-full flex items-center gap-2 p-2 rounded-[var(--r-sm)] border text-left transition-colors cursor-pointer',
                        done
                          ? 'bg-success-light/30 border-success/30 text-success'
                          : 'bg-surface-raised border-border/40 text-muted hover:text-foreground',
                      ].join(' ')}
                    >
                      {done ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-muted/60 flex items-center justify-center text-[9px] shrink-0">
                          {i + 1}
                        </span>
                      )}
                      <span className={done ? 'line-through opacity-80' : 'font-medium'}>
                        {i === 0 ? 'Проверка понимания' : i === 1 ? 'Предсказание вывода' : 'Практическое закрепление'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Socratic AI Tutor Bridge */}
            <div className="glass-card rounded-[var(--r-xl)] p-5 border border-accent/20 bg-accent-light/10 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-foreground font-bold text-sm">
                <MessageSquare className="h-4 w-4 text-accent" />
                <span>AI-наставник Kivora</span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">
                Возникли вопросы по коду или хотите разобрать логику пошагово? Наставник поможет наводящими вопросами.
              </p>
              <Link
                href={`/tutor?course=${courseId}&lesson=${lessonId}`}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-[var(--r-md)] bg-accent text-white text-xs font-semibold shadow-xs hover:bg-accent-hover transition-colors"
              >
                <span>{t.lesson.askTutorLink}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* High-visibility Prominent Meme Reaction Modal */}
        <MemePopupModal
          isOpen={showMemeModal}
          onClose={() => setShowMemeModal(false)}
          sticker={currentMeme}
          isCorrect={answerState === 'correct'}
          customText={coachMode === 'roast' ? roastSpeechText || undefined : undefined}
        />
      </main>
    </div>
  );
}

export default function LessonPage(props: { params: Promise<{ id: string; lessonId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <LoadingSpinner label="Загрузка урока…" />
        </div>
      }
    >
      <LessonBody {...props} />
    </Suspense>
  );
}
