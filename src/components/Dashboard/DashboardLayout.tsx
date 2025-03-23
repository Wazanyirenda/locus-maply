
import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, BarChart3, User, Settings, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  
  // Navigation links with active state
  const navLinks = [
    { name: 'Overview', path: '/mapboard', icon: <BarChart3 size={18} /> },
    { name: 'My Map', path: '/mapboard/map', icon: <MapPin size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
    { name: 'Settings', path: '/profile/settings', icon: <Settings size={18} /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-4 sticky top-20">
            <div className="flex items-center gap-3 p-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Demo User</h3>
                <p className="text-xs text-muted-foreground">Level 3 Mapper</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent/50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              {/* Logout */}
              <button 
                className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent/50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
