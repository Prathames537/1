import React, { useState } from 'react';
import { Search, Filter, FileText, Calendar, MessageSquare, Video, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  image: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  recordCount: number;
  insuranceProvider?: string;
}

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  const navigate = useNavigate();
  
  return (
    <div className="welli-card hover:shadow-lg border-2 border-transparent hover:border-welli-green transition-shadow cursor-pointer group"
      onClick={() => navigate(`/patients/${patient.id}`)}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-welli-green bg-white group-hover:scale-105 transition">
          <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-welli-green group-hover:underline transition">{patient.name}</h4>
          <p className="text-sm text-welli-gray-600">{patient.age} years • {patient.gender}</p>
          <p className="text-sm text-welli-gray-500">Last visit: {patient.lastVisit}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge badge-green">{patient.condition}</span>
            <span className="badge badge-gray">{patient.recordCount} records</span>
            {patient.insuranceProvider === "Welli Health" && (
              <span className="badge badge-blue">Welli Insured</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-welli-green text-welli-green">
              <FileText size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-welli-green text-welli-green">
              <Calendar size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-welli-accent-green text-welli-green">
              <MessageSquare size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-welli-accent-green text-welli-green">
              <Video size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientDetail: React.FC<{ patient: Patient }> = ({ patient }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-welli-gray-800">{patient.name}</h2>
          <p className="text-welli-gray-600">{patient.age} years • {patient.gender}</p>
          <p className="text-welli-gray-500">Last visit: {patient.lastVisit}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="badge badge-green">{patient.condition}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mb-4">
        <Button 
          className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800"
          onClick={() => navigate(`/patients/${patient.id}`)}
        >
          View Full Profile
        </Button>
        <Button variant="outline">Schedule Appointment</Button>
      </div>
      
      <Tabs defaultValue="records">
        <TabsList className="mb-4">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="space-y-4">
          <div className="welli-card">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-welli-accent-green" />
              <div>
                <h4 className="font-medium text-welli-gray-800">Regular check-up</h4>
                <p className="text-sm text-welli-gray-600">March 15, 2023</p>
              </div>
            </div>
            <div className="mt-3 border-t border-welli-gray-200 pt-3">
              <p className="text-sm text-welli-gray-700">
                Patient reported mild persistent headaches. BP: 120/80, Heart rate: 72 bpm.
                Prescribed ibuprofen as needed. Follow-up in two weeks if symptoms persist.
              </p>
            </div>
          </div>
          
          <div className="welli-card">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-welli-accent-green" />
              <div>
                <h4 className="font-medium text-welli-gray-800">Blood test results</h4>
                <p className="text-sm text-welli-gray-600">February 28, 2023</p>
              </div>
            </div>
            <div className="mt-3 border-t border-welli-gray-200 pt-3">
              <p className="text-sm text-welli-gray-700">
                Complete blood count within normal range. Cholesterol slightly elevated at 215 mg/dL.
                Recommended dietary changes and increased physical activity.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prescriptions" className="space-y-4">
          <div className="welli-card">
            <div className="flex items-center gap-3">
              <Pill size={18} className="text-welli-accent-green" />
              <div>
                <h4 className="font-medium text-welli-gray-800">Ibuprofen 200mg</h4>
                <p className="text-sm text-welli-gray-600">Prescribed on March 15, 2023</p>
              </div>
            </div>
            <div className="mt-3 border-t border-welli-gray-200 pt-3">
              <p className="text-sm text-welli-gray-700">
                Take 1-2 tablets every 6 hours as needed for pain. Do not exceed 6 tablets in 24 hours.
                Take with food or milk to reduce stomach upset.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="flex flex-col items-center justify-center py-12 text-welli-gray-500">
            <FileText size={48} className="mb-4 opacity-50" />
            <p>No documents uploaded yet</p>
            <Button className="mt-4 bg-welli-green hover:bg-welli-dark-green text-welli-accent-green">
              Upload document
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notes">
          <div className="flex flex-col items-center justify-center py-12 text-welli-gray-500">
            <MessageSquare size={48} className="mb-4 opacity-50" />
            <p>No notes added yet</p>
            <Button className="mt-4 bg-welli-green hover:bg-welli-dark-green text-welli-accent-green">
              Add note
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      age: 42,
      gender: 'Female',
      lastVisit: 'March 15, 2023',
      condition: 'Hypertension',
      recordCount: 8,
      insuranceProvider: 'Welli Health',
    },
    {
      id: '2',
      name: 'Robert Chen',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
      age: 56,
      gender: 'Male',
      lastVisit: 'March 10, 2023',
      condition: 'Type 2 Diabetes',
      recordCount: 12,
      insuranceProvider: 'Blue Cross',
    },
    {
      id: '3',
      name: 'Emma Garcia',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      age: 29,
      gender: 'Female',
      lastVisit: 'March 5, 2023',
      condition: 'Migraine',
      recordCount: 5,
      insuranceProvider: 'None',
    },
    {
      id: '4',
      name: 'Michael Wilson',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      age: 68,
      gender: 'Male',
      lastVisit: 'February 28, 2023',
      condition: 'Arthritis',
      recordCount: 15,
      insuranceProvider: 'Medicare',
    },
    {
      id: '5',
      name: 'Olivia Martinez',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      age: 35,
      gender: 'Female',
      lastVisit: 'February 25, 2023',
      condition: 'Asthma',
      recordCount: 7,
      insuranceProvider: 'Aetna',
    },
  ];
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Patient Records</h1>
        <p className="text-welli-gray-600">Access and manage your patient records</p>
      </div>
      
      {selectedPatient ? (
        <div>
          <Button 
            variant="outline" 
            className="mb-4" 
            onClick={() => setSelectedPatient(null)}
          >
            ← Back to patient list
          </Button>
          <PatientDetail patient={selectedPatient} />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-gray-500" size={18} />
                <Input 
                  placeholder="Search by name, condition, or ID..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
              <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-accent-green">
                Add new patient
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <div key={patient.id} onClick={() => navigate(`/patients/${patient.id}`)} className="cursor-pointer">
                <PatientCard patient={patient} />
              </div>
            ))}
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-12 text-welli-gray-500">
                <p>No patients found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
