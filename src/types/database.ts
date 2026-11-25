export interface Database {
  public: {
    Tables: {
      student_notes: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id?: string;
          exam?: string;
          subject?: string;
          topic?: string;
          title?: string;
          content?: string;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam?: string;
          subject?: string;
          topic?: string;
          title?: string;
          content?: string;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      books: {
        Row: {
          id: string;
          title_en: string;
          title_gu: string;
          author_en: string;
          author_gu: string;
          category: string;
          subject: string;
          language: string;
          license_type: string;
          attribution: string;
          source_url: string;
          pdf_storage_path: string | null;
          total_chapters: number;
          permission_verified_at: string;
          created_at: string;
        };
        Insert: {
          id: string;
          title_en: string;
          title_gu: string;
          author_en: string;
          author_gu: string;
          category: string;
          subject: string;
          language?: string;
          license_type: string;
          attribution: string;
          source_url: string;
          pdf_storage_path?: string | null;
          total_chapters?: number;
          permission_verified_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title_en?: string;
          title_gu?: string;
          author_en?: string;
          author_gu?: string;
          category?: string;
          subject?: string;
          language?: string;
          license_type?: string;
          attribution?: string;
          source_url?: string;
          pdf_storage_path?: string | null;
          total_chapters?: number;
          permission_verified_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      book_chapters: {
        Row: {
          id: string;
          book_id: string;
          chapter_number: number;
          part_label_en: string | null;
          part_label_gu: string | null;
          title_en: string;
          title_gu: string;
          reading_time_minutes: number;
          extracted_sections: unknown;
          summary_points_en: unknown;
          summary_points_gu: unknown;
          source_attribution: string;
          created_at: string;
        };
        Insert: {
          id: string;
          book_id: string;
          chapter_number: number;
          part_label_en?: string | null;
          part_label_gu?: string | null;
          title_en: string;
          title_gu: string;
          reading_time_minutes?: number;
          extracted_sections?: unknown;
          summary_points_en?: unknown;
          summary_points_gu?: unknown;
          source_attribution: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          chapter_number?: number;
          part_label_en?: string | null;
          part_label_gu?: string | null;
          title_en?: string;
          title_gu?: string;
          reading_time_minutes?: number;
          extracted_sections?: unknown;
          summary_points_en?: unknown;
          summary_points_gu?: unknown;
          source_attribution?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      book_highlights: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          chapter_id: string;
          section_id: string;
          selected_text: string;
          color: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          book_id: string;
          chapter_id: string;
          section_id: string;
          selected_text: string;
          color?: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          chapter_id?: string;
          section_id?: string;
          selected_text?: string;
          color?: string;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      book_bookmarks: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          chapter_id: string;
          label: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          book_id: string;
          chapter_id: string;
          label: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          chapter_id?: string;
          label?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      book_reading_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          last_chapter_id: string;
          completed_chapter_ids: string[];
          progress_percent: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          book_id: string;
          last_chapter_id: string;
          completed_chapter_ids?: string[];
          progress_percent?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          last_chapter_id?: string;
          completed_chapter_ids?: string[];
          progress_percent?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
