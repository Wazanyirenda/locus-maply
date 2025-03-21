
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Check for tab parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Check if this is an admin login
    const adminParam = searchParams.get('admin');
    setIsAdminLogin(adminParam === 'true');
    
    // Set active tab
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
    
    // Store return path if provided
    const returnTo = searchParams.get('returnTo');
    if (returnTo) {
      sessionStorage.setItem('returnTo', returnTo);
    }
  }, [location]);
  
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent animate-fade-in">
              {isAdminLogin ? (
                <>
                  <Shield className="inline-block mr-2 h-6 w-6 text-blue-400" />
                  Admin <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Login</span>
                </>
              ) : (
                <>Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Locus</span></>
              )}
            </h1>
            
            <div className="glass-card p-1 animate-scale-in">
              <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 bg-background/40 backdrop-blur-sm">
                  <TabsTrigger value="login" className="text-base py-3">Login</TabsTrigger>
                  {!isAdminLogin && (
                    <TabsTrigger value="signup" className="text-base py-3">Sign Up</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="login" className="mt-0">
                  <LoginForm isAdminLogin={isAdminLogin} />
                </TabsContent>
                
                {!isAdminLogin && (
                  <TabsContent value="signup" className="mt-0">
                    <SignupForm />
                  </TabsContent>
                )}
              </Tabs>
            </div>
            
            {isAdminLogin && (
              <div className="mt-4 text-center">
                <Link to="/auth/login" className="text-sm text-blue-400 hover:text-blue-300">
                  Switch to regular user login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
