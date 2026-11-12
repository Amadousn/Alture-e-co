-- Referrals and commissions. Written only by the server (service role) from
-- confirmed Stripe payments; nothing here is ever trusted from the browser.
-- Each partner has their own terms on their own row: a private agreement and
-- the public programme never share a rate.

create table if not exists public.affiliates (
    id uuid primary key default gen_random_uuid(),
    code text not null unique check (code ~ '^[a-z0-9-]{3,32}$'),
    name text not null,
    email text,
    user_id uuid references auth.users (id) on delete set null,
    -- 0.20 = 20 %. Null until the rate is decided: nothing is owed while it is null.
    commission_rate numeric(5, 4) check (commission_rate is null or (commission_rate >= 0 and commission_rate <= 1)),
    -- Discount the customer gets through this partner, 0.15 = 15 %. Null = none.
    customer_discount numeric(5, 4) check (customer_discount is null or (customer_discount >= 0 and customer_discount < 1)),
    stripe_promotion_code text unique,
    private boolean not null default false,
    active boolean not null default true,
    created_at timestamptz not null default now()
);

-- One partner per customer, for life: the first partner who brought them keeps them.
create table if not exists public.referrals (
    stripe_customer_id text primary key,
    user_id uuid references auth.users (id) on delete set null,
    affiliate_id uuid not null references public.affiliates (id),
    source text not null check (source in ('link', 'code')),
    created_at timestamptz not null default now()
);

-- One row per confirmed payment. payment_ref is unique, so a payment is never counted twice.
create table if not exists public.commissions (
    id uuid primary key default gen_random_uuid(),
    affiliate_id uuid not null references public.affiliates (id),
    stripe_customer_id text not null,
    payment_ref text not null unique,
    payment_intent text,
    product text not null,
    amount_paid integer not null,
    currency text not null,
    rate numeric(5, 4) not null,
    commission integer not null,
    status text not null default 'earned' check (status in ('earned', 'reversed', 'paid')),
    reversed_amount integer not null default 0,
    note text,
    created_at timestamptz not null default now(),
    paid_at timestamptz
);
create index if not exists commissions_affiliate on public.commissions (affiliate_id, created_at desc);
create index if not exists commissions_intent on public.commissions (payment_intent);

alter table public.affiliates enable row level security;
alter table public.referrals enable row level security;
alter table public.commissions enable row level security;

-- A partner signed in with their own account sees their own row and their own commissions. Nothing else.
drop policy if exists "partner reads own row" on public.affiliates;
create policy "partner reads own row" on public.affiliates for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "partner reads own commissions" on public.commissions;
create policy "partner reads own commissions" on public.commissions for select to authenticated
    using (affiliate_id in (select id from public.affiliates where user_id = (select auth.uid())));
