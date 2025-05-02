// Firestore helpers for family account
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

export interface FamilyMember {
  userId: string;
  name: string;
  age: number;
  relation: string;
  healthData?: string;
  createdAt?: any;
}

export async function addFamilyMember(member: FamilyMember) {
  await addDoc(collection(db, "familyMembers"), { ...member, createdAt: Timestamp.now() });
}

export async function getFamilyForUser(userId: string): Promise<FamilyMember[]> {
  const q = query(collection(db, "familyMembers"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as FamilyMember);
}
