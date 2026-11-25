-- Keep the existing reader tables available to the current reader while moving
-- catalogue ownership and student reading state to the normalized UUID schema.
alter table public.books rename to legacy_books;
alter table public.book_chapters rename to legacy_book_chapters;

revoke all on public.legacy_books, public.legacy_book_chapters from anon, authenticated;
alter table public.legacy_books enable row level security;
alter table public.legacy_book_chapters enable row level security;
drop policy if exists "Anyone can read published books" on public.legacy_books;
drop policy if exists "Anyone can read public books" on public.legacy_books;
drop policy if exists "Library admins can read all books" on public.legacy_books;
drop policy if exists "Library admins can insert books" on public.legacy_books;
drop policy if exists "Library admins can update books" on public.legacy_books;
drop policy if exists "Library admins can delete books" on public.legacy_books;
drop policy if exists "Anyone can read public book chapters" on public.legacy_book_chapters;

create table public.exams (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_gu text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.exams (slug, name_en, name_gu) values
  ('gpsc-class-1-2', 'GPSC Class 1 and Class 2', 'GPSC વર્ગ ૧ અને વર્ગ ૨'),
  ('upsc-cse', 'UPSC Civil Services Examination', 'UPSC સિવિલ સર્વિસિસ પરીક્ષા')
on conflict (slug) do nothing;

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_gu text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.subjects (slug, name_en, name_gu) values
  ('history', 'History of India and Gujarat', 'ભારત અને ગુજરાતનો ઇતિહાસ'),
  ('heritage', 'Cultural Heritage and Arts', 'સાંસ્કૃતિક વારસો અને કળા'),
  ('polity', 'Polity and Constitution', 'રાજ્યવ્યવસ્થા અને બંધારણ'),
  ('economy', 'Economy and Planning', 'અર્થતંત્ર અને આયોજન'),
  ('geography', 'Geography and Ecology', 'ભૂગોળ અને પર્યાવરણ'),
  ('science_tech', 'Science and Technology', 'વિજ્ઞાન અને ટેક્નોલોજી'),
  ('ethics_admin', 'Ethics and Public Administration', 'નીતિશાસ્ત્ર અને જાહેર વહીવટ'),
  ('current_affairs', 'Current Affairs', 'વર્તમાન પ્રવાહો')
on conflict (slug) do nothing;

create table public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_gu text not null default '',
  author_en text not null default '',
  author_gu text not null default '',
  publisher_en text,
  publisher_gu text,
  edition text,
  isbn text,
  language text not null default 'bilingual'
    check (language in ('en', 'gu', 'hi', 'bilingual')),
  license_label text,
  attribution text,
  cover_image_url text,
  description_en text not null default '',
  description_gu text not null default '',
  examination_relevance_en text not null default '',
  examination_relevance_gu text not null default '',
  learning_outcomes_en text not null default '',
  learning_outcomes_gu text not null default '',
  difficulty text
    check (difficulty is null or difficulty in ('beginner', 'intermediate', 'advanced')),
  recommendation_category text
    check (recommendation_category is null or recommendation_category in
      ('essential', 'recommended', 'supplementary', 'reference')),
  book_type text
    check (book_type is null or book_type in
      ('textbook', 'reference', 'report', 'primary_source', 'study_guide', 'other')),
  recommendation_reason_en text not null default '',
  recommendation_reason_gu text not null default '',
  recommended_for_en text not null default '',
  recommended_for_gu text not null default '',
  verification_status text not null default 'needs_review'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  metadata_source text not null default 'manual',
  manual_override_fields text[] not null default '{}',
  is_published boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.book_exams (
  book_id uuid not null references public.books (id) on delete cascade,
  exam_id uuid not null references public.exams (id) on delete restrict,
  recommended_stages text[] not null default '{}'
    check (recommended_stages <@ array['prelims', 'mains']::text[]),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (book_id, exam_id)
);

create table public.book_subjects (
  book_id uuid not null references public.books (id) on delete cascade,
  subject_id uuid not null references public.subjects (id) on delete restrict,
  is_primary boolean not null default false,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  created_at timestamptz not null default now(),
  primary key (book_id, subject_id)
);

create table public.syllabus_topics (
  id uuid primary key default gen_random_uuid(),
  external_key text not null unique,
  exam_id uuid not null references public.exams (id) on delete cascade,
  subject_id uuid references public.subjects (id) on delete set null,
  stage text not null check (stage in ('prelims', 'mains')),
  title_en text not null,
  title_gu text not null default '',
  official_wording_en text not null default '',
  official_wording_gu text not null default '',
  wording_source text not null default 'summary'
    check (wording_source in ('official', 'summary')),
  verification_status text not null default 'needs_review'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.book_syllabus_topics (
  book_id uuid not null references public.books (id) on delete cascade,
  syllabus_topic_id uuid not null references public.syllabus_topics (id) on delete cascade,
  relevance_note_en text not null default '',
  relevance_note_gu text not null default '',
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  created_at timestamptz not null default now(),
  primary key (book_id, syllabus_topic_id)
);

create table public.book_resources (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  resource_type text not null
    check (resource_type in ('official', 'purchase', 'cover', 'license', 'permitted_download')),
  label text not null,
  url text not null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  verified_at timestamptz,
  source_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_id, resource_type, url)
);

create table public.book_chapters (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books (id) on delete cascade,
  legacy_chapter_id text unique,
  chapter_number integer not null check (chapter_number > 0),
  part_label_en text,
  part_label_gu text,
  title_en text not null,
  title_gu text not null default '',
  summary_en text not null default '',
  summary_gu text not null default '',
  reading_time_minutes integer check (reading_time_minutes is null or reading_time_minutes > 0),
  source_attribution text,
  source_url text,
  verification_status text not null default 'needs_review'
    check (verification_status in ('unverified', 'needs_review', 'verified')),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_id, chapter_number),
  unique (book_id, id)
);

