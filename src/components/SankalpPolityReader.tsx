'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Highlighter,
  Lightbulb,
  NotebookPen,
  Sparkles,
  Target,
  Trash2,
  X,
} from 'lucide-react';
import type { Language } from '@/types';
import {
  SANKALP_INDIAN_POLITY_BOOK,
  type PolityChapterContent,
  type SankalpBookDefinition,
} from '@/data/sankalpIndianPolityBook';
import { getChapterMainsAnalysis } from '@/data/polityMainsContent';

interface SankalpPolityReaderProps {
  language: Language;
  book?: SankalpBookDefinition;
  initialChapterId?: string;
  onClose: () => void;
}

type HighlightColor = 'yellow' | 'green' | 'pink';
type HighlighterMode = 'off' | HighlightColor | 'erase';

interface BookHighlight {
  id: string;
  chapterId: string;
  text: string;
  color: HighlightColor;
  createdAt: string;
}

interface BookNote {
  id: string;
  chapterId: string;
  chapterTitleEn: string;
  chapterTitleGu: string;
  note: string;
  updatedAt: string;
}

const PROGRESS_KEY = 'sankalp_polity_completed_v1';
const BOOKMARKS_KEY = 'sankalp_polity_bookmarks_v1';

const HIGHLIGHT_CLASSES: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-200 text-stone-900 rounded px-0.5',
  green: 'bg-emerald-200 text-emerald-950 rounded px-0.5',
  pink: 'bg-rose-200 text-rose-950 rounded px-0.5',
};

function renderHighlightedText(
  text: string,
  highlights: BookHighlight[],
  eraseMode: boolean,
  onErase: (id: string) => void,
): React.ReactNode {
  if (!highlights.length || !text) return text;
  const activeSnippets = highlights.filter((h) => h.text.length >= 3 && text.includes(h.text));
  if (!activeSnippets.length) return text;

  const first = activeSnippets[0];
  const idx = text.indexOf(first.text);
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + first.text.length);
  const after = text.slice(idx + first.text.length);

  return (
    <>
      {before}
      <mark
        onClick={eraseMode ? () => onErase(first.id) : undefined}
        title={eraseMode ? 'Click to erase highlight' : undefined}
        className={`${HIGHLIGHT_CLASSES[first.color]} ${
          eraseMode ? 'cursor-pointer ring-2 ring-rose-500 hover:line-through hover:opacity-75' : ''
        }`}
      >
        {match}
      </mark>
      {renderHighlightedText(after, highlights, eraseMode, onErase)}
    </>
  );
}

