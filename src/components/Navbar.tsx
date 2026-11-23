'use client';

import React from 'react';
import { Language, StageId } from '@/types';
import { BookOpen, Compass, Flame, HelpCircle, Layers, Newspaper, Sparkles, Target } from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'roadmap' | 'reader' | 'practice' | 'current_affairs' | 'readiness' | 'resources';
  onTabChange: (tab: 'roadmap' | 'reader' | 'practice' | 'current_affairs' | 'readiness' | 'resources') => void;
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
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Logo & Brand in Clean Green & White */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onTabChange('roadmap')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
                સં
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-stone-900">
                    Sankalp
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    GPSC & UPSC
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {currentLanguage === 'gu' ? 'સ્માર્ટ લર્નિંગ ઇકોસિસ્ટમ' : 'Learning Journey OS'}
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => onTabChange('roadmap')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'સિલેબસ રોડમેપ' : 'Roadmap'}</span>
            </button>

            <button
              onClick={() => onTabChange('reader')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'reader'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'કન્સેપ્ટ લર્નિંગ' : 'Learn'}</span>
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'practice'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'PYQ પ્રેક્ટિસ' : 'PYQ Practice'}</span>
            </button>

            <button
              onClick={() => onTabChange('current_affairs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'current_affairs'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Newspaper className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'દૈનિક પ્રવાહો' : 'Current Affairs'}</span>
            </button>

            <button
              onClick={() => onTabChange('readiness')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'readiness'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'સજ્જતા એનાલિટિક્સ' : 'Readiness'}</span>
            </button>

            <button
              onClick={() => onTabChange('resources')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'resources'
                  ? 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>{currentLanguage === 'gu' ? 'શું વાંચવું?' : 'Resources'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
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
                onClick={() => onLanguageChange('gu')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentLanguage === 'gu'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                ગુજરાતી
              </button>
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
            </div>
          </div>

        </div>

        {/* Mobile Tab Scroller */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-2.5 border-t border-stone-100 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange('roadmap')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'roadmap' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'રોડમેપ' : 'Roadmap'}
          </button>
          <button
            onClick={() => onTabChange('reader')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'reader' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'કન્સેપ્ટ' : 'Learn'}
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'practice' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'PYQ' : 'Practice'}
          </button>
          <button
            onClick={() => onTabChange('current_affairs')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'current_affairs' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'કરંટ અફેર્સ' : 'Current Affairs'}
          </button>
          <button
            onClick={() => onTabChange('readiness')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'readiness' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'સજ્જતા' : 'Readiness'}
          </button>
          <button
            onClick={() => onTabChange('resources')}
            className={`px-3.5 py-1.5 rounded-full shrink-0 font-bold ${
              activeTab === 'resources' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            {currentLanguage === 'gu' ? 'પુસ્તકો' : 'Books'}
          </button>
        </div>

      </div>
    </header>
  );
};
