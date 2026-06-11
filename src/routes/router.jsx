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
          
          NOTE:
          Only one route is needed because the ServiceGrid
          component handles its own page switching using
          React state.
      ================================================== */}
      <Route path="/services" element={<ServiceGrid />} />

      {/* ==================================================
          404 PAGE (NOT FOUND)
          
          This route catches any URL that does not match
          the routes above.
          
          Example:
          /abc
          /unknown-page
          /test
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