
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store user info in localStorage - simple bypass for authentication
      const user = {
        id: '123456',
        phone: formData.phone || '+260123456789', // Use entered phone or default
        name: 'Demo User',
        role: 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      // Successful login toast
      toast({
        title: "Login successful!",
        description: "Welcome to Locus. You've been logged in.",
        variant: "default",
      });
      
      // Redirect to mapboard
      navigate('/mapboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // For demo, let's prefill the login form to make testing easier
  const fillDemoCredentials = () => {
    setFormData({
      phone: '+260123456789',
      password: 'password123'
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Login to Locus</CardTitle>
        <CardDescription>
          Enter any credentials to access the demo
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="+260123456789"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button 
                variant="link" 
                className="px-0 text-xs" 
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Sign In'}
            </Button>
          </div>
          
          <div className="text-center">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={fillDemoCredentials}
              className="text-xs mt-2"
            >
              Use Demo Account
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
