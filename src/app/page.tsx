'use client';

import React, { useState } from 'react';
import { Language, StageId } from '@/types';
import { Navbar } from '@/components/Navbar';
import { RoadmapView } from '@/components/RoadmapView';
import { ReaderView } from '@/components/ReaderView';
import { PracticeView } from '@/components/PracticeView';
import { CurrentAffairsView } from '@/components/CurrentAffairsView';
import { ReadinessView } from '@/components/ReadinessView';
import { ResourceGuideView } from '@/components/ResourceGuideView';
import { BeginnerOrientationModal } from '@/components/BeginnerOrientationModal';

export default function Home() {
  const [language, setLanguage] = useState<Language>('gu');
  const [activeTab, setActiveTab] = useState<
    'roadmap' | 'reader' | 'practice' | 'current_affairs' | 'readiness' | 'resources'
  >('roadmap');
  const [currentStageId, setCurrentStageId] = useState<StageId>('foundation');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-f1');
  const [isOrientationOpen, setIsOrientationOpen] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen flex flex-col">
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'roadmap' && (
          <RoadmapView
            language={language}
            onOpenTopic={handleOpenTopic}
            onPracticeTopic={handlePracticeTopic}
          />
        )}

        {activeTab === 'reader' && (
          <ReaderView
            language={language}
            selectedTopicId={selectedTopicId}
            onSelectTopic={(tId) => setSelectedTopicId(tId)}
            onBackToRoadmap={() => setActiveTab('roadmap')}
            onGoToPractice={(tId) => {
              setSelectedTopicId(tId);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            language={language}
            onBackToRoadmap={() => setActiveTab('roadmap')}
            onReadConcept={(tId) => {
              setSelectedTopicId(tId);
              setActiveTab('reader');
            }}
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

        {activeTab === 'resources' && (
          <ResourceGuideView language={language} />
        )}
      </main>

      {/* Orientation Diagnostic Modal */}
      <BeginnerOrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
        language={language}
        onSelectStartingTopic={handleOrientationTopicSelect}
      />

      {/* Bottom Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
              સં
            </div>
            <span className="font-bold text-stone-900 dark:text-stone-200">
              Sankalp (સંકલ્પ)
            </span>
            <span>—</span>
            <span>
              {language === 'gu'
                ? 'ગુજરાતી અને અંગ્રેજી માધ્યમના ઉમેદવારો માટે આગામી પેઢીનું લર્નિંગ પ્લેટફોર્મ'
                : 'Next-Generation GPSC & UPSC Learning Ecosystem'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>{language === 'gu' ? 'ગોખણપટ્ટી મુક્ત શિક્ષણ' : 'Active Recall & Journey OS'}</span>
            <span>•</span>
            <span className="text-orange-600 font-semibold">
              {language === 'gu' ? 'વિદ્યાર્થી પ્રથમ સંકલ્પ' : 'Student-First Mission'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
