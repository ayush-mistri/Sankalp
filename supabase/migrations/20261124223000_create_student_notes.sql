create table if not exists public.student_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exam text not null default 'GPSC',
  subject text not null default 'General Studies',
  topic text not null default '',
  title text not null default 'Untitled note',
  content text not null default '',
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists student_notes_user_updated_idx
  on public.student_notes (user_id, updated_at desc);

create index if not exists student_notes_user_created_idx
  on public.student_notes (user_id, created_at desc);

create index if not exists student_notes_user_subject_idx
  on public.student_notes (user_id, subject);

create or replace function public.set_student_note_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_student_note_updated_at on public.student_notes;
create trigger set_student_note_updated_at
  before update on public.student_notes
  for each row execute function public.set_student_note_updated_at();

alter table public.student_notes enable row level security;

drop policy if exists "Students can view their own notes" on public.student_notes;
create policy "Students can view their own notes"
  on public.student_notes for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own notes" on public.student_notes;
create policy "Students can create their own notes"
  on public.student_notes for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Students can update their own notes" on public.student_notes;
create policy "Students can update their own notes"
  on public.student_notes for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Students can delete their own notes" on public.student_notes;
create policy "Students can delete their own notes"
  on public.student_notes for delete
  to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.student_notes to authenticated;
