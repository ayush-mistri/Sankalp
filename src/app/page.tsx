'use client';

import React, { useState } from 'react';
import { ActiveTab, Language, StageId } from '@/types';
import { Navbar } from '@/components/Navbar';
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

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentStageId, setCurrentStageId] = useState<StageId>('foundation');
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
    setCurrentStageId('foundation');
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPaperFromRadar = (paperId: string) => {
    setRequestedPaperId(paperId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900">
      {/* Top Main Navigation */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentStageId={currentStageId}
        onOpenOrientation={() => setIsOrientationOpen(true)}
      />

      {/* Main Content Area Covering ~80% Screen */}
      <main className="flex-1 w-[92%] sm:w-[88%] lg:w-[84%] max-w-[1500px] mx-auto py-8 sm:py-12 space-y-8">
        
        {/* Real-time Focus Timer Bar */}
        {(activeTab === 'practice' || activeTab === 'reader' || activeTab === 'notes') && (
          <LiveStudyTimer language={language} />
        )}

        {/* Tab Views */}
        {activeTab === 'home' && (
          <HomeView
            language={language}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenOrientation={() => setIsOrientationOpen(true)}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusView
            language={language}
            onExploreTopic={handleOpenTopic}
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

      {/* Orientation Diagnostic Modal */}
      <BeginnerOrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
        language={language}
        onSelectStartingTopic={handleOrientationTopicSelect}
      />

      {/* Bottom Footer with Official Transparent Logo */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-10 text-xs text-stone-500">
        <div className="w-[92%] sm:w-[88%] lg:w-[84%] max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 flex items-center justify-center shrink-0">
              <img 
                src="/sankalp-logo.png" 
                alt="Sankalp Logo" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            <span className="font-extrabold text-stone-900 text-sm">
              Sankalp (સંકલ્પ)
            </span>
            <span>—</span>
            <span className="text-stone-600">
              {language === 'gu'
                ? 'ગુજરાતી અને અંગ્રેજી માધ્યમના ઉમેદવારો માટે આગામી પેઢીનું લર્નિંગ પ્લેટફોર્મ'
                : 'Next-Generation GPSC & UPSC Learning Ecosystem'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>{language === 'gu' ? 'ગોખણપટ્ટી મુક્ત શિક્ષણ' : 'Active Recall & Journey OS'}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">
              {language === 'gu' ? 'વિદ્યાર્થી પ્રથમ સંકલ્પ' : 'Student-First Mission'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
