export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown> = Partial<Row>,
  Update extends Record<string, unknown> = Partial<Row>,
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type View<Row extends Record<string, unknown>> = {
  Row: Row;
  Relationships: [];
};

type BookRow = {
  id: string;
  slug: string;
  title_en: string;
  title_gu: string;
  author_en: string;
  author_gu: string;
  publisher_en: string | null;
  publisher_gu: string | null;
  edition: string | null;
  isbn: string | null;
  language: string;
  license_label: string | null;
  attribution: string | null;
  cover_image_url: string | null;
  description_en: string;
  description_gu: string;
  examination_relevance_en: string;
  examination_relevance_gu: string;
  learning_outcomes_en: string;
  learning_outcomes_gu: string;
  difficulty: string | null;
  recommendation_category: string | null;
  book_type: string | null;
  recommendation_reason_en: string;
  recommendation_reason_gu: string;
  recommended_for_en: string;
  recommended_for_gu: string;
  verification_status: string;
  metadata_source: string;
  manual_override_fields: string[];
  is_published: boolean;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

type BookChapterRow = {
  id: string;
  book_id: string;
  legacy_chapter_id: string | null;
  chapter_number: number;
  part_label_en: string | null;
  part_label_gu: string | null;
  title_en: string;
  title_gu: string;
  summary_en: string;
  summary_gu: string;
  reading_time_minutes: number | null;
  source_attribution: string | null;
  source_url: string | null;
  verification_status: string;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

type BookCatalogPublicRow = Omit<BookRow, 'manual_override_fields'> & {
  difficulty_order: number;
  subjects: Json;
  subject_slugs: string[];
  exams: Json;
  exam_slugs: string[];
  recommended_stages: string[];
  syllabus_topics: Json;
  syllabus_topic_keys: string[];
  resources: Json;
  chapters: Json;
  search_text: string;
}

export interface Database {
  public: {
    Tables: {
      student_notes: Table<{
        id: string;
        user_id: string;
        exam: string;
        subject: string;
        topic: string;
        title: string;
        content: string;
        is_favorite: boolean;
        created_at: string;
        updated_at: string;
      }>;
      books: Table<
        BookRow,
        Pick<BookRow, 'slug' | 'title_en'> & Partial<Omit<BookRow, 'slug' | 'title_en'>>,
        Partial<BookRow>
      >;
      exams: Table<{
        id: string;
        slug: string;
        name_en: string;
        name_gu: string;
        created_at: string;
        updated_at: string;
      }, Pick<{ slug: string; name_en: string; name_gu: string }, 'slug' | 'name_en' | 'name_gu'>>;
      subjects: Table<{
        id: string;
        slug: string;
        name_en: string;
        name_gu: string;
        created_at: string;
        updated_at: string;
      }, Pick<{ slug: string; name_en: string; name_gu: string }, 'slug' | 'name_en' | 'name_gu'>>;
      book_exams: Table<{
        book_id: string;
        exam_id: string;
        recommended_stages: string[];
        verification_status: string;
        created_at: string;
        updated_at: string;
      }, Pick<{ book_id: string; exam_id: string }, 'book_id' | 'exam_id'> & Partial<{
        recommended_stages: string[];
        verification_status: string;
        created_at: string;
        updated_at: string;
      }>>;
      book_subjects: Table<{
        book_id: string;
        subject_id: string;
        is_primary: boolean;
        verification_status: string;
        created_at: string;
      }, Pick<{ book_id: string; subject_id: string }, 'book_id' | 'subject_id'> & Partial<{
        is_primary: boolean;
        verification_status: string;
        created_at: string;
      }>>;
      syllabus_topics: Table<{
        id: string;
        external_key: string;
        exam_id: string;
        subject_id: string | null;
        stage: string;
        title_en: string;
        title_gu: string;
        official_wording_en: string;
        official_wording_gu: string;
        wording_source: string;
        verification_status: string;
        source_url: string | null;
        created_at: string;
        updated_at: string;
      }, Pick<{
        external_key: string;
        exam_id: string;
        stage: string;
        title_en: string;
      }, 'external_key' | 'exam_id' | 'stage' | 'title_en'> & Partial<{
        subject_id: string | null;
        title_gu: string;
        official_wording_en: string;
        official_wording_gu: string;
        wording_source: string;
        verification_status: string;
        source_url: string | null;
        created_at: string;
        updated_at: string;
      }>>;
      book_syllabus_topics: Table<{
        book_id: string;
        syllabus_topic_id: string;
        relevance_note_en: string;
        relevance_note_gu: string;
        verification_status: string;
        created_at: string;
      }, Pick<{ book_id: string; syllabus_topic_id: string }, 'book_id' | 'syllabus_topic_id'> & Partial<{
        relevance_note_en: string;
        relevance_note_gu: string;
        verification_status: string;
        created_at: string;
      }>>;
      book_resources: Table<{
        id: string;
        book_id: string;
        resource_type: string;
        label: string;
        url: string;
        verification_status: string;
        verified_at: string | null;
        source_name: string | null;
        created_at: string;
        updated_at: string;
      }, Pick<{
        book_id: string;
        resource_type: string;
        label: string;
        url: string;
      }, 'book_id' | 'resource_type' | 'label' | 'url'> & Partial<{
        verification_status: string;
        verified_at: string | null;
        source_name: string | null;
        created_at: string;
        updated_at: string;
      }>>;
      book_chapters: Table<
        BookChapterRow,
        Pick<BookChapterRow, 'book_id' | 'chapter_number' | 'title_en'> &
          Partial<Omit<BookChapterRow, 'book_id' | 'chapter_number' | 'title_en'>>,
        Partial<BookChapterRow>
      >;
      student_books: Table<{
        id: string;
        user_id: string;
        book_id: string;
        status: string;
        is_favorite: boolean;
        target_date: string | null;
        weekly_chapter_goal: number | null;
        last_accessed_at: string | null;
        created_at: string;
        updated_at: string;
      }, Pick<{ book_id: string }, 'book_id'> & Partial<{
        id: string;
        user_id: string;
        status: string;
        is_favorite: boolean;
        target_date: string | null;
        weekly_chapter_goal: number | null;
        last_accessed_at: string | null;
        created_at: string;
        updated_at: string;
      }>>;
      student_chapter_progress: Table<{
        id: string;
        user_id: string;
        book_id: string;
        book_chapter_id: string;
        status: string;
        started_at: string | null;
        completed_at: string | null;
        created_at: string;
        updated_at: string;
      }, Pick<{
        book_id: string;
        book_chapter_id: string;
      }, 'book_id' | 'book_chapter_id'> & Partial<{
        id: string;
        user_id: string;
        status: string;
        started_at: string | null;
        completed_at: string | null;
        created_at: string;
        updated_at: string;
      }>>;
      student_book_notes: Table<{
        id: string;
        user_id: string;
        book_id: string;
        book_chapter_id: string | null;
        title: string;
        content: string;
        created_at: string;
        updated_at: string;
      }, Pick<{ book_id: string }, 'book_id'> & Partial<{
        id: string;
        user_id: string;
        book_chapter_id: string | null;
        title: string;
        content: string;
        created_at: string;
        updated_at: string;
      }>>;
      student_reading_sessions: Table<{
        id: string;
        user_id: string;
        book_id: string;
        book_chapter_id: string | null;
        started_at: string;
        ended_at: string | null;
        duration_seconds: number;
        created_at: string;
      }>;
      book_import_runs: Table<{
        id: string;
        source_name: string;
        status: string;
        started_at: string | null;
        completed_at: string | null;
        error_summary: string | null;
        created_at: string;
      }>;
      book_import_candidates: Table<{
        id: string;
        import_run_id: string | null;
        source_name: string;
        external_id: string | null;
        source_url: string | null;
        candidate_data: Json;
        verification_status: string;
        duplicate_of: string | null;
        reviewed_by: string | null;
        reviewed_at: string | null;
        created_at: string;
        updated_at: string;
      }>;
      book_library_admins: Table<{
        user_id: string;
        created_at: string;
      }, Pick<{ user_id: string }, 'user_id'> & Partial<{ created_at: string }>>;
      book_favorites: Table<{
        user_id: string;
        book_id: string;
        created_at: string;
      }, Pick<{ book_id: string }, 'book_id'> & Partial<{
        user_id: string;
        created_at: string;
      }>>;
      book_highlights: Table<{
        id: string;
        user_id: string;
        book_id: string;
        chapter_id: string;
        section_id: string;
        selected_text: string;
        color: string;
        note: string | null;
        created_at: string;
      }>;
      book_bookmarks: Table<{
        id: string;
        user_id: string;
        book_id: string;
        chapter_id: string;
        label: string;
        created_at: string;
      }>;
      book_reading_progress: Table<{
        id: string;
        user_id: string;
        book_id: string;
        last_chapter_id: string;
        completed_chapter_ids: string[];
        progress_percent: number;
        updated_at: string;
      }>;
    };
    Views: {
      book_catalog_public: View<BookCatalogPublicRow>;
    };
    Functions: {
      start_book_reading_session: {
        Args: { requested_book_id: string; requested_chapter_id?: string | null };
        Returns: string;
      };
      finish_book_reading_session: {
        Args: { requested_session_id: string };
        Returns: undefined;
      };
      get_my_book_analytics: {
        Args: Record<string, never>;
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
