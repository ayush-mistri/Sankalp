import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/database';

type AdminClient = ReturnType<typeof createClient<Database>>;
type VerificationStatus = 'unverified' | 'needs_review' | 'verified';
type ResourceType = 'official' | 'purchase' | 'cover' | 'license' | 'permitted_download';

interface AdminResourceInput {
  id?: string;
  type: ResourceType;
  label: string;
  url: string;
  sourceName: string;
  verificationStatus: VerificationStatus;
}

interface AdminChapterInput {
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

interface AdminBookInput {
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
  difficulty: 'beginner' | 'intermediate' | 'advanced' | '';
  recommendationCategory: 'essential' | 'recommended' | 'supplementary' | 'reference' | '';
  bookType: 'textbook' | 'reference' | 'report' | 'primary_source' | 'study_guide' | 'other' | '';
  recommendationReasonEn: string;
  recommendationReasonGu: string;
  recommendedForEn: string;
  recommendedForGu: string;
  licenseLabel: string;
  attribution: string;
  coverImageUrl: string;
  verificationStatus: VerificationStatus;
  isPublished: boolean;
  exams: Array<{ slug: 'gpsc-class-1-2' | 'upsc-cse'; stages: Array<'prelims' | 'mains'> }>;
  subjects: Array<{ slug: string; isPrimary: boolean }>;
  syllabusTopicKeys: string[];
  resources: AdminResourceInput[];
  chapters: AdminChapterInput[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown, field: string, maxLength: number): string => {
  if (typeof value !== 'string' || value.length > maxLength) {
    throw new Error(`${field} must be a string no longer than ${maxLength} characters.`);
  }
  return value.trim();
};

const asOptionalText = (value: unknown, field: string, maxLength = 10000) =>
  value === undefined || value === null ? '' : asString(value, field, maxLength);

const asEnum = <T extends string>(value: unknown, field: string, allowed: readonly T[], optional = false): T | '' => {
  if (optional && (value === '' || value === null || value === undefined)) return '';
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new Error(`${field} has an unsupported value.`);
  }
  return value as T;
};

const asArray = (value: unknown, field: string, maxLength: number): unknown[] => {
  if (!Array.isArray(value) || value.length > maxLength) {
    throw new Error(`${field} must be an array with no more than ${maxLength} entries.`);
  }
  return value;
};

const requireUnique = (values: string[], field: string) => {
  if (new Set(values).size !== values.length) throw new Error(`${field} entries must be unique.`);
};

const safeUrl = (value: string, field: string, optional = false) => {
  if (!value && optional) return '';
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString();
  } catch {
    // The validation response below gives the field-specific error.
  }
  throw new Error(`${field} must be an HTTP or HTTPS URL.`);
};

