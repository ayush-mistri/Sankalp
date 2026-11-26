'use client';

import React, { useState, useEffect } from 'react';
import { Language, PYQQuestion, PrelimsPaperMeta, QuestionSubject } from '@/types';
import { 
  ArrowLeft,
  Award,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Sparkles,
  XCircle,
  Eye,
  EyeOff,
  Check,
  Layers,
  Printer,
  BookOpen
} from 'lucide-react';

interface FullPaperSimulatorProps {
  paper: PrelimsPaperMeta;
  questions: PYQQuestion[];
  language: Language;
  onExit: () => void;
  onReadConcept?: (topicId: string) => void;
  initialMode?: 'full_paper' | 'exam' | 'solutions';
  onOpenPdf?: () => void;
}

const SUBJECT_LABELS: Record<QuestionSubject, { en: string; gu: string; icon: string }> = {
  history: { en: 'History of India & Gujarat', gu: 'ભારત અને ગુજરાતનો ઇતિહાસ', icon: '🏛️' },
  heritage: { en: 'Cultural Heritage of Gujarat', gu: 'ગુજરાતનો સાંસ્કૃતિક વારસો', icon: '🎭' },
  polity: { en: 'Indian Polity & Constitution', gu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા', icon: '⚖️' },
  mental_ability: { en: 'Mental Ability & Reasoning', gu: 'સામાન્ય બૌદ્ધિક ક્ષમતા (ગણિત/રીઝનિંગ)', icon: '🧮' },
  economy: { en: 'Indian & Gujarat Economy', gu: 'અર્થતંત્ર અને વિકાસ', icon: '📈' },
  geography: { en: 'Geography of India & Gujarat', gu: 'ભૂગોળ', icon: '🗺️' },
  environment: { en: 'Environment & Ecology', gu: 'પર્યાવરણ અને પરિસ્થિતિકી', icon: '🌿' },
  science_tech: { en: 'Science & Technology', gu: 'વિજ્ઞાન અને ટેકનોલોજી', icon: '🔬' },
  current_affairs: { en: 'Current Affairs & Governance', gu: 'વર્તમાન પ્રવાહો', icon: '🌐' },
};


export const FullPaperSimulator: React.FC<FullPaperSimulatorProps> = ({
  paper,
  questions,
  language,
  onExit,
  onReadConcept,
  initialMode,
  onOpenPdf,
}) => {
  // Mode: 'full_paper' (Continuous Paper Reader) vs 'exam' (Timed Simulation) vs 'solutions' (Full Study & Solutions)
  const [activeMode, setActiveMode] = useState<'full_paper' | 'exam' | 'solutions'>(initialMode || 'full_paper');
  const [showAnswerKeys, setShowAnswerKeys] = useState<boolean>(true);
  const [paperLanguageMode, setPaperLanguageMode] = useState<'bilingual' | 'gu' | 'en'>('bilingual');
  
  // Subject Filter
  const [selectedSubject, setSelectedSubject] = useState<'all' | QuestionSubject>('all');

  // Current active question in test/solution view
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Student Responses
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({}); // questionId -> boolean


  // Timer
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(paper.durationMinutes * 60);

  // Submission & Results
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Filter in Solutions mode
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  // Available subjects from paper questions
  const availableSubjects = Array.from(
    new Set(questions.map((q) => q.subject).filter(Boolean))
  ) as QuestionSubject[];

  // Filtered by subject
  const subjectFilteredQuestions = questions.filter((q) => {
    if (selectedSubject === 'all') return true;
    return q.subject === selectedSubject;
  });

  // Countdown timer effect
  useEffect(() => {
    if (activeMode !== 'exam' || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMode, isSubmitted]);

  const activeQuestion = subjectFilteredQuestions[currentIndex] || subjectFilteredQuestions[0] || questions[0];

  // Helper formatting for timer mm:ss
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Clear answer
  const handleClearAnswer = (questionId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Toggle bookmark / review
  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Scoring calculations
  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const marksPerQuestion = paper.examAgency === 'UPSC' ? 2.0 : 1.0;
    const penaltyPerQuestion = paper.examAgency === 'UPSC' ? (2.0 / 3.0) : 0.30;

    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (!selected) {
        unattemptedCount++;
      } else {
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (correctOpt?.id === selected) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const rawScore = correctCount * marksPerQuestion;
    const negativeMarks = incorrectCount * penaltyPerQuestion;
    const finalScore = Math.max(0, Number((rawScore - negativeMarks).toFixed(2)));
    const totalAttempted = correctCount + incorrectCount;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    return {
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalAttempted,
      finalScore,
      negativeMarks: Number(negativeMarks.toFixed(2)),
      accuracy,
      maxMarks: paper.totalMarks,
    };
  };

  const results = calculateResults();

  // Filtered questions for solutions mode
  const filteredSolutionQuestions = subjectFilteredQuestions.filter((q) => {
    const selected = userAnswers[q.id];
    const isCorrect = q.options.find((o) => o.isCorrect)?.id === selected;

    if (solutionFilter === 'all') return true;
    if (solutionFilter === 'correct') return !!selected && isCorrect;
    if (solutionFilter === 'incorrect') return !!selected && !isCorrect;
    if (solutionFilter === 'unattempted') return !selected;
    return true;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* Top Paper Header Bar */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Exit Paper Simulator"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase ${
                paper.examAgency === 'UPSC' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {paper.examAgency} {paper.year}
              </span>
              <span className="text-xs text-stone-300 font-medium">
                {language === 'gu' ? paper.paperTypeGu : paper.paperTypeEn}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {language === 'gu' ? paper.examNameGu : paper.examNameEn}
            </h2>
          </div>
        </div>

        {/* Mode Switcher: Full Paper Reader vs Timed Exam vs Solutions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-stone-800 border border-stone-700">
            <button
              onClick={() => setActiveMode('full_paper')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMode === 'full_paper'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'સંપૂર્ણ પેપર (Full Paper)' : 'Full Paper Reader'}</span>
            </button>

            <button
              onClick={() => setActiveMode('exam')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMode === 'exam'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'ટેસ્ટ આપો (Exam Test)' : 'Timed Exam'}</span>
            </button>

            <button
              onClick={() => setActiveMode('solutions')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMode === 'solutions'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'સોલ્યુશન (Solutions)' : 'Solutions'}</span>
            </button>

            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md ml-1 border border-emerald-400/40"
                title="View full official 200-question PDF document"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'gu' ? 'મૂળ પેપર PDF (૨૦૦ પ્રશ્નો)' : 'Official PDF (200 Qs)'}</span>
              </button>
            )}
          </div>

          {/* Timer Display for Exam Mode */}
          {activeMode === 'exam' && !isSubmitted && (
            <div className={`px-3.5 py-1.5 rounded-xl border font-mono font-semibold text-xs flex items-center gap-1.5 ${
              timeRemainingSeconds < 300
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-stone-800 border-stone-700 text-emerald-400'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>
          )}
        </div>
      </div>


      {/* ========================================================================= */}
      {/* SUBJECT DISTRIBUTION TABS BAR (OFFICIAL 200-QUESTION WEIGHTAGE) */}
      {/* ========================================================================= */}
      {availableSubjects.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-2xl bg-stone-100 border border-stone-200">
          <span className="text-xs font-medium text-stone-700 px-2 flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'gu' ? 'વિષયવાર ફિલ્ટર:' : 'Filter by Subject:'}</span>
          </span>

          <button
            onClick={() => { setSelectedSubject('all'); setCurrentIndex(0); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
            }`}
          >
            {language === 'gu' ? 'તમામ વિષયો' : 'All Subjects'} ({paper.totalQuestions})
          </button>

          {availableSubjects.map((subj) => {
            const breakdownItem = paper.subjectBreakdown?.find(b => 
              b.subjectEn.toLowerCase().includes(subj.replace('_', ' ')) ||
              (subj === 'history' && b.subjectEn.includes('History')) ||
              (subj === 'heritage' && b.subjectEn.includes('Heritage')) ||
              (subj === 'polity' && b.subjectEn.includes('Polity')) ||
              (subj === 'mental_ability' && (b.subjectEn.includes('Mental') || b.subjectEn.includes('Reasoning')))
            );
            const countLabel = breakdownItem ? `${breakdownItem.questionCount}` : `${questions.filter(q => q.subject === subj).length}`;
            const meta = SUBJECT_LABELS[subj];
            return (
              <button
                key={subj}
                onClick={() => { setSelectedSubject(subj); setCurrentIndex(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === subj
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                }`}
              >
                <span>{meta?.icon || '📚'}</span>
                <span>{language === 'gu' ? meta?.gu : meta?.en}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedSubject === subj ? 'bg-white/20' : 'bg-stone-100 text-stone-700 font-mono font-medium'
                }`}>
                  {countLabel}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW A: POST-SUBMISSION SCORECARD BANNER */}
      {/* ========================================================================= */}
      {isSubmitted && (
        <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-xl space-y-5 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl sm:text-2xl font-bold">
                {language === 'gu' ? 'પરીક્ષા પરિણામ અને સ્કોરકાર્ડ' : 'Full Paper Test Result & Scorecard'}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {paper.cutoffTextEn || 'Official Cutoff Evaluated'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-medium text-stone-400">{language === 'gu' ? 'અંતિમ સ્કોર' : 'Final Score'}</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{results.finalScore}</div>
              <span className="text-[10px] text-stone-400">/{results.maxMarks}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-medium text-stone-400">{language === 'gu' ? 'સાચા જવાબો' : 'Correct'}</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">+{results.correctCount}</div>
              <span className="text-[10px] text-emerald-300/70">{(results.correctCount * (paper.examAgency === 'UPSC' ? 2 : 1)).toFixed(1)} Marks</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-medium text-stone-400">{language === 'gu' ? 'ખોટા જવાબો' : 'Incorrect'}</span>
              <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">-{results.incorrectCount}</div>
              <span className="text-[10px] text-rose-300/70">-{results.negativeMarks} Negative</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-medium text-stone-400">{language === 'gu' ? 'બાકી રાખેલ' : 'Unattempted'}</span>
              <div className="text-xl sm:text-2xl font-black text-stone-300 font-mono">{results.unattemptedCount}</div>
              <span className="text-[10px] text-stone-400">0 Marks</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-medium text-stone-400">{language === 'gu' ? 'ચોકસાઈ (Accuracy)' : 'Accuracy'}</span>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">{results.accuracy}%</div>
              <span className="text-[10px] text-stone-400">{results.totalAttempted} Attempted</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs text-stone-300">
            <div>
              <span>{language === 'gu' ? 'નીચે આપેલ બટનથી સમગ્ર પેપરના તમામ પ્રશ્નોના અધિકૃત જવાબો અને સમજૂતી જુઓ:' : 'Review each question and detailed official solutions below:'}</span>
            </div>
            <button
              onClick={() => setActiveMode('solutions')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'gu' ? 'સમગ્ર સોલ્યુશન જુઓ' : 'Review Full Paper Solutions'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: FULL PAPER READER (PRINTABLE, BILINGUAL, FULL DOCUMENT VIEW) */}
      {/* ========================================================================= */}
      {activeMode === 'full_paper' && (
        <div className="space-y-6">
          
          {/* Paper Control Panel: Show Answers Toggle, Language Selector, Print Button */}
          <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Left: Language Selection & Show Key Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Show Key Toggle */}
              <button
                onClick={() => setShowAnswerKeys(!showAnswerKeys)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  showAnswerKeys
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-300 hover:border-emerald-400'
                }`}
              >
                {showAnswerKeys ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>
                  {showAnswerKeys 
                    ? (language === 'gu' ? 'જવાબો અને સમજૂતી ચાલુ છે' : 'Official Keys & Explanations: ON')
                    : (language === 'gu' ? 'માત્ર પ્રશ્નપત્ર (જવાબો છુપાવો)' : 'Question Paper Only (Keys Hidden)')}
                </span>
              </button>

              {/* Bilingual View Selector */}
              <div className="flex items-center gap-1 p-1 bg-white border border-stone-200 rounded-xl text-xs">
                <span className="text-[11px] font-medium text-stone-400 px-2">{language === 'gu' ? 'ભાષા:' : 'Lang:'}</span>
                {[
                  { id: 'bilingual' as const, label: language === 'gu' ? 'દ્વિભાષી (બંને)' : 'Bilingual (Both)' },
                  { id: 'gu' as const, label: 'ગુજરાતી' },
                  { id: 'en' as const, label: 'English' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setPaperLanguageMode(l.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-all ${
                      paperLanguageMode === l.id
                        ? 'bg-stone-900 text-white shadow-md'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Print / PDF Export & Start Test Mode */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                title="Print clean paper or save as PDF"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>{language === 'gu' ? 'પેપર પ્રિન્ટ / PDF ડાઉનલોડ' : 'Print / Export PDF'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('exam');
                  setIsSubmitted(false);
                  setTimeRemainingSeconds(paper.durationMinutes * 60);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Clock className="w-4 h-4" />
                <span>{language === 'gu' ? 'સમયબદ્ધ ટેસ્ટ આપો' : 'Start Timed Test'}</span>
              </button>
            </div>

          </div>

          {/* Printable Official Paper Header Banner */}
          <div className="p-8 rounded-3xl bg-stone-900 text-white space-y-4 border border-stone-800 shadow-md">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">
                {paper.examAgency === 'UPSC' ? 'UNION PUBLIC SERVICE COMMISSION' : 'GUJARAT PUBLIC SERVICE COMMISSION'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {language === 'gu' ? paper.examNameGu : paper.examNameEn}
              </h2>
              <div className="text-sm font-medium text-stone-300">
                {language === 'gu' ? paper.paperTypeGu : paper.paperTypeEn}
              </div>
              {paper.advertisementNo && (
                <div className="text-xs text-stone-400 font-mono">
                  Advt No: {paper.advertisementNo} · {paper.examDate || ''} · Paper Code: {paper.paperCode || 'CSP-1'}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 text-[10px] block uppercase font-medium">{language === 'gu' ? 'કુલ પ્રશ્નો (સમગ્ર પેપર)' : 'Total Paper Questions'}</span>
                <strong className="text-emerald-400 text-sm font-mono font-semibold">{paper.totalQuestions} Questions</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 text-[10px] block uppercase font-medium">{language === 'gu' ? 'કુલ ગુણ' : 'Max Marks'}</span>
                <strong className="text-stone-100 text-sm font-mono font-semibold">{paper.totalMarks} Marks</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 text-[10px] block uppercase font-medium">{language === 'gu' ? 'સમય અવધિ' : 'Duration'}</span>
                <strong className="text-stone-100 text-sm font-mono font-semibold">{paper.durationMinutes} Minutes (3h)</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-stone-400 text-[10px] block uppercase font-medium">{language === 'gu' ? 'ઋણ ગુણાંકન' : 'Negative Marking'}</span>
                <strong className="text-rose-400 text-sm font-mono font-semibold">{paper.examAgency === 'UPSC' ? '-0.66 (1/3)' : '-0.30'}</strong>
              </div>
            </div>

            {/* Official GPSC / UPSC Section Breakdown Indicator */}
            {paper.subjectBreakdown && paper.subjectBreakdown.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <div className="text-[11px] font-medium text-stone-300 mb-2 flex items-center justify-between">
                  <span>{language === 'gu' ? 'સત્તાવાર વિભાગવાર વિભાજન (Syllabus Structure):' : 'Official Section Structure & Question Distribution:'}</span>
                  <span className="text-stone-400 font-mono text-[10px]">
                    {language === 'gu' ? `દર્શાવાતા પ્રશ્નો: ${subjectFilteredQuestions.length}` : `Loaded Qs: ${subjectFilteredQuestions.length}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                  {paper.subjectBreakdown.map((sec, sidx) => (
                    <div key={sidx} className="p-2 rounded-xl bg-white/5 border border-white/10 text-stone-300 flex items-center justify-between">
                      <div className="truncate pr-1">
                        <span className="font-medium text-white block">Sec {sidx + 1}: {language === 'gu' ? sec.subjectGu : sec.subjectEn}</span>
                        <span className="text-[10px] text-stone-400">Q.{sidx * 50 + 1} to Q.{(sidx + 1) * 50}</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-medium shrink-0">
                        {sec.questionCount} Qs
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sequential Questions Stream (Questions 1 to N) */}
          <div className="space-y-6">
            {subjectFilteredQuestions.map((q, idx) => {
              const correctOption = q.options.find(o => o.isCorrect);

              return (
                <div
                  key={q.id}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 hover:border-emerald-300 shadow-md transition-all space-y-4"
                >
                  {/* Question Header & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold font-mono shadow-md">
                        Q.{idx + 1}
                      </span>
                      {q.subject && SUBJECT_LABELS[q.subject] && (
                        <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                          {SUBJECT_LABELS[q.subject].icon} {language === 'gu' ? SUBJECT_LABELS[q.subject].gu : SUBJECT_LABELS[q.subject].en}
                        </span>
                      )}
                      <span className="text-[11px] font-medium text-stone-500 bg-stone-50 px-2.5 py-0.5 rounded-md border border-stone-200">
                        {q.cognitiveType}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-400">
                      {paper.examAgency === 'UPSC' ? '+2.00 / -0.66' : '+1.00 / -0.30'}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-3">
                    {/* Gujarati Text */}
                    {(paperLanguageMode === 'bilingual' || paperLanguageMode === 'gu') && (
                      <div className="text-base sm:text-lg font-semibold text-stone-900 leading-relaxed whitespace-pre-line font-serif sm:font-sans">
                        {q.questionGu}
                      </div>
                    )}

                    {/* English Text */}
                    {(paperLanguageMode === 'bilingual' || paperLanguageMode === 'en') && (
                      <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                        paperLanguageMode === 'bilingual' ? 'text-stone-600 pt-1 border-t border-stone-100' : 'text-stone-900 font-semibold'
                      }`}>
                        {q.questionEn}
                      </div>
                    )}
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {q.options.map((opt) => {
                      const isCorrect = opt.isCorrect;

                      let optClass = 'border-stone-200 bg-stone-50/60 text-stone-800';
                      if (showAnswerKeys && isCorrect) {
                        optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${optClass}`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium ${
                            showAnswerKeys && isCorrect
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-stone-300 bg-white text-stone-700'
                          }`}>
                            {opt.id.slice(-1).toUpperCase()}
                          </div>

                          <div className="flex-1 space-y-1">
                            {(paperLanguageMode === 'bilingual' || paperLanguageMode === 'gu') && (
                              <div className="font-medium text-stone-900 leading-relaxed">
                                {opt.textGu}
                              </div>
                            )}
                            {(paperLanguageMode === 'bilingual' || paperLanguageMode === 'en') && (
                              <div className={paperLanguageMode === 'bilingual' ? 'text-xs text-stone-600 leading-relaxed' : 'text-stone-800 leading-relaxed'}>
                                {opt.textEn}
                              </div>
                            )}
                          </div>

                          {showAnswerKeys && isCorrect && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-600 text-white shrink-0">
                              ✓ {language === 'gu' ? 'સાચો ઉત્તર' : 'Key'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Card when Answer Keys are Toggled ON */}
                  {showAnswerKeys && (
                    <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 mt-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
                          <Check className="w-4 h-4 text-emerald-700" />
                          <span>{language === 'gu' ? 'અધિકૃત ઉત્તર & વિસ્તૃત સમજૂતી:' : 'Official Answer & Pedagogical Explanation:'}</span>
                        </div>
                        {onReadConcept && (
                          <button
                            onClick={() => onReadConcept(q.topicId)}
                            className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                          >
                            <span>{language === 'gu' ? 'આ કોન્સેપ્ટ વિગતવાર વાંચો' : 'Read Topic in Notes'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 text-xs leading-relaxed text-stone-800">
                        <p>
                          <strong className="font-semibold">{language === 'gu' ? 'સમજૂતી (ગુજરાતી): ' : 'Gujarati Explanation: '}</strong>
                          {q.explanationGu}
                        </p>
                        <p className="text-stone-600">
                          <strong className="font-semibold">English Analysis: </strong>
                          {q.explanationEn}
                        </p>
                      </div>

                      {/* Source Concept Path */}
                      <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1 text-[11px] font-medium text-emerald-900">
                        <span>🏷️ {language === 'gu' ? q.sourceConceptGu : q.sourceConceptEn}</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: TIMED EXAM MODE INTERACTION */}
      {/* ========================================================================= */}
      {activeMode === 'exam' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Question Display (8 Cols) */}
          <main className="lg:col-span-8 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-6">
              
              {/* Question Header & Action Row */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium font-mono">
                    {language === 'gu' ? 'પ્રશ્ન' : 'Question'} {currentIndex + 1} / {subjectFilteredQuestions.length}
                  </span>
                  {activeQuestion.subject && SUBJECT_LABELS[activeQuestion.subject] && (
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                      {SUBJECT_LABELS[activeQuestion.subject].icon} {language === 'gu' ? SUBJECT_LABELS[activeQuestion.subject].gu : SUBJECT_LABELS[activeQuestion.subject].en}
                    </span>
                  )}
                  <span className="text-xs text-stone-500">
                    {paper.examAgency === 'UPSC' ? '+2.0 / -0.66' : '+1.0 / -0.30'} Marks
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleReview(activeQuestion.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      markedForReview[activeQuestion.id]
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[activeQuestion.id] ? (language === 'gu' ? 'રિવ્યુ માટે ચિહ્નિત છે' : 'Marked for Review') : (language === 'gu' ? 'રિવ્યુ માટે ચિહ્નિત કરો' : 'Mark for Review')}</span>
                  </button>
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed whitespace-pre-line">
                {language === 'gu' ? activeQuestion.questionGu : activeQuestion.questionEn}
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-3 pt-2">
                {activeQuestion.options.map((opt) => {
                  const isSelected = userAnswers[activeQuestion.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(activeQuestion.id, opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-semibold ring-2 ring-emerald-700'
                          : 'border-stone-200 bg-white hover:border-emerald-300 text-stone-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium ${
                        isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'
                      }`}>
                        {opt.id.slice(-1).toUpperCase()}
                      </div>
                      <span className="flex-1 leading-relaxed">
                        {language === 'gu' ? opt.textGu : opt.textEn}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Control Bar */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{language === 'gu' ? 'પાછલો' : 'Previous'}</span>
                  </button>

                  <button
                    disabled={!userAnswers[activeQuestion.id] || isSubmitted}
                    onClick={() => handleClearAnswer(activeQuestion.id)}
                    className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-500 hover:text-rose-600 disabled:opacity-30 transition-colors"
                  >
                    {language === 'gu' ? 'જવાબ સાફ કરો' : 'Clear'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {currentIndex < subjectFilteredQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(subjectFilteredQuestions.length - 1, prev + 1))}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-md hover:shadow-md transition-all flex items-center gap-1"
                    >
                      <span>{language === 'gu' ? 'સેવ & આગળ વધો →' : 'Save & Next →'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      {language === 'gu' ? 'પેપર સબમિટ કરો' : 'Submit Paper'}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </main>

          {/* Right Sidebar: Question Palette Grid (4 Cols) */}
          <aside className="lg:col-span-4 space-y-5 p-6 rounded-3xl bg-stone-50 border border-stone-200 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-xs font-medium uppercase tracking-wider text-stone-800">
                {language === 'gu' ? 'પ્રશ્ન પેલેટ (Question Palette)' : 'Question Palette'}
              </h4>
              <span className="text-xs font-mono font-semibold text-emerald-800">
                {subjectFilteredQuestions.filter(q => !!userAnswers[q.id]).length} / {subjectFilteredQuestions.length}
              </span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600 shrink-0" />
                <span>{language === 'gu' ? 'ઉત્તર આપેલ' : 'Answered'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-purple-600 shrink-0" />
                <span>{language === 'gu' ? 'રિવ્યુ માટે' : 'For Review'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-stone-200 border border-stone-300 shrink-0" />
                <span>{language === 'gu' ? 'બાકી' : 'Unattempted'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md border-2 border-emerald-700 bg-white shrink-0" />
                <span>{language === 'gu' ? 'હાલનો પ્રશ્ન' : 'Current'}</span>
              </div>
            </div>

            {/* Question Buttons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 pt-2 border-t border-stone-200 max-h-72 overflow-y-auto p-1">
              {subjectFilteredQuestions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isReview = !!markedForReview[q.id];
                const isCurrent = currentIndex === idx;

                let btnStyle = 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300';
                if (isAnswered && isReview) {
                  btnStyle = 'bg-purple-600 text-white border-purple-600 font-semibold';
                } else if (isAnswered) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-semibold';
                } else if (isReview) {
                  btnStyle = 'bg-purple-100 text-purple-900 border-purple-300 font-semibold';
                }

                if (isCurrent) {
                  btnStyle += ' ring-2 ring-emerald-700 ring-offset-1';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono transition-all flex items-center justify-center ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Final Submit Button */}
            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-900/20"
              >
                {language === 'gu' ? 'સંપૂર્ણ પેપર સબમિટ કરો' : 'Submit Whole Paper'}
              </button>
            </div>

          </aside>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW C: FULL PAPER SOLUTIONS & STUDY MODE */}
      {/* ========================================================================= */}
      {activeMode === 'solutions' && (
        <div className="space-y-6">
          
          {/* Solution Filters Bar */}
          <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-600">
                {language === 'gu' ? 'સ્થિતિ ફિલ્ટર:' : 'Filter Solutions:'}
              </span>
              {[
                { id: 'all' as const, label: 'All Questions', count: subjectFilteredQuestions.length },
                { id: 'correct' as const, label: 'Correct', count: results.correctCount },
                { id: 'incorrect' as const, label: 'Incorrect', count: results.incorrectCount },
                { id: 'unattempted' as const, label: 'Unattempted', count: results.unattemptedCount },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSolutionFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    solutionFilter === f.id
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 font-mono">
              {filteredSolutionQuestions.length} {language === 'gu' ? 'પ્રશ્નો ઉપલબ્ધ' : 'Questions Matched'}
            </div>
          </div>

          {/* Solutions List */}
          <div className="space-y-6">
            {filteredSolutionQuestions.map((q) => {
              const selectedOptionId = userAnswers[q.id];
              const correctOption = q.options.find((o) => o.isCorrect);
              const isUserCorrect = selectedOptionId && selectedOptionId === correctOption?.id;

              return (
                <div
                  key={q.id}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-5"
                >
                  {/* Question Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium font-mono">
                        Q{questions.findIndex((item) => item.id === q.id) + 1}
                      </span>
                      {q.subject && SUBJECT_LABELS[q.subject] && (
                        <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                          {SUBJECT_LABELS[q.subject].icon} {language === 'gu' ? SUBJECT_LABELS[q.subject].gu : SUBJECT_LABELS[q.subject].en}
                        </span>
                      )}
                      <span className="text-xs font-medium text-stone-600 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
                        {q.sourceConceptEn}
                      </span>
                    </div>

                    {selectedOptionId && (
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 ${
                        isUserCorrect
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {isUserCorrect ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === 'gu' ? 'તમારો ઉત્તર સાચો છે' : 'You Got This Correct'}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>{language === 'gu' ? 'તમારો ઉત્તર ખોટો છે' : 'You Got This Wrong'}</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed whitespace-pre-line">
                    {language === 'gu' ? q.questionGu : q.questionEn}
                  </div>

                  {/* Options with Official Highlights */}
                  <div className="space-y-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isCorrect = opt.isCorrect;
                      const isSelected = selectedOptionId === opt.id;

                      let optClass = 'border-stone-200 bg-stone-50/50 text-stone-700';
                      if (isCorrect) {
                        optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optClass = 'border-rose-400 bg-rose-50 text-rose-950';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${optClass}`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium ${
                            isCorrect 
                              ? 'border-emerald-600 bg-emerald-600 text-white' 
                              : isSelected
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : 'border-stone-300'
                          }`}>
                            {opt.id.slice(-1).toUpperCase()}
                          </div>
                          <span className="flex-1 leading-relaxed">
                            {language === 'gu' ? opt.textGu : opt.textEn}
                          </span>
                          {isCorrect && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-600 text-white shrink-0">
                              {language === 'gu' ? 'અધિકૃત ઉત્તર' : 'Official Key'}
                            </span>
                          )}
                          {isSelected && !isCorrect && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-rose-200 text-rose-900 shrink-0">
                              {language === 'gu' ? 'તમારો વિકલ્પ' : 'Your Answer'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Official Explanation Box */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>{language === 'gu' ? 'અધિકૃત વિશ્લેષણ અને સમજૂતી:' : 'Official Analysis & In-Depth Explanation:'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {language === 'gu' ? q.explanationGu : q.explanationEn}
                    </p>

                    {q.options.some((o) => o.whyWrongEn) && (
                      <div className="pt-2 border-t border-stone-200 space-y-1 text-xs text-stone-600">
                        <strong className="text-rose-800 font-semibold">{language === 'gu' ? 'ખોટા વિકલ્પો શા માટે અમાન્ય છે:' : 'Why Other Options are Invalid:'}</strong>
                        <ul className="list-disc list-inside space-y-0.5 pl-1">
                          {q.options.filter((o) => o.whyWrongEn).map((o) => (
                            <li key={o.id}>
                              <strong className="font-semibold">Option {o.id.slice(-1).toUpperCase()}: </strong>
                              {language === 'gu' ? o.whyWrongGu : o.whyWrongEn}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {onReadConcept && (
                      <div className="pt-2 border-t border-stone-200 flex justify-end">
                        <button
                          onClick={() => onReadConcept(q.topicId)}
                          className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1 text-xs"
                        >
                          <span>{language === 'gu' ? 'આ વિષયનો સિલેબસ નોટ્સ વાંચો →' : 'Read Topic Notes →'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Confirmation Modal for Submitting Test */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-7 rounded-3xl bg-white max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-stone-900">
                {language === 'gu' ? 'શું તમે ખરેખર પેપર સબમિટ કરવા માંગો છો?' : 'Submit Whole Paper Test?'}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === 'gu'
                  ? `તમે ${questions.length} માંથી ${Object.keys(userAnswers).length} પ્રશ્નોના ઉત્તરો આપ્યા છે. સબમિટ કર્યા પછી તમારું સ્કોરકાર્ડ અને સંપૂર્ણ સોલ્યુશન ઉપલબ્ધ થશે.`
                  : `You have answered ${Object.keys(userAnswers).length} out of ${questions.length} questions. Once submitted, your final score and detailed paper solutions will be generated.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                {language === 'gu' ? 'પરીક્ષા ચાલુ રાખો' : 'Resume Test'}
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  setIsSubmitted(true);
                  setActiveMode('solutions');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm"
              >
                {language === 'gu' ? 'હા, સબમિટ કરો' : 'Confirm & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
