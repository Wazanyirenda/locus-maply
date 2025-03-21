
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent animate-fade-in">
              Welcome to <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Locus</span>
            </h1>
            
            <div className="glass-card p-1 animate-scale-in">
              <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 bg-background/40 backdrop-blur-sm">
                  <TabsTrigger value="login" className="text-base py-3">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-base py-3">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                
                <TabsContent value="signup" className="mt-0">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