create table public.student_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  status text not null default 'want_to_read'
    check (status in ('want_to_read', 'reading', 'completed')),
  is_favorite boolean not null default false,
  target_date date,
  weekly_chapter_goal integer check (weekly_chapter_goal is null or weekly_chapter_goal between 1 and 100),
  last_accessed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, book_id)
);

create table public.student_chapter_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  book_chapter_id uuid not null,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (user_id, book_id)
    references public.student_books (user_id, book_id) on delete cascade,
  unique (user_id, book_chapter_id),
  foreign key (book_id, book_chapter_id)
    references public.book_chapters (book_id, id) on delete cascade
);

create table public.student_book_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  book_chapter_id uuid,
  title text not null default '',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (user_id, book_id)
    references public.student_books (user_id, book_id) on delete cascade,
  foreign key (book_id, book_chapter_id)
    references public.book_chapters (book_id, id) on delete cascade
);

create table public.student_reading_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  book_id uuid not null references public.books (id) on delete cascade,
  book_chapter_id uuid,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  created_at timestamptz not null default now(),
  foreign key (user_id, book_id)
    references public.student_books (user_id, book_id) on delete cascade,
  foreign key (book_id, book_chapter_id)
    references public.book_chapters (book_id, id) on delete cascade,
  check (ended_at is null or ended_at >= started_at)
);

create table public.book_import_runs (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'completed', 'failed')),
  started_at timestamptz,
  completed_at timestamptz,
  error_summary text,
  created_at timestamptz not null default now()
);

create table public.book_import_candidates (
  id uuid primary key default gen_random_uuid(),
  import_run_id uuid references public.book_import_runs (id) on delete set null,
  source_name text not null,
  external_id text,
  source_url text,
  candidate_data jsonb not null,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'needs_review', 'approved', 'rejected')),
  duplicate_of uuid references public.books (id) on delete set null,
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index book_import_candidates_source_external_idx
  on public.book_import_candidates (source_name, external_id)
  where external_id is not null;

create index books_published_slug_idx
  on public.books (slug) where is_published and archived_at is null;
create index books_verification_status_idx
  on public.books (verification_status, updated_at desc);
create index book_exams_exam_stage_idx
  on public.book_exams (exam_id, verification_status);
create index book_subjects_subject_idx
  on public.book_subjects (subject_id, book_id);
create index syllabus_topics_exam_stage_subject_idx
  on public.syllabus_topics (exam_id, stage, subject_id);
create index book_syllabus_topics_topic_idx
  on public.book_syllabus_topics (syllabus_topic_id, book_id);
create index book_resources_book_type_idx
  on public.book_resources (book_id, resource_type, verification_status);
create index book_chapters_book_number_idx
  on public.book_chapters (book_id, chapter_number)
  where archived_at is null;
