'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
  showLineNumbers?: boolean;
}

// Token categories for syntax highlighting
type TokenType = 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'tag' | 'operator' | 'text';

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeLine(line: string, lang: string): Token[] {
  const tokens: Token[] = [];
  const normalizedLang = lang.toLowerCase();

  // Full-line or trailing comment detection
  if (normalizedLang === 'python') {
    const commentIdx = line.indexOf('#');
    if (commentIdx !== -1 && !isInsideQuotes(line, commentIdx)) {
      const beforeComment = line.slice(0, commentIdx);
      const commentPart = line.slice(commentIdx);
      if (beforeComment) {
        tokens.push(...tokenizePythonTokens(beforeComment));
      }
      tokens.push({ type: 'comment', value: commentPart });
      return tokens;
    }
    return tokenizePythonTokens(line);
  }

  if (normalizedLang === 'javascript' || normalizedLang === 'js' || normalizedLang === 'typescript' || normalizedLang === 'ts') {
    const commentIdx = line.indexOf('//');
    if (commentIdx !== -1 && !isInsideQuotes(line, commentIdx)) {
      const beforeComment = line.slice(0, commentIdx);
      const commentPart = line.slice(commentIdx);
      if (beforeComment) {
        tokens.push(...tokenizeJsTokens(beforeComment));
      }
      tokens.push({ type: 'comment', value: commentPart });
      return tokens;
    }
    return tokenizeJsTokens(line);
  }

  if (normalizedLang === 'html') {
    return tokenizeHtmlTokens(line);
  }

  if (normalizedLang === 'css') {
    return tokenizeCssTokens(line);
  }

  // Fallback default tokenization
  return [{ type: 'text', value: line }];
}

function isInsideQuotes(line: string, index: number): boolean {
  let inDouble = false;
  let inSingle = false;
  for (let i = 0; i < index; i++) {
    const char = line[i];
    if (char === '"' && line[i - 1] !== '\\') inDouble = !inDouble;
    if (char === "'" && line[i - 1] !== '\\') inSingle = !inSingle;
  }
  return inDouble || inSingle;
}

