
import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/Auth/LoginForm';
import { Globe2 } from 'lucide-react';

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 text-primary">
            <Globe2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back to Locus</h1>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Log in to access your dashboard and continue mapping locations across Africa.
          </p>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