create index student_books_user_status_idx
  on public.student_books (user_id, status, updated_at desc);
create index student_books_user_recent_idx
  on public.student_books (user_id, last_accessed_at desc);
create index student_chapter_progress_user_book_idx
  on public.student_chapter_progress (user_id, book_id, status);
create index student_book_notes_user_book_updated_idx
  on public.student_book_notes (user_id, book_id, updated_at desc);
create index student_reading_sessions_user_started_idx
  on public.student_reading_sessions (user_id, started_at desc);
create index book_import_candidates_review_idx
  on public.book_import_candidates (verification_status, created_at desc);

create or replace function public.set_book_library_row_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'exams', 'subjects', 'books', 'book_exams', 'book_subjects',
    'syllabus_topics', 'book_syllabus_topics', 'book_resources',
    'book_chapters', 'student_books', 'student_chapter_progress',
    'student_book_notes', 'book_import_candidates'
  ]
  loop
    execute format('drop trigger if exists set_row_updated_at on public.%I', table_name);
    execute format(
      'create trigger set_row_updated_at before update on public.%I for each row execute function public.set_book_library_row_updated_at()',
      table_name
    );
  end loop;
end;
$$;

-- Preserve the prior catalogue as edition-level records, but do not claim that
-- legacy imports or their links have been independently verified.
insert into public.books (
  slug, title_en, title_gu, author_en, author_gu, publisher_en, publisher_gu,
  language, license_label, attribution, cover_image_url,
  description_en, description_gu, examination_relevance_en,
  examination_relevance_gu, recommendation_reason_en, recommendation_reason_gu,
  recommended_for_en, recommended_for_gu, verification_status, metadata_source,
  is_published
)
select
  legacy.id,
  legacy.title_en,
  legacy.title_gu,
  legacy.author_en,
  legacy.author_gu,
  nullif(legacy.publisher_en, ''),
  nullif(legacy.publisher_gu, ''),
  case when legacy.language in ('en', 'gu', 'hi', 'bilingual') then legacy.language else 'bilingual' end,
  nullif(legacy.license_type, ''),
  nullif(legacy.attribution, ''),
  nullif(legacy.cover_image_url, ''),
  coalesce(legacy.description_en, ''),
  coalesce(legacy.description_gu, ''),
  '',
  '',
  coalesce(legacy.recommendation_en, ''),
  coalesce(legacy.recommendation_gu, ''),
  coalesce(legacy.recommended_for_en, ''),
  coalesce(legacy.recommended_for_gu, ''),
  'needs_review',
  'legacy_sankalp_catalog',
  coalesce(legacy.is_published, true)
from public.legacy_books legacy
on conflict (slug) do nothing;

insert into public.book_subjects (book_id, subject_id, is_primary, verification_status)
select books.id, subjects.id, true, 'needs_review'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
join public.subjects subjects on subjects.slug = legacy.subject
where legacy.subject <> 'all'
on conflict (book_id, subject_id) do nothing;

insert into public.book_exams (book_id, exam_id, recommended_stages, verification_status)
select
  books.id,
  exams.id,
  array_remove(array[
    case when legacy.recommended_for_en ilike '%prelim%' then 'prelims' end,
    case when legacy.recommended_for_en ilike '%mains%' then 'mains' end
  ]::text[], null),
  'needs_review'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
cross join lateral unnest(coalesce(legacy.exam_ids, array[]::text[])) as exam_ids(exam_slug)
join public.exams exams on exams.slug = case exam_ids.exam_slug
when 'gpsc' then 'gpsc-class-1-2'
when 'upsc' then 'upsc-cse'
else exam_slug
end
on conflict (book_id, exam_id) do nothing;

insert into public.book_resources (
  book_id, resource_type, label, url, verification_status, source_name
)
select books.id, 'official', 'Legacy source link', legacy.source_url,
  'needs_review', 'legacy_sankalp_catalog'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
where nullif(legacy.source_url, '') is not null
on conflict (book_id, resource_type, url) do nothing;

insert into public.book_resources (
  book_id, resource_type, label, url, verification_status, source_name
)
select books.id, 'purchase', 'Legacy purchase link', legacy.purchase_url,
  'needs_review', 'legacy_sankalp_catalog'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
where nullif(legacy.purchase_url, '') is not null
on conflict (book_id, resource_type, url) do nothing;