function tokenizePythonTokens(text: string): Token[] {
  const pythonKeywords = new Set([
    'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue',
    'in', 'is', 'not', 'and', 'or', 'import', 'from', 'as', 'try', 'except', 'finally',
    'with', 'pass', 'lambda', 'global', 'True', 'False', 'None', 'yield'
  ]);
  const pythonBuiltins = new Set(['print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'type', 'sum', 'min', 'max', 'enumerate']);

  const regex = /(\bdef\b|\bclass\b|[a-zA-Z_]\w*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+\.?\d*|[:=+*/%<>&|!\-]+|[(),[\]{}]+|\s+|[^\s\w(),[\]{}:="'+*/%<>&|!\-]+)/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const val = match[0];
    if (val.startsWith('"') || val.startsWith("'")) {
      tokens.push({ type: 'string', value: val });
    } else if (pythonKeywords.has(val)) {
      tokens.push({ type: 'keyword', value: val });
    } else if (pythonBuiltins.has(val)) {
      tokens.push({ type: 'function', value: val });
    } else if (/^\d+\.?\d*$/.test(val)) {
      tokens.push({ type: 'number', value: val });
    } else if (/^[:=+*/%<>&|!\-]+$/.test(val)) {
      tokens.push({ type: 'operator', value: val });
    } else {
      tokens.push({ type: 'text', value: val });
    }
  }

  return tokens;
}

function tokenizeJsTokens(text: string): Token[] {
  const jsKeywords = new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'break', 'default', 'import', 'export', 'from', 'class', 'new',
    'typeof', 'instanceof', 'try', 'catch', 'finally', 'throw', 'async', 'await',
    'true', 'false', 'null', 'undefined', 'in', 'of'
  ]);
  const jsBuiltins = new Set(['console', 'log', 'push', 'pop', 'map', 'filter', 'reduce', 'length', 'document', 'window', 'addEventListener', 'querySelector']);

  const regex = /([a-zA-Z_$][\w$]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\d+\.?\d*|=>|[:=+*/%<>&|!\-]+|[(),[\]{}]+|\s+|[^\s\w(),[\]{}:="'+*/%<>&|!\-]+)/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const val = match[0];
    if (val.startsWith('"') || val.startsWith("'") || val.startsWith('`')) {
      tokens.push({ type: 'string', value: val });
    } else if (jsKeywords.has(val)) {
      tokens.push({ type: 'keyword', value: val });
    } else if (jsBuiltins.has(val)) {
      tokens.push({ type: 'function', value: val });
    } else if (/^\d+\.?\d*$/.test(val)) {
      tokens.push({ type: 'number', value: val });
    } else if (val === '=>' || /^[:=+*/%<>&|!\-]+$/.test(val)) {
      tokens.push({ type: 'operator', value: val });
    } else {
      tokens.push({ type: 'text', value: val });
    }
  }

  return tokens;
}

function tokenizeHtmlTokens(text: string): Token[] {
  const regex = /(<\/?[a-zA-Z0-9\-]+|[a-zA-Z\-]+(?=\=)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/?>|[<>]|\s+|[^<>\s"']+)/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const val = match[0];
    if (val.startsWith('</') || (val.startsWith('<') && val.length > 1)) {
      tokens.push({ type: 'tag', value: val });
    } else if (val.endsWith('>') || val === '/>') {
      tokens.push({ type: 'tag', value: val });
    } else if (val.startsWith('"') || val.startsWith("'")) {
      tokens.push({ type: 'string', value: val });
    } else if (/^[a-zA-Z\-]+$/.test(val) && match.index > 0 && text[match.index + val.length] === '=') {
      tokens.push({ type: 'keyword', value: val });
    } else {
      tokens.push({ type: 'text', value: val });
    }
  }

  return tokens;
}

function tokenizeCssTokens(text: string): Token[] {
  const regex = /([.#]?[a-zA-Z0-9_\-]+(?=\s*\{)|[a-zA-Z\-]+(?=\s*:)|:\s*[^;{}]+;|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[{}]|\s+|[^;{}]+)/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const val = match[0];
    if (val.startsWith('.') || val.startsWith('#')) {
      tokens.push({ type: 'function', value: val });
    } else if (val.startsWith(':') && val.endsWith(';')) {
      // property value
      tokens.push({ type: 'string', value: val });
    } else if (/^[a-zA-Z\-]+$/.test(val) && match.index < text.length - val.length && text[match.index + val.length] === ':') {
      tokens.push({ type: 'keyword', value: val });
    } else if (val === '{' || val === '}') {
      tokens.push({ type: 'operator', value: val });
    } else {
      tokens.push({ type: 'text', value: val });
    }
  }

  return tokens;
}

export function CodeBlock({
  code,
  language = 'python',
  filename,
  caption,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { locale } = useLanguage();

  const lines = code.trim().split('\n');

  const copyLabel = copied
    ? (locale === 'ru' ? 'Скопировано!' : locale === 'ky' ? 'Көчүрүлдү!' : 'Copied!')
    : (locale === 'ru' ? 'Скопировать' : locale === 'ky' ? 'Көчүрүү' : 'Copy code');

  const langDisplayName: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    js: 'JavaScript',
    html: 'HTML5',
    css: 'CSS3',
    typescript: 'TypeScript',
    ts: 'TypeScript',
  };

  const displayLang = langDisplayName[language.toLowerCase()] ?? language.toUpperCase();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="code-block-container my-5 rounded-[var(--r-lg)] border border-border bg-surface-raised overflow-hidden shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border/80 text-xs">
        <div className="flex items-center gap-2">
          {/* Mac-style subtle window dots */}
          <div className="flex items-center gap-1.5 mr-1" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/80" />
          </div>
          <span className="font-semibold text-foreground tracking-wide">{filename ?? displayLang}</span>
          {filename && (
            <span className="text-[10px] text-muted uppercase font-mono px-1.5 py-0.5 rounded bg-background border border-border">
              {displayLang}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground px-2 py-1 rounded-[var(--r-xs)] hover:bg-surface-raised transition-colors focus:outline-none"
          title={copyLabel}
          aria-label={copyLabel}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-success font-medium">{copyLabel}</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>{copyLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Syntax Highlighting */}
      <div className="overflow-x-auto p-4 font-mono text-[13px] md:text-[14px] leading-relaxed text-foreground select-text">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineTokens = tokenizeLine(line, language);
              return (
                <tr key={idx} className="hover:bg-accent/5 transition-colors">
                  {showLineNumbers && (
                    <td className="w-8 pr-4 text-right text-muted/50 select-none text-xs font-mono align-top">
                      {idx + 1}
                    </td>
                  )}
                  <td className="whitespace-pre pl-1">
                    {lineTokens.map((token, tIdx) => {
                      let colorClass = 'text-foreground';
                      if (token.type === 'keyword') {
                        colorClass = 'text-purple-600 dark:text-purple-400 font-bold';
                      } else if (token.type === 'string') {
                        colorClass = 'text-emerald-600 dark:text-emerald-400';
                      } else if (token.type === 'number') {
                        colorClass = 'text-amber-600 dark:text-amber-400';
                      } else if (token.type === 'comment') {
                        colorClass = 'text-muted italic opacity-75';
                      } else if (token.type === 'function' || token.type === 'tag') {
                        colorClass = 'text-sky-600 dark:text-sky-400 font-medium';
                      } else if (token.type === 'operator') {
                        colorClass = 'text-pink-600 dark:text-pink-400 font-semibold';
                      }

                      return (
                        <span key={tIdx} className={colorClass}>
                          {token.value}
                        </span>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Optional Context/Pedagogical Caption */}
      {caption && (
        <div className="px-4 py-2 border-t border-border/60 bg-surface/50 text-xs text-muted">
          <span className="font-semibold text-foreground">💡 Обратите внимание:</span> {caption}
        </div>
      )}
    </div>
  );
}
