'use client';

import React, { useState } from 'react';
import { Language, StageId, SubjectId } from '@/types';
import { STAGES, TOPIC_NODES, SUBJECT_METADATA } from '@/data/syllabusData';
import { LEARNING_MODULES } from '@/data/learningModules';
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
  const [filterSubject, setFilterSubject] = useState<'all' | SubjectId>('all');

  const stageData = STAGES.find((s) => s.id === selectedStage) || STAGES[1];

  const filteredTopics = TOPIC_NODES.filter((t) => {
    const matchesStage = t.stageId === selectedStage;
    const matchesSubject = filterSubject === 'all' || t.subjectId === filterSubject;
    return matchesStage && matchesSubject;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner with Clean Deep Forest & White */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white p-7 sm:p-10 shadow-xl border border-emerald-900/40">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'gu'
                ? 'સિલેબસ નેવિગેશન સિસ્ટમ (GPS for Aspirants)'
                : 'GPSC & UPSC Syllabus Knowledge Graph'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            {language === 'gu'
              ? 'શિખાઉથી અધિકારી સુધીનો સ્પષ્ટ, વૈજ્ઞાનિક માર્ગ'
              : 'From Beginner to Civil Servant: The Structured Path'}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
            {language === 'gu'
              ? 'અમે માત્ર પીડીએફ કે વિડીયોનો ઢગલો નથી આપતા. અહીં દરેક ટોપિકનું ચોક્કસ વજન, પાછલા વર્ષોના પ્રશ્નો (PYQ) નું જોડાણ અને રિવિઝન સાઇકલ આપમેળે સંચાલિત થાય છે.'
              : 'No more content overload. Every topic is decomposed into its exact exam weightage, historical question frequency, and prerequisite dependencies.'}
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>{language === 'gu' ? '૫ તબક્કાની સફર' : '5-Stage Architecture'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>{language === 'gu' ? 'PYQ સાથે સીધું જોડાણ' : 'Reverse-Engineered PYQs'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{language === 'gu' ? 'સક્રિય સ્મૃતિ (Active Recall)' : 'Closed-Loop Retention'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Stepper Navigation */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
            {language === 'gu' ? 'તમારી તૈયારીનો તબક્કો પસંદ કરો:' : 'Select Learning Stage:'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STAGES.map((stage, idx) => {
            const isSelected = stage.id === selectedStage;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-2xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/25 ring-2 ring-emerald-600/20'
                    : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    Stage {idx + 1}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-emerald-200" />}
                </div>
                <div className="font-bold text-xs line-clamp-1">
                  {language === 'gu' ? stage.nameGu.split(':')[1] : stage.nameEn.split(':')[1]}
                </div>
                <div className={`text-[11px] mt-1 line-clamp-1 ${
                  isSelected ? 'text-emerald-100' : 'text-stone-400'
                }`}>
                  {stage.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Stage Overview Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-700">
              {stageData.badge}
            </span>
            <span className="text-stone-300">•</span>
            <h3 className="font-extrabold text-base text-stone-900">
              {language === 'gu' ? stageData.nameGu : stageData.nameEn}
            </h3>
          </div>
          <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
            {language === 'gu' ? stageData.descriptionGu : stageData.descriptionEn}
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-semibold max-w-full">
          <button
            onClick={() => setFilterSubject('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterSubject === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-white/70'
            }`}
          >
            {language === 'gu' ? 'બધા વિષયો' : 'All Subjects'}
          </button>
          {SUBJECT_METADATA.map((sub) => {
            const isSubSelected = filterSubject === sub.id;
            const countInStage = TOPIC_NODES.filter(
              (t) => t.stageId === selectedStage && t.subjectId === sub.id
            ).length;

            return (
              <button
                key={sub.id}
                onClick={() => setFilterSubject(sub.id)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isSubSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-white/70'
                }`}
              >
                <span>{language === 'gu' ? sub.nameGu.split(' ')[0] : sub.nameEn.split(' ')[0]}</span>
                {countInStage > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSubSelected ? 'bg-white/25 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {countInStage}
                  </span>
                )}
              </button>
            );
          })}
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
            const hasModule = Boolean(LEARNING_MODULES[topic.id]);

            return (
              <div
                key={topic.id}
                className="group rounded-2xl p-6 bg-white border border-stone-200 hover:border-emerald-500/70 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold">
                        {topic.code}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {topic.paperCategory}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        <Zap className="w-3 h-3 text-emerald-600" />
                        {topic.weightageScore}/10 {language === 'gu' ? 'ભારાંક' : 'Priority'}
                      </span>
                      {topic.pyqCount > 0 && (
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {topic.pyqCount} PYQs
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Topic Title */}
                  <h3 className="font-extrabold text-base text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {language === 'gu' ? topic.titleGu : topic.titleEn}
                  </h3>

                  {/* Learning Objectives */}
                  <div className="space-y-1.5 mb-5">
                    {(language === 'gu' ? topic.learningObjectivesGu : topic.learningObjectivesEn).map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{topic.estimatedMins} {language === 'gu' ? 'મિનિટ' : 'mins'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPracticeTopic(topic.id)}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-emerald-50 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Target className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'gu' ? 'PYQ ટેસ્ટ' : 'PYQ'}</span>
                    </button>

                    <button
                      onClick={() => onOpenTopic(topic.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                        hasModule
                          ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{hasModule ? (language === 'gu' ? 'વાંચો' : 'Read') : (language === 'gu' ? 'ટૂંકનોંધ' : 'Overview')}</span>
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
