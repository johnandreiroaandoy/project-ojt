import { Routes, Route } from 'react-router-dom';
import Mandate from '../pages/Mandate.jsx';
import ServiceGrid from '../pages/ServiceGrid.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';
import Home from '../pages/home.jsx'; // Your main welcome page component

function Router() {
  return (
    <Routes>
      {/* Point the main root path directly to your Home component. 
        Put that welcome section layout code inside your Home.jsx file!
      */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Other Page Components linked to URL paths */}
      <Route path="/mandate" element={<Mandate />} />
      <Route path="/services" element={<ServiceGrid />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/contact" element={<Contact />} />
      
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

export default Router;