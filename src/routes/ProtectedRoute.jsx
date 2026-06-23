import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  // 🔐 Sync with your AdminDashboard session key string explicitly
  const isAuthenticated = !!localStorage.getItem('adminToken'); 

  if (!isAuthenticated) {
    // Fire immediate visual feedback warning
    toast.error("🔒 Access Denied: Authorized administrator token missing.");
    
    // Bounce them back to the public domain landing page safely
    return <Navigate to="/" replace />;
  }

  // If the token matches, open up the administrative dashboard workspace panel
  return children;
};

export default ProtectedRoute;