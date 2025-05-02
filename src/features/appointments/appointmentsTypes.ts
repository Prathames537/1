// Appointments Types
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

export interface AppointmentForm {
  serviceType: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  description: string;
}
