'use client';

import React from 'react';
import { ActiveTab, Language, StageId } from '@/types';
import { 
  FileText, 
  Flame, 
  GraduationCap, 
  Home, 
  Library, 
  Newspaper, 
  Radio, 
  Sparkles, 
  Target 
} from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentStageId: StageId;
  onOpenOrientation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenOrientation,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs transition-colors">
      <div className="w-[92%] sm:w-[88%] lg:w-[84%] max-w-[1500px] mx-auto">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onTabChange('home')}
              className="flex items-center gap-3 text-left group"
            >
              {/* Official Transparent Sankalp Buddhist Logo */}
              <div className="h-11 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <img 
                  src="/sankalp-logo.png" 
                  alt="Sankalp Logo" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-stone-900">
                    Sankalp
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    GPSC & UPSC
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {currentLanguage === 'gu' ? 'સંકલ્પ: સ્માર્ટ લર્નિંગ ઇકોસિસ્ટમ' : 'Smart Civil Services Ecosystem'}
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => onTabChange('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'હોમ' : 'Home'}</span>
            </button>

            <button
              onClick={() => onTabChange('syllabus')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'syllabus'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'સિલેબસ' : 'Syllabus'}</span>
            </button>

            <button
              onClick={() => onTabChange('books')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'books'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Library className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'ફ્રી પુસ્તકો' : 'Books'}</span>
            </button>

            <button
              onClick={() => onTabChange('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'notes'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'નોટ્સ' : 'Notes'}</span>
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'practice'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'PYQ બેંક' : 'PYQ Bank'}</span>
            </button>

            <button
              onClick={() => onTabChange('current_affairs')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'current_affairs'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Newspaper className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'પ્રવાહો' : 'Current Affairs'}</span>
            </button>

            {/* Real-Time Live Exam Radar Tab */}
            <button
              onClick={() => onTabChange('live_radar')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'live_radar'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>{currentLanguage === 'gu' ? 'લાઇવ રડાર' : 'Live Radar'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Beginner Orientation Trigger */}
            <button
              onClick={onOpenOrientation}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">
                {currentLanguage === 'gu' ? 'ક્યાંથી શરૂ કરવું?' : 'Where to Start?'}
              </span>
            </button>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>14d</span>
            </div>

            {/* Language Switcher Toggle */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('gu')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentLanguage === 'gu'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                ગુજરાતી
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Tab Scroller */}
        <div className="flex xl:hidden items-center gap-2 overflow-x-auto py-2.5 border-t border-stone-100 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange('home')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'home' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'હોમ' : 'Home'}
          </button>
          <button
            onClick={() => onTabChange('syllabus')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'syllabus' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'સિલેબસ' : 'Syllabus'}
          </button>
          <button
            onClick={() => onTabChange('books')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'books' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'ફ્રી પુસ્તકો' : 'Books'}
          </button>
          <button
            onClick={() => onTabChange('notes')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'notes' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'નોટ્સ' : 'Notes'}
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'practice' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'PYQ બેંક' : 'PYQ Bank'}
          </button>
          <button
            onClick={() => onTabChange('current_affairs')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'current_affairs' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'પ્રવાહો' : 'Current Affairs'}
          </button>
          <button
            onClick={() => onTabChange('live_radar')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'live_radar' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {currentLanguage === 'gu' ? 'લાઇવ રડાર' : 'Live Radar'}
          </button>
        </div>
      </div>
    </header>
  );
};
