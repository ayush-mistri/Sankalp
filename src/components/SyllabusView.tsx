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
  getSubjectStatsForSyllabus,
  getExamStageStats 
} from '@/data/comprehensiveSyllabus';
import { 
  BookOpen, 
  Circle, 
  Clock, 
  Search, 
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
    // 1. Subject Filter
    if (subjectFilter !== 'all' && topic.subjectId !== subjectFilter) return false;

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchEn = topic.titleEn.toLowerCase().includes(q) || 
                      topic.officialWordingEn.toLowerCase().includes(q) ||
                      topic.code.toLowerCase().includes(q) ||
                      topic.keySubtopicsEn.some((item) => item.toLowerCase().includes(q));
      const matchGu = topic.titleGu.toLowerCase().includes(q) || 
                      topic.officialWordingGu.toLowerCase().includes(q) ||
                      topic.keySubtopicsGu.some((item) => item.toLowerCase().includes(q));
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
    <div className="w-full space-y-4 animate-in fade-in duration-300 pb-10">
      
      {/* =========================================================================
          1. HEADER & EXAMINATION SELECTOR
         ========================================================================= */}
      <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-lg space-y-3.5 border border-emerald-700/50">
        
        {/* Top Badges & Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'gu' ? activeExam.badgeGu : activeExam.badgeEn}</span>
          </div>

          {/* Exam Switcher Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-black/25 backdrop-blur-md border border-white/20">
            {allExams.map(exam => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setSubjectFilter('all');
                  }}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-emerald-950 shadow-md'
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
        <div className="space-y-1 max-w-4xl">
          <div className="text-[11px] font-medium text-emerald-300 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'gu' ? activeExam.conductingBodyGu : activeExam.conductingBodyEn}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
            {language === 'gu' ? activeExam.nameGu : activeExam.nameEn}
          </h1>
          <p className="text-emerald-100 text-xs leading-relaxed">
            {language === 'gu' ? activeExam.scheme.patternSummaryGu : activeExam.scheme.patternSummaryEn}
          </p>
        </div>

        {/* Exam Structure Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/15">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="text-[10px] font-medium text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૧: પ્રિલિમ્સ' : 'Stage 1: Prelims'}
            </div>
            <div className="text-base sm:text-lg font-black">{activeExam.scheme.prelimsMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200 truncate">{activeExam.scheme.prelimsDuration}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="text-[10px] font-medium text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૨: મેઈન્સ મેરિટ' : 'Stage 2: Mains Merit'}
            </div>
            <div className="text-base sm:text-lg font-black">{activeExam.scheme.mainsMeritMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200">Written Merit Score</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="text-[10px] font-medium text-emerald-300">
              {language === 'gu' ? 'તબક્કો ૩: ઇન્ટરવ્યુ' : 'Stage 3: Interview'}
            </div>
            <div className="text-base sm:text-lg font-black">{activeExam.scheme.interviewMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-200">Personality Test</div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-100">
            <div className="text-[10px] font-medium text-emerald-300">
              {language === 'gu' ? 'આખરી મેરિટ' : 'Final Merit Score'}
            </div>
            <div className="text-base sm:text-lg font-black text-white">{activeExam.scheme.finalMeritMarks} {language === 'gu' ? 'ગુણ' : 'Marks'}</div>
            <div className="text-[10px] text-emerald-300">Selection Cutoff Base</div>
          </div>
        </div>

        {/* Official Source & Verification Citation */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] text-emerald-200">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>
              <strong className="font-semibold">{language === 'gu' ? 'અધિકૃત સ્ત્રોત:' : 'Official reference:'}</strong>{' '}
              {language === 'gu' ? activeExam.officialSource.titleGu : activeExam.officialSource.titleEn} ({activeExam.officialSource.documentRef})
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono">
              {activeExam.officialSource.gazetteOrNotificationDate}
            </span>
            <a
              href={activeExam.officialSource.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-white hover:text-emerald-300 transition-colors underline"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        
        {/* Stage Toggle Switch (Prelims vs Mains) */}
        <div className="lg:col-span-5 p-1.5 rounded-2xl bg-stone-100 border border-stone-200 shadow-md flex items-center gap-1.5">
          <button
            onClick={() => {
              setSelectedStage('prelims');
              setSubjectFilter('all');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
        <div className="lg:col-span-7 p-3 sm:p-4 rounded-2xl bg-white border border-stone-200 shadow-md flex flex-col justify-center space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-semibold text-stone-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{language === 'gu' ? 'તમારો અભ્યાસક્રમ પૂર્ણતા દર' : 'Your Syllabus Completion Progress'}</span>
              <span className="text-[11px] font-mono text-stone-400 font-normal">
                ({selectedStage.toUpperCase()})
              </span>
            </div>
            <div className="font-mono font-black text-emerald-800 text-sm">
              {stageStats.percent}% {language === 'gu' ? 'પૂર્ણ' : 'Done'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden flex">
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
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-stone-600">
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
          3. COMPACT SEARCH & SUBJECT FILTER TOOLBAR
         ========================================================================= */}
      <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'gu' 
                  ? 'વિષય, કલમ, નગર આયોજન, ધોળાવીરા, બંધારણ અથવા ટોપિક કોડ શોધો...' 
                  : 'Search by topic, keyword, Dholavira, Preamble, ISRO, or code...'
              }
              className="w-full pl-9 pr-9 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Subject Filter Dropdown */}
          <div className="w-full md:w-60">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
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

          {/* Expand/Collapse All + Reset */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleExpandAllSubjects(true)}
              className="px-2.5 py-2 rounded-xl text-xs font-medium text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 border border-stone-200 shadow-sm transition"
              title="Expand All Subjects"
            >
              {language === 'gu' ? 'બધું ખોલો' : 'Expand All'}
            </button>
            <button
              onClick={() => handleExpandAllSubjects(false)}
              className="px-2.5 py-2 rounded-xl text-xs font-medium text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 border border-stone-200 shadow-sm transition"
              title="Collapse All Subjects"
            >
              {language === 'gu' ? 'બધું બંધ કરો' : 'Collapse All'}
            </button>
            {(searchQuery || subjectFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSubjectFilter('all');
                }}
                className="px-2.5 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 transition"
              >
                {language === 'gu' ? 'સાફ કરો' : 'Clear'}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* =========================================================================
          4. SYLLABUS PAPERS & SUBJECTS HIERARCHICAL ACCORDIONS
         ========================================================================= */}
      <div className="space-y-4">
        {currentPapers.map(paper => {
          // Filter subjects belonging to this paper
          const visibleSubjects = paper.subjects.filter(subj => {
            if (subjectFilter !== 'all' && subj.id !== subjectFilter) return false;
            // Also check if any topic matches search
            return subj.chapters.some(ch => ch.topics.some(t => isTopicMatchingFilters(t)));
          });

          if (visibleSubjects.length === 0 && (searchQuery || subjectFilter !== 'all')) {
            return null; // Don't show paper header if no matching topics
          }

          return (
            <div key={paper.id} className="space-y-2.5">
              
              {/* Paper Banner */}
              <div className="p-3 sm:p-4 rounded-2xl bg-stone-100/90 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono tracking-wider ${
                    paper.nature === 'Qualifying' 
                      ? 'bg-stone-200 text-stone-700' 
                      : 'bg-emerald-800 text-white'
                  }`}>
                    {paper.paperCode}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-semibold text-stone-900">
                        {language === 'gu' ? paper.titleGu : paper.titleEn}
                      </h2>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        paper.nature === 'Qualifying' 
                          ? 'bg-stone-200 text-stone-700' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {paper.nature}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {paper.marks} {language === 'gu' ? 'ગુણ' : 'Marks'} • {paper.duration}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 bg-white/90 px-2.5 py-1.5 rounded-xl border border-stone-200 sm:max-w-md">
                  <p className="italic line-clamp-2">
                    {language === 'gu' ? paper.officialDescriptionGu : paper.officialDescriptionEn}
                  </p>
                </div>
              </div>

              {/* Subjects in this Paper */}
              <div className="space-y-2.5">
                {visibleSubjects.map(subject => {
                  const isExpanded = expandedSubjects[subject.id] ?? false;
                  const subjStats = getSubjectStatsForSyllabus(subject, topicStatuses);

                  return (
                    <div
                      key={subject.id}
                      className="rounded-2xl border border-stone-200 bg-white shadow-md overflow-hidden transition-all hover:border-emerald-300"
                    >
                      {/* Subject Accordion Header */}
                      <button
                        onClick={() => handleToggleSubject(subject.id)}
                        className="w-full p-3 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                            {renderSubjectIcon(subject.icon)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {subject.subjectCode}
                              </span>
                              <span className="text-[11px] text-stone-400">
                                {language === 'gu' ? subject.officialWeightageGu : subject.officialWeightageEn}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-stone-900 leading-snug mt-1 truncate">
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
                                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-950 pb-1 border-b border-stone-200">
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
                                            ? 'bg-white border-emerald-300 shadow-sm'
                                            : status === 'in_progress'
                                            ? 'bg-amber-50/30 border-amber-300 shadow-sm'
                                            : 'bg-white border-stone-200 shadow-sm'
                                        }`}
                                      >
                                        {/* Main Topic Header Strip */}
                                        <div className="p-3 sm:p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                          
                                          {/* Left: Topic Title & Badges */}
                                          <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                              <span className="px-1.5 py-0.5 rounded-md font-mono text-[9px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                                                {topic.code}
                                              </span>
                                              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md ${
                                                topic.importance === 'Essential'
                                                  ? 'bg-rose-100 text-rose-800'
                                                  : 'bg-emerald-100 text-emerald-800'
                                              }`}>
                                                {topic.importance} Focus
                                              </span>
                                              <span className="text-[10px] text-stone-400">
                                                • {topic.examFrequency}
                                              </span>
                                            </div>

                                            <h4 className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                                              {language === 'gu' ? topic.titleGu : topic.titleEn}
                                            </h4>
                                          </div>

                                          {/* Right: Interactive Status Switcher & Actions */}
                                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                            
                                            {/* Bookmark Button */}
                                            <button
                                              onClick={(e) => handleToggleBookmark(topic.id, e)}
                                              title={isBookmarked ? "Remove Bookmark" : "Bookmark this topic"}
                                              className={`p-1.5 rounded-lg border transition-all ${
                                                isBookmarked
                                                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                                                  : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700'
                                              }`}
                                            >
                                              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                                            </button>

                                            {/* Status Segmented Controls */}
                                            <div className="flex items-center rounded-lg bg-stone-100 p-0.5 border border-stone-200">
                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'not_started', e)}
                                                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                                                  status === 'not_started'
                                                    ? 'bg-white text-stone-800 shadow-xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Circle className="w-2.5 h-2.5 text-stone-400" />
                                                <span className="hidden sm:inline">{language === 'gu' ? 'બાકી' : 'Pending'}</span>
                                              </button>

                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'in_progress', e)}
                                                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                                                  status === 'in_progress'
                                                    ? 'bg-amber-500 text-white shadow-xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Clock className="w-2.5 h-2.5" />
                                                <span>{language === 'gu' ? 'ચાલુ' : 'In Progress'}</span>
                                              </button>

                                              <button
                                                onClick={(e) => handleSetSpecificStatus(topic.id, 'completed', e)}
                                                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                                                  status === 'completed'
                                                    ? 'bg-emerald-700 text-white shadow-xs'
                                                    : 'text-stone-500 hover:text-stone-800'
                                                }`}
                                              >
                                                <Check className="w-2.5 h-2.5" />
                                                <span>{language === 'gu' ? 'પૂર્ણ' : 'Completed'}</span>
                                              </button>
                                            </div>

                                            {/* View Official Details Toggle */}
                                            <button
                                              onClick={() => handleToggleTopicDetails(topic.id)}
                                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
                                              title="Toggle details"
                                            >
                                              {isDetailOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                            </button>

                                          </div>

                                        </div>

                                        {/* =========================================================
                                            SYLLABUS SCOPE AND STUDY NOTES
                                           ========================================================= */}
                                        {isDetailOpen && (
                                          <div className="p-3 sm:p-3.5 pt-0 border-t border-stone-100 space-y-3 bg-stone-50/50 rounded-b-2xl">
                                            
                                            {/* What to Cover */}
                                            <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-2 mt-2.5 shadow-xs">
                                              <div className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
                                                <Sparkles className="w-3 h-3 text-emerald-700" />
                                                <span>{language === 'gu' ? 'શું કવર કરવું:' : 'What to Cover:'}</span>
                                              </div>

                                              {((language === 'gu' ? topic.keySubtopicsGu : topic.keySubtopicsEn).length > 0) ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                                                  {(language === 'gu' ? topic.keySubtopicsGu : topic.keySubtopicsEn).map((sub, sIdx) => (
                                                    <div key={sIdx} className="flex items-start gap-1.5">
                                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                                                      <span className="leading-snug">{sub}</span>
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : (
                                                <p className="text-xs text-stone-600 leading-relaxed">
                                                  {language === 'gu' ? topic.sankalpExplanationGu : topic.sankalpExplanationEn}
                                                </p>
                                              )}
                                            </div>

                                            {/* Reference Book & Single Primary Action */}
                                            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                                              
                                              {/* Recommended Book Chip */}
                                              {topic.recommendedReadings.length > 0 && (
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                  <span className="text-[10px] font-medium text-stone-400">
                                                    {language === 'gu' ? 'સંદર્ભ:' : 'Book:'}
                                                  </span>
                                                  {topic.recommendedReadings.map((bk, bIdx) => (
                                                    <span
                                                      key={bIdx}
                                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200/60 text-stone-700 text-[10px]"
                                                    >
                                                      <BookOpen className="w-2.5 h-2.5 text-stone-500" />
                                                      <span>{bk.title}</span>
                                                      {bk.isGovtFree && (
                                                        <span className="text-[8px] font-medium text-emerald-800 bg-emerald-100 px-1 rounded">FREE</span>
                                                      )}
                                                    </span>
                                                  ))}
                                                </div>
                                              )}

                                              {/* Single Primary Action Button */}
                                              {onGoToBooks && (
                                                <button
                                                  onClick={onGoToBooks}
                                                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs ml-auto"
                                                >
                                                  <BookOpen className="w-3 h-3" />
                                                  <span>{language === 'gu' ? 'પુસ્તકો વિભાગમાંથી કવર કરો' : 'Cover from Books'}</span>
                                                  <ArrowRight className="w-3 h-3" />
                                                </button>
                                              )}

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
              <h3 className="text-base font-semibold text-stone-800">
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
                setSubjectFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold shadow-sm hover:bg-emerald-900 transition"
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
