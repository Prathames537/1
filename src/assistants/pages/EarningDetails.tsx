import EarningDetailsPage from '../../shared/pages/EarningDetailsPage';
import { earningsHistory } from '../lib/mockData';

export default function EarningDetails() {
  return (
    <EarningDetailsPage 
      earnings={earningsHistory}
      currency="$"
      fieldLabel="visitType"
      routePrefix="/assistants"
    />
  );
} 