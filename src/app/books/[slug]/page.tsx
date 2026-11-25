'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { InteractiveBookReader } from '@/components/InteractiveBookReader';
import { addBookToMyBooks, loadBookBySlug, loadBookCatalog } from '@/lib/bookLibrary';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { BookCatalogItem } from '@/types/books';

export default function BookDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [book, setBook] = useState<BookCatalogItem | null>(null);
  const [related, setRelated] = useState<BookCatalogItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [readerOpen, setReaderOpen] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    void loadBookBySlug(slug).then(async (loadedBook) => {
      if (!active) return;
      setBook(loadedBook);
      if (loadedBook?.subjects[0]) {
        const page = await loadBookCatalog({ pageSize: 8, subject: loadedBook.subjects[0].slug });
        if (active) setRelated(page.items.filter((item) => item.recordId !== loadedBook.recordId).slice(0, 4));
      }
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
    if (!isSupabaseConfigured()) return;
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

  const handleAdd = async () => {
    if (!book) return;
    if (!userId) {
      router.push(`/my-books?add=${encodeURIComponent(book.recordId)}`);
      return;
    }
    setBusy(true);
    setError('');
    try {
      await addBookToMyBooks(userId, book.recordId);
      setNotice('Added to My Books.');
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : 'Unable to add this book.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <main className="mx-auto max-w-5xl p-6 text-sm text-stone-600">Loading book details…</main>;
  if (error && !book) {
    return <main className="mx-auto max-w-5xl space-y-4 p-6"><Link href="/" className="text-sm font-bold text-emerald-800">← Study Library</Link><p role="alert" className="rounded-xl bg-rose-50 p-4 text-rose-900">{error}</p></main>;
  }
  if (!book) {
    return <main className="mx-auto max-w-5xl space-y-4 p-6"><Link href="/" className="text-sm font-bold text-emerald-800">← Study Library</Link><h1 className="text-2xl font-bold">Book not found</h1></main>;
  }

  const primaryOfficial = book.resources.find((resource) => resource.type === 'official');
  const purchaseLink = book.resources.find((resource) => resource.type === 'purchase');
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 py-8 sm:p-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Study Library
      </Link>
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}

      <section className="grid gap-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-[minmax(0,1fr)_16rem] md:p-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={book.verificationStatus} />
            {book.isArchived && <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">Archived · retained in your library</span>}
            {!book.isPublished && !book.isArchived && <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">Unpublished · retained in your library</span>}
            {book.recommendationCategory && <Badge>{book.recommendationCategory}</Badge>}
            {book.difficulty && <Badge>{book.difficulty}</Badge>}
            {book.bookType && <Badge>{book.bookType.replace('_', ' ')}</Badge>}
          </div>
          <h1 className="text-3xl font-black leading-tight text-stone-950 sm:text-4xl">{book.titleEn}</h1>
          {book.titleGu && <p className="text-xl font-semibold text-stone-700">{book.titleGu}</p>}
          <p className="text-sm text-stone-600">
            {book.authorEn || 'Author not listed'}
            {book.publisherEn && ` · ${book.publisherEn}`}
            {book.edition && ` · ${book.edition}`}
          </p>
          {book.verificationStatus === 'verified' && book.isbn && <p className="text-xs text-stone-500">ISBN: {book.isbn}</p>}
          <p className="max-w-3xl text-sm leading-6 text-stone-700">{book.descriptionEn || 'No description has been verified yet.'}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={() => void handleAdd()} className="rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">
              {busy ? 'Adding…' : 'Add to My Books'}
            </button>
            <Link href={`/my-books/${encodeURIComponent(book.slug)}`} className="rounded-xl border border-emerald-800 px-4 py-2.5 text-sm font-bold text-emerald-900">
              Reading progress
            </Link>
            {book.canReadOnline && (
              <button type="button" onClick={() => setReaderOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-bold text-stone-800">
                <BookOpen className="h-4 w-4" /> Start Reading Original Notes
              </button>
            )}
          </div>
          <p className="text-xs text-stone-500">SANKALP does not host full copyrighted books. Use official or legitimate purchase links for complete works.</p>
        </div>
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={`Cover of ${book.titleEn}`} loading="lazy" className="h-64 w-full rounded-2xl border border-stone-200 object-cover md:h-full" />
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-2xl bg-stone-100 text-stone-400"><BookOpen className="h-12 w-12" /></div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Why this book is recommended">
          <p>{book.recommendationEn || 'A specific recommendation reason has not been verified yet.'}</p>
          {book.recommendedForEn && <p className="mt-2 text-xs text-stone-500">Recommended for: {book.recommendedForEn}</p>}
        </InfoCard>
        <InfoCard title="What students can learn">
          <p>{book.learningOutcomesEn || book.examinationRelevanceEn || 'Learning outcomes have not been verified yet.'}</p>
          {book.examinationRelevanceEn && <p className="mt-2 text-xs text-stone-500">Exam relevance: {book.examinationRelevanceEn}</p>}
        </InfoCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Examination, stage, and subject">
          <div className="flex flex-wrap gap-2">
            {book.exams.map((exam) => <Badge key={exam.id}>{exam.nameEn} {exam.stages.length ? `· ${exam.stages.join(', ')}` : ''}</Badge>)}
            {book.subjects.map((item) => <Badge key={item.id}>{item.nameEn}</Badge>)}
            {!book.exams.length && <span className="text-sm text-stone-500">No examination mapping has been verified.</span>}
          </div>
        </InfoCard>
        <InfoCard title="Edition and publisher details">
          <dl className="space-y-2 text-sm">
            <Detail label="Publisher" value={book.publisherEn || 'Not listed'} />
            <Detail label="Edition" value={book.edition || 'Not listed'} />
            <Detail label="Language" value={book.language} />
            <Detail label="ISBN" value={book.verificationStatus === 'verified' ? book.isbn || 'Not listed' : 'Shown only after record verification'} />
          </dl>
        </InfoCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Related syllabus topics">
          {book.syllabusTopics.length ? (
            <ul className="space-y-3">
              {book.syllabusTopics.map((topic) => (
                <li key={topic.id} className="border-b border-stone-100 pb-2 last:border-0">
                  <p className="text-sm font-medium">{topic.titleEn}</p>
                  <p className="mt-1 text-xs text-stone-500">{topic.examSlug} · {topic.stage} · {topic.verified ? 'Verified mapping' : 'Mapping needs review'}</p>
                </li>
              ))}
            </ul>
          ) : <p>No syllabus topic links are available yet.</p>}
        </InfoCard>
        <InfoCard title="Official information and purchase links">
          <div className="space-y-3">
            {book.resources.length ? book.resources.map((resource) => (
              <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-xl border border-stone-200 p-3 text-sm hover:border-emerald-600">
                <span><span className="block font-semibold">{resource.label}</span><span className="mt-1 block text-xs text-stone-500">{resource.type} · {resource.verificationStatus}{resource.sourceName ? ` · ${resource.sourceName}` : ''}</span></span>
                <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-800" />
              </a>
            )) : <p>No official or purchase links are listed.</p>}
            {primaryOfficial && <p className="text-xs text-stone-500">Official source links are shown with their verification status.</p>}
            {purchaseLink && <p className="text-xs text-stone-500">Purchase links point to external sites; availability and price may change.</p>}
            {book.licenseType && <p className="text-xs text-stone-500">Rights label (not independently verified): {book.licenseType}</p>}
            {book.attribution && <p className="text-xs text-stone-500">{book.attribution}</p>}
          </div>
        </InfoCard>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5">
        <h2 className="text-xl font-bold">Verified chapter list</h2>
        {book.chapters.length ? (
          <ol className="mt-4 divide-y divide-stone-100">
            {book.chapters.map((chapter) => (
              <li key={chapter.id} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{chapter.number}. {chapter.titleEn}</h3>
                  <span className="text-xs text-emerald-800">Verified</span>
                </div>
                {chapter.summaryEn && <p className="mt-1 text-sm text-stone-600">{chapter.summaryEn}</p>}
                {chapter.sourceUrl && <a className="mt-1 inline-block text-xs font-semibold text-emerald-800 underline" href={chapter.sourceUrl} target="_blank" rel="noreferrer">Chapter source</a>}
              </li>
            ))}
          </ol>
        ) : <p className="mt-2 text-sm text-stone-600">No chapter list has been verified for this edition.</p>}
      </section>

      {!!related.length && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Related books</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <Link key={item.recordId} href={`/books/${encodeURIComponent(item.slug)}`} className="rounded-xl border border-stone-200 bg-white p-4 text-sm font-semibold hover:border-emerald-600">{item.titleEn}<span className="mt-1 block text-xs font-normal text-stone-500">{item.authorEn}</span></Link>)}
          </div>
        </section>
      )}

      {readerOpen && <InteractiveBookReader resource={book} language="en" onClose={() => setReaderOpen(false)} />}
    </main>
  );
}

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-stone-200 bg-white p-5">
    <h2 className="mb-3 text-lg font-bold">{title}</h2>
    <div className="text-sm leading-6 text-stone-700">{children}</div>
  </section>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4"><dt className="text-stone-500">{label}</dt><dd className="text-right font-medium capitalize">{value}</dd></div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold capitalize text-stone-700">{children}</span>
);

const StatusBadge = ({ status }: { status: BookCatalogItem['verificationStatus'] }) => (
  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">{status === 'verified' ? 'Verified' : status.replace('_', ' ')}</span>
);
