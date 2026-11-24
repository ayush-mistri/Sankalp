'use client';

import React, { useState, useEffect } from 'react';
import { Language, PYQQuestion, ExamAgency, PrelimsPaperMeta, PaperStage, PaperMedium } from '@/types';
import { PYQ_QUESTIONS } from '@/data/pyqQuestions';
import { PRELIMS_PAPERS_ARCHIVE } from '@/data/prelimsPapersArchive';
import { getPaperQuestions } from '@/data/papers';
import { FullPaperSimulator } from './FullPaperSimulator';
import { SankalpPdfViewer } from './SankalpPdfViewer';
import { 
  ArrowLeft,
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Download,
  ExternalLink,
  FileText,
  Filter, 
  HelpCircle, 
  Layers,
  PenTool, 
  RotateCcw, 
  Search,
  Sparkles, 
  Target, 
  TrendingUp,
  XCircle,
  Clock,
  Award,
  BookOpen,
  Printer,
  Star,
  History,
  ShieldCheck,
  Check,
  Trash2,
  X
} from 'lucide-react';

interface PracticeViewProps {
  language: Language;
  onBackToRoadmap: () => void;
  onReadConcept: (topicId: string) => void;
  initialPaperId?: string | null;
  onClearInitialPaper?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  language,
  onBackToRoadmap,
  onReadConcept,
  initialPaperId,
  onClearInitialPaper,
}) => {
  // Top-level View Mode: 'archive' (Papers Vault) vs 'solver' (Interactive Practice)
  const [activeSubTab, setActiveSubTab] = useState<'archive' | 'solver'>('archive');

  // Full Paper Simulator active state
  const [activePaperSimulator, setActivePaperSimulator] = useState<{
    paper: PrelimsPaperMeta;
    initialMode: 'full_paper' | 'exam' | 'solutions';
  } | null>(null);

  // Active Sankalp PDF Viewer state (Complete 200 Questions Paper Document)
  const [activePdfPaper, setActivePdfPaper] = useState<PrelimsPaperMeta | null>(null);

  // Handle external navigation request to open a specific paper (e.g. from Live Exam Tracker)
  useEffect(() => {
    if (initialPaperId) {
      const found = PRELIMS_PAPERS_ARCHIVE.find((p) => p.id === initialPaperId);
      if (found) {
        setActivePaperSimulator({
          paper: found,
          initialMode: 'solutions',
        });
        setActiveSubTab('archive');
      }
      if (onClearInitialPaper) {
        onClearInitialPaper();
      }
    }
  }, [initialPaperId, onClearInitialPaper]);

  // Archive Filters (Exam Agency, Year, Stage, Medium, Subject, Search)
  const [archiveAgency, setArchiveAgency] = useState<'all' | ExamAgency>('all');
  const [archiveYear, setArchiveYear] = useState<number | 'all'>('all');
  const [archiveStage, setArchiveStage] = useState<'all' | PaperStage>('all');
  const [archiveMedium, setArchiveMedium] = useState<'all' | PaperMedium>('all');
  const [archiveSubject, setArchiveSubject] = useState<string>('all');
  const [archiveSearchQuery, setArchiveSearchQuery] = useState<string>('');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  // Bookmarked and Recently Viewed Papers
  const [bookmarkedPaperIds, setBookmarkedPaperIds] = useState<string[]>([]);
  const [recentPaperIds, setRecentPaperIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedB = localStorage.getItem('sankalp_bookmarked_papers');
      if (savedB) setBookmarkedPaperIds(JSON.parse(savedB));
      const savedR = localStorage.getItem('sankalp_recent_papers');
      if (savedR) setRecentPaperIds(JSON.parse(savedR));
    } catch {}
  }, []);

  const handleToggleBookmark = (paperId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedPaperIds((prev) => {
      const next = prev.includes(paperId) ? prev.filter((id) => id !== paperId) : [...prev, paperId];
      try {
        localStorage.setItem('sankalp_bookmarked_papers', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleTrackPaperView = (paperId: string) => {
    setRecentPaperIds((prev) => {
      const next = [paperId, ...prev.filter((id) => id !== paperId)].slice(0, 8);
      try {
        localStorage.setItem('sankalp_recent_papers', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleClearRecentHistory = () => {
    setRecentPaperIds([]);
    try {
      localStorage.removeItem('sankalp_recent_papers');
    } catch {}
  };

  // Practice Solver Filters
  const [selectedAgency, setSelectedAgency] = useState<'all' | ExamAgency>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedPaperMode, setSelectedPaperMode] = useState<'all' | 'prelims' | 'mains'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  // Practice state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, { optionId: string; isCorrect: boolean }>
  >({});

  const availableYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

  // Filtered Archive Papers matching Year, Agency, Stage, Medium, Subject, Bookmarks & Query
  const filteredPapers = PRELIMS_PAPERS_ARCHIVE.filter((paper) => {
    const matchesAgency = archiveAgency === 'all' || paper.examAgency === archiveAgency;
    const matchesYear = archiveYear === 'all' || paper.year === archiveYear;
    const matchesStage = archiveStage === 'all' || (paper.stage ? paper.stage === archiveStage : archiveStage === 'Prelims');
    const matchesMedium = archiveMedium === 'all' || (paper.medium ? paper.medium === archiveMedium : true);
    const matchesBookmark = !onlyBookmarked || bookmarkedPaperIds.includes(paper.id);

    let matchesSubject = archiveSubject === 'all';
    if (archiveSubject !== 'all') {
      const target = archiveSubject.toLowerCase();
      matchesSubject = paper.subjectBreakdown.some((s) => {
        const full = (s.subjectEn + ' ' + s.subjectGu).toLowerCase();
        if (target === 'polity') return full.includes('polity') || full.includes('constitution') || full.includes('બંધારણ');
        if (target === 'history') return full.includes('history') || full.includes('heritage') || full.includes('ઇતિહાસ') || full.includes('વારસો');
        if (target === 'economy') return full.includes('economy') || full.includes('અર્થતંત્ર');
        if (target === 'geography') return full.includes('geography') || full.includes('environment') || full.includes('ભૂગોળ') || full.includes('પર્યાવરણ');
        if (target === 'science') return full.includes('science') || full.includes('technology') || full.includes('વિજ્ઞાન');
        if (target === 'csat') return full.includes('mental ability') || full.includes('reasoning') || full.includes('ગણિત') || full.includes('csat');
        if (target === 'governance') return full.includes('governance') || full.includes('public administration') || full.includes('વહીવટ');
        return full.includes(target);
      }) || paper.paperTypeEn.toLowerCase().includes(target) || paper.paperTypeGu.toLowerCase().includes(target);
    }

    const query = archiveSearchQuery.toLowerCase().trim();
    const matchesQuery = 
      query === '' ||
      paper.examNameEn.toLowerCase().includes(query) ||
      paper.examNameGu.toLowerCase().includes(query) ||
      paper.paperTypeEn.toLowerCase().includes(query) ||
      paper.paperTypeGu.toLowerCase().includes(query) ||
      (paper.advertisementNo && paper.advertisementNo.toLowerCase().includes(query)) ||
      (paper.paperCode && paper.paperCode.toLowerCase().includes(query));

    return matchesAgency && matchesYear && matchesStage && matchesMedium && matchesBookmark && matchesSubject && matchesQuery;
  });

  const recentPapersList = PRELIMS_PAPERS_ARCHIVE.filter((p) => recentPaperIds.includes(p.id));


  // Filtered Questions for Solver
  const filteredQuestions = PYQ_QUESTIONS.filter((q) => {
    const matchesAgency = 
      selectedAgency === 'all' || 
      (q.examAgency ? q.examAgency === selectedAgency : selectedAgency === 'GPSC');
    const matchesYear = selectedYear === 'all' || q.examYear === selectedYear;
    const isMains = q.paperType.startsWith('Mains');
    const matchesMode = 
      selectedPaperMode === 'all' || 
      (selectedPaperMode === 'prelims' && !isMains) || 
      (selectedPaperMode === 'mains' && isMains);
    
    const matchesSubject = 
      selectedSubject === 'all' ||
      (selectedSubject === 'polity' && (q.topicId.startsWith('topic-f1') || q.topicId.startsWith('topic-f2') || q.topicId.startsWith('topic-a1') || q.topicId.startsWith('topic-i1'))) ||
      (selectedSubject === 'gujarat' && (q.topicId.startsWith('topic-gh') || q.topicId.startsWith('topic-i2'))) ||
      (selectedSubject === 'economy' && (q.topicId.startsWith('topic-f3') || q.sourceConceptEn.toLowerCase().includes('economy')));

    return matchesAgency && matchesYear && matchesMode && matchesSubject;
  });

  // Active Question for Solver
  const safeIndex = Math.min(currentQuestionIndex, Math.max(0, filteredQuestions.length - 1));
  const activeQuestion: PYQQuestion | undefined = filteredQuestions[safeIndex];

  const handleSelectOption = (optId: string) => {
    if (!hasEvaluated && activeQuestion) {
      setSelectedOptionId(optId);
    }
  };

  const handleEvaluate = () => {
    if (!selectedOptionId || !activeQuestion) return;

    const chosenOption = activeQuestion.options.find((o) => o.id === selectedOptionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    setUserAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        optionId: selectedOptionId,
        isCorrect,
      },
    }));

    setHasEvaluated(true);
  };

  const handleNextQuestion = () => {
    if (safeIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(safeIndex + 1);
      setSelectedOptionId(null);
      setHasEvaluated(false);
    }
  };

  const handlePrevQuestion = () => {
    if (safeIndex > 0) {
      setCurrentQuestionIndex(safeIndex - 1);
      setSelectedOptionId(null);
      setHasEvaluated(false);
    }
  };

  const handleResetSession = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasEvaluated(false);
    setUserAnswers({});
  };

  const handleJumpToPracticeForPaper = (paper: PrelimsPaperMeta) => {
    setSelectedAgency(paper.examAgency);
    setSelectedYear(paper.year);
    setSelectedPaperMode('prelims');
    setSelectedSubject('all');
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasEvaluated(false);
    setActiveSubTab('solver');
  };

  // If student clicked to view complete authentic PDF paper
  if (activePdfPaper) {
    return (
      <SankalpPdfViewer
        paper={activePdfPaper}
        language={language}
        onClose={() => setActivePdfPaper(null)}
        onStartExam={() => {
          const p = activePdfPaper;
          setActivePdfPaper(null);
          setActivePaperSimulator({ paper: p, initialMode: 'exam' });
        }}
      />
    );
  }

  // If student clicked to solve whole paper or view whole paper & solutions
  if (activePaperSimulator) {
    const paperQuestions = getPaperQuestions(activePaperSimulator.paper.id);
    const resolvedQuestions = paperQuestions.length > 0 
      ? paperQuestions 
      : PYQ_QUESTIONS.filter(q => q.examYear === activePaperSimulator.paper.year && (q.examAgency ? q.examAgency === activePaperSimulator.paper.examAgency : true));

    return (
      <FullPaperSimulator
        paper={activePaperSimulator.paper}
        questions={resolvedQuestions.length > 0 ? resolvedQuestions : PYQ_QUESTIONS.slice(0, 8)}
        language={language}
        onExit={() => setActivePaperSimulator(null)}
        onReadConcept={onReadConcept}
        initialMode={activePaperSimulator.initialMode}
        onOpenPdf={() => {
          const p = activePaperSimulator.paper;
          setActivePaperSimulator(null);
          setActivePdfPaper(p);
        }}
      />
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Banner */}
      <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-emerald-100 text-xs font-bold border border-white/10">
            <Target className="w-4 h-4 text-emerald-300" />
            <span>{language === 'gu' ? 'GPSC અને UPSC અધિકૃત પ્રિલિમ્સ પેપર ભંડાર' : 'Official GPSC & UPSC Prelims Papers & PYQ Vault'}</span>
          </div>
          <button
            onClick={onBackToRoadmap}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 hover:text-white transition-all border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'મુખ્ય પેજ પર પાછા જાવ' : 'Back to Home'}</span>
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {language === 'gu' 
              ? 'વર્ષવાર GPSC અને UPSC પ્રિલિમ્સ પેપર્સ (૨૦૧૭ - ૨૦૨૪)' 
              : 'Year-Wise GPSC & UPSC Prelims Papers Archive (2017–2024)'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {language === 'gu'
              ? 'GPSC વર્ગ ૧/૨, DYSO અને UPSC સિવિલ સર્વિસીસના દરેક વર્ષના ઓરિજિનલ પેપર્સ, ફાઇનલ આન્સર કી, વિષયવાર પ્રશ્ન વિભાજન, કટ-ઓફ સ્કોર્સ અને ઇન્ટરેક્ટિવ પ્રશ્ન સોલ્વર.'
              : 'Access authentic official question papers, final answer keys, subject-wise weightage distributions, cut-off benchmarks, and solve high-yield Prelims questions directly.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15">
          <button
            onClick={() => setActiveSubTab('archive')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'archive'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/60 border border-white/10'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'ઓફિશિયલ પેપર વોલ્ટ (PDFs & કટ-ઓફ)' : 'Official Papers Vault (PDFs & Cutoffs)'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
              {PRELIMS_PAPERS_ARCHIVE.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('solver')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === 'solver'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/60 border border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'ઇન્ટરેક્ટિવ PYQ પ્રેક્ટિસ સોલ્વર' : 'Interactive PYQ Practice Solver'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
              {PYQ_QUESTIONS.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: OFFICIAL PAPERS ARCHIVE (PDFs, WEIGHTAGE, CUTOFFS & TRENDS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'archive' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Exam Agency, Stage, Medium, Subject, Year, and Search */}
          <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 shadow-xs space-y-4">
            
            {/* Row 1: Exam Agency, Bookmarks & Search Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Agency Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-600 mr-1">
                  {language === 'gu' ? 'પરીક્ષા બોર્ડ:' : 'Exam Agency:'}
                </span>
                {[
                  { id: 'all' as const, label: language === 'gu' ? 'તમામ પરીક્ષાઓ' : 'All Exams' },
                  { id: 'GPSC' as const, label: 'GPSC (Class 1-2 & DySO)' },
                  { id: 'UPSC' as const, label: 'UPSC Civil Services' },
                ].map((agency) => (
                  <button
                    key={agency.id}
                    onClick={() => setArchiveAgency(agency.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      archiveAgency === agency.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    {agency.label}
                  </button>
                ))}

                {/* Bookmark Filter Chip */}
                <button
                  onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    onlyBookmarked
                      ? 'bg-amber-500 text-stone-950 shadow-xs font-black'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-current' : 'text-amber-500'}`} />
                  <span>{language === 'gu' ? `બુકમાર્ક્સ (${bookmarkedPaperIds.length})` : `Bookmarked (${bookmarkedPaperIds.length})`}</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={language === 'gu' ? 'જાહેરાત ક્રમાંક (દા.ત. 47/2023-24), વર્ષ અથવા વિષય...' : 'Search Advt, year, or subject keyword...'}
                  value={archiveSearchQuery}
                  onChange={(e) => setArchiveSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white border border-stone-200 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                />
                {archiveSearchQuery && (
                  <button
                    onClick={() => setArchiveSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

            {/* Row 2: Exam Stage, Medium & Subject Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-200 text-xs">
              
              {/* Exam Stage Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-stone-600">
                  {language === 'gu' ? 'તબક્કો (Exam Stage):' : 'Exam Stage:'}
                </span>
                {[
                  { id: 'all' as const, label: language === 'gu' ? 'તમામ તબક્કા' : 'All Stages' },
                  { id: 'Prelims' as const, label: language === 'gu' ? 'પ્રિલિમ્સ (Prelims)' : 'Prelims (MCQ)' },
                  { id: 'Mains' as const, label: language === 'gu' ? 'મેઈન્સ (Mains)' : 'Mains (Written)' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setArchiveStage(st.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      archiveStage === st.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Subject Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-600">
                  {language === 'gu' ? 'વિષય મુજબ:' : 'Subject:'}
                </span>
                <select
                  value={archiveSubject}
                  onChange={(e) => setArchiveSubject(e.target.value)}
                  className="py-1.5 px-3 rounded-lg border border-stone-200 bg-white font-semibold text-stone-800 text-xs focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="all">{language === 'gu' ? 'તમામ વિષયો (All Subjects)' : 'All Subjects'}</option>
                  <option value="polity">{language === 'gu' ? 'બંધારણ અને રાજ્યવ્યવસ્થા' : 'Polity & Constitution'}</option>
                  <option value="history">{language === 'gu' ? 'ઇતિહાસ અને સાંસ્કૃતિક વારસો' : 'History & Heritage'}</option>
                  <option value="economy">{language === 'gu' ? 'અર્થતંત્ર અને આયોજન' : 'Economy & Planning'}</option>
                  <option value="geography">{language === 'gu' ? 'ભૂગોળ અને પર્યાવરણ' : 'Geography & Environment'}</option>
                  <option value="science">{language === 'gu' ? 'વિજ્ઞાન અને ટેકનોલોજી' : 'Science & Technology'}</option>
                  <option value="csat">{language === 'gu' ? 'CSAT / ગણિત અને રીઝનિંગ' : 'CSAT & Mental Ability'}</option>
                  <option value="governance">{language === 'gu' ? 'શાસન અને જાહેર વહીવટ' : 'Governance & Public Administration'}</option>
                </select>
              </div>

              {/* Medium Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-stone-600">
                  {language === 'gu' ? 'માધ્યમ (Medium):' : 'Medium:'}
                </span>
                {[
                  { id: 'all' as const, label: language === 'gu' ? 'તમામ' : 'All' },
                  { id: 'Bilingual' as const, label: language === 'gu' ? 'દ્વિભાષી' : 'Bilingual' },
                  { id: 'Gujarati' as const, label: 'Gujarati' },
                  { id: 'English' as const, label: 'English' },
                ].map((med) => (
                  <button
                    key={med.id}
                    onClick={() => setArchiveMedium(med.id)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      archiveMedium === med.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    {med.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Row 3: Year Selector Pills (2016 - 2024) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 border-t border-stone-200 text-xs">
              <span className="text-xs font-bold text-stone-600 shrink-0 mr-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'gu' ? 'પરીક્ષા વર્ષ:' : 'Exam Year:'}</span>
              </span>

              <button
                onClick={() => setArchiveYear('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  archiveYear === 'all'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                }`}
              >
                {language === 'gu' ? 'તમામ વર્ષો (2016–2024)' : 'All Years (2016–2024)'}
              </button>

              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setArchiveYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    archiveYear === yr
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            {/* Row 4: Status Counter & Active Filter Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pt-1">
              <div>
                <span>{language === 'gu' ? 'દર્શાવેલ પેપર્સ:' : 'Showing Papers:'} </span>
                <strong className="text-emerald-800 font-mono text-sm">{filteredPapers.length}</strong>
                <span className="text-stone-400 ml-1">/ {PRELIMS_PAPERS_ARCHIVE.length}</span>
              </div>

              {(archiveAgency !== 'all' || archiveYear !== 'all' || archiveStage !== 'all' || archiveMedium !== 'all' || archiveSubject !== 'all' || archiveSearchQuery || onlyBookmarked) && (
                <button
                  onClick={() => {
                    setArchiveAgency('all');
                    setArchiveYear('all');
                    setArchiveStage('all');
                    setArchiveMedium('all');
                    setArchiveSubject('all');
                    setArchiveSearchQuery('');
                    setOnlyBookmarked(false);
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'gu' ? 'તમામ ફિલ્ટર સાફ કરો' : 'Reset All Filters'}</span>
                </button>
              )}

              <div className="text-[11px] text-stone-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'gu' ? 'સત્તાવાર જાહેરનામા આધારે અધિકૃત દસ્તાવેજ સંગ્રહ' : 'Verified via official commission gazettes & portals'}</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RECENTLY VIEWED PAPERS QUICK ACCESS STRIP */}
          {/* ========================================================================= */}
          {recentPapersList.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <div className="flex items-center gap-2 text-emerald-900">
                  <History className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'gu' ? 'તાજેતરમાં જોયેલા પ્રશ્નપત્રો' : 'Recently Viewed Question Papers'}</span>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                    {recentPapersList.length}
                  </span>
                </div>
                <button
                  onClick={handleClearRecentHistory}
                  className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{language === 'gu' ? 'ઇતિહાસ સાફ કરો' : 'Clear History'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {recentPapersList.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex items-center gap-3 shrink-0"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className="font-extrabold text-emerald-800">{rec.examAgency}</span>
                        <span className="text-stone-400">·</span>
                        <span className="font-bold text-stone-700">{rec.year}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500">{rec.stage || 'Prelims'}</span>
                      </div>
                      <div className="text-xs font-bold text-stone-900 truncate max-w-[200px]" title={language === 'gu' ? rec.examNameGu : rec.examNameEn}>
                        {language === 'gu' ? rec.paperTypeGu : rec.paperTypeEn}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleTrackPaperView(rec.id);
                        setActivePdfPaper(rec);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{language === 'gu' ? 'જુઓ' : 'Open'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bandwidth & Legal Information Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-800 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <span>{language === 'gu' ? 'સત્તાવાર સ્રોતોમાંથી પ્રમાણિત ઓન-ડિમાન્ડ PDF પ્રણાલી' : 'Authorized Commission Source & On-Demand PDF Streaming'}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                    Bandwidth Optimized
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed max-w-3xl">
                  {language === 'gu' 
                    ? 'તમામ પ્રશ્નપત્રો GPSC અને UPSC ની અધિકૃત વેબસાઇટ દ્વારા પ્રમાણિત છે. ડેટા બચાવવા માટે મોટી ફાઇલો આપોઆપ ડાઉનલોડ થતી નથી, માત્ર તમે ક્લિક કરો ત્યારે જ ઇન-એપ દર્શાવવામાં આવે છે.'
                    : 'All question papers cite authorized publication references from official GPSC & UPSC portals. Large PDF documents are not preloaded to conserve data; files stream seamlessly only upon explicit student request.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="https://gpsc.gujarat.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 text-emerald-900 text-[11px] font-bold shadow-2xs flex items-center gap-1.5 transition"
              >
                <span>GPSC Portal</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
              <a
                href="https://www.upsc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 text-emerald-900 text-[11px] font-bold shadow-2xs flex items-center gap-1.5 transition"
              >
                <span>UPSC Portal</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Paper Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredPapers.map((paper) => {
              const isBookmarked = bookmarkedPaperIds.includes(paper.id);

              return (
                <div 
                  key={paper.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-white border transition-all flex flex-col justify-between space-y-5 ${
                    isBookmarked 
                      ? 'border-amber-400 shadow-sm ring-1 ring-amber-300' 
                      : 'border-stone-200 hover:border-emerald-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Header: Badges, Year, Stage, Medium, Official Source & Bookmark */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider ${
                          paper.examAgency === 'UPSC' 
                            ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          🏛️ {paper.examAgency}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold font-mono bg-stone-100 text-stone-800 border border-stone-200">
                          {paper.year}
                        </span>
                        {paper.stage && (
                          <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                            paper.stage === 'Mains' 
                              ? 'bg-purple-50 text-purple-800 border-purple-200' 
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {paper.stage}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                          {paper.medium || 'Bilingual'} {paper.fileSize ? `· ${paper.fileSize}` : ''}
                        </span>
                      </div>

                      {/* Right controls: Official Source link & Bookmark Star */}
                      <div className="flex items-center gap-2">
                        <a
                          href={paper.officialPaperPdfUrl || (paper.examAgency === 'GPSC' ? 'https://gpsc.gujarat.gov.in/' : 'https://www.upsc.gov.in/')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 transition"
                          title="Open official commission webpage in new tab"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{paper.source || 'Official Source'}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>

                        <button
                          onClick={(e) => handleToggleBookmark(paper.id, e)}
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark this paper"}
                          className={`p-1.5 rounded-xl border transition-all ${
                            isBookmarked
                              ? 'bg-amber-50 text-amber-600 border-amber-300'
                              : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Official Advt Subtext */}
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug">
                        {language === 'gu' ? paper.examNameGu : paper.examNameEn}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'gu' ? paper.paperTypeGu : paper.paperTypeEn}</span>
                      </div>

                      {/* Metadata Row: Advt No, Date, Code */}
                      {(paper.advertisementNo || paper.examDate || paper.paperCode) && (
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-stone-500 font-medium bg-stone-50/70 p-2 rounded-xl border border-stone-100">
                          {paper.advertisementNo && (
                            <span>
                              <strong className="text-stone-700">Advt:</strong> {paper.advertisementNo}
                            </span>
                          )}
                          {paper.examDate && (
                            <span>
                              <strong className="text-stone-700">Exam Date:</strong> {paper.examDate}
                            </span>
                          )}
                          {paper.paperCode && (
                            <span className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono text-stone-700 font-bold">
                              {paper.paperCode}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{language === 'gu' ? 'પ્રશ્નો' : 'Questions'}</span>
                      <div className="text-xs sm:text-sm font-black font-mono text-stone-800">{paper.totalQuestions}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{language === 'gu' ? 'કુલ ગુણ' : 'Total Marks'}</span>
                      <div className="text-xs sm:text-sm font-black font-mono text-stone-800">{paper.totalMarks}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{language === 'gu' ? 'સમય' : 'Duration'}</span>
                      <div className="text-xs sm:text-sm font-black font-mono text-stone-800 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{paper.durationMinutes}m</span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-stone-400">{language === 'gu' ? 'ઋણ ગુણાંકન' : 'Negative'}</span>
                      <div className="text-xs sm:text-sm font-black text-rose-700 font-mono">
                        {paper.stage === 'Mains' ? 'None' : (paper.examAgency === 'UPSC' ? '-1/3rd' : '-0.30')}
                      </div>
                    </div>
                  </div>

                  {/* Cutoff / Benchmark */}
                  {paper.cutoffTextEn && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="font-semibold">
                        {language === 'gu' ? paper.cutoffTextGu : paper.cutoffTextEn}
                      </span>
                    </div>
                  )}

                  {/* Subject Breakdown Distribution */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-stone-700 flex items-center justify-between">
                      <span>{language === 'gu' ? 'વિષયવાર પ્રશ્ન વિતરણ (Weightage):' : 'Subject Question Breakdown:'}</span>
                      <span className="text-[11px] text-stone-400 font-mono">{paper.totalQuestions} Questions</span>
                    </div>
                    
                    {/* Progress bar visual */}
                    <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden flex">
                      {paper.subjectBreakdown.map((s, idx) => {
                        const widthPercent = (s.questionCount / paper.totalQuestions) * 100;
                        return (
                          <div
                            key={idx}
                            style={{ width: `${widthPercent}%`, backgroundColor: s.color }}
                            title={`${s.subjectEn}: ${s.questionCount} Qs (${Math.round(widthPercent)}%)`}
                            className="h-full hover:opacity-80 transition-opacity"
                          />
                        );
                      })}
                    </div>

                    {/* Subject Badges with Counts */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {paper.subjectBreakdown.map((s, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200"
                        >
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span>{language === 'gu' ? s.subjectGu : s.subjectEn}</span>
                          <strong className="font-mono text-stone-900 font-bold ml-0.5">{s.questionCount}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exam Key Trends & Takeaways */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'gu' ? 'પરીક્ષા પેપરનું વિશ્લેષણ અને મુખ્ય વલણો:' : 'Key Paper Trends & Takeaways:'}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-700 list-disc list-inside leading-relaxed">
                      {(language === 'gu' ? paper.keyTakeawaysGu : paper.keyTakeawaysEn).slice(0, 2).map((trend, tidx) => (
                        <li key={tidx} className="font-medium">{trend}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons: Native Full Paper Reader, Download PDF, View Key, Practise CBT */}
                  <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Paper (Direct Sankalp In-App Full 200-Question PDF Paper Reader) */}
                      <button
                        onClick={() => {
                          handleTrackPaperView(paper.id);
                          setActivePdfPaper(paper);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-2xs"
                        title={language === 'gu' ? 'સંકલ્પ પર આખું પેપર PDF જુઓ' : 'Read complete paper PDF on Sankalp'}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{language === 'gu' ? 'PDF જુઓ (Open PDF)' : 'Open PDF'}</span>
                      </button>

                      {/* Download PDF directly */}
                      <a
                        href={paper.sankalpPdfUrl || paper.officialPaperPdfUrl || `/papers/${paper.id}.pdf`}
                        download={`${paper.id}-sankalp.pdf`}
                        onClick={() => handleTrackPaperView(paper.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all border border-stone-200"
                        title={language === 'gu' ? 'પેપર ડાઉનલોડ કરો' : 'Download official PDF'}
                      >
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>{language === 'gu' ? 'ડાઉનલોડ' : 'Download'}</span>
                      </a>

                      {/* View Key / Solutions */}
                      {paper.officialAnswerKeyPdfUrl && (
                        <button
                          onClick={() => {
                            handleTrackPaperView(paper.id);
                            setActivePaperSimulator({ paper, initialMode: 'solutions' });
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all border border-amber-200"
                          title={language === 'gu' ? 'સત્તાવાર આન્સર કી જુઓ' : 'View official answer key'}
                        >
                          <Award className="w-3.5 h-3.5 text-amber-700" />
                          <span>{language === 'gu' ? 'આન્સર કી' : 'Answer Key'}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* CBT Practice Simulator */}
                      <button
                        onClick={() => {
                          handleTrackPaperView(paper.id);
                          setActivePaperSimulator({ paper, initialMode: 'exam' });
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
                        title={language === 'gu' ? 'ટાઈમર સાથે ઓનલાઈન ટેસ્ટ આપો' : 'Practise with countdown timer'}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{language === 'gu' ? 'ઓનલાઈન ટેસ્ટ' : 'Practise Test'}</span>
                      </button>

                      <button
                        onClick={() => handleJumpToPracticeForPaper(paper)}
                        className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-stone-500 hover:text-emerald-700 text-xs font-semibold transition-colors"
                        title="Practice questions in single-question quiz mode"
                      >
                        <span>{language === 'gu' ? 'ક્વિઝ' : 'Quiz'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Empty state when no papers match filter */}
          {filteredPapers.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-800">
                  {language === 'gu' ? 'કોઈ પ્રશ્નપત્ર મળ્યા નથી' : 'No question papers matched your filters'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  {language === 'gu' 
                    ? 'કૃપા કરીને સર્ચ શબ્દ બદલો અથવા ફિલ્ટર સાફ કરીને ફરી પ્રયાસ કરો.' 
                    : 'Try resetting stage, agency, subject or year filters.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setArchiveAgency('all');
                  setArchiveYear('all');
                  setArchiveStage('all');
                  setArchiveMedium('all');
                  setArchiveSubject('all');
                  setArchiveSearchQuery('');
                  setOnlyBookmarked(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition"
              >
                {language === 'gu' ? 'બધા ફિલ્ટર્સ સાફ કરો' : 'Clear All Filters'}
              </button>
            </div>
          )}


        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: INTERACTIVE PYQ SOLVER & QUIZ (WITH GPSC & UPSC FILTERS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'solver' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Previous Papers by Year & Filters */}
          <aside className="lg:col-span-4 space-y-5 p-6 rounded-3xl bg-stone-50 border border-stone-200 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                <Filter className="w-4 h-4 text-emerald-700" />
                <span>{language === 'gu' ? 'પેપર & વર્ષ સાઇડબાર' : 'Paper & Year Filters'}</span>
              </div>
              <div className="flex items-center gap-2">
                {Object.keys(userAnswers).length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {Object.keys(userAnswers).length} {language === 'gu' ? 'પ્રયાસ' : 'attempted'}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedAgency('all');
                    setSelectedYear('all');
                    setSelectedPaperMode('all');
                    setSelectedSubject('all');
                    handleResetSession();
                  }}
                  className="text-[11px] font-bold text-stone-500 hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'gu' ? 'રીસેટ' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Exam Agency Switcher: All vs GPSC vs UPSC */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">
                {language === 'gu' ? 'પરીક્ષા બોર્ડ (Exam Agency):' : 'Exam Agency:'}
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white border border-stone-200">
                {[
                  { id: 'all' as const, label: 'All' },
                  { id: 'GPSC' as const, label: 'GPSC' },
                  { id: 'UPSC' as const, label: 'UPSC' },
                ].map((agency) => (
                  <button
                    key={agency.id}
                    onClick={() => {
                      setSelectedAgency(agency.id);
                      setCurrentQuestionIndex(0);
                      setHasEvaluated(false);
                      setSelectedOptionId(null);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedAgency === agency.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {agency.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Switcher: Prelims vs Mains */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">
                {language === 'gu' ? 'પરીક્ષા તબક્કો પસંદ કરો:' : 'Exam Stage:'}
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white border border-stone-200">
                {[
                  { id: 'all' as const, nameEn: 'All', nameGu: 'તમામ' },
                  { id: 'prelims' as const, nameEn: 'Prelims', nameGu: 'પ્રિલિમ્સ' },
                  { id: 'mains' as const, nameEn: 'Mains', nameGu: 'મેઈન્સ' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedPaperMode(m.id);
                      setCurrentQuestionIndex(0);
                      setHasEvaluated(false);
                      setSelectedOptionId(null);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedPaperMode === m.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {language === 'gu' ? m.nameGu : m.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Previous Papers by Year List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700 flex items-center justify-between">
                <span>{language === 'gu' ? 'પરીક્ષા વર્ષ (Exam Years):' : 'Exam Years:'}</span>
                <span className="text-[10px] text-stone-400 font-mono">2017-2024</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    setSelectedYear('all');
                    setCurrentQuestionIndex(0);
                    setHasEvaluated(false);
                    setSelectedOptionId(null);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    selectedYear === 'all'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {language === 'gu' ? 'તમામ' : 'All Years'}
                </button>

                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setSelectedYear(yr);
                      setCurrentQuestionIndex(0);
                      setHasEvaluated(false);
                      setSelectedOptionId(null);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1 ${
                      selectedYear === yr
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <Calendar className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{yr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">
                {language === 'gu' ? 'વિષય મુજબ ફિલ્ટર:' : 'Filter by Subject:'}
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'all', nameEn: 'All Syllabus Topics', nameGu: 'તમામ સિલેબસ વિષયો' },
                  { id: 'polity', nameEn: 'Indian Polity & Constitution', nameGu: 'ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા' },
                  { id: 'gujarat', nameEn: 'Gujarat History & Heritage', nameGu: 'ગુજરાતનો ઇતિહાસ અને વારસો' },
                  { id: 'economy', nameEn: 'Economy & Development', nameGu: 'અર્થતંત્ર અને વિકાસ' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSubject(s.id);
                      setCurrentQuestionIndex(0);
                      setHasEvaluated(false);
                      setSelectedOptionId(null);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      selectedSubject === s.id
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-200'
                    }`}
                  >
                    {language === 'gu' ? s.nameGu : s.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Count Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
              <span>{language === 'gu' ? 'ઉપલબ્ધ પ્રશ્નો:' : 'Matched Questions:'}</span>
              <span className="font-mono font-extrabold text-sm text-emerald-800">{filteredQuestions.length}</span>
            </div>

          </aside>

          {/* Right Main Area: Question Solver & Answer Analysis */}
          <main className="lg:col-span-8 space-y-6">
            
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {language === 'gu' ? 'કોઈ પ્રશ્નો મળ્યા નથી' : 'No Questions Found for this Filter'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {language === 'gu' 
                    ? 'કૃપા કરીને સાઇડબારમાંથી અન્ય વર્ષ અથવા તમામ વર્ષ પસંદ કરો.' 
                    : 'Try selecting "All Years" or "All" stages from the left sidebar.'}
                </p>
              </div>
            ) : (
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-6">
                
                {/* Question Header & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                      activeQuestion.examAgency === 'UPSC'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {activeQuestion.examAgency || 'GPSC'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold font-mono">
                      {activeQuestion.examYear}
                    </span>
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                      {activeQuestion.paperType}
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 font-mono">
                    {language === 'gu' ? 'પ્રશ્ન' : 'Question'} {safeIndex + 1} / {filteredQuestions.length}
                  </div>
                </div>

                {/* Exam Source Tag */}
                <div className="text-xs font-bold text-emerald-800">
                  🏛️ {activeQuestion.examName}
                </div>

                {/* Question Text */}
                <div className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed whitespace-pre-line">
                  {language === 'gu' ? activeQuestion.questionGu : activeQuestion.questionEn}
                </div>

                {/* Mains Structured Framework View (For Mains Questions) */}
                {activeQuestion.paperType.startsWith('Mains') && (
                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-emerald-700" />
                      <span>{language === 'gu' ? 'મેઈન્સ ઉત્તરલેખન માળખું (Model Outline):' : 'Mains Model Answer Structure:'}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed whitespace-pre-line">
                      {language === 'gu' ? activeQuestion.explanationGu : activeQuestion.explanationEn}
                    </div>
                  </div>
                )}

                {/* Prelims Options (For MCQ Questions) */}
                {!activeQuestion.paperType.startsWith('Mains') && (
                  <div className="space-y-3 pt-2">
                    {activeQuestion.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      const isCorrect = opt.isCorrect;

                      let optionStyle = 'border-stone-200 bg-white hover:border-emerald-300 text-stone-800';
                      if (hasEvaluated) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          optionStyle = 'border-red-400 bg-red-50 text-red-950';
                        } else {
                          optionStyle = 'border-stone-200 bg-stone-50 opacity-60 text-stone-500';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-emerald-700 bg-emerald-50/50 text-emerald-950 font-bold ring-1 ring-emerald-700';
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={hasEvaluated}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'
                          }`}>
                            {opt.id.slice(-1).toUpperCase()}
                          </div>
                          <span className="flex-1 leading-relaxed">
                            {language === 'gu' ? opt.textGu : opt.textEn}
                          </span>
                          {hasEvaluated && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {hasEvaluated && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Evaluate Button */}
                {!activeQuestion.paperType.startsWith('Mains') && !hasEvaluated && (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleEvaluate}
                    className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-700/20"
                  >
                    {language === 'gu' ? 'જવાબ ચકાસો (Check Answer)' : 'Check Answer & View Elimination Reason'}
                  </button>
                )}

                {/* Post-Evaluation Explanation Box */}
                {hasEvaluated && !activeQuestion.paperType.startsWith('Mains') && (
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>{language === 'gu' ? 'વિગતવાર સમજૂતી અને વિશ્લેષણ:' : 'Detailed Official Explanation:'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {language === 'gu' ? activeQuestion.explanationGu : activeQuestion.explanationEn}
                    </p>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                      <span>{language === 'gu' ? 'સ્ત્રોત:' : 'Syllabus Anchor:'} {language === 'gu' ? activeQuestion.sourceConceptGu : activeQuestion.sourceConceptEn}</span>
                      <button
                        onClick={() => onReadConcept(activeQuestion.topicId)}
                        className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>{language === 'gu' ? 'ટોપિક વાંચો' : 'Read Topic'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Navigation Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <button
                    disabled={safeIndex === 0}
                    onClick={handlePrevQuestion}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 disabled:opacity-30 hover:bg-stone-50 transition-colors"
                  >
                    {language === 'gu' ? '← પાછલો પ્રશ્ન' : '← Previous'}
                  </button>

                  <div className="text-xs text-stone-400 font-mono">
                    {safeIndex + 1} of {filteredQuestions.length}
                  </div>

                  <button
                    disabled={safeIndex >= filteredQuestions.length - 1}
                    onClick={handleNextQuestion}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold disabled:opacity-30 transition-all flex items-center gap-1 shadow-xs"
                  >
                    <span>{language === 'gu' ? 'આગળનો પ્રશ્ન →' : 'Next Question →'}</span>
                  </button>
                </div>

              </div>
            )}

          </main>

        </div>
      )}

    </div>
  );
};
