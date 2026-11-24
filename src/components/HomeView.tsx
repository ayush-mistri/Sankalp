'use client';

import React from 'react';
import { ActiveTab, Language } from '@/types';
import { 
  ArrowRight, 
  Award, 
  Compass, 
  FileText, 
  GraduationCap, 
  Library, 
  Newspaper, 
  Radio, 
  Sparkles, 
  Target, 
  Zap 
} from 'lucide-react';

interface HomeViewProps {
  language: Language;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenOrientation: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onNavigateTab,
  onOpenOrientation,
}) => {
  return (
    <div className="w-full space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner - Clean White & Emerald with Official Buddhist Sankalp Logo */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-800 to-emerald-700 text-white shadow-xl relative overflow-hidden space-y-6">
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{language === 'gu' ? 'ગુજરાતનું સર્વશ્રેષ્ઠ ફ્રી લર્નિંગ પ્લેટફોર્મ' : 'Next-Generation GPSC & UPSC Learning Platform'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {language === 'gu' 
                ? 'સંકલ્પ: અધિકારી બનવાની તમારી સુવર્ણ યાત્રા' 
                : 'Sankalp: Your Guided Gateway to Civil Services'}
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {language === 'gu'
                ? 'GPSC ક્લાસ ૧-૨ અને UPSC CSE માટે ૧૦૦% નિઃશુલ્ક સત્તાવાર પુસ્તકો, ૨૦૨૬-૨૭ ની નવીનતમ પદ્ધતિ મુજબ સિલેબસ, પાછલા વર્ષોના પેપર્સ અને ટોપિક સમરી નોટ્સ.'
                : 'Empowering civil services aspirants with 100% free official government PDFs, the updated 2026–27 GPSC exam scheme, year-wise PYQ bank, and 5-minute revision notes.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('syllabus')}
                className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
              >
                <span>{language === 'gu' ? 'નવો સિલેબસ જુઓ' : 'Explore 2026-27 Syllabus'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </button>

              <button
                onClick={() => onNavigateTab('books')}
                className="px-6 py-3 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-400/40 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Library className="w-4 h-4 text-emerald-300" />
                <span>{language === 'gu' ? 'ફ્રી સરકારી પુસ્તકો' : 'Free Government Books'}</span>
              </button>

              <button
                onClick={onOpenOrientation}
                className="px-5 py-3 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-300/40 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-200" />
                <span>{language === 'gu' ? 'ક્યાંથી શરૂ કરવું?' : 'Beginner Diagnostic'}</span>
              </button>
            </div>
          </div>

          {/* Official Transparent Buddhist Sankalp Logo Display in Hero */}
          <div className="shrink-0 p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-white/50 shadow-xl flex flex-col items-center justify-center gap-2 max-w-[260px] text-center">
            <img 
              src="/sankalp-logo.png" 
              alt="Sankalp Official Logo" 
              className="h-20 sm:h-24 w-auto object-contain" 
            />
            <div className="text-xs font-black text-stone-900 mt-1">
              {language === 'gu' ? 'સંકલ્પ સત્તાવાર મુદ્રા' : 'Official Sankalp Identity'}
            </div>
            <div className="text-[10px] text-stone-500 font-medium leading-snug">
              {language === 'gu' ? 'જ્ઞાન, સત્ય અને વહીવટી સત્યનિષ્ઠા' : 'Wisdom, Integrity & Civil Duty'}
            </div>
          </div>

        </div>

        {/* Ambient Decorative Graphic */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-emerald-600/30 blur-3xl pointer-events-none" />
      </div>



      {/* 4 General High-Level Pillars (Overview Only) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">1,400</div>
          <div className="text-xs font-bold text-stone-700">
            {language === 'gu' ? 'કુલ મેરિટ ગુણ (૨૦૨૬-૨૭)' : 'Total Merit Selection Marks'}
          </div>
          <p className="text-[11px] text-stone-500 leading-snug">
            {language === 'gu' ? '૨૦૦ પ્રિલિમ્સ + ૧,૨૫૦ મેઈન્સ + ૧૫૦ ઇન્ટરવ્યુ' : '200 Prelims + 1,250 Mains Merit + 150 Interview'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Library className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">100%</div>
          <div className="text-xs font-bold text-stone-700">
            {language === 'gu' ? 'નિઃશુલ્ક સત્તાવાર PDF' : 'Free Government Publications'}
          </div>
          <p className="text-[11px] text-stone-500 leading-snug">
            {language === 'gu' ? 'GCERT, NCERT, બંધારણ, બજેટ અને ARC-2' : 'GCERT, NCERT, Bare Constitution, Budget & 2nd ARC'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">5+ Years</div>
          <div className="text-xs font-bold text-stone-700">
            {language === 'gu' ? 'વર્ષવાર પાછલા પ્રશ્નો (PYQ)' : 'Year-Wise Past Papers'}
          </div>
          <p className="text-[11px] text-stone-500 leading-snug">
            {language === 'gu' ? '૨૦૧૯ થી ૨૦૨૪ પ્રિલિમ્સ & મેઈન્સ' : '2019-2024 Prelims & Mains with Model Outlines'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">5 Min</div>
          <div className="text-xs font-bold text-stone-700">
            {language === 'gu' ? 'ટોપિક સમરી નોટ્સ' : 'High-Yield Topic Summaries'}
          </div>
          <p className="text-[11px] text-stone-500 leading-snug">
            {language === 'gu' ? 'મુખ્ય કલમો, પ્રિલિમ્સ ટ્રેપ્સ અને મેઈન્સ કીવર્ડ્સ' : 'Articles, Examiner Traps & Mains Writing Keywords'}
          </p>
        </div>

      </div>

      {/* Dedicated Section Cards (Separation of Values) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'gu' ? 'સંકલ્પ મુખ્ય વિભાગો' : 'Sankalp Specialized Learning Hubs'}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'gu' ? 'દરેક ટેબમાં સંપૂર્ણ વિગતવાર માહિતી અલગથી ઉપલબ્ધ છે' : 'Dedicated portals designed for targeted, distraction-free preparation'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Section 1: Syllabus */}
          <div
            onClick={() => onNavigateTab('syllabus')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? 'અધિકૃત સિલેબસ ૨૦૨૬-૨૭' : 'Official Syllabus 2026–27'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu' 
                  ? 'નવીનતમ ૨૦૨૬-૨૭ યોજના: ૧ પ્રિલિમ્સ પેપર (૨૦૦ ગુણ), ૭ મેઈન્સ પેપર્સ (૧,૨૫૦ મેરિટ) અને ૬-મહિનાનો સ્ટડી પ્લાન.'
                  : 'Official 2026-27 exam scheme: Single Prelims Paper (200 marks), 7 Mains Papers (1,250 merit), and structured 6-month roadmap.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'સિલેબસ જુઓ →' : 'View Full Syllabus →'}</span>
            </div>
          </div>

          {/* Section 2: Books */}
          <div
            onClick={() => onNavigateTab('books')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Library className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? '૧૦૦% ફ્રી પુસ્તકાલય & બુકલિસ્ટ' : '100% Free Book Vault & List'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu'
                  ? 'સરકારી પ્રમાણિત PDF ડાયરેક્ટ ડાઉનલોડ (GCERT, NCERT, બજેટ, પાક્ષિક) અને મીડિયમ મુજબ બુકલિસ્ટ જનરેટર.'
                  : 'Direct authorized PDF links for government textbooks, state budgets, and customizable booklists for Gujarati & English.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'પુસ્તકાલય ખોલો →' : 'Access Library →'}</span>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div
            onClick={() => onNavigateTab('notes')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? 'ટોપિક-વાઇઝ રિવિઝન નોટ્સ' : 'Topic-Wise Revision Notes'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu'
                  ? 'દરેક વિષયના ૫-મિનિટ હાઇ-યીલ્ડ મુદ્દાઓ, યાદ રાખવાની કલમો, પ્રિલિમ્સ ટ્રેપ્સ અને મેઈન્સ વિશ્લેષણ કીવર્ડ્સ.'
                  : '5-minute rapid summaries for every topic with must-remember articles, frequent prelims traps, and mains keywords.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'નોટ્સ વાંચો →' : 'Read Notes →'}</span>
            </div>
          </div>

          {/* Section 4: PYQs */}
          <div
            onClick={() => onNavigateTab('practice')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? 'પાછલા પેપર્સ સાઇડબાર (PYQ)' : 'Year-Wise Past Papers (PYQ)'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu'
                  ? 'સાઇડબારમાંથી ૨૦૧૯ થી ૨૦૨૪ ના પ્રિલિમ્સ અને મેઈન્સ પેપર્સ પસંદ કરી વિગતવાર સમજૂતી સાથે સોલ્વ કરો.'
                  : 'Interactive year sidebar (2019-2024) with instant elimination reasoning and Mains model answer outlines.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'PYQ બેંક ખોલો →' : 'Practice PYQs →'}</span>
            </div>
          </div>

          {/* Section 5: Current Affairs */}
          <div
            onClick={() => onNavigateTab('current_affairs')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? 'દૈનિક વર્તમાન પ્રવાહો' : 'Syllabus Current Affairs'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu'
                  ? 'The Hindu અને Indian Express માંથી સિલેબસ-લિંક્ડ વિશ્લેષણ, પ્રિલિમ્સ એંગલ અને મેઈન્સ પ્રશ્નો.'
                  : 'Daily news anchored to GS papers with visual case studies, prelims facts, and mains thought prompts.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'પ્રવાહો વાંચો →' : 'View Current Affairs →'}</span>
            </div>
          </div>

          {/* Section 6: Live Radar */}
          <div
            onClick={() => onNavigateTab('live_radar')}
            className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {language === 'gu' ? 'લાઇવ એક્ઝામ રડાર' : 'Live Exam Radar'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'gu'
                  ? 'GPSC અને UPSC ની સત્તાવાર જાહેરાતો, હોલ ટિકિટ, કટઓફ અને કેલેન્ડરની રીઅલ-ટાઇમ અપડેટ્સ.'
                  : 'Real-time monitoring of official GPSC & UPSC recruitment notifications, calendars, and cutoffs.'}
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{language === 'gu' ? 'લાઇવ રડાર જુઓ →' : 'Check Live Updates →'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Daily Study Methodology Tip Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'સંકલ્પ અભ્યાસ પદ્ધતિ (Active Recall):' : 'Sankalp Study Golden Rule:'}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {language === 'gu'
              ? 'ફક્ત પુસ્તક વાંચવાથી યાદ રહેતું નથી. ૧૦ મિનિટ વાંચો અને ત્યારબાદ તુરંત નોટ્સમાંથી મુખ્ય કલમો યાદ કરવાનો પ્રયાસ કરો અને ૨ PYQ સોલ્વ કરો.'
              : 'Passive reading creates an illusion of competence. Read 10 minutes, test yourself immediately with the Checkpoint Quiz, and solve 2 PYQs.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('notes')}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shrink-0 shadow-xs"
        >
          {language === 'gu' ? 'નોટ્સ રિવિઝન શરૂ કરો' : 'Start Revision Notes'}
        </button>
      </div>

    </div>
  );
};
