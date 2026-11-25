'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Language } from '@/types';
import type {
  BookBookmark,
  BookChapter,
  BookHighlight,
  BookPersonalNote,
  BookReadingProgress,
  DigitalBookResource,
  HighlightColor,
} from '@/types/books';
import { getChaptersForBook } from '@/data/bookChaptersData';
import {
  addHighlight,
  deletePersonalBookNote,
  loadBookReaderState,
  removeHighlight,
  savePersonalBookNote,
  saveReadingProgress,
  toggleBookmark,
  updateHighlightNote,
} from '@/lib/bookReaderStorage';
import {
  LocalBookPdfMeta,
  deleteLocalBookPdf,
  formatBytes,
  getLocalBookPdfBlobUrl,
  listLocalBookPdfs,
  saveLocalBookPdf,
} from '@/lib/localPdfLocker';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  ExternalLink,
  FileText,
  HardDrive,
  Highlighter,
  List,
  Maximize2,
  Minus,
  Moon,
  NotebookPen,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Sparkles,
  Sun,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

interface InteractiveBookReaderProps {
  resource: DigitalBookResource;
  language: Language;
  onClose: () => void;
  initialChapterId?: string;
  onProgressUpdated?: () => void;
}

type ReaderMode = 'interactive' | 'pdf';
type ReaderTheme = 'light' | 'sepia' | 'dark';
type DrawerTab = 'notes' | 'highlights' | 'bookmarks';

interface PendingSelection {
  sectionId: string;
  text: string;
}

const HIGHLIGHT_CLASSES: Record<HighlightColor, string> = {
  yellow: 'bg-amber-200/80 text-stone-950 rounded px-0.5 border-b-2 border-amber-400',
  emerald: 'bg-emerald-200/80 text-stone-950 rounded px-0.5 border-b-2 border-emerald-500',
  blue: 'bg-sky-200/80 text-stone-950 rounded px-0.5 border-b-2 border-sky-500',
  rose: 'bg-rose-200/80 text-stone-950 rounded px-0.5 border-b-2 border-rose-400',
};

const HIGHLIGHT_DOT_COLORS: Record<HighlightColor, { label: string; bg: string }> = {
  yellow: { label: 'Yellow', bg: 'bg-amber-300 border-amber-500' },
  emerald: { label: 'Green', bg: 'bg-emerald-300 border-emerald-600' },
  blue: { label: 'Blue', bg: 'bg-sky-300 border-sky-600' },
  rose: { label: 'Pink', bg: 'bg-rose-300 border-rose-500' },
};

