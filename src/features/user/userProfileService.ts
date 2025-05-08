// User Profile Service: migrate to Supabase for user profile logic
// TODO: Implement Supabase-based user profile functions here

// import { supabase } from '@/lib/supabaseClient';

export async function getUserProfile(userId: string) {
  throw new Error('Supabase not available');
}

export async function updateUserProfile(userId: string, profile: any) {
  throw new Error('Supabase not available');
}
