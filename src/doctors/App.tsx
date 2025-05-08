import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

import MainLayout from "./components/layout/MainLayout";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Consultations from "./pages/Consultations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import AIBot from "./pages/AIBot";
import NotFound from "./pages/NotFound";
import AppointmentDetails from "./pages/AppointmentDetails";
import ReportDetails from "./pages/ReportDetails";
import ConsultationDetails from "./pages/ConsultationDetails";
import EarningsPage from '../shared/pages/EarningsPage';
import EarningDetailsPage from '../shared/pages/EarningDetailsPage';

const queryClient = new QueryClient();

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="appointments" element={<MainLayout><Appointments /></MainLayout>} />
          <Route path="patients" element={<MainLayout><Patients /></MainLayout>} />
          <Route path="patients/:patientId" element={<MainLayout><PatientProfile /></MainLayout>} />
          <Route path="consultations" element={<MainLayout><Consultations /></MainLayout>} />
          <Route path="reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="ai-assistant" element={<MainLayout><AIBot /></MainLayout>} />
          <Route path="doctors/appointments/:id" element={<MainLayout><AppointmentDetails /></MainLayout>} />
          <Route path="doctors/reports/:id" element={<MainLayout><ReportDetails /></MainLayout>} />
          <Route path="doctors/consultations/:id" element={<MainLayout><ConsultationDetails /></MainLayout>} />
          <Route path="earnings" element={<MainLayout><EarningsPage earnings={earnings} currency="₹" routePrefix="/doctors" fieldLabel="consultationType" title="Earnings" /></MainLayout>} />
          <Route path="earnings/:id" element={<MainLayout><EarningDetailsPage earnings={earnings} currency="₹" fieldLabel="consultationType" routePrefix="/doctors" /></MainLayout>} />
          <Route path="dashboard" element={<MainLayout><DoctorDashboard /></MainLayout>} />
          <Route path="assistant-visits" element={<MainLayout><AssistantVisits /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AssistantVisits = () => {
  const [visits, setVisits] = useState<any[]>([]);
  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase.from('visits').select('*');
      if (!error) setVisits(data || []);
    };
    fetchVisits();
  }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Assistant Visits</h1>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="p-4 text-left">Patient</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v: any, i: number) => (
            <tr key={i} className="border-t">
              <td className="p-4 font-medium">{v.patient_name}</td>
              <td className="p-4">{v.visit_date}</td>
              <td className="p-4">{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DoctorDashboard = () => {
  const [summary] = useState({ patients: 0, appointments: 0, earnings: 0, reports: 0 });
  const [recentPatients] = useState<any[]>([]);
  useEffect(() => {
    // Fetch summary and recent patients from Supabase
    // Set state accordingly
  }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4"><div className="font-bold text-lg">{summary.patients}</div><div>Patients</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">{summary.appointments}</div><div>Appointments</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">₹{summary.earnings}</div><div>Earnings</div></Card>
        <Card className="p-4"><div className="font-bold text-lg">{summary.reports}</div><div>Reports</div></Card>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Patients</h2>
        <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
          {recentPatients.map((p: any, i: number) => (
            <li key={i} className="p-4 flex justify-between items-center">
              <span className="font-medium">{p.name}</span>
              <span className="text-sm text-gray-500">{p.condition}</span>
              <span className="text-sm text-gray-400">Last visit: {p.lastVisit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
