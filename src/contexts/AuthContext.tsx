
import * as React from 'react';
import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';

const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: { message: 'Auth not initialized' } }),
  signIn: async () => ({ error: { message: 'Auth not initialized' } }),
  signInWithGoogle: async () => ({ error: { message: 'Auth not initialized' } }),
  signOut: async () => {},
  generateOTP: async () => ({ error: { message: 'Auth not initialized' } }),
  validateOTP: async () => ({ error: { message: 'Auth not initialized' } }),
  generateEmailOTP: async () => ({ error: { message: 'Auth not initialized' } }),
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading, setUser, setSession, setLoading } = useAuthState();
  
  const authActions = useAuthActions({ setLoading, setUser, setSession });

  const value = React.useMemo(() => ({
    user,
    session,
    loading,
    ...authActions,
  }), [user, session, loading, authActions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
