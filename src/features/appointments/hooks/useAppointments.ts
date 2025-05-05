import { useState } from "react";
import { createAppointment } from "../appointmentsService";
// import { getAuth } from "firebase/auth";

import type { AppointmentForm } from '../appointmentsTypes';

export function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bookAppointment = async (form: AppointmentForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // const auth = getAuth();
      // const user = auth.currentUser;
      await createAppointment({
        userId: "guest",
        ...form,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return { bookAppointment, loading, error, success, setSuccess };
}
