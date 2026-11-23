'use client';

import React from 'react';
import { Language } from '@/types';
import { RESOURCE_GUIDES } from '@/data/resourceGuides';
import { 
  BookCheck, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  XCircle 
} from 'lucide-react';

interface ResourceGuideViewProps {
  language: Language;
}

export const ResourceGuideView: React.FC<ResourceGuideViewProps> = ({ language }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
          <BookCheck className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? 'પ્રમાણિત સંદર્ભ સાહિત્ય માર્ગદર્શિકા' : 'Standard Resource Guide'}</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          {language === 'gu'
            ? 'શું વાંચવું અને તેનાથી વધુ અગત્યનું: શું છોડવું?'
            : 'What to Read, and More Importantly: What to Skip?'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
          {language === 'gu'
            ? 'નવા ઉમેદવારોની સૌથી મોટી ભૂલ પુસ્તકોનો ઢગલો કરવી છે. GPSC પાસ કરવા માટે ૧ પુસ્તકનું ૫ વખત પુનરાવર્તન જ સૌથી શક્તિશાળી હથિયાર છે.'
            : 'Civil services preparation is not about reading everything; it is about mastering standard sources and ruthlessly skipping low-yield noise.'}
        </p>
      </div>

      {/* Resource Cards */}
      <div className="space-y-5">
        {RESOURCE_GUIDES.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-5"
          >
            {/* Top Bar: Subject + Book Title + Recommendation Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                  {res.subject}
                </span>
                <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  {res.bookTitle}
                </h2>
                <p className="text-xs text-stone-500">
                  {language === 'gu' ? 'લેખક / સ્ત્રોત:' : 'Author/Source:'} {res.authorOrSource} • {res.targetExam}
                </p>
              </div>

              <div>
                {res.recommendation === 'essential' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'gu' ? 'અનિવાર્ય પુસ્તક (Must Read)' : 'Essential Core'}</span>
                  </span>
                )}
                {res.recommendation === 'selective' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'gu' ? 'પસંદગીયુક્ત વાંચન (Selective)' : 'Selective Read'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Split: What to Read vs What to Skip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What to Read */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'gu' ? 'આ પ્રકરણો અચૂક વાંચો:' : 'What to Read (High-Yield):'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {language === 'gu' ? res.whatToReadGu : res.whatToReadEn}
                </p>
              </div>

              {/* What to Skip */}
              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>{language === 'gu' ? 'આ ભાગો વાંચવામાં સમય ન બગાડો:' : 'What to Skip (Low-Yield / Noise):'}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {language === 'gu' ? res.whatToSkipGu : res.whatToSkipEn}
                </p>
              </div>
            </div>

            {/* Strategic Rationale */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-400">
              <strong className="text-stone-900 dark:text-stone-200 font-semibold">
                {language === 'gu' ? 'પરીક્ષકની દ્રષ્ટિએ તર્ક:' : 'Examiner Rationale:'}
              </strong>{' '}
              {language === 'gu' ? res.rationaleGu : res.rationaleEn}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