const parseBookInput = (value: unknown): AdminBookInput => {
  if (!isRecord(value)) throw new Error('Book data is required.');
  const slug = asString(value.slug, 'Slug', 120);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Slug must use lowercase letters, numbers, and hyphens.');
  }
  const exams = asArray(value.exams, 'Exams', 2).map((item) => {
    if (!isRecord(item)) throw new Error('Exam mapping is invalid.');
    return {
      slug: asEnum(item.slug, 'Exam', ['gpsc-class-1-2', 'upsc-cse'] as const) as 'gpsc-class-1-2' | 'upsc-cse',
      stages: asArray(item.stages, 'Exam stages', 2).map((stage) =>
        asEnum(stage, 'Exam stage', ['prelims', 'mains'] as const) as 'prelims' | 'mains',
      ),
    };
  });
  requireUnique(exams.map((exam) => exam.slug), 'Exam');
  exams.forEach((exam) => requireUnique(exam.stages, 'Exam stage'));
  const subjects = asArray(value.subjects, 'Subjects', 12).map((item) => {
    if (!isRecord(item)) throw new Error('Subject mapping is invalid.');
    return {
      slug: asString(item.slug, 'Subject slug', 100),
      isPrimary: item.isPrimary === true,
    };
  });
  requireUnique(subjects.map((subject) => subject.slug), 'Subject');
  const syllabusTopicKeys = asArray(value.syllabusTopicKeys, 'Syllabus topics', 100)
    .map((key) => asString(key, 'Syllabus topic key', 200));
  requireUnique(syllabusTopicKeys, 'Syllabus topic');
  const resources = asArray(value.resources, 'Resources', 30).map((item) => {
    if (!isRecord(item)) throw new Error('Resource information is invalid.');
    const url = safeUrl(asString(item.url, 'Resource URL', 2048), 'Resource URL');
    const label = asString(item.label, 'Resource label', 200);
    if (!label) throw new Error('Resource label is required.');
    const resourceId = item.id === undefined || item.id === null || item.id === ''
      ? undefined
      : asString(item.id, 'Resource ID', 36);
    if (resourceId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(resourceId)) {
      throw new Error('Resource ID is invalid.');
    }
    return {
      id: resourceId,
      type: asEnum(item.type, 'Resource type', ['official', 'purchase', 'cover', 'license', 'permitted_download'] as const) as ResourceType,
      label,
      url,
      sourceName: asOptionalText(item.sourceName, 'Resource source', 200),
      verificationStatus: asEnum(item.verificationStatus, 'Resource verification', ['unverified', 'needs_review', 'verified'] as const) as VerificationStatus,
    };
  });
  requireUnique(resources.map((resource) => `${resource.type}:${resource.url}`), 'Resource URL');
  const chapters = asArray(value.chapters, 'Chapters', 250).map((item) => {
    if (!isRecord(item)) throw new Error('Chapter information is invalid.');
    const chapterNumber = item.chapterNumber;
    const readingTimeMinutes = item.readingTimeMinutes;
    if (!Number.isInteger(chapterNumber) || (chapterNumber as number) < 1) {
      throw new Error('Chapter number must be a positive whole number.');
    }
    const titleEn = asString(item.titleEn, 'English chapter title', 300);
    if (!titleEn) throw new Error('English chapter title is required.');
    if (readingTimeMinutes !== null && readingTimeMinutes !== undefined
      && (!Number.isInteger(readingTimeMinutes) || (readingTimeMinutes as number) < 1)) {
      throw new Error('Chapter reading time must be a positive whole number or empty.');
    }
    const sourceUrl = asOptionalText(item.sourceUrl, 'Chapter source URL', 2048);
    return {
      chapterNumber: chapterNumber as number,
      partLabelEn: asOptionalText(item.partLabelEn, 'English part label', 300),
      partLabelGu: asOptionalText(item.partLabelGu, 'Gujarati part label', 300),
      titleEn,
      titleGu: asOptionalText(item.titleGu, 'Gujarati chapter title', 300),
      summaryEn: asOptionalText(item.summaryEn, 'English chapter summary'),
      summaryGu: asOptionalText(item.summaryGu, 'Gujarati chapter summary'),
      readingTimeMinutes: readingTimeMinutes === null || readingTimeMinutes === undefined
        ? null
        : readingTimeMinutes as number,
      sourceAttribution: asOptionalText(item.sourceAttribution, 'Chapter attribution', 2000),
      sourceUrl: sourceUrl ? safeUrl(sourceUrl, 'Chapter source URL') : '',
      verificationStatus: asEnum(item.verificationStatus, 'Chapter verification', ['unverified', 'needs_review', 'verified'] as const) as VerificationStatus,
    };
  });
  requireUnique(chapters.map((chapter) => String(chapter.chapterNumber)), 'Chapter number');
  const titleEn = asString(value.titleEn, 'English title', 300);
  if (!titleEn) throw new Error('English title is required.');
  if (typeof value.isPublished !== 'boolean') throw new Error('Publish status must be a boolean.');

  return {
    slug,
    titleEn,
    titleGu: asOptionalText(value.titleGu, 'Gujarati title', 300),
    authorEn: asOptionalText(value.authorEn, 'English author', 300),
    authorGu: asOptionalText(value.authorGu, 'Gujarati author', 300),
    publisherEn: asOptionalText(value.publisherEn, 'English publisher', 300),
    publisherGu: asOptionalText(value.publisherGu, 'Gujarati publisher', 300),
    edition: asOptionalText(value.edition, 'Edition', 200),
    isbn: asOptionalText(value.isbn, 'ISBN', 40),
    language: asEnum(value.language, 'Language', ['en', 'gu', 'hi', 'bilingual'] as const) as AdminBookInput['language'],
    descriptionEn: asOptionalText(value.descriptionEn, 'English description'),
    descriptionGu: asOptionalText(value.descriptionGu, 'Gujarati description'),
    examinationRelevanceEn: asOptionalText(value.examinationRelevanceEn, 'English exam relevance'),
    examinationRelevanceGu: asOptionalText(value.examinationRelevanceGu, 'Gujarati exam relevance'),
    learningOutcomesEn: asOptionalText(value.learningOutcomesEn, 'English learning outcomes'),
    learningOutcomesGu: asOptionalText(value.learningOutcomesGu, 'Gujarati learning outcomes'),
    difficulty: asEnum(value.difficulty, 'Difficulty', ['beginner', 'intermediate', 'advanced'] as const, true),
    recommendationCategory: asEnum(value.recommendationCategory, 'Recommendation category', ['essential', 'recommended', 'supplementary', 'reference'] as const, true),
    bookType: asEnum(value.bookType, 'Book type', ['textbook', 'reference', 'report', 'primary_source', 'study_guide', 'other'] as const, true),
    recommendationReasonEn: asOptionalText(value.recommendationReasonEn, 'English recommendation reason'),
    recommendationReasonGu: asOptionalText(value.recommendationReasonGu, 'Gujarati recommendation reason'),
    recommendedForEn: asOptionalText(value.recommendedForEn, 'English recommended stage', 1000),
    recommendedForGu: asOptionalText(value.recommendedForGu, 'Gujarati recommended stage', 1000),
    licenseLabel: asOptionalText(value.licenseLabel, 'Rights label', 300),
    attribution: asOptionalText(value.attribution, 'Attribution', 2000),
    coverImageUrl: safeUrl(asOptionalText(value.coverImageUrl, 'Cover image URL', 2048), 'Cover image URL', true),
    verificationStatus: asEnum(value.verificationStatus, 'Book verification', ['unverified', 'needs_review', 'verified'] as const) as VerificationStatus,
    isPublished: value.isPublished,
    exams,
    subjects,
    syllabusTopicKeys,
    resources,
    chapters,
  };
};

