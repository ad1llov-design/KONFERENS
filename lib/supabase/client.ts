import { createBrowserClient } from '@supabase/ssr';
import { isSupabaseConfigured } from '@/lib/env';

let _client: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Returns a Supabase browser client, or null if Supabase is not configured.
 * Always check the return value before using.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  if (_client) return _client;

  _client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return _client;
}
