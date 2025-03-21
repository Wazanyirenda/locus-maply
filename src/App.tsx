
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, ReactNode, useState } from "react";

// Pages
import Index from "./pages/Index";
import Map from "./pages/Map";
import Mapboard from "./pages/Mapboard";
import DashboardMap from "./pages/DashboardMap";
import Admin from "./pages/Admin";
import AdminMap from "./pages/AdminMap";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contribute from "./pages/Contribute";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Mock authentication state - replace with actual auth state when implemented
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  
  return { isLoggedIn, login, logout };
};

// Route observer to handle tab query parameters
const RouteObserver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // After successful login, check if there's a return path
    const returnTo = sessionStorage.getItem('returnTo');
    if (returnTo && location.pathname === '/auth/login' && window.isLoggedIn) {
      sessionStorage.removeItem('returnTo');
      navigate(returnTo);
    }
  }, [location, navigate]);
  
  return null;
};

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  if (!isLoggedIn) {
    // Redirect to login page with return URL
    return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  // Always set dark mode as default on initial load
  useEffect(() => {
    // Force dark mode regardless of user's system preference
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // For demo purposes - simulate authentication
    // In a real app, this would come from a proper auth system
    window.isLoggedIn = false;
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteObserver />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
            <Route path="/contribute" element={<ProtectedRoute><Contribute /></ProtectedRoute>} />
            <Route path="/mapboard" element={<ProtectedRoute><Mapboard /></ProtectedRoute>} />
            <Route path="/mapboard/map" element={<ProtectedRoute><DashboardMap /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/admin/map" element={<ProtectedRoute><AdminMap /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/submissions" element={<ProtectedRoute><AdminSubmissions /></ProtectedRoute>} />
            
            {/* Legacy routes - redirect to new names */}
            <Route path="/dashboard" element={<Navigate replace to="/mapboard" />} />
            <Route path="/dashboard/map" element={<Navigate replace to="/mapboard/map" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Add isLoggedIn to window for demo purposes
declare global {
  interface Window {
    isLoggedIn: boolean;
  }
}

export default App;
