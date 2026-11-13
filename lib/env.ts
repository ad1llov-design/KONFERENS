/**
 * env.ts — centralised environment checks for Kivora.
 * Client-side code may only access NEXT_PUBLIC_* variables.
 * Server-side code accesses all.
 */

// ─── Client-safe checks ───────────────────────────────────────────────────

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Returns true only on the server, when the OpenAI key is present. */
export function isOpenAIConfigured(): boolean {
  // This check runs server-side; OPENAI_API_KEY is never exposed to client.
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  return key;
}

// Server-only — do not import in client components
export function getSupabaseServiceKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  return key;
}

export function getOpenAIKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not set');
  return key;
}

/**
 * Returns a list of missing required env vars for a given integration.
 * Used to surface setup instructions without crashing.
 */
export function getMissingEnvVars(
  integration: 'supabase' | 'openai' | 'all'
): string[] {
  const missing: string[] = [];

  if (integration === 'supabase' || integration === 'all') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL)   missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY)  missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  if (integration === 'openai' || integration === 'all') {
    if (!process.env.OPENAI_API_KEY) missing.push('OPENAI_API_KEY');
  }

  return missing;
}
