'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Bookmark, BookmarkCheck, Trash2 } from 'lucide-react';
import { addBookToMyBooks } from '@/lib/bookLibrary';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { Database, Json } from '@/types/database';

type StudentBook = Database['public']['Tables']['student_books']['Row'];
type Book = Pick<Database['public']['Tables']['books']['Row'], 'id' | 'slug' | 'title_en' | 'title_gu' | 'author_en' | 'publisher_en'>;

interface MyBookCard {
  entry: StudentBook;
  book: Book;
  totalChapters: number;
  completedChapters: number;
}

interface Analytics {
  total_books: number;
  reading_books: number;
  completed_books: number;
  pending_books: number;
  chapters_completed: number;
  total_chapters: number;
  overall_progress_percent: number;
  total_reading_minutes: number;
  subject_progress: Array<{ name_en: string; progress_percent: number }>;
  weekly_activity: Array<{ date: string; sessions: number; duration_seconds: number }>;
}

const emptyAnalytics: Analytics = {
  total_books: 0,
  reading_books: 0,
  completed_books: 0,
  pending_books: 0,
  chapters_completed: 0,
  total_chapters: 0,
  overall_progress_percent: 0,
  total_reading_minutes: 0,
  subject_progress: [],
  weekly_activity: [],
};

const objectValue = (value: Json): { [key: string]: Json | undefined } | null =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? value : null;

