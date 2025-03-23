
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
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user') !== null;
    setIsLoggedIn(userLoggedIn);
  }, [location]);
  
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
  };
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              Locus
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to={isLoggedIn ? "/explore" : "/auth/login"} 
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
            
            {/* Show either Login or Logout button based on authentication status */}
            {isLoggedIn ? (
              <Button variant="default" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
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
                to={isLoggedIn ? "/explore" : "/auth/login"} 
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
              
              {/* Show either Login or Logout button based on authentication status */}
              {isLoggedIn ? (
                <Button variant="default" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
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
