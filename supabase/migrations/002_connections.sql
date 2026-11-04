-- A customer's exchange connections, one row per account. The credentials are
-- sealed by the server (AES-256-GCM) before they arrive here: this table only
-- ever holds ciphertext, and the key that opens it is not in the database.
-- Row Level Security: a signed-in customer can only reach their own rows.
create table if not exists public.exchange_connections (
    user_id uuid not null references auth.users (id) on delete cascade,
    provider text not null,
    slot text not null default '',
    sealed text not null,
    updated_at timestamptz not null default now(),
    primary key (user_id, provider, slot)
);

alter table public.exchange_connections enable row level security;

drop policy if exists "own rows only" on public.exchange_connections;
create policy "own rows only" on public.exchange_connections
    for all to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);
