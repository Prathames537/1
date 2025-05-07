import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const appointments = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '10:30 AM',
    type: 'video',
    status: 'upcoming',
    reason: 'Follow-up on blood pressure medication',
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    patientImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    time: '11:15 AM',
    type: 'chat',
    status: 'upcoming',
    reason: 'Medication refill request',
  },
  {
    id: '3',
    patientName: 'Emma Garcia',
    patientImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    time: '2:00 PM',
    type: 'video',
    status: 'upcoming',
    reason: 'Chronic headache consultation',
  },
];

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const appointment = appointments.find(a => a.id === id);
  if (!appointment) {
    return <div className="p-8 text-center text-red-500">Appointment not found.</div>;
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" size="icon" onClick={() => navigate('/appointments')}>
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