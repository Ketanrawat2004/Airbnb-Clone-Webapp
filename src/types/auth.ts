
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  generateOTP: (name: string) => Promise<{ error: any; expiresAt?: string }>;
  validateOTP: (name: string, otpCode: string) => Promise<{ error: any }>;
}

export interface SignUpOptions {
  email: string;
  password: string;
  fullName: string;
}

export interface OTPValidationResult {
  valid: boolean;
  message?: string;
}
