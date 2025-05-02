// Notifications Service: handles Firestore logic for notifications
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { Notification } from './notificationsTypes';

export async function createNotification(notification: Notification) {
  await addDoc(collection(db, 'notifications'), { ...notification, createdAt: Timestamp.now() });
}

export async function getNotificationsForUser(userId: string): Promise<Notification[]> {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Notification);
}
