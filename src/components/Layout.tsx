
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // After mounting, we can show the UI to avoid hydration issues with theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Define if the current page should have a different layout (like full screen map)
  const isMapFullScreen = location.pathname === '/map' ||
                         location.pathname.startsWith('/dashboard/map') ||
                         location.pathname.startsWith('/admin/map');
  
  // Apply different layout classes based on the page
  const contentClasses = isMapFullScreen 
    ? 'h-[calc(100vh-4rem)] w-full p-0' 
    : 'container mx-auto py-6 px-4 md:py-8 animate-fade-in';
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <NavBar />
      <main className={contentClasses}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
