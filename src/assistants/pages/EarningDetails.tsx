import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Copy the mock earningsHistory from Earnings.tsx
const earningsHistory = [
  { id: '1', date: 'May 15, 2025', patientName: 'John Doe', visitType: 'Blood Test', amount: 120, status: 'Paid' },
  { id: '2', date: 'May 15, 2025', patientName: 'Jane Smith', visitType: 'X-Ray', amount: 180, status: 'Paid' },
  { id: '3', date: 'May 14, 2025', patientName: 'Robert Johnson', visitType: 'Vitals Check', amount: 85, status: 'Paid' },
  { id: '4', date: 'May 13, 2025', patientName: 'Mary Williams', visitType: 'Blood Test', amount: 120, status: 'Paid' },
  { id: '5', date: 'May 12, 2025', patientName: 'David Brown', visitType: 'Vitals Check', amount: 85, status: 'Paid' },
];

const EarningDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const earning = earningsHistory.find(e => e.id === id);
  if (!earning) {
    return <div className="p-8 text-center text-red-500">Earning not found.</div>;
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" size="icon" onClick={() => navigate('/assistants/earnings')}>
        Back to Earnings
      </Button>
      <h1 className="text-2xl font-bold">Earning Details</h1>
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{earning.patientName}</h2>
            <p className="text-welli-textSecondary">{earning.visitType} • {earning.date}</p>
            <p className="text-welli-textSecondary">Amount: ${earning.amount}</p>
            <p className="text-welli-textSecondary">Status: {earning.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningDetails; 