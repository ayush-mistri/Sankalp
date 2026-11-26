'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ActiveTab, Language } from '@/types';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenOrientation: () => void;
}

interface NavigationProps {
  activeTab: ActiveTab;
  currentLanguage: Language;
  onTabChange: (tab: ActiveTab) => void;
  onSelect?: () => void;
  layout: 'inline' | 'stacked';
  includeMore: boolean;
}

const primaryLinks: Array<{ tab: ActiveTab; en: string; gu: string }> = [
  { tab: 'home', en: 'Home', gu: 'હોમ' },
  { tab: 'syllabus', en: 'Syllabus', gu: 'સિલેબસ' },
  { tab: 'roadmap', en: 'Roadmap', gu: 'અભ્યાસ માર્ગ' },
  { tab: 'books', en: 'Books', gu: 'પુસ્તકો' },
  { tab: 'notes', en: 'Notes', gu: 'નોટ્સ' },
  { tab: 'practice', en: 'PYQ Practice', gu: 'PYQ અભ્યાસ' },
  { tab: 'current_affairs', en: 'Current Affairs', gu: 'વર્તમાન પ્રવાહો' },
];

const secondaryLinks: Array<{ tab: ActiveTab; en: string; gu: string }> = [
  { tab: 'readiness', en: 'Readiness', gu: 'તૈયારી' },
  { tab: 'live_radar', en: 'Live Exam Radar', gu: 'લાઇવ એક્ઝામ રડાર' },
  { tab: 'reader', en: 'Continue Reading', gu: 'વાંચન ચાલુ રાખો' },
];

const isCurrentTab = (activeTab: ActiveTab, tab: ActiveTab) =>
  activeTab === tab || (tab === 'books' && activeTab === 'resources');

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  currentLanguage,
  onTabChange,
  onSelect,
  layout,
  includeMore,
}) => {
  const isStacked = layout === 'stacked';
  const linkClass = (isActive: boolean) =>
    `whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-semibold transition ${
      isStacked
        ? 'w-full text-left'
        : 'shrink-0'
    } ${
      isActive
        ? 'border-emerald-300 bg-emerald-100 text-emerald-950 shadow-sm'
        : 'border-transparent text-stone-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900'
    }`;

  const chooseTab = (tab: ActiveTab) => {
    onTabChange(tab);
    onSelect?.();
  };

  return (
    <nav
      aria-label={currentLanguage === 'gu' ? 'મુખ્ય નેવિગેશન' : 'Main navigation'}
      className={`flex ${
        isStacked ? 'flex-col items-stretch gap-1' : 'items-center gap-0.5'
      }`}
    >
      {primaryLinks.map(({ tab, en, gu }) => {
        const isActive = isCurrentTab(activeTab, tab);

        return (
          <button
            key={tab}
            type="button"
            onClick={() => chooseTab(tab)}
            aria-current={isActive ? 'page' : undefined}
            className={linkClass(isActive)}
          >
            {currentLanguage === 'gu' ? gu : en}
          </button>
        );
      })}

      {includeMore ? (
        <details className="group relative shrink-0">
          <summary
            className={`flex cursor-pointer list-none items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              secondaryLinks.some(({ tab }) => isCurrentTab(activeTab, tab))
                ? 'border-emerald-300 bg-emerald-100 text-emerald-950 shadow-sm'
                : 'border-transparent text-stone-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900'
            }`}
          >
            {currentLanguage === 'gu' ? 'વધુ' : 'More'}
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
          </summary>
          <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg shadow-stone-900/10">
            {secondaryLinks.map(({ tab, en, gu }) => {
              const isActive = isCurrentTab(activeTab, tab);

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={(event) => {
                    chooseTab(tab);
                    event.currentTarget.closest('details')?.removeAttribute('open');
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-950'
                        : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {currentLanguage === 'gu' ? gu : en}
                </button>
              );
            })}
          </div>
        </details>
      ) : (
        secondaryLinks.map(({ tab, en, gu }) => {
          const isActive = isCurrentTab(activeTab, tab);

          return (
            <button
              key={tab}
              type="button"
              onClick={() => chooseTab(tab)}
              aria-current={isActive ? 'page' : undefined}
              className={linkClass(isActive)}
            >
              {currentLanguage === 'gu' ? gu : en}
            </button>
          );
        })
      )}
    </nav>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenOrientation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto w-[90%] max-w-[1680px]">
        <div className="flex h-[80px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                onTabChange('home');
                closeMobileMenu();
              }}
              className="flex min-w-0 items-center gap-3 text-left"
              aria-label="Go to Sankalp home"
            >
              <Image
                src="/sankalp-logo.png"
                alt=""
                width={64}
                height={64}
                className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl object-contain"
              />
              <span className="min-w-0">
                <span className="block truncate text-lg font-extrabold tracking-tight text-stone-900 sm:text-xl">
                  Sankalp
                </span>
                <span className="hidden text-[11px] font-medium text-stone-500 sm:block">
                  {currentLanguage === 'gu' ? 'સિવિલ સર્વિસિસ લર્નિંગ' : 'Civil Services Learning'}
                </span>
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onOpenOrientation();
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-3.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:px-4"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">
                {currentLanguage === 'gu' ? 'ક્યાંથી શરૂ કરવું?' : 'Where to start'}
              </span>
            </button>

            <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1" aria-label="Choose language">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                aria-pressed={currentLanguage === 'en'}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                  currentLanguage === 'en'
                    ? 'bg-emerald-100 text-emerald-950 shadow-sm'
                    : 'text-stone-600 hover:bg-white hover:text-emerald-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('gu')}
                aria-pressed={currentLanguage === 'gu'}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                  currentLanguage === 'gu'
                    ? 'bg-emerald-100 text-emerald-950 shadow-sm'
                    : 'text-stone-600 hover:bg-white hover:text-emerald-900'
                }`}
              >
                <span className="sm:hidden">GU</span>
                <span className="hidden sm:inline">ગુજરાતી</span>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-stone-100 py-3 lg:hidden"
          >
            <Navigation
              activeTab={activeTab}
              currentLanguage={currentLanguage}
              onTabChange={onTabChange}
              onSelect={closeMobileMenu}
              layout="stacked"
              includeMore={false}
            />
          </div>
        )}
      </div>
    </header>
  );
};
