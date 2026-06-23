import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* ==========================================================
    IMPORT PAGE COMPONENTS
========================================================== */
import Home from '../pages/Home.jsx';
import ServiceGrid from '../pages/ServiceGrid.jsx';
import Mandate from '../pages/Mandate.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';
import Login from '../pages/Login.jsx';
import AdminDashboard from '../pages/AdminPage/AdminDashboard.jsx';

// 🔐 ROUTE GUARD: Verified Sibling Folder Import
import ProtectedRoute from './ProtectedRoute.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mandate" element={<Mandate />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<ServiceGrid />} />
      <Route path="/login" element={<Login />} />

      {/* SECURE ADMIN PANEL */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 CATCH ALL */}
      <Route path="*" element={<div className="py-20 text-center font-bold text-gray-500">Page Not Found</div>} />
    </Routes>
  );
}

export default Router;