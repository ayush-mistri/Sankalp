'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { PYQ_QUESTIONS } from '@/data/pyqQuestions';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  XCircle 
} from 'lucide-react';

interface PracticeViewProps {
  language: Language;
  onBackToRoadmap: () => void;
  onReadConcept: (topicId: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  language,
  onBackToRoadmap,
  onReadConcept,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<'sure' | 'fifty_fifty' | 'guess'>('sure');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: string; optionId: string; isCorrect: boolean; confidence: string }>
  >([]);

  const question = PYQ_QUESTIONS[currentIdx] || PYQ_QUESTIONS[0];

  const handleSelectOption = (optId: string) => {
    if (!hasEvaluated) {
      setSelectedOptionId(optId);
    }
  };

  const handleEvaluate = () => {
    if (!selectedOptionId) return;

    const chosenOption = question.options.find((o) => o.id === selectedOptionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        optionId: selectedOptionId,
        isCorrect,
        confidence: confidenceLevel,
      },
    ]);

    setHasEvaluated(true);
  };

  const handleNextQuestion = () => {
    if (currentIdx < PYQ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasEvaluated(false);
      setConfidenceLevel('sure');
    }
  };

  const handleResetSession = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setHasEvaluated(false);
    setUserAnswers([]);
    setConfidenceLevel('sure');
  };

  // Stats calculation
  const totalAttempted = userAnswers.length;
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const fiftyFiftyCorrect = userAnswers.filter((a) => a.confidence === 'fifty_fifty' && a.isCorrect).length;
  const fiftyFiftyTotal = userAnswers.filter((a) => a.confidence === 'fifty_fifty').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Bar Navigation & Exam Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'gu' ? 'પાછા રોડમેપ પર જાઓ' : 'Back to Roadmap'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">
            {question.examName} ({question.examYear})
          </span>
          <span className="px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 font-bold">
            {question.paperType}
          </span>
        </div>
      </div>

      {/* Progress & Live Negative Marking Tracker */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {language === 'gu' ? 'પ્રશ્ન ક્રમ:' : 'Question:'}
          </span>
          <div className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
            {currentIdx + 1} / {PYQ_QUESTIONS.length}
          </div>
        </div>

        {totalAttempted > 0 && (
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="text-emerald-600 dark:text-emerald-400">
              {correctCount} {language === 'gu' ? 'સાચા' : 'Correct'}
            </div>
            <div className="text-rose-600 dark:text-rose-400">
              {totalAttempted - correctCount} {language === 'gu' ? 'ખોટા (-0.33)' : 'Wrong (-0.33)'}
            </div>
            {fiftyFiftyTotal > 0 && (
              <div className="text-amber-600 dark:text-amber-400 font-medium">
                50-50 {language === 'gu' ? 'સફળતા:' : 'Accuracy:'} {Math.round((fiftyFiftyCorrect / fiftyFiftyTotal) * 100)}%
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
        
        {/* Cognitive Type Tag */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            {question.cognitiveType === 'multi_statement' && (language === 'gu' ? 'વિધાન આધારિત પ્રશ્ન' : 'Multi-Statement')}
            {question.cognitiveType === 'conceptual' && (language === 'gu' ? 'સંકલ્પનાત્મક પ્રશ્ન' : 'Conceptual Focus')}
            {question.cognitiveType === 'elimination_trap' && (language === 'gu' ? 'ઓપ્શન એલિમિનેશન ટ્રેપ' : 'Option Elimination Trap')}
          </span>

          <button
            onClick={() => onReadConcept(question.topicId)}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
          >
            <span>{language === 'gu' ? 'થિયરી વાંચો' : 'Read Concept'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-relaxed whitespace-pre-line">
          {language === 'gu' ? question.questionGu : question.questionEn}
        </h3>

        {/* Confidence Selector (Negative Marking Training) */}
        {!hasEvaluated && (
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 dark:text-stone-300">
                {language === 'gu' ? 'તમારો વિશ્વાસ સ્તર પસંદ કરો:' : 'Select Your Confidence Tag:'}
              </span>
              <span className="text-[11px] text-stone-500">
                {language === 'gu' ? 'નેગેટિવ માર્કિંગથી બચવા' : 'Trains negative-marking control'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setConfidenceLevel('sure')}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  confidenceLevel === 'sure'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                {language === 'gu' ? '૧૦૦% ખાતરી' : '100% Sure'}
              </button>
              <button
                type="button"
                onClick={() => setConfidenceLevel('fifty_fifty')}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  confidenceLevel === 'fifty_fifty'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                {language === 'gu' ? '૫૦-૫૦ તુક્કો' : '50-50 Guess'}
              </button>
              <button
                type="button"
                onClick={() => setConfidenceLevel('guess')}
                className={`py-2 px-3 rounded-lg border text-center transition-all ${
                  confidenceLevel === 'guess'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                {language === 'gu' ? 'અંધારામાં તીર' : 'Blind Guess'}
              </button>
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let containerStyle = 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200';

            if (hasEvaluated) {
              if (opt.isCorrect) {
                containerStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected) {
                containerStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
              }
            } else if (isSelected) {
              containerStyle = 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 text-orange-950 dark:text-orange-200 font-bold ring-2 ring-orange-500/20';
            }

            return (
              <div key={opt.id} className="space-y-1.5">
                <button
                  type="button"
                  disabled={hasEvaluated}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${containerStyle}`}
                >
                  <span>{language === 'gu' ? opt.textGu : opt.textEn}</span>
                  {hasEvaluated && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {hasEvaluated && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                </button>

                {/* Option-by-Option Elimination Reason */}
                {hasEvaluated && opt.whyWrongEn && !opt.isCorrect && (
                  <div className="px-4 py-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 rounded-lg">
                    <strong>{language === 'gu' ? 'શા માટે ખોટો ઑપ્શન છે:' : 'Why this is incorrect:'}</strong>{' '}
                    {language === 'gu' ? opt.whyWrongGu : opt.whyWrongEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Next Button */}
        {!hasEvaluated ? (
          <button
            type="button"
            disabled={!selectedOptionId}
            onClick={handleEvaluate}
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-md shadow-orange-600/30 transition-all"
          >
            {language === 'gu' ? 'જવાબ અને તર્ક ચકાસો' : 'Verify Answer & Logic'}
          </button>
        ) : (
          <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 animate-in fade-in">
            {/* Detailed Explanation */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-orange-600" />
                <span>{language === 'gu' ? 'પરીક્ષકની સત્તાવાર સમજૂતી:' : 'Official Examination Logic:'}</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
                {language === 'gu' ? question.explanationGu : question.explanationEn}
              </p>
              <div className="text-[11px] text-stone-500 font-mono pt-1">
                {language === 'gu' ? 'સ્ત્રોત સંકલ્પના:' : 'Mapped Concept:'}{' '}
                {language === 'gu' ? question.sourceConceptGu : question.sourceConceptEn}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleResetSession}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'gu' ? 'સેશન ફરીથી શરૂ કરો' : 'Restart Session'}</span>
              </button>

              {currentIdx < PYQ_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-orange-600/30"
                >
                  <span>{language === 'gu' ? 'આગળનો પ્રશ્ન' : 'Next PYQ'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-bold text-emerald-600">
                  {language === 'gu' ? 'તમામ PYQ પૂર્ણ થયા!' : 'All PYQs in this set completed!'}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
