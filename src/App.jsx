import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './routes/router.jsx';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('HOME');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <Router activeTab={activeTab} />
      </main>

      <Footer />
    </div>
  );
}

export default App;