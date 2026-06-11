// Import BrowserRouter to enable page navigation without refreshing the browser
import { BrowserRouter } from 'react-router-dom';

// Import shared components that appear on every page
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Import the application's route configuration
import Router from './routes/router.jsx';

// Import global CSS styles
import './index.css';

/* ==========================================================
   GOOGLE reCAPTCHA IMPORT

   Used to protect forms from spam bots and automated
   submissions by verifying that the visitor is human.
========================================================== */
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/* ==========================================================
   TOAST NOTIFICATION IMPORT

   Used to display popup messages such as:
   - Success messages
   - Error messages
   - Warning messages
========================================================== */
import { Toaster } from 'react-hot-toast';

/* ==========================================================
   MAIN APPLICATION COMPONENT

   This is the root component of the entire website.
   It contains:
   - Google reCAPTCHA Provider
   - React Router
   - Header
   - Main Content Area
   - Footer
   - Global Notification System
========================================================== */
function App() {
  return (

    /* ======================================================
       GOOGLE reCAPTCHA PROVIDER

       Makes reCAPTCHA available throughout the entire app.

       The site key is stored in the .env file for security.
    ====================================================== */
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >

      {/* ==================================================
          BROWSER ROUTER

          Enables navigation between pages without
          reloading the website.
      ================================================== */}
      <BrowserRouter>

        {/* Main page layout container */}
        <div className="min-h-screen flex flex-col bg-white">

          {/* ==============================================
              GLOBAL HEADER

              Appears at the top of every page.
              Usually contains:
              - Logo
              - Navigation Menu
              - Links
          ============================================== */}
          <Header />

          {/* ==============================================
              MAIN CONTENT AREA

              flex-grow allows this section to expand
              and push the footer to the bottom.

              Router determines which page component
              should be displayed.
          ============================================== */}
          <main className="flex-grow">

            {/* Route controller */}
            <Router />

          </main>

          {/* ==============================================
              GLOBAL FOOTER

              Appears at the bottom of every page.
              Usually contains:
              - Contact Info
              - Copyright
              - Quick Links
          ============================================== */}
          <Footer />

        </div>

        {/* ==================================================
            GLOBAL TOASTER

            Handles popup notifications throughout
            the entire application.

            Examples:
            ✓ Message Sent Successfully
            ✗ Server Error
            ⚠ Validation Warning

            Any component can trigger these popups.
        ================================================== */}
        <Toaster

          // Position notifications at the top-right corner
          position="top-right"

          // New notifications appear below older ones
          reverseOrder={false}

          // Global styling applied to every toast message
          toastOptions={{
            style: {

              // Text size
              fontSize: '14px',

              // Inner spacing
              padding: '16px',

              // Rounded corners
              borderRadius: '8px',

              // Shadow effect
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',

              // Maximum width of notification
              maxWidth: '350px',

              // Ensures notifications appear above all elements
              zIndex: 9999
            }
          }}
        />

      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

/* ==========================================================
   EXPORT APP COMPONENT

   Makes App available to main.jsx where React
   starts rendering the application.
========================================================== */
export default App;