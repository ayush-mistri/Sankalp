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

export interface DigitalBookResource {
  id: string;
  titleEn: string;
  titleGu: string;
  authorEn: string;
  authorGu: string;
  category: ResourceCategory;
  subject: ResourceSubject;
  language: ResourceLanguage;
  descriptionEn: string;
  descriptionGu: string;
  coverImageUrl?: string;
  fileSizeApprox?: string;
  recommendedForEn: string;
  recommendedForGu: string;
  
  // Mandatory Access & Rights Enforcement Configuration
  canReadOnline: boolean;
  canDownload: boolean;
  canHost: boolean;
  sourceUrl: string;
  hostedPdfUrl?: string;
  licenseType: ResourceLicenseType;
  attribution: string;
  permissionVerifiedAt: string;
  licenseDetailsUrl?: string;
  totalPages?: number;
  volumes?: BookVolumeSpec[];
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