insert into public.book_resources (
  book_id, resource_type, label, url, verification_status, source_name
)
select books.id, 'cover', 'Legacy cover image', legacy.cover_image_url,
  'needs_review', 'legacy_sankalp_catalog'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
where nullif(legacy.cover_image_url, '') is not null
on conflict (book_id, resource_type, url) do nothing;

insert into public.book_resources (
  book_id, resource_type, label, url, verification_status, source_name
)
select books.id, 'license', 'Legacy license details', legacy.license_details_url,
  'needs_review', 'legacy_sankalp_catalog'
from public.legacy_books legacy
join public.books books on books.slug = legacy.id
where nullif(legacy.license_details_url, '') is not null
on conflict (book_id, resource_type, url) do nothing;

insert into public.book_chapters (
  book_id, legacy_chapter_id, chapter_number, part_label_en, part_label_gu,
  title_en, title_gu, reading_time_minutes, source_attribution, verification_status
)
select
  books.id,
  legacy_chapters.id,
  legacy_chapters.chapter_number,
  legacy_chapters.part_label_en,
  legacy_chapters.part_label_gu,
  legacy_chapters.title_en,
  legacy_chapters.title_gu,
  legacy_chapters.reading_time_minutes,
  legacy_chapters.source_attribution,
  'needs_review'
from public.legacy_book_chapters legacy_chapters
join public.books books on books.slug = legacy_chapters.book_id
on conflict (book_id, chapter_number) do nothing;

alter table public.books enable row level security;
alter table public.exams enable row level security;
alter table public.subjects enable row level security;
alter table public.book_exams enable row level security;
alter table public.book_subjects enable row level security;
alter table public.syllabus_topics enable row level security;
alter table public.book_syllabus_topics enable row level security;
alter table public.book_resources enable row level security;
alter table public.book_chapters enable row level security;
alter table public.student_books enable row level security;
alter table public.student_chapter_progress enable row level security;
alter table public.student_book_notes enable row level security;
alter table public.student_reading_sessions enable row level security;
alter table public.book_import_runs enable row level security;
alter table public.book_import_candidates enable row level security;

create policy "Anyone can read published books"
  on public.books for select to anon, authenticated
  using (is_published and archived_at is null);

create policy "Students can read books in their own library"
  on public.books for select to authenticated
  using (exists (
    select 1 from public.student_books
    where student_books.book_id = books.id
      and student_books.user_id = (select auth.uid())
  ));

create policy "Anyone can read exam records"
  on public.exams for select to anon, authenticated using (true);

create policy "Anyone can read subject records"
  on public.subjects for select to anon, authenticated using (true);

create policy "Anyone can read syllabus topic records"
  on public.syllabus_topics for select to anon, authenticated using (true);

create policy "Anyone can read published book exams"
  on public.book_exams for select to anon, authenticated
  using (exists (
    select 1 from public.books
    where books.id = book_exams.book_id
      and books.is_published and books.archived_at is null
  ) or exists (
    select 1 from public.student_books
    where student_books.book_id = book_exams.book_id
      and student_books.user_id = (select auth.uid())
  ));

create policy "Anyone can read published book subjects"
  on public.book_subjects for select to anon, authenticated
  using (exists (
    select 1 from public.books
    where books.id = book_subjects.book_id
      and books.is_published and books.archived_at is null
  ) or exists (
    select 1 from public.student_books
    where student_books.book_id = book_subjects.book_id
      and student_books.user_id = (select auth.uid())
  ));

create policy "Anyone can read published book syllabus links"
  on public.book_syllabus_topics for select to anon, authenticated
  using (exists (
    select 1 from public.books
    where books.id = book_syllabus_topics.book_id
      and books.is_published and books.archived_at is null
  ) or exists (
    select 1 from public.student_books
    where student_books.book_id = book_syllabus_topics.book_id
      and student_books.user_id = (select auth.uid())
  ));

create policy "Anyone can read published book resources"
  on public.book_resources for select to anon, authenticated
  using (exists (
    select 1 from public.books
    where books.id = book_resources.book_id
      and books.is_published and books.archived_at is null
  ) or exists (
    select 1 from public.student_books
    where student_books.book_id = book_resources.book_id
      and student_books.user_id = (select auth.uid())
  ));

