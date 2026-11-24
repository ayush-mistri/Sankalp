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
  Eye, 
  Maximize2, 
  Sparkles, 
  XCircle, 
  Zap 
} from 'lucide-react';
import { InteractiveImageModal } from '@/components/InteractiveImageModal';

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
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

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
      {/* Top Navigation & Dynamic Module Switcher */}
      <div className="flex flex-col gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToRoadmap}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'પાછા રોડમેપ પર જાઓ' : 'Back to Syllabus Roadmap'}</span>
          </button>
          <span className="text-[11px] font-bold text-stone-400">
            {Object.keys(LEARNING_MODULES).length} {language === 'gu' ? 'મોડ્યુલ્સ ઉપલબ્ધ' : 'Modules Available'}
          </span>
        </div>

        {/* Dynamic Module Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold scrollbar-thin">
          {Object.values(LEARNING_MODULES).map((mod) => {
            const isCurrent = currentModule.topicId === mod.topicId;
            return (
              <button
                key={mod.topicId}
                onClick={() => {
                  onSelectTopic(mod.topicId);
                  handleResetQuiz();
                }}
                className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-emerald-700 border-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-emerald-400'
                }`}
              >
                {language === 'gu' ? mod.titleGu.split(':')[0] : mod.titleEn.split(':')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Title & Metadata */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>{currentModule.readTimeMins} {language === 'gu' ? 'મિનિટ વાંચન' : 'mins reading'}</span>
          <span>•</span>
          <span>{language === 'gu' ? 'પ્રિલિમ્સ + મેઈન્સ કન્સેપ્ટ' : 'Prelims + Mains High-Yield'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {language === 'gu' ? currentModule.titleGu : currentModule.titleEn}
        </h1>

        {/* Interactive Visual Hero Image with Evidence Badge */}
        {currentModule.heroImage && (
          <div className="space-y-3 mt-4">
            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs group relative cursor-pointer hover:border-emerald-500 transition-all"
              title={language === 'gu' ? 'ઇન્ટરેક્ટિવ દ્રશ્ય વિશ્લેષણ અને ઝૂમ માટે ક્લિક કરો' : 'Click to open interactive visual deep-dive & zoom'}
            >
              <div className="relative h-64 sm:h-84 w-full overflow-hidden">
                <img
                  src={currentModule.heroImage.url}
                  alt={language === 'gu' ? currentModule.titleGu : currentModule.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
                
                {/* Floating Interactive Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-700 text-white text-xs font-bold shadow-lg group-hover:bg-emerald-700 group-hover:border-emerald-600 transition-all">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{language === 'gu' ? 'ઇન્ટરેક્ટિવ ઝૂમ & વિશ્લેષણ' : 'Interactive Zoom & Clues'}</span>
                </div>

                {/* Caption & Archaeological Evidence metadata */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white space-y-1.5">
                  <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm leading-snug">
                    {language === 'gu' ? currentModule.heroImage.captionGu : currentModule.heroImage.captionEn}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-300">
                    <span>{language === 'gu' ? 'સ્ત્રોત:' : 'Source:'} {currentModule.heroImage.source}</span>
                    <span>•</span>
                    <span className="text-emerald-300 font-semibold">{language === 'gu' ? 'ઐતિહાસિક પુરાતત્વીય પ્રમાણ' : 'Archaeological Evidence'}</span>
                    <span>•</span>
                    <span className="text-stone-300 underline underline-offset-2 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      {language === 'gu' ? 'મોટું કરવા ક્લિક કરો' : 'Click to expand'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Visual Clue Pills under image */}
            {currentModule.heroImage.annotations && currentModule.heroImage.annotations.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'gu' ? 'દ્રશ્ય સંકેતો:' : 'Visual Clues:'}</span>
                </span>
                {currentModule.heroImage.annotations.map((ann, i) => (
                  <button
                    key={i}
                    onClick={() => setIsImageModalOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{language === 'gu' ? ann.tagGu : ann.tagEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Key Terms & Exam Glossary in Clean Emerald */}
      <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'મુખ્ય પારિભાષિક શબ્દો (ટૅપ કરીને પરીક્ષા મહત્વ જુઓ)' : 'Core Vocabulary & Exam Significance'}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            {language === 'gu' ? 'દ્વિભાષી વ્યાખ્યા' : 'Bilingual Definition'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentModule.keyTerms.map((term, idx) => {
            const isActive = activeGlossaryTerm === term.termEn;
            return (
              <div
                key={idx}
                onClick={() => setActiveGlossaryTerm(isActive ? null : term.termEn)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white border-emerald-200/70 hover:border-emerald-400'
                }`}
              >
                <div className="font-bold text-xs text-emerald-950 mb-1">
                  {language === 'gu' ? term.termGu : term.termEn}
                </div>
                <div className="text-[11px] text-stone-600 line-clamp-2">
                  {language === 'gu' ? term.definitionGu : term.definitionEn}
                </div>
                {isActive && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-200 text-[11px] text-emerald-900 font-medium">
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
      <article className="space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
        {currentModule.contentBlocks.map((block, idx) => (
          <div key={idx} className="space-y-3 p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              {language === 'gu' ? block.headingGu : block.headingEn}
            </h2>
            <div className="whitespace-pre-line text-stone-700 text-sm leading-relaxed">
              {language === 'gu' ? block.bodyGu : block.bodyEn}
            </div>

            {block.examNoteEn && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 font-medium">
                  <strong>{language === 'gu' ? 'પરીક્ષા ચેતવણી (Exam Trap):' : 'Exam Alert:'}</strong>{' '}
                  {language === 'gu' ? block.examNoteGu : block.examNoteEn}
                </div>
              </div>
            )}
          </div>
        ))}
      </article>

      {/* Embedded Active Recall Checkpoint */}
      <div className="p-7 rounded-2xl bg-stone-900 text-white border border-emerald-900/40 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
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
                optionStyle = 'bg-stone-800 border-stone-600 text-stone-400 line-through';
              }
            } else if (isSelected) {
              optionStyle = 'bg-emerald-700/30 border-emerald-500 text-white font-bold ring-2 ring-emerald-500/30';
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
              >
                <span>{opt}</span>
                {hasSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-stone-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Action Button & Explanation */}
        {!hasSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitQuiz}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-700/30 transition-all"
          >
            {language === 'gu' ? 'જવાબ સબમિટ કરો' : 'Submit Answer'}
          </button>
        ) : (
          <div className="space-y-4 pt-3 border-t border-stone-800 animate-in fade-in">
            <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
              selectedOption === currentModule.checkpoint.correctIndex
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-stone-800/60 border-stone-700 text-stone-300'
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
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-emerald-700/30"
              >
                <span>{language === 'gu' ? 'પાછલા વર્ષોના પ્રશ્નો (PYQ) ઉકેલો' : 'Practice Past Exam PYQs'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Full-Screen Image Lightbox & Clues Modal */}
      {currentModule.heroImage && (
        <InteractiveImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={currentModule.heroImage.url}
          titleEn={currentModule.titleEn}
          titleGu={currentModule.titleGu}
          captionEn={currentModule.heroImage.captionEn}
          captionGu={currentModule.heroImage.captionGu}
          source={currentModule.heroImage.source}
          annotations={currentModule.heroImage.annotations}
          language={language}
        />
      )}

    </div>
  );
};
