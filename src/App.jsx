import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Router from './routes/router.jsx';
import './index.css';
// 1. 🟢 IMPORT THE GOOGLE PROVIDER PACKAGE HERE
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;