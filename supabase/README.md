# Supabase setup

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the browser client. These values are public; authorization is enforced by Supabase RLS.
- `SUPABASE_SERVICE_ROLE_KEY` for the Next.js server only. It is required by the administrator API to verify the signed-in user against `public.book_library_admins` and perform trusted catalogue writes. Never prefix this key with `NEXT_PUBLIC_`, expose it to client components, or commit a real key.

Add the same variables to the Vercel project settings. Keep the service-role value in server-only environment variables.

## Database migrations

Apply the SQL files in timestamp order in the Supabase SQL Editor (or with the Supabase CLI):

1. `migrations/20261124223000_create_student_notes.sql`
2. `migrations/20261125150000_create_book_reader_tables.sql`
3. `migrations/20261126090000_create_database_driven_book_library.sql`
4. `migrations/20261126100000_seed_study_library.sql`
5. `migrations/20261126120000_normalize_complete_book_library.sql`
6. `migrations/20261126130000_seed_normalized_library.sql`

The final migrations preserve the old reader tables as restricted legacy tables and create the normalized UUID catalogue. Existing catalogue fields, source links, syllabus mappings, and chapter listings are imported with `needs_review` status; their presence does not mean they have been independently verified. Chapter body text and book/PDF files are not copied or distributed.

The normalized relationships are:

- `books` represents one catalogue edition. It links to exams and subjects through `book_exams` and `book_subjects`.
- `syllabus_topics` connects exams, stages, and subjects; `book_syllabus_topics` maps an edition to relevant topics.
- `book_resources` stores external official, purchase, cover, license, or permitted-download links, each with a verification status.
- `book_chapters` stores chapter metadata for one edition. Public chapter lists include only verified, non-archived entries.
- `student_books` is the user's private library entry. `student_chapter_progress`, `student_book_notes`, and `student_reading_sessions` reference that entry and are protected by RLS.
- `book_import_runs` and `book_import_candidates` are restricted staging tables. No scheduled importer or automatic scraper is configured.

## Administrator access

1. Create the administrator's account with Supabase Authentication.
2. Add that user's UUID to the allowlist from the Supabase SQL Editor:

   ```sql
   insert into public.book_library_admins (user_id)
   select id
   from auth.users
   where email = 'admin@example.com'
   on conflict (user_id) do nothing;
   ```

3. Configure `SUPABASE_SERVICE_ROLE_KEY` in the server environment and restart/redeploy.
4. Sign in at `/admin/books`. The API validates the access token with Supabase Auth and checks the allowlist before any catalogue change. Shared catalogue writes are not granted to browser clients.

## Content and privacy

Public book records are read through `book_catalog_public`; student records are user-scoped with RLS and are not publicly cached. Catalogue imports and chapter listings are visibly marked until reviewed. Administrators should verify publisher, author, edition, ISBN, chapter lists, rights labels, and external links before marking records verified or publishing them.

Do not upload copyrighted books or coaching PDFs without permission. Use original descriptions, permitted cover images, official publisher/source pages, or legitimate purchase links. A source URL or imported rights label alone does not establish permission.

After setting environment variables, restart the Next.js development server and open the Study Library, a book detail page, or `/my-books`. Database migrations and RLS still need to be applied and verified against the target Supabase project before deployment.
