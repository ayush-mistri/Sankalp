'use client';

import React from 'react';
import { Language } from '@/types';
import { 
  AlertCircle, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Zap 
} from 'lucide-react';

interface ReadinessViewProps {
  language: Language;
  onFixWeakArea: (topicId: string) => void;
}

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  language,
  onFixWeakArea,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Overview in Deep Forest & Emerald */}
      <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white border border-emerald-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'gu' ? 'પરીક્ષા સજ્જતા ઇન્ડેક્સ (SRI)' : 'Student Readiness Index'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              {language === 'gu' ? 'તમારું પરીક્ષા સજ્જતા સ્તર: ૭૪%' : 'Your Exam Readiness Score: 74%'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              {language === 'gu'
                ? 'આ સ્કોર માત્ર વિડીયો જોવાથી નથી બનતો, પરંતુ સિલેબસ કવરેજ, એક્ટિવ રીકોલ રીટેન્શન અને નેગેટિવ માર્કિંગ નિયંત્રણનું ગાણિતિક મૂલ્યાંકન છે.'
                : 'A mathematically validated index tracking syllabus completion, active recall retention, elimination accuracy, and negative marking discipline.'}
            </p>
          </div>

          {/* Large Readiness Circular Indicator */}
          <div className="w-28 h-28 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex flex-col items-center justify-center shrink-0 bg-stone-800/80 shadow-inner">
            <span className="text-3xl font-black text-emerald-400">74%</span>
            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
              {language === 'gu' ? 'સજ્જતા' : 'Readiness'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Readiness Pillars in Green & White */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>{language === 'gu' ? 'સિલેબસ કવરેજ' : 'Syllabus'}</span>
            <Layers className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">82%</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {language === 'gu' ? '૧૮/૨૨ ટોપિક્સ પૂર્ણ' : '18/22 Topics Done'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>{language === 'gu' ? 'સ્મૃતિ સાતત્ય' : 'Retention'}</span>
            <Zap className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">78%</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {language === 'gu' ? 'Spaced Recall સાઇકલ' : 'On-schedule'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>{language === 'gu' ? 'PYQ સચોટતા' : 'PYQ Accuracy'}</span>
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">71%</div>
          <div className="text-[11px] text-stone-500 font-semibold">
            {language === 'gu' ? '૯૨ પ્રશ્નો ઉકેલ્યા' : '92 Solved'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>{language === 'gu' ? 'નેગેટિવ બચાવ' : 'Risk Control'}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">84%</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {language === 'gu' ? 'તુક્કા નિયંત્રણ સંતોષકારક' : 'Low Penalty Risk'}
          </div>
        </div>
      </div>

      {/* Weak-Area Diagnostic Radar */}
      <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <AlertCircle className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'gu' ? 'તમારા નબળા ક્ષેત્રો (Weak Area Diagnostic)' : 'Identified Weak Areas Requiring Attention'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'gu'
                  ? 'આ ટોપિક્સમાં તમારી એક્યુરેસી ૫૦% થી ઓછી છે. આના પર ધ્યાન આપવાથી સીધા ૧૨-૧૫ માર્ક્સ વધી શકે છે.'
                  : 'Topics with accuracy under 50%. Remediating these can boost your Prelims score by 12-15 marks.'}
              </p>
            </div>
          </div>
        </div>

        {/* Weak Topic Items */}
        <div className="space-y-3">
          <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-900">POL-202 (Article 32 & 226 Writs)</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  Accuracy: 42%
                </span>
              </div>
              <p className="text-xs text-stone-600">
                {language === 'gu'
                  ? 'ભૂલનું કારણ: સર્વોચ્ચ અદાલતની રિટ સત્તા અને વહીવટી અધિકારી સામે ઉત્પ્રેક્ષણ (Certiorari) વચ્ચે મૂંઝવણ.'
                  : 'Diagnostic: Confusion regarding administrative vs judicial scope of Certiorari vs Prohibition.'}
              </p>
            </div>
            <button
              onClick={() => onFixWeakArea('topic-f1')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
            >
              <span>{language === 'gu' ? 'આ નબળાઈ સુધારો' : 'Remediate Topic'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-900">GUJ-202 (Solanki Era Architecture)</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  Accuracy: 48%
                </span>
              </div>
              <p className="text-xs text-stone-600">
                {language === 'gu'
                  ? 'ભૂલનું કારણ: રાણકી વાવના સ્થાપત્ય સ્તરો અને મોઢેરા સૂર્યમંદિરના સભા મંડપ વચ્ચે તથ્યાત્મક મિશ્રણ.'
                  : 'Diagnostic: Factual mixing between structural layers of Rani ki Vav and Modhera Sun Temple.'}
              </p>
            </div>
            <button
              onClick={() => onFixWeakArea('topic-gh1')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
            >
              <span>{language === 'gu' ? 'રિવિઝન શરૂ કરો' : 'Start Revision'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
