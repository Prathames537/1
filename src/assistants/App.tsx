import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Visits from "./pages/Visits";
import VisitDetails from "./pages/VisitDetails";
import Earnings from "./pages/Earnings";
import LearningHub from "./pages/LearningHub";
import ModuleDetails from "./pages/ModuleDetails";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import StartNavigation from "./pages/StartNavigation";
import MarkVisitComplete from "./pages/MarkVisitComplete";
import ViewAllLocations from "./pages/ViewAllLocations";
import FloatingChat from "./components/support/FloatingChat";
import EarningDetails from "./pages/EarningDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visits" element={<Visits />} />
          <Route path="/visits/:id" element={<VisitDetails />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/earnings/:id" element={<EarningDetails />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/learning/:id" element={<ModuleDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/start-navigation" element={<StartNavigation />} />
          <Route path="/mark-visit-complete" element={<MarkVisitComplete />} />
          <Route path="/view-all-locations" element={<ViewAllLocations />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingChat />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