create policy "Anyone can read verified published chapters"
  on public.book_chapters for select to anon, authenticated
  using (
    verification_status = 'verified'
    and archived_at is null
    and (
      exists (
        select 1 from public.books
        where books.id = book_chapters.book_id
          and books.is_published and books.archived_at is null
      )
      or exists (
        select 1 from public.student_books
        where student_books.book_id = book_chapters.book_id
          and student_books.user_id = (select auth.uid())
      )
    )
  );

create policy "Students manage own library"
  on public.student_books for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Students manage own chapter progress"
  on public.student_chapter_progress for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Students manage own book notes"
  on public.student_book_notes for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Students can read own reading sessions"
  on public.student_reading_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

create or replace view public.book_catalog_public
with (security_invoker = true)
as
select
  books.id,
  books.slug,
  books.title_en,
  books.title_gu,
  books.author_en,
  books.author_gu,
  books.publisher_en,
  books.publisher_gu,
  books.edition,
  books.isbn,
  books.language,
  books.license_label,
  books.attribution,
  books.cover_image_url,
  books.description_en,
  books.description_gu,
  books.examination_relevance_en,
  books.examination_relevance_gu,
  books.learning_outcomes_en,
  books.learning_outcomes_gu,
  books.difficulty,
  case books.difficulty
    when 'beginner' then 1
    when 'intermediate' then 2
    when 'advanced' then 3
    else 4
  end as difficulty_order,
  books.recommendation_category,
  books.book_type,
  books.recommendation_reason_en,
  books.recommendation_reason_gu,
  books.recommended_for_en,
  books.recommended_for_gu,
  books.verification_status,
  books.metadata_source,
  books.is_published,
  books.archived_at,
  books.created_at,
  books.updated_at,
  coalesce(subject_data.items, '[]'::jsonb) as subjects,
  coalesce(subject_data.slugs, array[]::text[]) as subject_slugs,
  coalesce(exam_data.items, '[]'::jsonb) as exams,
  coalesce(exam_data.slugs, array[]::text[]) as exam_slugs,
  coalesce(exam_data.stages, array[]::text[]) as recommended_stages,
  coalesce(topic_data.items, '[]'::jsonb) as syllabus_topics,
  coalesce(topic_data.keys, array[]::text[]) as syllabus_topic_keys,
  coalesce(resource_data.items, '[]'::jsonb) as resources,
  coalesce(chapter_data.items, '[]'::jsonb) as chapters,
  lower(concat_ws(' ', books.title_en, books.title_gu, books.author_en,
    books.author_gu, books.publisher_en, books.publisher_gu,
    books.description_en, books.description_gu)) as search_text
