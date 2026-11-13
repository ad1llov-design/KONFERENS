interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({ title = 'Something went wrong', message, retry, className = '' }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={['rounded-[var(--r-md)] bg-danger-light border border-danger/20 p-5', className].join(' ')}
    >
      <p className="font-semibold text-sm text-danger mb-1">{title}</p>
      <p className="text-sm text-danger/80">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-3 text-sm font-medium text-danger underline underline-offset-2 hover:no-underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
