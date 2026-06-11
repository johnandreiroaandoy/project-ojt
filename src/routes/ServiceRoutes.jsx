import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layout Hubs
import Home from '../Home.jsx'; 
import ServiceGrid from '../ServiceGrid.jsx'; // 🟢 Added dashboard grid link here

// Import Dedicated Department Pages
import FinancialReporting from './service/FinancialReporting.jsx';
import InternalAudit from './service/InternalAudit.jsx';
import ProcessingClaims from './service/ProcessingClaims.jsx';
import BarangayAffairs from './service/BarangayAffairs.jsx';

function ServiceRoutes() {
  return (
    <Routes>
      {/* Landing Roots */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* 🟢 Option 2 Core: The Dedicated 4-Card Dashboard Link */}
      <Route path="/services" element={<ServiceGrid />} />

      {/* Separate Department Target Sub-Pages */}
      <Route path="/barangayaffairs" element={<BarangayAffairs />} />
      <Route path="/financialreporting" element={<FinancialReporting />} />
      <Route path="/interaudit" element={<InternalAudit />} />
      <Route path="/processingclaims" element={<ProcessingClaims />} />
      
      {/* Catch-all 404 Route */}
      <Route 
        path="*" 
        element={
          <div className="py-20 text-center font-bold text-gray-500">
            Page Not Found
          </div>
        } 
      />
    </Routes>
  );
}

export default ServiceRoutes;