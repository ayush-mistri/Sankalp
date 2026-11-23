'use client';

import React, { useState } from 'react';
import { Language, StageId } from '@/types';
import { STAGES, TOPIC_NODES } from '@/data/syllabusData';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Compass, 
  Sparkles, 
  Target, 
  Zap 
} from 'lucide-react';

interface RoadmapViewProps {
  language: Language;
  onOpenTopic: (topicId: string) => void;
  onPracticeTopic: (topicId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  language,
  onOpenTopic,
  onPracticeTopic,
}) => {
  const [selectedStage, setSelectedStage] = useState<StageId>('foundation');
  const [filterSubject, setFilterSubject] = useState<'all' | 'polity' | 'gujarat_history'>('all');

  const stageData = STAGES.find((s) => s.id === selectedStage) || STAGES[1];

  const filteredTopics = TOPIC_NODES.filter((t) => {
    const matchesStage = t.stageId === selectedStage;
    const matchesSubject = filterSubject === 'all' || t.subjectId === filterSubject;
    return matchesStage && matchesSubject;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner / Vision Statement */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950 text-white p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-4 border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'gu'
                ? 'સિલેબસ નેવિગેશન સિસ્ટમ (GPS for Aspirants)'
                : 'GPSC & UPSC Syllabus Knowledge Graph'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            {language === 'gu'
              ? 'શિખાઉથી અધિકારી સુધીનો સ્પષ્ટ, વૈજ્ઞાનિક માર્ગ'
              : 'From Beginner to Civil Servant: The Structured Path'}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            {language === 'gu'
              ? 'અમે માત્ર પીડીએફ કે વિડીયોનો ઢગલો નથી આપતા. અહીં દરેક ટોપિકનું ચોક્કસ વજન, પાછલા વર્ષોના પ્રશ્નો (PYQ) નું જોડાણ અને રિવિઝન સાઇકલ આપમેળે સંચાલિત થાય છે.'
              : 'No more content overload. Every topic is decomposed into its exact exam weightage, historical question frequency, and prerequisite dependencies.'}
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Compass className="w-4 h-4 text-orange-400" />
              <span>{language === 'gu' ? '૫ તબક્કાની સફર' : '5-Stage Architecture'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Target className="w-4 h-4 text-orange-400" />
              <span>{language === 'gu' ? 'PYQ સાથે સીધું જોડાણ' : 'Reverse-Engineered PYQs'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>{language === 'gu' ? 'સક્રિય સ્મૃતિ (Active Recall)' : 'Closed-Loop Retention'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Stepper Navigation */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {language === 'gu' ? 'તમારી તૈયારીનો તબક્કો પસંદ કરો:' : 'Select Learning Stage:'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {STAGES.map((stage, idx) => {
            const isSelected = stage.id === selectedStage;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-3.5 rounded-xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/25 ring-2 ring-orange-500/20'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}>
                    Stage {idx + 1}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-orange-200" />}
                </div>
                <div className="font-bold text-xs line-clamp-1">
                  {language === 'gu' ? stage.nameGu.split(':')[1] : stage.nameEn.split(':')[1]}
                </div>
                <div className={`text-[11px] mt-1 line-clamp-1 ${
                  isSelected ? 'text-orange-100' : 'text-stone-400'
                }`}>
                  {language === 'gu' ? stage.badge : stage.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Stage Overview Card */}
      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
              {stageData.badge}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
              {language === 'gu' ? stageData.nameGu : stageData.nameEn}
            </h3>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
            {language === 'gu' ? stageData.descriptionGu : stageData.descriptionEn}
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setFilterSubject('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterSubject === 'all'
                ? 'bg-orange-600 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {language === 'gu' ? 'બધા વિષયો' : 'All Subjects'}
          </button>
          <button
            onClick={() => setFilterSubject('polity')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterSubject === 'polity'
                ? 'bg-orange-600 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {language === 'gu' ? 'બંધારણ (Polity)' : 'Polity'}
          </button>
          <button
            onClick={() => setFilterSubject('gujarat_history')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterSubject === 'gujarat_history'
                ? 'bg-orange-600 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {language === 'gu' ? 'ગુજરાત ઇતિહાસ' : 'Gujarat History'}
          </button>
        </div>
      </div>

      {/* Topic Nodes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
          <span>{filteredTopics.length} {language === 'gu' ? 'ટોપિક ઉપલબ્ધ છે' : 'Topics in this Stage'}</span>
          <span>{language === 'gu' ? 'ભારાંક સ્કોર (૧-૧૦) અને PYQ સંખ્યા દર્શાવેલ છે' : 'Weightage score & PYQ count indexed'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic) => {
            const hasModule = topic.id === 'topic-f1' || topic.id === 'topic-gh1';

            return (
              <div
                key={topic.id}
                className="group rounded-2xl p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold">
                      {topic.code}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/40">
                        <Zap className="w-3 h-3" />
                        {topic.weightageScore}/10 {language === 'gu' ? 'ભારાંક' : 'Priority'}
                      </span>
                      {topic.pyqCount > 0 && (
                        <span className="font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/40">
                          {topic.pyqCount} PYQs
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Topic Title */}
                  <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {language === 'gu' ? topic.titleGu : topic.titleEn}
                  </h3>

                  {/* Learning Objectives */}
                  <div className="space-y-1.5 mb-5">
                    {(language === 'gu' ? topic.learningObjectivesGu : topic.learningObjectivesEn).map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{topic.estimatedMins} {language === 'gu' ? 'મિનિટ' : 'mins'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPracticeTopic(topic.id)}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Target className="w-3.5 h-3.5 text-orange-600" />
                      <span>{language === 'gu' ? 'PYQ ટેસ્ટ' : 'PYQ'}</span>
                    </button>

                    <button
                      onClick={() => onOpenTopic(topic.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                        hasModule
                          ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{language === 'gu' ? 'વાંચો' : 'Read'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
