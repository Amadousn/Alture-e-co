-- One row per stored value of a customer's workspace (trades, notes, settings...).
-- Row Level Security: a signed-in customer can only reach their own rows.
create table if not exists public.workspace_data (
    user_id uuid not null references auth.users (id) on delete cascade,
    key text not null,
    value jsonb not null,
    updated_at timestamptz not null default now(),
    primary key (user_id, key)
);

alter table public.workspace_data enable row level security;

drop policy if exists "own rows only" on public.workspace_data;
create policy "own rows only" on public.workspace_data
    for all to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);
