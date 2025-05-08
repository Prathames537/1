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
import EarningsPage from '../shared/pages/EarningsPage';
import EarningDetailsPage from '../shared/pages/EarningDetailsPage';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const queryClient = new QueryClient();

function SharedVisitsWrapper() {
  const [visits, setVisits] = useState<any[]>([]);
  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase.from('visits').select('*');
      if (!error) setVisits(data || []);
    };
    fetchVisits();
  }, []);
  return (
    <VisitsPage
      visits={visits.map(v => ({
        id: v.id,
        patientName: v.patient_name || '',
        patientAge: v.patient_age,
        address: v.address || '',
        time: v.time || '',
        visitType: v.visit_type || '',
        isUrgent: v.is_urgent,
        status: v.status || '',
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
  const [visit, setVisit] = useState<any>(null);
  useEffect(() => {
    const fetchVisit = async () => {
      const { data, error } = await supabase.from('visits').select('*').eq('id', id).single();
      if (!error) setVisit(data);
    };
    if (id) fetchVisit();
  }, [id]);
  return <VisitDetailsPage visit={visit} userType="assistant" backPath="/assistants/visits" />;
}

const AssistantDashboard = () => {
  const [summary] = useState({ visits: 0, earnings: 0, modules: 0, supportTickets: 0 });
  const [upcomingVisits] = useState<any[]>([]);
  useEffect(() => {
    // Fetch summary and upcoming visits from Supabase
    // Example: fetch visits, earnings, modules, support tickets
    // Set state accordingly
  }, []);
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

const App = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  useEffect(() => {
    const fetchEarnings = async () => {
      const { data, error } = await supabase.from('earnings').select('*');
      if (!error) setEarnings(data || []);
    };
    fetchEarnings();
  }, []);
  return (
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
          <Route path="earnings" element={<EarningsPage earnings={earnings} currency="₹" routePrefix="/assistants" fieldLabel="visitType" title="Earnings" />} />
          <Route path="earnings/:id" element={<EarningDetailsPage earnings={earnings} currency="₹" fieldLabel="visitType" routePrefix="/assistants" />} />
          <Route path="dashboard" element={<AssistantDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingChat />
    </QueryClientProvider>
  );
};

export default App;
