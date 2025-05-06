import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MessageCircle, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  patientName: string;
  patientImage: string;
  time: string;
  type: 'video' | 'chat';
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
}

const appointments: Appointment[] = [
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

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const navigate = useNavigate();

  return (
    <div className="welli-card flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
         onClick={() => navigate(`/patients/${appointment.id}`)}>
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={appointment.patientImage} alt={appointment.patientName} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-welli-gray-800">{appointment.patientName}</h3>
          <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
            {appointment.status}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-welli-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-1">
            {appointment.type === 'video' ? <Video size={14} /> : <MessageCircle size={14} />}
            <span>{appointment.type === 'video' ? 'Video Call' : 'Chat'}</span>
          </div>
        </div>
        <p className="text-sm text-welli-gray-500 mt-1">{appointment.reason}</p>
      </div>
      <Button className="bg-welli-green hover:bg-welli-dark-green text-white">
        {appointment.type === 'video' ? 'Join Call' : 'Start Chat'}
      </Button>
    </div>
  );
};

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-welli-gray-800">Appointments</h1>
          <p className="text-welli-gray-600">Manage your upcoming appointments</p>
        </div>
        <Button className="bg-welli-green hover:bg-welli-dark-green text-white">
          <Plus size={16} className="mr-2" /> New Appointment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-gray-500" size={18} />
          <Input 
            placeholder="Search appointments..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <div className="welli-card">
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-welli-green mx-auto mb-4" />
                <h3 className="text-lg font-medium text-welli-gray-800 mb-2">No appointments found</h3>
                <p className="text-welli-gray-600">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">Today's Appointments</span>
                <span className="font-medium text-welli-gray-800">{appointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">Video Calls</span>
                <span className="font-medium text-welli-gray-800">
                  {appointments.filter(a => a.type === 'video').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-welli-gray-600">Chat Consultations</span>
                <span className="font-medium text-welli-gray-800">
                  {appointments.filter(a => a.type === 'chat').length}
                </span>
              </div>
            </div>
          </div>
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Calendar</h2>
            <div className="text-center text-welli-gray-600">
              <Calendar className="w-6 h-6 text-welli-green mx-auto mb-2" />
              <p>Calendar integration coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
