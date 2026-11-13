'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DemoState } from '@/lib/demo-state';
import { isSupabaseConfigured } from '@/lib/env';

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'register'>(
    searchParams.get('tab') === 'register' ? 'register' : 'signin'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    if (DemoState.isAuthenticated()) {
      router.replace('/dashboard');
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (demoMode) {
        // Demo mode — local state only, no real auth
        await new Promise(r => setTimeout(r, 600));
        DemoState.signIn(email, name || undefined);
        router.push('/dashboard');
        return;
      }

      // Real Supabase auth
      const { getSupabaseBrowserClient } = await import('@/lib/supabase/client');
      const supabase = getSupabaseBrowserClient();
      if (!supabase) throw new Error('Supabase not configured');

      if (tab === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <span className="text-2xl font-bold tracking-tight">Kivora</span>
        </Link>

        {demoMode && (
          <div className="mb-6">
            <DemoBanner
              message="Supabase not configured. Using local demo session."
              missingVars={['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']}
            />
          </div>
        )}

        <div className="glass rounded-[var(--r-xl)] p-7">
          {/* Tabs */}
          <div className="flex gap-1 bg-background rounded-[var(--r-sm)] p-1 mb-6">
            {(['signin', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(null); }}
                className={[
                  'flex-1 py-1.5 text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-colors',
                  tab === t
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                {t === 'signin' ? 'Sign in' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {tab === 'register' && (
              <Input
                label="Name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete={tab === 'register' ? 'email' : 'username'}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={tab === 'register' ? 'Create a password' : 'Your password'}
                  required
                  autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
                  minLength={tab === 'register' ? 8 : undefined}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[var(--r-md)] text-sm bg-surface border border-border placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {tab === 'register' && (
                <p className="text-xs text-muted">Minimum 8 characters</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-danger" role="alert">{error}</p>
            )}

            <Button type="submit" loading={loading} className="w-full mt-1">
              {tab === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setTab(tab === 'signin' ? 'register' : 'signin')}
            className="text-accent underline underline-offset-2 hover:no-underline"
          >
            {tab === 'signin' ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-muted text-sm">Loading…</span></div>}>
      <AuthForm />
    </Suspense>
  );
}
