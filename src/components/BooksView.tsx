'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Language } from '@/types';
import { 
  DigitalBookResource, 
  ResourceCategory, 
  ResourceSubject, 
  ResourceLanguage 
} from '@/types/books';
import { OPEN_EDUCATIONAL_RESOURCES } from '@/data/openEducationalResources';
import { getChaptersForBook } from '@/data/bookChaptersData';
import { loadAllLocalProgressSummary } from '@/lib/bookReaderStorage';
import { InteractiveBookReader } from '@/components/InteractiveBookReader';
import { 
  BookOpen, 
  BookmarkCheck,
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Eye, 
  Filter, 
  Globe, 
  Highlighter,
  Info, 
  Library, 
  NotebookPen,
  Search, 
  ShieldCheck, 
  Sparkles, 
  X,
} from 'lucide-react';

interface BooksViewProps {
  language: Language;
}

export const BooksView: React.FC<BooksViewProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<ResourceSubject | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<ResourceLanguage | 'all'>('all');
  
  // Interactive Book Reader Modal State
  const [readingResource, setReadingResource] = useState<DigitalBookResource | null>(null);
  const [progressSummary, setProgressSummary] = useState<
    Record<string, { progressPercent: number; completedCount: number; bookmarkCount: number; highlightCount: number; noteCount: number }>
  >({});

  const refreshProgressSummary = useCallback(() => {
    setProgressSummary(loadAllLocalProgressSummary());
  }, []);

  useEffect(() => {
    refreshProgressSummary();
  }, [refreshProgressSummary]);

  // Filter logic
  const filteredResources = useMemo(() => {
    return OPEN_EDUCATIONAL_RESOURCES.filter((res) => {
      // Category filter
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'all' && res.subject !== selectedSubject && res.subject !== 'all') {
        return false;
      }
      // Language filter
      if (selectedLanguage !== 'all' && res.language !== selectedLanguage && res.language !== 'bilingual') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = res.titleEn.toLowerCase().includes(query) || res.titleGu.toLowerCase().includes(query);
        const matchesAuthor = res.authorEn.toLowerCase().includes(query) || res.authorGu.toLowerCase().includes(query);
        const matchesDesc = res.descriptionEn.toLowerCase().includes(query) || res.descriptionGu.toLowerCase().includes(query);
        const matchesAttribution = res.attribution.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesDesc && !matchesAttribution) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedSubject, selectedLanguage, searchQuery]);

  const categories: { id: ResourceCategory | 'all'; labelEn: string; labelGu: string }[] = [
    { id: 'all', labelEn: 'All Sources (8)', labelGu: 'તમામ સ્ત્રોતો (૮)' },
    { id: 'NCERT', labelEn: 'NCERT Official', labelGu: 'NCERT સત્તાવાર' },
    { id: 'GSSTB', labelEn: 'GSSTB (Gujarat Board)', labelGu: 'ગુજરાત પાઠ્યપુસ્તક મંડળ' },
    { id: 'DIKSHA', labelEn: 'DIKSHA (MoE)', labelGu: 'દીક્ષા (DIKSHA)' },
    { id: 'IGNOU_eGyanKosh', labelEn: 'IGNOU eGyanKosh', labelGu: 'IGNOU ઇ-જ્ઞાનકોશ' },
    { id: 'ePG_Pathshala', labelEn: 'e-PG Pathshala (UGC)', labelGu: 'ઇ-પીજી પાઠશાલા' },
    { id: 'GovtOpenAccess', labelEn: 'Govt Reports & Acts', labelGu: 'સરકારી અહેવાલો અને કાયદા' },
    { id: 'PublicDomain', labelEn: 'Public Domain Classics', labelGu: 'પબ્લિક ડોમેન સાહિત્ય' },
    { id: 'CreativeCommons', labelEn: 'Creative Commons (CC)', labelGu: 'ક્રિએટિવ કોમન્સ (CC)' },
  ];

  const subjects: { id: ResourceSubject | 'all'; labelEn: string; labelGu: string }[] = [
    { id: 'all', labelEn: 'All Subjects', labelGu: 'તમામ વિષયો' },
    { id: 'history', labelEn: 'History of India & Gujarat', labelGu: 'ઇતિહાસ' },
    { id: 'heritage', labelEn: 'Cultural Heritage & Arts', labelGu: 'સાંસ્કૃતિક વારસો' },
    { id: 'polity', labelEn: 'Polity & Constitution', labelGu: 'બંધારણ અને રાજ્યવ્યવસ્થા' },
    { id: 'economy', labelEn: 'Economy & Planning', labelGu: 'અર્થતંત્ર અને બજેટ' },
    { id: 'geography', labelEn: 'Geography & Ecology', labelGu: 'ભૂગોળ અને પર્યાવરણ' },
    { id: 'ethics_admin', labelEn: 'Public Administration & Ethics', labelGu: 'જાહેર વહીવટ અને નીતિશાસ્ત્ર' },
    { id: 'current_affairs', labelEn: 'Government Current Affairs', labelGu: 'વર્તમાન પ્રવાહો અને સામયિક' },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-800 to-emerald-700 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <Library className="w-4 h-4 text-emerald-200" />
          <span>{language === 'gu' ? '૧૦૦% નિઃશુલ્ક અને કાનૂની શૈક્ષણિક સ્ત્રોતો' : '100% Free & Legal Open Educational Resources'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          {language === 'gu' 
            ? 'ડિજિટલ પુસ્તકાલય અને ઓપન લર્નિંગ રિસોર્સિસ' 
            : 'Digital Books Library & Open Educational Resources'}
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'gu'
            ? 'શૂન્ય ખર્ચ શિક્ષણ: મોંઘા પુસ્તકો ખરીદવાની કે પેઇડ સબ્સ્ક્રિપ્શન લેવાની કોઈ જરૂર નથી. NCERT, દીક્ષા, ગુજરાત રાજ્ય શાળા પાઠ્યપુસ્તક મંડળ, IGNOU eGyanKosh, e-PG પાઠશાલા, બંધારણની મૂળ કલમો અને પબ્લિક ડોમેન સાહિત્યની ચકાસાયેલી સત્તાવાર સામગ્રી.'
            : 'Zero-cost educational access: Strictly no paid books or subscriptions. Curated from authorized open repositories: NCERT, DIKSHA, Gujarat State Textbooks (GSSTB), IGNOU eGyanKosh, e-PG Pathshala, Law Ministry Bare Acts, and Public Domain classics.'}
        </p>

        {/* Mandatory Policy Guarantee Badge */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            {language === 'gu' ? 'કૉપિરાઇટ અને લાઇસન્સ ચકાસાયેલ' : 'Copyright & Licenses Verified'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            {language === 'gu' ? 'સત્તાવાર સરકારી પોર્ટલ જોડાણ' : 'Direct Official Portal Links'}
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            {language === 'gu' ? 'શૂન્ય ખર્ચ - શૂન્ય સબ્સ્ક્રિપ્શન' : 'Zero Cost - Zero Subscriptions'}
          </span>
        </div>
      </div>

      {/* 2. Compliance & Verification Advisory Box */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-stone-900 font-bold block">
            {language === 'gu' ? 'સંકલ્પ ડિજિટલ પુસ્તકાલય નીતિ (Resource Access Rules):' : 'Sankalp Digital Rights & Licensing Policy:'}
          </strong>
          <p className="leading-relaxed text-stone-600">
            {language === 'gu'
              ? 'અમે કોઈપણ સરકારી કે ખાનગી પુસ્તકનું અનધિકૃત પુનઃવિતરણ કરતા નથી. જે સ્ત્રોતોનું હોસ્ટિંગ માન્ય નથી તેમના માટે "સત્તાવાર સ્ત્રોત ખોલો" બટન આપવામાં આવ્યું છે જેથી વિદ્યાર્થીઓ મૂળ કમિશન/મંડળના પોર્ટલ પરથી મફત PDF મેળવી શકે. પબ્લિક ડોમેન અને ક્રિએટિવ કોમન્સ સામગ્રી માટે ઓનલાઇન રીડર સુવિધા ઉપલબ્ધ છે.'
              : 'We strictly comply with digital copyright and do not redistribute unauthorized PDFs. For resources requiring official portal access (NCERT, GSSTB, IGNOU), we direct learners to the official government repository. Public Domain and Creative Commons materials are enabled for in-app reading.'}
          </p>
        </div>
      </div>

      {/* 3. Search and Multi-Criteria Filter Controls */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'gu' ? 'પુસ્તકનું નામ, વિષય, લેખક અથવા મંત્રાલય શોધો...' : 'Search by book title, subject, author, publisher or ministry...'}
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Source Categories Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'gu' ? 'સત્તાવાર સ્ત્રોત સંસ્થા:' : 'Official Educational Source:'}</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                {language === 'gu' ? cat.labelGu : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Subject & Language Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
          
          {/* Subject Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'gu' ? 'વિષય મુજબ ફિલ્ટર:' : 'Filter by Subject:'}</span>
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as ResourceSubject | 'all')}
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {language === 'gu' ? s.labelGu : s.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Medium Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'gu' ? 'ભાષા / માધ્યમ:' : 'Language / Medium:'}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all' as const, labelEn: 'All', labelGu: 'તમામ' },
                { id: 'gu' as const, labelEn: 'Gujarati', labelGu: 'ગુજરાતી' },
                { id: 'en' as const, labelEn: 'English', labelGu: 'English' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedLanguage(m.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                    selectedLanguage === m.id
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {language === 'gu' ? m.labelGu : m.labelEn}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-bold text-stone-500 px-1">
        <span>
          {language === 'gu'
            ? `કુલ ઉપલબ્ધ પ્રમાણિત સાહિત્ય: ${filteredResources.length}`
            : `Verified Educational Resources: ${filteredResources.length}`}
        </span>
        {(selectedCategory !== 'all' || selectedSubject !== 'all' || selectedLanguage !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubject('all');
              setSelectedLanguage('all');
              setSearchQuery('');
            }}
            className="text-emerald-700 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>{language === 'gu' ? 'ફિલ્ટર્સ રીસેટ કરો' : 'Reset Filters'}</span>
          </button>
        )}
      </div>

      {/* 5. Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const chapters = getChaptersForBook(res.id);
          const stats = progressSummary[res.id] || {
            progressPercent: 0,
            completedCount: 0,
            bookmarkCount: 0,
            highlightCount: 0,
            noteCount: 0,
          };

          // Dynamic License Badge Color
          const licenseColorClass = 
            res.licenseType === 'Public Domain' 
              ? 'bg-purple-100 text-purple-800 border-purple-200' 
              : res.licenseType === 'CC BY' || res.licenseType === 'CC BY-SA' || res.licenseType === 'CC0'
              ? 'bg-blue-100 text-blue-800 border-blue-200'
              : res.licenseType === 'Government Open Access'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-amber-100 text-amber-900 border-amber-200';

          return (
            <div
              key={res.id}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:border-emerald-500/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3.5">
                
                {/* Book Thumbnail & Badges */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                  {res.coverImageUrl ? (
                    <img
                      src={res.coverImageUrl}
                      alt={res.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                      <BookOpen className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs font-mono">{res.category}</span>
                    </div>
                  )}

                  {/* Top-Right: Language, Chapters & Pages */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {res.totalPages && (
                      <span className="px-2 py-1 rounded-md bg-emerald-950/90 text-[10px] font-bold text-emerald-200 shadow-xs">
                        {res.totalPages} {language === 'gu' ? 'પાના' : 'p'}
                      </span>
                    )}
                    {chapters.length > 0 && (
                      <span className="px-2 py-1 rounded-md bg-white/95 text-[10px] font-bold text-stone-900 shadow-xs">
                        {chapters.length} {language === 'gu' ? 'પ્રકરણ' : 'Ch'}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-xs text-[10px] font-bold text-white tracking-wider">
                      {res.language.toUpperCase()}
                    </span>
                  </div>

                  {/* Top-Left: Category Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-emerald-700 text-[10px] font-bold text-white shadow-xs">
                    {res.category.replace('_', ' ')}
                  </div>
                </div>

                {/* License & Verification Bar */}
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <span className={`px-2 py-0.5 rounded-md font-bold border ${licenseColorClass}`}>
                    {res.licenseType}
                  </span>
                  <span className="text-stone-400 font-mono text-[10px] shrink-0">
                    {language === 'gu' ? 'ચકાસાયેલ: ' : 'Verified: '} {res.permissionVerifiedAt}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                  {language === 'gu' ? res.titleGu : res.titleEn}
                </h3>

                {/* Author & Publisher */}
                <div className="text-xs text-stone-500 font-medium">
                  <span>{language === 'gu' ? res.authorGu : res.authorEn}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed font-normal line-clamp-3">
                  {language === 'gu' ? res.descriptionGu : res.descriptionEn}
                </p>

                {/* Volumes & Pages Breakdown (when multi-part book) */}
                {res.volumes && res.volumes.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                      <span>{language === 'gu' ? 'પુસ્તક વિભાગો' : 'Volumes Included'}</span>
                      {res.totalPages && (
                        <span className="text-emerald-700">
                          {res.totalPages} {language === 'gu' ? 'કુલ પાના' : 'Total Pages'}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {res.volumes.map((v) => (
                        <div
                          key={v.key}
                          className="flex items-center justify-between text-[11px] text-stone-700"
                        >
                          <span className="truncate font-medium pr-2">
                            {language === 'gu' ? v.labelGu : v.labelEn}
                          </span>
                          <span className="font-mono text-[10px] text-stone-500 shrink-0">
                            {v.pagesCount}p · {v.chaptersCount}ch
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Reading Progress & Study Telemetry */}
                {chapters.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                      <span>{language === 'gu' ? 'વાંચન પ્રગતિ' : 'Reading Progress'}</span>
                      <span>
                        {stats.completedCount}/{chapters.length} ({stats.progressPercent}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-emerald-200/70 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                        style={{ width: `${stats.progressPercent}%` }}
                      />
                    </div>
                    {(stats.highlightCount > 0 || stats.noteCount > 0 || stats.bookmarkCount > 0) && (
                      <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[10px] font-semibold text-stone-600">
                        {stats.highlightCount > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Highlighter className="w-3 h-3 text-amber-600" />
                            {stats.highlightCount} {language === 'gu' ? 'હાઇલાઇટ' : 'Highlights'}
                          </span>
                        )}
                        {stats.noteCount > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <NotebookPen className="w-3 h-3 text-emerald-700" />
                            {stats.noteCount} {language === 'gu' ? 'નોટ્સ' : 'Notes'}
                          </span>
                        )}
                        {stats.bookmarkCount > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <BookmarkCheck className="w-3 h-3 text-sky-600" />
                            {stats.bookmarkCount} {language === 'gu' ? 'બુકમાર્ક' : 'Bookmarks'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Recommended For Box */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                  <div className="text-emerald-800 font-bold flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{language === 'gu' ? 'ઉપયોગિતા:' : 'Target:'} {language === 'gu' ? res.recommendedForGu : res.recommendedForEn}</span>
                  </div>
                </div>

                {/* Attribution Box (Mandatory Requirement) */}
                <div className="text-[10px] text-stone-500 bg-stone-50/80 p-2 rounded-lg border border-stone-200/50 leading-relaxed">
                  <span className="font-bold text-stone-700">{language === 'gu' ? 'સ્ત્રોત સંદર્ભ: ' : 'Attribution: '}</span>
                  <span>{res.attribution}</span>
                </div>

                {/* Permissions Matrix Pills */}
                <div className="flex items-center gap-2 pt-1 text-[10px] text-stone-500 font-medium">
                  <span className={`flex items-center gap-1 ${res.canReadOnline ? 'text-emerald-700' : 'text-stone-400'}`}>
                    <Eye className="w-3 h-3" />
                    {language === 'gu' ? 'ચેપ્ટર રીડર + નોટ્સ' : 'Chapter Reader & Highlights'}
                  </span>
                  <span>·</span>
                  <span className={`flex items-center gap-1 ${res.canDownload ? 'text-emerald-700' : 'text-stone-400'}`}>
                    <Download className="w-3 h-3" />
                    {language === 'gu' ? 'મફત PDF' : 'Free PDF'}
                  </span>
                </div>

              </div>

              {/* Action Buttons: 100% In-App Reading Priority */}
              <div className="pt-2 space-y-2">
                
                {/* Primary Action: Open Interactive Chapter Reader inside Sankalp */}
                {res.canReadOnline && (
                  <button
                    onClick={() => setReadingResource(res)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-200" />
                    <span>
                      {stats.progressPercent > 0
                        ? language === 'gu'
                          ? `વાંચવાનું ચાલુ રાખો (${stats.progressPercent}%)`
                          : `Continue Reading (${stats.progressPercent}%)`
                        : language === 'gu'
                        ? 'સંકલ્પમાં ઓનલાઇન વાંચો'
                        : 'Open Chapter Reader'}
                    </span>
                  </button>
                )}

                {/* Secondary Row: Download PDF & Official Source Link */}
                <div className="grid grid-cols-2 gap-2">
                  {res.canDownload && res.hostedPdfUrl && (
                    <a
                      href={res.hostedPdfUrl}
                      download
                      className="py-2 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
                      title="Download PDF"
                    >
                      <Download className="w-3 h-3 text-emerald-700" />
                      <span>{language === 'gu' ? 'ડાઉનલોડ PDF' : 'Download PDF'}</span>
                    </a>
                  )}

                  {res.sourceUrl && (
                    <a
                      href={res.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors border border-stone-200/80"
                      title="Open Official Educational Source"
                    >
                      <ExternalLink className="w-3 h-3 text-stone-500" />
                      <span>{language === 'gu' ? 'સત્તાવાર સ્ત્રોત' : 'Official Portal'}</span>
                    </a>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* 6. Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 space-y-3">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800">
            {language === 'gu' ? 'કોઈ સાહિત્ય મળ્યું નથી' : 'No matching resources found'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {language === 'gu'
              ? 'કૃપા કરીને તમારા શોધ શબ્દો અથવા ફિલ્ટર વિકલ્પો બદલીને ફરી પ્રયાસ કરો.'
              : 'Try adjusting your search query or reset the source/subject filters to view all free resources.'}
          </p>
        </div>
      )}

      {/* 7. Full Interactive Book Reader Modal (Chapters, Highlight Text, Notes, Bookmarks, Progress & PDF View) */}
      {readingResource && (
        <InteractiveBookReader
          resource={readingResource}
          language={language}
          onClose={() => setReadingResource(null)}
          onProgressUpdated={refreshProgressSummary}
        />
      )}

    </div>
  );
};
