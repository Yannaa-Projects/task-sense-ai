
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, Profile } from '@/types/auth';
import { toast } from '@/components/ui/sonner';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      return null;
    }
  };

  const updateAuthState = async (session: Session | null) => {
    if (!session) {
      setAuthState({
        user: null,
        profile: null,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }

    const profile = await fetchUserProfile(session.user.id);
    
    setAuthState({
      user: session.user,
      profile,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  useEffect(() => {
    // First check for existing session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await updateAuthState(session);

      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          await updateAuthState(session);
        }
      );

      return () => subscription.unsubscribe();
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error(error.message || 'Failed to sign in');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw error;
      }
      
      // Auth state will be updated by the listener
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          },
        }
      });
      
      if (error) {
        toast.error(error.message || 'Failed to create account');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw error;
      }
      
      toast.success('Account created successfully! Please check your email to verify your account.');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message || 'Failed to sign out');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw error;
      }
      
      // Auth state will be updated by the listener
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const contextValue = {
    ...authState,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
