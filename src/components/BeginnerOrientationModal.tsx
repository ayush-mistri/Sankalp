'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { CheckCircle2, ChevronRight, Compass, Sparkles, X } from 'lucide-react';

interface BeginnerOrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectStartingTopic: (topicId: string) => void;
}

type AspirantType = 'beginner' | 'college' | 'working' | 'repeater';

export const BeginnerOrientationModal: React.FC<BeginnerOrientationModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectStartingTopic,
}) => {
  const [aspirantType, setAspirantType] = useState<AspirantType>('beginner');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 dark:bg-orange-950/60 text-orange-600 rounded-xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
                {language === 'gu' ? 'તમારો અભ્યાસ ક્યાંથી શરૂ કરવો?' : 'Where Should You Start?'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'gu'
                  ? 'તમારી પરિસ્થિતિ મુજબ વ્યક્તિગત લર્નિંગ પ્લાન'
                  : 'Personalized Diagnostic Learning Plan'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Step 1: Who are you? */}
          <div>
            <label className="block font-bold text-stone-800 dark:text-stone-200 mb-2">
              {language === 'gu' ? '૧. તમારી વર્તમાન સ્થિતિ શું છે?' : '1. What best describes your current preparation status?'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'beginner' as AspirantType,
                  titleEn: 'Absolute Beginner',
                  titleGu: 'સંપૂર્ણ નવા ઉમેદવાર',
                  descEn: 'Never prepared for competitive exams before',
                  descGu: 'પહેલાં ક્યારેય સનદી પરીક્ષાની તૈયારી કરી નથી',
                },
                {
                  id: 'college' as AspirantType,
                  titleEn: 'College Student',
                  titleGu: 'કોલેજ વિદ્યાર્થી',
                  descEn: 'Balancing college studies with 2-3 hrs prep',
                  descGu: 'કોલેજની સાથે દૈનિક ૨-૩ કલાક અભ્યાસ',
                },
                {
                  id: 'working' as AspirantType,
                  titleEn: 'Working Professional',
                  titleGu: 'નોકરીયાત ઉમેદવાર',
                  descEn: 'Weekend focused + late evening micro-study',
                  descGu: 'સાંજે અને વીકેન્ડમાં લક્ષિત સમય',
                },
                {
                  id: 'repeater' as AspirantType,
                  titleEn: 'Previous Attempt Repeater',
                  titleGu: 'અગાઉ પરીક્ષા આપેલી છે',
                  descEn: 'Need improvement in Prelims conceptual & Mains',
                  descGu: 'પ્રિલિમ્સ કન્સેપ્ટ અને મેઈન્સમાં સ્કોર વધારવો છે',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAspirantType(item.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    aspirantType === item.id
                      ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/30 text-stone-900 dark:text-stone-100 ring-2 ring-orange-500/20'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-orange-600 dark:text-orange-400">
                      {language === 'gu' ? item.titleGu : item.titleEn}
                    </span>
                    {aspirantType === item.id && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {language === 'gu' ? item.descGu : item.descEn}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Golden Rules: The 3 Core Answers */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'gu' ? 'સંકલ્પ માર્ગદર્શિકા: ૩ સુવર્ણ નિયમો' : 'Sankalp Core Rulebook: 3 Principles'}</span>
            </div>

            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  <strong className="text-stone-900 dark:text-stone-100 font-semibold">
                    {language === 'gu' ? 'શું વાંચવું અને શું છોડવું:' : 'What to Read & What to Skip:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'સિલેબસ બહારનું કશું જ નહીં. ૧૦૦ પાનાના અસંબંધિત પીડીએફ વાંચવા કરતાં પ્રમાણિત સ્ત્રોત (GCERT/લક્ષ્મીકાંત) નું ૫ વખત પુનરાવર્તન જ પરિણામ લાવશે.'
                    : 'Limit to the official syllabus. Re-reading 1 standard source 5 times is exponentially better than skimming 5 sources once.'}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  <strong className="text-stone-900 dark:text-stone-100 font-semibold">
                    {language === 'gu' ? 'વિડીયો જોવાનો ભ્રમ ટાળો:' : 'Avoid Passive Video Watching:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'દિવસમાં ૪ કલાક વિડીયો જોવાથી પરીક્ષા પાસ નથી થવાતી. વાંચ્યા પછી તરત પ્રશ્નો ઉકેલો (Active Recall).'
                    : 'Watching 4 hours of lectures gives a false sense of mastery. Retention requires solving micro-quizzes immediately.'}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>
                  <strong className="text-stone-900 dark:text-stone-100 font-semibold">
                    {language === 'gu' ? 'પાછલા વર્ષોના પ્રશ્નો (PYQ) જ સાચો દીવાદાંડી છે:' : 'PYQs are your True Lighthouse:'}
                  </strong>{' '}
                  {language === 'gu'
                    ? 'કોઈપણ ટોપિક વાંચતા પહેલાં અને વાંચ્યા પછી જુઓ કે GPSC એ છેલ્લા ૫ વર્ષમાં તેમાંથી કેવા પ્રશ્નો પૂછ્યા છે.'
                    : 'Inspect past 5 years of GPSC questions before and after every topic to gauge depth.'}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Starting Point */}
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs mb-1">
              {language === 'gu' ? '👉 તમારા માટે ભલામણ કરેલ પ્રથમ પગલું:' : '👉 Your Recommended First Step:'}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 mb-3">
              {aspirantType === 'beginner' || aspirantType === 'college'
                ? language === 'gu'
                  ? 'પ્રથમ "GPSC વિરુદ્ધ UPSC સિલેબસનું માળખું" સમજો, ત્યારબાદ બંધારણના "આમુખ (Preamble)" થી કન્સેપ્ટ લર્નિંગ શરૂ કરો.'
                  : 'Start with the Exam Structure & Hierarchy module, then proceed to the Preamble & Constitutional Foundation module.'
                : language === 'gu'
                  ? 'સીધા "PYQ પ્રેક્ટિસ" માં જઈને બંધારણ અને ગુજરાતના વારસાના પાછલા વર્ષોના પ્રશ્નો ઉકેલો અને તમારી ક્ષમતા તપાસો.'
                  : 'Jump directly to the PYQ Practice engine to diagnose your conceptual elimination skills.'}
            </p>

            <button
              onClick={() => {
                onClose();
                onSelectStartingTopic(
                  aspirantType === 'repeater' ? 'topic-f1' : 'topic-b1'
                );
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all"
            >
              <span>
                {language === 'gu' ? 'આ પ્રારંભિક ટોપિક શરૂ કરો' : 'Start Recommended Module'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
