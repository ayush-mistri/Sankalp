'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Save } from 'lucide-react';
import { InteractiveBookReader } from '@/components/InteractiveBookReader';
import { addBookToMyBooks, loadBookBySlug } from '@/lib/bookLibrary';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { BookCatalogItem } from '@/types/books';
import type { Database } from '@/types/database';

type ChapterProgress = Database['public']['Tables']['student_chapter_progress']['Row'];
type BookNote = Database['public']['Tables']['student_book_notes']['Row'];
type Chapter = BookCatalogItem['chapters'][number];

export default function MyBookDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [book, setBook] = useState<BookCatalogItem | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [progress, setProgress] = useState<ChapterProgress[]>([]);
  const [notes, setNotes] = useState<BookNote[]>([]);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refresh = useCallback(async (currentUserId: string, currentBook: BookCatalogItem) => {
    const client = getSupabaseClient();
    const [membershipResult, progressResult, notesResult, sessionResult] = await Promise.all([
      client.from('student_books').select('id').eq('user_id', currentUserId).eq('book_id', currentBook.recordId).maybeSingle(),
      client.from('student_chapter_progress').select('*').eq('user_id', currentUserId).eq('book_id', currentBook.recordId),
      client.from('student_book_notes').select('*').eq('user_id', currentUserId).eq('book_id', currentBook.recordId).order('updated_at', { ascending: false }),
      client.from('student_reading_sessions').select('id').eq('user_id', currentUserId).eq('book_id', currentBook.recordId).is('ended_at', null).order('started_at', { ascending: false }).limit(1).maybeSingle(),
    ]);
    if (membershipResult.error) throw membershipResult.error;
    if (progressResult.error) throw progressResult.error;
    if (notesResult.error) throw notesResult.error;
    if (sessionResult.error) throw sessionResult.error;
    setIsMember(Boolean(membershipResult.data));
    setProgress(progressResult.data);
    setNotes(notesResult.data);
    setActiveSession(sessionResult.data?.id ?? null);
    setNoteDrafts(Object.fromEntries(notesResult.data.map((note) => [note.book_chapter_id ?? '', note.content])));
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
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
    }).catch((sessionError: unknown) => {
      if (active) setError(sessionError instanceof Error ? sessionError.message : 'Unable to check sign-in status.');
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    void loadBookBySlug(slug).then((loadedBook) => {
      if (active) setBook(loadedBook);
    }).catch((loadError: unknown) => {
      if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load book details.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!userId || !book) {
      setIsMember(false);
      setProgress([]);
      setNotes([]);
      return;
    }
    let active = true;
    void refresh(userId, book).catch((loadError: unknown) => {
      if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load your progress.');
    });
    return () => {
      active = false;
    };
  }, [userId, book, refresh]);

  const progressByChapter = useMemo(
    () => new Map(progress.map((item) => [item.book_chapter_id, item])),
    [progress],
  );
  const completedCount = book?.chapters.filter((chapter) => progressByChapter.get(chapter.id)?.status === 'completed').length ?? 0;
  const percentage = book?.chapters.length ? Math.round((completedCount / book.chapters.length) * 100) : 0;

  const ensureMember = async () => {
    if (!book) return false;
    if (!userId) {
      router.push(`/my-books?add=${encodeURIComponent(book.recordId)}`);
      return false;
    }
    if (!isMember) {
      setBusy('membership');
      try {
        await addBookToMyBooks(userId, book.recordId);
        setIsMember(true);
      } catch (addError) {
        setError(addError instanceof Error ? addError.message : 'Unable to add this book.');
        return false;
      } finally {
        setBusy('');
      }
    }
    return true;
  };

  const updateChapterStatus = async (chapter: Chapter, status: string) => {
    if (!(await ensureMember()) || !userId || !book) return;
    setBusy(chapter.id);
    setError('');
    try {
      const current = progressByChapter.get(chapter.id);
      const timestamp = new Date().toISOString();
      const { error: saveError } = await getSupabaseClient().from('student_chapter_progress')
        .upsert({
          user_id: userId,
          book_id: book.recordId,
          book_chapter_id: chapter.id,
          status,
          started_at: status === 'not_started' ? null : current?.started_at ?? timestamp,
          completed_at: status === 'completed' ? timestamp : null,
        }, { onConflict: 'user_id,book_chapter_id' });
      if (saveError) throw saveError;
      await refresh(userId, book);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update chapter progress.');
    } finally {
      setBusy('');
    }
  };

  const saveNote = async (chapter: Chapter) => {
    if (!(await ensureMember()) || !userId || !book) return;
    setBusy(`note-${chapter.id}`);
    setError('');
    try {
      const existing = notes.find((note) => note.book_chapter_id === chapter.id);
      const payload = {
        user_id: userId,
        book_id: book.recordId,
        book_chapter_id: chapter.id,
        title: chapter.titleEn,
        content: noteDrafts[chapter.id] ?? '',
      };
      const result = existing
        ? await getSupabaseClient().from('student_book_notes').update(payload).eq('id', existing.id)
        : await getSupabaseClient().from('student_book_notes').insert(payload);
      if (result.error) throw result.error;
      await refresh(userId, book);
      setNotice('Note saved privately to your account.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save your note.');
    } finally {
      setBusy('');
    }
  };

  const startSession = async (chapter: Chapter) => {
    if (!(await ensureMember()) || !book) return;
    setBusy(`session-${chapter.id}`);
    setError('');
    try {
      if (activeSession) {
        const { error: closeError } = await getSupabaseClient()
          .rpc('finish_book_reading_session', { requested_session_id: activeSession });
        if (closeError) throw closeError;
      }
      const { data, error: startError } = await getSupabaseClient()
        .rpc('start_book_reading_session', {
          requested_book_id: book.recordId,
          requested_chapter_id: chapter.id,
        });
      if (startError) throw startError;
      setActiveSession(data);
      setNotice(`Reading session started: ${chapter.titleEn}`);
    } catch (sessionError) {
      setError(sessionError instanceof Error ? sessionError.message : 'Unable to start a reading session.');
    } finally {
      setBusy('');
    }
  };

  const finishSession = async () => {
    if (!activeSession) return;
    setBusy('session-finish');
    try {
      const { error: finishError } = await getSupabaseClient()
        .rpc('finish_book_reading_session', { requested_session_id: activeSession });
      if (finishError) throw finishError;
      setActiveSession(null);
      setNotice('Reading session completed.');
    } catch (finishError) {
      setError(finishError instanceof Error ? finishError.message : 'Unable to finish the reading session.');
    } finally {
      setBusy('');
    }
  };

  if (loading) return <main className="mx-auto max-w-5xl p-6 text-sm text-stone-600">Loading chapters…</main>;
  if (!book) return <main className="mx-auto max-w-5xl space-y-4 p-6"><Link href="/my-books" className="text-sm font-bold text-emerald-800">← My Books</Link><p role="alert">{error || 'Book not found.'}</p></main>;

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 py-8 sm:p-8">
      <Link href="/my-books" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800"><ArrowLeft className="h-4 w-4" /> My Books</Link>
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}
      <header className="rounded-2xl border border-stone-200 bg-white p-5">
        <h1 className="text-2xl font-black">{book.titleEn}</h1>
        <p className="mt-1 text-sm text-stone-600">{book.authorEn}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="min-w-48 flex-1">
            <div className="mb-1 flex justify-between text-xs text-stone-600"><span>Overall chapter progress</span><span>{completedCount}/{book.chapters.length} · {percentage}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full bg-emerald-700" style={{ width: `${percentage}%` }} /></div>
          </div>
          {!isMember && <button type="button" disabled={busy === 'membership'} onClick={() => void ensureMember()} className="rounded-lg bg-emerald-800 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">{busy === 'membership' ? 'Adding…' : 'Add to My Books'}</button>}
          {book.canReadOnline && <button type="button" onClick={() => setReaderOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-3 py-2 text-sm font-bold"><BookOpen className="h-4 w-4" /> Read original notes</button>}
          {activeSession && <button type="button" disabled={busy === 'session-finish'} onClick={() => void finishSession()} className="rounded-lg border border-emerald-800 px-3 py-2 text-sm font-bold text-emerald-900">Finish session</button>}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Verified chapter progress and personal notes</h2>
        {!book.chapters.length && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Chapter details are hidden until verified by an administrator. No chapter data has been invented.</p>}
        {book.chapters.map((chapter) => {
          const current = progressByChapter.get(chapter.id);
          const note = noteDrafts[chapter.id] ?? '';
          return (
            <article key={chapter.id} className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{chapter.number}. {chapter.titleEn}</h3>
                  {chapter.summaryEn && <p className="mt-1 text-sm text-stone-600">{chapter.summaryEn}</p>}
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900">Verified</span>
              </div>
              {chapter.sourceUrl && <a className="text-xs font-semibold text-emerald-800 underline" href={chapter.sourceUrl} target="_blank" rel="noreferrer">Open official chapter source</a>}
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="space-y-1 text-xs font-semibold text-stone-600">Reading status
                  <select value={current?.status ?? 'not_started'} onChange={(event) => void updateChapterStatus(chapter, event.target.value)} disabled={busy === chapter.id || !userId} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm disabled:opacity-60">
                    <option value="not_started">Not started</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <button type="button" disabled={!userId || busy === `session-${chapter.id}`} onClick={() => void startSession(chapter)} className="self-end rounded-lg border border-emerald-800 px-3 py-2 text-sm font-bold text-emerald-900 disabled:opacity-50">Start session</button>
              </div>
              <label className="block space-y-1 text-xs font-semibold text-stone-600">Private chapter note
                <textarea rows={3} value={note} onChange={(event) => setNoteDrafts((currentNotes) => ({ ...currentNotes, [chapter.id]: event.target.value }))} placeholder="Write a personal study note…" className="w-full resize-y rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              </label>
              <button type="button" disabled={!userId || busy === `note-${chapter.id}`} onClick={() => void saveNote(chapter)} className="inline-flex items-center gap-2 rounded-lg bg-stone-800 px-3 py-2 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" /> Save private note</button>
            </article>
          );
        })}
      </section>
      {!userId && <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Sign in to save chapter progress, notes, goals, and reading activity.</p>}
      {readerOpen && <InteractiveBookReader resource={book} language="en" onClose={() => setReaderOpen(false)} />}
    </main>
  );
}
