
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // For demo purposes, we'll simulate a login
    setTimeout(() => {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: '123',
        name: 'Demo User',
        phone: formData.phone || '0123456789'
      }));

      // Show success toast
      toast({
        title: "Logged in successfully",
        description: "Welcome back to Locus!",
      });

      // Redirect to dashboard
      navigate('/mapboard');
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);

    // Set demo user in localStorage
    localStorage.setItem('user', JSON.stringify({
      id: 'demo123',
      name: 'Demo User',
      phone: '0123456789'
    }));

    // Show success toast
    toast({
      title: "Demo Login Successful",
      description: "Welcome to Locus! You are logged in as a demo user.",
    });

    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      navigate('/mapboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-8 md:py-16 px-4">
        <div className="glass-card p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/auth/reset-password" 
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span> Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Quick Demo Login
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>{' '}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
