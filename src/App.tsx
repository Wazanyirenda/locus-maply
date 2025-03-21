
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

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

const App = () => {
  // Set dark mode as default on initial load
  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If no saved theme, set dark mode as default
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      // Apply the saved theme
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<Map />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* User Dashboard Routes */}
            <Route path="/mapboard" element={<Mapboard />} />
            <Route path="/mapboard/map" element={<DashboardMap />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/map" element={<AdminMap />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            
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

export default App;
