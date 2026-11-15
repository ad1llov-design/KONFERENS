'use client';

import { useState } from 'react';
import { Eye, Code2, Sparkles, Layout } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { useLanguage } from '@/lib/i18n/context';

interface HtmlCssPreviewProps {
  title?: string;
  htmlCode: string;
  cssCode: string;
  previewType?: 'button' | 'card' | 'flexbox' | 'badge' | 'custom';
  customPreview?: React.ReactNode;
  ruleExplanation?: string;
}

export function HtmlCssPreview({
  title,
  htmlCode,
  cssCode,
  previewType = 'card',
  customPreview,
  ruleExplanation,
}: HtmlCssPreviewProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'html' | 'css'>('both');
  const { locale } = useLanguage();

  const labels = {
    title: title ?? (locale === 'ru' ? 'HTML + CSS с живым предпросмотром' : locale === 'ky' ? 'HTML + CSS реалдуу көрүнүшү менен' : 'HTML + CSS with Live Preview'),
    htmlTab: 'HTML5',
    cssTab: 'CSS3',
    bothTab: locale === 'ru' ? 'Код' : locale === 'ky' ? 'Код' : 'Code',
    previewHeader: locale === 'ru' ? 'Результат в браузере' : locale === 'ky' ? 'Браузердеги жыйынтык' : 'Browser Render Preview',
    ruleHeader: locale === 'ru' ? 'Что делает это CSS-правило:' : locale === 'ky' ? 'Бул CSS эрежеси эмне кылат:' : 'What this CSS rule does:',
  };

  return (
    <div className="my-6 rounded-[var(--r-xl)] border border-border bg-surface overflow-hidden shadow-sm">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-surface-raised border-b border-border/80">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-accent" />
          <h4 className="text-sm sm:text-base font-bold text-foreground">{labels.title}</h4>
        </div>

        {/* Tab Switcher for Code View */}
        <div className="flex items-center gap-1 bg-surface border border-border p-0.5 rounded-[var(--r-sm)] text-xs">
          <button
            onClick={() => setActiveTab('both')}
            className={[
              'px-2.5 py-1 rounded-[calc(var(--r-xs))] font-medium transition-colors cursor-pointer',
              activeTab === 'both' ? 'bg-accent text-white shadow-xs' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {labels.bothTab}
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={[
              'px-2.5 py-1 rounded-[calc(var(--r-xs))] font-medium transition-colors cursor-pointer',
              activeTab === 'html' ? 'bg-accent text-white shadow-xs' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {labels.htmlTab}
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={[
              'px-2.5 py-1 rounded-[calc(var(--r-xs))] font-medium transition-colors cursor-pointer',
              activeTab === 'css' ? 'bg-accent text-white shadow-xs' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {labels.cssTab}
          </button>
        </div>
      </div>

      {/* Main Grid: Code on left (or top), Live Render Preview on right (or bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Code Column */}
        <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col gap-3 min-w-0">
          {(activeTab === 'both' || activeTab === 'html') && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5 font-semibold">
                <Code2 className="h-3.5 w-3.5 text-accent" />
                <span>HTML Структура</span>
              </div>
              <CodeBlock code={htmlCode} language="html" filename="index.html" showLineNumbers={true} />
            </div>
          )}

          {(activeTab === 'both' || activeTab === 'css') && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-amber" />
                <span>CSS Стили</span>
              </div>
              <CodeBlock code={cssCode} language="css" filename="styles.css" showLineNumbers={true} />
            </div>
          )}
        </div>

        {/* Live Visual Preview Column */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-background/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Eye className="h-4 w-4 text-emerald-500" />
                <span>{labels.previewHeader}</span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                Live Preview
              </span>
            </div>

            {/* Rendered Container Mock */}
            <div className="p-4 sm:p-6 rounded-[var(--r-lg)] bg-surface border border-border shadow-xs flex items-center justify-center min-h-[160px]">
              {customPreview ? (
                customPreview
              ) : previewType === 'card' ? (
                <div className="w-full max-w-xs rounded-xl p-4 bg-surface-raised border border-border shadow-sm text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                    KV
                  </div>
                  <h5 className="font-bold text-sm text-foreground mb-1">Карточка курса</h5>
                  <p className="text-xs text-muted mb-3">Основы HTML и CSS веб-разработки</p>
                  <button className="px-3.5 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold shadow-xs hover:bg-accent-hover transition-colors">
                    Начать учиться
                  </button>
                </div>
              ) : previewType === 'button' ? (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold shadow-sm hover:scale-105 transition-all">
                    Primary Button
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-surface border border-border text-foreground text-xs font-medium hover:bg-surface-raised transition-colors">
                    Secondary Button
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-around gap-2 p-3 bg-surface-raised rounded-lg border border-dashed border-accent/40">
                  <div className="px-3 py-2 bg-accent text-white text-xs font-bold rounded">Item 1</div>
                  <div className="px-3 py-2 bg-purple-600 text-white text-xs font-bold rounded">Item 2</div>
                  <div className="px-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded">Item 3</div>
                </div>
              )}
            </div>
          </div>

          {/* Rule Impact Explanation */}
          {ruleExplanation && (
            <div className="mt-4 p-3.5 rounded-[var(--r-md)] bg-accent/5 border border-accent/20 text-xs">
              <span className="font-bold text-foreground block mb-1">{labels.ruleHeader}</span>
              <p className="text-muted leading-relaxed">{ruleExplanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
