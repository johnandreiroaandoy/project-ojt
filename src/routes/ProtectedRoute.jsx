import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 🔐 Check if the user completed the Google/Admin authentication credentials sequence
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'; 

  if (!isAuthenticated) {
    // If they aren't authorized, instantly kick them out to the login page
    return <Navigate to="/login" replace />;
  }

  // If they are authenticated, render the administrative workspace panel view safely
  return children;
};

export default ProtectedRoute;