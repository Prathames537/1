// Feedback Service: handles Firestore logic for feedback
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { Feedback } from './feedbackTypes';

export async function createFeedback(feedback: Feedback) {
  await addDoc(collection(db, 'feedback'), { ...feedback, createdAt: Timestamp.now() });
}

export async function getFeedbackForUser(userId: string): Promise<Feedback[]> {
  const q = query(collection(db, 'feedback'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Feedback);
}
