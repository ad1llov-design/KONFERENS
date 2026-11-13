import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full px-3.5 py-2.5 rounded-[var(--r-md)] text-sm',
          'bg-surface border border-border',
          'placeholder:text-subtle',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
          error ? 'border-danger focus:ring-danger/40' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-danger" role="alert">{error}</p>
      )}
    </div>
  );
}
