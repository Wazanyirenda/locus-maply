
import React from 'react';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  // Redirect to login page with signup tab active
  return <Navigate to="/auth/login?tab=signup" replace />;
};

export default Signup;
