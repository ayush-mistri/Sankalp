'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { CURRENT_AFFAIRS } from '@/data/currentAffairs';
import { 
  Newspaper, 
  PenTool, 
  Sparkles, 
  Tag 
} from 'lucide-react';

interface CurrentAffairsViewProps {
  language: Language;
}

type FilterPaperType = 'all' | 'GS-1' | 'GS-2' | 'GS-3';

export const CurrentAffairsView: React.FC<CurrentAffairsViewProps> = ({ language }) => {
  const [selectedPaper, setSelectedPaper] = useState<FilterPaperType>('all');

  const filteredItems = CURRENT_AFFAIRS.filter((item) => {
    return selectedPaper === 'all' || item.gsPaper === selectedPaper;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <Newspaper className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? 'દૈનિક વર્તમાન પ્રવાહો - સિલેબસ લિંક્ડ' : 'Syllabus-Anchored Current Affairs'}</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          {language === 'gu'
            ? 'અસંબંધિત સમાચારો છોડો, માત્ર સિલેબસ-સંબંધિત ઘટનાઓ વાંચો'
            : 'No Random News. Only Events Mapped to GPSC GS Papers.'}
        </h1>
        <p className="text-xs sm:text-sm text-orange-100 max-w-2xl leading-relaxed">
          {language === 'gu'
            ? 'અહીં દરેક સમાચારને તેના GS પેપર, પ્રિલિમ્સ સંભવિત પ્રશ્ન અને મેઈન્સ ઉત્તરલેખનના મુદ્દા સાથે સાંકળવામાં આવેલ છે.'
            : 'Every news brief is anchored to an official GS syllabus topic, complete with a Prelims factual angle and a Mains analytical thought prompt.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all' as FilterPaperType, labelEn: 'All Papers', labelGu: 'બધા પેપર્સ' },
          { id: 'GS-1' as FilterPaperType, labelEn: 'GS-1: History & Heritage', labelGu: 'GS-1: ઇતિહાસ અને વારસો' },
          { id: 'GS-2' as FilterPaperType, labelEn: 'GS-2: Polity & Governance', labelGu: 'GS-2: બંધારણ અને શાસન' },
          { id: 'GS-3' as FilterPaperType, labelEn: 'GS-3: Economy & Science', labelGu: 'GS-3: અર્થતંત્ર અને વિજ્ઞાન' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPaper(tab.id)}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap border ${
              selectedPaper === tab.id
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300'
            }`}
          >
            {language === 'gu' ? tab.labelGu : tab.labelEn}
          </button>
        ))}
      </div>

      {/* News Cards List */}
      <div className="space-y-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 hover:border-orange-500/40 transition-all"
          >
            {/* Top Bar: Paper Badge + Syllabus Anchor */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-extrabold">
                  {item.gsPaper}
                </span>
                <span className="flex items-center gap-1 font-mono text-stone-500">
                  <Tag className="w-3 h-3 text-orange-500" />
                  {language === 'gu' ? item.topicTagGu : item.topicTagEn}
                </span>
              </div>
              <span className="text-stone-400 font-medium">{item.date}</span>
            </div>

            {/* Headline */}
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
              {language === 'gu' ? item.headlineGu : item.headlineEn}
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {language === 'gu' ? item.summaryGu : item.summaryEn}
            </p>

            {/* Prelims & Mains Dual Anchor Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {/* Prelims Box */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'gu' ? 'પ્રિલિમ્સ મહત્વ (Prelims Angle):' : 'Prelims Focus:'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-[11px]">
                  {language === 'gu' ? item.prelimsAngleGu : item.prelimsAngleEn}
                </p>
              </div>

              {/* Mains Box */}
              <div className="p-3.5 rounded-xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-orange-800 dark:text-orange-300">
                  <PenTool className="w-3.5 h-3.5 text-orange-600" />
                  <span>{language === 'gu' ? 'મેઈન્સ ઉત્તરલેખન પ્રશ્ન (Mains Angle):' : 'Mains Thought Prompt:'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed italic text-[11px]">
                  {language === 'gu' ? item.mainsAngleGu : item.mainsAngleEn}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
