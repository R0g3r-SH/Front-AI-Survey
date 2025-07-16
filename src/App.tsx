
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Survey from "./pages/Survey";
import StandaloneSurvey from "./pages/StandaloneSurvey";
import DirectorDashboard from "./pages/DirectorDashboard";
import Responses from "./pages/Responses";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import AnalysisD from "./pages/AnalysisD";
import Recommendations from "./pages/Recommendations";
import RecommendationsD from "./pages/RecommendationsD";
import NotFound from "./pages/NotFound";
import ResponsesD from "./pages/ResponsesD";
import DashboardD from "./pages/DashboardD";
import BulkSurveySender from "./pages/BulkSurveySender";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/directores" element={<DirectorDashboard />} />
          <Route path="/cuestionario/:companyId/:tkn" element={<StandaloneSurvey />} />
          <Route path="/directores-responses" element={<ResponsesD/>} />
          <Route path="/directores-dashboard" element={<DashboardD />} />
          <Route path="/directores-analysis" element={<AnalysisD />} />
          <Route path="/directores-recommendations" element={<RecommendationsD />} />
          <Route path="/directores-envio-masivo" element={<BulkSurveySender />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
