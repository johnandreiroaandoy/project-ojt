import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  // 🟢 STRENGTHENED GUARD: Check for actual valid token content
  const isAuthenticated = token && token !== 'undefined' && token !== 'null'; 

  if (!isAuthenticated) {
    // Fire immediate visual feedback warning
    toast.error("🔒 Access Denied: Please log in to access the administrator panel.");
    
    // Bounce them back to the login screen securely
    return <Navigate to="/login" replace />;
  }

  // If the token is valid, open up the dashboard
  return children;
};

export default ProtectedRoute;