from public.books books
left join lateral (
  select
    jsonb_agg(jsonb_build_object(
      'id', subjects.id,
      'slug', subjects.slug,
      'name_en', subjects.name_en,
      'name_gu', subjects.name_gu,
      'is_primary', book_subjects.is_primary,
      'verification_status', book_subjects.verification_status
    ) order by book_subjects.is_primary desc, subjects.name_en) as items,
    array_agg(distinct subjects.slug) as slugs
  from public.book_subjects
  join public.subjects on subjects.id = book_subjects.subject_id
  where book_subjects.book_id = books.id
) subject_data on true
left join lateral (
  select
    jsonb_agg(jsonb_build_object(
      'id', exams.id,
      'slug', exams.slug,
      'name_en', exams.name_en,
      'name_gu', exams.name_gu,
      'recommended_stages', book_exams.recommended_stages,
      'verification_status', book_exams.verification_status
    ) order by exams.name_en) as items,
    array_agg(distinct exams.slug) as slugs,
    array_agg(distinct stages.stage) filter (where stages.stage is not null) as stages
  from public.book_exams
  join public.exams on exams.id = book_exams.exam_id
  left join lateral unnest(book_exams.recommended_stages) as stages(stage) on true
  where book_exams.book_id = books.id
) exam_data on true
left join lateral (
  select
    jsonb_agg(jsonb_build_object(
      'id', syllabus_topics.id,
      'external_key', syllabus_topics.external_key,
      'title_en', syllabus_topics.title_en,
      'title_gu', syllabus_topics.title_gu,
      'stage', syllabus_topics.stage,
      'exam_slug', exams.slug,
      'subject_slug', subjects.slug,
      'verification_status', book_syllabus_topics.verification_status
    ) order by syllabus_topics.title_en) as items,
    array_agg(distinct syllabus_topics.external_key) as keys
  from public.book_syllabus_topics
  join public.syllabus_topics on syllabus_topics.id = book_syllabus_topics.syllabus_topic_id
  join public.exams on exams.id = syllabus_topics.exam_id
  left join public.subjects on subjects.id = syllabus_topics.subject_id
  where book_syllabus_topics.book_id = books.id
) topic_data on true
left join lateral (
  select jsonb_agg(jsonb_build_object(
    'id', book_resources.id,
    'resource_type', book_resources.resource_type,
    'label', book_resources.label,
    'url', book_resources.url,
    'verification_status', book_resources.verification_status,
    'verified_at', book_resources.verified_at,
    'source_name', book_resources.source_name
  ) order by book_resources.resource_type, book_resources.created_at) as items
  from public.book_resources
  where book_resources.book_id = books.id
) resource_data on true
left join lateral (
  select jsonb_agg(jsonb_build_object(
    'id', book_chapters.id,
    'legacy_chapter_id', book_chapters.legacy_chapter_id,
    'chapter_number', book_chapters.chapter_number,
    'part_label_en', book_chapters.part_label_en,
    'part_label_gu', book_chapters.part_label_gu,
    'title_en', book_chapters.title_en,
    'title_gu', book_chapters.title_gu,
    'summary_en', book_chapters.summary_en,
    'summary_gu', book_chapters.summary_gu,
    'reading_time_minutes', book_chapters.reading_time_minutes,
    'source_attribution', book_chapters.source_attribution,
    'source_url', book_chapters.source_url,
    'verification_status', book_chapters.verification_status
  ) order by book_chapters.chapter_number) as items
  from public.book_chapters
  where book_chapters.book_id = books.id
    and book_chapters.archived_at is null
) chapter_data on true
where (books.is_published and books.archived_at is null)
  or exists (
    select 1 from public.student_books
    where student_books.book_id = books.id
      and student_books.user_id = (select auth.uid())
  );

create or replace function public.start_book_reading_session(
  requested_book_id uuid,
  requested_chapter_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  new_session_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.student_books
    where user_id = auth.uid() and book_id = requested_book_id
  ) then
    raise exception 'Add the book to My Books before starting a reading session'
      using errcode = '23514';
  end if;
  if requested_chapter_id is not null and not exists (
    select 1 from public.book_chapters
    where id = requested_chapter_id and book_id = requested_book_id
      and verification_status = 'verified'
      and archived_at is null
  ) then
    raise exception 'Chapter is not available for this book'
      using errcode = '23503';
  end if;

  insert into public.student_reading_sessions (user_id, book_id, book_chapter_id)
  values (auth.uid(), requested_book_id, requested_chapter_id)
  returning id into new_session_id;

  update public.student_books
  set last_accessed_at = now(), updated_at = now()
  where user_id = auth.uid() and book_id = requested_book_id;

  return new_session_id;
end;
$$;

