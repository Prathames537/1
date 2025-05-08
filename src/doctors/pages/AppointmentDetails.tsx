import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single();
      if (!error) setAppointment(data);
    };
    if (id) fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <div className="p-8 text-center text-red-500">Appointment not found.</div>;
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" size="icon" onClick={() => navigate('/doctors/appointments')}>
        Back to Appointments
      </Button>
      <h1 className="text-2xl font-bold">Appointment Details</h1>
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <img src={appointment.patientImage} alt={appointment.patientName} className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{appointment.patientName}</h2>
            <p className="text-welli-textSecondary">{appointment.time} • {appointment.type}</p>
            <p className="text-welli-textSecondary">{appointment.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails; 