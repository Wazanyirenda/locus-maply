
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Upload, Phone, Lock, FileText, Globe, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type IDType = 'nrc' | 'passport' | 'drivers-license';

interface FormData {
  fullName: string;
  username: string;
  phone: string;
  password: string;
  language: string;
  referralCode: string;
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
    language: 'english',
    referralCode: '',
    idType: '',
    idFront: null,
    idBack: null,
    selfie: null
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showKycFields, setShowKycFields] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleLanguageChange = (value: string) => {
    setFormData({ ...formData, language: value });
    if (errors.language) {
      setErrors({ ...errors, language: '' });
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
  
  const validateInitialForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateKycForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.idType) newErrors.idType = 'Please select an ID type';
    if (!formData.idFront) newErrors.idFront = 'Please upload the front of your ID';
    if (!formData.idBack) newErrors.idBack = 'Please upload the back of your ID';
    if (!formData.selfie) newErrors.selfie = 'Please upload a selfie with your ID';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInitialForm()) return;
    
    setShowKycFields(true);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateKycForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would connect to a real backend API in production
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
  
  if (showKycFields) {
    return (
      <div className="p-6 animate-fade-in">
        <h3 className="text-xl font-medium mb-4">KYC Verification</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please complete the verification process to start contributing
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="relative glass-card p-4 border border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {formData.idFront ? formData.idFront.name : 'Click to upload or drag and drop'}
              </p>
              <Input 
                id="idFront"
                name="idFront"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'idFront')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {errors.idFront && <p className="text-sm text-destructive">{errors.idFront}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idBack">Upload ID Back</Label>
            <div className="relative glass-card p-4 border border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {formData.idBack ? formData.idBack.name : 'Click to upload or drag and drop'}
              </p>
              <Input 
                id="idBack"
                name="idBack"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'idBack')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {errors.idBack && <p className="text-sm text-destructive">{errors.idBack}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="selfie">Upload Selfie with ID</Label>
            <div className="relative glass-card p-4 border border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {formData.selfie ? formData.selfie.name : 'Click to upload or drag and drop'}
              </p>
              <Input 
                id="selfie"
                name="selfie"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'selfie')}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {errors.selfie && <p className="text-sm text-destructive">{errors.selfie}</p>}
          </div>
          
          <div className="pt-2 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="w-1/2" 
              onClick={() => setShowKycFields(false)}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="w-1/2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="p-6 animate-fade-in">
      <form onSubmit={handleNext} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
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
            <Label htmlFor="username">Username</Label>
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
        </div>
        
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
          <Label htmlFor="password">Password</Label>
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
          <Label htmlFor="language">Preferred language</Label>
          <div className="relative">
            <Select value={formData.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="pl-10">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="bemba">Bemba</SelectItem>
                <SelectItem value="nyanja">Nyanja</SelectItem>
                <SelectItem value="tonga">Tonga</SelectItem>
                <SelectItem value="lozi">Lozi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="referralCode">Referral code (optional)</Label>
          <div className="relative">
            <Gift className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="Enter referral code"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Continue to Verification
          </Button>
        </div>
      </form>
      
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground backdrop-blur-sm">
            Or sign up with
          </span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
          onClick={handleGoogleSignup}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Sign up with Google
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