export const InteractiveBookReader: React.FC<InteractiveBookReaderProps> = ({
  resource,
  language,
  onClose,
  initialChapterId,
  onProgressUpdated,
}) => {
  const chapters = useMemo(() => getChaptersForBook(resource.id), [resource.id]);
  const requestedChapterId = chapters.find((chapter) => chapter.id === initialChapterId)?.id;
  const volumeSpecs = useMemo(
    () =>
      resource.volumes && resource.volumes.length > 0
        ? resource.volumes
        : [
            {
              key: 'main',
              labelEn: resource.titleEn,
              labelGu: resource.titleGu,
              pagesCount: resource.totalPages || 0,
              chaptersCount: chapters.length,
              officialUrl: resource.sourceUrl,
            },
          ],
    [resource, chapters.length]
  );

  const [mode, setMode] = useState<ReaderMode>(chapters.length > 0 ? 'interactive' : 'pdf');
  const [activeChapterId, setActiveChapterId] = useState<string>(
    () => requestedChapterId || chapters[0]?.id || '',
  );
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState<number>(16);
  const [showChapterSidebar, setShowChapterSidebar] = useState<boolean>(true);
  const [showStudyDrawer, setShowStudyDrawer] = useState<boolean>(true);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('notes');

  // Browser-Local PDF Locker State (IndexedDB)
  const [localPdfs, setLocalPdfs] = useState<LocalBookPdfMeta[]>([]);
  const [selectedVolumeKey, setSelectedVolumeKey] = useState<string>(volumeSpecs[0].key);
  const [activeLocalBlobUrl, setActiveLocalBlobUrl] = useState<string | null>(null);
  const [preferDigestPdf, setPreferDigestPdf] = useState<boolean>(false);
  const [pdfLockerError, setPdfLockerError] = useState<string | null>(null);

  // Persisted Student State
  const [highlights, setHighlights] = useState<BookHighlight[]>([]);
  const [bookmarks, setBookmarks] = useState<BookBookmark[]>([]);
  const [notes, setNotes] = useState<BookPersonalNote[]>([]);
  const [progress, setProgress] = useState<BookReadingProgress | null>(null);
  const [storageMode, setStorageMode] = useState<'cloud' | 'local'>('local');

  // Selection & Note Composer State
  const [pendingSelection, setPendingSelection] = useState<PendingSelection | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteFeedback, setNoteFeedback] = useState<string | null>(null);
  const [editingHighlightNoteId, setEditingHighlightNoteId] = useState<string | null>(null);
  const [editingHighlightNoteText, setEditingHighlightNoteText] = useState('');

  // Load persisted highlights, bookmarks, notes, reading progress, and local PDFs
  useEffect(() => {
    let mounted = true;
    loadBookReaderState(resource.id).then((state) => {
      if (!mounted) return;
      setHighlights(state.highlights);
      setBookmarks(state.bookmarks);
      setNotes(state.notes);
      setProgress(state.progress);
      setStorageMode(state.storageMode);
      if (requestedChapterId) {
        setActiveChapterId(requestedChapterId);
      } else if (state.progress?.lastChapterId && chapters.some((c) => c.id === state.progress?.lastChapterId)) {
        setActiveChapterId(state.progress.lastChapterId);
      } else if (chapters[0]) {
        setActiveChapterId(chapters[0].id);
      }
    });

    listLocalBookPdfs(resource.id).then((items) => {
      if (mounted) setLocalPdfs(items);
    });

    return () => {
      mounted = false;
    };
  }, [resource.id, chapters, requestedChapterId]);

  // Resolve blob URL for selected volume in IndexedDB cleanly (and revoke on cleanup)
  useEffect(() => {
    let mounted = true;
    let createdUrl: string | null = null;

    if (preferDigestPdf) {
      setActiveLocalBlobUrl(null);
      return;
    }

    getLocalBookPdfBlobUrl(resource.id, selectedVolumeKey).then((url) => {
      if (!mounted) {
        if (url && typeof URL !== 'undefined') URL.revokeObjectURL(url);
        return;
      }
      createdUrl = url;
      setActiveLocalBlobUrl(url);
    });

    return () => {
      mounted = false;
      if (createdUrl && typeof URL !== 'undefined') {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [resource.id, selectedVolumeKey, localPdfs, preferDigestPdf]);

  const handleLoadLocalPdfFile = async (
    volumeKey: string,
    volumeLabel: string,
    file?: File
  ) => {
    if (!file) return;
    setPdfLockerError(null);
    try {
      await saveLocalBookPdf(resource.id, volumeKey, volumeLabel, file);
      const updatedList = await listLocalBookPdfs(resource.id);
      setLocalPdfs(updatedList);
      setSelectedVolumeKey(volumeKey);
      setPreferDigestPdf(false);
      setMode('pdf');
    } catch (err) {
      setPdfLockerError(err instanceof Error ? err.message : 'Failed to save PDF.');
    }
  };

  const handleRemoveLocalPdf = async (volumeKey: string) => {
    await deleteLocalBookPdf(resource.id, volumeKey);
    const updatedList = await listLocalBookPdfs(resource.id);
    setLocalPdfs(updatedList);
  };

  // Keyboard Escape handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const activeChapter: BookChapter | undefined = useMemo(
    () => chapters.find((c) => c.id === activeChapterId) || chapters[0],
    [chapters, activeChapterId]
  );

  const activeChapterIndex = useMemo(
    () => chapters.findIndex((c) => c.id === activeChapter?.id),
    [chapters, activeChapter]
  );

  // Group chapters by Part (e.g., Part I, Part II, Part III)
  const groupedChapters = useMemo(() => {
    const groups: Array<{ partLabel: string; items: BookChapter[] }> = [];
    chapters.forEach((ch) => {
      const label =
        (language === 'gu' ? ch.partLabelGu : ch.partLabelEn) ||
        (language === 'gu' ? 'અધ્યાયો' : 'Chapters');
      const existing = groups.find((g) => g.partLabel === label);
      if (existing) {
        existing.items.push(ch);
      } else {
        groups.push({ partLabel: label, items: [ch] });
      }
    });
    return groups;
  }, [chapters, language]);

  // Select chapter and persist lastChapterId
  const handleSelectChapter = useCallback(
    async (chapterId: string) => {
      setActiveChapterId(chapterId);
      setPendingSelection(null);
      const completed = progress?.completedChapterIds || [];
      const updated = await saveReadingProgress(resource.id, chapterId, completed, chapters.length);
      setProgress(updated);
      onProgressUpdated?.();
    },
    [resource.id, progress, chapters.length, onProgressUpdated]
  );

  // Toggle chapter completion
  const handleToggleChapterComplete = async () => {
    if (!activeChapter) return;
    const currentCompleted = progress?.completedChapterIds || [];
    const exists = currentCompleted.includes(activeChapter.id);
    const nextCompleted = exists
      ? currentCompleted.filter((id) => id !== activeChapter.id)
      : [...currentCompleted, activeChapter.id];
    const updated = await saveReadingProgress(
      resource.id,
      activeChapter.id,
      nextCompleted,
      chapters.length
    );
    setProgress(updated);
    onProgressUpdated?.();
  };

  // Toggle chapter bookmark
  const isChapterBookmarked = Boolean(
    activeChapter && bookmarks.some((b) => b.chapterId === activeChapter.id)
  );

  const handleToggleBookmark = async () => {
    if (!activeChapter) return;
    const label = language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn;
    const res = await toggleBookmark(resource.id, activeChapter.id, label);
    if (res.added && res.bookmark) {
      setBookmarks((prev) => [res.bookmark!, ...prev.filter((b) => b.chapterId !== activeChapter.id)]);
    } else {
      setBookmarks((prev) => prev.filter((b) => b.chapterId !== activeChapter.id));
    }
    onProgressUpdated?.();
  };

  // Capture selected text on mouseup inside a section
  const handleSectionMouseUp = (sectionId: string) => {
    const sel = window.getSelection();
    const selected = sel?.toString().trim() || '';
    if (selected.length >= 4 && selected.length <= 800) {
      setPendingSelection({ sectionId, text: selected });
    }
  };

  const handleApplyHighlight = async (color: HighlightColor, openNoteComposer = false) => {
    if (!pendingSelection || !activeChapter) return;
    const created = await addHighlight({
      bookId: resource.id,
      chapterId: activeChapter.id,
      sectionId: pendingSelection.sectionId,
      selectedText: pendingSelection.text,
      color,
    });
    setHighlights((prev) => [created, ...prev]);

    if (openNoteComposer) {
      setShowStudyDrawer(true);
      setDrawerTab('notes');
      setNoteTitle(
        `${language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn}`.slice(0, 60)
      );
      setNoteContent((prev) =>
        prev ? `${prev}\n\n> "${pendingSelection.text}"\n` : `> "${pendingSelection.text}"\n\n`
      );
    }

    setPendingSelection(null);
    window.getSelection()?.removeAllRanges();
    onProgressUpdated?.();
  };

  const handleDeleteHighlight = async (id: string) => {
    await removeHighlight(id);
    setHighlights((prev) => prev.filter((h) => h.id !== id));
    onProgressUpdated?.();
  };

  const handleSaveHighlightNote = async (id: string) => {
    await updateHighlightNote(id, editingHighlightNoteText.trim());
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, note: editingHighlightNoteText.trim() } : h))
    );
    setEditingHighlightNoteId(null);
    setEditingHighlightNoteText('');
  };

  const handleSavePersonalNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChapter || !noteContent.trim()) return;
    const saved = await savePersonalBookNote({
      bookId: resource.id,
      bookTitle: language === 'gu' ? resource.titleGu : resource.titleEn,
      subject: resource.subject ?? 'all',
      chapterId: activeChapter.id,
      chapterTitle: language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn,
      title:
        noteTitle.trim() ||
        (language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn),
      content: noteContent.trim(),
    });
    setNotes((prev) => [saved, ...prev]);
    setNoteTitle('');
    setNoteContent('');
    setNoteFeedback(
      saved.syncedToCloud
        ? language === 'gu'
          ? 'નોંધ PostgreSQL ક્લાઉડમાં સાચવાઈ!'
          : 'Note synced to PostgreSQL & My Notes!'
        : language === 'gu'
        ? 'નોંધ સ્થાનિક રીતે સાચવાઈ!'
        : 'Note saved locally!'
    );
    setTimeout(() => setNoteFeedback(null), 3000);
    onProgressUpdated?.();
  };

  const handleDeleteNote = (id: string) => {
    deletePersonalBookNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    onProgressUpdated?.();
  };

  // Render text with inline highlights
  const renderHighlightedBody = (text: string, sectionId: string) => {
    if (!activeChapter) return text;
    const sectionHighlights = highlights.filter(
      (h) => h.chapterId === activeChapter.id && h.sectionId === sectionId
    );
    if (sectionHighlights.length === 0) return text;

    // Match the first non-overlapping occurrence of each highlight
    type Segment = { text: string; highlight?: BookHighlight };
    let segments: Segment[] = [{ text }];

    for (const hl of sectionHighlights) {
      const nextSegments: Segment[] = [];
      let matched = false;
      for (const seg of segments) {
        if (seg.highlight || matched) {
          nextSegments.push(seg);
          continue;
        }
        const idx = seg.text.indexOf(hl.selectedText);
        if (idx === -1) {
          nextSegments.push(seg);
          continue;
        }
        matched = true;
        if (idx > 0) nextSegments.push({ text: seg.text.slice(0, idx) });
        nextSegments.push({ text: hl.selectedText, highlight: hl });
        const after = seg.text.slice(idx + hl.selectedText.length);
        if (after) nextSegments.push({ text: after });
      }
      segments = nextSegments;
    }

    return segments.map((seg, idx) =>
      seg.highlight ? (
        <mark
          key={`${seg.highlight.id}-${idx}`}
          className={`${HIGHLIGHT_CLASSES[seg.highlight.color]} cursor-pointer transition-opacity hover:opacity-85`}
          title={seg.highlight.note || (language === 'gu' ? 'હાઇલાઇટ કરેલ લખાણ' : 'Highlighted text — click to inspect')}
          onClick={() => {
            setShowStudyDrawer(true);
            setDrawerTab('highlights');
          }}
        >
          {seg.text}
        </mark>
      ) : (
        <React.Fragment key={idx}>{seg.text}</React.Fragment>
      )
    );
  };

  const themeClasses = {
    light: 'bg-white text-stone-900',
    sepia: 'bg-[#fbf5e6] text-[#3a2f1f]',
    dark: 'bg-stone-950 text-stone-100',
  }[theme];

  const completedIds = progress?.completedChapterIds || [];
  const progressPercent =
    chapters.length > 0
      ? Math.min(100, Math.round((completedIds.length / chapters.length) * 100))
      : 0;
  const isCurrentCompleted = Boolean(activeChapter && completedIds.includes(activeChapter.id));

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* 1. Top Toolbar */}
      <header className="bg-stone-900 text-white px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setShowChapterSidebar((v) => !v)}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            title={language === 'gu' ? 'પ્રકરણ સૂચિ' : 'Toggle Chapters'}
          >
            <List className="w-4 h-4 text-emerald-400" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold truncate max-w-[260px] sm:max-w-md">
                {language === 'gu' ? resource.titleGu : resource.titleEn}
              </h2>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-900/70 border border-emerald-700/60 text-[10px] font-bold text-emerald-300 shrink-0">
                {storageMode === 'cloud' ? (
                  <>
                    <Cloud className="w-3 h-3" /> PostgreSQL Sync
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3 h-3" /> Local Reader Sync
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
              <span>{resource.category?.replace('_', ' ') ?? 'Study notes'}</span>
              <span>·</span>
              <span>
                {completedIds.length}/{chapters.length}{' '}
                {language === 'gu' ? 'પ્રકરણ પૂર્ણ' : 'Chapters Done'} ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Center Mode Switcher: Interactive Reader vs 100%-Page PDF Locker */}
        <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700">
          <button
            onClick={() => setMode('interactive')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              mode === 'interactive'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'ચેપ્ટર રીડર' : 'Chapter Reader'}</span>
          </button>
          <button
            onClick={() => setMode('pdf')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              mode === 'pdf'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>
              {language === 'gu'
                ? `PDF લોકર (${localPdfs.length}/${volumeSpecs.length})`
                : `Full PDF Locker (${localPdfs.length}/${volumeSpecs.length})`}
            </span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {mode === 'interactive' && (
            <>
              {/* Font Controls */}
              <div className="hidden lg:flex items-center bg-stone-800 rounded-xl px-1.5 py-1 gap-1 border border-stone-700">
                <button
                  onClick={() => setFontSize((s) => Math.max(13, s - 1))}
                  className="p-1 text-stone-300 hover:text-white"
                  title="Decrease Font Size"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1">{fontSize}px</span>
                <button
                  onClick={() => setFontSize((s) => Math.min(22, s + 1))}
                  className="p-1 text-stone-300 hover:text-white"
                  title="Increase Font Size"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme Switcher */}
              <div className="hidden sm:flex items-center bg-stone-800 rounded-xl p-1 gap-0.5 border border-stone-700">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-1.5 rounded-lg ${theme === 'light' ? 'bg-white text-stone-900' : 'text-stone-400 hover:text-white'}`}
                  title="Light Paper"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`p-1.5 rounded-lg ${theme === 'sepia' ? 'bg-amber-100 text-amber-950' : 'text-stone-400 hover:text-white'}`}
                  title="Warm Sepia"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'}`}
                  title="Night Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {/* Bookmark Toggle (available in both Interactive & PDF modes) */}
          <button
            onClick={handleToggleBookmark}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
              isChapterBookmarked
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
            }`}
            title={language === 'gu' ? 'બુકમાર્ક કરો' : 'Bookmark Chapter'}
          >
            {isChapterBookmarked ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span className="hidden md:inline">
              {isChapterBookmarked
                ? language === 'gu'
                  ? 'બુકમાર્ક કરેલ'
                  : 'Bookmarked'
                : language === 'gu'
                ? 'બુકમાર્ક'
                : 'Bookmark'}
            </span>
          </button>

          {/* Toggle Study Drawer (available in both modes) */}
          <button
            onClick={() => setShowStudyDrawer((v) => !v)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
              showStudyDrawer
                ? 'bg-emerald-700 border-emerald-600 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
            }`}
            title="Notes & Highlights"
          >
            {showStudyDrawer ? (
              <PanelRightClose className="w-3.5 h-3.5" />
            ) : (
              <PanelRightOpen className="w-3.5 h-3.5" />
            )}
            <span className="hidden md:inline">
              {language === 'gu' ? 'નોટ્સ & બુકમાર્ક્સ' : 'Notes Drawer'}
            </span>
          </button>

          {mode === 'pdf' && (activeLocalBlobUrl || resource.hostedPdfUrl) && (
            <>
              <a
                href={activeLocalBlobUrl || resource.hostedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-white flex items-center gap-1.5 border border-stone-700"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{language === 'gu' ? 'નવી ટેબ' : 'Full Tab'}</span>
              </a>
              {!activeLocalBlobUrl && resource.hostedPdfUrl && (
                <a
                  href={resource.hostedPdfUrl}
                  download
                  className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 flex items-center gap-1.5 border border-stone-700"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">PDF</span>
                </a>
              )}
            </>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Reader (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Progress Strip */}
      <div className="h-1 w-full bg-stone-800 shrink-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 2. Main Three-Column Workspace */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* LEFT SIDEBAR: Chapter Selection OR PDF Volumes Locker */}
        {showChapterSidebar && (
          <aside className="w-72 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col shrink-0 overflow-y-auto">
            {mode === 'interactive' ? (
              <>
                <div className="p-4 border-b border-stone-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {language === 'gu' ? 'પ્રકરણ પસંદગી' : 'Chapter Selection'}
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>
                      {language === 'gu' ? 'વાંચન પ્રગતિ' : 'Reading Progress'}
                    </span>
                    <span className="font-bold text-white">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 space-y-5 flex-1">
                  {groupedChapters.map((group) => (
                    <div key={group.partLabel} className="space-y-1.5">
                      <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                        {group.partLabel}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((ch) => {
                          const isActive = activeChapter?.id === ch.id;
                          const isDone = completedIds.includes(ch.id);
                          const isBm = bookmarks.some((b) => b.chapterId === ch.id);
                          return (
                            <button
                              key={ch.id}
                              onClick={() => handleSelectChapter(ch.id)}
                              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                                isActive
                                  ? 'bg-emerald-700/25 border-emerald-500/60 text-white'
                                  : 'bg-stone-900/60 border-transparent hover:bg-stone-800 text-stone-300'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <span className="w-4 h-4 rounded-full border border-stone-600 inline-flex items-center justify-center text-[9px] font-bold">
                                    {ch.chapterNumber}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold leading-snug line-clamp-2">
                                  {language === 'gu' ? ch.titleGu : ch.titleEn}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                                  <span>{ch.readingTimeMinutes} min</span>
                                  {isBm && <BookmarkCheck className="w-3 h-3 text-amber-400" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* PDF LOCKER VOLUMES SIDEBAR */
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {language === 'gu'
                      ? 'પ્રાઇવેટ બ્રાઉઝર PDF લોકર'
                      : 'Private Browser PDF Locker'}
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {language === 'gu'
                      ? 'સત્તાવાર NCERT / GSSTB વેબસાઇટ પરથી મફત PDF ડાઉનલોડ કરી એકવાર અહીં લોડ કરો — બધા ૧૦૦% પાના તમારા બ્રાઉઝરમાં જ સુરક્ષિત રહેશે.'
                      : 'Load your personally downloaded official textbook PDF once. Saved privately in your browser (IndexedDB) for instant 100%-page reading inside Sankalp.'}
                  </p>
                </div>

                {pdfLockerError && (
                  <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-[11px] text-rose-200">
                    {pdfLockerError}
                  </div>
                )}

                <div className="space-y-3">
                  {volumeSpecs.map((vol) => {
                    const savedMeta = localPdfs.find((p) => p.volumeKey === vol.key);
                    const isSelected = !preferDigestPdf && selectedVolumeKey === vol.key;
                    const volLabel = language === 'gu' ? vol.labelGu : vol.labelEn;

                    return (
                      <div
                        key={vol.key}
                        className={`p-3 rounded-2xl border space-y-2.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-950/50 border-emerald-500/70'
                            : 'bg-stone-800/50 border-stone-800'
                        }`}
                      >
                        <button
                          onClick={() => {
                            setSelectedVolumeKey(vol.key);
                            setPreferDigestPdf(false);
                          }}
                          className="w-full text-left space-y-1"
                        >
                          <div className="text-xs font-bold text-white leading-snug">
                            {volLabel}
                          </div>
                          <div className="text-[10px] text-stone-400 flex items-center gap-2">
                            {vol.pagesCount > 0 && <span>{vol.pagesCount} pages</span>}
                            {vol.chaptersCount > 0 && (
                              <>
                                <span>·</span>
                                <span>{vol.chaptersCount} chapters</span>
                              </>
                            )}
                          </div>
                        </button>

                        {savedMeta ? (
                          <div className="space-y-2 pt-1">
                            <div className="flex items-center justify-between text-[10px] text-emerald-300 bg-emerald-900/40 px-2 py-1 rounded-lg border border-emerald-700/40">
                              <span className="truncate font-semibold">
                                ✓ {savedMeta.fileName} ({formatBytes(savedMeta.fileSizeBytes)})
                              </span>
                              <button
                                onClick={() => handleRemoveLocalPdf(vol.key)}
                                className="text-stone-400 hover:text-rose-400 ml-1 shrink-0"
                                title="Remove from browser locker"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 pt-1">
                            <a
                              href={vol.officialUrl || resource.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-1.5 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-950 border border-stone-700 text-[11px] font-semibold text-stone-200 flex items-center justify-center gap-1.5"
                            >
                              <ExternalLink className="w-3 h-3 text-emerald-400" />
                              <span>
                                {language === 'gu' ? '૧. સત્તાવાર PDF મેળવો' : '1. Get Official PDF'}
                              </span>
                            </a>

                            <label className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-[11px] font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>
                                {language === 'gu'
                                  ? '૨. બ્રાઉઝરમાં લોડ કરો'
                                  : '2. Load Official PDF'}
                              </span>
                              <input
                                type="file"
                                accept="application/pdf,.pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  handleLoadLocalPdfFile(vol.key, volLabel, f);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {localPdfs.some((p) => p.volumeKey.startsWith('chapter::')) && (
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {language === 'gu' ? 'લોડ કરેલા પ્રકરણ PDF' : 'Loaded Chapter PDFs'}
                    </div>
                    <div className="space-y-1.5">
                      {localPdfs
                        .filter((p) => p.volumeKey.startsWith('chapter::'))
                        .map((item) => {
                          const isSel = !preferDigestPdf && selectedVolumeKey === item.volumeKey;
                          return (
                            <div
                              key={item.key}
                              className={`p-2 rounded-xl border flex items-center justify-between gap-2 text-[11px] ${
                                isSel
                                  ? 'bg-emerald-950/60 border-emerald-500/70 text-white'
                                  : 'bg-stone-800/40 border-stone-800 text-stone-300'
                              }`}
                            >
                              <button
                                onClick={() => {
                                  setSelectedVolumeKey(item.volumeKey);
                                  setPreferDigestPdf(false);
                                }}
                                className="text-left truncate flex-1 font-semibold hover:text-emerald-300"
                              >
                                {item.volumeLabel}
                              </button>
                              <button
                                onClick={() => handleRemoveLocalPdf(item.volumeKey)}
                                className="text-stone-400 hover:text-rose-400 shrink-0"
                                title="Remove chapter PDF"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {resource.hostedPdfUrl && (
                  <button
                    onClick={() => setPreferDigestPdf(true)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                      preferDigestPdf || !activeLocalBlobUrl
                        ? 'bg-stone-800 border-emerald-600/50 text-emerald-300'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {language === 'gu'
                        ? 'સંકલ્પ સ્ટડી ડાયજેસ્ટ PDF જુઓ'
                        : 'View Sankalp Study Digest PDF'}
                    </span>
                  </button>
                )}
              </div>
            )}
          </aside>
        )}

        {/* CENTER READING CANVAS */}
        <main className={`flex-1 min-w-0 overflow-y-auto ${mode === 'pdf' ? 'bg-stone-950 flex flex-col' : themeClasses}`}>
          {mode === 'pdf' ? (
            <div className="flex-1 min-h-0 h-full flex flex-col relative">
              {!activeLocalBlobUrl && (
                <div className="bg-stone-900 border-b border-stone-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">
                      {language === 'gu'
                        ? 'અત્યારે સંકલ્પ સ્ટડી ડાયજેસ્ટ દેખાય છે. બધા ૧૦૦% પાના વાંચવા માટે ડાબી બાજુથી સત્તાવાર PDF લોડ કરો.'
                        : 'Viewing Sankalp Study Digest PDF. Load your official downloaded PDF on the left to read all 100% pages inside Sankalp.'}
                    </span>
                  </div>
                  <label className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === 'gu' ? 'PDF લોડ કરો' : 'Load PDF Now'}</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const vol =
                          volumeSpecs.find((v) => v.key === selectedVolumeKey) || volumeSpecs[0];
                        handleLoadLocalPdfFile(
                          vol.key,
                          language === 'gu' ? vol.labelGu : vol.labelEn,
                          e.target.files?.[0]
                        );
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              )}

              {(activeLocalBlobUrl || resource.hostedPdfUrl) ? (
                <object
                  key={activeLocalBlobUrl || resource.hostedPdfUrl}
                  data={`${activeLocalBlobUrl || resource.hostedPdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  type="application/pdf"
                  className="w-full flex-1 min-h-0 border-none"
                >
                  <iframe
                    src={activeLocalBlobUrl || resource.hostedPdfUrl}
                    className="w-full flex-1 min-h-0 border-none"
                    title={resource.titleEn}
                  />
                </object>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-4">
                  <FileText className="w-12 h-12 text-emerald-500/50" />
                  <p className="text-sm font-bold text-white">
                    {language === 'gu'
                      ? 'ડાબી બાજુથી સત્તાવાર PDF લોડ કરો'
                      : 'Select a volume on the left to load your official PDF'}
                  </p>
                </div>
              )}
            </div>
          ) : activeChapter ? (
            <article className="max-w-3xl mx-auto px-5 sm:px-10 py-8 sm:py-10 space-y-8">
              {/* Chapter Header */}
              <header className="space-y-3 pb-6 border-b border-stone-200/60">
                {(activeChapter.partLabelEn || activeChapter.partLabelGu) && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 text-xs font-extrabold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {language === 'gu'
                        ? activeChapter.partLabelGu
                        : activeChapter.partLabelEn}
                    </span>
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs opacity-70">
                  <span>{activeChapter.readingTimeMinutes} min read</span>
                  <span>·</span>
                  <span>
                    {language === 'gu' ? 'અચકાસાયેલ અધિકાર લેબલ: ' : 'Unverified rights label: '}
                    {resource.licenseType || (language === 'gu' ? 'ઉપલબ્ધ નથી' : 'Not provided')}
                  </span>
                  <span>·</span>
                  <span className="italic">
                    {language === 'gu'
                      ? 'કોઈપણ લખાણ સિલેક્ટ કરીને હાઇલાઇટ અથવા નોટ બનાવો'
                      : 'Select any text below to Highlight or add a Personal Note'}
                  </span>
                </div>

                {/* Official Chapter PDF Bar */}
                {activeChapter.officialChapterPdfUrl && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <a
                      href={activeChapter.officialChapterPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>
                        {language === 'gu'
                          ? 'સત્તાવાર પ્રકરણ PDF ખોલો (મફત)'
                          : 'Open Official Chapter PDF'}
                      </span>
                    </a>

                    {localPdfs.some((p) => p.volumeKey === `chapter::${activeChapter.id}`) ? (
                      <button
                        onClick={() => {
                          setSelectedVolumeKey(`chapter::${activeChapter.id}`);
                          setPreferDigestPdf(false);
                          setMode('pdf');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 border border-emerald-600/40"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          {language === 'gu'
                            ? 'લોડ કરેલ પ્રકરણ PDF વાંચો ✓'
                            : 'Read Loaded Chapter PDF ✓'}
                        </span>
                      </button>
                    ) : (
                      <label className="px-3 py-1.5 rounded-xl bg-stone-500/15 hover:bg-stone-500/25 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer border border-stone-400/30 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {language === 'gu'
                            ? 'આ પ્રકરણ PDF અહીં લોડ કરો'
                            : 'Load This Chapter PDF in Reader'}
                        </span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            handleLoadLocalPdfFile(
                              `chapter::${activeChapter.id}`,
                              language === 'gu' ? activeChapter.titleGu : activeChapter.titleEn,
                              e.target.files?.[0]
                            );
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )}
                  </div>
                )}
              </header>

              {/* Floating Selection Highlight Toolbar */}
              {pendingSelection && (
                <div className="sticky top-3 z-20 p-3 rounded-2xl bg-stone-900 text-white shadow-2xl border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 min-w-0">
                    <Highlighter className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="text-xs truncate max-w-xs italic text-stone-300">
                      &ldquo;{pendingSelection.text}&rdquo;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(Object.keys(HIGHLIGHT_DOT_COLORS) as HighlightColor[]).map((color) => (
                      <button
                        key={color}
                        onClick={() => handleApplyHighlight(color, false)}
                        className={`w-6 h-6 rounded-full border-2 ${HIGHLIGHT_DOT_COLORS[color].bg} hover:scale-110 transition-transform`}
                        title={`Highlight ${HIGHLIGHT_DOT_COLORS[color].label}`}
                      />
                    ))}
                    <button
                      onClick={() => handleApplyHighlight('yellow', true)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <NotebookPen className="w-3.5 h-3.5" />
                      <span>{language === 'gu' ? 'હાઇલાઇટ + નોટ' : 'Highlight & Note'}</span>
                    </button>
                    <button
                      onClick={() => setPendingSelection(null)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Chapter Sections */}
              <div className="space-y-8">
                {activeChapter.sections.map((section) => {
                  const bodyText = language === 'gu' ? section.bodyGu : section.bodyEn;
                  return (
                    <section
                      key={section.id}
                      onMouseUp={() => handleSectionMouseUp(section.id)}
                      onTouchEnd={() => handleSectionMouseUp(section.id)}
                      className="space-y-3 group"
                    >
                      <h2 className="text-lg sm:text-xl font-extrabold text-emerald-700">
                        {language === 'gu' ? section.headingGu : section.headingEn}
                      </h2>

                      <p
                        className="leading-relaxed selection:bg-amber-200 selection:text-stone-950"
                        style={{ fontSize: `${fontSize}px`, lineHeight: 1.75 }}
                      >
                        {renderHighlightedBody(bodyText, section.id)}
                      </p>

                      {section.keyTerms && section.keyTerms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {section.keyTerms.map((term) => (
                            <span
                              key={term}
                              className="px-2.5 py-0.5 rounded-lg bg-emerald-600/10 text-emerald-700 text-[11px] font-bold"
                            >
                              #{term}
                            </span>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              {/* Exam Takeaways Summary Box */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  theme === 'dark'
                    ? 'bg-stone-900 border-stone-800'
                    : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {language === 'gu'
                      ? 'GPSC પરીક્ષા માટે મુખ્ય તારણો'
                      : 'High-Yield GPSC Exam Takeaways'}
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {(language === 'gu'
                    ? activeChapter.summaryPointsGu
                    : activeChapter.summaryPointsEn
                  ).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chapter Completion & Prev/Next Controls */}
              <div className="pt-6 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (activeChapterIndex > 0) {
                      handleSelectChapter(chapters[activeChapterIndex - 1].id);
                    }
                  }}
                  disabled={activeChapterIndex <= 0}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'gu' ? 'અગાઉનું પ્રકરણ' : 'Previous'}</span>
                </button>

                <button
                  onClick={handleToggleChapterComplete}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                    isCurrentCompleted
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 text-white hover:bg-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isCurrentCompleted
                      ? language === 'gu'
                        ? 'પ્રકરણ પૂર્ણ થયું ✓'
                        : 'Chapter Completed ✓'
                      : language === 'gu'
                      ? 'પૂર્ણ તરીકે ચિહ્નિત કરો'
                      : 'Mark Chapter Complete'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (activeChapterIndex < chapters.length - 1) {
                      handleSelectChapter(chapters[activeChapterIndex + 1].id);
                    }
                  }}
                  disabled={activeChapterIndex >= chapters.length - 1}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  <span>{language === 'gu' ? 'આગળનું પ્રકરણ' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Source Attribution Footer */}
              <footer className="p-4 rounded-xl bg-stone-500/10 text-xs space-y-1.5 opacity-85">
                <div className="font-bold">
                  {language === 'gu' ? 'અચકાસાયેલ અધિકાર લેબલ:' : 'Unverified rights label:'}{' '}
                  {resource.licenseType || (language === 'gu' ? 'ઉપલબ્ધ નથી' : 'Not provided')}
                </div>
                <div>{activeChapter.sourceAttribution}</div>
                {resource.sourceUrl && <div className="flex items-center gap-4 pt-1">
                  <a
                    href={resource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{language === 'gu' ? 'સત્તાવાર સ્ત્રોત ખોલો' : 'Verify Official Portal'}</span>
                  </a>
                </div>}
              </footer>
            </article>
          ) : null}
        </main>

        {/* RIGHT DRAWER: Personal Notes, Highlights & Bookmarks */}
        {showStudyDrawer && (
          <aside className="w-80 sm:w-96 bg-stone-900 text-stone-100 border-l border-stone-800 flex flex-col shrink-0">
            {/* Drawer Tabs */}
            <div className="grid grid-cols-3 border-b border-stone-800 p-1.5 gap-1 bg-stone-950">
              <button
                onClick={() => setDrawerTab('notes')}
                className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${
                  drawerTab === 'notes'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <NotebookPen className="w-3.5 h-3.5" />
                <span>
                  {language === 'gu' ? 'નોટ્સ' : 'Notes'} ({notes.length})
                </span>
              </button>
              <button
                onClick={() => setDrawerTab('highlights')}
                className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${
                  drawerTab === 'highlights'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5" />
                <span>
                  {language === 'gu' ? 'હાઇલાઇટ્સ' : 'Highlights'} ({highlights.length})
                </span>
              </button>
              <button
                onClick={() => setDrawerTab('bookmarks')}
                className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors ${
                  drawerTab === 'bookmarks'
                    ? 'bg-emerald-700 text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {language === 'gu' ? 'બુકમાર્ક્સ' : 'Bookmarks'} ({bookmarks.length})
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* TAB 1: PERSONAL NOTES */}
              {drawerTab === 'notes' && (
                <>
                  <form onSubmit={handleSavePersonalNote} className="space-y-2.5 p-3 rounded-2xl bg-stone-800/70 border border-stone-700">
                    <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                      <span>{language === 'gu' ? 'નવી વ્યક્તિગત નોંધ' : 'Add Personal Study Note'}</span>
                      <span className="text-[10px] text-stone-400">
                        Ch {activeChapter?.chapterNumber || 1}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder={language === 'gu' ? 'નોંધનું શીર્ષક...' : 'Note heading (optional)'}
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <textarea
                      rows={4}
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder={
                        language === 'gu'
                          ? 'તમારા મુખ્ય મુદ્દાઓ અથવા સારાંશ લખો...'
                          : 'Write revision points, quotes, or Mains pointers...'
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-emerald-500 resize-y"
                    />
                    <button
                      type="submit"
                      disabled={!noteContent.trim()}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                    >
                      {language === 'gu' ? 'નોંધ સાચવો' : 'Save Personal Note'}
                    </button>
                    {noteFeedback && (
                      <div className="text-[11px] text-emerald-300 font-semibold text-center">
                        {noteFeedback}
                      </div>
                    )}
                  </form>

                  <div className="space-y-2.5">
                    {notes.length === 0 ? (
                      <div className="text-center py-8 text-xs text-stone-500">
                        {language === 'gu'
                          ? 'હજી સુધી કોઈ નોંધ નથી. વાંચતા સમયે અહીં નોંધ ઉમેરો.'
                          : 'No study notes yet for this book. Add your first note above!'}
                      </div>
                    ) : (
                      notes.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 rounded-2xl bg-stone-800/50 border border-stone-800 space-y-1.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-white leading-snug">{n.title}</h4>
                            <button
                              onClick={() => handleDeleteNote(n.id)}
                              className="text-stone-500 hover:text-rose-400 shrink-0"
                              title="Delete note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] text-emerald-400">{n.chapterTitle}</div>
                          <p className="text-xs text-stone-300 whitespace-pre-wrap leading-relaxed">
                            {n.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {/* TAB 2: HIGHLIGHTS */}
              {drawerTab === 'highlights' && (
                <div className="space-y-3">
                  {highlights.length === 0 ? (
                    <div className="text-center py-10 text-xs text-stone-500 space-y-2">
                      <Highlighter className="w-8 h-8 mx-auto opacity-40" />
                      <p>
                        {language === 'gu'
                          ? 'લખાણ પસંદ કરો (Select text) અને રંગ પસંદ કરીને હાઇલાઇટ કરો.'
                          : 'Select any sentence in the reader to highlight key passages.'}
                      </p>
                    </div>
                  ) : (
                    highlights.map((hl) => (
                      <div
                        key={hl.id}
                        className="p-3 rounded-2xl bg-stone-800/60 border border-stone-700/80 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleSelectChapter(hl.chapterId)}
                            className="text-[10px] font-bold text-emerald-400 hover:underline"
                          >
                            {chapters.find((c) => c.id === hl.chapterId)?.titleEn.slice(0, 34) ||
                              'Jump to chapter'}
                          </button>
                          <button
                            onClick={() => handleDeleteHighlight(hl.id)}
                            className="text-stone-500 hover:text-rose-400"
                            title="Remove highlight"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <blockquote
                          className={`text-xs p-2 rounded-lg text-stone-950 font-medium ${
                            hl.color === 'yellow'
                              ? 'bg-amber-200'
                              : hl.color === 'emerald'
                              ? 'bg-emerald-200'
                              : hl.color === 'blue'
                              ? 'bg-sky-200'
                              : 'bg-rose-200'
                          }`}
                        >
                          &ldquo;{hl.selectedText}&rdquo;
                        </blockquote>

                        {editingHighlightNoteId === hl.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={editingHighlightNoteText}
                              onChange={(e) => setEditingHighlightNoteText(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-white"
                              placeholder="Add annotation..."
                            />
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleSaveHighlightNote(hl.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingHighlightNoteId(null)}
                                className="px-2.5 py-1 rounded-lg bg-stone-700 text-stone-200 text-[11px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 text-[11px] text-stone-400">
                            <span>{hl.note || 'No annotation yet'}</span>
                            <button
                              onClick={() => {
                                setEditingHighlightNoteId(hl.id);
                                setEditingHighlightNoteText(hl.note || '');
                              }}
                              className="text-emerald-400 hover:underline shrink-0"
                            >
                              {hl.note ? 'Edit note' : '+ Add note'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: BOOKMARKS */}
              {drawerTab === 'bookmarks' && (
                <div className="space-y-2.5">
                  {bookmarks.length === 0 ? (
                    <div className="text-center py-10 text-xs text-stone-500 space-y-2">
                      <Bookmark className="w-8 h-8 mx-auto opacity-40" />
                      <p>
                        {language === 'gu'
                          ? 'મહત્વના પ્રકરણોને ઝડપી પુનરાવર્તન માટે બુકમાર્ક કરો.'
                          : 'Click Bookmark in the top bar to save chapters for quick revision.'}
                      </p>
                    </div>
                  ) : (
                    bookmarks.map((bm) => (
                      <div
                        key={bm.id}
                        className="p-3 rounded-2xl bg-stone-800/60 border border-stone-700 flex items-center justify-between gap-2"
                      >
                        <button
                          onClick={() => handleSelectChapter(bm.chapterId)}
                          className="text-left flex items-center gap-2 min-w-0 flex-1 hover:text-emerald-400 transition-colors"
                        >
                          <BookmarkCheck className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-xs font-bold truncate">{bm.label}</span>
                        </button>
                        <button
                          onClick={async () => {
                            await toggleBookmark(resource.id, bm.chapterId, bm.label);
                            setBookmarks((prev) => prev.filter((item) => item.id !== bm.id));
                            onProgressUpdated?.();
                          }}
                          className="text-stone-500 hover:text-rose-400 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
