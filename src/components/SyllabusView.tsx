'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { 
  GPSC_2026_EXAM_SCHEME, 
  GPSC_PRELIMS_SYLLABUS, 
  GPSC_MAINS_SYLLABUS, 
  SIX_MONTH_STUDY_PLAN 
} from '@/data/gpscOfficialSyllabus2026';
import { 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Layers, 
  Scale, 
  Sparkles 
} from 'lucide-react';

interface SyllabusViewProps {
  language: Language;
  onExploreTopic?: (topicId: string) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({ language }) => {
  const [subTab, setSubTab] = useState<'prelims' | 'mains' | 'timeline'>('prelims');
  const [expandedSubjectIndex, setExpandedSubjectIndex] = useState<number | null>(0);
  const [expandedPaperIndex, setExpandedPaperIndex] = useState<number | null>(0);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-800 to-emerald-700 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <GraduationCap className="w-4 h-4 text-emerald-200" />
          <span>{language === 'gu' ? 'સત્તાવાર અભ્યાસક્રમ ૨૦૨૬-૨૭' : 'Official GPSC & UPSC Master Syllabus 2026–27'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          {language === 'gu' 
            ? 'GPSC ક્લાસ ૧ અને ૨ – સંપૂર્ણ અધિકૃત અભ્યાસક્રમ' 
            : 'GPSC Gujarat Administrative Service, Class 1 & 2 Syllabus'}
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'gu'
            ? 'નવીનતમ ૨૦૨૬-૨૭ પરીક્ષા પદ્ધતિ મુજબ પ્રાથમિક પરીક્ષા (૨૦૦ ગુણ), મુખ્ય પરીક્ષા (૧,૨૫૦ ગુણ મેરિટ) અને ઇન્ટરવ્યુ (૧૫૦ ગુણ) નો વિગતવાર સત્તાવાર અભ્યાસક્રમ.'
            : 'Authoritative breakdown of the latest 2026-27 scheme: Single Prelims Paper (200 marks), 7 Mains Papers (1,250 merit marks), and Interview (150 marks).'}
        </p>

        {/* 2026-27 Exam Scheme Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-white">
            <div className="text-[11px] font-medium text-emerald-200">
              {language === 'gu' ? 'પ્રાથમિક પરીક્ષા (Stage 1)' : 'Prelims Examination'}
            </div>
            <div className="text-xl sm:text-2xl font-black">{GPSC_2026_EXAM_SCHEME.prelimsTotalMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 font-mono mt-0.5">1 Paper • 3 Hours • MCQ</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-white">
            <div className="text-[11px] font-medium text-emerald-200">
              {language === 'gu' ? 'મુખ્ય પરીક્ષા મેરિટ (Stage 2)' : 'Mains Merit Score'}
            </div>
            <div className="text-xl sm:text-2xl font-black">{GPSC_2026_EXAM_SCHEME.mainsMeritMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 font-mono mt-0.5">5 Merit Papers • Descriptive</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-white">
            <div className="text-[11px] font-medium text-emerald-200">
              {language === 'gu' ? 'ઇન્ટરવ્યુ (Stage 3)' : 'Personality Test'}
            </div>
            <div className="text-xl sm:text-2xl font-black">{GPSC_2026_EXAM_SCHEME.interviewMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 font-mono mt-0.5">Viva-Voce Board</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/50 backdrop-blur-xs border border-emerald-400/40 text-emerald-100">
            <div className="text-[11px] font-extrabold text-emerald-300">
              {language === 'gu' ? 'કુલ મેરિટ ગુણ' : 'Final Selection Merit'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{GPSC_2026_EXAM_SCHEME.finalSelectionMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-300 font-mono mt-0.5">Top Merit Selection</div>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200 max-w-fit">
        <button
          onClick={() => setSubTab('prelims')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'prelims'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>{language === 'gu' ? 'પ્રિલિમ્સ ૮ વિષયો (૨૦૦ ગુણ)' : 'Prelims 8 Subjects (200 Marks)'}</span>
        </button>

        <button
          onClick={() => setSubTab('mains')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'mains'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-700" />
          <span>{language === 'gu' ? 'મેઈન્સ ૭ પેપર્સ (૧,૨૫૦ ગુણ)' : 'Mains 7 Papers (1,250 Merit)'}</span>
        </button>

        <button
          onClick={() => setSubTab('timeline')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'timeline'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{language === 'gu' ? '૬-મહિના સ્ટડી પ્લાન' : '6-Month Study Plan'}</span>
        </button>
      </div>

      {/* Tab 1: Prelims 8 Subjects Accordion */}
      {subTab === 'prelims' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
            <strong>{language === 'gu' ? 'નવીનતમ ૨૦૨૬-૨૭ પ્રિલિમ્સ યોજના:' : 'Latest 2026-27 Prelims Pattern:'}</strong>{' '}
            {language === 'gu'
              ? 'ફક્ત એક જ સામાન્ય અભ્યાસ પેપર (૩ કલાક, ૨૦૦ ગુણ). આ ૮ મુખ્ય વિષયોમાંથી સમાન ભારાંશ સાથે હેતુલક્ષી (MCQ) પ્રશ્નો પૂછાય છે.'
              : 'Single General Studies Paper (3 Hours, 200 Marks). Objective-type MCQs covering all 8 subjects proportionately.'}
          </div>

          <div className="space-y-3">
            {GPSC_PRELIMS_SYLLABUS.map((subject, idx) => {
              const isExpanded = expandedSubjectIndex === idx;

              return (
                <div
                  key={subject.id}
                  className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedSubjectIndex(isExpanded ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold flex items-center justify-center shrink-0 text-sm">
                        {subject.subjectNumber}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                          {language === 'gu' ? subject.nameGu : subject.nameEn}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium mt-0.5">
                          {subject.subcategories.length} {language === 'gu' ? 'મુખ્ય પેટા-વિષયો' : 'Core Focus Areas'}
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-100 text-stone-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 space-y-4 bg-stone-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {subject.subcategories.map((cat, cIdx) => (
                          <div key={cIdx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                            <h4 className="text-xs sm:text-sm font-extrabold text-emerald-900 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{language === 'gu' ? cat.titleGu : cat.titleEn}</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs text-stone-600">
                              {(language === 'gu' ? cat.topicsGu : cat.topicsEn).map((t, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                                  <span className="leading-relaxed">{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Mains 7 Papers Breakdown */}
      {subTab === 'mains' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
            <strong>{language === 'gu' ? 'મુખ્ય પરીક્ષા માળખું:' : 'Mains Scheme Rules:'}</strong>{' '}
            {language === 'gu'
              ? 'ગુજરાતી (૩૦૦ ગુણ) અને અંગ્રેજી (૩૦૦ ગુણ) માત્ર ક્વોલિફાઇંગ (પાસિંગ) પેપર્સ છે. મેરિટ માટે નિબંધ (૨૫૦) + સામાન્ય અભ્યાસ ૧ થી ૪ (દરેકના ૨૫૦) = ૧,૨૫૦ ગુણ ગણવામાં આવે છે.'
              : 'Gujarati (300 Marks) & English (300 Marks) are Qualifying only. Final merit is computed strictly on Essay (250) + General Studies 1 to 4 (250 each) = 1,250 Merit Marks.'}
          </div>

          <div className="space-y-3">
            {GPSC_MAINS_SYLLABUS.map((paper, idx) => {
              const isExpanded = expandedPaperIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedPaperIndex(isExpanded ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black ${
                        paper.nature === 'Qualifying'
                          ? 'bg-stone-100 text-stone-700 border border-stone-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {paper.paperNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                            {language === 'gu' ? paper.titleGu : paper.titleEn}
                          </h3>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            paper.nature === 'Qualifying'
                              ? 'bg-stone-200 text-stone-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {paper.nature}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 font-medium mt-0.5">
                          {paper.marks} {language === 'gu' ? 'ગુણ' : 'Marks'} • 3 {language === 'gu' ? 'કલાક' : 'Hours'}
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-100 text-stone-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 space-y-4 bg-stone-50/50">
                      <div className="pt-4 space-y-3">
                        <p className="text-xs text-stone-600 italic">
                          {language === 'gu' ? paper.overviewGu : paper.overviewEn}
                        </p>
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                          {language === 'gu' ? 'મુખ્ય અભ્યાસ વિષયો:' : 'Core Topics Covered in this Paper:'}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(language === 'gu' ? paper.topicsGu : paper.topicsEn).map((top, tIdx) => (
                            <div key={tIdx} className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-medium">{top}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: 6-Month Study Timeline */}
      {subTab === 'timeline' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
            <strong>{language === 'gu' ? 'દૈનિક ૨ થી ૩ કલાક ફાળવણી માળખું:' : '2-3 Hours Daily Structured Roadmap:'}</strong>{' '}
            {language === 'gu'
              ? 'નોકરીયાત અથવા કોલેજિયન ઉમેદવારો માટે શૂન્યથી શરૂ કરીને પ્રિલિમ્સ અને મેઈન્સની સંપૂર્ણ તૈયારીનું ૬-મહિનાનું વ્યવસ્થિત સમયપત્રક.'
              : 'Tested 6-month timetable for working professionals and college students starting from scratch.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIX_MONTH_STUDY_PLAN.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4 hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                    {language === 'gu' ? `મહિનો ${plan.month}` : `Month ${plan.month}`}
                  </span>
                  <span className="text-xs font-bold text-stone-400 font-mono">
                    2-3 {language === 'gu' ? 'કલાક દૈનિક' : 'Hours/day'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {language === 'gu' ? plan.focusGu : plan.focusEn}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {language === 'gu' ? 'સિલેબસ વિષયો:' : 'Syllabus Focus Topics:'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {(language === 'gu' ? plan.subjectsGu : plan.subjectsEn).map((subj, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{subj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-col gap-1 text-[11px]">
                  <span className="text-stone-400 font-bold">{language === 'gu' ? 'લક્ષ્ય માઇલસ્ટોન:' : 'Target Milestone:'}</span>
                  <span className="font-semibold text-emerald-800">{language === 'gu' ? plan.milestonesGu : plan.milestonesEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
