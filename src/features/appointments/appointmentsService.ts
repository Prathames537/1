// Appointments Service: handles Firestore logic for appointments
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { Appointment } from './appointmentsTypes';

export async function createAppointment(appt: Appointment) {
  await addDoc(collection(db, 'appointments'), { ...appt, createdAt: Timestamp.now() });
}

export async function getAppointmentsForUser(userId: string): Promise<Appointment[]> {
  const q = query(collection(db, 'appointments'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Appointment);
}
