
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import HotelDetail from "./pages/HotelDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import AuthConfirm from "./pages/AuthConfirm";
import TicketPage from "./pages/TicketPage";
import TicketDownloadPage from "./pages/TicketDownloadPage";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import FlightSearch from "./pages/FlightSearch";
import FlightDetail from "./pages/FlightDetail";
import FlightBooking from "./pages/FlightBooking";
import FlightResults from "./pages/FlightResults";
import CancellationPolicy from "./pages/CancellationPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import Accessibility from "./pages/Accessibility";
import CustomerService from "./pages/help/CustomerService";
import SafetySecurity from "./pages/help/SafetySecurity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/flights" element={<FlightSearch />} />
          <Route path="/flight-results" element={<FlightResults />} />
          <Route path="/flight/:flightId" element={<FlightDetail />} />
          <Route path="/flight-booking" element={<FlightBooking />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/help/customer-service" element={<CustomerService />} />
          <Route path="/help/safety-security" element={<SafetySecurity />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          <Route path="/ticket/:bookingId" element={<TicketPage />} />
          <Route path="/download-ticket/:bookingId" element={<TicketDownloadPage />} />
          {/* Handle both /auth/confirm and /confirm for email confirmation */}
          <Route path="/auth/confirm" element={<AuthConfirm />} />
          <Route path="/confirm" element={<AuthConfirm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
