
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Phone, Lock, Send, ArrowLeft, Shield } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface LoginFormProps {
  isAdminLogin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isAdminLogin = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
    otp?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  useEffect(() => {
    // If there's a tab query param, handle it in the parent component
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      // This will be handled by the parent component
    }
  }, [searchParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpValue(e.target.value);
    if (errors.otp) {
      setErrors({ ...errors, otp: undefined });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: {
      phone?: string;
      password?: string;
    } = {};
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
    
    if (!showOtpFlow && !formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateOtp = (): boolean => {
    const newErrors: {
      otp?: string;
    } = {};
    
    if (!otpValue) newErrors.otp = 'OTP is required';
    else if (!/^[0-9]{4,6}$/.test(otpValue)) newErrors.otp = 'Invalid OTP format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would connect to a real backend API in production
      console.log('Logging in with:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication status in window object (for demo)
      window.isLoggedIn = true;
      
      // Successful login toast
      toast({
        title: isAdminLogin ? "Admin login successful!" : "Login successful!",
        description: isAdminLogin 
          ? "Welcome to the admin dashboard." 
          : "Welcome back to Locus.",
        variant: "default",
      });
      
      // Redirect based on login type
      const returnTo = sessionStorage.getItem('returnTo');
      if (returnTo) {
        sessionStorage.removeItem('returnTo');
        navigate(returnTo);
      } else {
        // Default redirect
        navigate(isAdminLogin ? '/admin' : '/mapboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendOtp = async () => {
    if (!formData.phone) {
      setErrors({ phone: 'Phone number is required' });
      return;
    }
    
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      setErrors({ phone: 'Invalid phone number format' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would send OTP in a real app
      console.log('Sending OTP to:', formData.phone);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setShowOtpFlow(true);
      
      toast({
        title: "OTP Sent!",
        description: `A verification code has been sent to ${formData.phone}`,
        variant: "default",
      });
    } catch (error) {
      console.error('OTP error:', error);
      toast({
        title: "Failed to send OTP",
        description: "Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would verify OTP in a real app
      console.log('Verifying OTP:', otpValue, 'for phone:', formData.phone);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication status in window object (for demo)
      window.isLoggedIn = true;
      
      toast({
        title: "Verification successful!",
        description: "You have been logged in successfully.",
        variant: "default",
      });
      
      // Redirect based on login type
      const returnTo = sessionStorage.getItem('returnTo');
      if (returnTo) {
        sessionStorage.removeItem('returnTo');
        navigate(returnTo);
      } else {
        // Admin login not allowed via OTP for extra security
        navigate('/mapboard');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendOtp = () => {
    handleSendOtp();
  };
  
  const handleBackToLogin = () => {
    setShowOtpFlow(false);
    setOtpSent(false);
    setOtpValue('');
  };
  
  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "A one-time password (OTP) has been sent to your phone number.",
      variant: "default",
    });
  };
  
  if (showOtpFlow) {
    return (
      <div className="space-y-4 p-6 backdrop-blur-md animate-fade-in">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 mr-2" 
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Verify your phone</h2>
        </div>
        
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to <span className="font-medium text-foreground">{formData.phone}</span>
        </p>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter verification code</Label>
            <Input 
              id="otp"
              value={otpValue}
              onChange={handleOtpChange}
              maxLength={6}
              placeholder="123456"
              className="text-center text-lg tracking-widest"
            />
            {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
          </div>
          
          <Button 
            onClick={handleVerifyOtp} 
            className="w-full bg-blue-500 hover:bg-blue-600" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify and Continue'}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive a code?{' '}
              <Button 
                variant="link" 
                className="p-0 text-sm text-blue-400 hover:text-blue-300" 
                onClick={handleResendOtp}
                disabled={isSubmitting}
              >
                Resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 animate-fade-in">
      {isAdminLogin && (
        <div className="mb-6 p-4 rounded-md bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-blue-400 mr-2" />
            <h3 className="font-medium">Admin Login</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Please enter your administrator credentials to continue.
          </p>
        </div>
      )}
      
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
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isAdminLogin && (
              <Button 
                variant="link" 
                className="px-0 text-xs text-blue-400 hover:text-blue-300" 
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            )}
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
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : isAdminLogin ? 'Admin Sign In' : 'Sign In'}
          </Button>
        </div>
      </form>
      
      {!isAdminLogin && (
        <>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground backdrop-blur-sm">
                Or use OTP
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={handleSendOtp} 
              variant="outline" 
              className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
