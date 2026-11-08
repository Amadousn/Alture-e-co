import { createBrowserClient } from "@supabase/ssr";

// The browser's connection to customer accounts. The publishable key is meant to
// be public: Row Level Security decides what each signed-in customer can reach.
// Without the project's URL and key (not configured on a deployment), customer
// accounts are off and every caller falls back to this browser alone.
export const hasAccounts = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabase = () => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
