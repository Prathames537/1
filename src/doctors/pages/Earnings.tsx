import EarningsPage from '../../shared/pages/EarningsPage';
import { earnings } from '../lib/mockData';

export default function Earnings() {
  return (
    <EarningsPage 
      earnings={earnings}
      currency="₹"
      routePrefix="/doctors"
      fieldLabel="consultationType"
      title="Earnings"
    />
  );
}
