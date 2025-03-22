
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Map, User, BarChart3, LogIn } from 'lucide-react';
import { Button } from './ui/button';

const NavBar: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark theme if no preference is stored
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    // Check if user is logged in - this would be replaced with proper auth check
    const userLoggedIn = localStorage.getItem('user') !== null;
    setIsLoggedIn(userLoggedIn);
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  // Navigation links with active state
  const navLinks = [
    { name: 'Home', path: '/', icon: <User size={18} /> },
  ];
  
  // Navigation links that require auth
  const authLinks = [
    { name: 'Map', path: '/map', icon: <Map size={18} /> },
    { name: 'Dashboard', path: '/mapboard', icon: <BarChart3 size={18} /> },
  ];
  
  // Handle login
  const handleLogin = () => {
    navigate('/auth/login');
  };
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-xl font-bold text-transparent">
            Locus
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          {isLoggedIn && authLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Login Button or User Profile */}
          {!isLoggedIn ? (
            <Button className="hidden md:flex items-center gap-1.5" onClick={handleLogin}>
              <LogIn size={16} />
              Login
            </Button>
          ) : (
            <Link to="/profile" className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium">Profile</span>
              </div>
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
          <nav className="container divide-y divide-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 p-4 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn && authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 p-4 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="p-4">
              {!isLoggedIn ? (
                <Button className="w-full flex items-center justify-center gap-1.5" onClick={handleLogin}>
                  <LogIn size={16} />
                  Login
                </Button>
              ) : (
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-1.5">
                    <User size={16} />
                    Profile
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