create or replace function public.finish_book_reading_session(requested_session_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  update public.student_reading_sessions
  set ended_at = now(),
      duration_seconds = greatest(0, floor(extract(epoch from (now() - started_at)))::integer)
  where id = requested_session_id
    and user_id = auth.uid()
    and ended_at is null;

  if not found then
    raise exception 'Reading session was not found or is already closed'
      using errcode = 'P0002';
  end if;
end;
$$;

create or replace function public.get_my_book_analytics()
returns jsonb
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  with my_books as (
    select student_books.book_id, student_books.status
    from public.student_books
    where student_books.user_id = auth.uid()
  ),
  chapter_counts as (
    select
      count(book_chapters.id)::integer as total,
      count(book_chapters.id) filter (where student_chapter_progress.status = 'completed')::integer as completed
    from my_books
    join public.book_chapters on book_chapters.book_id = my_books.book_id
      and book_chapters.verification_status = 'verified'
      and book_chapters.archived_at is null
    left join public.student_chapter_progress
      on student_chapter_progress.book_chapter_id = book_chapters.id
      and student_chapter_progress.user_id = auth.uid()
  ),
  subject_rows as (
    select
      subjects.slug,
      subjects.name_en,
      subjects.name_gu,
      count(distinct book_chapters.id)::integer as total_chapters,
      count(distinct book_chapters.id) filter (
        where student_chapter_progress.status = 'completed'
      )::integer as completed_chapters
    from my_books
    join public.book_subjects on book_subjects.book_id = my_books.book_id
    join public.subjects on subjects.id = book_subjects.subject_id
    left join public.book_chapters on book_chapters.book_id = my_books.book_id
      and book_chapters.verification_status = 'verified'
      and book_chapters.archived_at is null
    left join public.student_chapter_progress
      on student_chapter_progress.book_chapter_id = book_chapters.id
      and student_chapter_progress.user_id = auth.uid()
    group by subjects.slug, subjects.name_en, subjects.name_gu
  ),
  week_rows as (
    select
      days.activity_day::date as activity_date,
      count(sessions.id)::integer as sessions,
      coalesce(sum(sessions.duration_seconds), 0)::integer as duration_seconds
    from generate_series(
      current_date - 6,
      current_date,
      interval '1 day'
    ) as days(activity_day)
    left join public.student_reading_sessions sessions
      on sessions.user_id = auth.uid()
      and sessions.started_at >= days.activity_day
      and sessions.started_at < days.activity_day + interval '1 day'
    group by days.activity_day
  )
  select jsonb_build_object(
    'total_books', (select count(*)::integer from my_books),
    'reading_books', (select count(*)::integer from my_books where status = 'reading'),
    'completed_books', (select count(*)::integer from my_books where status = 'completed'),
    'pending_books', (select count(*)::integer from my_books where status = 'want_to_read'),
    'chapters_completed', (select completed from chapter_counts),
    'total_chapters', (select total from chapter_counts),
    'overall_progress_percent', case
      when (select total from chapter_counts) = 0 then 0
      else round(100.0 * (select completed from chapter_counts) / (select total from chapter_counts))::integer
    end,
    'total_reading_minutes', (
      select coalesce(floor(sum(duration_seconds) / 60), 0)::integer
      from public.student_reading_sessions
      where user_id = auth.uid()
    ),
    'subject_progress', coalesce((
      select jsonb_agg(jsonb_build_object(
        'slug', subject_rows.slug,
        'name_en', subject_rows.name_en,
        'name_gu', subject_rows.name_gu,
        'completed_chapters', subject_rows.completed_chapters,
        'total_chapters', subject_rows.total_chapters,
        'progress_percent', case
          when subject_rows.total_chapters = 0 then 0
          else round(100.0 * subject_rows.completed_chapters / subject_rows.total_chapters)::integer
        end
      ) order by subject_rows.name_en)
      from subject_rows
    ), '[]'::jsonb),
    'weekly_activity', coalesce((
      select jsonb_agg(jsonb_build_object(
        'date', week_rows.activity_date,
        'sessions', week_rows.sessions,
        'duration_seconds', week_rows.duration_seconds
      ) order by week_rows.activity_date)
      from week_rows
    ), '[]'::jsonb)
  );
$$;

revoke all on public.books, public.exams, public.subjects, public.book_exams,
  public.book_subjects, public.syllabus_topics, public.book_syllabus_topics,
  public.book_resources, public.book_chapters, public.student_reading_sessions,
  public.book_import_runs, public.book_import_candidates
from anon, authenticated;

grant select on public.books, public.exams, public.subjects, public.book_exams,
  public.book_subjects, public.syllabus_topics, public.book_syllabus_topics,
  public.book_resources, public.book_chapters
to anon, authenticated;
grant select on public.book_catalog_public to anon, authenticated;
-- RLS denies anon rows; this grant permits membership predicates in the public view and policies.
grant select on public.student_books to anon;
grant select, insert, update, delete on public.student_books,
  public.student_chapter_progress, public.student_book_notes to authenticated;
grant select on public.student_reading_sessions to authenticated;
revoke all on function public.start_book_reading_session(uuid, uuid) from public, anon;
revoke all on function public.finish_book_reading_session(uuid) from public, anon;
revoke all on function public.get_my_book_analytics() from public, anon;
grant execute on function public.start_book_reading_session(uuid, uuid) to authenticated;
grant execute on function public.finish_book_reading_session(uuid) to authenticated;
grant execute on function public.get_my_book_analytics() to authenticated;

revoke insert, update, delete on public.books, public.book_exams,
  public.book_subjects, public.syllabus_topics, public.book_syllabus_topics,
  public.book_resources, public.book_chapters from anon, authenticated;
revoke all on public.book_import_runs, public.book_import_candidates
  from anon, authenticated;
