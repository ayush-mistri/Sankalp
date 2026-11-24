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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
