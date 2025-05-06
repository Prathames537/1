// User Profile Service: migrate to Supabase for user profile logic
// TODO: Implement Supabase-based user profile functions here

import { supabase } from '@/lib/supabaseClient';

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId: string, profile: any) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profile)
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}
