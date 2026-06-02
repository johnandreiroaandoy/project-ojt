import { Routes, Route } from 'react-router-dom';
import Mandate from '../pages/Mandate.jsx';
import ServiceGrid from '../pages/ServiceGrid.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';

function Router() {
  return (
    <Routes>
      {/* Home Page Layout */}
      <Route 
        path="/" 
        element={
          <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-[#002B5B] uppercase italic">Welcome to the Office</h2>
              <p className="mt-4 text-gray-600 font-medium">Official Portal of the City Accountant's Office, Davao City.</p>
            </div>
          </section>
        } 
      />

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