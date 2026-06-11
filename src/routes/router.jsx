import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Import your core pages
import Home from '../pages/Home.jsx'; 
import ServiceGrid from '../pages/ServiceGrid.jsx'; // Your main services page
import Mandate from '../pages/Mandate.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';
function Router() {
  return (
    <Routes>
      {/* Core Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mandate" element={<Mandate />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/contact" element={<Contact />} />
      {/* 🟢 ONLY ONE ROUTE NEEDED: The entire services feature lives here */}
      <Route path="/services" element={<ServiceGrid />} />
      
      {/* Catch-all 404 Route */}
      <Route path="*" element={<div className="py-20 text-center font-bold text-gray-500">Page Not Found</div>} />
    </Routes>
  );
}

export default Router;