// Firestore user profile helpers
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  aadhaar: string;
  phone: string;
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  smoker?: boolean;
  chronicDiseases?: string[];
  // Add more health fields as needed
}

export async function createOrUpdateUserProfile(profile: UserProfile) {
  const ref = doc(db, "users", profile.uid);
  await setDoc(ref, profile, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserProfile;
  return null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
}
