// Appointments Service: migrate to Supabase for appointments logic
// TODO: Implement Supabase-based appointments functions here

import { supabase } from '@/lib/supabaseClient';

export async function createAppointment(data: any) {
  const { data: result, error } = await supabase
    .from('appointments')
    .insert([data])
    .single();
  if (error) throw error;
  return result;
}

export async function getAppointments(userId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateAppointment(id: string, updates: any) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id: string) {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
