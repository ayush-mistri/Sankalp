-- Sankalp Digital Books Library & Interactive Reader Schema
-- Architecture:
--   * Book details & metadata       -> PostgreSQL (public.books)
--   * Chapter details & text        -> PostgreSQL (public.book_chapters)
--   * Original PDFs (binary)        -> File / Object Storage (pdf_storage_path)
--   * Student notes                 -> PostgreSQL (public.student_notes)
--   * Highlights                    -> PostgreSQL (public.book_highlights)
--   * Bookmarks & reading progress  -> PostgreSQL (public.book_bookmarks, public.book_reading_progress)

-- 1. Books Metadata Table (no binary PDFs stored inside PostgreSQL)
create table if not exists public.books (
  id text primary key,
  title_en text not null,
  title_gu text not null,
  author_en text not null,
  author_gu text not null,
  category text not null,
  subject text not null,
  language text not null default 'bilingual',
  license_type text not null,
  attribution text not null,
  source_url text not null,
  pdf_storage_path text,
  total_chapters integer not null default 0,
  permission_verified_at date not null default current_date,
  created_at timestamptz not null default now()
);

-- 2. Book Chapters & Extracted Text Table
create table if not exists public.book_chapters (
  id text primary key,
  book_id text not null references public.books (id) on delete cascade,
  chapter_number integer not null,
  part_label_en text,
  part_label_gu text,
  title_en text not null,
  title_gu text not null,
  reading_time_minutes integer not null default 10,
  extracted_sections jsonb not null default '[]'::jsonb,
  summary_points_en jsonb not null default '[]'::jsonb,
  summary_points_gu jsonb not null default '[]'::jsonb,
  source_attribution text not null,
  created_at timestamptz not null default now(),
  unique (book_id, chapter_number)
);

create index if not exists book_chapters_book_num_idx
  on public.book_chapters (book_id, chapter_number asc);

-- 3. Student Text Highlights Table
create table if not exists public.book_highlights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id text not null,
  chapter_id text not null,
  section_id text not null,
  selected_text text not null,
  color text not null default 'yellow' check (color in ('yellow', 'emerald', 'blue', 'rose')),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists book_highlights_user_book_idx
  on public.book_highlights (user_id, book_id, chapter_id);

-- 4. Student Bookmarks Table
create table if not exists public.book_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id text not null,
  chapter_id text not null,
  label text not null,
  created_at timestamptz not null default now(),
  unique (user_id, book_id, chapter_id)
);

create index if not exists book_bookmarks_user_book_idx
  on public.book_bookmarks (user_id, book_id);

-- 5. Student Reading Progress Table
create table if not exists public.book_reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id text not null,
  last_chapter_id text not null,
  completed_chapter_ids text[] not null default '{}',
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  updated_at timestamptz not null default now(),
  unique (user_id, book_id)
);

create index if not exists book_reading_progress_user_idx
  on public.book_reading_progress (user_id, updated_at desc);

create or replace function public.set_book_progress_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_book_progress_updated_at on public.book_reading_progress;
create trigger set_book_progress_updated_at
  before update on public.book_reading_progress
  for each row execute function public.set_book_progress_updated_at();

-- Row Level Security (RLS)
alter table public.books enable row level security;
alter table public.book_chapters enable row level security;
alter table public.book_highlights enable row level security;
alter table public.book_bookmarks enable row level security;
alter table public.book_reading_progress enable row level security;

-- Public read access to open educational book metadata & chapters
drop policy if exists "Anyone can read public books" on public.books;
create policy "Anyone can read public books"
  on public.books for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can read public book chapters" on public.book_chapters;
create policy "Anyone can read public book chapters"
  on public.book_chapters for select
  to anon, authenticated
  using (true);

-- Scoped student policies for highlights
drop policy if exists "Students manage own highlights" on public.book_highlights;
create policy "Students manage own highlights"
  on public.book_highlights for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Scoped student policies for bookmarks
drop policy if exists "Students manage own bookmarks" on public.book_bookmarks;
create policy "Students manage own bookmarks"
  on public.book_bookmarks for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Scoped student policies for reading progress
drop policy if exists "Students manage own reading progress" on public.book_reading_progress;
create policy "Students manage own reading progress"
  on public.book_reading_progress for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select on public.books, public.book_chapters to anon, authenticated;
grant select, insert, update, delete on public.book_highlights, public.book_bookmarks, public.book_reading_progress to authenticated;
