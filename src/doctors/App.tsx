import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import AssistantVisits from "./pages/AssistantVisits";
import AssistantVisitDetails from "./pages/AssistantVisitDetails";
import Consultations from "./pages/Consultations";
import Reports from "./pages/Reports";
import Earnings from "./pages/Earnings";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import AIBot from "./pages/AIBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/appointments" element={<MainLayout><Appointments /></MainLayout>} />
          <Route path="/patients" element={<MainLayout><Patients /></MainLayout>} />
          <Route path="/patients/:patientId" element={<MainLayout><PatientProfile /></MainLayout>} />
          <Route path="/assistant-visits" element={<MainLayout><AssistantVisits /></MainLayout>} />
          <Route path="/assistant-visits/:id" element={<MainLayout><AssistantVisitDetails /></MainLayout>} />
          <Route path="/consultations" element={<MainLayout><Consultations /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/earnings" element={<MainLayout><Earnings /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="/ai-assistant" element={<MainLayout><AIBot /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
