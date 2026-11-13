interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ value, label, showLabel = true, size = 'md', className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {(showLabel && label) && (
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-muted">{label}</span>
          <span className="text-xs font-medium text-foreground">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className={['w-full bg-border rounded-full overflow-hidden', height].join(' ')}
      >
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
