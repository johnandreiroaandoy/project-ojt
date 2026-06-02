import React from 'react';
// Notice the '../' — this tells Vite to step out of 'routes' and into 'src'
import Mandate from '../pages/Mandate.jsx';
import ServiceGrid from '../pages/ServiceGrid.jsx';
import Reports from '../pages/Reports.jsx';
import Contact from '../pages/Contact.jsx';

function Router({ activeTab }) {
  switch (activeTab) {
    case 'HOME':
      return (
        <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-[#002B5B] uppercase italic">Welcome to the Office</h2>
            <p className="mt-4 text-gray-600 font-medium">Official Portal of the City Accountant's Office, Davao City.</p>
          </div>
        </section>
      );
    case 'MANDATE':
      return <Mandate />;
    case 'SERVICES':
      return <ServiceGrid />;
    case 'REPORTS':
      return <Reports />;
    case 'CONTACT US':
      return <Contact />;
    default:
      return (
        <div className="py-20 text-center font-bold text-gray-500">
          Page Not Found
        </div>
      );
  }
}

export default Router;