const getAdminClient = async (request: Request): Promise<{ client: AdminClient } | { response: NextResponse }> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceRoleKey) {
    return { response: NextResponse.json({ error: 'Supabase server configuration is incomplete.' }, { status: 503 }) };
  }
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return { response: NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) };

  const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user) return { response: NextResponse.json({ error: 'Authentication failed.' }, { status: 401 }) };

  const client = createClient<Database>(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: admin, error: adminError } = await client.from('book_library_admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();
  if (adminError) return { response: NextResponse.json({ error: 'Unable to verify administrator access.' }, { status: 500 }) };
  if (!admin) return { response: NextResponse.json({ error: 'Administrator access is required.' }, { status: 403 }) };
  return { client };
};

export async function GET(request: Request) {
  const auth = await getAdminClient(request);
  if ('response' in auth) return auth.response;
  const { data: books, error: booksError } = await auth.client.from('books')
    .select('*')
    .order('updated_at', { ascending: false });
  if (booksError) return NextResponse.json({ error: booksError.message }, { status: 500 });
  const [exams, subjects, topics, bookExams, bookSubjects, bookTopics, resources, chapters] = await Promise.all([
    auth.client.from('exams').select('id,slug,name_en,name_gu'),
    auth.client.from('subjects').select('id,slug,name_en,name_gu'),
    auth.client.from('syllabus_topics').select('id,external_key,title_en,title_gu,exam_id,stage'),
    auth.client.from('book_exams').select('book_id,exam_id,recommended_stages,verification_status'),
    auth.client.from('book_subjects').select('book_id,subject_id,is_primary,verification_status'),
    auth.client.from('book_syllabus_topics').select('book_id,syllabus_topic_id,verification_status'),
    auth.client.from('book_resources').select('*'),
    auth.client.from('book_chapters').select('*').is('archived_at', null),
  ]);
  const lookupError = exams.error || subjects.error || topics.error || bookExams.error
    || bookSubjects.error || bookTopics.error || resources.error || chapters.error;
  if (lookupError) return NextResponse.json({ error: lookupError.message }, { status: 500 });
  return NextResponse.json({
    books: books.map((book) => ({
      ...book,
      exams: bookExams.data.filter((link) => link.book_id === book.id).map((link) => ({
        slug: exams.data.find((item) => item.id === link.exam_id)?.slug,
        stages: link.recommended_stages,
        verificationStatus: link.verification_status,
      })),
      subjects: bookSubjects.data.filter((link) => link.book_id === book.id).map((link) => ({
        slug: subjects.data.find((item) => item.id === link.subject_id)?.slug,
        isPrimary: link.is_primary,
        verificationStatus: link.verification_status,
      })),
      syllabusTopicKeys: bookTopics.data.filter((link) => link.book_id === book.id)
        .map((link) => topics.data.find((item) => item.id === link.syllabus_topic_id)?.external_key)
        .filter((key): key is string => Boolean(key)),
      resources: resources.data.filter((resource) => resource.book_id === book.id).map((resource) => ({
        id: resource.id,
        type: resource.resource_type,
        label: resource.label,
        url: resource.url,
        sourceName: resource.source_name ?? '',
        verificationStatus: resource.verification_status,
      })),
      chapters: chapters.data.filter((chapter) => chapter.book_id === book.id).map((chapter) => ({
        chapterNumber: chapter.chapter_number,
        partLabelEn: chapter.part_label_en ?? '',
        partLabelGu: chapter.part_label_gu ?? '',
        titleEn: chapter.title_en,
        titleGu: chapter.title_gu,
        summaryEn: chapter.summary_en,
        summaryGu: chapter.summary_gu,
        readingTimeMinutes: chapter.reading_time_minutes,
        sourceAttribution: chapter.source_attribution ?? '',
        sourceUrl: chapter.source_url ?? '',
        verificationStatus: chapter.verification_status,
      })),
    })),
    exams: exams.data,
    subjects: subjects.data,
    topics: topics.data,
  });
}

