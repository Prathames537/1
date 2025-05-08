// Notifications Service: migrate to Supabase for notifications logic
// TODO: Implement Supabase-based notifications functions here

// import { supabase } from '@/lib/supabaseClient';

export async function sendNotification(notification: { message: string; user_id?: string }) {
  throw new Error('Supabase not available');
}

export async function getNotifications(userId: string) {
  throw new Error('Supabase not available');
}
