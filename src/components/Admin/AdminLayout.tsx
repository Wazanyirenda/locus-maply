
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, BarChart3, Users, Shield, Settings, CheckSquare, Terminal } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Navigation links with active state
  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: <BarChart3 size={18} /> },
    { name: 'Pending Verification', path: '/admin/map', icon: <MapPin size={18} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={18} /> },
    { name: 'Moderation', path: '/admin/moderation', icon: <Shield size={18} /> },
    { name: 'System', path: '/admin/system', icon: <Terminal size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-4 sticky top-20">
            <div className="flex items-center gap-3 p-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Admin Panel</h3>
                <p className="text-xs text-muted-foreground">Moderator Access</p>
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
            </nav>
            
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="px-3 py-2">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Verification Queue</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Approvals</span>
                  <span className="bg-map-pending text-white text-xs px-2 py-0.5 rounded-full">5</span>
                </div>
              </div>
            </div>
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

export default AdminLayout;
