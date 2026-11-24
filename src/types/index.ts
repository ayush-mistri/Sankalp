export type Language = 'gu' | 'en';

export type StageId = 'beginner' | 'foundation' | 'intermediate' | 'advanced' | 'exam_ready';

export type SubjectId = 
  | 'polity' 
  | 'gujarat_history' 
  | 'history' 
  | 'geography' 
  | 'economy' 
  | 'science_tech' 
  | 'ethics' 
  | 'csat';

export type ActiveTab = 
  | 'home'
  | 'syllabus'
  | 'books'
  | 'notes'
  | 'practice'
  | 'reader' 
  | 'current_affairs' 
  | 'live_radar' 
  | 'readiness' 
  | 'roadmap'
  | 'resources';

export interface StageInfo {
  id: StageId;
  nameEn: string;
  nameGu: string;
  taglineEn: string;
  taglineGu: string;
  descriptionEn: string;
  descriptionGu: string;
  badge: string;
}

export interface SubjectMetadata {
  id: SubjectId;
  nameEn: string;
  nameGu: string;
  paper: string;
  totalTopics: number;
}

export interface TopicNode {
  id: string;
  subjectId: SubjectId;
  stageId: StageId;
  titleEn: string;
  titleGu: string;
  code: string;
  paperCategory: 'Prelims GS-1' | 'Prelims GS-2' | 'Mains GS-1' | 'Mains GS-2' | 'Mains GS-3' | 'General';
  weightageScore: number; // 1-10 priority
  pyqCount: number;
  estimatedMins: number;
  prerequisites: string[];
  learningObjectivesEn: string[];
  learningObjectivesGu: string[];
  status: 'locked' | 'available' | 'in_progress' | 'mastered';
  retentionScore?: number; // 0-100
}

export interface KeyTerm {
  termEn: string;
  termGu: string;
  definitionEn: string;
  definitionGu: string;
  examSignificanceEn: string;
  examSignificanceGu: string;
}

export interface ContentBlock {
  headingEn: string;
  headingGu: string;
  bodyEn: string;
  bodyGu: string;
  examNoteEn?: string;
  examNoteGu?: string;
  illustration?: {
    url: string;
    captionEn: string;
    captionGu: string;
  };
}

export interface CheckpointQuestion {
  id: string;
  questionEn: string;
  questionGu: string;
  optionsEn: string[];
  optionsGu: string[];
  correctIndex: number;
  explanationEn: string;
  explanationGu: string;
}

export interface ImageAnnotation {
  tagEn: string;
  tagGu: string;
  noteEn: string;
  noteGu: string;
}

export interface LearningModule {
  id: string;
  topicId: string;
  titleEn: string;
  titleGu: string;
  readTimeMins: number;
  heroImage?: {
    url: string;
    captionEn: string;
    captionGu: string;
    source: string;
    annotations?: ImageAnnotation[];
  };
  keyTerms: KeyTerm[];
  contentBlocks: ContentBlock[];
  checkpoint: CheckpointQuestion;
}

export interface QuestionOption {
  id: string;
  textEn: string;
  textGu: string;
  isCorrect: boolean;
  whyWrongEn?: string;
  whyWrongGu?: string;
}

export type ExamAgency = 'GPSC' | 'UPSC';
export type PaperStage = 'Prelims' | 'Mains';
export type PaperMedium = 'Bilingual' | 'Gujarati' | 'English';

export interface PrelimsPaperMeta {
  id: string;
  examAgency: ExamAgency;
  year: number;
  stage?: PaperStage;
  medium?: PaperMedium;
  advertisementNo?: string;
  examDate?: string;
  fileSize?: string;
  source?: string;
  paperCode?: string;
  alternativeSources?: { name: string; url: string }[];
  examNameEn: string;
  examNameGu: string;
  paperTypeEn: string;
  paperTypeGu: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarkingEn: string;
  negativeMarkingGu: string;
  cutoffTextEn?: string;
  cutoffTextGu?: string;
  difficultyRating: 'Moderate' | 'Moderate to Tough' | 'Tough / Analytical' | 'Direct / Conceptual';
  officialPaperPdfUrl?: string;
  officialAnswerKeyPdfUrl?: string;
  sankalpPdfUrl?: string;
  subjectBreakdown: {
    subjectEn: string;
    subjectGu: string;
    questionCount: number;
    color: string;
  }[];
  keyTakeawaysEn: string[];
  keyTakeawaysGu: string[];
}


export type QuestionSubject = 
  | 'history'
  | 'heritage'
  | 'polity'
  | 'mental_ability'
  | 'economy'
  | 'geography'
  | 'environment'
  | 'science_tech'
  | 'current_affairs';

export interface PYQQuestion {
  id: string;
  topicId: string;
  examAgency?: ExamAgency;
  examName: string;
  examYear: number;
  paperType: 'Prelims GS-1' | 'Prelims GS-2' | 'Mains GS-1' | 'Mains GS-2' | 'Mains GS-3' | 'Mains GS-4' | 'Essay';
  subject?: QuestionSubject;
  cognitiveType: 'factual' | 'conceptual' | 'multi_statement' | 'elimination_trap';
  questionEn: string;
  questionGu: string;
  options: QuestionOption[];
  explanationEn: string;
  explanationGu: string;
  sourceConceptEn: string;
  sourceConceptGu: string;
  mainsAnswerFrameworkEn?: string;
  mainsAnswerFrameworkGu?: string;
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  headlineEn: string;
  headlineGu: string;
  gsPaper: 'GS-1' | 'GS-2' | 'GS-3';
  topicTagEn: string;
  topicTagGu: string;
  summaryEn: string;
  summaryGu: string;
  prelimsAngleEn: string;
  prelimsAngleGu: string;
  mainsAngleEn: string;
  mainsAngleGu: string;
  imageUrl?: string;
}

export interface ResourceItem {
  id: string;
  subject: string;
  bookTitle: string;
  authorOrSource: string;
  recommendation: 'essential' | 'selective' | 'avoid';
  targetExam: string;
  whatToReadEn: string;
  whatToReadGu: string;
  whatToSkipEn: string;
  whatToSkipGu: string;
  rationaleEn: string;
  rationaleGu: string;
}
