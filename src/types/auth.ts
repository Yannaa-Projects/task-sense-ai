
import { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'manager' | 'team_member';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthUser extends SupabaseUser {
  profile?: Profile;
}

export interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
