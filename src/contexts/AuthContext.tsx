import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, type UserProfile } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) await fetchProfile(session.user.id);
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signUp(email: string, password: string, userData: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: userData },
      });
      if (!error && data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id, email, ...userData, rol: 'docente',
        });
      }
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
