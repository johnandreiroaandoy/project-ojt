import React, { useState, useEffect } from 'react';
import Button from '../components/Button.jsx';
import toast from 'react-hot-toast';

// Vector Lucide Blueprint Imports
import { MapPin, Phone, Mail } from 'lucide-react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ==========================================================
      STATE CONFIGURATIONS FOR REMOTE DECOUPLED MATRIX
  ========================================================== */
  const [contactStatic, setContactStatic] = useState(null);
  const [loading, setLoading] = useState(true);

  // VERIFICATION TRACKER STATES
  const [verificationStatus, setVerificationStatus] = useState(null); // 'verified' | null
  const [userAvatar, setUserAvatar] = useState('');

  // 🟢 Grab the base URL dynamically from your centralized .env environment configurations
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
      FETCH STRUCTURAL CONTENT CONFIG FROM LOCAL XAMPP
  ========================================================== */
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    // 🟢 FIXED: Target the live unified data server schema using the environment baseUrl
    fetch(`${baseUrl}/data/contact_info.json${cacheBuster}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Contact static configurations missing on XAMPP server. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContactStatic(data);
      })
      .catch((error) => {
        console.error('Error synchronizing layout static assets for Contact view:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseUrl]);

  // INTERCEPT AND PARSE GOOGLE'S SECURE RESPONSE TOKEN
  const handleCredentialResponse = (response) => {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const googleUser = JSON.parse(jsonPayload);

      // Auto-fill form fields using trusted identity signatures
      setEmail(googleUser.email);
      setName(googleUser.name);
      setUserAvatar(googleUser.picture);
      setVerificationStatus('verified');

      toast.success(`Identity Confirmed: ${googleUser.email}`, { id: 'google-auth' });
    } catch (err) {
      console.error('Failed to parse Google credentials:', err);
      toast.error('Identity parsing failure.');
    }
  };

  // INITIALIZE GOOGLE ON MOUNT
  useEffect(() => {
    // Prevent execution if remote file properties have not cleanly completed mounting
    if (loading || !contactStatic) return;

    const initializeGoogleButton = () => {
      /* global google */
      if (typeof google !== 'undefined' && document.getElementById('googleButtonContainer')) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById('googleButtonContainer'),
          { theme: 'outline', size: 'large', text: 'continue_with', width: '100%' }
        );
      }
    };

    if (typeof google !== 'undefined') {
      initializeGoogleButton();
    } else {
      window.addEventListener('load', initializeGoogleButton);
    }

    return () => window.removeEventListener('load', initializeGoogleButton);
  }, [loading, contactStatic, verificationStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationStatus !== 'verified') {
      toast.error('Please verify your identity via Google before submitting.');
      return;
    }

    setIsSubmitting(true);
    const formData = { name, email, message };

    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        toast.success(data.message, { icon: '✨' });
        setName('');
        setEmail('');
        setMessage('');
        setVerificationStatus(null);
        setUserAvatar('');
      } else {
        toast.error('Submission Error: ' + data.message);
      }
    } catch (error) {
      console.error('Server error:', error);
      toast.error('Could not reach the database API server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ==========================================================
      GUARD LAYOUT RENDER STAGES
  ========================================================== */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 text-sm font-semibold max-w-7xl mx-auto animate-pulse select-none">
        🔄 Connecting to asset structural database layers...
      </div>
    );
  }

  if (!contactStatic) {
    return (
      <div className="max-w-7xl mx-auto my-12 p-6 bg-red-50 text-red-800 rounded-2xl text-sm font-bold border border-red-100 shadow-sm">
        ⚠️ Infrastructure Error: Unable to fetch form configurations from local XAMPP system runtime environment.
        <br />
        <span className="text-xs font-normal text-red-600 block mt-2">
          Please confirm that <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">contact_info.json</code> exists inside your local <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">C:\xampp\htdocs\backend-project-ojt\public\data\</code> directory.
        </span>
      </div>
    );
  }

  // Safe semantic mapping array derived from your unified schema
  const infoCards = [
    { id: 'phone', label: 'Telephone Line', value: contactStatic.phoneNumber || "N/A" },
    { id: 'email', label: 'Official Mailing Link', value: contactStatic.emails ? contactStatic.emails[0] : "N/A" },
    { id: 'address', label: 'Office Premises Location', value: `${contactStatic.building || ''}, ${contactStatic.street || ''}, ${contactStatic.city || ''}` }
  ];

  const formLabels = {
    name: "Full Name",
    namePlaceholder: "Awaiting Google Authentication...",
    email: "Email Address",
    emailPlaceholder: "Please Sign In to Google Account...",
    message: "Message",
    messagePlaceholder: "Type text details...",
    btnDefault: "Submit Inquiry",
    btnSending: "Sending..."
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* ================= LEFT SIDE: CONTACT INFORMATION ================= */}
        <div>
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {contactStatic.heading || "Get in touch with our operations center directly."}
          </p>

          <div className="flex flex-col gap-4 max-w-md w-full">
            {infoCards.map((card) => {
              const IconComponent = 
                card.id === 'phone' ? Phone : 
                card.id === 'email' ? Mail : MapPin;

              return (
                <div key={card.id} className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 hover:translate-x-2 group">
                  <div className="bg-blue-50 p-3.5 rounded-full shrink-0 group-hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
                    <IconComponent 
                      className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{card.label}</p>
                    <p className="text-xs font-bold text-[#002B5B] mt-0.5">{card.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT SIDE: CONTACT FORM ================= */}
        <form onSubmit={handleSubmit} className="bg-[#f8f9fa] p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-5">
          
          {/* GOOGLE INTEGRATION PORTAL SECTION */}
          {userAvatar === '' ? (
            <div className="p-6 bg-white border border-dashed border-gray-200 rounded-2xl text-center space-y-4">
              <p className="text-xs font-black tracking-wider text-gray-400 uppercase">
                🔒 Verification Required
              </p>
              <p className="text-xs text-gray-500 font-medium px-4">
                You must authorize your Google account identity to open and fill out this contact inquiry profile.
              </p>
              <div id="googleButtonContainer" className="w-full pt-2"></div>
            </div>
          ) : (
            <div className="p-4 bg-green-50/50 border border-green-200 rounded-2xl flex items-center justify-between animate-scaleUp">
              <div className="flex items-center gap-3">
                <img src={userAvatar} alt="Avatar" className="w-10 h-10 rounded-full border border-green-400" />
                <div>
                  <p className="text-xs font-black text-green-800 uppercase tracking-wider">🛡️ Authorized Google Identity</p>
                  <p className="text-[11px] font-bold text-gray-500">{email}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => { setVerificationStatus(null); setUserAvatar(''); setEmail(''); setName(''); }}
                className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest bg-white border border-red-100 py-1.5 px-3 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              {formLabels.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={userAvatar === ''} // Blocks input until Google authentication is verified
              placeholder={formLabels.namePlaceholder}
              className={`w-full p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm ${
                userAvatar === '' ? 'bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed select-none' : 'border-gray-200 text-gray-800'
              }`}
              required
            />
          </div>

          {/* Locked Email Input Segment */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center mr-2">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                {formLabels.email}
              </label>
              
              {/* STATUS INDICATOR GLOW */}
              <div className="flex items-center gap-1.5 h-4">
                {verificationStatus === 'verified' && (
                  <>
                    <span className="text-[9px] font-black text-green-600 uppercase tracking-wider">Identity Linked</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                  </>
                )}
              </div>
            </div>

            <input
              type="email"
              value={email}
              readOnly // Completely prevents typing manipulation
              placeholder={formLabels.emailPlaceholder}
              className={`w-full p-4 rounded-xl border focus:outline-none transition-all font-medium text-sm bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed select-none ${
                verificationStatus === 'verified' ? 'bg-green-50/20 border-green-300 !text-green-800' : ''
              }`}
              required
            />
          </div>

          {/* Message Text Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              {formLabels.message}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={userAvatar === ''} // Blocks field until Google session parameters are parsed
              placeholder={formLabels.messagePlaceholder}
              rows="4"
              className={`w-full p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-medium text-sm ${
                userAvatar === '' ? 'bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed select-none' : 'border-gray-200 text-gray-800'
              }`}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting || verificationStatus !== 'verified'}>
              {isSubmitting ? formLabels.btnSending : formLabels.btnDefault}
            </Button>
          </div>

          <p className="text-[10px] text-center text-gray-400 italic">
            Your personal data transmission parameters are protected under standard security profiles.
          </p>
        </form>

      </div>
    </section>
  );
}

export default Contact;