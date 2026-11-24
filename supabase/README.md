# Personal notes setup

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project's API settings. The anon key is intended for browser use; never put a `service_role` key in a `NEXT_PUBLIC_` variable.
2. In the Supabase SQL Editor, run `migrations/20261124223000_create_student_notes.sql`.
3. In Supabase Authentication settings, enable email/password sign-in. Configure email confirmation according to your preferred student onboarding flow.
4. Restart the Next.js development server after adding environment variables, then open **Notes → My Notes**.

The migration enables row-level security and scopes select, insert, update, and delete operations to `auth.uid()`. The client also filters operations by the signed-in user, but the database policies are the security boundary.
