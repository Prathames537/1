import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { earningsHistory } from '../lib/mockData';

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