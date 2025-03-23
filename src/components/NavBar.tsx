
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
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Globe,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
  
  // Guest navigation links
  const guestLinks = [
    { name: 'Explore', path: '/auth/login', icon: <Globe size={18} /> },
    { name: 'Contribute', path: '/auth/login', icon: <Plus size={18} /> },
  ];
  
  // Navigation links for logged in users
  const authLinks = [
    { name: 'Explore', path: '/map', icon: <Globe size={18} /> },
    { name: 'Contribute', path: '/contribute', icon: <Plus size={18} /> },
    { name: 'Mapboard', path: '/mapboard', icon: <Map size={18} /> },
  ];
  
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
          {isLoggedIn 
            ? authLinks.map((link) => (
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
              ))
            : guestLinks.map((link) => (
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
              ))
          }
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Login Button or User Profile */}
          {!isLoggedIn ? (
            <Button className="hidden md:flex items-center gap-1.5" onClick={handleLogin}>
              <LogIn size={16} />
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Demo User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      +260123456789
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/settings" className="w-full cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
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
            {isLoggedIn 
              ? authLinks.map((link) => (
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
                ))
              : guestLinks.map((link) => (
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
                ))
            }
            
            <div className="p-4">
              {!isLoggedIn ? (
                <Button className="w-full flex items-center justify-center gap-1.5" onClick={handleLogin}>
                  <LogIn size={16} />
                  Sign In
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link to="/profile">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1.5">
                      <User size={16} />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center gap-1.5"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
