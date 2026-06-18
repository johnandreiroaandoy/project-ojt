import React, { useState } from 'react';
// Import BrowserRouter to enable page navigation without refreshing the browser
import { BrowserRouter } from 'react-router-dom';
// Import shared components that appear on every page
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminLoginModal from './pages/AdminLoginModal.jsx';
// Import the application's route configuration
import Router from './routes/router.jsx';
// Import global CSS styles
import './index.css';

/* ==========================================================
   GOOGLE reCAPTCHA IMPORT
========================================================== */
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/* ==========================================================
   TOAST NOTIFICATION IMPORT
========================================================== */
import { Toaster } from 'react-hot-toast';

/* ==========================================================
   MAIN APPLICATION COMPONENT
========================================================== */
function App() {
  // State hook managing whether the admin login popup card is visible or hidden
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
      <BrowserRouter>

        {/* Main page layout container */}
        <div className="min-h-screen flex flex-col bg-white">

          {/* GLOBAL HEADER: Passed state function to handle button clicks */}
          <Header onOpenAdminLogin={() => setIsAdminModalOpen(true)} />

          {/* MAIN CONTENT AREA */}
          <main className="flex-grow">
            {/* Route controller */}
            <Router />
          </main>

          {/* GLOBAL FOOTER */}
          <Footer />

        </div>

        {/* ADMIN LOGIN MODAL POPUP (Controlled via React State) */}
        <AdminLoginModal 
          isOpen={isAdminModalOpen} 
          onClose={() => setIsAdminModalOpen(false)} 
        />

        {/* GLOBAL TOASTER POPUP NOTIFICATIONS */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '14px',
              padding: '16px',
              borderRadius: '8px',
              maxWidth: '350px',
              zIndex: 9999,
            },
            success: {
              style: {
                background: '#ffffff',
                color: '#15803d',
                border: '1px solid #bbf7d0',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              },
            },
            error: {
              style: {
                background: '#fff1f2',
                color: '#991b1b',
                border: '1px solid #fecdd3',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
              },
              duration: 4000, 
            },
          }}
        />

      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;