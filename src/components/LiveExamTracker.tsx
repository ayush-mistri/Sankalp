'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { EXAM_COUNTDOWNS, OFFICIAL_NOTIFICATIONS } from '@/data/examTrackerData';
import { 
  Bell, 
  Clock, 
  ExternalLink, 
  Users 
} from 'lucide-react';

interface LiveExamTrackerProps {
  language: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDateStr: string): TimeRemaining {
  const difference = +new Date(targetDateStr) - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export const LiveExamTracker: React.FC<LiveExamTrackerProps> = ({ language }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('gpsc-class-12');
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const activeExam = EXAM_COUNTDOWNS.find((e) => e.id === selectedExamId) || EXAM_COUNTDOWNS[0];

  // Ticking seconds timer for real-time countdown
  useEffect(() => {
    setTimeLeft(calculateTimeLeft(activeExam.targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(activeExam.targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
          </span>
          <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-950">
            {language === 'gu' ? 'રિયલ-ટાઇમ પરીક્ષા રડાર (Live Exam Radar)' : 'Live Examination & Official Radar'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'gu' ? 'દરેક સેકન્ડે અપડેટ થતો કાઉન્ટડાઉન' : 'Real-time countdown updating every second'}
          </span>
        </div>
      </div>

      {/* Main Countdown Display Card */}
      <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 text-white border border-emerald-900/40 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Exam Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none relative z-10">
          {EXAM_COUNTDOWNS.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap border ${
                selectedExamId === exam.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 font-extrabold'
                  : 'bg-white/10 text-stone-300 border-white/10 hover:bg-white/20'
              }`}
            >
              {exam.authority} • {language === 'gu' ? exam.nameGu.split('(')[0] : exam.nameEn.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Exam Title & Authority */}
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              {activeExam.authority} {activeExam.stage}
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeExam.seatsCount} {language === 'gu' ? 'અંદાજિત જગ્યાઓ' : 'Expected Vacancies'}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'gu' ? activeExam.nameGu : activeExam.nameEn}
          </h2>
        </div>

        {/* Real-Time Live Clock Tickers */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl relative z-10">
          <div className="p-4 sm:p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-1">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-300">
              {language === 'gu' ? 'દિવસો (Days)' : 'Days'}
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-1">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-300">
              {language === 'gu' ? 'કલાક (Hours)' : 'Hours'}
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-1">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-300">
              {language === 'gu' ? 'મિનિટ (Mins)' : 'Minutes'}
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-1">
            <div className="text-3xl sm:text-5xl font-black text-emerald-300 font-mono animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-300">
              {language === 'gu' ? 'સેકન્ડ (Secs)' : 'Seconds'}
            </div>
          </div>
        </div>

        {/* Action Bar: Official Link */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 text-xs">
          <div className="text-stone-300 font-medium">
            {language === 'gu'
              ? 'સત્તાવાર ઓજસ / GPSC પોર્ટલ પરથી સત્યાપિત માહિતી'
              : 'Verified directly against official GPSC / OJAS examination schedule'}
          </div>

          <a
            href={activeExam.officialNoticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/30 shrink-0"
          >
            <span>{language === 'gu' ? 'સત્તાવાર પોર્ટલ ખોલો' : 'Open Official Portal'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Official Notifications & Bulletins Feed */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <Bell className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900">
                {language === 'gu' ? 'સત્તાવાર GPSC & UPSC નોટિફિકેશન ફીડ' : 'Latest Official Bulletins & Circulars'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'gu'
                  ? 'પરીક્ષા કેલેન્ડર, પ્રોવિઝનલ આન્સર કી અને પરિણામ અપડેટ્સ'
                  : 'Calendar releases, answer keys, and syllabus notifications'}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Items */}
        <div className="space-y-3">
          {OFFICIAL_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px]">
                    {notif.authority}
                  </span>
                  {notif.isNew && (
                    <span className="font-bold px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] animate-pulse">
                      NEW
                    </span>
                  )}
                  <span className="text-stone-400 text-[11px] font-medium">{notif.date}</span>
                </div>
                <div className="font-bold text-stone-900 text-sm">
                  {language === 'gu' ? notif.titleGu : notif.titleEn}
                </div>
              </div>

              <a
                href={notif.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-stone-200 hover:border-emerald-400 text-emerald-800 font-bold transition-all shrink-0"
              >
                <span>{language === 'gu' ? 'પરિપત્ર જુઓ' : 'View Circular'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
