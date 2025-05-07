import EarningDetailsPage from '../../shared/pages/EarningDetailsPage';
import { earnings } from '../lib/mockData';

export default function EarningDetails() {
  return (
    <EarningDetailsPage 
      earnings={earnings}
      currency="₹"
      fieldLabel="consultationType"
      routePrefix="/doctors"
    />
  );
} 