export async function POST(request: Request) {
  const auth = await getAdminClient(request);
  if ('response' in auth) return auth.response;
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 150_000) return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });

  let input: AdminBookInput;
  try {
    const body: unknown = await request.json();
    input = parseBookInput(isRecord(body) ? body.book : undefined);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request body.' }, { status: 400 });
  }

  const client = auth.client;
  const [examRows, subjectRows, topicRows] = await Promise.all([
    client.from('exams').select('id,slug').in('slug', input.exams.map((exam) => exam.slug)),
    client.from('subjects').select('id,slug').in('slug', input.subjects.map((subject) => subject.slug)),
    client.from('syllabus_topics').select('id,external_key').in('external_key', input.syllabusTopicKeys),
  ]);
  const mappingError = examRows.error || subjectRows.error || topicRows.error;
  if (mappingError) return NextResponse.json({ error: mappingError.message }, { status: 500 });
  if (examRows.data.length !== input.exams.length
    || subjectRows.data.length !== input.subjects.length
    || topicRows.data.length !== input.syllabusTopicKeys.length) {
    return NextResponse.json({ error: 'One or more exam, subject, or syllabus topic keys do not exist.' }, { status: 400 });
  }

  const { data: book, error: bookError } = await client.from('books').upsert({
    slug: input.slug,
    title_en: input.titleEn,
    title_gu: input.titleGu,
    author_en: input.authorEn,
    author_gu: input.authorGu,
    publisher_en: input.publisherEn || null,
    publisher_gu: input.publisherGu || null,
    edition: input.edition || null,
    isbn: input.isbn || null,
    language: input.language,
    license_label: input.licenseLabel || null,
    attribution: input.attribution || null,
    cover_image_url: input.coverImageUrl || null,
    description_en: input.descriptionEn,
    description_gu: input.descriptionGu,
    examination_relevance_en: input.examinationRelevanceEn,
    examination_relevance_gu: input.examinationRelevanceGu,
    learning_outcomes_en: input.learningOutcomesEn,
    learning_outcomes_gu: input.learningOutcomesGu,
    difficulty: input.difficulty || null,
    recommendation_category: input.recommendationCategory || null,
    book_type: input.bookType || null,
    recommendation_reason_en: input.recommendationReasonEn,
    recommendation_reason_gu: input.recommendationReasonGu,
    recommended_for_en: input.recommendedForEn,
    recommended_for_gu: input.recommendedForGu,
    verification_status: input.verificationStatus,
    metadata_source: 'manual',
    is_published: input.isPublished,
    archived_at: null,
  }, { onConflict: 'slug' }).select('id').single();
  if (bookError) return NextResponse.json({ error: bookError.message }, { status: 500 });

  const replacements = await Promise.all([
    client.from('book_exams').delete().eq('book_id', book.id),
    client.from('book_subjects').delete().eq('book_id', book.id),
    client.from('book_syllabus_topics').delete().eq('book_id', book.id),
  ]);
  const replacementError = replacements.find((result) => result.error)?.error;
  if (replacementError) return NextResponse.json({ error: replacementError.message }, { status: 500 });

  const examLinks = input.exams.map((exam) => ({
    book_id: book.id,
    exam_id: examRows.data.find((row) => row.slug === exam.slug)!.id,
    recommended_stages: exam.stages,
    verification_status: input.verificationStatus,
  }));
  const subjectLinks = input.subjects.map((subject) => ({
    book_id: book.id,
    subject_id: subjectRows.data.find((row) => row.slug === subject.slug)!.id,
    is_primary: subject.isPrimary,
    verification_status: input.verificationStatus,
  }));
  const topicLinks = input.syllabusTopicKeys.map((key) => ({
    book_id: book.id,
    syllabus_topic_id: topicRows.data.find((row) => row.external_key === key)!.id,
    verification_status: input.verificationStatus,
  }));
  const linkResults = await Promise.all([
    examLinks.length ? client.from('book_exams').insert(examLinks) : Promise.resolve({ error: null }),
    subjectLinks.length ? client.from('book_subjects').insert(subjectLinks) : Promise.resolve({ error: null }),
    topicLinks.length ? client.from('book_syllabus_topics').insert(topicLinks) : Promise.resolve({ error: null }),
  ]);
  const linkError = linkResults.find((result) => result.error)?.error;
  if (linkError) return NextResponse.json({ error: linkError.message }, { status: 500 });

  const resourceRows = input.resources.map((resource) => ({
    id: resource.id,
    book_id: book.id,
    resource_type: resource.type,
    label: resource.label,
    url: resource.url,
    source_name: resource.sourceName || null,
    verification_status: resource.verificationStatus,
    verified_at: resource.verificationStatus === 'verified' ? new Date().toISOString() : null,
  }));
  const savedResourceIds: string[] = [];
  for (const resource of resourceRows) {
    const { id: resourceId, ...resourceData } = resource;
    const result = resourceId
      ? await client.from('book_resources')
        .update(resourceData)
        .eq('id', resourceId)
        .eq('book_id', book.id)
        .select('id')
        .single()
      : await client.from('book_resources')
        .insert(resourceData)
        .select('id')
        .single();
    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
    savedResourceIds.push(result.data.id);
  }
  let removeResources = client.from('book_resources').delete().eq('book_id', book.id);
  if (savedResourceIds.length) removeResources = removeResources.not('id', 'in', `(${savedResourceIds.join(',')})`);
  const { error: removeResourceError } = await removeResources;
  if (removeResourceError) return NextResponse.json({ error: removeResourceError.message }, { status: 500 });
  const chapterRows = input.chapters.map((chapter) => ({
    book_id: book.id,
    chapter_number: chapter.chapterNumber,
    part_label_en: chapter.partLabelEn || null,
    part_label_gu: chapter.partLabelGu || null,
    title_en: chapter.titleEn,
    title_gu: chapter.titleGu,
    summary_en: chapter.summaryEn,
    summary_gu: chapter.summaryGu,
    reading_time_minutes: chapter.readingTimeMinutes,
    source_attribution: chapter.sourceAttribution || null,
    source_url: chapter.sourceUrl || null,
    verification_status: chapter.verificationStatus,
    archived_at: null,
  }));
  if (chapterRows.length) {
    const { error: chapterError } = await client.from('book_chapters')
      .upsert(chapterRows, { onConflict: 'book_id,chapter_number' });
    if (chapterError) return NextResponse.json({ error: chapterError.message }, { status: 500 });
  }
  const activeNumbers = chapterRows.map((chapter) => chapter.chapter_number);
  let archiveQuery = client.from('book_chapters')
    .update({ archived_at: new Date().toISOString() })
    .eq('book_id', book.id)
    .is('archived_at', null);
  if (activeNumbers.length) {
    archiveQuery = archiveQuery.not('chapter_number', 'in', `(${activeNumbers.join(',')})`);
  }
  const { error: archiveError } = await archiveQuery;
  if (archiveError) return NextResponse.json({ error: archiveError.message }, { status: 500 });
  return NextResponse.json({ id: book.id, slug: input.slug });
}

export async function PATCH(request: Request) {
  const auth = await getAdminClient(request);
  if ('response' in auth) return auth.response;
  try {
    const body: unknown = await request.json();
    if (!isRecord(body) || typeof body.id !== 'string' || body.action !== 'archive') {
      return NextResponse.json({ error: 'A book ID and archive action are required.' }, { status: 400 });
    }
    const { error } = await auth.client.from('books')
      .update({ is_published: false, archived_at: new Date().toISOString() })
      .eq('id', body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request body.' }, { status: 400 });
  }
}
