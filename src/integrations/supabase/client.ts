
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zobudirnfehkamxgoclg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYnVkaXJuZmVoa2FteGdvY2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTI5MjksImV4cCI6MjA2NTQ4ODkyOX0.mniJp8lq9wNjYkNx9yK6SXSMDFBraZnBbRcJ4-p1J1A';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
