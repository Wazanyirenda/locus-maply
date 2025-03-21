
import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/Auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back to Locus</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
