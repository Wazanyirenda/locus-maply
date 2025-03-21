
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Upload, Phone, Lock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type IDType = 'nrc' | 'passport' | 'drivers-license';

interface FormData {
  fullName: string;
  username: string;
  phone: string;
  password: string;
  idType: IDType | '';
  idFront: File | null;
  idBack: File | null;
  selfie: File | null;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    phone: '',
    password: '',
    idType: '',
    idFront: null,
    idBack: null,
    selfie: null
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleIDTypeChange = (value: string) => {
    setFormData({ ...formData, idType: value as IDType });
    if (errors.idType) {
      setErrors({ ...errors, idType: '' });
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'idFront' | 'idBack' | 'selfie') => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
      if (errors[field]) {
        setErrors({ ...errors, [field]: '' });
      }
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData.idType) newErrors.idType = 'Please select an ID type';
    if (!formData.idFront) newErrors.idFront = 'Please upload the front of your ID';
    if (!formData.idBack) newErrors.idBack = 'Please upload the back of your ID';
    if (!formData.selfie) newErrors.selfie = 'Please upload a selfie with your ID';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would connect to a real backend API in production
      // For demo purposes, we'll simulate a successful signup
      console.log('Submitting signup data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created successfully!",
        description: "Your KYC verification is pending approval by our team.",
        variant: "default",
      });
      
      // Redirect to login page
      navigate('/auth/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignup = () => {
    // This would connect to Google OAuth via Supabase in production
    console.log('Google signup clicked');
    toast({
      title: "Google Authentication",
      description: "This would connect to Google OAuth via Supabase in a production environment.",
      variant: "default",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up for Locus</CardTitle>
        <CardDescription>
          Create your account to start mapping the world
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Enter your full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Choose a unique username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="johndoe123"
              />
            </div>
            {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number (mandatory)</Label>
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
            <Label htmlFor="password">Create a password</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="idType">Select ID Type</Label>
            <Select value={formData.idType} onValueChange={handleIDTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nrc">NRC</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers-license">Driver's License</SelectItem>
              </SelectContent>
            </Select>
            {errors.idType && <p className="text-sm text-destructive">{errors.idType}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idFront">Upload ID Front</Label>
            <div className="relative">
              <Input 
                id="idFront"
                name="idFront"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'idFront')}
                className="pl-10"
              />
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            {errors.idFront && <p className="text-sm text-destructive">{errors.idFront}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idBack">Upload ID Back</Label>
            <div className="relative">
              <Input 
                id="idBack"
                name="idBack"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'idBack')}
                className="pl-10"
              />
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            {errors.idBack && <p className="text-sm text-destructive">{errors.idBack}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="selfie">Upload Selfie with ID</Label>
            <div className="relative">
              <Input 
                id="selfie"
                name="selfie"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'selfie')}
                className="pl-10"
              />
              <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            {errors.selfie && <p className="text-sm text-destructive">{errors.selfie}</p>}
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignup}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign up with Google
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center text-center text-sm text-muted-foreground">
        <p>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
