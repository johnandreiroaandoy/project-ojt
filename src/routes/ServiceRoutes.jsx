import React from 'react';

// Import React Router components
// Routes = Container that manages all routes
// Route = Defines a URL path and which component to display
import { Routes, Route } from 'react-router-dom';

/* ==========================================================
   IMPORT MAIN PAGES
========================================================== */

// Home page component
import Home from '../Home.jsx';

// Services dashboard page containing the 4 service cards
import ServiceGrid from '../ServiceGrid.jsx';

/* ==========================================================
   IMPORT SERVICE SUB-PAGES
   Each page contains detailed information about
   a specific department/service.
========================================================== */

// Financial Reporting Department page
import FinancialReporting from './service/FinancialReporting.jsx';

// Internal Audit Department page
import InternalAudit from './service/InternalAudit.jsx';

// Processing Claims Department page
import ProcessingClaims from './service/ProcessingClaims.jsx';

// Barangay Affairs Department page
import BarangayAffairs from './service/BarangayAffairs.jsx';

/* ==========================================================
   SERVICEROUTES COMPONENT

   This component handles navigation for:
   - Home Page
   - Services Dashboard
   - Individual Service Pages
========================================================== */
function ServiceRoutes() {
  return (

    /* ======================================================
       ROUTES CONTAINER
       Holds all available URL routes
    ====================================================== */
    <Routes>

      {/* ==================================================
          HOME PAGE ROUTES
      ================================================== */}

      {/* Default website landing page */}
      <Route path="/" element={<Home />} />

      {/* Alternative URL that also loads the Home page */}
      <Route path="/home" element={<Home />} />

      {/* ==================================================
          SERVICES DASHBOARD
          
          Displays the 4 main service cards:
          - Financial Reporting
          - Internal Audit
          - Processing Claims
          - Barangay Affairs
      ================================================== */}
      <Route path="/services" element={<ServiceGrid />} />

      {/* ==================================================
          SERVICE SUB-PAGES
          
          Each route loads a dedicated department page
      ================================================== */}

      {/* Barangay Affairs Department */}
      <Route
        path="/barangayaffairs"
        element={<BarangayAffairs />}
      />

      {/* Financial Reporting Department */}
      <Route
        path="/financialreporting"
        element={<FinancialReporting />}
      />

      {/* Internal Audit Department */}
      <Route
        path="/interaudit"
        element={<InternalAudit />}
      />

      {/* Processing Claims Department */}
      <Route
        path="/processingclaims"
        element={<ProcessingClaims />}
      />

      {/* ==================================================
          404 NOT FOUND PAGE
          
          This route catches any URL that does not
          match the routes above.
          
          Example:
          /sample
          /admin
          /unknown-page
      ================================================== */}
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

/* ==========================================================
   EXPORT COMPONENT
   Makes ServiceRoutes available for use in App.jsx
========================================================== */
export default ServiceRoutes;