alter table public.books
  add column if not exists publisher_en text,
  add column if not exists publisher_gu text,
  add column if not exists description_en text not null default '',
  add column if not exists description_gu text not null default '',
  add column if not exists difficulty text not null default 'intermediate'
    check (difficulty in ('beginner', 'intermediate', 'advanced')),
  add column if not exists exam_ids text[] not null default '{}',
  add column if not exists syllabus_topic_ids text[] not null default '{}',
  add column if not exists recommendation_en text not null default '',
  add column if not exists recommendation_gu text not null default '',
  add column if not exists purchase_url text,
  add column if not exists is_published boolean not null default true,
  add column if not exists cover_image_url text,
  add column if not exists file_size_approx text,
  add column if not exists recommended_for_en text not null default '',
  add column if not exists recommended_for_gu text not null default '',
  add column if not exists can_read_online boolean not null default false,
  add column if not exists can_download boolean not null default false,
  add column if not exists can_host boolean not null default false,
  add column if not exists hosted_pdf_url text,
  add column if not exists license_details_url text,
  add column if not exists total_pages integer,
  add column if not exists volumes jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

alter table public.books
  add constraint books_exam_ids_valid
  check (exam_ids <@ array['gpsc', 'upsc']::text[])
  not valid;

create index if not exists books_published_title_idx
  on public.books (is_published, title_en);
create index if not exists books_exam_ids_idx
  on public.books using gin (exam_ids);
create index if not exists books_syllabus_topic_ids_idx
  on public.books using gin (syllabus_topic_ids);

create table if not exists public.book_favorites (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id text not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create index if not exists book_favorites_user_created_idx
  on public.book_favorites (user_id, created_at desc);

create table if not exists public.book_library_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.books enable row level security;
alter table public.book_favorites enable row level security;
alter table public.book_library_admins enable row level security;

drop policy if exists "Anyone can read public books" on public.books;
drop policy if exists "Anyone can read published books" on public.books;
create policy "Anyone can read published books"
  on public.books for select
  to anon, authenticated
  using (is_published);

drop policy if exists "Library admins can read all books" on public.books;
create policy "Library admins can read all books"
  on public.books for select
  to authenticated
  using (
    exists (
      select 1
      from public.book_library_admins admins
      where admins.user_id = (select auth.uid())
    )
  );

drop policy if exists "Library admins can insert books" on public.books;
create policy "Library admins can insert books"
  on public.books for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.book_library_admins admins
      where admins.user_id = (select auth.uid())
    )
  );

drop policy if exists "Library admins can update books" on public.books;
create policy "Library admins can update books"
  on public.books for update
  to authenticated
  using (
    exists (
      select 1
      from public.book_library_admins admins
      where admins.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.book_library_admins admins
      where admins.user_id = (select auth.uid())
    )
  );

drop policy if exists "Library admins can delete books" on public.books;
create policy "Library admins can delete books"
  on public.books for delete
  to authenticated
  using (
    exists (
      select 1
      from public.book_library_admins admins
      where admins.user_id = (select auth.uid())
    )
  );

drop policy if exists "Students manage own book favorites" on public.book_favorites;
create policy "Students manage own book favorites"
  on public.book_favorites for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can read own library admin status" on public.book_library_admins;
create policy "Users can read own library admin status"
  on public.book_library_admins for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.set_book_library_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_book_library_updated_at on public.books;
create trigger set_book_library_updated_at
  before update on public.books
  for each row execute function public.set_book_library_updated_at();

grant select on public.books to anon, authenticated;
grant insert, update, delete on public.books to authenticated;
grant select, insert, delete on public.book_favorites to authenticated;
grant select on public.book_library_admins to authenticated;
