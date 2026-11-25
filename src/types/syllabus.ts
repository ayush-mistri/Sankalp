export type ExamId = 'gpsc-class-1-2' | 'upsc-cse' | string;

export type ExamStageId = 'prelims' | 'mains';

export type TopicProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface OfficialSourceInfo {
  titleEn: string;
  titleGu: string;
  documentRef: string;
  gazetteOrNotificationDate: string;
  officialUrl: string;
  notesEn: string;
  notesGu: string;
}

export interface ExamSchemeInfo {
  prelimsMarks: number;
  prelimsDuration: string;
  mainsMarks: number;
  mainsMeritMarks: number;
  interviewMarks: number;
  finalMeritMarks: number;
  patternSummaryEn: string;
  patternSummaryGu: string;
}

export interface RecommendedReading {
  title: string;
  source: string;
  isGovtFree?: boolean;
}

export interface SyllabusTopic {
  id: string;
  code: string;
  titleEn: string;
  titleGu: string;
  chapterId: string;
  subjectId: string;
  paperId: string;
  examId: ExamId;
  stage: ExamStageId;
  /** Syllabus wording; only label as official when it is verified verbatim. */
  officialWordingEn: string;
  officialWordingGu: string;
  wordingSource?: 'official' | 'summary';
  /** SANKALP pedagogical breakdown and strategic focus */
  sankalpExplanationEn: string;
  sankalpExplanationGu: string;
  keySubtopicsEn: string[];
  keySubtopicsGu: string[];
  importance: 'High' | 'Medium' | 'Essential';
  examFrequency: string;
  linkedModuleTopicId?: string; // Links to Reader module (e.g. topic-f1)
  linkedPracticeTag?: string; // Links to PYQ / Practice filter
  recommendedReadings: RecommendedReading[];
}

export interface SyllabusChapter {
  id: string;
  chapterNumber: number;
  titleEn: string;
  titleGu: string;
  topics: SyllabusTopic[];
}

export interface SyllabusSubject {
  id: string;
  subjectCode: string;
  nameEn: string;
  nameGu: string;
  icon: string;
  officialWeightageEn: string;
  officialWeightageGu: string;
  chapters: SyllabusChapter[];
}

export interface SyllabusPaper {
  id: string;
  paperCode: string;
  titleEn: string;
  titleGu: string;
  stage: ExamStageId;
  marks: number;
  duration: string;
  nature: 'Merit' | 'Qualifying';
  officialDescriptionEn: string;
  officialDescriptionGu: string;
  subjects: SyllabusSubject[];
}

export interface ExamSyllabusRecord {
  id: ExamId;
  nameEn: string;
  nameGu: string;
  shortName: string;
  badgeEn: string;
  badgeGu: string;
  conductingBodyEn: string;
  conductingBodyGu: string;
  officialSource: OfficialSourceInfo;
  coverageNoteEn?: string;
  coverageNoteGu?: string;
  scheme: ExamSchemeInfo;
  prelimsPapers: SyllabusPaper[];
  mainsPapers: SyllabusPaper[];
}

export interface StudentSyllabusProgress {
  topicStatuses: Record<string, TopicProgressStatus>;
  bookmarkedTopics: string[];
  lastUpdated: string;
}
