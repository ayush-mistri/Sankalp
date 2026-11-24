'use client';

import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  Clock3,
  FileText,
  LoaderCircle,
  LogIn,
  LogOut,
  Mail,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Star,
  Trash2,
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabaseClient';
import type { Language } from '@/types';
import type { PersonalNote } from '@/types/personalNotes';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

interface PersonalNotesViewProps {
  language: Language;
}

type SaveState = 'saved' | 'unsaved' | 'saving' | 'error';
type NoteField = 'exam' | 'subject' | 'topic' | 'title' | 'content';
type NoteDraft = Pick<PersonalNote, 'exam' | 'subject' | 'topic' | 'title' | 'content'>;

const draftFields = (note: NoteDraft): NoteDraft => ({
  exam: note.exam,
  subject: note.subject,
  topic: note.topic,
  title: note.title,
  content: note.content,
});

const isNoteDraft = (value: unknown): value is NoteDraft =>
  typeof value === 'object'
  && value !== null
  && 'exam' in value && typeof value.exam === 'string'
  && 'subject' in value && typeof value.subject === 'string'
  && 'topic' in value && typeof value.topic === 'string'
  && 'title' in value && typeof value.title === 'string'
  && 'content' in value && typeof value.content === 'string';

const sameDraft = (left: NoteDraft, right: NoteDraft) =>
  left.exam === right.exam
  && left.subject === right.subject
  && left.topic === right.topic
  && left.title === right.title
  && left.content === right.content;

const draftStorageKey = (userId: string, noteId: string) =>
  `sankalp:student-notes:draft:${userId}:${noteId}`;

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'An unexpected error occurred.';

