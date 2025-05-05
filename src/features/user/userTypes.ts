// User Profile Types
export interface UserProfile {
  uid?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  photoURL?: string;
  [key: string]: any;
}

