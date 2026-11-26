'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, BookmarkCheck, BookOpen, ChevronLeft, ChevronRight, NotebookPen, Search, Trash2 } from 'lucide-react';
import { addBookToMyBooks, loadBookCatalog, loadBookFavorites, setBookFavorite } from '@/lib/bookLibrary';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { BookCatalogItem, BookDifficulty, ResourceLanguage } from '@/types/books';
import type { Language } from '@/types';
import { SankalpPolityReader } from '@/components/SankalpPolityReader';
import { SANKALP_INDIAN_POLITY_BOOK, type SankalpBookDefinition } from '@/data/sankalpIndianPolityBook';
import { SANKALP_HISTORY_HERITAGE_BOOK } from '@/data/sankalpHistoryHeritageBook';

const SANKALP_ORIGINAL_BOOKS: Array<{
  book: SankalpBookDefinition;
  coverSrc: string;
  coverAlt: string;
  theme: {
    cardBg: string;
    badgeBg: string;
    subBadgeBg: string;
    titleColor: string;
    readBtn: string;
    notesBtnActive: string;
    notesBtnInactive: string;
    notesTitle: string;
    chapterLink: string;
    chapterCountBadge: string;
  };
}> = [
  {
    book: SANKALP_INDIAN_POLITY_BOOK,
    coverSrc: '/images/books/sankalp-indian-polity-cover.jpg',
    coverAlt: 'Sankalp Indian Polity Cover',
    theme: {
      cardBg: 'border-slate-300 bg-gradient-to-br from-slate-50 via-white to-blue-50/40',
      badgeBg: 'bg-slate-900 text-white',
      subBadgeBg: 'bg-blue-100 text-blue-900',
      titleColor: 'text-slate-950',
      readBtn: 'bg-slate-900 hover:bg-black text-white',
      notesBtnActive: 'border-slate-800 bg-slate-100 text-slate-950',
      notesBtnInactive: 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
      notesTitle: 'text-slate-900',
      chapterLink: 'text-slate-900 hover:underline',
      chapterCountBadge: 'bg-slate-100 text-slate-800',
    },
  },
  {
    book: SANKALP_HISTORY_HERITAGE_BOOK,
    coverSrc: '/images/books/sankalp-history-heritage-cover.jpg',
    coverAlt: 'Sankalp Modern Indian History & Gujarat Heritage Cover',
    theme: {
      cardBg: 'border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50/40',
      badgeBg: 'bg-amber-900 text-white',
      subBadgeBg: 'bg-orange-100 text-orange-950',
      titleColor: 'text-amber-950',
      readBtn: 'bg-amber-800 hover:bg-amber-900 text-white',
      notesBtnActive: 'border-amber-800 bg-amber-100 text-amber-950',
      notesBtnInactive: 'border-amber-300 bg-white text-amber-900 hover:bg-amber-50',
      notesTitle: 'text-amber-950',
      chapterLink: 'text-amber-900 hover:underline',
      chapterCountBadge: 'bg-amber-100 text-amber-800',
    },
  },
];

interface SavedBookNote {
  id: string;
  chapterId: string;
  chapterTitleEn: string;
  chapterTitleGu: string;
  note: string;
  updatedAt: string;
}

interface BooksViewProps {
  language: Language;
}

const pageSize = 12;

