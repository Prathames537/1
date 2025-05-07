import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";

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
import VisitsPage from '../shared/pages/VisitsPage';
import VisitDetailsPage from '../shared/pages/VisitDetailsPage';
import { visits as visitsData } from './lib/mockData';

const queryClient = new QueryClient();

function SharedVisitsWrapper() {
  return (
    <VisitsPage
      visits={visitsData.map(v => ({
        id: v.id,
        patientName: v.patientName,
        patientAge: undefined,
        patientImage: v.patientImage,
        address: v.address,
        time: v.time,
        visitType: v.type,
        isUrgent: false,
        status: v.status,
        onClickPath: `/doctors/assistant-visits/${v.id}`,
        assistantName: v.assistant,
        showImage: true,
        showAssistant: true,
      }))}
      userType="doctor"
      navPrefix="doctors"
      showImage
      showAssistant
      title="Assistant Visits"
    />
  );
}

function SharedVisitDetailsWrapper() {
  const { id } = useParams();
  const visit = visitsData.find(v => v.id === id);
  return <VisitDetailsPage visit={visit} userType="doctor" backPath="/doctors/assistant-visits" />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/patients" replace />} />
          <Route path="/appointments" element={<MainLayout><Appointments /></MainLayout>} />
          <Route path="/patients" element={<MainLayout><Patients /></MainLayout>} />
          <Route path="/patients/:patientId" element={<MainLayout><PatientProfile /></MainLayout>} />
          <Route path="/consultations" element={<MainLayout><Consultations /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="/ai-assistant" element={<MainLayout><AIBot /></MainLayout>} />
          <Route path="/doctors/appointments/:id" element={<MainLayout><AppointmentDetails /></MainLayout>} />
          <Route path="/doctors/reports/:id" element={<MainLayout><ReportDetails /></MainLayout>} />
          <Route path="/doctors/consultations/:id" element={<MainLayout><ConsultationDetails /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
