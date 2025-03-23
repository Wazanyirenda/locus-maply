
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/hooks/useTheme";

// Pages
import Index from "./pages/Index";
import Map from "./pages/Map";
import Mapboard from "./pages/Mapboard";
import DashboardMap from "./pages/DashboardMap";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contribute from "./pages/Contribute";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple auth check component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // This would be replaced with a proper auth check
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);
  
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
              <Route path="/mapboard" element={<ProtectedRoute><Mapboard /></ProtectedRoute>} />
              <Route path="/mapboard/map" element={<ProtectedRoute><DashboardMap /></ProtectedRoute>} />
              <Route path="/contribute" element={<ProtectedRoute><Contribute /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Legacy routes - redirect to new names */}
              <Route path="/dashboard" element={<Navigate replace to="/mapboard" />} />
              <Route path="/dashboard/map" element={<Navigate replace to="/mapboard/map" />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
