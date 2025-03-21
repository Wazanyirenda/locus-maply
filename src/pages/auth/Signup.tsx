
import React from 'react';
import Layout from '@/components/Layout';
import SignupForm from '@/components/Auth/SignupForm';

const Signup = () => {
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Join Locus Today</h1>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
