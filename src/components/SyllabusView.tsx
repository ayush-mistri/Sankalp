'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '@/types';
import { 
  ExamId, 
  ExamStageId, 
  TopicProgressStatus, 
  SyllabusTopic,
  SyllabusSubject,
  SyllabusPaper
} from '@/types/syllabus';
import { 
  getAllRegisteredExams, 
  getExamById, 
  getSubjectStats,
  getExamStageStats 
} from '@/data/syllabusDatabase';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Search, 
  Filter, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Sparkles, 
  Scale, 
  Landmark, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  RefreshCw, 
  X, 
  Layers, 
  Check,
  TrendingUp,
  Cpu,
  Globe,
  Award,
  Zap,
  Building2,
  PenTool,
  Leaf,
  Calculator,
  Languages
} from 'lucide-react';

interface SyllabusViewProps {
  language: Language;
  onExploreTopic?: (topicId: string) => void;
  onGoToPractice?: (tag?: string) => void;
  onGoToBooks?: () => void;
}

const STORAGE_KEY = 'sankalp_syllabus_progress_v2';

export const SyllabusView: React.FC<SyllabusViewProps> = ({ 
  language, 
  onExploreTopic,
  onGoToPractice,
  onGoToBooks
}) => {
  // 1. Examination & Stage Selection
  const allExams = useMemo(() => getAllRegisteredExams(), []);
  const [selectedExamId, setSelectedExamId] = useState<ExamId>('gpsc-class-1-2');
  const [selectedStage, setSelectedStage] = useState<ExamStageId>('prelims');

  // 2. Student Progress State (Stored in localStorage)
  const [topicStatuses, setTopicStatuses] = useState<Record<string, TopicProgressStatus>>({});
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // 3. Search and Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed' | 'bookmarked'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  
  // 4. Accordion Expand/Collapse States
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [expandedTopicDetails, setExpandedTopicDetails] = useState<Record<string, boolean>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.topicStatuses) setTopicStatuses(parsed.topicStatuses);
        if (parsed.bookmarkedTopics) setBookmarkedTopics(parsed.bookmarkedTopics);
      }
    } catch {
      // fallback to empty state
    } finally {
      setIsLoadedFromStorage(true);
    }
  }, []);

  // Save progress to localStorage whenever updated
  useEffect(() => {
    if (!isLoadedFromStorage) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        topicStatuses,
        bookmarkedTopics,
        lastUpdated: new Date().toISOString()
      }));
    } catch {
      // ignore write errors
    }
  }, [topicStatuses, bookmarkedTopics, isLoadedFromStorage]);

  // Current active exam details
  const activeExam = useMemo(() => {
    return getExamById(selectedExamId) || allExams[0];
  }, [selectedExamId, allExams]);

  // Current papers for selected stage
  const currentPapers = useMemo(() => {
    return selectedStage === 'prelims' ? activeExam.prelimsPapers : activeExam.mainsPapers;
  }, [activeExam, selectedStage]);

  // Calculate overall stage statistics
  const stageStats = useMemo(() => {
    return getExamStageStats(selectedExamId, selectedStage, topicStatuses);
  }, [selectedExamId, selectedStage, topicStatuses]);

  // Default expand the first subject on stage/exam switch
  useEffect(() => {
    if (currentPapers.length > 0 && currentPapers[0].subjects.length > 0) {
      const firstSubjectId = currentPapers[0].subjects[0].id;
      setExpandedSubjects({ [firstSubjectId]: true });
    }
  }, [selectedExamId, selectedStage, currentPapers]);

  const handleSetSpecificStatus = (topicId: string, status: TopicProgressStatus, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTopicStatuses(prev => ({ ...prev, [topicId]: status }));
  };

  // Toggle topic bookmark
  const handleToggleBookmark = (topicId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  // Toggle subject accordion
  const handleToggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Toggle topic details drawer
  const handleToggleTopicDetails = (topicId: string) => {
    setExpandedTopicDetails(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Filter topics helper
  const isTopicMatchingFilters = (topic: SyllabusTopic): boolean => {
    const status = topicStatuses[topic.id] || 'not_started';
    const isBookmarked = bookmarkedTopics.includes(topic.id);

    // 1. Status Filter
    if (statusFilter === 'not_started' && status !== 'not_started') return false;
    if (statusFilter === 'in_progress' && status !== 'in_progress') return false;
    if (statusFilter === 'completed' && status !== 'completed') return false;
    if (statusFilter === 'bookmarked' && !isBookmarked) return false;

    // 2. Subject Filter
    if (subjectFilter !== 'all' && topic.subjectId !== subjectFilter) return false;

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchEn = topic.titleEn.toLowerCase().includes(q) || 
                      topic.officialWordingEn.toLowerCase().includes(q) ||
                      topic.code.toLowerCase().includes(q);
      const matchGu = topic.titleGu.toLowerCase().includes(q) || 
                      topic.officialWordingGu.toLowerCase().includes(q);
      if (!matchEn && !matchGu) return false;
    }

    return true;
  };

  // Expand / collapse all subjects
  const handleExpandAllSubjects = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    for (const paper of currentPapers) {
      for (const subj of paper.subjects) {
        next[subj.id] = expand;
      }
    }
    setExpandedSubjects(next);
  };

  // Render subject icon dynamically
  const renderSubjectIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-emerald-800" };
    switch (iconName) {
      case 'Landmark': return <Landmark {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Languages': return <Languages {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <GraduationCap {...props} />;
    }
  };

  // All subjects in current stage for subject dropdown filter
  const currentStageSubjects = useMemo(() => {
    const list: SyllabusSubject[] = [];
    for (const p of currentPapers) {
      for (const s of p.subjects) {
        list.push(s);
      }
    }
    return list;
  }, [currentPapers]);

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* =========================================================================
          1. HEADER & EXAMINATION SELECTOR
         ========================================================================= */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl space-y-6 border border-emerald-700/50">
        
        {/* Top Badges & Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>{language === 'gu' ? activeExam.badgeGu : activeExam.badgeEn}</span>
          </div>

          {/* Exam Switcher Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20">
            {allExams.map(exam => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setSubjectFilter('all');
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-white text-emerald-950 shadow-md scale-102'
                      : 'text-emerald-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {exam.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title and Conducting Authority */}
        <div className="space-y-2 max-w-4xl">
          <div className="text-xs font-medium text-emerald-300 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'gu' ? activeExam.conductingBodyGu : activeExam.conductingBodyEn}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === 'gu' ? activeExam.nameGu : activeExam.nameEn}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            {language === 'gu' ? activeExam.scheme.patternSummaryGu : activeExam.scheme.patternSummaryEn}
          </p>
        </div>

        {/* Exam Structure Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2 border-t border-white/15">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૧: પ્રિલિમ્સ' : 'Stage 1: Prelims'}
            </div>
            <div className="text-lg sm:text-2xl font-black">{activeExam.scheme.prelimsMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 mt-0.5 truncate">{activeExam.scheme.prelimsDuration}</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૨: મેઈન્સ મેરિટ' : 'Stage 2: Mains Merit'}
            </div>
            <div className="text-lg sm:text-2xl font-black">{activeExam.scheme.mainsMeritMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 mt-0.5">Written Merit Score</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૩: ઇન્ટરવ્યુ' : 'Stage 3: Interview'}
            </div>
            <div className="text-lg sm:text-2xl font-black">{activeExam.scheme.interviewMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 mt-0.5">Personality Test</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-emerald-950/60 backdrop-blur-xs border border-emerald-400/40 text-emerald-100">
            <div className="text-[11px] font-extrabold text-emerald-300">
              {language === 'gu' ? 'આખરી મેરિટ' : 'Final Merit Score'}
            </div>
            <div className="text-lg sm:text-2xl font-black text-white">{activeExam.scheme.finalMeritMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">Selection Cutoff Base</div>
          </div>
        </div>

        {/* Official Source & Verification Citation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-[11px] text-emerald-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>
              <strong>{language === 'gu' ? 'અધિકૃત સ્ત્રોત:' : 'Official Gazette Source:'}</strong>{' '}
              {language === 'gu' ? activeExam.officialSource.titleGu : activeExam.officialSource.titleEn} ({activeExam.officialSource.documentRef})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono">
              {activeExam.officialSource.gazetteOrNotificationDate}
            </span>
            <a
              href={activeExam.officialSource.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-white hover:text-emerald-300 transition-colors underline"
            >
              <span>{language === 'gu' ? 'સત્તાવાર પોર્ટલ' : 'Official Portal'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. STAGE SELECTOR & REAL-TIME PROGRESS METER
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Stage Toggle Switch (Prelims vs Mains) */}
        <div className="lg:col-span-5 p-2 rounded-2xl bg-stone-100 border border-stone-200 flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedStage('prelims');
              setSubjectFilter('all');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all ${
              selectedStage === 'prelims'
                ? 'bg-white text-emerald-900 shadow-sm border border-stone-200/80'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'પ્રાથમિક પરીક્ષા (Prelims)' : 'Preliminary Examination'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedStage('mains');
              setSubjectFilter('all');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all ${
              selectedStage === 'mains'
                ? 'bg-white text-emerald-900 shadow-sm border border-stone-200/80'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>{language === 'gu' ? 'મુખ્ય પરીક્ષા (Mains)' : 'Main Examination'}</span>
          </button>
        </div>

        {/* Live Study Progress Meter */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{language === 'gu' ? 'તમારો અભ્યાસક્રમ પૂર્ણતા દર' : 'Your Syllabus Completion Progress'}</span>
              <span className="text-[11px] font-mono text-stone-400 font-normal">
                ({selectedStage.toUpperCase()})
              </span>
            </div>
            <div className="font-mono font-black text-emerald-800 text-sm sm:text-base">
              {stageStats.percent}% {language === 'gu' ? 'પૂર્ણ' : 'Done'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex">
            <div 
              className="h-full bg-emerald-600 transition-all duration-500" 
              style={{ width: `${stageStats.percent}%` }}
              title={`Completed: ${stageStats.completed}`}
            />
            <div 
              className="h-full bg-amber-400 transition-all duration-500" 
              style={{ width: `${stageStats.total > 0 ? (stageStats.inProgress / stageStats.total) * 100 : 0}%` }}
              title={`In Progress: ${stageStats.inProgress}`}
            />
          </div>

          {/* Stat Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-stone-600 pt-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {stageStats.completed} {language === 'gu' ? 'પૂર્ણ' : 'Completed'}
              </span>
              <span className="inline-flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {stageStats.inProgress} {language === 'gu' ? 'ચાલુ' : 'In Progress'}
              </span>
              <span className="inline-flex items-center gap-1 text-stone-500">
                <span className="w-2 h-2 rounded-full bg-stone-300" />
                {stageStats.notStarted} {language === 'gu' ? 'બાકી' : 'Not Started'}
              </span>
            </div>

            <div className="text-stone-400 font-mono">
              {language === 'gu' ? `કુલ ${stageStats.total} વિષય-મુદ્દાઓ` : `Total ${stageStats.total} Core Topics`}
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. SEARCH & ADVANCED FILTERING TOOLBAR
         ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'gu' 
                  ? 'વિષય, કલમ, નગર આયોજન, ધોળાવીરા, બંધારણ અથવા ટોપિક કોડ શોધો...' 
                  : 'Search by topic, keyword, Dholavira, Preamble, ISRO, or code...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Subject Filter Dropdown */}
          <div className="w-full md:w-64">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            >
              <option value="all">
                {language === 'gu' ? 'તમામ વિષયો (All Subjects)' : 'All Subjects in Stage'}
              </option>
              {currentStageSubjects.map(subj => (
                <option key={subj.id} value={subj.id}>
                  {language === 'gu' ? subj.nameGu : subj.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Expand/Collapse All Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExpandAllSubjects(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 border border-stone-200 transition"
              title="Expand All Subjects"
            >
              {language === 'gu' ? 'બધું ખોલો' : 'Expand All'}
            </button>
            <button
              onClick={() => handleExpandAllSubjects(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 border border-stone-200 transition"
              title="Collapse All Subjects"
            >
              {language === 'gu' ? 'બધું બંધ કરો' : 'Collapse All'}
            </button>
          </div>

        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>{language === 'gu' ? 'સ્થિતિ મુજબ ફિલ્ટર:' : 'Status Filter:'}</span>
          </span>

          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {language === 'gu' ? 'બધા દર્શાવો' : 'All Topics'}
          </button>

          <button
            onClick={() => setStatusFilter('not_started')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              statusFilter === 'not_started'
                ? 'bg-stone-800 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {language === 'gu' ? 'બાકી (Not Started)' : 'Not Started'}
          </button>

          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              statusFilter === 'in_progress'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {language === 'gu' ? 'ચાલુ (In Progress)' : 'In Progress'}
          </button>

          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              statusFilter === 'completed'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {language === 'gu' ? 'પૂર્ણ (Completed)' : 'Completed'}
          </button>

          <button
            onClick={() => setStatusFilter('bookmarked')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'bookmarked'
                ? 'bg-amber-500 text-stone-950 shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'gu' ? `બુકમાર્ક્સ (${bookmarkedTopics.length})` : `Bookmarked (${bookmarkedTopics.length})`}</span>
          </button>

          {(searchQuery || statusFilter !== 'all' || subjectFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSubjectFilter('all');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline ml-auto flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{language === 'gu' ? 'ફિલ્ટર રીસેટ કરો' : 'Reset Filters'}</span>
            </button>
          )}
        </div>

      </div>

      {/* =========================================================================
          4. SYLLABUS PAPERS & SUBJECTS HIERARCHICAL ACCORDIONS
         ========================================================================= */}
      <div className="space-y-8">
        {currentPapers.map(paper => {
          // Filter subjects belonging to this paper
          const visibleSubjects = paper.subjects.filter(subj => {
            if (subjectFilter !== 'all' && subj.id !== subjectFilter) return false;
            // Also check if any topic matches search/status
            return subj.chapters.some(ch => ch.topics.some(t => isTopicMatchingFilters(t)));
          });

          if (visibleSubjects.length === 0 && (searchQuery || statusFilter !== 'all' || subjectFilter !== 'all')) {
            return null; // Don't show paper header if no matching topics
          }

          return (
            <div key={paper.id} className="space-y-4">
              
              {/* Paper Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/90 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black font-mono tracking-wider ${
                    paper.nature === 'Qualifying' 
                      ? 'bg-stone-200 text-stone-700' 
                      : 'bg-emerald-800 text-white'
                  }`}>
                    {paper.paperCode}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-black text-stone-900">
                        {language === 'gu' ? paper.titleGu : paper.titleEn}
                      </h2>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        paper.nature === 'Qualifying' 
                          ? 'bg-stone-200 text-stone-700' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {paper.nature}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      {paper.marks} {language === 'gu' ? 'ગુણ' : 'Marks'} • {paper.duration}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-stone-600 bg-white/80 p-2.5 rounded-xl border border-stone-200 sm:max-w-md">
                  <p className="italic line-clamp-2">
                    {language === 'gu' ? paper.officialDescriptionGu : paper.officialDescriptionEn}
                  </p>
                </div>
              </div>

              {/* Subjects in this Paper */}
              <div className="space-y-4">
                {visibleSubjects.map(subject => {
                  const isExpanded = expandedSubjects[subject.id] ?? false;
                  const subjStats = getSubjectStats(subject, topicStatuses);

                  return (
                    <div
                      key={subject.id}
                      className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden transition-all hover:border-emerald-300"
                    >
                      {/* Subject Accordion Header */}
                      <button
                        onClick={() => handleToggleSubject(subject.id)}
                        className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                            {renderSubjectIcon(subject.icon)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {subject.subjectCode}
                              </span>
                              <span className="text-[11px] text-stone-400 font-medium">
                                {language === 'gu' ? subject.officialWeightageGu : subject.officialWeightageEn}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mt-1 truncate">
                              {language === 'gu' ? subject.nameGu : subject.nameEn}
                            </h3>
                          </div>
                        </div>

                        {/* Subject Progress & Expand Toggle */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-xs font-mono font-black text-emerald-800">
                              {subjStats.percent}% {language === 'gu' ? 'પૂર્ણ' : 'Done'}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {subjStats.completed}/{subjStats.total} {language === 'gu' ? 'મુદ્દા' : 'topics'}
                            </span>
                          </div>

                          <div className="p-2 rounded-xl bg-stone-100 text-stone-500">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </button>

                      {/* Subject Expanded Content */}
                      {isExpanded && (
                        <div className="p-4 sm:p-6 pt-0 border-t border-stone-100 space-y-6 bg-stone-50/40">
                          {subject.chapters.map(chapter => {
                            const matchingTopics = chapter.topics.filter(t => isTopicMatchingFilters(t));
                            if (matchingTopics.length === 0) return null;

                            return (
                              <div key={chapter.id} className="pt-4 space-y-3">
                                
                                {/* Chapter Title Banner */}
                                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950 pb-1 border-b border-stone-200">
                                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-mono">
                                    {chapter.chapterNumber}
                                  </span>
                                  <span>{language === 'gu' ? chapter.titleGu : chapter.titleEn}</span>
                                </div>

                                {/* Topic Cards Grid */}
                                <div className="space-y-3">
                                  {matchingTopics.map(topic => {
                                    const status = topicStatuses[topic.id] || 'not_started';
                                    const isBookmarked = bookmarkedTopics.includes(topic.id);
                                    const isDetailOpen = expandedTopicDetails[topic.id] ?? false;

                                    return (
                                      <div
                                        key={topic.id}
                                        className={`rounded-2xl border transition-all ${
                                          status === 'completed'
                                            ? 'bg-white border-emerald-300 shadow-2xs'
                                            : status === 'in_progress'
                                            ? 'bg-amber-50/30 border-amber-300 shadow-2xs'
                                            : 'bg-white border-stone-200 shadow-2xs'
                                        }`}
                                      >
                                        {/* Main Topic Header Strip */}
                                        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                          
                                          {/* Left: Topic Title & Badges */}
                                          <div className="space-y-1.5 flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-extrabold bg-stone-100 text-stone-700 border border-stone-200">
                                                {topic.code}
                                              </span>
                                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                                topic.importance === 'Essential'
                                                  ? 'bg-rose-100 text-rose-800'
                                                  : 'bg-emerald-100 text-emerald-800'
                                              }`}>
                                                {topic.importance} Focus
                                              </span>
                                              <span className="text-[11px] text-stone-400 font-medium">
                                                • {topic.examFrequency}
                                              </span>
                                            </div>

                                            <h4 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug">
                                              {language === 'gu' ? topic.titleGu : topic.titleEn}
                                            </h4>
                                          </div>

                                          {/* Right: Interactive Status Switcher & Actions */}
                                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                            
                                            {/* Bookmark Button */}
                                            <button
                                              onClick={(e) => handleToggleBookmark(topic.id, e)}
                                              title={isBookmarked ? "Remove Bookmark" : "Bookmark this topic"}
                                              className={`p-2 rounded-xl border transition-all ${
                                                isBookmarked
                                                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                                                  : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700'
                                              }`}
                                            >
                                              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                                            </button>

                                            {/* Status Segmented Controls */}
                                            <div className="flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'not_started', e)}
                                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                  status === 'not_started'
                                                    ? 'bg-white text-stone-800 shadow-2xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Circle className="w-3 h-3 text-stone-400" />
                                                <span className="hidden sm:inline">{language === 'gu' ? 'બાકી' : 'Pending'}</span>
                                              </button>

                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'in_progress', e)}
                                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                  status === 'in_progress'
                                                    ? 'bg-amber-500 text-white shadow-2xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Clock className="w-3 h-3" />
                                                <span>{language === 'gu' ? 'ચાલુ' : 'In Progress'}</span>
                                              </button>

                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'completed', e)}
                                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                  status === 'completed'
                                                    ? 'bg-emerald-700 text-white shadow-2xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Check className="w-3 h-3" />
                                                <span>{language === 'gu' ? 'પૂર્ણ' : 'Completed'}</span>
                                              </button>
                                            </div>

                                            {/* View Official Details Toggle */}
                                            <button
                                              onClick={() => handleToggleTopicDetails(topic.id)}
                                              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
                                              title="Toggle syllabus wording & study notes"
                                            >
                                              {isDetailOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>

                                          </div>

                                        </div>

                                        {/* =========================================================
                                            DEEP DETAILS DRAWER (Verbatim Official vs Sankalp Focus)
                                           ========================================================= */}
                                        {isDetailOpen && (
                                          <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 space-y-4 bg-stone-50/60 rounded-b-2xl">
                                            
                                            {/* 1. Official Commission Verbatim Text */}
                                            <div className="p-4 rounded-xl bg-emerald-950 text-emerald-100 border border-emerald-900 space-y-2 mt-4 shadow-2xs">
                                              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-300">
                                                <div className="flex items-center gap-1.5">
                                                  <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                                                  <span>{language === 'gu' ? 'સત્તાવાર ગેઝેટ શબ્દાવલિ (Commission Verbatim)' : 'Official Commission Gazette Verbatim Text'}</span>
                                                </div>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900 border border-emerald-700">
                                                  100% Unaltered
                                                </span>
                                              </div>
                                              <p className="text-xs sm:text-sm font-medium leading-relaxed italic text-white/95">
                                                &ldquo;{language === 'gu' ? topic.officialWordingGu : topic.officialWordingEn}&rdquo;
                                              </p>
                                            </div>

                                            {/* 2. SANKALP Pedagogical Insights & Focus Areas */}
                                            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 shadow-2xs">
                                              <div className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                                                <span>{language === 'gu' ? 'સંકલ્પ સ્ટડી બ્રેકડાઉન અને પરીક્ષા વિશ્લેષણ' : 'Sankalp Exam Focus & Strategic Insights'}</span>
                                              </div>
                                              <p className="text-xs text-stone-700 leading-relaxed">
                                                {language === 'gu' ? topic.sankalpExplanationGu : topic.sankalpExplanationEn}
                                              </p>

                                              {/* Key Subtopics Bullet Grid */}
                                              <div className="pt-2">
                                                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                                                  {language === 'gu' ? 'મુખ્ય ફોકસ પોઈન્ટ્સ:' : 'High-Yield Subtopics to Cover:'}
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                                                  {(language === 'gu' ? topic.keySubtopicsGu : topic.keySubtopicsEn).map((sub, sIdx) => (
                                                    <div key={sIdx} className="flex items-start gap-1.5">
                                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                                                      <span className="leading-snug">{sub}</span>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>

                                            {/* 3. Action Links: Deep Read, Practice PYQs, Books */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                              
                                              {/* Recommended Official References */}
                                              <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[11px] font-bold text-stone-400">
                                                  {language === 'gu' ? 'સંદર્ભ પુસ્તક:' : 'Recommended:'}
                                                </span>
                                                {topic.recommendedReadings.map((bk, bIdx) => (
                                                  <span
                                                    key={bIdx}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200/70 text-stone-800 text-[11px] font-medium"
                                                  >
                                                    <BookOpen className="w-3 h-3 text-stone-500" />
                                                    <span>{bk.title}</span>
                                                    {bk.isGovtFree && (
                                                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1 rounded">FREE GOVT</span>
                                                    )}
                                                  </span>
                                                ))}
                                              </div>

                                              {/* Action Buttons to App Views */}
                                              <div className="flex items-center gap-2">
                                                {topic.linkedModuleTopicId && onExploreTopic && (
                                                  <button
                                                    onClick={() => onExploreTopic(topic.linkedModuleTopicId!)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                                                  >
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    <span>{language === 'gu' ? 'નોટ્સ વાંચો' : 'Read Topic Notes'}</span>
                                                    <ArrowRight className="w-3 h-3" />
                                                  </button>
                                                )}

                                                {onGoToPractice && (
                                                  <button
                                                    onClick={() => onGoToPractice(topic.linkedPracticeTag)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                                                  >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <span>{language === 'gu' ? 'PYQ પ્રેક્ટિસ' : 'Practice PYQs'}</span>
                                                  </button>
                                                )}
                                              </div>

                                            </div>

                                          </div>
                                        )}

                                      </div>
                                    );
                                  })}
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

        {/* Empty State when no topics match filters */}
        {visibleSubjectsCount(currentPapers, isTopicMatchingFilters) === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-800">
                {language === 'gu' ? 'કોઈ વિષય-મુદ્દા મળ્યા નથી' : 'No syllabus topics matched your criteria'}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                {language === 'gu' 
                  ? 'કૃપા કરીને સર્ચ શબ્દ બદલો અથવા ફિલ્ટર સાફ કરીને ફરી પ્રયાસ કરો.' 
                  : 'Try adjusting your search query or reset status/subject filters.'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSubjectFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition"
            >
              {language === 'gu' ? 'બધા ફિલ્ટર્સ સાફ કરો' : 'Clear All Filters'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

// Helper to count visible subjects
function visibleSubjectsCount(
  papers: SyllabusPaper[], 
  isTopicMatching: (t: SyllabusTopic) => boolean
): number {
  let count = 0;
  for (const p of papers) {
    for (const s of p.subjects) {
      if (s.chapters.some(ch => ch.topics.some(isTopicMatching))) {
        count++;
      }
    }
  }
  return count;
}
