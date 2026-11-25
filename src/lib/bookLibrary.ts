import { getChaptersForBook } from '@/data/bookChaptersData';
import { getSupabaseClient } from '@/lib/supabaseClient';
import type { Database, Json } from '@/types/database';
import type {
  BookCatalogItem,
  BookDifficulty,
  BookExamId,
  DigitalBookResource,
  ResourceLanguage,
  ResourceSubject,
} from '@/types/books';

type CatalogRow = Database['public']['Views']['book_catalog_public']['Row'];

export interface BookCatalogFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  exam?: string;
  stage?: 'prelims' | 'mains';
  subject?: string;
  language?: ResourceLanguage;
  difficulty?: BookDifficulty;
  recommendationCategory?: string;
  bookType?: string;
  sortBy?: 'title' | 'author' | 'difficulty';
}

export interface BookCatalogPage {
  items: BookCatalogItem[];
  total: number;
  page: number;
  pageSize: number;
}

const subjects: ResourceSubject[] = [
  'all',
  'history',
  'heritage',
  'polity',
  'economy',
  'geography',
  'science_tech',
  'ethics_admin',
  'current_affairs',
];
const languages: ResourceLanguage[] = ['gu', 'en', 'bilingual', 'hi'];
const difficulties: BookDifficulty[] = ['beginner', 'intermediate', 'advanced'];

const isRecord = (value: Json): value is { [key: string]: Json | undefined } =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const stringField = (
  value: { [key: string]: Json | undefined },
  field: string,
  bookId: string,
): string => {
  const fieldValue = value[field];
  if (typeof fieldValue !== 'string') {
    throw new Error(`Book "${bookId}" has invalid ${field} metadata.`);
  }
  return fieldValue;
};

const nullableStringField = (
  value: { [key: string]: Json | undefined },
  field: string,
): string | null => {
  const fieldValue = value[field];
  if (fieldValue === null || fieldValue === undefined) return null;
  if (typeof fieldValue !== 'string') throw new Error(`Invalid ${field} metadata.`);
  return fieldValue;
};

const jsonRows = (value: Json, field: string, bookId: string) => {
  if (!Array.isArray(value)) {
    throw new Error(`Book "${bookId}" has invalid ${field} metadata.`);
  }
  return value.map((item) => {
    if (!isRecord(item)) throw new Error(`Book "${bookId}" has invalid ${field} metadata.`);
    return item;
  });
};

const requireExternalUrl = (value: string, field: string, id: string): string => {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return value;
  } catch {
    // Surface invalid catalogue links below.
  }
  throw new Error(`Book "${id}" has an invalid ${field} URL.`);
};

const optionalExternalUrl = (value: string | null, field: string, id: string) =>
  value ? requireExternalUrl(value, field, id) : undefined;

