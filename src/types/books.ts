export type ResourceLicenseType =
  | 'CC0'
  | 'CC BY'
  | 'CC BY-SA'
  | 'Public Domain'
  | 'Government Open Access'
  | 'Official Source Only';

export type ResourceCategory =
  | 'NCERT'
  | 'GSSTB'
  | 'DIKSHA'
  | 'IGNOU_eGyanKosh'
  | 'ePG_Pathshala'
  | 'GovtOpenAccess'
  | 'PublicDomain'
  | 'CreativeCommons';

export type ResourceSubject =
  | 'all'
  | 'history'
  | 'heritage'
  | 'polity'
  | 'economy'
  | 'geography'
  | 'science_tech'
  | 'ethics_admin'
  | 'current_affairs';

export type ResourceLanguage = 'gu' | 'en' | 'bilingual' | 'hi';

export type BookDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type BookExamId = 'gpsc' | 'upsc';

export interface DigitalBookResource {
  id: string;
  titleEn: string;
  titleGu: string;
  authorEn: string;
  authorGu: string;
  publisherEn?: string;
  publisherGu?: string;
  category?: ResourceCategory;
  subject?: ResourceSubject;
  language: ResourceLanguage;
  descriptionEn: string;
  descriptionGu: string;
  difficulty?: BookDifficulty;
  examIds?: BookExamId[];
  syllabusTopicIds?: string[];
  recommendationEn?: string;
  recommendationGu?: string;
  purchaseUrl?: string;
  isPublished?: boolean;
  coverImageUrl?: string;
  fileSizeApprox?: string;
  recommendedForEn: string;
  recommendedForGu: string;
  
  // Mandatory Access & Rights Enforcement Configuration
  canReadOnline: boolean;
  canDownload: boolean;
  canHost: boolean;
  sourceUrl?: string;
  hostedPdfUrl?: string;
  licenseType?: ResourceLicenseType | string;
  attribution?: string;
  verificationStatus?: 'unverified' | 'needs_review' | 'verified';
  sourceVerificationStatus?: 'unverified' | 'needs_review' | 'verified';
  permissionVerifiedAt?: string;
  licenseDetailsUrl?: string;
  totalPages?: number;
  volumes?: BookVolumeSpec[];
}

export interface BookCatalogItem extends DigitalBookResource {
  recordId: string;
  slug: string;
  edition?: string;
  isbn?: string;
  examinationRelevanceEn: string;
  examinationRelevanceGu: string;
  learningOutcomesEn: string;
  learningOutcomesGu: string;
  recommendationCategory?: string;
  bookType?: string;
  isArchived: boolean;
  verificationStatus: 'unverified' | 'needs_review' | 'verified';
  subjects: Array<{ id: string; slug: string; nameEn: string; nameGu: string; verified: boolean }>;
  exams: Array<{ id: string; slug: string; nameEn: string; nameGu: string; stages: string[]; verified: boolean }>;
  syllabusTopics: Array<{
    id: string;
    key: string;
    titleEn: string;
    titleGu: string;
    stage: string;
    examSlug: string;
    subjectSlug: string | null;
    verified: boolean;
  }>;
  resources: Array<{
    id: string;
    type: string;
    label: string;
    url: string;
    verificationStatus: 'unverified' | 'needs_review' | 'verified';
    verifiedAt: string | null;
    sourceName: string | null;
  }>;
  chapters: Array<{
    id: string;
    legacyChapterId: string | null;
    number: number;
    partLabelEn: string | null;
    partLabelGu: string | null;
    titleEn: string;
    titleGu: string;
    summaryEn: string;
    summaryGu: string;
    readingTimeMinutes: number | null;
    sourceAttribution: string | null;
    sourceUrl: string | null;
    verificationStatus: string;
  }>;
}

export interface BookVolumeSpec {
  key: string;
  labelEn: string;
  labelGu: string;
  pagesCount: number;
  chaptersCount: number;
  officialUrl?: string;
}

export interface BookSection {
  id: string;
  headingEn: string;
  headingGu: string;
  bodyEn: string;
  bodyGu: string;
  keyTerms?: string[];
}

export interface BookChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  partLabelEn?: string;
  partLabelGu?: string;
  titleEn: string;
  titleGu: string;
  readingTimeMinutes: number;
  sections: BookSection[];
  summaryPointsEn: string[];
  summaryPointsGu: string[];
  sourceAttribution: string;
  officialChapterPdfUrl?: string;
}

export type HighlightColor = 'yellow' | 'emerald' | 'blue' | 'rose';

export interface BookHighlight {
  id: string;
  bookId: string;
  chapterId: string;
  sectionId: string;
  selectedText: string;
  color: HighlightColor;
  note?: string;
  createdAt: string;
}

export interface BookBookmark {
  id: string;
  bookId: string;
  chapterId: string;
  label: string;
  createdAt: string;
}

export interface BookPersonalNote {
  id: string;
  bookId: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  content: string;
  updatedAt: string;
  syncedToCloud?: boolean;
}

export interface BookReadingProgress {
  bookId: string;
  lastChapterId: string;
  completedChapterIds: string[];
  progressPercent: number;
  updatedAt: string;
}

