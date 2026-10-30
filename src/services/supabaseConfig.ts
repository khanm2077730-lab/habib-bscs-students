/**
 * Supabase Backend Readiness Configuration
 * 
 * Habib BSCS Students platform operates seamlessly in local browser storage mode.
 * When environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided,
 * cloud synchronization for progress, quiz history, and user profiles can be activated.
 */

export interface BackendStatus {
  isConfigured: boolean;
  mode: 'local' | 'cloud';
  supabaseUrl?: string;
  hasAnonKey: boolean;
  featuresAvailable: {
    localStorageGuestMode: boolean;
    cloudProgressSync: boolean;
    userAuthentication: boolean;
    centralizedLeaderboards: boolean;
  };
}

export const getBackendStatus = (): BackendStatus => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const isConfigured = Boolean(supabaseUrl && anonKey && supabaseUrl.startsWith('https://'));

  return {
    isConfigured,
    mode: isConfigured ? 'cloud' : 'local',
    supabaseUrl: isConfigured ? supabaseUrl : undefined,
    hasAnonKey: Boolean(anonKey),
    featuresAvailable: {
      localStorageGuestMode: true,
      cloudProgressSync: isConfigured,
      userAuthentication: isConfigured,
      centralizedLeaderboards: isConfigured
    }
  };
};

export const SUPABASE_SETUP_STEPS = [
  'Create a free project at https://supabase.com',
  'Navigate to Project Settings -> API to copy your Project URL and anon public key',
  'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables (.env)',
  'Never expose your service_role secret key on the frontend',
  'Run the provided SQL migration script to generate the student_profiles, quiz_attempts, and completed_lessons tables'
];

export const SAMPLE_SQL_SCHEMA = `-- SQL Schema for Habib BSCS Students (Run in Supabase SQL Editor)
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  roll_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 15,
  percentage NUMERIC(5,2) NOT NULL,
  attempt_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS completed_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);`;
