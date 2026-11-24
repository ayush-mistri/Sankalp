'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { 
  FREE_PDF_VAULT, 
  RECOMMENDED_BOOKS_BY_SUBJECT 
} from '@/data/gpscOfficialSyllabus2026';
import { 
  CheckCircle2, 
  Compass, 
  Download, 
  ExternalLink, 
  Filter, 
  Library, 
  Sparkles 
} from 'lucide-react';

interface BooksViewProps {
  language: Language;
}

export const BooksView: React.FC<BooksViewProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'free_vault' | 'booklist_generator'>('free_vault');
  
  // Custom Booklist Generator state
  const [selectedMedium, setSelectedMedium] = useState<'gu' | 'en'>(language === 'gu' ? 'gu' : 'en');
  const [selectedStage, setSelectedStage] = useState<'beginner' | 'revision' | 'mains'>('beginner');

  const filteredBooklist = RECOMMENDED_BOOKS_BY_SUBJECT.map((subj) => {
    let chosenBook = subj.beginnerBookGu;
    if (selectedMedium === 'en') {
      chosenBook = subj.advancedEnglishRef;
    } else if (selectedStage === 'revision') {
      chosenBook = subj.revisionBookGu;
    }

    return {
      subjectEn: subj.subjectEn,
      subjectGu: subj.subjectGu,
      paperTag: subj.paperTag,
      book: chosenBook,
      freeAlternative: subj.freeOfficialAlternative,
    };
  });

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner - White & Emerald */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-800 to-emerald-700 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <Library className="w-4 h-4 text-emerald-200" />
          <span>{language === 'gu' ? '૧૦૦% સત્તાવાર સરકારી પુસ્તકાલય' : '100% Free Official Government Library'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          {language === 'gu' 
            ? 'શ્રેષ્ઠ સંદર્ભ પુસ્તકો અને નિઃશુલ્ક PDF વોલ્ટ' 
            : 'Official Reference Books & Free PDF Vault'}
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'gu'
            ? 'ખાનગી કોચિંગની મોંઘી બુક્સ ખરીદવાની જરૂર નથી. GCERT, NCERT, બજેટ, પાક્ષિક અને કાયદા મંત્રાલયની પ્રમાણિત PDF ડાયરેક્ટ ડાઉનલોડ કરો.'
            : 'Zero-cost preparation: Direct access to authorized government publications (GCERT, NCERT, Constitution, Gujarat Budget, Socio-Economic Review, Pakshik, 2nd ARC).'}
        </p>
      </div>

      {/* Sub-Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200 max-w-fit">
        <button
          onClick={() => setActiveSubTab('free_vault')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'free_vault'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>{language === 'gu' ? `📚 ફ્રી ગવર્નમેન્ટ PDF વોલ્ટ (${FREE_PDF_VAULT.length} સ્ત્રોતો)` : `📚 Free Government PDF Vault (${FREE_PDF_VAULT.length} Sources)`}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('booklist_generator')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'booklist_generator'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Filter className="w-4 h-4 text-emerald-700" />
          <span>{language === 'gu' ? '🎯 સ્માર્ટ બુકલિસ્ટ જનરેટર' : '🎯 Smart Booklist Generator'}</span>
        </button>
      </div>

      {/* View 1: 100% Free Official PDF Vault */}
      {activeSubTab === 'free_vault' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {language === 'gu'
                ? 'આ તમામ લિંક્સ સત્તાવાર સરકારી પોર્ટલ્સ (GSSTB, NCERT, Law Ministry, Finance Dept) પરથી સીધી ચકાસાયેલી છે.'
                : 'All download links connect directly to authorized official government portals (GSSTB, NCERT, Legislative Dept, Finance Dept).'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_PDF_VAULT.map((pdf) => (
              <div
                key={pdf.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:border-emerald-500/80 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Book Jacket Thumbnail */}
                  {pdf.coverImageUrl && (
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                      <img
                        src={pdf.coverImageUrl}
                        alt={pdf.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-xs text-[10px] font-bold text-white">
                        {pdf.medium.toUpperCase()}
                      </div>
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-700 text-[10px] font-bold text-white">
                        {pdf.category}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 line-clamp-1 max-w-[200px]">
                      {language === 'gu' ? pdf.officialPublisherGu : pdf.officialPublisherEn}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px] shrink-0">{pdf.fileSizeApprox}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {language === 'gu' ? pdf.titleGu : pdf.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {language === 'gu' ? pdf.descriptionGu : pdf.descriptionEn}
                  </p>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                    <div className="text-emerald-800 font-bold flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{language === 'gu' ? 'ઉપયોગિતા:' : 'Recommended For:'} {pdf.recommendedFor}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={pdf.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'gu' ? 'સત્તાવાર PDF ડાઉનલોડ કરો' : 'Download Free Official PDF'}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-200 ml-auto" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Custom Smart Booklist Generator */}
      {activeSubTab === 'booklist_generator' && (
        <div className="space-y-6">
          {/* Filter Controls Bar */}
          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Medium Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'gu' ? 'અભ્યાસનું માધ્યમ પસંદ કરો:' : 'Select Preparation Medium:'}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedMedium('gu')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    selectedMedium === 'gu'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  ગુજરાતી માધ્યમ (Gujarati)
                </button>
                <button
                  onClick={() => setSelectedMedium('en')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    selectedMedium === 'en'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  English Medium
                </button>
              </div>
            </div>

            {/* Preparation Stage Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'gu' ? 'તમારી તૈયારીનો તબક્કો:' : 'Your Preparation Phase:'}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner' as const, nameEn: 'Beginner', nameGu: 'પ્રારંભિક' },
                  { id: 'revision' as const, nameEn: 'Revision', nameGu: 'પુનરાવર્તન' },
                  { id: 'mains' as const, nameEn: 'Mains Intensive', nameGu: 'મેઈન્સ' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStage(st.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedStage === st.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    {language === 'gu' ? st.nameGu : st.nameEn}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Generated Booklist Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
              {language === 'gu' ? 'તમારા માટે ખાસ તૈયાર કરેલ પુસ્તક સૂચિ:' : 'Customized Recommended Reading List:'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3 hover:border-emerald-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {item.paperTag}
                      </span>
                      <span className="text-stone-400 font-mono text-[11px]">Subject #{idx + 1}</span>
                    </div>

                    <h4 className="text-base font-bold text-stone-900 leading-snug">
                      {language === 'gu' ? item.subjectGu : item.subjectEn}
                    </h4>

                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        {language === 'gu' ? 'ભલામણ કરેલ પુસ્તક:' : 'Recommended Book:'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-stone-900">
                        {item.book}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{language === 'gu' ? 'સત્તાવાર ફ્રી સ્ત્રોત:' : 'Free Govt Source:'} {item.freeAlternative}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