export const mapBookCatalogRow = (row: CatalogRow): BookCatalogItem => {
  const id = row.id;
  const resources = jsonRows(row.resources, 'resource', id).map((resource) => {
    const url = requireExternalUrl(stringField(resource, 'url', id), 'resource', id);
    const resourceVerificationStatus = (
      ['unverified', 'needs_review', 'verified'] as const
    ).find((status) => status === resource.verification_status);
    if (!resourceVerificationStatus) {
      throw new Error(`Book "${id}" has an unsupported resource verification status.`);
    }
    return {
      id: stringField(resource, 'id', id),
      type: stringField(resource, 'resource_type', id),
      label: stringField(resource, 'label', id),
      url,
      verificationStatus: resourceVerificationStatus,
      verifiedAt: nullableStringField(resource, 'verified_at'),
      sourceName: nullableStringField(resource, 'source_name'),
    };
  });
  const subjectsList = jsonRows(row.subjects, 'subject', id).map((subject) => ({
    id: stringField(subject, 'id', id),
    slug: stringField(subject, 'slug', id),
    nameEn: stringField(subject, 'name_en', id),
    nameGu: stringField(subject, 'name_gu', id),
    verified: stringField(subject, 'verification_status', id) === 'verified',
  }));
  const examsList = jsonRows(row.exams, 'exam', id).map((exam) => ({
    id: stringField(exam, 'id', id),
    slug: stringField(exam, 'slug', id),
    nameEn: stringField(exam, 'name_en', id),
    nameGu: stringField(exam, 'name_gu', id),
    stages: Array.isArray(exam.recommended_stages)
      ? exam.recommended_stages.filter((stage): stage is string => typeof stage === 'string')
      : [],
    verified: stringField(exam, 'verification_status', id) === 'verified',
  }));
  const syllabusTopics = jsonRows(row.syllabus_topics, 'syllabus topic', id).map((topic) => ({
    id: stringField(topic, 'id', id),
    key: stringField(topic, 'external_key', id),
    titleEn: stringField(topic, 'title_en', id),
    titleGu: stringField(topic, 'title_gu', id),
    stage: stringField(topic, 'stage', id),
    examSlug: stringField(topic, 'exam_slug', id),
    subjectSlug: nullableStringField(topic, 'subject_slug'),
    verified: stringField(topic, 'verification_status', id) === 'verified',
  }));
  const chapters = jsonRows(row.chapters, 'chapter', id).map((chapter) => {
    const number = chapter.chapter_number;
    const readingTime = chapter.reading_time_minutes;
    if (typeof number !== 'number' || (readingTime !== null && typeof readingTime !== 'number')) {
      throw new Error(`Book "${id}" has invalid chapter metadata.`);
    }
    return {
      id: stringField(chapter, 'id', id),
      legacyChapterId: nullableStringField(chapter, 'legacy_chapter_id'),
      number,
      partLabelEn: nullableStringField(chapter, 'part_label_en'),
      partLabelGu: nullableStringField(chapter, 'part_label_gu'),
      titleEn: stringField(chapter, 'title_en', id),
      titleGu: stringField(chapter, 'title_gu', id),
      summaryEn: stringField(chapter, 'summary_en', id),
      summaryGu: stringField(chapter, 'summary_gu', id),
      readingTimeMinutes: readingTime,
      sourceAttribution: nullableStringField(chapter, 'source_attribution'),
      sourceUrl: optionalExternalUrl(nullableStringField(chapter, 'source_url'), 'chapter source', id) ?? null,
      verificationStatus: stringField(chapter, 'verification_status', id),
    };
  });

  const examSlugs: BookExamId[] = [];
  if (row.exam_slugs.includes('gpsc-class-1-2')) examSlugs.push('gpsc');
  if (row.exam_slugs.includes('upsc-cse')) examSlugs.push('upsc');
  const primarySubject = subjectsList[0];
  const language = languages.find((candidate) => candidate === row.language);
  if (!language) throw new Error(`Book "${id}" has an unsupported language: ${row.language}`);
  const difficulty = difficulties.find((candidate) => candidate === row.difficulty);
  if (row.difficulty && !difficulty) {
    throw new Error(`Book "${id}" has an unsupported difficulty: ${row.difficulty}`);
  }
  const verificationStatus = (['unverified', 'needs_review', 'verified'] as const).find(
    (status) => status === row.verification_status,
  );
  if (!verificationStatus) {
    throw new Error(`Book "${id}" has an unsupported verification status.`);
  }

  const officialResource = resources.find((resource) => resource.type === 'official');
  const purchaseResource = resources.find((resource) => resource.type === 'purchase');
  const coverResource = resources.find((resource) => resource.type === 'cover');
  const coverImageUrl = optionalExternalUrl(row.cover_image_url, 'cover image', id)
    ?? coverResource?.url;
  const readerChapters = getChaptersForBook(row.slug);

  const resource: DigitalBookResource = {
    id: row.slug,
    titleEn: row.title_en,
    titleGu: row.title_gu,
    authorEn: row.author_en,
    authorGu: row.author_gu,
    publisherEn: row.publisher_en ?? undefined,
    publisherGu: row.publisher_gu ?? undefined,
    subject: subjects.find((subject) => subject === primarySubject?.slug),
    language,
    descriptionEn: row.description_en,
    descriptionGu: row.description_gu,
    difficulty,
    examIds: examSlugs,
    syllabusTopicIds: row.syllabus_topic_keys,
    recommendationEn: row.recommendation_reason_en,
    recommendationGu: row.recommendation_reason_gu,
    purchaseUrl: purchaseResource?.url,
    isPublished: row.is_published,
    coverImageUrl,
    recommendedForEn: row.recommended_for_en,
    recommendedForGu: row.recommended_for_gu,
    canReadOnline: readerChapters.length > 0,
    canDownload: false,
    canHost: false,
    sourceUrl: officialResource?.url,
    licenseType: row.license_label ?? undefined,
    attribution: row.attribution ?? undefined,
    verificationStatus,
    sourceVerificationStatus: officialResource?.verificationStatus,
  };

  return {
    ...resource,
    recordId: id,
    slug: row.slug,
    edition: row.edition ?? undefined,
    isbn: row.isbn ?? undefined,
    examinationRelevanceEn: row.examination_relevance_en,
    examinationRelevanceGu: row.examination_relevance_gu,
    learningOutcomesEn: row.learning_outcomes_en,
    learningOutcomesGu: row.learning_outcomes_gu,
    recommendationCategory: row.recommendation_category ?? undefined,
    bookType: row.book_type ?? undefined,
    isArchived: row.archived_at !== null,
    verificationStatus,
    subjects: subjectsList,
    exams: examsList,
    syllabusTopics,
    resources,
    chapters,
  };
};

