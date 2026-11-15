'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';

interface PartInfo {
  token: string;
  name: string;
  role: string;
  color: string;
  detail: string;
}

export function PythonDefBreakdown() {
  const { locale } = useLanguage();
  const [activePart, setActivePart] = useState<number | null>(null);

  const parts: PartInfo[] = [
    {
      token: 'def',
      name: locale === 'ru' ? 'Ключевое слово' : locale === 'ky' ? 'Негизги сөз' : 'Keyword',
      role: locale === 'ru' ? 'Объявляет новую функцию в Python' : locale === 'ky' ? 'Pythonдо жаңы функцияны жарыялайт' : 'Declares a function in Python',
      color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      detail: locale === 'ru'
        ? 'Сокращение от "define" (определить). Сигнализирует интерпретатору, что дальше идёт описание функции.'
        : locale === 'ky'
        ? '"Define" (аныктоо) сөзүнүн кыскартылышы. Интерпретаторго функция жарыяланып жатканын билдирет.'
        : 'Short for "define". Tells the Python interpreter that a function definition begins here.',
    },
    {
      token: 'calculate_area',
      name: locale === 'ru' ? 'Имя функции' : locale === 'ky' ? 'Функциянын аты' : 'Function Name',
      role: locale === 'ru' ? 'Уникальное имя в стиле snake_case' : locale === 'ky' ? 'snake_case стилиндеги аталышы' : 'Descriptive name in snake_case',
      color: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
      detail: locale === 'ru'
        ? 'Имя должно быть глаголом или действием. Слова разделяются знаком подчеркивания: calculate_tax, get_user.'
        : locale === 'ky'
        ? 'Аты аракетти билдириши керек. Сөздөр астынкы сызык менен бөлүнөт: calculate_tax, get_user.'
        : 'Should describe the action performed. Multiple words are separated by underscores.',
    },
    {
      token: '(width, height)',
      name: locale === 'ru' ? 'Параметры' : locale === 'ky' ? 'Параметрлер' : 'Parameters',
      role: locale === 'ru' ? 'Входные данные внутри круглых скобок' : locale === 'ky' ? 'Кашаанын ичиндеги кириш маалыматтар' : 'Input variables in parentheses',
      color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      detail: locale === 'ru'
        ? 'Переменные, которые функция ожидает получить при вызове. Если параметров нет, скобки всё равно обязательны: ()'
        : locale === 'ky'
        ? 'Функция чакырылганда ала турган маанилер. Эгер параметр жок болсо, бош кашаа () сөзсүз жазылат.'
        : 'Variables that the function accepts when called. Empty parentheses () are required if there are no parameters.',
    },
    {
      token: ':',
      name: locale === 'ru' ? 'Двоеточие' : locale === 'ky' ? 'Кош чекит' : 'Colon',
      role: locale === 'ru' ? 'Обязательный разделитель заголовка' : locale === 'ky' ? 'Аталышын бөлүүчү милдеттүү белги' : 'Mandatory header terminator',
      color: 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
      detail: locale === 'ru'
        ? 'Завершает строку заголовка функции. Пропуск двоеточия — частая синтаксическая ошибка начинающих (SyntaxError).'
        : locale === 'ky'
        ? 'Функциянын башын бүтүрөт. Кош чекитти унутуу — башталгычтардын эң көп кетирген катасы (SyntaxError).'
        : 'Concludes the definition line. Omitting the colon causes an immediate SyntaxError in Python.',
    },
    {
      token: '    indent (4 spaces)',
      name: locale === 'ru' ? 'Отступ тела (4 пробела)' : locale === 'ky' ? 'Денесинин чегинүүсү (4 боштук)' : 'Body Indentation',
      role: locale === 'ru' ? 'Определяет границы тела функции' : locale === 'ky' ? 'Функциянын денесинин чегин аныктайт' : 'Defines the scope of the function body',
      color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      detail: locale === 'ru'
        ? 'В Python отступы заменяют фигурные скобки {}. Всё, что сдвинуто на 4 пробела вправо, выполняется внутри функции.'
        : locale === 'ky'
        ? 'Pythonдо чегинүүлөр тармал кашааларды {} алмаштырат. 4 боштукка жылган бардык код функция ичинде иштейт.'
        : 'In Python, whitespace replaces curly braces {}. All lines indented by 4 spaces belong to the function body.',
    },
    {
      token: 'return width * height',
      name: locale === 'ru' ? 'Инструкция return' : locale === 'ky' ? 'return оператору' : 'Return Statement',
      role: locale === 'ru' ? 'Возврат результата наружу' : locale === 'ky' ? 'Жыйынтыкты сыртка кайтаруу' : 'Yields output value to caller',
      color: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      detail: locale === 'ru'
        ? 'Возвращает вычисленное значение в место вызова. В отличие от print(), return позволяет сохранить результат в переменную.'
        : locale === 'ky'
        ? 'Эсептелген маанини чакырылган жерге кайтарат. print()тен айырмаланып, жыйынтыкты өзгөрмөгө сактоого жол берет.'
        : 'Passes the computed result back to the caller. Unlike print(), return allows saving the value into a variable.',
    },
  ];

  return (
    <div className="my-6 rounded-[var(--r-xl)] border border-border bg-surface p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {locale === 'ru' ? 'Анатомия функции в Python (def)' : locale === 'ky' ? 'Pythonдогу функциянын түзүлүшү (def)' : 'Python Function Anatomy (def)'}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            {locale === 'ru'
              ? 'Нажмите на элемент кода, чтобы увидеть его назначение и правила синтаксиса'
              : locale === 'ky'
              ? 'Синтаксис эрежесин көрүү үчүн коддун элементин басыңыз'
              : 'Click any code part below to explore its syntax role and rules'}
          </p>
        </div>
      </div>

      {/* Visual Code Dissection Diagram */}
      <div className="bg-surface-raised border border-border/80 rounded-[var(--r-lg)] p-4 sm:p-5 font-mono text-sm sm:text-base mb-4 overflow-x-auto">
        <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2 mb-2">
          {parts.slice(0, 4).map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePart(activePart === idx ? null : idx)}
              className={[
                'px-2.5 py-1 rounded-[var(--r-sm)] border transition-all cursor-pointer font-bold select-none text-left',
                p.color,
                activePart === idx ? 'ring-2 ring-accent scale-105 shadow-sm' : 'hover:scale-102 hover:opacity-90',
              ].join(' ')}
              title={p.name}
            >
              {p.token}
            </button>
          ))}
        </div>

        {/* Indented body row */}
        <div className="flex items-baseline flex-wrap gap-2 pl-6 sm:pl-8 border-l-2 border-dashed border-accent/40 my-1">
          <button
            onClick={() => setActivePart(activePart === 4 ? null : 4)}
            className={[
              'text-xs text-muted font-sans px-2 py-0.5 rounded border border-border/60 bg-background transition-all',
              activePart === 4 ? 'ring-2 ring-accent text-accent border-accent' : '',
            ].join(' ')}
          >
            4 spaces
          </button>
          <button
            onClick={() => setActivePart(activePart === 5 ? null : 5)}
            className={[
              'px-2.5 py-1 rounded-[var(--r-sm)] border transition-all cursor-pointer font-bold select-none',
              parts[5].color,
              activePart === 5 ? 'ring-2 ring-accent scale-105 shadow-sm' : 'hover:scale-102 hover:opacity-90',
            ].join(' ')}
          >
            {parts[5].token}
          </button>
        </div>

        {/* Invocation row */}
        <div className="mt-4 pt-3 border-t border-border/60 text-xs sm:text-sm text-muted">
          <span className="text-foreground font-semibold"># Вызов функции и сохранение результата:</span>
          <div className="mt-1 text-foreground">
            <span className="text-purple-600 dark:text-purple-400 font-bold">result</span> = calculate_area(
            <span className="text-amber-600 dark:text-amber-400 font-bold">5</span>,{' '}
            <span className="text-amber-600 dark:text-amber-400 font-bold">10</span>)
            <span className="text-muted italic ml-2"># result равен 50</span>
          </div>
        </div>
      </div>

      {/* Detail info box for clicked or hovered part */}
      {activePart !== null && (
        <div className={`p-4 rounded-[var(--r-md)] border ${parts[activePart].color} bg-surface transition-all animate-fadeIn`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">{parts[activePart].name}</span>
            <span className="text-xs text-muted font-mono">[{parts[activePart].token}]</span>
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">{parts[activePart].role}</p>
          <p className="text-xs text-muted leading-relaxed">{parts[activePart].detail}</p>
        </div>
      )}
    </div>
  );
}
