
import { User, Session } from '@supabase/supabase-js';

export const createMockSession = (name: string): { user: User; session: Session } => {
  // Create a temporary user session for OTP-based login
  // Note: This is a simplified approach. In production, you might want to 
  // create actual user accounts or use a different authentication flow
  const tempUser = {
    id: `otp-${name}`,
    email: `${name}@otp.local`,
    user_metadata: { full_name: name, auth_method: 'otp' }
  };
  
  // For OTP login, we'll create a mock session
  const mockSession = {
    access_token: `otp-token-${Date.now()}`,
    refresh_token: `otp-refresh-${Date.now()}`,
    expires_in: 3600,
    token_type: 'bearer',
    user: tempUser
  };

  return {
    user: tempUser as any,
    session: mockSession as any
  };
};
