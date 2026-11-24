import { PYQQuestion } from '@/types';
import { UPSC_2024_GS1_QUESTIONS } from './upsc_2024_gs1';
import { GPSC_2024_GS1_QUESTIONS } from './gpsc_2024_gs1';
import { UPSC_2023_GS1_QUESTIONS } from './upsc_2023_gs1';
import { GPSC_2023_GS1_QUESTIONS } from './gpsc_2023_gs1';

export const FULL_PAPERS_REGISTRY: Record<string, PYQQuestion[]> = {
  'upsc-prelims-2024-gs1': UPSC_2024_GS1_QUESTIONS,
  'gpsc-prelims-2024-gs1': GPSC_2024_GS1_QUESTIONS,
  'upsc-prelims-2023-gs1': UPSC_2023_GS1_QUESTIONS,
  'gpsc-prelims-2023-gs1': GPSC_2023_GS1_QUESTIONS,
  'gpsc-prelims-2023-class12-gs1': GPSC_2023_GS1_QUESTIONS,
  'gpsc-prelims-2023-dyso': GPSC_2023_GS1_QUESTIONS, // DYSO composite syllabus shares high overlap with GS-1
};


export const getPaperQuestions = (paperId: string): PYQQuestion[] => {
  return FULL_PAPERS_REGISTRY[paperId] || [];
};

