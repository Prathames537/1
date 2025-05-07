import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
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
import DashboardPage from '../shared/pages/DashboardPage';
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route element={<Layout />}>
          <Route path="/visits" element={<SharedVisitsWrapper />} />
          <Route path="/visits/:id" element={<SharedVisitDetailsWrapper />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/learning/:id" element={<ModuleDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/start-navigation" element={<StartNavigation />} />
          <Route path="/mark-visit-complete" element={<MarkVisitComplete />} />
          <Route path="/view-all-locations" element={<ViewAllLocations />} />
          <Route path="/earnings" element={<EarningsPage earnings={earningsHistory} currency="₹" routePrefix="/assistants" fieldLabel="visitType" title="Earnings" />} />
          <Route path="/earnings/:id" element={<EarningDetailsPage earnings={earningsHistory} currency="₹" fieldLabel="visitType" routePrefix="/assistants" />} />
          <Route path="/dashboard" element={<DashboardPage userType="assistant" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingChat />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
