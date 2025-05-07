import EarningsPage from '../../shared/pages/EarningsPage';
import { earningsHistory } from '../lib/mockData';

export default function Earnings() {
  return (
    <EarningsPage 
      earnings={earningsHistory}
      currency="$"
      routePrefix="/assistants"
      fieldLabel="visitType"
      title="Earnings Dashboard"
    />
  );
}
