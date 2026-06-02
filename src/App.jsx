import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './router.jsx'; // 1. Import your new router file
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('HOME');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation controls activeTab */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* 2. The Router decides what view to mount based on activeTab */}
      <main className="flex-grow">
        <Router activeTab={activeTab} />
      </main>

      <Footer />
    </div>
  );
}

export default App;