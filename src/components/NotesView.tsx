'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { TOPIC_REVISION_NOTES } from '@/data/topicNotes';
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Key, 
  Search, 
  Sparkles, 
  Tag 
} from 'lucide-react';
import { PersonalNotesView } from '@/components/PersonalNotesView';

interface NotesViewProps {
  language: Language;
  onReadFullModule: (topicId: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({ language, onReadFullModule }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'revision' | 'personal'>('revision');

  // Extract unique subjects
  const subjects = [
    { id: 'all', nameEn: 'All Subjects', nameGu: 'તમામ વિષયો' },
    { id: 'polity', nameEn: 'Indian Polity & Constitution', nameGu: 'બંધારણ અને રાજ્યવ્યવસ્થા' },
    { id: 'gujarat', nameEn: 'History of Gujarat & Culture', nameGu: 'ગુજરાતનો ઇતિહાસ અને સંસ્કૃતિ' },
  ];

  const filteredNotes = TOPIC_REVISION_NOTES.filter((note) => {
    const matchesSubject = 
      selectedSubject === 'all' ||
      (selectedSubject === 'polity' && note.subject.includes('Polity')) ||
      (selectedSubject === 'gujarat' && note.subject.includes('Gujarat'));

    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery ||
      note.titleEn.toLowerCase().includes(q) ||
      note.titleGu.toLowerCase().includes(q) ||
      note.subject.toLowerCase().includes(q) ||
      note.highYieldBulletsEn.some(b => b.toLowerCase().includes(q)) ||
      note.keyArticlesOrDatesEn.some(a => a.toLowerCase().includes(q));

    return matchesSubject && matchesSearch;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      <div role="tablist" aria-label={language === 'gu' ? 'નોંધના પ્રકાર' : 'Notes type'} className="inline-flex rounded-xl border border-stone-200 bg-white p-1 shadow-xs">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'revision'}
          onClick={() => setViewMode('revision')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
            viewMode === 'revision'
              ? 'bg-emerald-100 text-emerald-950 shadow-sm'
              : 'text-stone-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          {language === 'gu' ? 'ઝડપી રિવિઝન' : 'Revision Summaries'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'personal'}
          onClick={() => setViewMode('personal')}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
            viewMode === 'personal'
              ? 'bg-emerald-100 text-emerald-950 shadow-sm'
              : 'text-stone-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          {language === 'gu' ? 'મારી નોંધો' : 'My Notes'}
        </button>
      </div>

      {viewMode === 'personal' ? (
        <PersonalNotesView language={language} />
      ) : (
      <div className="w-full space-y-8">
      
      {/* Top Banner - Clean White & Emerald */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-800 to-emerald-700 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <FileText className="w-4 h-4 text-emerald-200" />
          <span>{language === 'gu' ? 'વિષયવાર પુનરાવર્તન નોટ્સ (Quick Summaries)' : 'High-Yield Topic Revision Notes'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          {language === 'gu' ? '૫ મિનિટમાં સંપૂર્ણ ટોપિક રિવિઝન' : '5-Minute High-Yield Topic Summaries'}
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          {language === 'gu'
            ? 'પરીક્ષા પહેલાં ઝડપી પુનરાવર્તન માટે દરેક ટોપિકના પાયારૂપ મુદ્દાઓ, મહત્વની કલમો, પ્રિલિમ્સ ટ્રેપ્સ અને મેઈન્સ કીવર્ડ્સનું સંકલન.'
            : 'Concise bullet summaries, core constitutional articles, fatal prelims traps, and scoring keywords for rapid pre-exam revision.'}
        </p>
      </div>

      {/* Search and Subject Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'gu' ? 'ટોપિક, કલમ કે કીવર્ડ શોધો...' : 'Search by topic, article, keyword...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 border ${
                selectedSubject === sub.id
                  ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-400'
              }`}
            >
              {language === 'gu' ? sub.nameGu : sub.nameEn}
            </button>
          ))}
        </div>

      </div>

      {/* Total Found */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>
          {language === 'gu' 
            ? `${filteredNotes.length} વિષય નોટ્સ ઉપલબ્ધ છે` 
            : `Showing ${filteredNotes.length} Topic Revision Summaries`}
        </span>
        <span className="text-emerald-700 font-bold">
          {language === 'gu' ? '૧૦૦% સત્તાવાર GPSC/UPSC સિલેબસ મુજબ' : '100% Official Syllabus Aligned'}
        </span>
      </div>

      {/* Revision Notes Grid - Wide & Responsive across 80% screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500/80 transition-all flex flex-col justify-between space-y-5"
          >
              <div className="space-y-4">
                
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-emerald-700" />
                    <span>{language === 'gu' ? note.subjectGu : note.subject}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{note.readTimeMins} {language === 'gu' ? 'મિનિટ રિવિઝન' : 'mins quick read'}</span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  {language === 'gu' ? note.titleGu : note.titleEn}
                </h2>

                {/* High-Yield Bullets */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'gu' ? 'મુખ્ય પરીક્ષાલક્ષી તારણો:' : 'High-Yield Key Takeaways:'}</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {(language === 'gu' ? note.highYieldBulletsGu : note.highYieldBulletsEn).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Articles & Key Dates Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'gu' ? 'અનિવાર્ય કલમો / તારીખો:' : 'Must-Remember Articles & Milestones:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'gu' ? note.keyArticlesOrDatesGu : note.keyArticlesOrDatesEn).map((art, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-stone-800 text-[11px] font-semibold"
                      >
                        {art}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prelims Trap Box */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <AlertCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{language === 'gu' ? 'પ્રિલિમ્સ ટ્રેપ (પરીક્ષામાં થતી સામાન્ય ભૂલ):' : 'Prelims Elimination Trap:'}</span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {language === 'gu' ? note.prelimsTrapsGu : note.prelimsTrapsEn}
                  </p>
                </div>

                {/* Mains Keywords */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {language === 'gu' ? 'મેઈન્સ ઉત્તરલેખન કીવર્ડ્સ:' : 'Mains Scoring Keywords:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'gu' ? note.mainsKeywordsGu : note.mainsKeywordsEn).map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-mono text-[10px] font-bold border border-stone-200"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Action: Go to Full Interactive Module */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {language === 'gu' ? 'સંપૂર્ણ મોડ્યુલ અને ક્વિઝ' : 'Includes Deep-Dive & Checkpoint Quiz'}
                </span>
                <button
                  onClick={() => onReadFullModule(note.topicId)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>{language === 'gu' ? 'સંપૂર્ણ મોડ્યુલ વાંચો' : 'Read Full Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
        ))}
      </div>

      </div>
      )}
    </div>
  );
};
