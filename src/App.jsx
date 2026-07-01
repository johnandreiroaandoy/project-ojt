// 🌟 Added React and the useEffect hook for tracking lifecycle triggers
import React, { useEffect } from 'react';
// Import BrowserRouter to enable page navigation without refreshing the browser
import { BrowserRouter, useLocation } from 'react-router-dom';
// Import shared components that appear on every page
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
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
   INTERNAL ROUTING CONDITIONAL WRAPPER
   
   This handles hiding layout features dynamically based on 
   URL patterns.
========================================================== */
function AppContent() {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
     👥 BACKGROUND VISITOR TRACKING INITIALIZATION
  ========================================================== */
  useEffect(() => {
    let cancelled = false;

    // Extract the clean page name (e.g., "/home", "/reports") or default to "root"
    const currentPath = location.pathname === '/' ? 'root' : location.pathname;

    const trackVisit = async () => {
      let clientPlatform = navigator.platform || '';
      let clientDeviceModel = '';
      let clientIsMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');

      if (navigator.userAgentData?.getHighEntropyValues) {
        try {
          const hints = await navigator.userAgentData.getHighEntropyValues(['model', 'platform']);
          clientPlatform = hints.platform || clientPlatform;
          clientDeviceModel = hints.model || '';
          clientIsMobile = Boolean(navigator.userAgentData.mobile) || clientIsMobile;
        } catch {
          clientPlatform = navigator.platform || '';
        }
      }

      if (cancelled) return;

      const params = new URLSearchParams({ pagename: currentPath });
      const headers = {};

      if (clientPlatform) {
        params.set('platform', clientPlatform);
        headers['X-Client-Platform'] = clientPlatform;
      }

      if (clientIsMobile) {
        params.set('mobile', 'true');
        headers['X-Client-Is-Mobile'] = 'true';
      }

      if (clientDeviceModel) {
        params.set('device_model', clientDeviceModel);
        headers['X-Client-Device-Model'] = clientDeviceModel;
      }

      fetch(`${baseUrl}/api/analytics/track-visit?${params.toString()}`, { headers })
        .then(res => res.json())
        .then(result => {
          if (result.status === 'success') {
            console.log(`Page Analytics: Counted visit for [${currentPath}]. Lifetime hits: ${result.total_visitors}`);
          }
        })
        .catch(err => {
          console.warn("Analytics pipeline temporarily unreachable:", err);
        });
    };

    trackVisit();

    return () => {
      cancelled = true;
    };
  }, [baseUrl, location.pathname]);
  // 🛡️ CONDITIONAL RENDER RULE: Hide the public layout elements if path starts with '/admin' OR matches '/login'
  const isAdminOrLoginPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* 🟢 Render public header only if the user isn't in the administrative or login workspace */}
      {!isAdminOrLoginPage && <Header />}

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {/* Route controller mapping path endpoints to views */}
        <Router />
      </main>

      {/* 🟢 Render public footer only if the user isn't in the administrative or login workspace */}
      {!isAdminOrLoginPage && <Footer />}

    </div>
  );
}

/* ==========================================================
   MAIN ROOT APPLICATION COMPONENT
========================================================== */
function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
      <BrowserRouter>
        
        {/* Invoke layout shell aware of navigation state */}
        <AppContent />

        {/* ==================================================
            GLOBAL TOASTER HOT NOTIFICATIONS
        ================================================== */}
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
