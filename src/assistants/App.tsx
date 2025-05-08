import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import VisitsPage from '../shared/pages/VisitsPage';
import VisitDetailsPage from '../shared/pages/VisitDetailsPage';
import LearningHub from "./pages/LearningHub";
import ModuleDetails from "./pages/ModuleDetails";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import StartNavigation from "./pages/StartNavigation";
import MarkVisitComplete from "./pages/MarkVisitComplete";
import ViewAllLocations from "./pages/ViewAllLocations";
import FloatingChat from "./components/support/FloatingChat";
import { visits as visitsData } from './lib/mockData';
import EarningsPage from '../shared/pages/EarningsPage';
import EarningDetailsPage from '../shared/pages/EarningDetailsPage';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { earningsHistory } from './lib/mockData';

const queryClient = new QueryClient();

function SharedVisitsWrapper() {
  return (
    <VisitsPage
      visits={visitsData.map(v => ({
        id: v.id,
        patientName: v.patientData?.name || '',
        patientAge: v.patientData?.age,
        address: v.patientData?.address || '',
        time: v.visitData?.time || '',
        visitType: v.visitData?.type || '',
        isUrgent: v.visitData?.isUrgent,
        status: v.visitData?.status || '',
        onClickPath: `/assistants/visits/${v.id}`,
      }))}
      userType="assistant"
      navPrefix="assistants"
      showAge
      title="Scheduled Visits"
    />
  );
}

function SharedVisitDetailsWrapper() {
  const { id } = useParams();
  const visit = visitsData.find(v => v.id === id);
  return <VisitDetailsPage visit={visit} userType="assistant" backPath="/assistants/visits" />;
}

const AssistantDashboard = () => {
  // Example mock data
  const [summary] = useState({
    visits: 12,
    earnings: 4500,
    modules: 3,
    supportTickets: 1,
  });
  const [upcomingVisits] = useState([
    { patient: 'John Doe', time: '2024-06-10 10:00', type: 'Home Visit' },
    { patient: 'Jane Smith', time: '2024-06-11 14:00', type: 'Follow-up' },
    { patient: 'Alice Brown', time: '2024-06-12 09:00', type: 'Checkup' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Assistant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4"><div className="font-bold text-lg">{summary.visits}</div><div>Visits</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">₹{summary.earnings}</div><div>Earnings</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">{summary.modules}</div><div>Learning Modules</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">{summary.supportTickets}</div><div>Open Support Tickets</div></Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Visits</h2>
        <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
          {upcomingVisits.map((v: { patient: string; time: string; type: string }, i: number) => (
            <li key={i} className="p-4 flex justify-between items-center">
              <span className="font-medium">{v.patient}</span>
              <span className="text-sm text-gray-500">{v.type}</span>
              <span className="text-sm text-gray-400">{v.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route element={<Layout />}>
        <Route path="visits" element={<SharedVisitsWrapper />} />
        <Route path="visits/:id" element={<SharedVisitDetailsWrapper />} />
        <Route path="learning" element={<LearningHub />} />
        <Route path="learning/:id" element={<ModuleDetails />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="start-navigation" element={<StartNavigation />} />
        <Route path="mark-visit-complete" element={<MarkVisitComplete />} />
        <Route path="view-all-locations" element={<ViewAllLocations />} />
        <Route path="earnings" element={<EarningsPage earnings={earningsHistory} currency="₹" routePrefix="/assistants" fieldLabel="visitType" title="Earnings" />} />
        <Route path="earnings/:id" element={<EarningDetailsPage earnings={earningsHistory} currency="₹" fieldLabel="visitType" routePrefix="/assistants" />} />
        <Route path="dashboard" element={<AssistantDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FloatingChat />
  </QueryClientProvider>
);

export default App;
