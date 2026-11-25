'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, BookmarkCheck, BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { addBookToMyBooks, loadBookCatalog, loadBookFavorites, setBookFavorite } from '@/lib/bookLibrary';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { BookCatalogItem, BookDifficulty, ResourceLanguage } from '@/types/books';
import type { Language } from '@/types';

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
    <section className="space-y-6">
      <header className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-6 text-white sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-100">{text ? 'GPSC અને UPSC અભ્યાસ' : 'GPSC & UPSC preparation'}</p>
            <h1 className="mt-1 text-3xl font-black sm:text-4xl">{text ? 'સંકલ્પ પુસ્તકાલય' : 'SANKALP Study Library'}</h1>
          </div>
          <Link href="/my-books" className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50">
            {text ? 'મારી લાઇબ્રેરી' : 'My Books'}
          </Link>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50">
          {text
            ? 'અભ્યાસક્રમ સાથે જોડાયેલા પુસ્તક રેકોર્ડ, ભલામણ, પ્રકાશક અને કાનૂની સ્ત્રોત જુઓ. અચકાસેલી માહિતી સ્પષ્ટ રીતે ચિહ્નિત છે.'
            : 'Browse syllabus-linked book records, recommendations, publisher details, and legitimate sources. Unverified information is clearly labelled.'}
        </p>
      </header>

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
              <h2 className="text-lg font-bold leading-snug text-stone-900">
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
                <Link href={`/books/${encodeURIComponent(book.slug)}`} className="flex-1 rounded-lg bg-emerald-800 px-3 py-2 text-center text-sm font-bold text-white hover:bg-emerald-900">
                  {text ? 'વિગતો જુઓ' : 'View details'}
                </Link>
                <button
                  type="button"
                  disabled={busyBook === book.recordId}
                  onClick={() => void addToMyBooks(book)}
                  className="rounded-lg border border-emerald-800 px-3 py-2 text-sm font-bold text-emerald-900 disabled:opacity-50"
                >
                  {text ? 'ઉમેરો' : 'Add to My Books'}
                </button>
                <button
                  type="button"
                  disabled={busyBook === book.recordId}
                  onClick={() => void toggleFavorite(book)}
                  aria-label={favorites.includes(book.recordId) ? 'Remove bookmark' : 'Bookmark book'}
                  aria-pressed={favorites.includes(book.recordId)}
                  className="rounded-lg border border-stone-300 p-2 text-stone-700 disabled:opacity-50"
                >
                  {favorites.includes(book.recordId) ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
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
