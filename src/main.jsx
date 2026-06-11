// Import React's StrictMode component
// StrictMode helps developers find potential problems in the application.
// It only affects development mode and does not appear in production.
import { StrictMode } from 'react';

// Import createRoot from React 18
// This is used to render the React application into the browser.
import { createRoot } from 'react-dom/client';

// Import global CSS styles
import './index.css';

// Import the main App component
// App.jsx is the root component that contains the entire website.
import App from './App.jsx';

/* ==========================================================
   APPLICATION ENTRY POINT

   This file is the starting point of the React application.

   It tells React:
   1. Where to display the app
   2. Which component to render first
========================================================== */

// Find the HTML element with id="root"
// Located inside public/index.html
const rootElement = document.getElementById('root');

// Create a React root inside that HTML element
createRoot(rootElement).render(

  /* ======================================================
     STRICT MODE

     Helps detect:
     - Deprecated features
     - Unsafe lifecycle methods
     - Potential coding mistakes

     Only runs in development mode.
  ====================================================== */
  <StrictMode>

    {/* Main application component */}
    <App />

  </StrictMode>
);