import { BrowserRouter } from 'react-router-dom';
import Header from  './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './routes/router.jsx';
import './index.css';

// 1. 🟢 IMPORT THE GOOGLE PROVIDER PACKAGE HERE
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// 🌟 IMPORT THE TOAST ENGINE HERE
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    // 2. 🟢 WRAP EVERYTHING INSIDE THE PROVIDER WITH YOUR SITE KEY
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
          {/* Global Navigation Header */}
          <Header />
          
          <main className="flex-grow">
            {/* The traffic cop that dynamically decides which page to show */}
            <Router /> 
          </main>

          {/* Global Footer */}
          <Footer />
        </div>

        {/* 🌟 GLOBAL TOASTER CONFIGURATION */}
        {/* This stays awake globally and listens for popups from your contact form */}
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '14px',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              maxWidth: '350px',
              zIndex: 9999 // Ensures it sits safely on top of your navigation bars/headers
            }
          }}
        />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;