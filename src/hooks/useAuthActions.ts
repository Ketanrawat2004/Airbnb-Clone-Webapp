
import { useCallback } from 'react';
import { authService } from '@/services/authService';
import { createMockSession } from '@/utils/sessionUtils';

interface UseAuthActionsProps {
  setLoading: (loading: boolean) => void;
  setUser: (user: any) => void;
  setSession: (session: any) => void;
}

export const useAuthActions = ({ setLoading, setUser, setSession }: UseAuthActionsProps) => {
  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, fullName);
      return result;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const generateOTP = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const result = await authService.generateOTP(name);
      return result;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const validateOTP = useCallback(async (name: string, otpCode: string) => {
    setLoading(true);
    try {
      const result = await authService.validateOTP(name, otpCode);
      
      if (!result.error) {
        // Set the user state to simulate being logged in
        const { user: mockUser, session: mockSession } = createMockSession(name);
        setUser(mockUser);
        setSession(mockSession);
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, setSession]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return {
    signUp,
    signIn,
    generateOTP,
    validateOTP,
    signOut
  };
};
