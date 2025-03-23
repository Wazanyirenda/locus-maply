
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
import Explore from "./pages/Explore";
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem('user');
    setIsLoggedIn(user !== null);
    setLoading(false);
  }, []);
  
  if (loading) {
    // Optional: Show a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
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
              <Route path="/explore" element={<Explore />} />
              
              {/* Protected Routes */}
              <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
              <Route path="/mapboard" element={<ProtectedRoute><Mapboard /></ProtectedRoute>} />
              <Route path="/mapboard/map" element={<ProtectedRoute><DashboardMap /></ProtectedRoute>} />
              <Route path="/contribute" element={<ProtectedRoute><Contribute /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Legacy routes - redirect to new names */}
              <Route path="/dashboard" element={<Navigate replace to="/mapboard" />} />
              <Route path="/dashboard/map" element={<Navigate replace to="/mapboard/map" />} />
              <Route path="/dashboard/leaderboard" element={<Navigate replace to="/mapboard" />} />
              
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