const numberValue = (value: Json | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const parseAnalytics = (value: Json): Analytics => {
  const data = objectValue(value);
  if (!data) throw new Error('The reading analytics response is invalid.');
  const subjectProgress = Array.isArray(data.subject_progress)
    ? data.subject_progress.flatMap((item) => {
      const row = objectValue(item);
      if (!row || typeof row.name_en !== 'string') return [];
      return [{ name_en: row.name_en, progress_percent: numberValue(row.progress_percent) }];
    })
    : [];
  const weeklyActivity = Array.isArray(data.weekly_activity)
    ? data.weekly_activity.flatMap((item) => {
      const row = objectValue(item);
      if (!row || typeof row.date !== 'string') return [];
      return [{
        date: row.date,
        sessions: numberValue(row.sessions),
        duration_seconds: numberValue(row.duration_seconds),
      }];
    })
    : [];
  return {
    total_books: numberValue(data.total_books),
    reading_books: numberValue(data.reading_books),
    completed_books: numberValue(data.completed_books),
    pending_books: numberValue(data.pending_books),
    chapters_completed: numberValue(data.chapters_completed),
    total_chapters: numberValue(data.total_chapters),
    overall_progress_percent: numberValue(data.overall_progress_percent),
    total_reading_minutes: numberValue(data.total_reading_minutes),
    subject_progress: subjectProgress,
    weekly_activity: weeklyActivity,
  };
};

export default function MyBooksPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [userId, setUserId] = useState<string | null>(null);
  const [cards, setCards] = useState<MyBookCard[]>([]);
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [authBusy, setAuthBusy] = useState(false);
  const [goalDrafts, setGoalDrafts] = useState<Record<string, { weekly: string; target: string }>>({});

  const refresh = useCallback(async (id: string) => {
    setLoading(true);
    setError('');
    try {
      const client = getSupabaseClient();
      const { data: entries, error: entriesError } = await client.from('student_books')
        .select('*')
        .eq('user_id', id)
        .order('last_accessed_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });
      if (entriesError) throw entriesError;

      const bookIds = entries.map((entry) => entry.book_id);
      const [booksResult, analyticsResult, chaptersResult, progressResult] = await Promise.all([
        bookIds.length
          ? client.from('books').select('id,slug,title_en,title_gu,author_en,publisher_en').in('id', bookIds)
          : Promise.resolve({ data: [], error: null }),
        client.rpc('get_my_book_analytics'),
        bookIds.length
          ? client.from('book_chapters').select('id,book_id').in('book_id', bookIds)
          : Promise.resolve({ data: [], error: null }),
        bookIds.length
          ? client.from('student_chapter_progress').select('book_id,book_chapter_id,status').eq('user_id', id).in('book_id', bookIds)
          : Promise.resolve({ data: [], error: null }),
      ]);
      if (booksResult.error) throw booksResult.error;
      if (analyticsResult.error) throw analyticsResult.error;
      if (chaptersResult.error) throw chaptersResult.error;
      if (progressResult.error) throw progressResult.error;

      const bookMap = new Map(booksResult.data.map((book) => [book.id, book]));
      const chaptersByBook = new Map<string, number>();
      const availableChapterIds = new Set(chaptersResult.data.map((chapter) => chapter.id));
      chaptersResult.data.forEach((chapter) => {
        chaptersByBook.set(chapter.book_id, (chaptersByBook.get(chapter.book_id) ?? 0) + 1);
      });
      const completedByBook = new Map<string, number>();
      progressResult.data.forEach((progress) => {
        if (progress.status === 'completed' && availableChapterIds.has(progress.book_chapter_id)) {
          completedByBook.set(progress.book_id, (completedByBook.get(progress.book_id) ?? 0) + 1);
        }
      });
      setCards(entries.flatMap((entry) => {
        const book = bookMap.get(entry.book_id);
        return book ? [{
          entry,
          book,
          totalChapters: chaptersByBook.get(entry.book_id) ?? 0,
          completedChapters: completedByBook.get(entry.book_id) ?? 0,
        }] : [];
      }));
      setAnalytics(parseAnalytics(analyticsResult.data));
      setGoalDrafts(Object.fromEntries(entries.map((entry) => [entry.book_id, {
        weekly: entry.weekly_chapter_goal?.toString() ?? '',
        target: entry.target_date ?? '',
      }])));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load your library.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      setError('Supabase is not configured. Set the public Supabase URL and anon key.');
      return;
    }
    const client = getSupabaseClient();
    let active = true;
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) setUserId(session?.user.id ?? null);
    });
    void client.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(sessionError.message);
      setUserId(data.session?.user.id ?? null);
      setLoading(false);
    }).catch((sessionError: unknown) => {
      if (!active) return;
      setError(sessionError instanceof Error ? sessionError.message : 'Unable to check sign-in status.');
      setLoading(false);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  useEffect(() => {
    if (!userId) {
      setCards([]);
      setAnalytics(emptyAnalytics);
      return;
    }
    void refresh(userId);
  }, [userId, refresh]);

  useEffect(() => {
    if (!userId) return;
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('add');
    if (!bookId) return;
    let active = true;
    void addBookToMyBooks(userId, bookId).then(() => {
      if (!active) return;
      setNotice('Book added to My Books.');
      router.replace('/my-books');
      void refresh(userId);
    }).catch((addError: unknown) => {
      if (active) setError(addError instanceof Error ? addError.message : 'Unable to add this book.');
    });
    return () => {
      active = false;
    };
  }, [userId, router, refresh]);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthBusy(true);
    setError('');
    try {
      const client = getSupabaseClient();
      if (authMode === 'signUp') {
        const { data, error: authError } = await client.auth.signUp({ email, password });
        if (authError) throw authError;
        if (!data.session) setNotice('Check your email to confirm your account, then sign in.');
      } else {
        const { error: authError } = await client.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to sign in.');
    } finally {
      setAuthBusy(false);
    }
  };

  const updateEntry = async (entry: StudentBook, change: Partial<StudentBook>) => {
    setSavingId(entry.book_id);
    setError('');
    try {
      const { error: updateError } = await getSupabaseClient().from('student_books')
        .update(change)
        .eq('user_id', entry.user_id)
        .eq('book_id', entry.book_id);
      if (updateError) throw updateError;
      if (userId) await refresh(userId);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update your book.');
    } finally {
      setSavingId('');
    }
  };

  const removeBook = async (entry: StudentBook) => {
    setSavingId(entry.book_id);
    setError('');
    try {
      const { error: deleteError } = await getSupabaseClient().from('student_books')
        .delete()
        .eq('user_id', entry.user_id)
        .eq('book_id', entry.book_id);
      if (deleteError) throw deleteError;
      if (userId) await refresh(userId);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to remove this book.');
    } finally {
      setSavingId('');
    }
  };

  const saveGoal = async (entry: StudentBook) => {
    const draft = goalDrafts[entry.book_id];
    if (!draft) return;
    const weekly = draft.weekly.trim() ? Number(draft.weekly) : null;
    if (weekly !== null && (!Number.isInteger(weekly) || weekly < 1 || weekly > 100)) {
      setError('Weekly chapter goal must be a whole number between 1 and 100.');
      return;
    }
    await updateEntry(entry, { weekly_chapter_goal: weekly, target_date: draft.target || null });
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 py-8 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/" className="text-sm font-bold text-emerald-800 hover:underline">← Study Library</Link>
          <h1 className="mt-2 text-3xl font-black text-stone-950">My Books</h1>
          <p className="mt-1 text-sm text-stone-600">Your private reading list, chapter progress, goals, and activity.</p>
        </div>
        <Link href="/" className="rounded-xl border border-emerald-800 px-4 py-2 text-sm font-bold text-emerald-900">Browse books</Link>
      </header>

      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}
      {!userId && !loading && (
        <form onSubmit={signIn} className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold">{authMode === 'signIn' ? 'Sign in to your private library' : 'Create your student account'}</h2>
          <label className="block space-y-1 text-sm font-semibold">Email
            <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
          <label className="block space-y-1 text-sm font-semibold">Password
            <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
          <button type="submit" disabled={authBusy} className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{authBusy ? 'Working…' : authMode === 'signIn' ? 'Sign in' : 'Create account'}</button>
          <button type="button" onClick={() => setAuthMode((mode) => mode === 'signIn' ? 'signUp' : 'signIn')} className="ml-3 text-sm font-semibold text-emerald-800 underline">
            {authMode === 'signIn' ? 'Create an account' : 'Already registered? Sign in'}
          </button>
        </form>
      )}
      {loading && <p role="status" className="text-sm text-stone-600">Loading your library…</p>}

      {userId && (
        <>
          <section aria-label="Reading analytics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Books added" value={analytics.total_books} />
            <Metric label="Currently reading" value={analytics.reading_books} />
            <Metric label="Completed books" value={analytics.completed_books} />
            <Metric label="Pending books" value={analytics.pending_books} />
            <Metric label="Chapters completed" value={`${analytics.chapters_completed}/${analytics.total_chapters}`} />
            <Metric label="Overall chapter progress" value={`${analytics.overall_progress_percent}%`} />
            <Metric label="Reading time" value={`${analytics.total_reading_minutes} min`} />
            <Metric label="Weekly activity" value={`${analytics.weekly_activity.reduce((sum, day) => sum + day.sessions, 0)} sessions`} />
          </section>

          {!!analytics.subject_progress.length && (
            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">Subject-wise progress</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {analytics.subject_progress.map((item) => (
                  <div key={item.name_en} className="space-y-1">
                    <div className="flex justify-between gap-2 text-sm"><span>{item.name_en}</span><span>{item.progress_percent}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full bg-emerald-700" style={{ width: `${Math.min(100, item.progress_percent)}%` }} /></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!!analytics.weekly_activity.length && (
            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">Last 7 days</h2>
              <div className="grid grid-cols-7 gap-2">
                {analytics.weekly_activity.map((day) => (
                  <div key={day.date} className="rounded-lg bg-stone-50 p-2 text-center">
                    <p className="text-[10px] text-stone-500">{day.date.slice(5)}</p>
                    <p className="mt-1 text-sm font-bold">{day.sessions}</p>
                    <p className="text-[10px] text-stone-500">sessions</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-xl font-bold">Reading list</h2>
            {!loading && cards.length === 0 && (
              <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-stone-400" />
                <p className="mt-3 text-sm text-stone-600">No books added yet.</p>
                <Link href="/" className="mt-3 inline-block font-bold text-emerald-800 underline">Browse the catalogue</Link>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {cards.map(({ entry, book, totalChapters, completedChapters }) => {
                const draft = goalDrafts[entry.book_id] ?? { weekly: '', target: '' };
                const percentage = totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0;
                return (
                  <article key={entry.id} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/books/${encodeURIComponent(book.slug)}`} className="text-lg font-bold text-stone-950 hover:text-emerald-800">{book.title_en}</Link>
                        <p className="mt-1 text-sm text-stone-600">{book.author_en}{book.publisher_en ? ` · ${book.publisher_en}` : ''}</p>
                      </div>
                      <button type="button" disabled={savingId === entry.book_id} onClick={() => void updateEntry(entry, { is_favorite: !entry.is_favorite })} aria-label={entry.is_favorite ? 'Remove bookmark' : 'Bookmark book'} aria-pressed={entry.is_favorite} className="rounded-lg border border-stone-200 p-2 text-emerald-800 disabled:opacity-50">
                        {entry.is_favorite ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>
                    </div>
                    <label className="block space-y-1 text-xs font-semibold text-stone-600">Reading status
                      <select value={entry.status} onChange={(event) => void updateEntry(entry, { status: event.target.value })} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm">
                        <option value="want_to_read">Want to read</option>
                        <option value="reading">Reading</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-stone-600"><span>Chapter progress</span><span>{completedChapters}/{totalChapters} · {percentage}%</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full bg-emerald-700" style={{ width: `${percentage}%` }} /></div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <label className="space-y-1 text-xs font-semibold text-stone-600">Weekly chapter goal
                        <input type="number" min="1" max="100" value={draft.weekly} onChange={(event) => setGoalDrafts((current) => ({ ...current, [entry.book_id]: { ...draft, weekly: event.target.value } }))} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                      </label>
                      <label className="space-y-1 text-xs font-semibold text-stone-600">Target date
                        <input type="date" value={draft.target} onChange={(event) => setGoalDrafts((current) => ({ ...current, [entry.book_id]: { ...draft, target: event.target.value } }))} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" disabled={savingId === entry.book_id} onClick={() => void saveGoal(entry)} className="rounded-lg border border-emerald-800 px-3 py-2 text-xs font-bold text-emerald-900 disabled:opacity-50">Save goal</button>
                      <Link href={`/my-books/${encodeURIComponent(book.slug)}`} className="rounded-lg bg-emerald-800 px-3 py-2 text-xs font-bold text-white">Chapters & notes</Link>
                      <button type="button" disabled={savingId === entry.book_id} onClick={() => void removeBook(entry)} className="ml-auto inline-flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-800 disabled:opacity-50">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

const Metric = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl border border-stone-200 bg-white p-4">
    <p className="text-xs font-semibold text-stone-500">{label}</p>
    <p className="mt-1 text-2xl font-black text-emerald-900">{value}</p>
  </div>
);
