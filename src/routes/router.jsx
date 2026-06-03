import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Mandate from '../pages/Mandate.jsx';
import ServiceGrid from '../pages/ServiceGrid.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';
import Home from '../pages/home.jsx';

function Router() {
  return (
    <Routes>
      {/* Home Page Layout */}
      <Route 
        path="/" 
        element={
          <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl text-center font-black text-[#002B5B] uppercase italic">Welcome to the Office of City Accoutant</h2>
              <p className="mt-4 text-gray-600 font-medium">The City Accountant’s Office is responsible for the accounting & internal audit services as well as the preparation of Financial Statements in accordance with and in compliance with the Philippine Public Sector Accounting Standards (PPSAS).
                
                 The Office was established in view of the  SP Res. No. 1722, City Ord. No. 298, S-1991, mandated by RA No. 7160, Local Gov’t Code – 1991. The creation of the City Accountant’s Office was geared towards economic, efficient and effective system of safeguarding the city government’s funds and properties against loss or wastage through illegal or improper disposal</p>
              
            </div>
          </section>



        } 
      />

      {/* Other Page Components linked to URL paths */}
      <Route path="/mandate" element={<Mandate />} />
      <Route path="/services" element={<ServiceGrid />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={<Home />} />

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