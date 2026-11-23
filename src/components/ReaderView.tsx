'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { LEARNING_MODULES } from '@/data/learningModules';
import { 
  AlertCircle, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  XCircle, 
  Zap 
} from 'lucide-react';

interface ReaderViewProps {
  language: Language;
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onBackToRoadmap: () => void;
  onGoToPractice: (topicId: string) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  language,
  selectedTopicId,
  onSelectTopic,
  onBackToRoadmap,
  onGoToPractice,
}) => {
  const currentModule = LEARNING_MODULES[selectedTopicId] || LEARNING_MODULES['topic-f1'];

  // Checkpoint Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null);

  const handleOptionSelect = (index: number) => {
    if (!hasSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedOption !== null) {
      setHasSubmitted(true);
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Navigation & Module Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'gu' ? 'પાછા રોડમેપ પર જાઓ' : 'Back to Syllabus Roadmap'}</span>
        </button>

        {/* Quick Module Switcher */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-stone-400">{language === 'gu' ? 'ટોપિક બદલો:' : 'Switch Module:'}</span>
          <button
            onClick={() => {
              onSelectTopic('topic-f1');
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentModule.topicId === 'topic-f1'
                ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-600 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {language === 'gu' ? 'બંધારણનું આમુખ (Polity)' : 'Preamble (Polity)'}
          </button>
          <button
            onClick={() => {
              onSelectTopic('topic-gh1');
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              currentModule.topicId === 'topic-gh1'
                ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-600 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {language === 'gu' ? 'ધોળાવીરા અને લોથલ' : 'Dholavira & Lothal'}
          </button>
        </div>
      </div>

      {/* Module Title & Metadata */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{currentModule.readTimeMins} {language === 'gu' ? 'મિનિટ વાંચન' : 'mins reading'}</span>
          <span>•</span>
          <span>{language === 'gu' ? 'પ્રિલિમ્સ + મેઈન્સ કન્સેપ્ટ' : 'Prelims + Mains High-Yield'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {language === 'gu' ? currentModule.titleGu : currentModule.titleEn}
        </h1>
      </div>

      {/* Interactive Key Terms & Exam Glossary */}
      <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'gu' ? 'મુખ્ય પારિભાષિક શબ્દો (ટૅપ કરીને પરીક્ષા મહત્વ જુઓ)' : 'Core Vocabulary & Exam Significance'}</span>
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            {language === 'gu' ? 'દ્વિભાષી વ્યાખ્યા' : 'Bilingual Definition'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {currentModule.keyTerms.map((term, idx) => {
            const isActive = activeGlossaryTerm === term.termEn;
            return (
              <div
                key={idx}
                onClick={() => setActiveGlossaryTerm(isActive ? null : term.termEn)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'bg-amber-100/90 dark:bg-amber-900/40 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-white dark:bg-stone-900 border-amber-200/80 dark:border-amber-800/30 hover:border-amber-300'
                }`}
              >
                <div className="font-bold text-xs text-amber-950 dark:text-amber-200 mb-1">
                  {language === 'gu' ? term.termGu : term.termEn}
                </div>
                <div className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">
                  {language === 'gu' ? term.definitionGu : term.definitionEn}
                </div>
                {isActive && (
                  <div className="mt-2.5 pt-2 border-t border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-300 font-medium">
                    <strong>{language === 'gu' ? 'પરીક્ષા માટે:' : 'Exam Tip:'}</strong>{' '}
                    {language === 'gu' ? term.examSignificanceGu : term.examSignificanceEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content Blocks */}
      <article className="space-y-8 text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
        {currentModule.contentBlocks.map((block, idx) => (
          <div key={idx} className="space-y-3 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              {language === 'gu' ? block.headingGu : block.headingEn}
            </h2>
            <div className="whitespace-pre-line text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
              {language === 'gu' ? block.bodyGu : block.bodyEn}
            </div>

            {block.examNoteEn && (
              <div className="mt-4 p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-xs text-orange-900 dark:text-orange-200 font-medium">
                  <strong>{language === 'gu' ? 'પરીક્ષા ચેતવણી (Exam Trap):' : 'Exam Alert:'}</strong>{' '}
                  {language === 'gu' ? block.examNoteGu : block.examNoteEn}
                </div>
              </div>
            )}
          </div>
        ))}
      </article>

      {/* Embedded Active Recall Checkpoint */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'સ્વ-મૂલ્યાંકન ચેકપોઇન્ટ (Active Recall)' : 'Active Recall Checkpoint'}</span>
          </div>
          <span className="text-xs text-stone-400">
            {language === 'gu' ? 'વાંચન પછી તુરંત પરખ' : 'Immediate Retention Test'}
          </span>
        </div>

        <div className="text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line text-stone-100">
          {language === 'gu' ? currentModule.checkpoint.questionGu : currentModule.checkpoint.questionEn}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {(language === 'gu' ? currentModule.checkpoint.optionsGu : currentModule.checkpoint.optionsEn).map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentModule.checkpoint.correctIndex;

            let optionStyle = 'bg-stone-800/80 border-stone-700 hover:bg-stone-800 text-stone-200';
            if (hasSubmitted) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected) {
                optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 line-through';
              }
            } else if (isSelected) {
              optionStyle = 'bg-orange-600/30 border-orange-500 text-white font-bold ring-2 ring-orange-500/30';
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
              >
                <span>{opt}</span>
                {hasSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Action Button & Explanation */}
        {!hasSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitQuiz}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-md shadow-orange-600/30 transition-all"
          >
            {language === 'gu' ? 'જવાબ સબમિટ કરો' : 'Submit Answer'}
          </button>
        ) : (
          <div className="space-y-4 pt-3 border-t border-stone-800 animate-in fade-in">
            <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
              selectedOption === currentModule.checkpoint.correctIndex
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <div className="font-bold mb-1">
                {selectedOption === currentModule.checkpoint.correctIndex
                  ? (language === 'gu' ? '🎉 ઉત્તમ! તમારો જવાબ સાચો છે.' : '🎉 Excellent! Correct deduction.')
                  : (language === 'gu' ? '❌ ભૂલ થઈ! સાચો તર્ક નીચે મુજબ છે:' : '❌ Incorrect. Review the explanation below:')}
              </div>
              <p className="text-stone-300 leading-relaxed text-xs">
                {language === 'gu' ? currentModule.checkpoint.explanationGu : currentModule.checkpoint.explanationEn}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                {language === 'gu' ? 'ફરીથી પ્રયાસ કરો' : 'Try Again'}
              </button>

              <button
                onClick={() => onGoToPractice(currentModule.topicId)}
                className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-orange-600/30"
              >
                <span>{language === 'gu' ? 'પાછલા વર્ષોના પ્રશ્નો (PYQ) ઉકેલો' : 'Practice Past Exam PYQs'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
