import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

const ConsultationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState<any>(null);
  useEffect(() => {
    const fetchConsultation = async () => {
      const { data, error } = await supabase.from('consultations').select('*').eq('id', id).single();
      if (!error) setConsultation(data);
    };
    if (id) fetchConsultation();
  }, [id]);
  if (!consultation) {
    return <div className="p-8 text-center text-red-500">Consultation not found.</div>;
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" size="icon" onClick={() => navigate('/doctors/consultations')}>
        Back to Consultations
      </Button>
      <h1 className="text-2xl font-bold">Consultation Details</h1>
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <img src={consultation.patientImage} alt={consultation.patientName} className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{consultation.patientName}</h2>
            <p className="text-welli-textSecondary">{consultation.type} • {consultation.date} • {consultation.time}</p>
            <p className="text-welli-textSecondary">Status: {consultation.status}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Symptoms</h3>
          <ul className="list-disc ml-6">
            {consultation.symptoms.map((symptom: any, i: number) => (
              <li key={i}>{symptom}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Diagnosis</h3>
          <p>{consultation.diagnosis}</p>
        </div>
        {consultation.prescription && (
          <div className="mt-4">
            <h3 className="font-medium">Prescription</h3>
            <ul className="list-disc ml-6">
              {consultation.prescription.medicines.map((med: any, i: number) => (
                <li key={i}>{med.name}: {med.dosage} for {med.duration}</li>
              ))}
            </ul>
            <p className="mt-2">{consultation.prescription.notes}</p>
          </div>
        )}
        <div className="mt-4">
          <h3 className="font-medium">Notes</h3>
          <p>{consultation.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetails; 