// Firestore helpers for medicine orders
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

export interface MedicineOrder {
  userId: string;
  medicineName: string;
  quantity: number;
  price: string;
  createdAt?: any;
}

export async function orderMedicine(order: MedicineOrder) {
  await addDoc(collection(db, "medicineOrders"), { ...order, createdAt: Timestamp.now() });
}

export async function getMedicineOrdersForUser(userId: string): Promise<MedicineOrder[]> {
  const q = query(collection(db, "medicineOrders"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as MedicineOrder);
}
