
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  Map, 
  User,
  Globe,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user') !== null;
    setIsLoggedIn(userLoggedIn);
  }, [location.pathname]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Handle login
  const handleLogin = () => {
    navigate('/auth/login');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    setIsProfileDropdownOpen(false);
  };
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Globe className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              Locus
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/explore" 
              className="text-sm hover:text-primary transition-colors"
            >
              Explore
            </Link>
            <Link 
              to={isLoggedIn ? "/contribute" : "/auth/login"} 
              className="text-sm hover:text-primary transition-colors"
            >
              Contribute
            </Link>
            
            {/* Show Mapboard link only when authenticated */}
            {isLoggedIn && (
              <Link to="/mapboard" className="text-sm hover:text-primary transition-colors">
                Mapboard
              </Link>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* User Profile or Login Button */}
            {isLoggedIn ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 rounded-full"
                  onClick={toggleProfileDropdown}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                </Button>
                
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border/40 overflow-hidden z-50 animate-fade-in">
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <Link 
                        to="/profile/settings" 
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <button 
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent w-full text-left text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="default" onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-background/90 backdrop-blur-md border border-border/40 rounded-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/explore" 
                className="text-sm hover:text-primary transition-colors"
              >
                Explore
              </Link>
              <Link 
                to={isLoggedIn ? "/contribute" : "/auth/login"} 
                className="text-sm hover:text-primary transition-colors"
              >
                Contribute
              </Link>
              
              {/* Show Mapboard link only when authenticated */}
              {isLoggedIn && (
                <Link to="/mapboard" className="text-sm hover:text-primary transition-colors">
                  Mapboard
                </Link>
              )}
              
              {/* User Profile links or Login Button */}
              {isLoggedIn ? (
                <div className="border-t border-border/40 pt-4 space-y-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <Link 
                    to="/profile/settings" 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button 
                    className="flex items-center gap-2 text-sm text-destructive hover:opacity-80 w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Button variant="default" className="w-full" onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
