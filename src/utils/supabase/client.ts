import { createBrowserClient } from "@supabase/ssr";

// The browser's connection to customer accounts. The publishable key is meant to
// be public: Row Level Security decides what each signed-in customer can reach.
export const supabase = () => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
