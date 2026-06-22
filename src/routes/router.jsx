import React from 'react';

// Import React Router components
// Routes = Container that holds all routes
// Route = Defines a URL path and the component to display
import { Routes, Route } from 'react-router-dom';

/* ==========================================================
   IMPORT PAGE COMPONENTS
   Each component represents a page in the website
========================================================== */

// Home page
import Home from '../pages/Home.jsx';

// Services page (contains all service-related views)
import ServiceGrid from '../pages/ServiceGrid.jsx';

// Legal Mandate page
import Mandate from '../pages/Mandate.jsx';

// Reports page
import Reports from '../pages/Reports.jsx';

// Contact page
import Contact from '../pages/Contact.jsx';

// Login Authentication Gateway Portal page
import Login from '../pages/Login.jsx';

// 🟢 FIXED: Swapped out ContentManagement for your new organized folder directory orchestrator
import AdminDashboard from '../pages/AdminPage/AdminDashboard.jsx';

/* ==========================================================
   ROUTER COMPONENT
   Handles navigation between pages without reloading
   the entire website.
========================================================== */
function Router() {
  return (

    /* ======================================================
       ROUTES CONTAINER
       Holds all available page routes
    ====================================================== */
    <Routes>

      {/* ==================================================
          HOME PAGE ROUTES
          Both "/" and "/home" load the Home component
      ================================================== */}

      {/* Default website landing page */}
      <Route path="/" element={<Home />} />

      {/* Alternative Home page URL */}
      <Route path="/home" element={<Home />} />

      {/* ==================================================
          MANDATE PAGE
          Displays legal mandate, vision, and mission
      ================================================== */}
      <Route path="/mandate" element={<Mandate />} />

      {/* ==================================================
          REPORTS PAGE
          Displays downloadable transparency reports
      ================================================== */}
      <Route path="/reports" element={<Reports />} />

      {/* ==================================================
          CONTACT PAGE
          Displays office contact information and inquiry form
      ================================================== */}
      <Route path="/contact" element={<Contact />} />

      {/* ==================================================
          SERVICES PAGE
          Contains all service categories and detailed views
      ================================================== */}
      <Route path="/services" element={<ServiceGrid />} />

      {/* ==================================================
          SECURE LOGIN AUTHENTICATION ROUTE
          Provides a gate entry form for administrative staff
      ================================================== */}
      <Route path="/login" element={<Login />} />

      {/* ==================================================
          🟢 FIXED: CENTRAL ADMIN DASHBOARD PANEL ROUTE
          Points to your clean, tab-separated modular workspace views
      ================================================== */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* ==================================================
          404 PAGE (NOT FOUND)
          
          This route catches any URL that does not match
          the routes above.
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
   EXPORT ROUTER COMPONENT
   Makes this routing configuration available
   to App.jsx or other files.
========================================================== */
export default Router;