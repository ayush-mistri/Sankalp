'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Save, Trash2 } from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';

type VerificationStatus = 'unverified' | 'needs_review' | 'verified';
type ResourceType = 'official' | 'purchase' | 'cover' | 'license' | 'permitted_download';
type ExamSlug = 'gpsc-class-1-2' | 'upsc-cse';
type Stage = 'prelims' | 'mains';

interface ResourceForm {
  id?: string;
  type: ResourceType;
  label: string;
  url: string;
  sourceName: string;
  verificationStatus: VerificationStatus;
}

interface ChapterForm {
  chapterNumber: number;
  partLabelEn: string;
  partLabelGu: string;
  titleEn: string;
  titleGu: string;
  summaryEn: string;
  summaryGu: string;
  readingTimeMinutes: number | null;
  sourceAttribution: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
}

interface ExamForm {
  slug: ExamSlug;
  stages: Stage[];
}

interface SubjectForm {
  slug: string;
  isPrimary: boolean;
}

interface BookForm {
  slug: string;
  titleEn: string;
  titleGu: string;
  authorEn: string;
  authorGu: string;
  publisherEn: string;
  publisherGu: string;
  edition: string;
  isbn: string;
  language: 'en' | 'gu' | 'hi' | 'bilingual';
  descriptionEn: string;
  descriptionGu: string;
  examinationRelevanceEn: string;
  examinationRelevanceGu: string;
  learningOutcomesEn: string;
  learningOutcomesGu: string;
  difficulty: '' | 'beginner' | 'intermediate' | 'advanced';
  recommendationCategory: '' | 'essential' | 'recommended' | 'supplementary' | 'reference';
  bookType: '' | 'textbook' | 'reference' | 'report' | 'primary_source' | 'study_guide' | 'other';
  recommendationReasonEn: string;
  recommendationReasonGu: string;
  recommendedForEn: string;
  recommendedForGu: string;
  licenseLabel: string;
  attribution: string;
  coverImageUrl: string;
  verificationStatus: VerificationStatus;
  isPublished: boolean;
  exams: ExamForm[];
  subjects: SubjectForm[];
  syllabusTopicKeys: string[];
  resources: ResourceForm[];
  chapters: ChapterForm[];
}

interface AdminBook extends BookForm {
  id: string;
  archived_at: string | null;
  updated_at: string;
}

interface AdminOption {
  id: string;
  slug: string;
  name_en?: string;
  title_en?: string;
  external_key?: string;
}

interface AdminData {
  books: AdminBook[];
  exams: AdminOption[];
  subjects: AdminOption[];
  topics: AdminOption[];
}

