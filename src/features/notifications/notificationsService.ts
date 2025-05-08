// Notifications Service: migrate to Supabase for notifications logic
// TODO: Implement Supabase-based notifications functions here

import { supabase } from '@/lib/supabaseClient';

export interface Notification {
  id?: string;
  user_id: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export async function sendNotification(notification: Notification): Promise<any> {
  const { data, error } = await supabase.from('notifications').insert([notification]);
  if (error) throw error;
  return data;
}

export async function getNotifications(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
