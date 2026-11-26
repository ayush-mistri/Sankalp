'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ActiveTab, Language } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { HomeView } from '@/components/HomeView';
import { SyllabusView } from '@/components/SyllabusView';
import { BooksView } from '@/components/BooksView';
import { NotesView } from '@/components/NotesView';
import { RoadmapView } from '@/components/RoadmapView';
import { ReaderView } from '@/components/ReaderView';
import { PracticeView } from '@/components/PracticeView';
import { CurrentAffairsView } from '@/components/CurrentAffairsView';
import { LiveExamTracker } from '@/components/LiveExamTracker';
import { LiveStudyTimer } from '@/components/LiveStudyTimer';
import { ReadinessView } from '@/components/ReadinessView';
import { BeginnerOrientationModal } from '@/components/BeginnerOrientationModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-f1');
  const [isOrientationOpen, setIsOrientationOpen] = useState<boolean>(false);
  const [requestedPaperId, setRequestedPaperId] = useState<string | null>(null);

  const handleOpenTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrientationTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPaperFromRadar = (paperId: string) => {
    setRequestedPaperId(paperId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks: Array<{ tab: ActiveTab; en: string; gu: string }> = [
    { tab: 'home', en: 'Home', gu: 'હોમ' },
    { tab: 'syllabus', en: 'Syllabus', gu: 'સિલેબસ' },
    { tab: 'books', en: 'Books & resources', gu: 'પુસ્તકો અને સંસાધનો' },
    { tab: 'notes', en: 'Notes', gu: 'નોટ્સ' },
    { tab: 'practice', en: 'PYQ practice', gu: 'PYQ અભ્યાસ' },
    { tab: 'current_affairs', en: 'Current affairs', gu: 'વર્તમાન પ્રવાહો' },
  ];

  const handleFooterNavigation = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 min-h-screen bg-transparent text-stone-900">
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenOrientation={() => setIsOrientationOpen(true)}
      />

      {/* Sidebar + Main content layout */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex gap-3 items-start">

          {/* Left Sidebar — hidden on mobile, sticky on desktop */}
          <Sidebar
            currentLanguage={language}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main content area */}
          <main className="min-w-0 flex-1 space-y-4">
            {(activeTab === 'practice' || activeTab === 'reader' || activeTab === 'notes') && (
              <LiveStudyTimer language={language} />
            )}

            {activeTab === 'home' && (
              <HomeView
                language={language}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenOrientation={() => setIsOrientationOpen(true)}
                onOpenPaper={handleOpenPaperFromRadar}
              />
            )}

            {activeTab === 'syllabus' && (
              <SyllabusView
                language={language}
                onExploreTopic={handleOpenTopic}
                onGoToPractice={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGoToBooks={() => {
                  setActiveTab('books');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {(activeTab === 'books' || activeTab === 'resources') && (
              <BooksView language={language} />
            )}

            {activeTab === 'notes' && (
              <NotesView
                language={language}
                onReadFullModule={handleOpenTopic}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapView
                language={language}
                onOpenTopic={handleOpenTopic}
                onPracticeTopic={handlePracticeTopic}
              />
            )}

            {activeTab === 'live_radar' && (
              <LiveExamTracker
                language={language}
                onOpenPaper={handleOpenPaperFromRadar}
              />
            )}

            {activeTab === 'reader' && (
              <ReaderView
                language={language}
                selectedTopicId={selectedTopicId}
                onSelectTopic={(tId) => setSelectedTopicId(tId)}
                onBackToRoadmap={() => setActiveTab('home')}
                onGoToPractice={(tId) => {
                  setSelectedTopicId(tId);
                  setActiveTab('practice');
                }}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeView
                language={language}
                onBackToRoadmap={() => setActiveTab('home')}
                onReadConcept={(tId) => {
                  setSelectedTopicId(tId);
                  setActiveTab('reader');
                }}
                initialPaperId={requestedPaperId}
                onClearInitialPaper={() => setRequestedPaperId(null)}
              />
            )}

            {activeTab === 'current_affairs' && (
              <CurrentAffairsView language={language} />
            )}

            {activeTab === 'readiness' && (
              <ReadinessView
                language={language}
                onFixWeakArea={(tId) => {
                  setSelectedTopicId(tId);
                  setActiveTab('reader');
                }}
              />
            )}
          </main>

        </div>
      </div>

      {/* Orientation Diagnostic Modal */}
      <BeginnerOrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
        language={language}
        onSelectStartingTopic={handleOrientationTopicSelect}
      />

      <footer className="relative mt-10 overflow-hidden border-t border-emerald-900 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-emerald-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-emerald-200/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-[38%] h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
        />

        <div className="relative mx-auto grid w-[90%] max-w-[1680px] gap-10 py-12 sm:py-14 lg:grid-cols-[1.25fr_0.8fr_1fr] lg:gap-14">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg shadow-black/15">
                <Image
                  src="/sankalp-logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight text-white sm:text-2xl">Sankalp <span className="text-emerald-200">(સંકલ્પ)</span></p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200/80">
                  {language === 'gu' ? 'સિવિલ સર્વિસિસ લર્નિંગ' : 'Civil Services Learning'}
                </p>
              </div>
            </div>
            <p className="max-w-lg text-sm leading-7 text-emerald-100/80">
              {language === 'gu'
                ? 'GPSC અને UPSC ઉમેદવારો માટે વિચારપૂર્વક તૈયાર કરેલું અભ્યાસનું સ્થાન — એકાગ્રતા, પુનરાવર્તન અને પ્રગતિ માટે.'
                : 'A thoughtful study space for GPSC and UPSC aspirants—built to support focused learning, meaningful revision, and steady progress.'}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgb(110_231_183/0.8)]" />
              {language === 'gu' ? 'વિદ્યાર્થી પ્રથમ સંકલ્પ' : 'Student-first, always'}
            </span>
          </div>

          <nav aria-label={language === 'gu' ? 'ઝડપી લિંક્સ' : 'Quick links'} className="space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
              {language === 'gu' ? 'ઝડપી લિંક્સ' : 'Explore Sankalp'}
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-2">
              {footerLinks.map(({ tab, en, gu }) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleFooterNavigation(tab)}
                  className="w-fit rounded-md py-1 text-left text-sm font-medium text-emerald-100/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {language === 'gu' ? gu : en}
                </button>
              ))}
            </div>
          </nav>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-black/10 sm:p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-extrabold text-white">
              {language === 'gu' ? 'શરૂઆત ક્યાંથી કરવી?' : 'Not sure where to start?'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">
              {language === 'gu'
                ? 'તમારા સ્તરને અનુરૂપ શરૂઆતના વિષયો અને અભ્યાસ માર્ગ મેળવો.'
                : 'Find a clear starting point with a quick diagnostic tailored to your preparation.'}
            </p>
            <button
              type="button"
              onClick={() => setIsOrientationOpen(true)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-sm font-extrabold text-emerald-950 shadow-sm transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900 sm:w-auto"
            >
              {language === 'gu' ? 'મારી શરૂઆત શોધો' : 'Find my starting point'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex w-[90%] max-w-[1680px] flex-col gap-2 py-4 text-xs text-emerald-100/65 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Sankalp. {language === 'gu' ? 'સર્વ હકો સુરક્ષિત.' : 'All rights reserved.'}</span>
            <span className="font-medium text-emerald-200/80">
              {language === 'gu' ? 'એકાગ્રતા સાથે શીખો. સંકલ્પ સાથે આગળ વધો.' : 'Learn with focus. Move forward with Sankalp.'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
