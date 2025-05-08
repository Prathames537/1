import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageCircle, Pill, FileText, User, Heart, Shield, AlertCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AIAssistant from '../components/patient/AIAssistant';
import { supabase } from '@/lib/supabaseClient';

const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  
  useEffect(() => {
    const fetchPatient = async () => {
      const { data, error } = await supabase.from('patients').select('*').eq('id', patientId).single();
      if (!error) setPatient(data);
    };
    if (patientId) fetchPatient();
  }, [patientId]);
  
  if (!patient) return <div>Patient not found.</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/doctors/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-welli-gray-800">Patient Profile</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar size={16} /> Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle size={16} /> Message
          </Button>
          <Button 
            className="gap-2 bg-welli-green hover:bg-welli-dark-green text-welli-gray-800"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            <Bot size={16} />
            {showAIAssistant ? 'Hide AI Assistant' : 'AI Assistant'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
              </div>
              
              <h2 className="text-xl font-bold text-welli-gray-800">{patient.name}</h2>
              <p className="text-welli-gray-600">{patient.age} years • {patient.gender}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-welli-light-green text-welli-accent-green border-none">
                  {patient.condition}
                </Badge>
                
                {patient.insuranceProvider === 'Welli Health' && (
                  <Badge className="bg-green-100 text-green-800 border-none">Welli Insured</Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-welli-accent-green" />
                <div>
                  <p className="font-medium">Date of Birth</p>
                  <p className="text-welli-gray-600">{patient.birthdate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <MessageCircle size={16} className="text-welli-accent-green" />
                <div>
                  <p className="font-medium">Contact Information</p>
                  <p className="text-welli-gray-600">{patient.phone}</p>
                  <p className="text-welli-gray-600">{patient.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <FileText size={16} className="text-welli-accent-green" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-welli-gray-600">{patient.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Shield size={16} className="text-welli-accent-green" />
                <div>
                  <p className="font-medium">Insurance</p>
                  <p className="text-welli-gray-600">{patient.insuranceProvider}</p>
                  <p className="text-welli-gray-600">Policy: {patient.insuranceNumber}</p>
                  
                  {!patient.lifeInsurance && (
                    <div className="mt-2">
                      <Button size="sm" className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800 text-xs">
                        Recommend Life Insurance
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle size={16} className="text-welli-accent-green" />
                <div>
                  <p className="font-medium">Emergency Contact</p>
                  <p className="text-welli-gray-600">{patient.emergencyContact}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-xl shadow-card p-6">
            <h3 className="font-medium text-lg mb-4">Latest Vitals</h3>
            
            <div className="space-y-3">
              {patient.vitals?.slice(0, 3).map((vital: any, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-md ${
                    vital.status === 'normal' 
                      ? 'bg-welli-light-green' 
                      : vital.status === 'elevated'
                      ? 'bg-yellow-50'
                      : 'bg-red-50'
                  }`}
                >
                  <div>
                    <p className="font-medium">{vital.type}</p>
                    <p className="text-sm text-welli-gray-600">{vital.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      vital.status === 'normal'
                        ? 'text-welli-accent-green'
                        : vital.status === 'elevated'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {vital.value} {vital.unit}
                    </p>
                    <p className="text-xs text-welli-gray-600 capitalize">{vital.status}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-2">View All Vitals</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {showAIAssistant && (
            <AIAssistant patient={patient} onClose={() => setShowAIAssistant(false)} />
          )}
          
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <Tabs defaultValue="medical-history">
              <div className="border-b border-welli-gray-200">
                <TabsList className="px-5 pt-3">
                  <TabsTrigger value="medical-history">Medical History</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="family-history">Family History</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="medical-history" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Medical Records</h3>
                  <Button size="sm" variant="outline">Add Record</Button>
                </div>
                
                <div className="space-y-4">
                  {patient.medicalRecords?.map((record: any, idx: number) => (
                    <div key={idx} className="border border-welli-gray-200 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {record.type === 'visit' ? (
                          <Calendar size={18} className="text-welli-accent-green" />
                        ) : record.type === 'test' ? (
                          <FileText size={18} className="text-blue-500" />
                        ) : (
                          <Heart size={18} className="text-red-500" />
                        )}
                        <h4 className="font-medium">{record.title}</h4>
                      </div>
                      
                      <p className="text-sm text-welli-gray-500 mb-2">{record.date}</p>
                      <p className="text-welli-gray-700">{record.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="prescriptions" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Current Medications</h3>
                  <Button size="sm" className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                    <Pill size={16} className="mr-1" /> New Prescription
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {patient.prescriptions?.map((prescription: any, idx: number) => (
                    <div key={idx} className="border border-welli-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{prescription.name} {prescription.dosage}</h4>
                            {prescription.active && (
                              <Badge className="bg-welli-light-green text-welli-accent-green border-none">Active</Badge>
                            )}
                          </div>
                          <p className="text-sm text-welli-gray-600 mt-1">
                            {prescription.frequency}
                          </p>
                          <p className="text-sm text-welli-gray-600">
                            Started: {prescription.startDate} • {prescription.endDate === 'Ongoing' ? 'Ongoing' : `Until: ${prescription.endDate}`}
                          </p>
                          {prescription.notes && (
                            <p className="text-sm text-welli-gray-700 mt-2 bg-welli-gray-100 p-2 rounded">
                              {prescription.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline" className="text-red-500">Discontinue</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="family-history" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Family Medical History</h3>
                  <Button size="sm" variant="outline">Add Family Member</Button>
                </div>
                
                <div className="space-y-4">
                  {patient.familyHistory?.map((member: any, idx: number) => (
                    <div key={idx} className="border border-welli-gray-200 rounded-md p-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <User size={16} />
                        {member.relationship}
                        {member.age && <span className="text-welli-gray-600">• {member.age} years</span>}
                        {member.deceased && <Badge variant="outline" className="ml-2">Deceased</Badge>}
                      </h4>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium text-welli-gray-700">Health Conditions:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.healthConditions.map((condition: any, i: number) => (
                            <Badge key={i} variant="secondary">{condition}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Genetic Predisposition Alert</h4>
                      <p className="text-sm">
                        Patient has family history of heart disease and diabetes. 
                        Recommend preventative screening and lifestyle counseling.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Patient Documents</h3>
                  <Button size="sm" variant="outline">Upload Document</Button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-12 text-welli-gray-500">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <Button className="mt-4 bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                    Upload document
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
