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
  | 'roadmap' 
  | 'reader' 
  | 'practice' 
  | 'current_affairs' 
  | 'live_radar' 
  | 'readiness' 
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

export interface LearningModule {
  id: string;
  topicId: string;
  titleEn: string;
  titleGu: string;
  readTimeMins: number;
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

export interface PYQQuestion {
  id: string;
  topicId: string;
  examName: string;
  examYear: number;
  paperType: 'Prelims GS-1' | 'Prelims GS-2' | 'Mains GS-1' | 'Mains GS-2';
  questionEn: string;
  questionGu: string;
  cognitiveType: 'factual' | 'conceptual' | 'multi_statement' | 'elimination_trap';
  options: QuestionOption[];
  explanationEn: string;
  explanationGu: string;
  sourceConceptEn: string;
  sourceConceptGu: string;
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
