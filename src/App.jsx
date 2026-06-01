import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ServiceGrid from './pages/ServiceGrid.jsx';
import Mandate from './pages/Mandate.jsx';
import Reports from './pages/Reports.jsx'; // Import Reports
import Contact from './pages/Contact.jsx'; // Import Contact
import Button from './components/Button.jsx';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('HOME');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'HOME' && (
          <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-[#002B5B] uppercase italic">Welcome to the Office</h2>
              <p className="mt-4 text-gray-600 font-medium">Official Portal of the City Accountant's Office, Davao City.</p>
            </div>
          </section>
        )}

        {/* View Switcher Logic */}
        {activeTab === 'MANDATE' && <Mandate />}
        {activeTab === 'SERVICES' && <ServiceGrid />}
        {activeTab === 'REPORTS' && <Reports />}
        {activeTab === 'CONTACT US' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

export default App;