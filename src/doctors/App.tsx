import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";

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
import DashboardPage from '../shared/pages/DashboardPage';
import { earnings } from './lib/mockData';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Navigate to="patients" replace />} />
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
        <Route path="dashboard" element={<MainLayout><DashboardPage title="Doctor Dashboard" summaryCards={<div>Summary Cards</div>} mainList={<div>Main List</div>} /></MainLayout>} />
        <Route path="assistant-visits" element={<MainLayout><AssistantVisits /></MainLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder for Assistant Visits
const AssistantVisits = () => (
  <div className="p-8 text-center text-welli-green">
    <h1 className="text-2xl font-bold mb-4">Assistant Visits</h1>
    <p>This is a placeholder page for Assistant Visits. Feature coming soon!</p>
  </div>
);

export default App;
