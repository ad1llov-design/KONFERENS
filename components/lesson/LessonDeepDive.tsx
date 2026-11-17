'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  AlertTriangle,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { useLanguage } from '@/lib/i18n/context';

interface LessonDeepDiveProps {
  customContent?: string;
  lessonTitle: string;
  courseId: string;
  lessonId?: string;
  defaultOpen?: boolean;
}

export function LessonDeepDive({
  customContent,
  lessonTitle,
  courseId,
  defaultOpen = false,
}: LessonDeepDiveProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<'architecture' | 'gotchas' | 'senior' | 'code'>('architecture');
  const { locale } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('deepdive=1')) {
      setIsOpen(true);
    }
  }, []);

  // Dynamic curated deep dive content by lesson topics
  const isPython = courseId.includes('python');
  const isWeb = courseId.includes('web') || courseId.includes('javascript');

  const titles = {
    ru: {
      expandBtn: '📖 Подробнее о теме (Глубокий разбор)',
      collapseBtn: '🔼 Свернуть подробный разбор',
      badge: 'Senior & Architecture Deep Dive',
      tabArch: 'Под капотом',
      tabGotchas: 'Подводные камни',
      tabSenior: 'Senior Best Practices',
      tabCode: 'Продвинутый код',
    },
    ky: {
      expandBtn: '📖 Тема боюнча кененирээк (Тереңдетилген анализ)',
      collapseBtn: '🔼 Толук маалыматты жабуу',
      badge: 'Senior & Архитектура Deep Dive',
      tabArch: 'Ички түзүлүшү',
      tabGotchas: 'Көп кетирилүүчү каталар',
      tabSenior: 'Senior деңгээлдеги кеңештер',
      tabCode: 'Өркүндөтүлгөн код',
    },
    en: {
      expandBtn: '📖 Deep Dive & Architecture (Learn More)',
      collapseBtn: '🔼 Collapse Detailed Deep Dive',
      badge: 'Senior & Architecture Deep Dive',
      tabArch: 'Under the Hood',
      tabGotchas: 'Common Gotchas',
      tabSenior: 'Senior Best Practices',
      tabCode: 'Advanced Example',
    },
  }[locale] || {
    expandBtn: '📖 Deep Dive & Architecture',
    collapseBtn: '🔼 Collapse Deep Dive',
    badge: 'Senior & Architecture Deep Dive',
    tabArch: 'Under the Hood',
    tabGotchas: 'Common Gotchas',
    tabSenior: 'Senior Best Practices',
    tabCode: 'Advanced Example',
  };

  // Generate in-depth material for the specific lesson
  function getCuratedSections() {
    if (isPython) {
      return {
        architecture: {
          title: locale === 'ru' ? 'Как это устроено в памяти CPython' : locale === 'ky' ? 'CPython эсинде кантип иштейт' : 'CPython Memory Model',
          text: locale === 'ru'
            ? 'В Python всё является объектом (PyObject). Когда вы пишете `a = 100`, Python не просто кладёт число в ячейку — он создаёт объект типа `int` в куче (heap) с счётчиком ссылок (`ob_refcnt`), а переменная `a` хранит лишь указатель на этот адрес. Для чисел от -5 до 256 Python использует интернирование (Small Integer Cache), поэтому ссылки на них повторно используют одну и ту же область памяти без аллокаций.'
            : locale === 'ky'
            ? 'Pythonдо баары объект (PyObject). `a = 100` деп жазганда, Python санды жөн эле ячейкага салбайт — ал heap эсинде шилтемелер эсептегичи (`ob_refcnt`) бар `int` объектин түзөт, ал эми `a` өзгөрмөсү ошол дарекке гана шилтеме болуп калат.'
            : 'In Python, everything is a heap-allocated PyObject. When writing `a = 100`, Python allocates an `int` object with reference counting (`ob_refcnt`). For integers between -5 and 256, CPython employs small integer caching, avoiding redundant heap allocations.',
        },
        gotchas: {
          title: locale === 'ru' ? 'Типичные ошибки на собеседованиях' : locale === 'ky' ? 'Маектешүүдөгү негизги каталар' : 'Interview Gotchas',
          text: locale === 'ru'
            ? '1. Изменяемые значения по умолчанию: никогда не передавайте `def foo(items=[])` — список создаётся один раз при компиляции функции и будет накапливать мусор между вызовами. Используйте `items=None`.\n2. Неявное затенение (shadowing): случайное переопределение встроенных функций (`list = [1, 2]`) ломает вызов фабрики `list()`.\n3. Сравнение `==` (по значению) vs `is` (по идентичности ссылки памяти).'
            : locale === 'ky'
            ? '1. Функциянын параметрлеринде өзгөрмөлүү дефолттук маанилерди бербеңиз (`def foo(items=[])`). Ал функция компиляция болгондо бир эле жолу түзүлүп, бардык чакырууларда чогула берет. Анын ордуна `items=None` колдонуңуз.'
            : '1. Mutable default arguments: never use `def fn(items=[])` because the list is instantiated once at function definition time. Use `items=None` instead.\n2. Built-in shadowing: naming a variable `list` or `id` overwrites standard library references.\n3. Equality (`==`) vs identity (`is`).',
        },
        senior: {
          title: locale === 'ru' ? 'Стандарты продакшена (PEP 8 & Type Hints)' : locale === 'ky' ? 'Продакшн стандарттары' : 'Production Standards',
          text: locale === 'ru'
            ? 'Современный Python в крупных компаниях всегда сопровождается аннотациями типов (Type Hints) и статической проверкой mypy / pyright. Функция должна иметь строгие контракты входных и выходных типов (`def calculate(rate: float) -> Decimal:`) и docstring в формате Google или Sphinx.'
            : locale === 'ky'
            ? 'Заманбап Pythonдо mypy / pyright аркылуу сөзсүз түрдө типтерди көрсөтүү (Type Hints) талап кылынат. Функция даана контрактка ээ болушу керек.'
            : 'Modern enterprise Python mandates static typing via mypy/pyright (`def process(user_id: int) -> User:`). Always document edge-case exceptions with descriptive docstrings.',
        },
        code: `from typing import Final, Optional
from decimal import Decimal

# Senior pattern: Strict immutability and precise types
DEFAULT_TAX_RATE: Final[Decimal] = Decimal("0.12")

def compute_invoice(
    subtotal: Decimal, 
    discount_pct: Optional[float] = None
) -> Decimal:
    """Computes exact monetary total preventing binary float rounding issues."""
    if subtotal < Decimal("0"):
        raise ValueError("Subtotal cannot be negative")
        
    multiplier = Decimal(str(1.0 - (discount_pct or 0.0)))
    total_taxable = subtotal * multiplier
    return (total_taxable * (Decimal("1") + DEFAULT_TAX_RATE)).quantize(Decimal("0.01"))`,
      };
    } else if (isWeb) {
      return {
        architecture: {
          title: locale === 'ru' ? 'Как браузер парсит DOM и CSSOM' : locale === 'ky' ? 'Браузер DOM жана CSSOMду кантип окуйт' : 'DOM/CSSOM Browser Pipeline',
          text: locale === 'ru'
            ? 'Браузер выполняет Critical Rendering Path: HTML -> DOM-дерево, CSS -> CSSOM, их объединение в Render Tree, вычисление геометрии (Layout / Reflow) и попиксельная отрисовка (Paint / Composite). Изменение свойств вроде `width` запускает тяжёлый Reflow, тогда как `transform` и `opacity` обрабатываются на GPU без перерасчёта слоёв.'
            : locale === 'ky'
            ? 'Браузер Critical Rendering Path процессин аткарат: HTML -> DOM, CSS -> CSSOM, андан кийин Render Tree түзүлүп, экранга тартылат.'
            : 'The browser runs the Critical Rendering Path: HTML tokens -> DOM Tree, CSS rules -> CSSOM Tree -> Render Tree -> Layout (Reflow) -> Paint -> GPU Composite. Animating `transform` and `opacity` is zero-cost on GPU layers.',
        },
        gotchas: {
          title: locale === 'ru' ? 'Подводные камни фронтенда' : locale === 'ky' ? 'Фронтенддеги каталар' : 'Frontend Gotchas',
          text: locale === 'ru'
            ? '1. Блокирующий рендеринг: тяжелые скрипты без `defer` или `async` замораживают парсинг HTML.\n2. Layout Thrashing: чтение `element.offsetHeight` сразу после записи стиля заставляет браузер синхронно пересчитывать верстку.\n3. Забытая очистка EventListener или setInterval приводит к утечкам памяти в SPA.'
            : locale === 'ky'
            ? '1. `defer` же `async` жок чоң скрипттер HTMLдин жүктөлүшүн токтотуп коёт.\n2. Layout Thrashing браузерди кайра-кайра макетти эсептөөгө мажбур кылат.'
            : '1. Parser-blocking scripts without `defer` or `async`.\n2. Layout Thrashing when reading geometric properties immediately after DOM mutations.\n3. Memory leaks from detached DOM nodes and uncancelled timers.',
        },
        senior: {
          title: locale === 'ru' ? 'Архитектурные соглашения' : locale === 'ky' ? 'Архитектуралык эрежелер' : 'Production Guidelines',
          text: locale === 'ru'
            ? 'Всегда используйте семантические теги HTML5 (`<header>`, `<nav>`, `<article>`, `<main>`) для доступности (a11y) и SEO. В стилях опирайтесь на CSS Custom Properties (дизайн-токены) и Flexbox/Grid для адаптивности без абсолютных позиций.'
            : locale === 'ky'
            ? 'Семантикалык HTML5 тегдерин колдонуңуз. Бул издөө системаларына (SEO) жана экран окурмандарына (a11y) өтө маанилүү.'
            : 'Always prioritize semantic HTML5 elements for a11y screen readers and SEO. Structure designs using scalable CSS Custom Property tokens.',
        },
        code: `/* Modern semantic responsive card */
.user-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-md, 1rem);
  padding: 1.25rem;
  background-color: var(--surface);
  border-radius: var(--radius-lg, 0.75rem);
  contain: content; /* Isolates browser layout calculations for 60fps */
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}`,
      };
    } else {
      return {
        architecture: {
          title: locale === 'ru' ? 'Лингвистическая структура и этимология' : locale === 'ky' ? 'Лингвистикалык түзүлүшү' : 'Linguistic Structure',
          text: locale === 'ru'
            ? 'В отличие от механического заучивания слов, системное освоение опирается на синтаксический каркас (Subject-Verb-Object), частотный словарь (Top-1000 лексем покрывают 85% устной речи) и интервальное повторение (Spaced Repetition System).'
            : locale === 'ky'
            ? 'Сөздөрдү курулай жаттабай, сүйлөм түзүү эрежелери жана эң көп колдонулган сөздөрдүн тутуму аркылуу үйрөнүү натыйжалуу.'
            : 'Systematic language acquisition leverages core syntactic patterns (SVO vs SOV) and frequency lexicons where the top 1000 lemmas cover over 85% of everyday conversations.',
        },
        gotchas: {
          title: locale === 'ru' ? 'Ложные друзья переводчика' : locale === 'ky' ? 'Котормодогу жаңылыштыктар' : 'False Friends & Pitfalls',
          text: locale === 'ru'
            ? 'Остерегайтесь межъязыковой интерференции: прямой дословный перевод идиом и предлогов приводит к комичным ошибкам. Учите словосочетания (collocations) целиком, а не изолированные слова.'
            : locale === 'ky'
            ? 'Сөздөрдү өзүнчө эмес, сүйлөм ичиндеги туруктуу сөз айкаштары менен кошо жаттоо керек.'
            : 'Beware of literal calquing and false cognates. Learn entire idiomatic collocations rather than isolated vocabulary words.',
        },
        senior: {
          title: locale === 'ru' ? 'Практическая рекомендация' : locale === 'ky' ? 'Практикалык сунуш' : 'Active Immersion Strategy',
          text: locale === 'ru'
            ? 'Применяйте метод Shadowing: прослушивайте аудионосителя и повторяйте вслух с отставанием в полсекунды, копируя ритм, интонацию и ударения.'
            : locale === 'ky'
            ? 'Аудиону угуп, жарым секунд артта калып үндү дал өзүндөй кайталоо (Shadowing ыкмасы) сүйлөө чеберчилигин тез өстүрөт.'
            : 'Adopt the Shadowing technique: speak along with native audio with a half-second lag, mimicking phonetics, cadence, and breath breaks.',
        },
        code: `// Practical active phrase template
const pattern = {
  intent: "Clarify ambiguous requirements",
  structure: "Could you please elaborate on [X] so we can align on [Y]?",
  workplaceContext: "Daily Standup & Sprint Planning",
};`,
      };
    }
  }

  const sections = getCuratedSections();

  return (
    <div className="mt-6 pt-5 border-t border-border">
      {/* Expand / Collapse Button with glow and icon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={[
          'w-full flex items-center justify-between p-3.5 sm:p-4 rounded-[var(--r-lg)] border text-left transition-all duration-200 cursor-pointer shadow-xs',
          isOpen
            ? 'bg-accent/10 border-accent/60 text-accent font-bold ring-1 ring-accent/30'
            : 'bg-surface hover:bg-surface-raised border-border text-foreground hover:border-accent/40',
        ].join(' ')}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent-light text-accent flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-bold block truncate">
              {isOpen ? titles.collapseBtn : titles.expandBtn}
            </span>
            <span className="text-[10px] sm:text-[11px] text-muted block font-normal truncate">
              {titles.badge} · {lessonTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent hidden sm:inline">
            Deep Dive
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-accent" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </div>
      </button>

      {/* Expanded Deep Dive Content Area */}
      {isOpen && (
        <div className="mt-3.5 p-4 sm:p-6 rounded-[var(--r-xl)] bg-surface border border-accent/30 shadow-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 duration-200 space-y-5">
          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-border">
            {[
              { id: 'architecture' as const, label: titles.tabArch, icon: Cpu },
              { id: 'gotchas' as const, label: titles.tabGotchas, icon: AlertTriangle },
              { id: 'senior' as const, label: titles.tabSenior, icon: Sparkles },
              { id: 'code' as const, label: titles.tabCode, icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={[
                    'px-3 py-1.5 rounded-[var(--r-md)] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap',
                    isSelected
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-muted hover:text-foreground hover:bg-surface-raised',
                  ].join(' ')}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Under the Hood / Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Cpu className="w-4 h-4 text-accent" />
                <h4>{sections.architecture.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line bg-surface-raised/60 p-3.5 rounded-[var(--r-md)] border border-border">
                {sections.architecture.text}
              </p>
            </div>
          )}

          {/* Tab 2: Gotchas & Anti-Patterns */}
          {activeTab === 'gotchas' && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber" />
                <h4>{sections.gotchas.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line bg-amber-light/20 p-3.5 rounded-[var(--r-md)] border border-amber/30">
                {sections.gotchas.text}
              </p>
            </div>
          )}

          {/* Tab 3: Senior Best Practices */}
          {activeTab === 'senior' && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h4>{sections.senior.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line bg-emerald-500/10 p-3.5 rounded-[var(--r-md)] border border-emerald-500/25">
                {sections.senior.text}
              </p>
            </div>
          )}

          {/* Tab 4: Advanced Real-World Code */}
          {activeTab === 'code' && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Terminal className="w-4 h-4 text-accent" />
                <h4>
                  {locale === 'ru'
                    ? 'Эталонный рабочий сниппет'
                    : locale === 'ky'
                    ? 'Эталондук код мисалы'
                    : 'Production Code Blueprint'}
                </h4>
              </div>
              <CodeBlock
                code={sections.code}
                language={isPython ? 'python' : isWeb ? 'css' : 'javascript'}
                showLineNumbers={true}
              />
            </div>
          )}

          {/* Custom lesson markdown text if specifically supplied */}
          {customContent && (
            <div className="pt-3 border-t border-border text-xs text-muted leading-relaxed">
              <p className="font-semibold text-foreground mb-1">
                {locale === 'ru' ? 'Дополнительные примечания к уроку:' : 'Additional Lesson Notes:'}
              </p>
              <p className="whitespace-pre-line">{customContent}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
