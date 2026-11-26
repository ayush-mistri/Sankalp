'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { EXAM_COUNTDOWNS, OFFICIAL_NOTIFICATIONS, CONCLUDED_EXAM_PAPERS } from '@/data/examTrackerData';
import { 
  Bell, 
  Clock, 
  ExternalLink, 
  Users,
  Sparkles,
  ChevronRight,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';


interface LiveExamTrackerProps {
  language: Language;
  onOpenPaper?: (paperId: string) => void;
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

export const LiveExamTracker: React.FC<LiveExamTrackerProps> = ({ language, onOpenPaper }) => {
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
          </span>
          <span className="font-medium text-xs uppercase tracking-wider text-emerald-950">
            {language === 'gu' ? 'રિયલ-ટાઇમ પરીક્ષા રડાર (Live Exam Radar)' : 'Live Examination & Official Radar'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium scrollbar-none relative z-10">
          {EXAM_COUNTDOWNS.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap border ${
                selectedExamId === exam.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 font-semibold'
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
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {activeExam.authority} • {activeExam.stage}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeExam.seatsCount} {language === 'gu' ? 'જગ્યાઓ' : 'Vacancies'}</span>
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
              activeExam.status === 'confirmed' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/30 text-amber-300'
            }`}>
              {activeExam.status === 'confirmed' ? (language === 'gu' ? 'તારીખ નિશ્ચિત' : 'Confirmed Date') : (language === 'gu' ? 'સંભવિત તારીખ' : 'Tentative')}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
            {language === 'gu' ? activeExam.nameGu : activeExam.nameEn}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            {language === 'gu' ? 'પરીક્ષા તારીખ:' : 'Target Exam Date:'} {new Date(activeExam.targetDate).toLocaleDateString(language === 'gu' ? 'gu-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Four Segment Countdown Clock */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          {[
            { label: language === 'gu' ? 'દિવસ' : 'DAYS', value: timeLeft.days },
            { label: language === 'gu' ? 'કલાક' : 'HOURS', value: timeLeft.hours },
            { label: language === 'gu' ? 'મિનિટ' : 'MINUTES', value: timeLeft.minutes },
            { label: language === 'gu' ? 'સેકન્ડ' : 'SECONDS', value: timeLeft.seconds },
          ].map((unit, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center space-y-1"
            >
              <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-300 tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-stone-400">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Card Footer Link */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300 border-t border-white/10 relative z-10">
          <div>
            <span>{language === 'gu' ? 'સત્તાવાર GPSC / OJAS પોર્ટલ પરથી સત્યાપિત' : 'Directly synchronized with official commission calendars'}</span>
          </div>
          <a
            href={activeExam.officialNoticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{language === 'gu' ? 'સત્તાવાર પોર્ટલ પર જાઓ' : 'Official Commission Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: NEWLY CONCLUDED EXAMS & LIVE POST-EXAM INGESTION */}
      {/* ========================================================================= */}
      <div className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200">
              <Zap className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-100 text-rose-800 animate-pulse">
                  POST-EXAM RADAR
                </span>
                <span className="text-xs text-stone-400 font-mono">Live Ingestion</span>
              </div>
              <h3 className="font-semibold text-lg text-stone-900">
                {language === 'gu' ? 'તાજેતરમાં પૂર્ણ થયેલી પરીક્ષાઓ — પેપર્સ અને સોલ્યુશન લાઇવ' : 'Recently Concluded Exams — Post-Exam Papers & Solutions'}
              </h3>
            </div>
          </div>

          <div className="text-xs text-stone-500">
            {language === 'gu' ? 'પરીક્ષા પૂર્ણ થતાં જ પેપર અને આન્સર કી ઉપલબ્ધ થાય છે' : 'Paper & solutions available hours after exam finishes'}
          </div>
        </div>

        {/* Concluded Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONCLUDED_EXAM_PAPERS.map((paper) => (
            <div
              key={paper.id}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    paper.authority === 'UPSC' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {paper.authority}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{paper.provisionalKeyStatus}</span>
                  </span>
                </div>

                <h4 className="font-semibold text-sm text-stone-900 leading-snug">
                  {language === 'gu' ? paper.examNameGu : paper.examNameEn}
                </h4>

                <p className="text-xs text-stone-500 line-clamp-1">
                  {language === 'gu' ? paper.paperTypeGu : paper.paperTypeEn}
                </p>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{language === 'gu' ? paper.expectedCutoffGu : paper.expectedCutoffEn}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-stone-400">
                  {paper.totalQuestions} Qs
                </span>

                <button
                  onClick={() => onOpenPaper && onOpenPaper(paper.paperId)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-md"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'gu' ? 'સોલ્વ કરો & સોલ્યુશન' : 'Solve & Solutions'}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Exam Day Fast-Track Process Explainer */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-950">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'આગામી પરીક્ષાઓ માટે લાઈવ પેપર રિલીઝ પ્રોટોકોલ:' : 'Live Post-Exam Release Protocol for Upcoming Exams:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {language === 'gu'
              ? 'જ્યારે પણ નવી GPSC અથવા UPSC પરીક્ષા પૂર્ણ થાય છે (રવિવારે બપોરે), ત્યારે થોડા જ કલાકોમાં આ પોર્ટલ પર સમગ્ર માસ્ટર ક્વેશ્ચન પેપર, વિષયવાર પ્રશ્ન વિભાજન, સંભવિત આન્સર કી અને અપેક્ષિત કટ-ઓફ કેલ્ક્યુલેટર લાઈવ થઈ જાય છે, જેથી વિદ્યાર્થીઓ તરત જ પોતાનો સ્કોર ચકાસી શકે.'
              : 'As soon as any upcoming GPSC or UPSC exam concludes on exam Sunday, the complete master question paper, subject-wise distribution, provisional answer key, and cut-off calculator are released on Sankalp within hours, enabling aspirants to check their score and review solutions immediately.'}
          </p>
        </div>

      </div>

      {/* Official Notifications & Bulletins Feed */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <Bell className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-stone-900">
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
                  <span className="font-medium px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px]">
                    {notif.authority}
                  </span>
                  {notif.isNew && (
                    <span className="font-medium px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] animate-pulse">
                      NEW
                    </span>
                  )}
                  <span className="text-stone-400 text-[11px]">{notif.date}</span>
                </div>
                <div className="font-semibold text-stone-900 text-sm">
                  {language === 'gu' ? notif.titleGu : notif.titleEn}
                </div>
              </div>

              <a
                href={notif.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-stone-200 hover:border-emerald-400 text-emerald-800 font-semibold transition-all shrink-0"
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
