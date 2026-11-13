import { AlertTriangle } from 'lucide-react';

interface DemoBannerProps {
  message?: string;
  missingVars?: string[];
}

export function DemoBanner({ message, missingVars }: DemoBannerProps) {
  return (
    <div className="demo-banner px-4 py-3 rounded-[var(--r-sm)] flex items-start gap-2.5 text-sm">
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
      <div>
        <span className="font-semibold">Demo mode</span>
        {message && <span> — {message}</span>}
        {missingVars && missingVars.length > 0 && (
          <p className="mt-1 text-xs opacity-80">
            Missing env vars: {missingVars.map(v => (
              <code key={v} className="font-mono bg-amber/10 px-1 rounded mx-0.5">{v}</code>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