export const SankalpPolityReader: React.FC<SankalpPolityReaderProps> = ({
  language,
  book: bookProp,
  initialChapterId,
  onClose,
}) => {
  const isGu = language === 'gu';
  const book = bookProp ?? SANKALP_INDIAN_POLITY_BOOK;
  const isLegacyPolity = book.id === 'sankalp-indian-polity';
  const progressKey = isLegacyPolity ? PROGRESS_KEY : `sankalp_book_completed_v1_${book.id}`;
  const bookmarksKey = isLegacyPolity ? BOOKMARKS_KEY : `sankalp_book_bookmarks_v1_${book.id}`;
  const highlightsKey = `sankalp_book_highlights_v1_${book.id}`;
  const notesKey = `sankalp_book_notes_v1_${book.id}`;

  const [activeChapterId, setActiveChapterId] = useState<string>(
    initialChapterId ?? book.chapters[0].id,
  );
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeDiagramNodeId, setActiveDiagramNodeId] = useState<string | null>(null);

  const [highlights, setHighlights] = useState<BookHighlight[]>([]);
  const [notes, setNotes] = useState<BookNote[]>([]);
  const [highlighterMode, setHighlighterMode] = useState<HighlighterMode>('off');
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [draftNote, setDraftNote] = useState('');
  const [studyMode, setStudyMode] = useState<'prelims' | 'mains'>('prelims');

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(progressKey);
      setCompletedIds(savedProgress ? JSON.parse(savedProgress) : []);
      const savedBookmarks = localStorage.getItem(bookmarksKey);
      setBookmarkedIds(savedBookmarks ? JSON.parse(savedBookmarks) : []);
      const savedHighlights = localStorage.getItem(highlightsKey);
      setHighlights(savedHighlights ? JSON.parse(savedHighlights) : []);
      const savedNotes = localStorage.getItem(notesKey);
      setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    } catch {
      // Ignore storage errors
    }
  }, [progressKey, bookmarksKey, highlightsKey, notesKey]);

  const activeChapter: PolityChapterContent = useMemo(
    () => book.chapters.find((c) => c.id === activeChapterId) ?? book.chapters[0],
    [book.chapters, activeChapterId],
  );

  const activeIndex = book.chapters.findIndex((c) => c.id === activeChapter.id);
  const publishedChapters = book.chapters.filter((c) => c.status === 'published');
  const completedPublishedCount = publishedChapters.filter((c) => completedIds.includes(c.id)).length;

  const chapterHighlights = useMemo(
    () => highlights.filter((h) => h.chapterId === activeChapter.id),
    [highlights, activeChapter.id],
  );

  const visibleNotes = useMemo(
    () => notes.filter((n) => n.chapterId === activeChapter.id),
    [notes, activeChapter.id],
  );

  const persistHighlights = (next: BookHighlight[]) => {
    setHighlights(next);
    try {
      localStorage.setItem(highlightsKey, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const persistNotes = (next: BookNote[]) => {
    setNotes(next);
    try {
      localStorage.setItem(notesKey, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const handleTextSelection = () => {
    if (highlighterMode === 'off') return;
    const selection = window.getSelection()?.toString().trim() ?? '';
    if (selection.length < 3 || selection.length > 400) return;

    if (highlighterMode === 'erase') {
      const remaining = highlights.filter(
        (h) =>
          h.chapterId !== activeChapter.id ||
          (!h.text.includes(selection) && !selection.includes(h.text)),
      );
      if (remaining.length !== highlights.length) {
        persistHighlights(remaining);
      }
      window.getSelection()?.removeAllRanges();
      return;
    }

    const alreadyExists = highlights.some(
      (h) => h.chapterId === activeChapter.id && h.text === selection && h.color === highlighterMode,
    );
    if (!alreadyExists) {
      const filtered = highlights.filter(
        (h) => !(h.chapterId === activeChapter.id && h.text === selection),
      );
      const entry: BookHighlight = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        chapterId: activeChapter.id,
        text: selection,
        color: highlighterMode,
        createdAt: new Date().toISOString(),
      };
      persistHighlights([entry, ...filtered]);
    }
    window.getSelection()?.removeAllRanges();
  };

  const deleteHighlight = (id: string) => {
    persistHighlights(highlights.filter((h) => h.id !== id));
  };

  const saveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draftNote.trim();
    if (!trimmed) return;
    const entry: BookNote = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      chapterId: activeChapter.id,
      chapterTitleEn: activeChapter.titleEn,
      chapterTitleGu: activeChapter.titleGu,
      note: trimmed,
      updatedAt: new Date().toISOString(),
    };
    persistNotes([entry, ...notes]);
    setDraftNote('');
  };

  const deleteNote = (id: string) => {
    persistNotes(notes.filter((n) => n.id !== id));
  };

  const toggleCompleted = (chapterId: string) => {
    const next = completedIds.includes(chapterId)
      ? completedIds.filter((id) => id !== chapterId)
      : [...completedIds, chapterId];
    setCompletedIds(next);
    try {
      localStorage.setItem(progressKey, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const toggleBookmark = (chapterId: string) => {
    const next = bookmarkedIds.includes(chapterId)
      ? bookmarkedIds.filter((id) => id !== chapterId)
      : [...bookmarkedIds, chapterId];
    setBookmarkedIds(next);
    try {
      localStorage.setItem(bookmarksKey, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  const isCompleted = completedIds.includes(activeChapter.id);
  const isBookmarked = bookmarkedIds.includes(activeChapter.id);
  const eraseMode = highlighterMode === 'erase';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-100">
      {/* Top Reader Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-white px-4 py-3 shadow-md sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-emerald-950 sm:text-base">
              {isGu ? book.titleGu : book.titleEn}
            </h2>
            <p className="text-xs text-stone-500">
              {isGu
                ? `${publishedChapters.length} પ્રકાશિત પ્રકરણો · ${completedPublishedCount} પૂર્ણ`
                : `${publishedChapters.length} published chapters · ${completedPublishedCount} completed`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Top Highlighter Color Picker & Eraser */}
          <div className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1">
            <Highlighter className="h-3.5 w-3.5 text-stone-600" />
            <span className="hidden text-[11px] font-medium text-stone-600 sm:inline">
              {isGu ? 'હાઈલાઈટર:' : 'Highlight:'}
            </span>
            {(
              [
                ['yellow', 'bg-yellow-300', isGu ? 'પીળો' : 'Yellow'],
                ['green', 'bg-emerald-300', isGu ? 'લીલો' : 'Green'],
                ['pink', 'bg-rose-300', isGu ? 'ગુલાબી' : 'Pink'],
              ] as const
            ).map(([color, bgClass, label]) => {
              const active = highlighterMode === color;
              return (
                <button
                  key={color}
                  type="button"
                  title={active ? (isGu ? 'બંધ કરો' : 'Turn off') : label}
                  onClick={() => setHighlighterMode(active ? 'off' : color)}
                  className={`h-5 w-5 rounded-full border transition ${bgClass} ${
                    active ? 'scale-110 border-stone-900 ring-2 ring-stone-900/30' : 'border-stone-300 hover:scale-105'
                  }`}
                />
              );
            })}
            <button
              type="button"
              onClick={() => setHighlighterMode(eraseMode ? 'off' : 'erase')}
              title={isGu ? 'હાઈલાઈટ ભૂંસો' : 'Erase highlight'}
              className={`ml-0.5 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                eraseMode
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Eraser className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isGu ? 'ભૂંસો' : 'Erase'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowNotesPanel((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
              showNotesPanel
                ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <NotebookPen className="h-4 w-4" />
            <span>{isGu ? `નોંધો (${notes.length})` : `Notes (${notes.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleBookmark(activeChapter.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
              isBookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            <span>{isGu ? (isBookmarked ? 'બુકમાર્ક કરેલ' : 'બુકમાર્ક') : isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCompleted(activeChapter.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              isCompleted
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'border border-emerald-700 bg-white text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isGu ? (isCompleted ? 'પૂર્ણ થયું' : 'પૂર્ણ માર્ક કરો') : isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="rounded-xl border border-stone-200 bg-white p-2 text-stone-600 hover:bg-stone-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Table of Contents Sidebar */}
        <aside className="max-h-56 w-full overflow-y-auto border-b border-stone-200 bg-white p-4 lg:max-h-none lg:w-76 lg:border-b-0 lg:border-r">
          <h3 className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {isGu ? `અનુક્રમણિકા (${book.chapters.length} પ્રકરણો)` : `Table of Contents (${book.chapters.length} Chapters)`}
          </h3>

          <div className="mt-3 space-y-4">
            {book.parts.map((part) => {
              const partChapters = book.chapters.filter((ch) => ch.partNumber === part.partNumber);
              return (
                <div key={part.partNumber} className="space-y-1">
                  <p className="text-[11px] font-semibold text-emerald-900">
                    {isGu ? part.titleGu : part.titleEn}
                  </p>
                  <div className="space-y-1">
                    {partChapters.map((ch) => {
                      const isActive = ch.id === activeChapter.id;
                      const chDone = completedIds.includes(ch.id);
                      const chSaved = bookmarkedIds.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => {
                            setActiveChapterId(ch.id);
                            setActiveDiagramNodeId(null);
                          }}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                            isActive
                              ? 'bg-emerald-800 font-semibold text-white'
                              : ch.status === 'published'
                                ? 'text-stone-800 hover:bg-stone-100'
                                : 'text-stone-400 hover:bg-stone-50'
                          }`}
                        >
                          <span className="line-clamp-2 flex-1">
                            {isGu ? ch.titleGu : ch.titleEn}
                          </span>
                          <span className="flex shrink-0 items-center gap-1">
                            {chSaved && <BookmarkCheck className="h-3 w-3 text-amber-400" />}
                            {chDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                            {ch.status === 'planned' && (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-medium uppercase ${
                                  isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-100 text-stone-500'
                                }`}
                              >
                                {isGu ? 'ટૂંકમાં' : 'Soon'}
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Chapter Reading Content */}
        <main
          onMouseUp={handleTextSelection}
          className="relative flex-1 overflow-y-auto p-4 sm:p-8"
        >
          {/* Active Highlighter Mode Hint */}
          {highlighterMode !== 'off' && (
            <div
              className={`mx-auto mb-4 flex max-w-3xl items-center justify-between gap-2 rounded-xl px-4 py-2 text-xs font-medium ${
                eraseMode
                  ? 'border border-rose-200 bg-rose-50 text-rose-900'
                  : 'border border-amber-200 bg-amber-50 text-amber-950'
              }`}
            >
              <span>
                {eraseMode
                  ? isGu
                    ? 'ઈરેઝ મોડ ચાલુ છે: કોઈપણ હાઈલાઈટ પર ક્લિક કરો અથવા ટેક્સ્ટ સિલેક્ટ કરીને ભૂંસો.'
                    : 'Erase mode active: click any highlighted text (or select it) to erase.'
                  : isGu
                    ? 'હાઈલાઈટર ચાલુ છે: કોઈપણ ટેક્સ્ટ સિલેક્ટ કરતાં જ આપોઆપ હાઈલાઈટ થઈ જશે.'
                    : 'Highlighter active: select any text to automatically highlight it.'}
              </span>
              <button
                type="button"
                onClick={() => setHighlighterMode('off')}
                className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-800 shadow-sm"
              >
                {isGu ? 'બંધ કરો' : 'Done'}
              </button>
            </div>
          )}

          <div className="mx-auto max-w-3xl space-y-6">
            {/* Chapter Title Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-800">
                <span>{isGu ? activeChapter.partTitleGu : activeChapter.partTitleEn}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-stone-500">
                  <Clock className="h-3.5 w-3.5" />
                  {activeChapter.readingTimeMinutes} {isGu ? 'મિનિટ વાંચન' : 'min read'}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
                {isGu ? activeChapter.titleGu : activeChapter.titleEn}
              </h1>

              {/* Exam Focus Box */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-950">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                <div>
                  <span className="font-medium uppercase tracking-wide text-amber-800">
                    {isGu ? 'પરીક્ષા ફોકસ: ' : 'Exam Focus: '}
                  </span>
                  {isGu ? activeChapter.examFocusGu : activeChapter.examFocusEn}
                </div>
              </div>
              {/* Prelims / Mains Mode Tabs */}
              <div className="mt-4 flex gap-2 border-t border-stone-100 pt-4">
                <button
                  type="button"
                  onClick={() => setStudyMode('prelims')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    studyMode === 'prelims'
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isGu ? 'પ્રિલિમ્સ (સંકલ્પના અને તથ્યો)' : 'Prelims (Concepts & Facts)'}
                </button>
                <button
                  type="button"
                  onClick={() => setStudyMode('mains')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                    studyMode === 'mains'
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isGu ? 'મેઈન્સ (વિશ્લેષણ અને જવાબ લેખન)' : 'Mains (Analysis & Answer Writing)'}
                </button>
              </div>
            </div>

            {activeChapter.status === 'planned' ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-emerald-700" />
                <h2 className="mt-3 text-lg font-semibold text-stone-900">
                  {isGu ? 'આ પ્રકરણની વિગતવાર સામગ્રી તૈયાર થઈ રહી છે' : 'Detailed Chapter Content Coming Next'}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveChapterId(book.chapters[0].id)}
                  className="mt-4 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-900"
                >
                  {isGu ? 'પ્રકરણ ૧ પર જાઓ' : 'Go to Chapter 1'}
                </button>
              </div>
            ) : studyMode === 'prelims' ? (
              <>
                {/* Interactive Flow Diagram */}
                {activeChapter.diagramNodes && activeChapter.diagramNodes.length > 0 && (
                  <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-md">
                    <h2 className="text-sm font-semibold text-emerald-950">
                      {isGu ? activeChapter.diagramTitleGu : activeChapter.diagramTitleEn}
                    </h2>
                    <p className="mt-1 text-xs text-stone-500">
                      {isGu ? 'વિગત જોવા માટે કોઈપણ તબક્કા પર ક્લિક કરો' : 'Click any step below to inspect details'}
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-4">
                      {activeChapter.diagramNodes.map((node, idx) => {
                        const selected = (activeDiagramNodeId ?? activeChapter.diagramNodes?.[0].id) === node.id;
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setActiveDiagramNodeId(node.id)}
                            className={`rounded-xl border p-3 text-left transition ${
                              selected
                                ? 'border-emerald-700 bg-emerald-50 shadow-sm'
                                : 'border-stone-200 bg-stone-50 hover:border-emerald-300'
                            }`}
                          >
                            <span className="text-[10px] font-medium text-emerald-700">STEP {idx + 1}</span>
                            <p className="mt-0.5 text-xs font-semibold text-stone-900">
                              {isGu ? node.labelGu : node.labelEn}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {(() => {
                      const currentNode =
                        activeChapter.diagramNodes.find((n) => n.id === activeDiagramNodeId) ??
                        activeChapter.diagramNodes[0];
                      return (
                        <div className="mt-3 rounded-xl bg-emerald-950 p-3.5 text-xs leading-relaxed text-emerald-50">
                          <span className="font-semibold text-emerald-300">
                            {isGu ? currentNode.labelGu : currentNode.labelEn}:{' '}
                          </span>
                          {isGu ? currentNode.detailGu : currentNode.detailEn}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Chapter Sections */}
                {activeChapter.sections.map((section) => (
                  <article key={section.id} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-md">
                    <h2 className="text-lg font-semibold text-emerald-950">
                      {isGu ? section.headingGu : section.headingEn}
                    </h2>

                    {/* Simple Beginner-Friendly Explanation */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700">
                        {isGu ? 'સરળ સમજૂતી' : 'Simple Explanation'}
                      </span>
                      <p className="text-sm leading-7 text-stone-800">
                        {renderHighlightedText(
                          isGu ? section.simpleExplanationGu : section.simpleExplanationEn,
                          chapterHighlights,
                          eraseMode,
                          deleteHighlight,
                        )}
                      </p>
                    </div>

                    {/* Important Exam Points */}
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-stone-700">
                        {isGu ? 'પરીક્ષા માટે મહત્વના મુદ્દા' : 'Important Exam Points'}
                      </h3>
                      <ul className="mt-2.5 space-y-2">
                        {(isGu ? section.importantPointsGu : section.importantPointsEn).map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-stone-800">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                            <span>{renderHighlightedText(pt, chapterHighlights, eraseMode, deleteHighlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Real-Life Example */}
                    <div className="flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs leading-relaxed text-sky-950">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                      <div>
                        <span className="font-medium uppercase tracking-wide text-sky-800">
                          {isGu ? 'વાસ્તવિક જીવનનું ઉદાહરણ: ' : 'Real-Life Example: '}
                        </span>
                        {renderHighlightedText(
                          isGu ? section.realLifeExampleGu : section.realLifeExampleEn,
                          chapterHighlights,
                          eraseMode,
                          deleteHighlight,
                        )}
                      </div>
                    </div>

                    {/* Key Terms */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {section.keyTerms.map((term) => (
                        <span
                          key={term}
                          className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-700"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}

                {/* Comparison Table */}
                {activeChapter.comparisonTable && (
                  <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white p-5 shadow-md">
                    <h2 className="text-sm font-semibold text-emerald-950">
                      {isGu ? activeChapter.comparisonTable.titleGu : activeChapter.comparisonTable.titleEn}
                    </h2>
                    <table className="mt-3 w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50">
                          {(isGu
                            ? activeChapter.comparisonTable.headersGu
                            : activeChapter.comparisonTable.headersEn
                          ).map((header) => (
                            <th key={header} className="p-2.5 font-semibold text-stone-800">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(isGu
                          ? activeChapter.comparisonTable.rowsGu
                          : activeChapter.comparisonTable.rowsEn
                        ).map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-stone-100 last:border-b-0">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-2.5 align-top ${cIdx === 0 ? 'font-medium text-stone-900' : 'text-stone-700'}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 2-Minute Revision Summary */}
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5">
                  <h2 className="text-sm font-semibold text-emerald-950">
                    {isGu ? '૨-મિનિટ ક્વિક રિવિઝન સારાંશ' : '2-Minute Quick Revision Summary'}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {(isGu ? activeChapter.summaryPointsGu : activeChapter.summaryPointsEn).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-emerald-950">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                        <span>{renderHighlightedText(point, chapterHighlights, eraseMode, deleteHighlight)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              (() => {
                const mains = activeChapter.mainsAnalysis ?? getChapterMainsAnalysis(activeChapter);
                const fw = isGu ? mains.answerFrameworkGu : mains.answerFrameworkEn;
                const isPolity = book.subject === 'polity';
                return (
                  <div className="space-y-5">
                    {/* Core Debate / Issue */}
                    <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-md space-y-4">
                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700">
                          {isPolity
                            ? isGu
                              ? 'મુખ્ય બંધારણીય મુદ્દો / ચર્ચા'
                              : 'Core Constitutional Debate / Issue'
                            : isGu
                              ? 'મુખ્ય ઐતિહાસિક / વારસાગત ચર્ચા'
                              : 'Core Historical / Heritage Debate'}
                        </span>
                        <p className="mt-2 text-sm font-medium leading-7 text-stone-900">
                          {renderHighlightedText(
                            isGu ? mains.coreDebateGu : mains.coreDebateEn,
                            chapterHighlights,
                            eraseMode,
                            deleteHighlight,
                          )}
                        </p>
                      </div>

                      <div className="border-t border-stone-100 pt-4 space-y-3">
                        <h2 className="text-xs font-medium uppercase tracking-wider text-emerald-950">
                          {isGu ? 'વિગતવાર મેઈન્સ વિશ્લેષણ (GS-II ઊંડાણ)' : 'Detailed Mains Analysis (GS-II Depth)'}
                        </h2>
                        {(isGu ? mains.detailedAnalysisGu : mains.detailedAnalysisEn).map((para, idx) => (
                          <p key={idx} className="text-sm leading-7 text-stone-800">
                            {renderHighlightedText(para, chapterHighlights, eraseMode, deleteHighlight)}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Key Arguments & Significance */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md">
                      <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-900">
                        {isGu ? 'મુખ્ય દલીલો અને મહત્વ' : 'Key Arguments & Significance'}
                      </h2>
                      <ul className="mt-3 space-y-2.5">
                        {(isGu ? mains.keyArgumentsGu : mains.keyArgumentsEn).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-stone-800">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                            <span>{renderHighlightedText(item, chapterHighlights, eraseMode, deleteHighlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges & Concerns */}
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
                      <h2 className="text-sm font-medium uppercase tracking-wider text-rose-900">
                        {isGu ? 'પડકારો અને ચિંતાઓ' : 'Challenges & Concerns'}
                      </h2>
                      <ul className="mt-3 space-y-2.5">
                        {(isGu ? mains.challengesGu : mains.challengesEn).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-stone-800">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                            <span>{renderHighlightedText(item, chapterHighlights, eraseMode, deleteHighlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Way Forward */}
                    <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6">
                      <h2 className="text-sm font-medium uppercase tracking-wider text-sky-900">
                        {isGu ? 'આગળનો માર્ગ અને સુધારાઓ' : 'Way Forward & Reforms'}
                      </h2>
                      <ul className="mt-3 space-y-2.5">
                        {(isGu ? mains.wayForwardGu : mains.wayForwardEn).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-stone-800">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700" />
                            <span>{renderHighlightedText(item, chapterHighlights, eraseMode, deleteHighlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sample Mains Answer Framework + Full Model Answer */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 space-y-4">
                      <span className="inline-block rounded-full bg-amber-200 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-950">
                        {isGu ? 'મેઈન્સ જવાબ લેખન અને મોડેલ જવાબ' : 'Mains Answer Framework & Full Model Answer'}
                      </span>
                      <h3 className="text-sm font-semibold text-stone-900">{fw.question}</h3>
                      <div className="space-y-2 text-xs leading-relaxed text-stone-800">
                        <p>
                          <strong className="font-semibold text-emerald-900">{isGu ? 'પ્રસ્તાવના (Intro): ' : 'Introduction: '}</strong>
                          {renderHighlightedText(fw.intro, chapterHighlights, eraseMode, deleteHighlight)}
                        </p>
                        <div>
                          <strong className="font-semibold text-emerald-900">{isGu ? 'મુખ્ય ભાગ (Body):' : 'Body Points:'}</strong>
                          <ul className="mt-1 space-y-1.5 pl-4 list-disc">
                            {fw.bodyPoints.map((bp, i) => (
                              <li key={i}>{renderHighlightedText(bp, chapterHighlights, eraseMode, deleteHighlight)}</li>
                            ))}
                          </ul>
                        </div>
                        <p>
                          <strong className="font-semibold text-emerald-900">{isGu ? 'નિષ્કર્ષ (Conclusion): ' : 'Conclusion: '}</strong>
                          {renderHighlightedText(fw.conclusion, chapterHighlights, eraseMode, deleteHighlight)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-amber-200 bg-white p-4 space-y-2">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-emerald-900">
                          {isGu ? 'સંપૂર્ણ મોડેલ જવાબ (પરીક્ષામાં કેવી રીતે લખવું)' : 'Full Model Answer (Exam-Ready 250-Word Draft)'}
                        </h4>
                        <p className="whitespace-pre-line text-sm leading-7 text-stone-800">
                          {renderHighlightedText(fw.modelAnswer, chapterHighlights, eraseMode, deleteHighlight)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}

            {/* Prev / Next Navigation */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                disabled={activeIndex <= 0}
                onClick={() => {
                  setActiveChapterId(book.chapters[activeIndex - 1].id);
                  setActiveDiagramNodeId(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{isGu ? 'પાછલું પ્રકરણ' : 'Previous Chapter'}</span>
              </button>

              <button
                type="button"
                disabled={activeIndex >= book.chapters.length - 1}
                onClick={() => {
                  setActiveChapterId(book.chapters[activeIndex + 1].id);
                  setActiveDiagramNodeId(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-900 disabled:opacity-40"
              >
                <span>{isGu ? 'આગળનું પ્રકરણ' : 'Next Chapter'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Per-Book Notes Drawer (Independent of Highlighter) */}
        {showNotesPanel && (
          <aside className="flex max-h-96 w-full flex-col border-t border-stone-200 bg-white lg:max-h-none lg:w-96 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between border-b border-stone-200 p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-emerald-950">
                  {isGu ? 'મારી પુસ્તક નોંધો' : 'My Book Notes'}
                </h3>
                <p className="truncate text-[11px] font-medium text-emerald-800">
                  {isGu ? book.titleGu : book.titleEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNotesPanel(false)}
                className="rounded-lg p-1 text-stone-500 hover:bg-stone-100"
                aria-label="Close notes panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Write Note Form */}
            <form onSubmit={saveNote} className="space-y-2 border-b border-stone-200 bg-stone-50 p-4">
              <p className="truncate text-[11px] font-medium text-stone-600">
                {isGu ? activeChapter.titleGu : activeChapter.titleEn}
              </p>
              <textarea
                rows={3}
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder={isGu ? 'આ પ્રકરણ માટે તમારી નોંધ લખો...' : 'Write your personal note for this chapter...'}
                className="w-full rounded-xl border border-stone-300 bg-white p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draftNote.trim()}
                className="w-full rounded-xl bg-emerald-800 py-2 text-xs font-semibold text-white hover:bg-emerald-900 disabled:opacity-40"
              >
                {isGu ? 'નોંધ સાચવો' : 'Save Note'}
              </button>
            </form>

            {/* Saved Chapter Notes List */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {visibleNotes.length > 0 ? (
                visibleNotes.map((n) => (
                  <div key={n.id} className="rounded-xl border border-stone-200 bg-white p-3 text-xs shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-medium text-emerald-800">
                        {isGu ? n.chapterTitleGu : n.chapterTitleEn}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteNote(n.id)}
                        aria-label="Delete note"
                        className="text-stone-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-1.5 whitespace-pre-wrap leading-relaxed text-stone-800">{n.note}</p>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-xs text-stone-400">
                  {isGu ? 'આ પ્રકરણ માટે હજી કોઈ નોંધ નથી.' : 'No notes for this chapter yet.'}
                </p>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
