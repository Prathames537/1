import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookAppointment from "./pages/BookAppointment";
import OrderMedicines from "./pages/OrderMedicines";
import CheckInsurance from "./pages/CheckInsurance";
import HomeServices from "./pages/HomeServices";
import Login from "./pages/Login";
import TutorialPage from "./pages/TutorialPage";
import AssistantDetailsPage from "./pages/AssistantDetailsPage";
import DoctorConsultationPage from "./pages/DoctorConsultationPage";
import TreatmentPlanPage from "./pages/TreatmentPlanPage";
import FreeTrialBookingPage from "./pages/FreeTrialBookingPage";
import FamilyAccountPage from "./pages/FamilyAccountPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminPanelPage from "./pages/AdminPanelPage";
import NotificationsPage from "./pages/NotificationsPage";
import FeedbackPage from "./pages/FeedbackPage";
import DocumentsPage from "./pages/DocumentsPage";
import EmergencyServicesPage from "./pages/EmergencyServicesPage";
import RemindersPage from "./pages/RemindersPage";
import EmergencyHelpPage from "./pages/EmergencyHelpPage";
import BloodBankPage from "./pages/BloodBankPage";
import OrganRepositoryPage from "./pages/OrganRepositoryPage";
import Chatbot from "./pages/Chatbot";
import AssistantsApp from "./assistants/App";
import DoctorsApp from "./doctors/App";
import AssistantAIPage from "./pages/AssistantAIPage";
import InsuranceAIPage from "./pages/InsuranceAIPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Consider data fresh for 1 minute
      retry: 1, // Only retry failed requests once
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" expand={true} closeButton />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/order-medicines" element={<OrderMedicines />} />
          <Route path="/check-insurance" element={<CheckInsurance />} />
          <Route path="/home-services" element={<HomeServices />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-to-book" element={<TutorialPage />} />
          <Route path="/assistant-details" element={<AssistantDetailsPage />} />
          <Route path="/doctor-consultation" element={<DoctorConsultationPage />} />
          <Route path="/treatment-plan" element={<TreatmentPlanPage />} />
          <Route path="/book-free-trial" element={<FreeTrialBookingPage />} />
          <Route path="/family-account" element={<FamilyAccountPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/emergency" element={<EmergencyServicesPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/emergency-help" element={<EmergencyHelpPage />} />
          <Route path="/blood-bank" element={<BloodBankPage />} />
          <Route path="/organ-repository" element={<OrganRepositoryPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/assistants/*" element={<AssistantsApp />} />
          <Route path="/doctors/*" element={<DoctorsApp />} />
          <Route path="/assistant-ai" element={<AssistantAIPage />} />
          <Route path="/insurance-ai" element={<InsuranceAIPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
