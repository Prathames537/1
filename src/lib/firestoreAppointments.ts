// Firestore helpers for appointments
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

export interface Appointment {
  userId: string;
  name: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  description?: string;
  createdAt?: any;
}

export async function createAppointment(appt: Appointment) {
  await addDoc(collection(db, "appointments"), { ...appt, createdAt: Timestamp.now() });
}

export async function getAppointmentsForUser(userId: string): Promise<Appointment[]> {
  const q = query(collection(db, "appointments"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Appointment);
}
