import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'accent' | 'blue' | 'amber' | 'success' | 'danger' | 'muted' | 'demo';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-raised text-foreground border border-border',
  accent:   'bg-accent-light text-accent border border-accent/30',
  blue:     'bg-blue-light text-blue border border-blue/30',
  amber:    'bg-amber-light text-amber border border-amber/30',
  success:  'bg-success-light text-success border border-success/30',
  danger:   'bg-danger-light text-danger border border-danger/30',
  muted:    'bg-deep text-muted border border-border',
  demo:     'bg-amber-light text-amber border border-amber/40',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-[var(--r-xs)]',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
