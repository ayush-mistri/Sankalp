'use client';

import React from 'react';
import { ActiveTab, Language } from '@/types';
import {
  BookOpen,
  Compass,
  FileText,
  GraduationCap,
  Home,
  Library,
  Newspaper,
  PenTool,
  Radio,
  Target,
} from 'lucide-react';

interface SidebarProps {
  currentLanguage: Language;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

interface SidebarItem {
  tab: ActiveTab;
  en: string;
  gu: string;
  icon: React.ComponentType<{ className?: string }>;
}

const primaryItems: SidebarItem[] = [
  { tab: 'home', en: 'Home', gu: 'હોમ', icon: Home },
  { tab: 'syllabus', en: 'Syllabus', gu: 'સિલેબસ', icon: BookOpen },
  { tab: 'roadmap', en: 'Roadmap', gu: 'અભ્યાસ માર્ગ', icon: Compass },
  { tab: 'books', en: 'Books', gu: 'પુસ્તકો', icon: Library },
  { tab: 'notes', en: 'Notes', gu: 'નોટ્સ', icon: FileText },
  { tab: 'practice', en: 'PYQ Practice', gu: 'PYQ અભ્યાસ', icon: PenTool },
  { tab: 'current_affairs', en: 'Current Affairs', gu: 'વર્તમાન પ્રવાહો', icon: Newspaper },
];

const toolItems: SidebarItem[] = [
  { tab: 'readiness', en: 'Readiness', gu: 'તૈયારી', icon: Target },
  { tab: 'live_radar', en: 'Live Exam Radar', gu: 'લાઇવ એક્ઝામ રડાર', icon: Radio },
  { tab: 'reader', en: 'Continue Reading', gu: 'વાંચન ચાલુ રાખો', icon: GraduationCap },
];

const isCurrentTab = (activeTab: ActiveTab, tab: ActiveTab) =>
  activeTab === tab || (tab === 'books' && activeTab === 'resources');

export const Sidebar: React.FC<SidebarProps> = ({
  currentLanguage,
  activeTab,
  onTabChange,
}) => {
  const renderItem = ({ tab, en, gu, icon: Icon }: SidebarItem) => {
    const isActive = isCurrentTab(activeTab, tab);
    return (
      <button
        key={tab}
        type="button"
        onClick={() => onTabChange(tab)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${
          isActive
            ? 'border-emerald-300 bg-emerald-700 text-white shadow-md'
            : 'border-transparent text-stone-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-950'
        }`}
      >
        <Icon
          className={`h-4 w-4 shrink-0 ${
            isActive ? 'text-emerald-100' : 'text-stone-500'
          }`}
        />
        <span className="truncate">{currentLanguage === 'gu' ? gu : en}</span>
      </button>
    );
  };

  return (
    <aside
      aria-label={currentLanguage === 'gu' ? 'સાઇડબાર નેવિગેશન' : 'Sidebar navigation'}
      className="hidden lg:block lg:w-64 lg:shrink-0 lg:sticky lg:top-[104px] lg:self-start"
    >
      <div className="rounded-2xl border border-stone-200/90 bg-white/95 p-3 shadow-md space-y-4">
        <div className="space-y-1">
          <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
            {currentLanguage === 'gu' ? 'મુખ્ય વિભાગો' : 'Study Menu'}
          </p>
          <nav className="space-y-1">{primaryItems.map(renderItem)}</nav>
        </div>

        <div className="border-t border-stone-100 pt-3 space-y-1">
          <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
            {currentLanguage === 'gu' ? 'વધુ સાધનો' : 'Tools & Tracking'}
          </p>
          <nav className="space-y-1">{toolItems.map(renderItem)}</nav>
        </div>
      </div>
    </aside>
  );
};
