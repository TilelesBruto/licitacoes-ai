import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Analisador from "./pages/Analisador";
import Certidoes from "./pages/Certidoes";
import RadarRiscos from "./pages/RadarRiscos";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/analisador" element={<Analisador />} />
            <Route path="/certidoes" element={<Certidoes />} />
            <Route path="/radar" element={<RadarRiscos />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
