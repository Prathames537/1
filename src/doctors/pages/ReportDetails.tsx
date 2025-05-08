import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase.from('reports').select('*').eq('id', id).single();
      if (!error) setReport(data);
    };
    if (id) fetchReport();
  }, [id]);
  if (!report) return <div>Report not found.</div>;
  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" size="icon" onClick={() => navigate('/doctors/reports')}>
        Back to Reports
      </Button>
      <h1 className="text-2xl font-bold">Report Details</h1>
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <img src={report.patientImage} alt={report.patientName} className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{report.patientName}</h2>
            <p className="text-welli-textSecondary">{report.type.replace('_', ' ').toUpperCase()} • {report.date}</p>
            <p className="text-welli-textSecondary">Status: {report.status}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Results</h3>
          <ul className="list-disc ml-6">
            {report.results.map((result: any, i: number) => (
              <li key={i}>{result.name}: {result.value} {result.unit} (Normal: {result.normalRange})</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Notes</h3>
          <p>{report.notes}</p>
        </div>
        {report.fileUrl && (
          <div className="mt-4">
            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-welli-green underline">Download Report</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetails; 