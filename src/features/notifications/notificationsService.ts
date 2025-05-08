// Notifications Service: migrate to Supabase for notifications logic
// TODO: Implement Supabase-based notifications functions here

import { supabase } from '@/lib/supabaseClient';

export async function sendNotification(notification) {
  const { data, error } = await supabase.from('notifications').insert([notification]);
  if (error) throw error;
  return data;
}

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