export const BooksView = ({ language }: BooksViewProps) => {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [items, setItems] = useState<BookCatalogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [exam, setExam] = useState('');
  const [stage, setStage] = useState('');
  const [subject, setSubject] = useState('');
  const [bookType, setBookType] = useState('');
  const [recommendationCategory, setRecommendationCategory] = useState('');
  const [difficulty, setDifficulty] = useState<BookDifficulty | ''>('');
  const [bookLanguage, setBookLanguage] = useState<ResourceLanguage | ''>('');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'difficulty'>('title');
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [busyBook, setBusyBook] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeReaderBook, setActiveReaderBook] = useState<SankalpBookDefinition | null>(null);
  const [readerInitialChapterId, setReaderInitialChapterId] = useState<string | undefined>(undefined);
  const [openNotesBookId, setOpenNotesBookId] = useState<string | null>(null);
  const [notesByBookId, setNotesByBookId] = useState<Record<string, SavedBookNote[]>>({});

  useEffect(() => {
    if (activeReaderBook) return;
    try {
      const next: Record<string, SavedBookNote[]> = {};
      for (const { book } of SANKALP_ORIGINAL_BOOKS) {
        const saved = localStorage.getItem(`sankalp_book_notes_v1_${book.id}`);
        next[book.id] = saved ? JSON.parse(saved) : [];
      }
      setNotesByBookId(next);
    } catch {
      // Ignore storage errors
    }
  }, [activeReaderBook]);

  const deleteBookNote = (bookId: string, noteId: string) => {
    const current = notesByBookId[bookId] ?? [];
    const nextList = current.filter((n) => n.id !== noteId);
    setNotesByBookId((prev) => ({ ...prev, [bookId]: nextList }));
    try {
      localStorage.setItem(`sankalp_book_notes_v1_${bookId}`, JSON.stringify(nextList));
    } catch {
      // Ignore storage errors
    }
  };

  const loadPage = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loadBookCatalog({
        page,
        pageSize,
        search,
        exam: exam || undefined,
        stage: stage ? stage as 'prelims' | 'mains' : undefined,
        subject: subject || undefined,
        bookType: bookType || undefined,
        recommendationCategory: recommendationCategory || undefined,
        difficulty: difficulty || undefined,
        language: bookLanguage || undefined,
        sortBy,
      });
      setItems(result.items);
      setTotal(result.total);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load books.');
    } finally {
      setLoading(false);
    }
  }, [page, search, exam, stage, subject, bookType, recommendationCategory, difficulty, bookLanguage, sortBy]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadPage(), 200);
    return () => window.clearTimeout(timer);
  }, [loadPage]);

  useEffect(() => {
    if (!configured) return;
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
  }, [configured]);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }
    let active = true;
    void loadBookFavorites(userId).then((ids) => {
      if (active) setFavorites(ids);
    }).catch((favoriteError: unknown) => {
      if (active) setError(favoriteError instanceof Error ? favoriteError.message : 'Unable to load saved books.');
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const toggleFavorite = async (book: BookCatalogItem) => {
    if (!userId) {
      router.push('/my-books');
      return;
    }
    const isFavorite = favorites.includes(book.recordId);
    setBusyBook(book.recordId);
    setError('');
    try {
      await setBookFavorite(userId, book.recordId, !isFavorite);
      setFavorites((current) => isFavorite
        ? current.filter((id) => id !== book.recordId)
        : [...current, book.recordId]);
    } catch (favoriteError) {
      setError(favoriteError instanceof Error ? favoriteError.message : 'Unable to update saved books.');
    } finally {
      setBusyBook('');
    }
  };

  const addToMyBooks = async (book: BookCatalogItem) => {
    if (!userId) {
      router.push(`/my-books?add=${encodeURIComponent(book.recordId)}`);
      return;
    }
    setBusyBook(book.recordId);
    setError('');
    setNotice('');
    try {
      await addBookToMyBooks(userId, book.recordId);
      setNotice(language === 'gu' ? 'પુસ્તક તમારી લાઇબ્રેરીમાં ઉમેરાયું.' : 'Book added to My Books.');
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : 'Unable to add this book.');
    } finally {
      setBusyBook('');
    }
  };

  const updateFilter = (update: () => void) => {
    update();
    setPage(1);
  };

  const text = language === 'gu';
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="space-y-4">
      <header className="rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-5 text-white shadow-lg sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-emerald-100">{text ? 'GPSC અને UPSC અભ્યાસ' : 'GPSC & UPSC preparation'}</p>
            <h1 className="mt-0.5 text-2xl font-bold sm:text-3xl">{text ? 'સંકલ્પ પુસ્તકાલય' : 'SANKALP Study Library'}</h1>
          </div>
          <Link href="/my-books" className="rounded-xl bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-900 shadow-sm hover:bg-emerald-50">
            {text ? 'મારી લાઇબ્રેરી' : 'My Books'}
          </Link>
        </div>
        <p className="mt-2.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-emerald-50">
          {text
            ? 'અભ્યાસક્રમ સાથે જોડાયેલા પુસ્તક રેકોર્ડ, ભલામણ, પ્રકાશક અને કાનૂની સ્ત્રોત જુઓ. અચકાસેલી માહિતી સ્પષ્ટ રીતે ચિહ્નિત છે.'
            : 'Browse syllabus-linked book records, recommendations, publisher details, and legitimate sources. Unverified information is clearly labelled.'}
        </p>
      </header>

      {/* Featured Sankalp Original Textbooks */}
      <div className="space-y-4">
        {SANKALP_ORIGINAL_BOOKS.map(({ book: sankalpBook, coverSrc, coverAlt, theme }) => {
          const bookNotes = notesByBookId[sankalpBook.id] ?? [];
          const isNotesOpen = openNotesBookId === sankalpBook.id;
          return (
            <div
              key={sankalpBook.id}
              className={`rounded-2xl border p-4 shadow-md ${theme.cardBg}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-4 max-w-2xl">
                  <Image
                    src={coverSrc}
                    alt={coverAlt}
                    width={96}
                    height={128}
                    className="h-32 w-24 shrink-0 rounded-xl border border-stone-900/15 object-cover shadow-sm"
                  />
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${theme.badgeBg}`}>
                        {text ? 'સંકલ્પ મૂળ પુસ્તક' : 'Sankalp Original Book'}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${theme.subBadgeBg}`}>
                        {text ? 'અંગ્રેજી + ગુજરાતી' : 'English + Gujarati'}
                      </span>
                      <span className="text-xs font-medium text-stone-500">
                        {text
                          ? `તમામ ${sankalpBook.chapters.length} પ્રકરણો લાઈવ`
                          : `All ${sankalpBook.chapters.length} Chapters Live`}
                      </span>
                    </div>
                    <h2 className={`text-xl font-semibold ${theme.titleColor}`}>
                      {text ? sankalpBook.titleGu : sankalpBook.titleEn}
                    </h2>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {text ? sankalpBook.subtitleGu : sankalpBook.subtitleEn}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReaderInitialChapterId(undefined);
                      setActiveReaderBook(sankalpBook);
                    }}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${theme.readBtn}`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{text ? 'ઓનલાઇન વાંચો' : 'Read Book Online'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenNotesBookId(isNotesOpen ? null : sankalpBook.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                      isNotesOpen ? theme.notesBtnActive : theme.notesBtnInactive
                    }`}
                  >
                    <NotebookPen className="h-3.5 w-3.5" />
                    <span>{text ? `મારી નોંધો (${bookNotes.length})` : `My Notes (${bookNotes.length})`}</span>
                  </button>
                </div>
              </div>

              {isNotesOpen && (
                <div className="mt-4 border-t border-stone-200/80 pt-4">
                  <h3 className={`text-xs font-medium uppercase tracking-wider ${theme.notesTitle}`}>
                    {text
                      ? `${sankalpBook.titleGu} — પ્રકરણ મુજબ નોંધો`
                      : `${sankalpBook.titleEn} — Saved Notes by Chapter`}
                  </h3>
                  {bookNotes.length > 0 ? (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {sankalpBook.chapters
                        .map((ch) => ({
                          chapter: ch,
                          chapterNotes: bookNotes.filter((n) => n.chapterId === ch.id),
                        }))
                        .filter((group) => group.chapterNotes.length > 0)
                        .map(({ chapter, chapterNotes }) => (
                          <div key={chapter.id} className="space-y-2 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                            <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setReaderInitialChapterId(chapter.id);
                                  setActiveReaderBook(sankalpBook);
                                }}
                                className={`text-left text-xs font-semibold ${theme.chapterLink}`}
                              >
                                {text ? chapter.titleGu : chapter.titleEn}
                              </button>
                              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${theme.chapterCountBadge}`}>
                                {chapterNotes.length}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {chapterNotes.map((n) => (
                                <div key={n.id} className="flex items-start justify-between gap-2 rounded-lg bg-stone-50 p-2.5 text-xs">
                                  <p className="flex-1 whitespace-pre-wrap leading-relaxed text-stone-800">{n.note}</p>
                                  <button
                                    type="button"
                                    onClick={() => deleteBookNote(sankalpBook.id, n.id)}
                                    aria-label="Delete note"
                                    className="shrink-0 text-stone-400 hover:text-rose-600"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-stone-500">
                      {text
                        ? 'આ પુસ્તક માટે હજી કોઈ નોંધ સાચવેલ નથી. "ઓનલાઇન વાંચો" ખોલીને કોઈપણ પ્રકરણમાં નોંધ લખો.'
                        : 'No notes saved for this book yet. Open "Read Book Online" to write notes inside any chapter.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2">
          <span className="sr-only">{text ? 'શોધો' : 'Search books'}</span>
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => updateFilter(() => setSearch(event.target.value))}
            placeholder={text ? 'શીર્ષક, લેખક અથવા પ્રકાશક શોધો' : 'Search title, author, or publisher'}
            className="w-full rounded-xl border border-stone-300 py-2.5 pl-9 pr-3 text-sm"
          />
        </label>
        <FilterSelect label={text ? 'પરીક્ષા' : 'Exam'} value={exam} onChange={(value) => updateFilter(() => setExam(value))}>
          <option value="">{text ? 'બધી પરીક્ષાઓ' : 'All exams'}</option>
          <option value="gpsc-class-1-2">GPSC</option>
          <option value="upsc-cse">UPSC</option>
        </FilterSelect>
        <FilterSelect label={text ? 'તબક્કો' : 'Stage'} value={stage} onChange={(value) => updateFilter(() => setStage(value))}>
          <option value="">{text ? 'બધા તબક્કા' : 'All stages'}</option>
          <option value="prelims">Prelims</option>
          <option value="mains">Mains</option>
        </FilterSelect>
        <FilterSelect label={text ? 'વિષય' : 'Subject'} value={subject} onChange={(value) => updateFilter(() => setSubject(value))}>
          <option value="">{text ? 'બધા વિષયો' : 'All subjects'}</option>
          <option value="history">History</option>
          <option value="heritage">Heritage</option>
          <option value="polity">Polity</option>
          <option value="economy">Economy</option>
          <option value="geography">Geography</option>
          <option value="science_tech">Science & Technology</option>
          <option value="ethics_admin">Ethics & Administration</option>
          <option value="current_affairs">Current Affairs</option>
        </FilterSelect>
        <FilterSelect label={text ? 'ભાષા' : 'Language'} value={bookLanguage} onChange={(value) => updateFilter(() => setBookLanguage(value as ResourceLanguage | ''))}>
          <option value="">{text ? 'બધી ભાષાઓ' : 'All languages'}</option>
          <option value="en">English</option>
          <option value="gu">Gujarati</option>
          <option value="hi">Hindi</option>
          <option value="bilingual">Bilingual</option>
        </FilterSelect>
        <FilterSelect label={text ? 'કઠિનતા' : 'Difficulty'} value={difficulty} onChange={(value) => updateFilter(() => setDifficulty(value as BookDifficulty | ''))}>
          <option value="">{text ? 'બધા સ્તર' : 'All levels'}</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </FilterSelect>
        <FilterSelect label={text ? 'ભલામણ શ્રેણી' : 'Recommendation'} value={recommendationCategory} onChange={(value) => updateFilter(() => setRecommendationCategory(value))}>
          <option value="">{text ? 'બધી શ્રેણીઓ' : 'All categories'}</option>
          <option value="essential">Essential</option>
          <option value="recommended">Recommended</option>
          <option value="supplementary">Supplementary</option>
          <option value="reference">Reference</option>
        </FilterSelect>
        <FilterSelect label={text ? 'પુસ્તકનો પ્રકાર' : 'Book type'} value={bookType} onChange={(value) => updateFilter(() => setBookType(value))}>
          <option value="">{text ? 'બધા પ્રકાર' : 'All types'}</option>
          <option value="textbook">Textbook</option>
          <option value="reference">Reference</option>
          <option value="report">Report</option>
          <option value="primary_source">Primary source</option>
          <option value="study_guide">Study guide</option>
          <option value="other">Other</option>
        </FilterSelect>
        <FilterSelect label={text ? 'ક્રમબદ્ધ કરો' : 'Sort by'} value={sortBy} onChange={(value) => updateFilter(() => setSortBy(value as typeof sortBy))}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="difficulty">Difficulty</option>
        </FilterSelect>
      </div>

      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</p>}
      {loading && <p role="status" className="p-4 text-sm text-stone-600">{text ? 'પુસ્તકો લોડ થઈ રહ્યાં છે…' : 'Loading books…'}</p>}
      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-stone-600">
          <BookOpen className="mx-auto h-8 w-8 text-stone-400" />
          <p className="mt-3 font-semibold">{text ? 'આ ફિલ્ટરમાં કોઈ પુસ્તક મળ્યું નથી.' : 'No books match these filters.'}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((book) => (
          <article key={book.recordId} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex h-40 items-center justify-center bg-stone-100">
              {book.coverImageUrl
                ? <img src={book.coverImageUrl} alt={`Cover of ${book.titleEn}`} loading="lazy" className="h-full w-full object-cover" />
                : <BookOpen aria-hidden="true" className="h-10 w-10 text-stone-400" />}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex flex-wrap gap-1.5">
                <VerificationBadge status={book.verificationStatus} />
                {book.isArchived && <Badge>Archived · visible only in your library</Badge>}
                {book.recommendationCategory && <Badge>{book.recommendationCategory}</Badge>}
                {book.difficulty && <Badge>{book.difficulty}</Badge>}
              </div>
              <h2 className="text-lg font-semibold leading-snug text-stone-900">
                {text && book.titleGu ? book.titleGu : book.titleEn}
              </h2>
              <p className="text-sm text-stone-600">
                {text && book.authorGu ? book.authorGu : book.authorEn}
                {(text ? book.publisherGu : book.publisherEn) && (
                  <span className="block text-xs text-stone-500">
                    {text ? 'પ્રકાશક: ' : 'Publisher: '}{text ? book.publisherGu : book.publisherEn}
                  </span>
                )}
              </p>
              <p className="line-clamp-3 text-sm leading-5 text-stone-600">
                {text && book.descriptionGu ? book.descriptionGu : book.descriptionEn}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge>{book.language}</Badge>
                {book.exams.map((bookExam) => <Badge key={bookExam.id}>{bookExam.nameEn}</Badge>)}
                {book.subjects.map((bookSubject) => <Badge key={bookSubject.id}>{bookSubject.nameEn}</Badge>)}
              </div>
              <p className="mt-auto text-xs text-stone-500">
                {book.chapters.length} {text ? 'ચકાસાયેલ પ્રકરણો' : 'verified chapters'}
                {book.edition ? ` · ${book.edition}` : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href={`/books/${encodeURIComponent(book.slug)}`} className="flex-1 rounded-lg bg-stone-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-black transition-colors">
                  {text ? 'વિગતો જુઓ' : 'View details'}
                </Link>
                <button
                  type="button"
                  disabled={busyBook === book.recordId}
                  onClick={() => void addToMyBooks(book)}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50 transition-colors"
                >
                  {text ? 'ઉમેરો' : 'Add to My Books'}
                </button>
                <button
                  type="button"
                  disabled={busyBook === book.recordId}
                  onClick={() => void toggleFavorite(book)}
                  aria-label={favorites.includes(book.recordId) ? 'Remove bookmark' : 'Bookmark book'}
                  aria-pressed={favorites.includes(book.recordId)}
                  className={`rounded-lg border p-2 transition-colors disabled:opacity-50 ${
                    favorites.includes(book.recordId)
                      ? 'border-amber-300 bg-amber-50 text-amber-600'
                      : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {favorites.includes(book.recordId) ? <BookmarkCheck className="h-4 w-4 fill-amber-500" /> : <Bookmark className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && total > 0 && (
        <nav aria-label="Book pages" className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-3">
          <span className="text-sm text-stone-600">{text ? `${total} પરિણામ` : `${total} books`}</span>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border p-2 disabled:opacity-40" aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm tabular-nums">{page} / {pageCount}</span>
            <button type="button" disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)} className="rounded-lg border p-2 disabled:opacity-40" aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
      {activeReaderBook && (
        <SankalpPolityReader
          language={language}
          book={activeReaderBook}
          initialChapterId={readerInitialChapterId}
          onClose={() => {
            setActiveReaderBook(null);
            setReaderInitialChapterId(undefined);
          }}
        />
      )}
    </section>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) => (
  <label className="space-y-1 text-xs font-semibold text-stone-700">
    <span>{label}</span>
    <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm">
      {children}
    </select>
  </label>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium capitalize text-stone-700">{children}</span>
);

const VerificationBadge = ({ status }: { status: BookCatalogItem['verificationStatus'] }) => (
  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
    status === 'verified'
      ? 'bg-emerald-100 text-emerald-900'
      : status === 'needs_review'
        ? 'bg-amber-100 text-amber-900'
        : 'bg-stone-100 text-stone-700'
  }`}>
    {status === 'verified' ? 'Verified' : status === 'needs_review' ? 'Needs review' : 'Unverified'}
  </span>
);