const blankForm = (): BookForm => ({
  slug: '',
  titleEn: '',
  titleGu: '',
  authorEn: '',
  authorGu: '',
  publisherEn: '',
  publisherGu: '',
  edition: '',
  isbn: '',
  language: 'bilingual',
  descriptionEn: '',
  descriptionGu: '',
  examinationRelevanceEn: '',
  examinationRelevanceGu: '',
  learningOutcomesEn: '',
  learningOutcomesGu: '',
  difficulty: '',
  recommendationCategory: '',
  bookType: '',
  recommendationReasonEn: '',
  recommendationReasonGu: '',
  recommendedForEn: '',
  recommendedForGu: '',
  licenseLabel: '',
  attribution: '',
  coverImageUrl: '',
  verificationStatus: 'needs_review',
  isPublished: false,
  exams: [],
  subjects: [],
  syllabusTopicKeys: [],
  resources: [],
  chapters: [],
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const apiError = async (response: Response) => {
  const body: unknown = await response.json().catch(() => null);
  if (isRecord(body) && typeof body.error === 'string') return body.error;
  return `Request failed (${response.status}).`;
};

const parseAdminData = (value: unknown): AdminData => {
  if (!isRecord(value) || !Array.isArray(value.books)
    || !Array.isArray(value.exams) || !Array.isArray(value.subjects) || !Array.isArray(value.topics)) {
    throw new Error('The administration response is malformed.');
  }
  const books = value.books.flatMap((candidate): AdminBook[] => {
    if (!isRecord(candidate)
      || typeof candidate.id !== 'string'
      || typeof candidate.slug !== 'string'
      || typeof candidate.title_en !== 'string') return [];
    const book = candidate;
    return [{
    ...blankForm(),
    slug: String(book.slug),
    id: String(book.id),
    titleEn: String(book.title_en),
    titleGu: String(book.title_gu ?? ''),
    authorEn: String(book.author_en ?? ''),
    authorGu: String(book.author_gu ?? ''),
    publisherEn: String(book.publisher_en ?? ''),
    publisherGu: String(book.publisher_gu ?? ''),
    edition: String(book.edition ?? ''),
    isbn: String(book.isbn ?? ''),
    language: book.language === 'en' ? 'en' : book.language === 'gu' ? 'gu' : book.language === 'hi' ? 'hi' : 'bilingual',
    descriptionEn: String(book.description_en ?? ''),
    descriptionGu: String(book.description_gu ?? ''),
    examinationRelevanceEn: String(book.examination_relevance_en ?? ''),
    examinationRelevanceGu: String(book.examination_relevance_gu ?? ''),
    learningOutcomesEn: String(book.learning_outcomes_en ?? ''),
    learningOutcomesGu: String(book.learning_outcomes_gu ?? ''),
    difficulty: book.difficulty === 'beginner' || book.difficulty === 'intermediate' || book.difficulty === 'advanced' ? book.difficulty : '',
    recommendationCategory: book.recommendation_category === 'essential' || book.recommendation_category === 'recommended' || book.recommendation_category === 'supplementary' || book.recommendation_category === 'reference' ? book.recommendation_category : '',
    bookType: book.book_type === 'textbook' || book.book_type === 'reference' || book.book_type === 'report' || book.book_type === 'primary_source' || book.book_type === 'study_guide' || book.book_type === 'other' ? book.book_type : '',
    recommendationReasonEn: String(book.recommendation_reason_en ?? ''),
    recommendationReasonGu: String(book.recommendation_reason_gu ?? ''),
    recommendedForEn: String(book.recommended_for_en ?? ''),
    recommendedForGu: String(book.recommended_for_gu ?? ''),
    licenseLabel: String(book.license_label ?? ''),
    attribution: String(book.attribution ?? ''),
    coverImageUrl: String(book.cover_image_url ?? ''),
    verificationStatus: book.verification_status === 'verified' || book.verification_status === 'unverified' ? book.verification_status : 'needs_review',
    isPublished: book.is_published === true,
    exams: Array.isArray(book.exams) ? book.exams.flatMap((exam): ExamForm[] =>
      isRecord(exam) && (exam.slug === 'gpsc-class-1-2' || exam.slug === 'upsc-cse')
        ? [{ slug: exam.slug, stages: Array.isArray(exam.stages) ? exam.stages.filter((stage): stage is Stage => stage === 'prelims' || stage === 'mains') : [] }]
        : [],
    ) : [],
    subjects: Array.isArray(book.subjects) ? book.subjects.flatMap((subject): SubjectForm[] =>
      isRecord(subject) && typeof subject.slug === 'string'
        ? [{ slug: subject.slug, isPrimary: subject.isPrimary === true }]
        : [],
    ) : [],
    syllabusTopicKeys: Array.isArray(book.syllabusTopicKeys) ? book.syllabusTopicKeys.filter((key): key is string => typeof key === 'string') : [],
    resources: Array.isArray(book.resources) ? book.resources.flatMap((resource): ResourceForm[] =>
      isRecord(resource)
      && (resource.type === 'official' || resource.type === 'purchase' || resource.type === 'cover' || resource.type === 'license' || resource.type === 'permitted_download')
      && (resource.verificationStatus === 'verified' || resource.verificationStatus === 'needs_review' || resource.verificationStatus === 'unverified')
        ? [{ id: typeof resource.id === 'string' ? resource.id : undefined, type: resource.type, label: String(resource.label ?? ''), url: String(resource.url ?? ''), sourceName: String(resource.sourceName ?? ''), verificationStatus: resource.verificationStatus }]
        : [],
    ) : [],
    chapters: Array.isArray(book.chapters) ? book.chapters.flatMap((chapter): ChapterForm[] =>
      isRecord(chapter)
      && typeof chapter.chapterNumber === 'number'
      && typeof chapter.titleEn === 'string'
      && (chapter.verificationStatus === 'verified' || chapter.verificationStatus === 'needs_review' || chapter.verificationStatus === 'unverified')
        ? [{
          chapterNumber: chapter.chapterNumber,
          partLabelEn: String(chapter.partLabelEn ?? ''),
          partLabelGu: String(chapter.partLabelGu ?? ''),
          titleEn: chapter.titleEn,
          titleGu: String(chapter.titleGu ?? ''),
          summaryEn: String(chapter.summaryEn ?? ''),
          summaryGu: String(chapter.summaryGu ?? ''),
          readingTimeMinutes: typeof chapter.readingTimeMinutes === 'number' ? chapter.readingTimeMinutes : null,
          sourceAttribution: String(chapter.sourceAttribution ?? ''),
          sourceUrl: String(chapter.sourceUrl ?? ''),
          verificationStatus: chapter.verificationStatus,
        }]
        : [],
    ) : [],
    archived_at: typeof book.archived_at === 'string' ? book.archived_at : null,
    updated_at: typeof book.updated_at === 'string' ? book.updated_at : '',
    }];
  });
  const options = (items: unknown[]): AdminOption[] => items.flatMap((item) => {
    if (!isRecord(item) || typeof item.id !== 'string' || typeof item.slug !== 'string') return [];
    return [{
      id: item.id,
      slug: item.slug,
      name_en: typeof item.name_en === 'string' ? item.name_en : undefined,
      title_en: typeof item.title_en === 'string' ? item.title_en : undefined,
      external_key: typeof item.external_key === 'string' ? item.external_key : undefined,
    }];
  });
  return {
    books,
    exams: options(value.exams),
    subjects: options(value.subjects),
    topics: options(value.topics),
  };
};

const apiBookFromRow = (book: AdminBook): BookForm => {
  const {
    id: _id,
    archived_at: _archivedAt,
    updated_at: _updatedAt,
    ...form
  } = book;
  void _id;
  void _archivedAt;
  void _updatedAt;
  return form;
};

export default function AdminBooksPage() {
  const configured = isSupabaseConfigured();
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [books, setBooks] = useState<AdminBook[]>([]);
  const [exams, setExams] = useState<AdminOption[]>([]);
  const [subjects, setSubjects] = useState<AdminOption[]>([]);
  const [topics, setTopics] = useState<AdminOption[]>([]);
  const [form, setForm] = useState<BookForm>(blankForm);
  const [topicSearch, setTopicSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadAdminData = useCallback(async (token: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/books', { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error(await apiError(response));
      const data: unknown = await response.json();
      const parsed = parseAdminData(data);
      setBooks(parsed.books);
      setExams(parsed.exams);
      setSubjects(parsed.subjects);
      setTopics(parsed.topics);
      setIsAdmin(true);
    } catch (loadError) {
      setIsAdmin(false);
      setError(loadError instanceof Error ? loadError.message : 'Unable to load administration data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      setError('Supabase is not configured.');
      return;
    }
    const client = getSupabaseClient();
    let active = true;
    const syncSession = (session: { user: { id: string }; access_token: string } | null) => {
      if (!active) return;
      setUserId(session?.user.id ?? null);
      setAccessToken(session?.access_token ?? '');
      if (session?.access_token) void loadAdminData(session.access_token);
      else {
        setIsAdmin(false);
        setBooks([]);
        setLoading(false);
      }
    };
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => syncSession(session));
    void client.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(sessionError.message);
      syncSession(data.session);
    }).catch((sessionError: unknown) => {
      if (active) {
        setError(sessionError instanceof Error ? sessionError.message : 'Unable to check sign-in status.');
        setLoading(false);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [configured, loadAdminData]);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const { error: authError } = await getSupabaseClient().auth.signInWithPassword({ email, password });
      if (authError) throw authError;
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Unable to sign in.');
    }
  };

  const signOut = async () => {
    const { error: signOutError } = await getSupabaseClient().auth.signOut();
    if (signOutError) setError(signOutError.message);
  };

  const updateForm = <K extends keyof BookForm>(key: K, value: BookForm[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const saveBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accessToken) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ book: form }),
      });
      if (!response.ok) throw new Error(await apiError(response));
      setNotice('Catalogue record saved.');
      await loadAdminData(accessToken);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save this book.');
    } finally {
      setSaving(false);
    }
  };

  const archiveBook = async (book: AdminBook) => {
    if (!accessToken || !window.confirm(`Archive "${book.titleEn}"?`)) return;
    setError('');
    try {
      const response = await fetch('/api/admin/books', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: book.id, action: 'archive' }),
      });
      if (!response.ok) throw new Error(await apiError(response));
      setNotice('Book archived.');
      await loadAdminData(accessToken);
    } catch (archiveError) {
      setError(archiveError instanceof Error ? archiveError.message : 'Unable to archive this book.');
    }
  };

  const toggleExam = (slug: ExamSlug, checked: boolean) => {
    const existing = form.exams.find((item) => item.slug === slug);
    if (checked && !existing) updateForm('exams', [...form.exams, { slug, stages: [] }]);
    if (!checked) updateForm('exams', form.exams.filter((item) => item.slug !== slug));
  };

  const toggleSubject = (slug: string, checked: boolean) => {
    if (checked) updateForm('subjects', [...form.subjects, { slug, isPrimary: form.subjects.length === 0 }]);
    else updateForm('subjects', form.subjects.filter((item) => item.slug !== slug));
  };

  const filteredTopics = topics.filter((topic) =>
    `${topic.title_en ?? ''} ${topic.external_key ?? ''}`.toLowerCase().includes(topicSearch.toLowerCase()),
  );

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 py-8 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/" className="text-sm font-bold text-emerald-800 hover:underline">← Study Library</Link>
          <h1 className="mt-2 text-3xl font-black">Study Library Administration</h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-600">Catalogue changes are sent to a server endpoint that verifies your Supabase identity and the library-admin allowlist. No service key is sent to this page.</p>
        </div>
        {userId && <button type="button" onClick={() => void signOut()} className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-bold">Sign out</button>}
      </header>
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}

      {!userId && !loading && (
        <form onSubmit={signIn} className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold">Administrator sign-in</h2>
          <p className="text-sm text-stone-600">Use an account that has been added to <code>public.book_library_admins</code>.</p>
          <Field label="Email" type="email" required value={email} onChange={setEmail} />
          <Field label="Password" type="password" required value={password} onChange={setPassword} />
          <button type="submit" className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white">Sign in</button>
        </form>
      )}

      {loading && <p role="status" className="text-sm text-stone-600">Loading library administration…</p>}
      {userId && !loading && !isAdmin && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">This account is signed in but is not authorized to manage the catalogue. An existing administrator must add the user to the allowlist.</p>}

      {userId && isAdmin && !loading && (
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
          <form onSubmit={saveBook} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{form.slug ? `Edit: ${form.slug}` : 'Add a book edition'}</h2>
              <button type="button" onClick={() => setForm(blankForm())} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-bold"><Plus className="h-4 w-4" /> New book</button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Stable slug" required value={form.slug} onChange={(value) => updateForm('slug', value)} disabled={books.some((book) => book.slug === form.slug)} />
              <Field label="Title (English)" required value={form.titleEn} onChange={(value) => updateForm('titleEn', value)} />
              <Field label="Title (Gujarati)" value={form.titleGu} onChange={(value) => updateForm('titleGu', value)} />
              <Field label="Author (English)" value={form.authorEn} onChange={(value) => updateForm('authorEn', value)} />
              <Field label="Author (Gujarati)" value={form.authorGu} onChange={(value) => updateForm('authorGu', value)} />
              <Field label="Publisher (English)" value={form.publisherEn} onChange={(value) => updateForm('publisherEn', value)} />
              <Field label="Publisher (Gujarati)" value={form.publisherGu} onChange={(value) => updateForm('publisherGu', value)} />
              <Field label="Edition" value={form.edition} onChange={(value) => updateForm('edition', value)} />
              <Field label="ISBN (verify before publishing)" value={form.isbn} onChange={(value) => updateForm('isbn', value)} />
              <SelectField label="Language" value={form.language} onChange={(value) => updateForm('language', value as BookForm['language'])} options={['en', 'gu', 'hi', 'bilingual']} />
              <SelectField label="Difficulty" value={form.difficulty} onChange={(value) => updateForm('difficulty', value as BookForm['difficulty'])} options={['', 'beginner', 'intermediate', 'advanced']} />
              <SelectField label="Recommendation category" value={form.recommendationCategory} onChange={(value) => updateForm('recommendationCategory', value as BookForm['recommendationCategory'])} options={['', 'essential', 'recommended', 'supplementary', 'reference']} />
              <SelectField label="Book type" value={form.bookType} onChange={(value) => updateForm('bookType', value as BookForm['bookType'])} options={['', 'textbook', 'reference', 'report', 'primary_source', 'study_guide', 'other']} />
              <SelectField label="Verification status" value={form.verificationStatus} onChange={(value) => updateForm('verificationStatus', value as VerificationStatus)} options={['needs_review', 'unverified', 'verified']} />
              <Field label="Cover image URL" type="url" value={form.coverImageUrl} onChange={(value) => updateForm('coverImageUrl', value)} />
              <Field label="Rights label (do not assume)" value={form.licenseLabel} onChange={(value) => updateForm('licenseLabel', value)} />
              <Field label="Attribution" value={form.attribution} onChange={(value) => updateForm('attribution', value)} />
              <Field label="Recommended for (English)" value={form.recommendedForEn} onChange={(value) => updateForm('recommendedForEn', value)} />
              <Field label="Recommended for (Gujarati)" value={form.recommendedForGu} onChange={(value) => updateForm('recommendedForGu', value)} />
            </div>

            <TextArea label="Description (English)" value={form.descriptionEn} onChange={(value) => updateForm('descriptionEn', value)} />
            <TextArea label="Description (Gujarati)" value={form.descriptionGu} onChange={(value) => updateForm('descriptionGu', value)} />
            <TextArea label="Examination relevance (English)" value={form.examinationRelevanceEn} onChange={(value) => updateForm('examinationRelevanceEn', value)} />
            <TextArea label="Examination relevance (Gujarati)" value={form.examinationRelevanceGu} onChange={(value) => updateForm('examinationRelevanceGu', value)} />
            <TextArea label="Learning outcomes (English)" value={form.learningOutcomesEn} onChange={(value) => updateForm('learningOutcomesEn', value)} />
            <TextArea label="Learning outcomes (Gujarati)" value={form.learningOutcomesGu} onChange={(value) => updateForm('learningOutcomesGu', value)} />
            <TextArea label="Recommendation reason (English)" value={form.recommendationReasonEn} onChange={(value) => updateForm('recommendationReasonEn', value)} />
            <TextArea label="Recommendation reason (Gujarati)" value={form.recommendationReasonGu} onChange={(value) => updateForm('recommendationReasonGu', value)} />

            <fieldset className="space-y-2">
              <legend className="text-sm font-bold">Exams and stages</legend>
              {exams.filter((item) => item.slug === 'gpsc-class-1-2' || item.slug === 'upsc-cse').map((item) => {
                const slug = item.slug as ExamSlug;
                const current = form.exams.find((item) => item.slug === slug);
                return (
                  <div key={slug} className="flex flex-wrap items-center gap-3 rounded-lg bg-stone-50 p-3">
                    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={Boolean(current)} onChange={(event) => toggleExam(slug, event.target.checked)} />{item.name_en || (slug === 'gpsc-class-1-2' ? 'GPSC Class 1 and 2' : 'UPSC CSE')}</label>
                    {current && (['prelims', 'mains'] as const).map((stage) => (
                      <label key={stage} className="flex items-center gap-1 text-xs"><input type="checkbox" checked={current.stages.includes(stage)} onChange={(event) => updateForm('exams', form.exams.map((item) => item.slug === slug ? { ...item, stages: event.target.checked ? [...item.stages, stage] : item.stages.filter((value) => value !== stage) } : item))} />{stage}</label>
                    ))}
                  </div>
                );
              })}
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="text-sm font-bold">Subjects</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {subjects.map((item) => {
                  const current = form.subjects.find((subject) => subject.slug === item.slug);
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={Boolean(current)} onChange={(event) => toggleSubject(item.slug, event.target.checked)} />
                      <span>{item.name_en || item.slug}</span>
                      {current && <label className="ml-auto flex items-center gap-1 text-xs"><input type="radio" name="primary-subject" checked={current.isPrimary} onChange={() => updateForm('subjects', form.subjects.map((subject) => ({ ...subject, isPrimary: subject.slug === item.slug })))} />Primary</label>}
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <label className="block space-y-2 text-sm font-semibold">Syllabus topic mappings ({form.syllabusTopicKeys.length} selected)
              <input type="search" value={topicSearch} onChange={(event) => setTopicSearch(event.target.value)} placeholder="Search topics" className="w-full rounded-lg border border-stone-300 px-3 py-2" />
              <select multiple size={8} value={form.syllabusTopicKeys} onChange={(event) => {
                const visible = new Set(filteredTopics.map((topic) => topic.external_key).filter((key): key is string => Boolean(key)));
                const hidden = form.syllabusTopicKeys.filter((key) => !visible.has(key));
                const selected = Array.from(event.target.selectedOptions, (option) => option.value);
                updateForm('syllabusTopicKeys', [...hidden, ...selected]);
              }} className="w-full rounded-lg border border-stone-300 bg-white p-2 text-xs">
                {filteredTopics.filter((topic) => topic.external_key).map((topic) => <option key={topic.id} value={topic.external_key}>{topic.title_en} · {topic.external_key}</option>)}
              </select>
            </label>

            <section className="space-y-3 border-t border-stone-200 pt-4">
              <div className="flex items-center justify-between"><h3 className="font-bold">Legitimate resources</h3><button type="button" onClick={() => updateForm('resources', [...form.resources, { type: 'official', label: '', url: '', sourceName: '', verificationStatus: 'needs_review' }])} className="text-sm font-bold text-emerald-800">Add link</button></div>
              {form.resources.map((resource, index) => (
                <div key={`${resource.type}-${index}`} className="grid gap-2 rounded-xl bg-stone-50 p-3 sm:grid-cols-2">
                  <SelectField label="Link type" value={resource.type} onChange={(value) => updateForm('resources', form.resources.map((item, position) => position === index ? { ...item, type: value as ResourceType } : item))} options={['official', 'purchase', 'cover', 'license', 'permitted_download']} />
                  <SelectField label="Verification" value={resource.verificationStatus} onChange={(value) => updateForm('resources', form.resources.map((item, position) => position === index ? { ...item, verificationStatus: value as VerificationStatus } : item))} options={['needs_review', 'unverified', 'verified']} />
                  <Field label="Link label" value={resource.label} onChange={(value) => updateForm('resources', form.resources.map((item, position) => position === index ? { ...item, label: value } : item))} />
                  <Field label="Source name" value={resource.sourceName} onChange={(value) => updateForm('resources', form.resources.map((item, position) => position === index ? { ...item, sourceName: value } : item))} />
                  <Field label="URL (HTTP/S)" type="url" value={resource.url} onChange={(value) => updateForm('resources', form.resources.map((item, position) => position === index ? { ...item, url: value } : item))} />
                  <button type="button" onClick={() => updateForm('resources', form.resources.filter((_, position) => position !== index))} className="self-end justify-self-start text-xs font-bold text-rose-800">Remove link</button>
                </div>
              ))}
            </section>

            <section className="space-y-3 border-t border-stone-200 pt-4">
              <div className="flex items-center justify-between"><h3 className="font-bold">Verified chapter catalogue</h3><button type="button" onClick={() => updateForm('chapters', [...form.chapters, { chapterNumber: form.chapters.length + 1, partLabelEn: '', partLabelGu: '', titleEn: '', titleGu: '', summaryEn: '', summaryGu: '', readingTimeMinutes: null, sourceAttribution: '', sourceUrl: '', verificationStatus: 'needs_review' }])} className="text-sm font-bold text-emerald-800">Add chapter</button></div>
              {form.chapters.map((chapter, index) => (
                <div key={`${chapter.chapterNumber}-${index}`} className="grid gap-2 rounded-xl bg-stone-50 p-3 sm:grid-cols-2">
                  <Field label="Chapter number" type="number" value={String(chapter.chapterNumber)} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, chapterNumber: Number(value) } : item))} />
                  <SelectField label="Verification" value={chapter.verificationStatus} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, verificationStatus: value as VerificationStatus } : item))} options={['needs_review', 'unverified', 'verified']} />
                  <Field label="Title (English)" required value={chapter.titleEn} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, titleEn: value } : item))} />
                  <Field label="Title (Gujarati)" value={chapter.titleGu} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, titleGu: value } : item))} />
                  <Field label="Source URL" type="url" value={chapter.sourceUrl} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, sourceUrl: value } : item))} />
                  <Field label="Source attribution" value={chapter.sourceAttribution} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, sourceAttribution: value } : item))} />
                  <TextArea label="Summary (English)" value={chapter.summaryEn} onChange={(value) => updateForm('chapters', form.chapters.map((item, position) => position === index ? { ...item, summaryEn: value } : item))} />
                  <button type="button" onClick={() => updateForm('chapters', form.chapters.filter((_, position) => position !== index))} className="inline-flex items-center gap-1 justify-self-start text-xs font-bold text-rose-800"><Trash2 className="h-3.5 w-3.5" /> Remove chapter from this edit</button>
                </div>
              ))}
              <p className="text-xs text-stone-500">Saved chapter rows are updated by edition and chapter number. Existing progress records are never deleted by this form.</p>
            </section>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.isPublished} onChange={(event) => updateForm('isPublished', event.target.checked)} />Publish in public catalogue</label>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Saving…' : 'Save catalogue record'}</button>
            </div>
          </form>

          <aside className="space-y-3 xl:sticky xl:top-4">
            <h2 className="text-xl font-bold">Catalogue records ({books.length})</h2>
            <div className="max-h-[80vh] space-y-2 overflow-auto">
              {books.map((book) => (
                <article key={book.id} className="rounded-xl border border-stone-200 bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <button type="button" onClick={() => setForm(apiBookFromRow(book))} className="text-left">
                      <span className="block font-bold text-stone-900">{book.titleEn}</span>
                      <span className="mt-1 block text-xs text-stone-500">{book.slug} · {book.verificationStatus} · {book.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                    {book.isPublished && <button type="button" onClick={() => void archiveBook(book)} aria-label={`Archive ${book.titleEn}`} className="rounded-lg p-2 text-rose-800 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>}
                  </div>
                </article>
              ))}
              {!books.length && <p className="rounded-xl border border-dashed p-4 text-sm text-stone-600">No catalogue entries are available.</p>}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

const Field = ({ label, value, onChange, type = 'text', required = false, disabled = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <label className="block space-y-1 text-xs font-semibold text-stone-700">
    {label}
    <input type={type} required={required} disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm disabled:bg-stone-100" />
  </label>
);

const TextArea = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <label className="block space-y-1 text-xs font-semibold text-stone-700">
    {label}
    <textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
  </label>
);

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) => (
  <label className="block space-y-1 text-xs font-semibold text-stone-700">
    {label}
    <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm">
      {options.map((option) => <option key={option} value={option}>{option ? option.replaceAll('_', ' ') : 'Not specified'}</option>)}
    </select>
  </label>
);
