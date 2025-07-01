
import { Toaster } from "@/components/ui/sonner";
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
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import TicketPage from "./pages/TicketPage";
import TicketDownloadPage from "./pages/TicketDownloadPage";
import Profile from "./pages/Profile";
import AuthConfirm from "./pages/AuthConfirm";
import AboutUs from "./pages/AboutUs";
import TermsOfService from "./pages/TermsOfService";
import Privacy from "./pages/Privacy";
import CookiesPolicy from "./pages/CookiesPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import Accessibility from "./pages/Accessibility";
import CustomerService from "./pages/help/CustomerService";
import SafetySecurity from "./pages/help/SafetySecurity";
import BecomeHost from "./pages/BecomeHost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/flights" element={<FlightSearch />} />
              <Route path="/flight-results" element={<FlightResults />} />
              <Route path="/flight/:id" element={<FlightDetail />} />
              <Route path="/flight-booking" element={<FlightBooking />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-canceled" element={<PaymentCanceled />} />
              <Route path="/ticket/:bookingId" element={<TicketPage />} />
              <Route path="/download-ticket/:bookingId" element={<TicketDownloadPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/confirm" element={<AuthConfirm />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="/cancellation" element={<CancellationPolicy />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/help/customer-service" element={<CustomerService />} />
              <Route path="/help/safety-security" element={<SafetySecurity />} />
              <Route path="/become-host" element={<BecomeHost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
