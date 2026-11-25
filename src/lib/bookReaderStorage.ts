import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type {
  BookBookmark,
  BookHighlight,
  BookPersonalNote,
  BookReadingProgress,
  HighlightColor,
} from '@/types/books';

const STORAGE_KEYS = {
  highlights: 'sankalp:reader:highlights:v1',
  bookmarks: 'sankalp:reader:bookmarks:v1',
  notes: 'sankalp:reader:notes:v1',
  progress: 'sankalp:reader:progress:v1',
};

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const readLocalList = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  return safeParse<T[]>(window.localStorage.getItem(key), []);
};

const writeLocalList = <T>(key: string, items: T[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore quota errors cleanly
  }
};

async function getAuthenticatedUserId(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

export interface BookReaderStatePayload {
  highlights: BookHighlight[];
  bookmarks: BookBookmark[];
  notes: BookPersonalNote[];
  progress: BookReadingProgress | null;
  storageMode: 'cloud' | 'local';
}

export async function loadBookReaderState(bookId: string): Promise<BookReaderStatePayload> {
  const localHighlights = readLocalList<BookHighlight>(STORAGE_KEYS.highlights).filter(
    (h) => h.bookId === bookId
  );
  const localBookmarks = readLocalList<BookBookmark>(STORAGE_KEYS.bookmarks).filter(
    (b) => b.bookId === bookId
  );
  const localNotes = readLocalList<BookPersonalNote>(STORAGE_KEYS.notes).filter(
    (n) => n.bookId === bookId
  );
  const allProgress = readLocalList<BookReadingProgress>(STORAGE_KEYS.progress);
  const localProgress = allProgress.find((p) => p.bookId === bookId) || null;

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return {
      highlights: localHighlights,
      bookmarks: localBookmarks,
      notes: localNotes,
      progress: localProgress,
      storageMode: 'local',
    };
  }

  try {
    const supabase = getSupabaseClient();
    const [hlRes, bmRes, progRes] = await Promise.all([
      supabase
        .from('book_highlights')
        .select('*')
        .eq('user_id', userId)
        .eq('book_id', bookId)
        .order('created_at', { ascending: false }),
      supabase
        .from('book_bookmarks')
        .select('*')
        .eq('user_id', userId)
        .eq('book_id', bookId)
        .order('created_at', { ascending: false }),
      supabase
        .from('book_reading_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('book_id', bookId)
        .maybeSingle(),
    ]);

    const highlights: BookHighlight[] = hlRes.data
      ? hlRes.data.map((row) => ({
          id: row.id,
          bookId: row.book_id,
          chapterId: row.chapter_id,
          sectionId: row.section_id,
          selectedText: row.selected_text,
          color: (row.color as HighlightColor) || 'yellow',
          note: row.note || undefined,
          createdAt: row.created_at,
        }))
      : localHighlights;

    const bookmarks: BookBookmark[] = bmRes.data
      ? bmRes.data.map((row) => ({
          id: row.id,
          bookId: row.book_id,
          chapterId: row.chapter_id,
          label: row.label,
          createdAt: row.created_at,
        }))
      : localBookmarks;

    const progress: BookReadingProgress | null = progRes.data
      ? {
          bookId: progRes.data.book_id,
          lastChapterId: progRes.data.last_chapter_id,
          completedChapterIds: progRes.data.completed_chapter_ids || [],
          progressPercent: progRes.data.progress_percent,
          updatedAt: progRes.data.updated_at,
        }
      : localProgress;

    return {
      highlights,
      bookmarks,
      notes: localNotes,
      progress,
      storageMode: 'cloud',
    };
  } catch {
    return {
      highlights: localHighlights,
      bookmarks: localBookmarks,
      notes: localNotes,
      progress: localProgress,
      storageMode: 'local',
    };
  }
}

export function loadAllLocalProgressSummary(): Record<
  string,
  { progressPercent: number; completedCount: number; bookmarkCount: number; highlightCount: number; noteCount: number }
> {
  const progressList = readLocalList<BookReadingProgress>(STORAGE_KEYS.progress);
  const bookmarks = readLocalList<BookBookmark>(STORAGE_KEYS.bookmarks);
  const highlights = readLocalList<BookHighlight>(STORAGE_KEYS.highlights);
  const notes = readLocalList<BookPersonalNote>(STORAGE_KEYS.notes);

  const summary: Record<
    string,
    { progressPercent: number; completedCount: number; bookmarkCount: number; highlightCount: number; noteCount: number }
  > = {};

  const ensureBook = (bookId: string) => {
    if (!summary[bookId]) {
      summary[bookId] = {
        progressPercent: 0,
        completedCount: 0,
        bookmarkCount: 0,
        highlightCount: 0,
        noteCount: 0,
      };
    }
  };

  progressList.forEach((p) => {
    ensureBook(p.bookId);
    summary[p.bookId].progressPercent = p.progressPercent;
    summary[p.bookId].completedCount = p.completedChapterIds.length;
  });

  bookmarks.forEach((b) => {
    ensureBook(b.bookId);
    summary[b.bookId].bookmarkCount += 1;
  });

  highlights.forEach((h) => {
    ensureBook(h.bookId);
    summary[h.bookId].highlightCount += 1;
  });

  notes.forEach((n) => {
    ensureBook(n.bookId);
    summary[n.bookId].noteCount += 1;
  });

  return summary;
}

export async function addHighlight(
  input: Omit<BookHighlight, 'id' | 'createdAt'>
): Promise<BookHighlight> {
  const createdAt = new Date().toISOString();
  const newItem: BookHighlight = {
    ...input,
    id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt,
  };

  const existing = readLocalList<BookHighlight>(STORAGE_KEYS.highlights);
  writeLocalList(STORAGE_KEYS.highlights, [newItem, ...existing]);

  const userId = await getAuthenticatedUserId();
  if (userId) {
    try {
      const supabase = getSupabaseClient();
      const { data } = await supabase
        .from('book_highlights')
        .insert({
          user_id: userId,
          book_id: input.bookId,
          chapter_id: input.chapterId,
          section_id: input.sectionId,
          selected_text: input.selectedText,
          color: input.color,
          note: input.note ?? null,
        })
        .select('*')
        .single();
      if (data) {
        newItem.id = data.id;
      }
    } catch {
      // Keep local highlight seamlessly
    }
  }

  return newItem;
}

export async function updateHighlightNote(highlightId: string, note: string): Promise<void> {
  const existing = readLocalList<BookHighlight>(STORAGE_KEYS.highlights);
  const updated = existing.map((h) => (h.id === highlightId ? { ...h, note } : h));
  writeLocalList(STORAGE_KEYS.highlights, updated);

  const userId = await getAuthenticatedUserId();
  if (userId) {
    try {
      const supabase = getSupabaseClient();
      await supabase
        .from('book_highlights')
        .update({ note })
        .eq('id', highlightId)
        .eq('user_id', userId);
    } catch {
      // Ignore if local-only ID
    }
  }
}

export async function removeHighlight(highlightId: string): Promise<void> {
  const existing = readLocalList<BookHighlight>(STORAGE_KEYS.highlights);
  writeLocalList(
    STORAGE_KEYS.highlights,
    existing.filter((h) => h.id !== highlightId)
  );

  const userId = await getAuthenticatedUserId();
  if (userId) {
    try {
      const supabase = getSupabaseClient();
      await supabase
        .from('book_highlights')
        .delete()
        .eq('id', highlightId)
        .eq('user_id', userId);
    } catch {
      // Ignore if local-only ID
    }
  }
}

export async function toggleBookmark(
  bookId: string,
  chapterId: string,
  label: string
): Promise<{ added: boolean; bookmark?: BookBookmark }> {
  const existing = readLocalList<BookBookmark>(STORAGE_KEYS.bookmarks);
  const found = existing.find((b) => b.bookId === bookId && b.chapterId === chapterId);

  const userId = await getAuthenticatedUserId();

  if (found) {
    writeLocalList(
      STORAGE_KEYS.bookmarks,
      existing.filter((b) => !(b.bookId === bookId && b.chapterId === chapterId))
    );
    if (userId) {
      try {
        const supabase = getSupabaseClient();
        await supabase
          .from('book_bookmarks')
          .delete()
          .eq('user_id', userId)
          .eq('book_id', bookId)
          .eq('chapter_id', chapterId);
      } catch {
        // Ignore
      }
    }
    return { added: false };
  }

  const created: BookBookmark = {
    id: `bm-${Date.now()}`,
    bookId,
    chapterId,
    label,
    createdAt: new Date().toISOString(),
  };
  writeLocalList(STORAGE_KEYS.bookmarks, [created, ...existing]);

  if (userId) {
    try {
      const supabase = getSupabaseClient();
      await supabase.from('book_bookmarks').upsert(
        {
          user_id: userId,
          book_id: bookId,
          chapter_id: chapterId,
          label,
        },
        { onConflict: 'user_id,book_id,chapter_id' }
      );
    } catch {
      // Ignore
    }
  }

  return { added: true, bookmark: created };
}

export async function saveReadingProgress(
  bookId: string,
  lastChapterId: string,
  completedChapterIds: string[],
  totalChapters: number
): Promise<BookReadingProgress> {
  const safeTotal = Math.max(1, totalChapters);
  const uniqueCompleted = Array.from(new Set(completedChapterIds));
  const progressPercent = Math.min(100, Math.round((uniqueCompleted.length / safeTotal) * 100));
  const updatedAt = new Date().toISOString();

  const nextProgress: BookReadingProgress = {
    bookId,
    lastChapterId,
    completedChapterIds: uniqueCompleted,
    progressPercent,
    updatedAt,
  };

  const allProgress = readLocalList<BookReadingProgress>(STORAGE_KEYS.progress);
  const filtered = allProgress.filter((p) => p.bookId !== bookId);
  writeLocalList(STORAGE_KEYS.progress, [nextProgress, ...filtered]);

  const userId = await getAuthenticatedUserId();
  if (userId) {
    try {
      const supabase = getSupabaseClient();
      await supabase.from('book_reading_progress').upsert(
        {
          user_id: userId,
          book_id: bookId,
          last_chapter_id: lastChapterId,
          completed_chapter_ids: uniqueCompleted,
          progress_percent: progressPercent,
        },
        { onConflict: 'user_id,book_id' }
      );
    } catch {
      // Ignore
    }
  }

  return nextProgress;
}

export async function savePersonalBookNote(input: {
  bookId: string;
  bookTitle: string;
  subject: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  content: string;
}): Promise<BookPersonalNote> {
  const updatedAt = new Date().toISOString();
  const note: BookPersonalNote = {
    id: `bnote-${Date.now()}`,
    bookId: input.bookId,
    chapterId: input.chapterId,
    chapterTitle: input.chapterTitle,
    title: input.title,
    content: input.content,
    updatedAt,
    syncedToCloud: false,
  };

  const userId = await getAuthenticatedUserId();
  if (userId) {
    try {
      const supabase = getSupabaseClient();
      const { data } = await supabase
        .from('student_notes')
        .insert({
          user_id: userId,
          exam: 'GPSC',
          subject: input.subject || 'General Studies',
          topic: `${input.bookTitle} — ${input.chapterTitle}`,
          title: input.title,
          content: input.content,
          is_favorite: false,
        })
        .select('id')
        .single();
      if (data) {
        note.id = data.id;
        note.syncedToCloud = true;
      }
    } catch {
      // Fallback to local
    }
  }

  const existing = readLocalList<BookPersonalNote>(STORAGE_KEYS.notes);
  writeLocalList(STORAGE_KEYS.notes, [note, ...existing]);
  return note;
}

export function deletePersonalBookNote(noteId: string): void {
  const existing = readLocalList<BookPersonalNote>(STORAGE_KEYS.notes);
  writeLocalList(
    STORAGE_KEYS.notes,
    existing.filter((n) => n.id !== noteId)
  );
}
