// Appointments Service: migrate to Supabase for appointments logic
// TODO: Implement Supabase-based appointments functions here

import { supabase } from '@/lib/supabaseClient';

export async function createAppointment(appointment) {
  const { data, error } = await supabase.from('appointments').insert([appointment]);
  if (error) throw error;
  return data;
}

export async function getAppointments(userId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .or(`patient_id.eq.${userId},doctor_id.eq.${userId}`)
    .order('appointment_date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateAppointment(id, updates) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id) {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
}
