
import * as React from 'react';
import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading, setUser, setSession, setLoading } = useAuthState();
  
  const authActions = useAuthActions({ setLoading, setUser, setSession });

  const value = {
    user,
    session,
    loading,
    ...authActions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
