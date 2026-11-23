'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { 
  GPSC_PRELIMS_SYLLABUS, 
  GPSC_MAINS_SYLLABUS, 
  FREE_PDF_VAULT, 
  SIX_MONTH_STUDY_PLAN
} from '@/data/gpscOfficialSyllabus2026';
import { 
  BookCheck, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  ExternalLink, 
  FileText, 
  Layers, 
  Search, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

interface ResourceGuideViewProps {
  language: Language;
}

type SubTab = 'free_pdfs' | 'generator' | 'prelims_syllabus' | 'mains_syllabus' | 'study_plan';

export const ResourceGuideView: React.FC<ResourceGuideViewProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('free_pdfs');
  const [pdfMediumFilter, setPdfMediumFilter] = useState<'all' | 'gu' | 'en'>('all');
  const [searchPdfQuery, setSearchPdfQuery] = useState('');
  const [expandedPrelimsSubject, setExpandedPrelimsSubject] = useState<string>('pre-sub-1');
  const [expandedMainsPaper, setExpandedMainsPaper] = useState<string>('Paper 1');

  // Booklist Generator State
  const [genMedium, setGenMedium] = useState<'gu' | 'en' | 'both'>('gu');
  const [genBudget, setGenBudget] = useState<'free_only' | 'moderate' | 'flexible'>('free_only');
  const [genLevel, setGenLevel] = useState<'beginner' | 'intermediate' | 'revision'>('beginner');
  const [genType, setGenType] = useState<'all' | 'books_only' | 'free_pdfs_only'>('all');
  const [generatedListReady, setGeneratedListReady] = useState(false);

  // Filtered PDFs
  const filteredPdfs = FREE_PDF_VAULT.filter((pdf) => {
    const matchesMedium = pdfMediumFilter === 'all' || pdf.medium === pdfMediumFilter || pdf.medium === 'bilingual';
    const matchesSearch = 
      pdf.titleEn.toLowerCase().includes(searchPdfQuery.toLowerCase()) ||
      pdf.titleGu.toLowerCase().includes(searchPdfQuery.toLowerCase()) ||
      pdf.officialPublisherEn.toLowerCase().includes(searchPdfQuery.toLowerCase()) ||
      pdf.category.toLowerCase().includes(searchPdfQuery.toLowerCase());
    return matchesMedium && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Header with Clean Green & White Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white p-7 sm:p-10 shadow-xl border border-emerald-900/40">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <BookCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === 'gu'
                ? 'સત્તાવાર GPSC ૨૦૨૬-૨૭ યોજના • ફ્રી સરકારી PDF હબ'
                : 'GPSC 2026-27 Official Scheme • Free Official PDF Hub'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            {language === 'gu'
              ? 'GPSC વર્ગ ૧ અને ૨ – સંપૂર્ણ અભ્યાસક્રમ અને પ્રમાણિત ફ્રી પુસ્તકો'
              : 'GPSC Class 1 & 2 – Complete Syllabus & Free Book Vault'}
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {language === 'gu'
              ? 'પુસ્તકોનો ઢગલો કરવાના બદલે સત્તાવાર ૨૦૨૬-૨૭ ની પરીક્ષા પદ્ધતિ અનુસાર અભ્યાસ કરો. અહીં પ્રિલિમ્સ (૨૦૦ ગુણ), મેઈન્સ (૭ પેપર્સ, ૧,૮૫૦ ગુણ) નો ટોપ-ટુ-બોટમ સિલેબસ અને ૧૦૦% મફત સરકારી PDF ઉપલબ્ધ છે.'
              : 'Prepare strictly according to the updated 2026-27 scheme. Access top-to-bottom Prelims and Mains topic breakdowns and direct 100% free official textbook PDFs.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-stone-200">
            <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10">
              <span className="block text-emerald-300 font-extrabold text-sm sm:text-base">૨૦૦ ગુણ</span>
              <span className="text-[11px] text-stone-300">{language === 'gu' ? 'પ્રિલિમ્સ (૧ પેપર, ૩ કલાક)' : 'Prelims (1 Paper, 3 Hrs)'}</span>
            </div>
            <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10">
              <span className="block text-emerald-300 font-extrabold text-sm sm:text-base">૧,૨૫૦ ગુણ</span>
              <span className="text-[11px] text-stone-300">{language === 'gu' ? 'મેઈન્સ મેરિટ (૫ પેપર્સ)' : 'Mains Merit (5 Papers)'}</span>
            </div>
            <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10">
              <span className="block text-emerald-300 font-extrabold text-sm sm:text-base">૬૦૦ ગુણ</span>
              <span className="text-[11px] text-stone-300">{language === 'gu' ? 'ગુજરાતી/અંગ્રેજી (ક્વોલિફાઇંગ)' : 'Guj/Eng (Qualifying)'}</span>
            </div>
            <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10">
              <span className="block text-emerald-300 font-extrabold text-sm sm:text-base">૧૫૦ ગુણ</span>
              <span className="text-[11px] text-stone-300">{language === 'gu' ? 'ઇન્ટરવ્યૂ (કુલ ૧,૪૦૦ મેરિટ)' : 'Interview (Total 1,400)'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('free_pdfs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'free_pdfs'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white/70'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '📚 ફ્રી સરકારી PDF હબ' : '📚 Free PDF Vault'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('generator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'generator'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white/70'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '🎯 સ્માર્ટ બુકલિસ્ટ જનરેટર' : '🎯 Booklist Generator'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('prelims_syllabus')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'prelims_syllabus'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white/70'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '📋 પ્રિલિમ્સ અભ્યાસક્રમ (૮ વિષય)' : '📋 Prelims Syllabus (8 Subjects)'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mains_syllabus')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'mains_syllabus'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white/70'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '✍️ મેઈન્સ અભ્યાસક્રમ (૭ પેપર્સ)' : '✍️ Mains Syllabus (7 Papers)'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('study_plan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'study_plan'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white/70'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'gu' ? '🗓️ ૬-મહિનાનો રોડમેપ' : '🗓️ 6-Month Plan'}</span>
        </button>
      </div>

      {/* ================= TAB 1: FREE PDF VAULT ================= */}
      {activeSubTab === 'free_pdfs' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'gu' ? 'પુસ્તક, GCERT, સરકારી અહેવાલ કે વિષય શોધો...' : 'Search GCERT, NCERT, government report or subject...'}
                value={searchPdfQuery}
                onChange={(e) => setSearchPdfQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-semibold">
              <span className="text-stone-500">{language === 'gu' ? 'માધ્યમ:' : 'Medium:'}</span>
              <button
                onClick={() => setPdfMediumFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  pdfMediumFilter === 'all'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'gu' ? 'બધા' : 'All'}
              </button>
              <button
                onClick={() => setPdfMediumFilter('gu')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  pdfMediumFilter === 'gu'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                onClick={() => setPdfMediumFilter('en')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  pdfMediumFilter === 'en'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      {pdf.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {language === 'gu' ? '૧૦૦% મફત અધિકૃત PDF' : '100% Free Official'}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                    {language === 'gu' ? pdf.titleGu : pdf.titleEn}
                  </h3>

                  <p className="text-xs text-stone-500 font-medium">
                    {language === 'gu' ? 'પ્રકાશક:' : 'Publisher:'} {language === 'gu' ? pdf.officialPublisherGu : pdf.officialPublisherEn}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {language === 'gu' ? pdf.descriptionGu : pdf.descriptionEn}
                  </p>

                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-[11px] text-stone-600">
                    <span className="font-bold text-stone-900">{language === 'gu' ? 'ઉપયોગિતા:' : 'Yield:'} </span>
                    {pdf.recommendedFor}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400">
                    {pdf.fileType} • {pdf.fileSizeApprox}
                  </span>

                  <a
                    href={pdf.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'gu' ? 'મફત ડાઉનલોડ / જુઓ' : 'Download Free PDF'}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Standard Subject Books Comparison Table */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'gu'
                  ? 'પ્રમાણિત સંદર્ભ પુસ્તકો અને તેના મફત સરકારી વિકલ્પો (What to Read vs Free Alternative)'
                  : 'Standard Reference Books & Free Government Equivalents'}
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700 border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-900 font-extrabold">
                    <th className="p-3">{language === 'gu' ? 'વિષય' : 'Subject'}</th>
                    <th className="p-3">{language === 'gu' ? 'પ્રમાણિત પુસ્તક' : 'Standard Book'}</th>
                    <th className="p-3">{language === 'gu' ? 'મફત સરકારી સ્ત્રોત (Free PDF)' : 'Free Official Equivalent'}</th>
                    <th className="p-3">{language === 'gu' ? 'વિદ્યાર્થીઓ માટે સલાહ' : 'Aspirant Advice'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">બંધારણ (Polity)</td>
                    <td className="p-3 font-semibold">M. Laxmikanth</td>
                    <td className="p-3 text-emerald-700 font-bold">ભારતનું મૂળ બંધારણ (કાયદા મંત્રાલય PDF) + GCERT</td>
                    <td className="p-3 text-stone-600">પ્રથમ GCERT અને મૂળ કલમો સમજો, પછી લક્ષ્મીકાંતના સિલેક્ટેડ ચેપ્ટર વાંચો.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">આધુનિક ઇતિહાસ (History)</td>
                    <td className="p-3 font-semibold">Spectrum (Rajiv Ahir)</td>
                    <td className="p-3 text-emerald-700 font-bold">GCERT ધોરણ ૮ થી ૧૨ + NCERT Modern India</td>
                    <td className="p-3 text-stone-600">GCERT ઇતિહાસ આધારિત છે. સ્પેક્ટ્રમ માત્ર રિવિઝન માટે ઉપયોગી છે.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">અર્થતંત્ર (Economy)</td>
                    <td className="p-3 font-semibold">Ramesh Singh / Sanjiv Verma</td>
                    <td className="p-3 text-emerald-700 font-bold">ગુજરાત બજેટ + Socio-Economic Review PDF</td>
                    <td className="p-3 text-stone-600">GPSC ના ૭૦% આર્થિક પ્રશ્નો રાજ્ય સરકારના અહેવાલો અને યોજનાઓમાંથી પૂછાય છે.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">ભૂગોળ (Geography)</td>
                    <td className="p-3 font-semibold">Oxford Student Atlas</td>
                    <td className="p-3 text-emerald-700 font-bold">GCERT ભૂગોળ + ISRO Bhuvan Portal</td>
                    <td className="p-3 text-stone-600">ગુજરાતના નકશા, નદીઓ અને અભયારણ્યો એટલાસમાંથી જ તૈયાર કરો.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">નીતિશાસ્ત્ર (Ethics GS-4)</td>
                    <td className="p-3 font-semibold">Lexicon for Ethics</td>
                    <td className="p-3 text-emerald-700 font-bold">2nd ARC Report 4 (&quot;Ethics in Governance&quot;)</td>
                    <td className="p-3 text-stone-600">કોઈપણ ખાનગી પુસ્તક કરતાં ARC-2 અહેવાલ વધુ પ્રમાણિત માળખું પૂરું પાડે છે.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SMART BOOKLIST GENERATOR ================= */}
      {activeSubTab === 'generator' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{language === 'gu' ? 'તમારો બજેટ અને માધ્યમ અનુસાર પર્સનલાઇઝ્ડ પ્લાન' : 'Custom Tailored Booklist'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {language === 'gu' ? 'તમારી આખરી GPSC પુસ્તક યાદી નક્કી કરો' : 'Finalize Your GPSC Booklist'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'gu'
                  ? 'અनावश्यक પુસ્તકો ખરીદીને નાણાં કે સમય ન વેડફો. નીચે ૪ પ્રશ્નોના જવાબ આપો:'
                  : 'Answer these 4 questions to generate your optimal, clutter-free booklist:'}
              </p>
            </div>

            {/* Question 1: Medium */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                1. {language === 'gu' ? 'તમે કયા માધ્યમમાં તૈયારી કરવા માંગો છો?' : 'Which medium do you want to study in?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGenMedium('gu')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genMedium === 'gu'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">ગુજરાતી માધ્યમ</div>
                  <div className="text-[11px] opacity-80 mt-0.5">GCERT + ગુજરાતી સંદર્ભ સાહિત્ય</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenMedium('en')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genMedium === 'en'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">English Medium</div>
                  <div className="text-[11px] opacity-80 mt-0.5">NCERT + Standard References</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenMedium('both')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genMedium === 'both'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">દ્વિભાષી (Gujarati + English)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">ગુજરાતી પુસ્તકો + અંગ્રેજી સંદર્ભ</div>
                </button>
              </div>
            </div>

            {/* Question 2: Budget */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                2. {language === 'gu' ? 'તમારું પુસ્તક બજેટ કેટલું છે?' : 'What is your book budget?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGenBudget('free_only')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genBudget === 'free_only'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">₹0 શૂન્ય બજેટ (100% Free PDFs)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">માત્ર સરકારી પુસ્તકો & ફ્રી પોર્ટલ</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenBudget('moderate')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genBudget === 'moderate'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">મધ્યમ બજેટ (Moderate)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">માત્ર અનિવાર્ય ૧-૨ પુસ્તકો + બાકી PDF</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenBudget('flexible')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genBudget === 'flexible'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">સરળ બજેટ (Flexible)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">સર્વશ્રેષ્ઠ પ્રિન્ટેડ પુસ્તકો + PDF</div>
                </button>
              </div>
            </div>

            {/* Question 3: Level */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                3. {language === 'gu' ? 'તમારો તૈયારીનો તબક્કો કયો છે?' : 'What is your current preparation level?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGenLevel('beginner')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genLevel === 'beginner'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">શિખાઉ (Beginner)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">શૂન્યથી શરૂઆત (Start from zero)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenLevel('intermediate')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genLevel === 'intermediate'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">મધ્યવર્તી (Intermediate)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">પાયાના વિષયોનું જ્ઞાન છે</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenLevel('revision')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genLevel === 'revision'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">પુનરાવર્તન (Revision & Practice)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">મોક ટેસ્ટ & ઝડપી રિવિઝન</div>
                </button>
              </div>
            </div>

            {/* Question 4: Resource Preference */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
                4. {language === 'gu' ? 'તમે કેવા સાહિત્યને પ્રાધાન્ય આપો છો?' : 'What resources do you prefer?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGenType('all')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genType === 'all'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">પુસ્તકો + ફ્રી સરકારી PDF</div>
                  <div className="text-[11px] opacity-80 mt-0.5">હાઇબ્રિડ સંતુલિત અભ્યાસ</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenType('free_pdfs_only')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genType === 'free_pdfs_only'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">માત્ર ફ્રી સરકારી PDF</div>
                  <div className="text-[11px] opacity-80 mt-0.5">૧૦૦% ડિજિટલ નિઃશુલ્ક સાધન</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGenType('books_only')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    genType === 'books_only'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-extrabold">માત્ર પ્રમાણિત પુસ્તકો</div>
                  <div className="text-[11px] opacity-80 mt-0.5">હાર્ડકોપી રીડિંગ પ્રાધાન્ય</div>
                </button>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setGeneratedListReady(true)}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{language === 'gu' ? 'મારી કસ્ટમાઇઝ્ડ પુસ્તક યાદી તૈયાર કરો' : 'Generate My Tailored GPSC Booklist'}</span>
              </button>
            </div>
          </div>

          {/* Generated Result Container */}
          {generatedListReady && (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div>
                  <span className="text-xs font-bold text-emerald-800">
                    {language === 'gu' ? 'તમારો વ્યક્તિગત અભ્યાસ સંગ્રહ:' : 'Your Custom Study Stack:'}
                  </span>
                  <h3 className="text-lg font-black text-stone-900">
                    {genMedium === 'gu' ? 'ગુજરાતી માધ્યમ' : genMedium === 'en' ? 'English Medium' : 'Bilingual'} • {genBudget === 'free_only' ? '₹0 શૂન્ય બજેટ (100% Free)' : 'સિલેક્ટેડ સ્ત્રોત'}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold">
                  {language === 'gu' ? 'તૈયાર છે' : 'Verified Stack'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>૧. પાયાનું સાહિત્ય (Foundation Layer)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {genMedium === 'gu' 
                      ? 'GCERT ધોરણ ૬ થી ૧૨ સામાજિક વિજ્ઞાન, ઇતિહાસ, ભૂગોળ અને સામાન્ય વિજ્ઞાન (સંપૂર્ણ મફત PDF ઉપલબ્ધ છે).'
                      : 'NCERT Classes 6 to 12 Social Science, History, Geography, Polity (Free official PDF).'}
                  </p>
                  <a
                    href="https://gujarat-education.gov.in/textbook/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>{language === 'gu' ? 'GCERT ફ્રી પોર્ટલ ખોલો' : 'Access GCERT Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>૨. બંધારણ & શાસન (Polity Layer)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {genBudget === 'free_only'
                      ? 'ભારત સરકાર કાયદા મંત્રાલય દ્વારા પ્રકાશિત મૂળ બંધારણ PDF (Articles 1-395) + સંકલ્પ ઇન્ટરેક્ટિવ રીડર.'
                      : 'M. Laxmikanth (પસંદગીયુક્ત પ્રકરણ ૧-૨૫) + બંધારણ Bare Text PDF.'}
                  </p>
                  <a
                    href="https://legislative.gov.in/constitution-of-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>{language === 'gu' ? 'મૂળ બંધારણ PDF ડાઉનલોડ' : 'Download Bare Constitution PDF'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>૩. ગુજરાત અર્થતંત્ર & યોજનાઓ (Economy Layer)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    ગુજરાત સરકારનું બજેટ + સામાજિક-આર્થિક સમીક્ષા (Socio-Economic Review PDF) + ગુજરાત પાક્ષિક અંકો.
                  </p>
                  <a
                    href="https://budget.gujarat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>{language === 'gu' ? 'ગુજરાત બજેટ પોર્ટલ' : 'Access Gujarat Budget Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>૪. વર્તમાન પ્રવાહો (Current Affairs Layer)</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    PIB (પ્રેસ ઇન્ફર્મેશન બ્યુરો) દૈનિક અપડેટ્સ + ગુજરાત પાક્ષિક (દર મહિને ૨ વાર) + સંકલ્પ ડેઈલી રડાર.
                  </p>
                  <a
                    href="https://pib.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>{language === 'gu' ? 'PIB સત્તાવાર પોર્ટલ' : 'Access PIB Releases'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: PRELIMS SYLLABUS ================= */}
      {activeSubTab === 'prelims_syllabus' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between text-xs">
            <span className="font-extrabold text-stone-800">
              {language === 'gu' ? 'પ્રાથમિક પરીક્ષા (Prelims) – કુલ ૨૦૦ ગુણ • ૩ કલાક' : 'Preliminary Examination – 200 Marks • 3 Hours'}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {GPSC_PRELIMS_SYLLABUS.length} {language === 'gu' ? 'વિષયો વર્ગીકૃત' : 'Subjects Deconstructed'}
            </span>
          </div>

          <div className="space-y-3">
            {GPSC_PRELIMS_SYLLABUS.map((sub) => {
              const isExpanded = expandedPrelimsSubject === sub.id;

              return (
                <div
                  key={sub.id}
                  className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedPrelimsSubject(isExpanded ? '' : sub.id)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                        {sub.subjectNumber}
                      </span>
                      <div>
                        <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                          {language === 'gu' ? sub.nameGu : sub.nameEn}
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          {sub.subcategories.length} {language === 'gu' ? 'પેટા-વિભાગો સમાવિષ્ટ' : 'Sub-sections detailed'}
                        </p>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-stone-100 space-y-4">
                      {sub.subcategories.map((cat, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                          <h4 className="font-extrabold text-xs text-emerald-900">
                            {language === 'gu' ? cat.titleGu : cat.titleEn}
                          </h4>
                          <ul className="space-y-1.5 text-xs text-stone-700">
                            {(language === 'gu' ? cat.topicsGu : cat.topicsEn).map((top, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                                <span>{top}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 4: MAINS SYLLABUS ================= */}
      {activeSubTab === 'mains_syllabus' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-extrabold text-stone-800">
              {language === 'gu' 
                ? 'મુખ્ય પરીક્ષા (Mains) – ૭ પેપર્સ • કુલ ૧,૮૫૦ ગુણ (૧,૨૫૦ મેરિટ + ૬૦૦ ક્વોલિફાઇંગ)'
                : 'Main Written Examination – 7 Papers • Total 1,850 Marks (1,250 Merit + 600 Qualifying)'}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
              {language === 'gu' ? '૨૦૨૬-૨૭ અદ્યતન પદ્ધતિ' : '2026-27 Updated Pattern'}
            </span>
          </div>

          <div className="space-y-3">
            {GPSC_MAINS_SYLLABUS.map((paper) => {
              const isExpanded = expandedMainsPaper === paper.paperNumber;

              return (
                <div
                  key={paper.paperNumber}
                  className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedMainsPaper(isExpanded ? '' : paper.paperNumber)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${
                        paper.nature === 'Qualifying'
                          ? 'bg-stone-100 text-stone-700'
                          : 'bg-emerald-700 text-white'
                      }`}>
                        {paper.paperNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                            {language === 'gu' ? paper.titleGu : paper.titleEn}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                            paper.nature === 'Qualifying'
                              ? 'bg-stone-100 text-stone-600 border-stone-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {paper.marks} {language === 'gu' ? 'ગુણ' : 'Marks'} • {paper.nature}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {language === 'gu' ? paper.overviewGu : paper.overviewEn}
                        </p>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-stone-100 space-y-3">
                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-700">
                        <span className="font-bold text-emerald-950">{language === 'gu' ? 'સ્વરૂપ:' : 'Scope:'} </span>
                        {language === 'gu' ? paper.overviewGu : paper.overviewEn}
                      </div>

                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                        <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider">
                          {language === 'gu' ? 'અભ્યાસક્રમના વિગતવાર મુદ્દાઓ:' : 'Detailed Topic Breakdown:'}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700">
                          {(language === 'gu' ? paper.topicsGu : paper.topicsEn).map((top, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200/60">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{top}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 5: 6-MONTH TIMELINE ================= */}
      {activeSubTab === 'study_plan' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
            <h2 className="text-lg font-black text-stone-900">
              {language === 'gu'
                ? 'શિખાઉ ઉમેદવાર માટે ૬-મહિનાનો વૈજ્ઞાનિક અભ્યાસક્રમ (૨ થી ૩ કલાક દૈનિક)'
                : '6-Month Scientific Study Roadmap for Beginners (2-3 Hours Daily)'}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'gu'
                ? 'બધા વિષયો એકસાથે શરૂ કરવાની ભૂલ ન કરો. દર મહિને ૨ વિષયો પર ઊંડાણપૂર્વક ધ્યાન આપો:'
                : 'Avoid starting all subjects at once. Master 2 core subjects per month with continuous PYQ solving:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIX_MONTH_STUDY_PLAN.map((plan) => (
              <div
                key={plan.month}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500/60 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                      M{plan.month}
                    </span>
                    <h3 className="font-extrabold text-stone-900 text-sm">
                      {language === 'gu' ? `મહિનો ${plan.month}: ${plan.focusGu}` : `Month ${plan.month}: ${plan.focusEn}`}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {language === 'gu' ? '૪ અઠવાડિયા' : '4 Weeks'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase text-stone-400">
                    {language === 'gu' ? 'મુખ્ય વિષયો:' : 'Core Focus Subjects:'}
                  </span>
                  <ul className="space-y-1 text-xs text-stone-700">
                    {(language === 'gu' ? plan.subjectsGu : plan.subjectsEn).map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                  <span className="font-extrabold text-emerald-950">
                    {language === 'gu' ? 'મહિનાનો લક્ષ્યાંક (Milestone): ' : 'Month Milestone: '}
                  </span>
                  <span className="text-stone-700">
                    {language === 'gu' ? plan.milestonesGu : plan.milestonesEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
