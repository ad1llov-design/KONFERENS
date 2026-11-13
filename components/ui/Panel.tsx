import type { ReactNode, HTMLAttributes } from 'react';

type PanelVariant = 'glass' | 'surface' | 'raised' | 'accent' | 'blue';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PanelVariant;
  children: ReactNode;
}

const variantClasses: Record<PanelVariant, string> = {
  glass:   'glass rounded-[var(--r-lg)]',
  surface: 'surface rounded-[var(--r-md)]',
  raised:  'surface-raised rounded-[var(--r-md)]',
  accent:  'bg-accent-light border border-accent/30 rounded-[var(--r-md)]',
  blue:    'bg-blue-light border border-blue/30 rounded-[var(--r-md)]',
};

export function Panel({ variant = 'surface', children, className = '', ...props }: PanelProps) {
  return (
    <div
      className={[variantClasses[variant], 'p-5', className].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
