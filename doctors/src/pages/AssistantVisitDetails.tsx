import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, MapPin, Phone, Mail, FileText, CheckCircle, MessageCircle, Video, Pill, Heart, Shield, AlertCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VisitDetails {
  id: string;
  patientName: string;
  patientImage: string;
  address: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'initial' | 'follow-up' | 'emergency';
  assistant: string;
  assistantImage: string;
  patientContact: {
    phone: string;
    email: string;
  };
  notes: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenLevel: string;
  };
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
}

// Mock data - in a real app, this would come from an API
const visitDetails: VisitDetails = {
  id: '1',
  patientName: 'Sarah Johnson',
  patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  address: '123 Main St, Apt 4B, New York, NY 10001',
  date: '2024-03-15',
  time: '10:30 AM',
  status: 'scheduled',
  type: 'follow-up',
  assistant: 'Dr. Emily Chen',
  assistantImage: 'https://randomuser.me/api/portraits/women/68.jpg',
  patientContact: {
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@example.com',
  },
  notes: 'Patient requires follow-up visit to monitor blood pressure medication effectiveness. Previous readings were slightly elevated.',
  vitals: {
    bloodPressure: '130/85 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    oxygenLevel: '98%',
  },
  medications: [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
    },
    {
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
    },
  ],
};

const AssistantVisitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: VisitDetails['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/assistant-visits')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold text-welli-gray-800">Visit Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="welli-card">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={visitDetails.patientImage} alt={visitDetails.patientName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-welli-gray-800">{visitDetails.patientName}</h2>
                  <Badge className={getStatusColor(visitDetails.status)}>{visitDetails.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-welli-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{visitDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{visitDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{visitDetails.assistant}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-welli-gray-500 mt-1">
                  <MapPin size={14} />
                  <span>{visitDetails.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-welli-gray-500" />
                <span className="text-welli-gray-600">{visitDetails.patientContact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-welli-gray-500" />
                <span className="text-welli-gray-600">{visitDetails.patientContact.email}</span>
              </div>
            </div>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Visit Notes</h3>
            <p className="text-welli-gray-600">{visitDetails.notes}</p>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Vitals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-welli-gray-500">Blood Pressure</p>
                <p className="font-medium text-welli-gray-800">{visitDetails.vitals.bloodPressure}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-welli-gray-500">Heart Rate</p>
                <p className="font-medium text-welli-gray-800">{visitDetails.vitals.heartRate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-welli-gray-500">Temperature</p>
                <p className="font-medium text-welli-gray-800">{visitDetails.vitals.temperature}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-welli-gray-500">Oxygen Level</p>
                <p className="font-medium text-welli-gray-800">{visitDetails.vitals.oxygenLevel}</p>
              </div>
            </div>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Current Medications</h3>
            <div className="space-y-4">
              {visitDetails.medications.map((medication, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-welli-light-green/10 rounded-lg">
                  <div>
                    <p className="font-medium text-welli-gray-800">{medication.name}</p>
                    <p className="text-sm text-welli-gray-600">{medication.dosage} - {medication.frequency}</p>
                  </div>
                  <CheckCircle className="text-welli-green" size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Assistant Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={visitDetails.assistantImage} alt={visitDetails.assistant} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-welli-gray-800">{visitDetails.assistant}</p>
                <p className="text-sm text-welli-gray-600">Medical Assistant</p>
              </div>
            </div>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Actions</h3>
            <div className="space-y-2">
              <Button className="w-full bg-welli-green hover:bg-welli-dark-green text-white">
                Start Visit
              </Button>
              <Button variant="outline" className="w-full">
                Reschedule
              </Button>
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                Cancel Visit
              </Button>
            </div>
          </div>

          <div className="welli-card">
            <h3 className="text-lg font-semibold text-welli-gray-800 mb-4">Documents</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText size={16} /> View Previous Reports
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText size={16} /> Download Visit Summary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantVisitDetails; 