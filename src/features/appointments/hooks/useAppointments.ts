import { useState } from "react";
import { createAppointment } from "../appointmentsService";
// import { getAuth } from "firebase/auth";

export function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bookAppointment = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createAppointment({ patient_id: '', doctor_id: '', appointment_date: '' });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return { bookAppointment, loading, error, success, setSuccess };
}
