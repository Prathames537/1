// Appointments Service: migrate to Supabase for appointments logic
// TODO: Implement Supabase-based appointments functions here

import { supabase } from '@/lib/supabaseClient';

export interface Appointment {
  id?: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status?: string;
  created_at?: string;
}

export async function createAppointment(appointment: Appointment): Promise<any> {
  const { data, error } = await supabase.from('appointments').insert([appointment]);
  if (error) throw error;
  return data;
}

export async function getAppointments(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .or(`patient_id.eq.${userId},doctor_id.eq.${userId}`)
    .order('appointment_date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<any> {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id: string): Promise<any> {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
}
