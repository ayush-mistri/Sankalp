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
      
      {/* Header in Deep Green & White */}
      <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white border border-emerald-900/40 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <BookCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'gu' ? 'પ્રમાણિત સંદર્ભ સાહિત્ય માર્ગદર્શિકા' : 'Standard Resource Guide'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
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
            className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5"
          >
            {/* Top Bar: Subject + Book Title + Recommendation Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase tracking-wider">
                  {res.subject}
                </span>
                <h2 className="text-lg font-extrabold text-stone-900">
                  {res.bookTitle}
                </h2>
                <p className="text-xs text-stone-500">
                  {language === 'gu' ? 'લેખક / સ્ત્રોત:' : 'Author/Source:'} {res.authorOrSource} • {res.targetExam}
                </p>
              </div>

              <div>
                {res.recommendation === 'essential' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'gu' ? 'અનિવાર્ય પુસ્તક (Must Read)' : 'Essential Core'}</span>
                  </span>
                )}
                {res.recommendation === 'selective' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'gu' ? 'પસંદગીયુક્ત વાંચન (Selective)' : 'Selective Read'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Split: What to Read vs What to Skip in Green & Neutral */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What to Read */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'gu' ? 'આ પ્રકરણો અચૂક વાંચો:' : 'What to Read (High-Yield):'}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {language === 'gu' ? res.whatToReadGu : res.whatToReadEn}
                </p>
              </div>

              {/* What to Skip */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-800">
                  <XCircle className="w-4 h-4 text-stone-500" />
                  <span>{language === 'gu' ? 'આ ભાગો વાંચવામાં સમય ન બગાડો:' : 'What to Skip (Low-Yield / Noise):'}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {language === 'gu' ? res.whatToSkipGu : res.whatToSkipEn}
                </p>
              </div>
            </div>

            {/* Strategic Rationale */}
            <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100 text-xs text-stone-600">
              <strong className="text-emerald-950 font-semibold">
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
