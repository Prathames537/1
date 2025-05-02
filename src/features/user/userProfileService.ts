// User Profile Service: handles Firestore logic for user profile
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile } from './userTypes';

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(collection(db, 'users'), uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const ref = doc(collection(db, 'users'), uid);
  await setDoc(ref, data, { merge: true });
}
