'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { DemoState } from '@/lib/demo-state';
import { isSupabaseConfigured } from '@/lib/env';
import { useLanguage } from '@/lib/i18n/context';

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();

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
        await new Promise(r => setTimeout(r, 600));
        DemoState.signIn(email, name || undefined);
        router.push('/dashboard');
        return;
      }

      const { getSupabaseBrowserClient } = await import('@/lib/supabase/client');
      const supabase = getSupabaseBrowserClient();
      if (!supabase) throw new Error('Supabase not configured');

      if (tab === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.common.error;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground relative">
      {/* Top bar with language switcher */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent">
            {t.nav.brand}
          </span>
        </Link>

        {demoMode && (
          <div className="mb-6">
            <DemoBanner
              message={t.auth.demoModeNotice}
              missingVars={['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']}
            />
          </div>
        )}

        <div className="glass rounded-[var(--r-xl)] p-7 border border-border/80 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-1 bg-surface rounded-[var(--r-sm)] p-1 mb-6 border border-border">
            <button
              onClick={() => { setTab('signin'); setError(null); }}
              className={[
                'flex-1 py-1.5 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-colors',
                tab === 'signin'
                  ? 'bg-surface-raised text-foreground shadow-sm font-semibold'
                  : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              {t.auth.signInTab}
            </button>
            <button
              onClick={() => { setTab('register'); setError(null); }}
              className={[
                'flex-1 py-1.5 text-xs md:text-sm font-medium rounded-[calc(var(--r-sm)-2px)] transition-colors',
                tab === 'register'
                  ? 'bg-accent text-white shadow-sm font-semibold'
                  : 'text-muted hover:text-foreground',
              ].join(' ')}
            >
              {t.auth.registerTab}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {tab === 'register' && (
              <Input
                label={t.auth.nameLabel}
                type="text"
                placeholder={t.auth.namePlaceholder}
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            )}

            <Input
              label={t.auth.emailLabel}
              type="email"
              placeholder={t.auth.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete={tab === 'register' ? 'email' : 'username'}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">{t.auth.passwordLabel}</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={tab === 'register' ? t.auth.passwordRegisterPlaceholder : t.auth.passwordPlaceholder}
                  required
                  autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
                  minLength={tab === 'register' ? 8 : undefined}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[var(--r-md)] text-sm bg-surface border border-border placeholder:text-subtle text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {tab === 'register' && (
                <p className="text-xs text-muted">{t.auth.minChars}</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-danger" role="alert">{error}</p>
            )}

            <Button type="submit" loading={loading} className="w-full mt-1">
              {tab === 'signin' ? t.auth.signInBtn : t.auth.registerBtn}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          {tab === 'signin' ? t.auth.noAccountPrompt + ' ' : t.auth.haveAccountPrompt + ' '}
          <button
            onClick={() => setTab(tab === 'signin' ? 'register' : 'signin')}
            className="text-accent underline underline-offset-2 hover:no-underline font-medium"
          >
            {tab === 'signin' ? t.auth.registerTab : t.auth.signInTab}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><span className="text-muted text-sm">Loading…</span></div>}>
      <AuthForm />
    </Suspense>
  );
}