export const loadBookCatalog = async (
  filters: BookCatalogFilters = {},
): Promise<BookCatalogPage> => {
  const requestedPage = filters.page ?? 1;
  const requestedSize = filters.pageSize ?? 12;
  const page = Number.isFinite(requestedPage) ? Math.max(1, Math.floor(requestedPage)) : 1;
  const pageSize = Number.isFinite(requestedSize)
    ? Math.min(50, Math.max(1, Math.floor(requestedSize)))
    : 12;
  const from = (page - 1) * pageSize;
  let query = getSupabaseClient()
    .from('book_catalog_public')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .is('archived_at', null);

  const search = filters.search?.trim().replace(/[%_,]/g, ' ');
  if (search) query = query.ilike('search_text', `%${search}%`);
  if (filters.exam) query = query.contains('exam_slugs', [filters.exam]);
  if (filters.stage) query = query.contains('recommended_stages', [filters.stage]);
  if (filters.subject) query = query.contains('subject_slugs', [filters.subject]);
  if (filters.language) query = query.eq('language', filters.language);
  if (filters.difficulty) query = query.eq('difficulty', filters.difficulty);
  if (filters.recommendationCategory) {
    query = query.eq('recommendation_category', filters.recommendationCategory);
  }
  if (filters.bookType) query = query.eq('book_type', filters.bookType);
  const orderColumn = filters.sortBy === 'author'
    ? 'author_en'
    : filters.sortBy === 'difficulty'
      ? 'difficulty_order'
      : 'title_en';
  query = query.order(orderColumn, { ascending: true })
    .range(from, from + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return {
    items: data.map(mapBookCatalogRow),
    total: count ?? 0,
    page,
    pageSize,
  };
};

export const loadBookLibrary = async (): Promise<DigitalBookResource[]> =>
  (await loadBookCatalog({ pageSize: 50 })).items;

export const loadBookBySlug = async (slug: string): Promise<BookCatalogItem | null> => {
  const { data, error } = await getSupabaseClient()
    .from('book_catalog_public')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapBookCatalogRow(data) : null;
};

export const loadBookFavorites = async (userId: string): Promise<string[]> => {
  const { data, error } = await getSupabaseClient()
    .from('student_books')
    .select('book_id')
    .eq('user_id', userId)
    .eq('is_favorite', true);
  if (error) throw error;
  return data.map(({ book_id }) => book_id);
};

export const setBookFavorite = async (
  userId: string,
  bookId: string,
  isFavorite: boolean,
): Promise<void> => {
  const client = getSupabaseClient();
  const result = isFavorite
    ? await client.from('student_books').upsert(
      { user_id: userId, book_id: bookId, is_favorite: true },
      { onConflict: 'user_id,book_id' },
    )
    : await client.from('student_books')
      .update({ is_favorite: false })
      .eq('user_id', userId)
      .eq('book_id', bookId);
  if (result.error) throw result.error;
};

export const addBookToMyBooks = async (
  userId: string,
  bookId: string,
): Promise<void> => {
  const { error } = await getSupabaseClient()
    .from('student_books')
    .upsert(
      { user_id: userId, book_id: bookId },
      { onConflict: 'user_id,book_id', ignoreDuplicates: true },
    );
  if (error) throw error;
};
