import { useState } from 'react';
import { Calendar, Users, FileText, Video, MessageCircle, Stethoscope, PenLine } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import AlertItem from '@/components/dashboard/AlertItem';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Sample data with prescription visibility
  const upcomingAppointments = [
    {
      patientName: 'Sarah Johnson',
      time: 'Today, 10:30 AM',
      type: 'video' as const,
      reason: 'Follow-up on blood pressure medication',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      patientId: '1',
      hasPrescription: true,
    },
    {
      patientName: 'Robert Chen',
      time: 'Today, 11:15 AM',
      type: 'chat' as const,
      reason: 'Medication refill request',
      imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
      patientId: '2',
      hasPrescription: false,
    },
    {
      patientName: 'Emma Garcia',
      time: 'Today, 2:00 PM',
      type: 'video' as const,
      reason: 'Chronic headache consultation',
      imageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
      patientId: '3',
      hasPrescription: true,
    },
  ];

  const alerts = [
    {
      title: 'Blood test results: Maria Lopez',
      message: 'Abnormal hemoglobin levels detected. Review required.',
      time: '15 minutes ago',
      priority: 'urgent' as const,
    },
    {
      title: 'Follow-up needed: James Wilson',
      message: 'Patient has not confirmed medication adherence in 5 days',
      time: '2 hours ago',
      priority: 'warning' as const,
    },
    {
      title: 'New patient records uploaded',
      message: '3 new patient records have been added to your list',
      time: 'Yesterday, 4:30 PM',
      priority: 'normal' as const,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-green">Dashboard</h1>
        <p className="text-welli-gray-700">Welcome back, Dr. Alex. Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Today's Appointments" 
          value={8} 
          change={{ value: '2 more', positive: true }}
          icon={<Calendar size={20} className="text-welli-green" />}
        />
        <StatsCard 
          title="Active Patients" 
          value={142}
          change={{ value: '12%', positive: true }}
          icon={<Users size={20} className="text-welli-green" />}
        />
        <StatsCard 
          title="Pending Prescriptions" 
          value={4}
          change={{ value: '1 more', positive: true }}
          icon={<FileText size={20} className="text-welli-green" />}
        />
        <StatsCard 
          title="Assistant Visits" 
          value={5}
          change={{ value: '1 less', positive: false }}
          icon={<Stethoscope size={20} className="text-welli-green" />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-welli-green">Upcoming Appointments</h3>
              <button
                className="text-sm text-welli-green font-semibold hover:underline hover:text-welli-accent-green transition"
                onClick={() => navigate('/appointments')}
                tabIndex={0}
                aria-label="View all appointments"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, i) => (
                <AppointmentCard
                  key={i}
                  {...appointment}
                  onClick={() => navigate(`/patients/${appointment.patientId}`)}
                  hasPrescription={appointment.hasPrescription}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <QuickActionCard 
              title="Start Video Consult" 
              icon={<Video size={20} className="text-welli-green" />} 
              onClick={() => navigate('/appointments')}
            />
            <QuickActionCard 
              title="Open Chat" 
              icon={<MessageCircle size={20} className="text-welli-accent-green" />} 
              onClick={() => navigate('/appointments')}
            />
            <QuickActionCard 
              title="Create Prescription" 
              icon={<FileText size={20} className="text-welli-accent-green" />} 
              onClick={() => navigate('/reports')}
            />
            <QuickActionCard 
              title="Add Medical Note" 
              icon={<PenLine size={20} className="text-welli-green" />} 
              onClick={() => navigate('/reports')}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-welli-green">Alerts & Notifications</h3>
            <button
              className="text-sm text-welli-green hover:underline"
              onClick={() => navigate('/notifications')}
            >
              View all
            </button>
          </div>
          <div>
            {alerts.map((alert, i) => (
              <AlertItem key={i} {...alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

