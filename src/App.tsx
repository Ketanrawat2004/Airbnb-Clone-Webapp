
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import HotelDetail from "./pages/HotelDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import AuthConfirm from "./pages/AuthConfirm";
import TicketPage from "./pages/TicketPage";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                <Route path="/ticket/:bookingId" element={<TicketPage />} />
                {/* Handle both /auth/confirm and /confirm for email confirmation */}
                <Route path="/auth/confirm" element={<AuthConfirm />} />
                <Route path="/confirm" element={<AuthConfirm />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
