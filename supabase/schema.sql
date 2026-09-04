-- Run this once in your Supabase project's SQL Editor
-- (Dashboard > SQL Editor > New query > paste this > Run)
-- If you already ran an earlier version of this file, you only need to run
-- the new "invoices" table section below — it's safe to run the whole file
-- again either way, since everything uses "if not exists".

create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  service text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- Row Level Security: keep the table locked down.
-- The website only ever talks to this table through the server-side
-- Supabase service role key (in API routes), never from the browser,
-- so RLS can stay fully closed.
alter table public.clients enable row level security;

-- Invoices, created from the admin dashboard.
-- client_id links back to an existing client when the admin picks one from
-- the contacts list; it's left null when the admin types in a one-off
-- customer's details instead.
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  client_id uuid references public.clients(id) on delete set null,
  client_name text not null,
  client_email text,
  client_phone text,
  client_address text,
  items jsonb not null default '[]',
  subtotal numeric not null default 0,
  tax numeric not null default 0,
  total numeric not null default 0,
  notes text,
  status text not null default 'draft',
  issue_date date not null default current_date,
  due_date date,
  created_at timestamptz not null default now()
);

alter table public.invoices enable row level security;
