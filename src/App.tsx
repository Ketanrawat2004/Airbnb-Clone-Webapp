
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import HotelDetail from "./pages/HotelDetail";
import FlightSearch from "./pages/FlightSearch";
import FlightResults from "./pages/FlightResults";
import FlightDetail from "./pages/FlightDetail";
import FlightBooking from "./pages/FlightBooking";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import AboutUs from "./pages/AboutUs";
import BecomeHost from "./pages/BecomeHost";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import CancellationPolicy from "./pages/CancellationPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import Accessibility from "./pages/Accessibility";
import AuthConfirm from "./pages/AuthConfirm";
import TicketPage from "./pages/TicketPage";
import TicketDownloadPage from "./pages/TicketDownloadPage";
import NotFound from "./pages/NotFound";
import CustomerService from "./pages/help/CustomerService";
import SafetySecurity from "./pages/help/SafetySecurity";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAuth from "./pages/admin/AdminAuth";
import WebsiteAnalysis from "./pages/WebsiteAnalysis";
import TrainSearch from "./pages/TrainSearch";
import BusSearch from "./pages/BusSearch";
import BusResults from "./pages/BusResults";
import BusBooking from "./pages/BusBooking";
import TrainResults from "./pages/TrainResults";
import TrainBooking from "./pages/TrainBooking";
import Games from "./pages/Games";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/flight-results" element={<FlightResults />} />
            <Route path="/flight/:id" element={<FlightDetail />} />
            <Route path="/flight-booking" element={<FlightBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-canceled" element={<PaymentCanceled />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/become-host" element={<BecomeHost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/auth/confirm" element={<AuthConfirm />} />
            <Route path="/ticket/:bookingId" element={<TicketPage />} />
            <Route path="/ticket-download/:bookingId" element={<TicketDownloadPage />} />
            <Route path="/help/customer-service" element={<CustomerService />} />
            <Route path="/help/safety-security" element={<SafetySecurity />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/website-analysis" element={<WebsiteAnalysis />} />
          <Route path="/trains" element={<TrainSearch />} />
          <Route path="/buses" element={<BusSearch />} />
          <Route path="/bus-search" element={<BusSearch />} />
          <Route path="/bus-results" element={<BusResults />} />
          <Route path="/bus-booking" element={<BusBooking />} />
          <Route path="/train-results" element={<TrainResults />} />
          <Route path="/train-booking" element={<TrainBooking />} />
          <Route path="/games" element={<Games />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
