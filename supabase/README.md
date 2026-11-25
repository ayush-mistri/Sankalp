# Supabase PostgreSQL & Storage Setup

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project's API settings. The anon key is intended for browser use; never put a `service_role` key in a `NEXT_PUBLIC_` variable.
2. In the Supabase SQL Editor, run:
   - `migrations/20261124223000_create_student_notes.sql` (Personal student notes)
   - `migrations/20261125150000_create_book_reader_tables.sql` (Books metadata, chapter text, highlights, bookmarks, and reading progress)
3. In Supabase Authentication settings, enable email/password sign-in. Configure email confirmation according to your preferred student onboarding flow.
4. Keep original PDF binary files in object/file storage (`public/papers/` or a Supabase Storage bucket referenced by `books.pdf_storage_path`) rather than storing binary PDFs inside PostgreSQL.
5. Restart the Next.js development server after adding environment variables, then open **Notes → My Notes** or **Books → Open Chapter Reader**.

The migrations enable row-level security (RLS) and scope student notes, highlights, bookmarks, and reading progress to `auth.uid()`. When unauthenticated or in local development without `.env.local`, the interactive book reader automatically persists highlights, notes, bookmarks, and progress in `localStorage`.
