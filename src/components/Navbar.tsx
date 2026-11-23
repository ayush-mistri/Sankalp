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
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onTabChange('roadmap')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                સં
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-stone-100">
                    Sankalp
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                    GPSC & UPSC
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {currentLanguage === 'gu' ? 'સ્માર્ટ લર્નિંગ ઇકોસિસ્ટમ' : 'Learning Journey OS'}
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onTabChange('roadmap')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'સિલેબસ રોડમેપ' : 'Roadmap'}</span>
            </button>

            <button
              onClick={() => onTabChange('reader')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'reader'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'કન્સેપ્ટ લર્નિંગ' : 'Learn'}</span>
            </button>

            <button
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'PYQ પ્રેક્ટિસ' : 'PYQ Practice'}</span>
            </button>

            <button
              onClick={() => onTabChange('current_affairs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'current_affairs'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'દૈનિક પ્રવાહો' : 'Current Affairs'}</span>
            </button>

            <button
              onClick={() => onTabChange('readiness')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'readiness'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'સજ્જતા એનાલિટિક્સ' : 'Readiness'}</span>
            </button>

            <button
              onClick={() => onTabChange('resources')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'resources'
                  ? 'bg-stone-100 dark:bg-stone-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>{currentLanguage === 'gu' ? 'શું વાંચવું?' : 'Resources'}</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Beginner Orientation Trigger */}
            <button
              onClick={onOpenOrientation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">
                {currentLanguage === 'gu' ? 'ક્યાંથી શરૂ કરવું?' : 'Where to Start?'}
              </span>
            </button>

            {/* Streak Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-800/40">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>14d</span>
            </div>

            {/* Language Switcher Toggle */}
            <div className="flex items-center p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => onLanguageChange('gu')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currentLanguage === 'gu'
                    ? 'bg-white dark:bg-stone-900 text-orange-600 dark:text-orange-400 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-white dark:bg-stone-900 text-orange-600 dark:text-orange-400 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Tab Scroller */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto py-2 border-t border-stone-100 dark:border-stone-800 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange('roadmap')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'roadmap' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'રોડમેપ' : 'Roadmap'}
          </button>
          <button
            onClick={() => onTabChange('reader')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'reader' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'કન્સેપ્ટ' : 'Learn'}
          </button>
          <button
            onClick={() => onTabChange('practice')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'practice' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'PYQ' : 'Practice'}
          </button>
          <button
            onClick={() => onTabChange('current_affairs')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'current_affairs' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'કરંટ અફેર્સ' : 'Current Affairs'}
          </button>
          <button
            onClick={() => onTabChange('readiness')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'readiness' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'સજ્જતા' : 'Readiness'}
          </button>
          <button
            onClick={() => onTabChange('resources')}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium ${
              activeTab === 'resources' ? 'bg-orange-600 text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {currentLanguage === 'gu' ? 'પુસ્તકો' : 'Books'}
          </button>
        </div>

      </div>
    </header>
  );
};