export const PersonalNotesView: React.FC<PersonalNotesViewProps> = ({ language }) => {
  const isGujarati = language === 'gu';
  const text = isGujarati
    ? {
        title: 'મારી વ્યક્તિગત નોંધો',
        subtitle: 'તમારી નોંધો તમારા ખાતામાં ખાનગી રીતે સાચવાય છે.',
        signIn: 'સાઇન ઇન',
        signUp: 'ખાતું બનાવો',
        email: 'ઈમેલ',
        password: 'પાસવર્ડ',
        signInButton: 'સાઇન ઇન કરો',
        signUpButton: 'ખાતું બનાવો',
        switchToSignUp: 'નવું ખાતું બનાવવું છે?',
        switchToSignIn: 'પહેલેથી ખાતું છે?',
        confirmEmail: 'ખાતું બનાવાયું. ચાલુ રાખવા માટે તમારા ઈમેલની પુષ્ટિ કરો.',
        secureAccess: 'સુરક્ષિત વિદ્યાર્થી પ્રવેશ',
        setupTitle: 'Supabase કનેક્શન જરૂરી છે',
        setupBody: 'Supabase project URL અને anon key ને .env.local માં ઉમેરો અને પછી ડેવ સર્વર ફરી શરૂ કરો. સેટઅપની સૂચનાઓ supabase/README.md માં છે.',
        signOut: 'સાઇન આઉટ',
        newNote: 'નવી નોંધ',
        search: 'નોંધના શીર્ષક અથવા લખાણમાં શોધો...',
        allSubjects: 'બધા વિષયો',
        subjectFilter: 'વિષય પ્રમાણે ફિલ્ટર',
        sortUpdated: 'તાજેતરમાં સંપાદિત',
        sortCreated: 'બનાવ્યાની તારીખ',
        recentNotes: 'તાજેતરની નોંધો',
        noNotes: 'હજુ કોઈ નોંધ નથી. શરૂઆત કરવા નવી નોંધ બનાવો.',
        noResults: 'આ શોધ અથવા ફિલ્ટર માટે નોંધ મળી નથી.',
        exam: 'પરીક્ષા',
        subject: 'વિષય',
        topic: 'ટોપિક',
        titleLabel: 'શીર્ષક',
        titlePlaceholder: 'નોંધનું શીર્ષક',
        content: 'નોંધ / વર્ણન',
        contentPlaceholder: 'તમારા અભ્યાસના મુદ્દાઓ અહીં લખો. નોંધ આપમેળે સાચવાશે...',
        favorite: 'મહત્વપૂર્ણ તરીકે ચિહ્નિત કરો',
        unfavorite: 'મહત્વપૂર્ણમાંથી દૂર કરો',
        delete: 'નોંધ કાઢી નાખો',
        created: 'બનાવ્યું',
        updated: 'સંપાદિત',
        saved: 'બધા ફેરફારો સાચવાયા',
        saving: 'સાચવી રહ્યું છે…',
        unsaved: 'ન સાચવેલા ફેરફારો',
        saveError: 'સાચવી શકાયું નથી. ફેરફારો અહીં જ છે; ફરી પ્રયાસ કરો.',
        retry: 'ફરી પ્રયાસ',
        loadError: 'નોંધો લોડ થઈ શકી નથી.',
        actionError: 'ક્રિયા પૂર્ણ થઈ શકી નથી.',
        deleteConfirm: 'આ નોંધ કાયમ માટે કાઢી નાખવી છે?',
        savedDraftsWarning: 'કેટલાક ફેરફારો સાચવાઈ રહ્યા છે અથવા સાચવાયા નથી.',
        emptyTitle: 'નોંધ પસંદ કરો અથવા નવી બનાવો',
        emptyBody: 'તમારી પસંદ કરેલી નોંધ અહીં શાંતિથી વાંચો અને સંપાદિત કરો.',
        generalSubject: 'સામાન્ય અભ્યાસ',
        signOutUnsaved: 'કેટલાક ફેરફારો સાચવી શક્યા નથી. તમે સાઇન ઇન જ રહેશો; નેટવર્ક તપાસીને ફરી પ્રયાસ કરો.',
      }
    : {
        title: 'My Personal Notes',
        subtitle: 'Your notes are saved privately to your account.',
        signIn: 'Sign in',
        signUp: 'Create account',
        email: 'Email',
        password: 'Password',
        signInButton: 'Sign in',
        signUpButton: 'Create account',
        switchToSignUp: 'Need an account?',
        switchToSignIn: 'Already have an account?',
        confirmEmail: 'Account created. Confirm your email to continue.',
        secureAccess: 'Secure student access',
        setupTitle: 'Supabase connection required',
        setupBody: 'Add your Supabase project URL and anon key to .env.local, then restart the dev server. Setup instructions are in supabase/README.md.',
        signOut: 'Sign out',
        newNote: 'New note',
        search: 'Search note titles or content...',
        allSubjects: 'All subjects',
        subjectFilter: 'Filter by subject',
        sortUpdated: 'Recently edited',
        sortCreated: 'Date created',
        recentNotes: 'Recent notes',
        noNotes: 'No notes yet. Create one to get started.',
        noResults: 'No notes match this search or filter.',
        exam: 'Examination',
        subject: 'Subject',
        topic: 'Topic',
        titleLabel: 'Title',
        titlePlaceholder: 'Note title',
        content: 'Note / description',
        contentPlaceholder: 'Write your study notes here. Changes save automatically...',
        favorite: 'Mark as important',
        unfavorite: 'Remove from important',
        delete: 'Delete note',
        created: 'Created',
        updated: 'Edited',
        saved: 'All changes saved',
        saving: 'Saving…',
        unsaved: 'Unsaved changes',
        saveError: 'Could not save. Your changes are still here; try again.',
        retry: 'Retry save',
        loadError: 'Could not load notes.',
        actionError: 'The action could not be completed.',
        deleteConfirm: 'Delete this note permanently?',
        savedDraftsWarning: 'Some changes are saving or have not been saved.',
        emptyTitle: 'Select a note or create one',
        emptyBody: 'Your selected note will open here for a comfortable study session.',
        generalSubject: 'General Studies',
        signOutUnsaved: 'Some changes could not be saved. You remain signed in; check your connection and retry.',
      };

  const configured = isSupabaseConfigured();
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [creatingNote, setCreatingNote] = useState(false);
  const [workspaceError, setWorkspaceError] = useState('');
  const [notesReloadKey, setNotesReloadKey] = useState(0);
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState<'updated_at' | 'created_at'>('updated_at');
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const versions = useRef(new Map<string, number>());
  const saveQueues = useRef(new Map<string, Promise<boolean>>());
  const notesRef = useRef(notes);
  notesRef.current = notes;

  useEffect(() => {
    if (!configured) {
      setAuthLoading(false);
      return;
    }

    const client = getSupabaseClient();
    setSupabase(client);
    let active = true;
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setUserId(session?.user.id ?? null);
        setAuthLoading(false);
        setAuthError('');
      }
    });

    void client.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setAuthError(error.message);
        setUserId(data.session?.user.id ?? null);
        setAuthLoading(false);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setAuthError(errorMessage(error));
        setAuthLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  const persistNote = useCallback((
    note: PersonalNote,
    version: number,
  ): Promise<boolean> => {
    if (!supabase || !userId) return Promise.resolve(false);

    const previous = saveQueues.current.get(note.id) ?? Promise.resolve(true);
    const request = previous
      .catch(() => false)
      .then(async () => {
        setSaveStates((current) => ({ ...current, [note.id]: 'saving' }));
        const { data, error } = await supabase
          .from('student_notes')
          .update({
            exam: note.exam,
            subject: note.subject,
            topic: note.topic,
            title: note.title,
            content: note.content,
          })
          .eq('id', note.id)
          .eq('user_id', userId)
          .select('updated_at')
          .single();

        if (error) throw error;
        try {
          const key = draftStorageKey(userId, note.id);
          const stored = sessionStorage.getItem(key);
          if (stored) {
            const draft: unknown = JSON.parse(stored);
            if (isNoteDraft(draft) && sameDraft(draft, draftFields(note))) {
              sessionStorage.removeItem(key);
            }
          }
        } catch (draftError) {
          setWorkspaceError(`${text.actionError} ${errorMessage(draftError)}`);
        }
        setNotes((current) => current.map((item) =>
          item.id === note.id ? { ...item, updated_at: data.updated_at } : item,
        ));
        if (versions.current.get(note.id) === version) {
          setSaveStates((current) => ({ ...current, [note.id]: 'saved' }));
        }
        return true;
      })
      .catch(() => {
        if (versions.current.get(note.id) === version) {
          setSaveStates((current) => ({ ...current, [note.id]: 'error' }));
        }
        return false;
      });

    saveQueues.current.set(note.id, request);
    return request;
  }, [supabase, userId, text.actionError]);
  const persistNoteRef = useRef(persistNote);
  persistNoteRef.current = persistNote;

  const scheduleSave = useCallback((note: PersonalNote) => {
    const version = (versions.current.get(note.id) ?? 0) + 1;
    versions.current.set(note.id, version);
    const existingTimer = timers.current.get(note.id);
    if (existingTimer) clearTimeout(existingTimer);
    setSaveStates((current) => ({ ...current, [note.id]: 'unsaved' }));

    try {
      sessionStorage.setItem(
        draftStorageKey(userId ?? '', note.id),
        JSON.stringify(draftFields(note)),
      );
    } catch (error) {
      setWorkspaceError(`${text.actionError} ${errorMessage(error)}`);
    }

    const timer = setTimeout(() => {
      timers.current.delete(note.id);
      void persistNote(note, version);
    }, 850);
    timers.current.set(note.id, timer);
  }, [persistNote, text.actionError, userId]);

  useEffect(() => {
    if (!supabase || !userId) {
      setNotes([]);
      setSelectedNoteId(null);
      setSaveStates({});
      setLoadingNotes(false);
      return;
    }

    let active = true;
    setLoadingNotes(true);
    setWorkspaceError('');

    const loadNotes = async () => {
      try {
        const { data, error } = await supabase
          .from('student_notes')
          .select('*')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        if (!active) return;
        const loadedNotes = data ?? [];
        const restoredNotes: PersonalNote[] = [];
        const restoredNoteIds = new Set<string>();
        loadedNotes.forEach((note) => {
          try {
            const key = draftStorageKey(userId, note.id);
            const stored = sessionStorage.getItem(key);
            if (!stored) {
              restoredNotes.push(note);
              return;
            }

            const draft: unknown = JSON.parse(stored);
            if (!isNoteDraft(draft)) {
              sessionStorage.removeItem(key);
              setWorkspaceError(text.actionError);
              restoredNotes.push(note);
              return;
            }
            if (sameDraft(draft, draftFields(note))) {
              sessionStorage.removeItem(key);
              restoredNotes.push(note);
              return;
            }

            restoredNoteIds.add(note.id);
            restoredNotes.push({ ...note, ...draft });
          } catch (draftError) {
            setWorkspaceError(`${text.actionError} ${errorMessage(draftError)}`);
            restoredNotes.push(note);
          }
        });

        setNotes(restoredNotes);
        const initialSaveStates: Record<string, SaveState> = {};
        restoredNotes.forEach((note) => {
          initialSaveStates[note.id] = restoredNoteIds.has(note.id) ? 'unsaved' : 'saved';
        });
        setSaveStates(initialSaveStates);
        setSelectedNoteId((current) =>
          current && restoredNotes.some((note) => note.id === current)
            ? current
            : restoredNotes[0]?.id ?? null,
        );
        restoredNotes
          .filter((note) => restoredNoteIds.has(note.id))
          .forEach((note) => scheduleSave(note));
      } catch (error) {
        if (active) setWorkspaceError(errorMessage(error));
      } finally {
        if (active) setLoadingNotes(false);
      }
    };

    void loadNotes();
    return () => {
      active = false;
    };
  }, [supabase, userId, notesReloadKey, scheduleSave, text.actionError]);

  useEffect(() => () => {
    timers.current.forEach((timer, id) => {
      clearTimeout(timer);
      const note = notesRef.current.find((item) => item.id === id);
      if (note) {
        void persistNoteRef.current(note, versions.current.get(id) ?? 0);
      }
    });
    timers.current.clear();
  }, []);

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (Object.values(saveStates).some((state) => state !== 'saved')) {
        event.preventDefault();
        event.returnValue = text.savedDraftsWarning;
      }
    };

    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [saveStates, text.savedDraftsWarning]);

  const subjects = useMemo(
    () => [...new Set(notes.map((note) => note.subject.trim()).filter(Boolean))].sort(),
    [notes],
  );
  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return notes
      .filter((note) => selectedSubject === 'all' || note.subject === selectedSubject)
      .filter((note) => !query || [
        note.title,
        note.content,
        note.exam,
        note.subject,
        note.topic,
      ].some((value) => value.toLocaleLowerCase().includes(query)))
      .sort((a, b) => new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime());
  }, [notes, searchQuery, selectedSubject, sortBy]);
  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setAuthBusy(true);
    setAuthError('');
    setAuthMessage('');

    try {
      if (authMode === 'signUp') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) setAuthMessage(text.confirmEmail);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  };

  const createNote = async () => {
    if (!supabase || !userId || creatingNote) return;
    setCreatingNote(true);
    setWorkspaceError('');
    try {
      const { data, error } = await supabase
        .from('student_notes')
        .insert({
          user_id: userId,
          exam: 'GPSC',
          subject: text.generalSubject,
          topic: '',
          title: '',
          content: '',
        })
        .select('*')
        .single();

      if (error) throw error;
      setNotes((current) => [data, ...current]);
      setSelectedNoteId(data.id);
      setSaveStates((current) => ({ ...current, [data.id]: 'saved' }));
    } catch (error) {
      setWorkspaceError(`${text.actionError} ${errorMessage(error)}`);
    } finally {
      setCreatingNote(false);
    }
  };

  const updateNote = (field: NoteField, value: string) => {
    if (!selectedNote) return;
    const updatedNote = { ...selectedNote, [field]: value };
    setNotes((current) => current.map((note) =>
      note.id === selectedNote.id ? updatedNote : note,
    ));
    scheduleSave(updatedNote);
  };

  const toggleFavorite = async (note: PersonalNote) => {
    if (!supabase || !userId) return;
    setWorkspaceError('');
    const nextValue = !note.is_favorite;
    setNotes((current) => current.map((item) =>
      item.id === note.id ? { ...item, is_favorite: nextValue } : item,
    ));

    try {
      const { data, error } = await supabase
        .from('student_notes')
        .update({ is_favorite: nextValue })
        .eq('id', note.id)
        .eq('user_id', userId)
        .select('updated_at')
        .single();
      if (error) throw error;
      setNotes((current) => current.map((item) =>
        item.id === note.id ? { ...item, updated_at: data.updated_at } : item,
      ));
    } catch (error) {
      setNotes((current) => current.map((item) =>
        item.id === note.id ? { ...item, is_favorite: note.is_favorite } : item,
      ));
      setWorkspaceError(`${text.actionError} ${errorMessage(error)}`);
    }
  };

  const deleteNote = async (note: PersonalNote) => {
    if (!supabase || !userId || !window.confirm(text.deleteConfirm)) return;
    setWorkspaceError('');
    const timer = timers.current.get(note.id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(note.id);
    }

    try {
      await saveQueues.current.get(note.id);
      const { error } = await supabase
        .from('student_notes')
        .delete()
        .eq('id', note.id)
        .eq('user_id', userId);
      if (error) throw error;
      try {
        sessionStorage.removeItem(draftStorageKey(userId, note.id));
      } catch (draftError) {
        setWorkspaceError(`${text.actionError} ${errorMessage(draftError)}`);
      }
      setNotes((current) => current.filter((item) => item.id !== note.id));
      setSelectedNoteId((current) =>
        current === note.id
          ? notes.find((item) => item.id !== note.id)?.id ?? null
          : current,
      );
      setSaveStates((current) => {
        const remaining = { ...current };
        delete remaining[note.id];
        return remaining;
      });
    } catch (error) {
      setWorkspaceError(`${text.actionError} ${errorMessage(error)}`);
    }
  };

  const retrySave = () => {
    if (!selectedNote) return;
    const timer = timers.current.get(selectedNote.id);
    if (timer) clearTimeout(timer);
    timers.current.delete(selectedNote.id);
    void persistNote(selectedNote, versions.current.get(selectedNote.id) ?? 0);
  };

  const signOut = async () => {
    if (!supabase || !userId) return;
    const pendingNoteIds = new Set([
      ...timers.current.keys(),
      ...Object.entries(saveStates)
        .filter(([, state]) => state !== 'saved')
        .map(([id]) => id),
    ]);
    const pendingSaves: Promise<boolean>[] = [];

    pendingNoteIds.forEach((id) => {
      const timer = timers.current.get(id);
      if (timer) clearTimeout(timer);
      timers.current.delete(id);
      const note = notes.find((item) => item.id === id);
      if (note) {
        pendingSaves.push(
          persistNote(note, versions.current.get(id) ?? 0),
        );
      }
    });

    const saveResults = await Promise.all(pendingSaves);
    if (saveResults.some((saved) => !saved)) {
      setWorkspaceError(text.signOutUnsaved);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) setWorkspaceError(`${text.actionError} ${error.message}`);
    } catch (error) {
      setWorkspaceError(`${text.actionError} ${errorMessage(error)}`);
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(isGujarati ? 'gu-IN' : 'en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

  const saveState = selectedNote ? saveStates[selectedNote.id] ?? 'saved' : 'saved';

  if (!configured) {
    return (
      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-stone-800 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-700" />
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold">{text.setupTitle}</h2>
            <p className="max-w-3xl text-sm leading-relaxed">{text.setupBody}</p>
            <code className="block text-xs text-stone-700">
              NEXT_PUBLIC_SUPABASE_URL<br />NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
          </div>
        </div>
      </section>
    );
  }

  if (authLoading || !supabase) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-semibold text-stone-600">
        <LoaderCircle className="h-5 w-5 animate-spin text-emerald-700" />
        {isGujarati ? 'તમારું ખાતું તપાસી રહ્યા છીએ…' : 'Checking your account…'}
      </div>
    );
  }

  if (!userId) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-6 shadow-md sm:p-9">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-stone-900">{text.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{text.secureAccess}</p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-stone-100 p-1">
          {(['signIn', 'signUp'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setAuthMode(mode);
                setAuthError('');
                setAuthMessage('');
              }}
              className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                authMode === mode
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-stone-600 hover:bg-white/70 hover:text-stone-900'
              }`}
            >
              {mode === 'signIn' ? text.signIn : text.signUp}
            </button>
          ))}
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-bold text-stone-800">
            <span>{text.email}</span>
            <span className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
              <Mail className="h-4 w-4 text-stone-500" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 py-3 text-sm font-medium outline-none"
              />
            </span>
          </label>

          <label className="block space-y-1.5 text-sm font-bold text-stone-800">
            <span>{text.password}</span>
            <span className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
              <BookOpen className="h-4 w-4 text-stone-500" />
              <input
                type="password"
                required
                minLength={8}
                autoComplete={authMode === 'signIn' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-w-0 flex-1 py-3 text-sm font-medium outline-none"
              />
            </span>
          </label>

          {authError && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {authError}
            </p>
          )}
          {authMessage && (
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              {authMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={authBusy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-950 disabled:cursor-wait disabled:opacity-70"
          >
            {authBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            {authMode === 'signIn' ? text.signInButton : text.signUpButton}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-stone-600">
          {authMode === 'signIn' ? text.switchToSignUp : text.switchToSignIn}{' '}
          <button
            type="button"
            onClick={() => {
              setAuthMode((current) => current === 'signIn' ? 'signUp' : 'signIn');
              setAuthError('');
              setAuthMessage('');
            }}
            className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950"
          >
            {authMode === 'signIn' ? text.signUp : text.signIn}
          </button>
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-emerald-50">
            <FileText className="h-4 w-4" />
            {text.subtitle}
          </div>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{text.title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void createNote()}
            disabled={creatingNote}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-emerald-950 shadow-sm transition hover:bg-emerald-100 disabled:opacity-70"
          >
            {creatingNote
              ? <LoaderCircle className="h-4 w-4 animate-spin" />
              : <Plus className="h-4 w-4" />}
            {text.newNote}
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-emerald-950/30 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-950/60"
          >
            <LogOut className="h-4 w-4" />
            {text.signOut}
          </button>
        </div>
      </header>

      {workspaceError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{workspaceError}</span>
          <button
            type="button"
            onClick={() => setWorkspaceError('')}
            aria-label={isGujarati ? 'બંધ કરો' : 'Dismiss'}
            className="ml-auto font-bold text-rose-900"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(270px,0.8fr)_minmax(0,1.7fr)]">
        <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="space-y-3 border-b border-stone-200 bg-stone-50 p-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={text.search}
                aria-label={text.search}
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="sr-only" htmlFor="notes-subject-filter">{text.subjectFilter}</label>
              <select
                id="notes-subject-filter"
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                className="min-w-0 rounded-lg border border-stone-300 bg-white px-2.5 py-2 text-xs font-semibold text-stone-800 focus:border-emerald-600 focus:outline-none"
              >
                <option value="all">{text.allSubjects}</option>
                {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
              </select>
              <label className="sr-only" htmlFor="notes-sort">{text.sortUpdated}</label>
              <select
                id="notes-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as 'updated_at' | 'created_at')}
                className="min-w-0 rounded-lg border border-stone-300 bg-white px-2.5 py-2 text-xs font-semibold text-stone-800 focus:border-emerald-600 focus:outline-none"
              >
                <option value="updated_at">{text.sortUpdated}</option>
                <option value="created_at">{text.sortCreated}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 pb-2 pt-4">
            <h3 className="text-sm font-extrabold text-stone-900">{text.recentNotes}</h3>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-950">
              {filteredNotes.length}
            </span>
          </div>

          <div className="max-h-[36rem] space-y-1 overflow-y-auto p-2">
            {loadingNotes ? (
              <div className="flex items-center justify-center gap-2 p-8 text-sm font-semibold text-stone-600">
                <LoaderCircle className="h-4 w-4 animate-spin text-emerald-700" />
                {isGujarati ? 'લોડ થઈ રહ્યું છે…' : 'Loading notes…'}
              </div>
            ) : workspaceError && notes.length === 0 ? (
              <div className="p-4 text-sm text-rose-800">
                {text.loadError}{' '}
                <button type="button" onClick={() => setNotesReloadKey((current) => current + 1)} className="font-bold underline">
                  {text.retry}
                </button>
              </div>
            ) : filteredNotes.length === 0 ? (
              <p className="p-4 text-sm leading-relaxed text-stone-600">
                {notes.length ? text.noResults : text.noNotes}
              </p>
            ) : filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`group flex items-start gap-2 rounded-xl border p-3 transition ${
                  selectedNoteId === note.id
                    ? 'border-emerald-300 bg-emerald-100/80 shadow-sm'
                    : 'border-transparent hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedNoteId(note.id)}
                  aria-pressed={selectedNoteId === note.id}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-stone-900">
                      {note.title.trim() || text.titlePlaceholder}
                    </span>
                    {note.is_favorite && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-600" />}
                  </span>
                  <span className="mt-1 block truncate text-xs font-medium text-stone-700">
                    {[note.exam, note.subject, note.topic].filter(Boolean).join(' · ')}
                  </span>
                  <span className="mt-1.5 block text-[11px] text-stone-600">
                    {formatDate(sortBy === 'updated_at' ? note.updated_at : note.created_at)}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => void toggleFavorite(note)}
                  aria-label={note.is_favorite ? text.unfavorite : text.favorite}
                  title={note.is_favorite ? text.unfavorite : text.favorite}
                  className="rounded-lg p-2 text-stone-500 transition hover:bg-amber-100 hover:text-amber-800"
                >
                  <Star className={`h-4 w-4 ${note.is_favorite ? 'fill-amber-400 text-amber-600' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div className="min-h-[28rem] rounded-2xl border border-stone-200 bg-white shadow-sm">
          {selectedNote ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-4 py-3 sm:px-6">
                <div className="flex min-h-7 items-center gap-2 text-xs font-semibold">
                  {saveState === 'saving' ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin text-emerald-700" />
                      <span className="text-stone-700">{text.saving}</span>
                    </>
                  ) : saveState === 'unsaved' ? (
                    <>
                      <Clock3 className="h-4 w-4 text-amber-700" />
                      <span className="text-amber-900">{text.unsaved}</span>
                    </>
                  ) : saveState === 'error' ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-rose-700" />
                      <span className="text-rose-800">{text.saveError}</span>
                      <button type="button" onClick={retrySave} className="inline-flex items-center gap-1 font-extrabold text-rose-900 underline">
                        <RotateCcw className="h-3.5 w-3.5" />{text.retry}
                      </button>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-emerald-700" />
                      <span className="text-emerald-900">{text.saved}</span>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => void deleteNote(selectedNote)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-600 transition hover:bg-rose-100 hover:text-rose-800"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {text.delete}
                </button>
              </div>

              <div className="space-y-5 p-4 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {([
                    ['exam', text.exam, 'GPSC / UPSC'],
                    ['subject', text.subject, text.generalSubject],
                    ['topic', text.topic, isGujarati ? 'ટોપિકનું નામ' : 'Topic name'],
                  ] as const).map(([field, label, placeholder]) => (
                    <label key={field} className="space-y-1.5 text-xs font-bold text-stone-700">
                      <span>{label}</span>
                      <input
                        type="text"
                        value={selectedNote[field]}
                        onChange={(event) => updateNote(field, event.target.value)}
                        placeholder={placeholder}
                        maxLength={field === 'exam' ? 80 : field === 'subject' ? 120 : 160}
                        className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </label>
                  ))}
                </div>

                <label className="block space-y-1.5 text-xs font-bold text-stone-700">
                  <span>{text.titleLabel}</span>
                  <input
                    type="text"
                    value={selectedNote.title}
                    onChange={(event) => updateNote('title', event.target.value)}
                    placeholder={text.titlePlaceholder}
                    maxLength={180}
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-lg font-extrabold text-stone-900 placeholder:font-semibold placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <label className="block space-y-1.5 text-xs font-bold text-stone-700">
                  <span>{text.content}</span>
                  <textarea
                    value={selectedNote.content}
                    onChange={(event) => updateNote('content', event.target.value)}
                    placeholder={text.contentPlaceholder}
                    className="min-h-[48vh] w-full resize-y rounded-xl border border-stone-300 bg-[#fffefa] px-4 py-4 text-base leading-8 text-stone-800 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:px-5"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 text-xs text-stone-600">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span>{text.created}: {formatDate(selectedNote.created_at)}</span>
                    <span>{text.updated}: {formatDate(selectedNote.updated_at)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void toggleFavorite(selectedNote)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-bold transition ${
                      selectedNote.is_favorite
                        ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${selectedNote.is_favorite ? 'fill-amber-400 text-amber-600' : ''}`} />
                    {selectedNote.is_favorite ? text.unfavorite : text.favorite}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[28rem] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-extrabold text-stone-900">{text.emptyTitle}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-600">{text.emptyBody}</p>
              <button
                type="button"
                onClick={() => void createNote()}
                disabled={creatingNote}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-950"
              >
                <Plus className="h-4 w-4" />{text.newNote}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
