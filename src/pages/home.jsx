import React, { useState, useEffect } from 'react';
import "tailwindcss";

function Home() {
  /* ==========================================================
      STATE VARIABLES FOR REMOTE DECOUPLED MATRIX
  ========================================================== */
  const [servicesData, setServicesData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ==========================================================
      ASYNC CONCURRENT DATA FETCH SYNC PIPELINE (XAMPP)
  ========================================================== */
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;
    
    // 🟢 Dynamic connection variable pulled directly from your updated configuration limits
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    
    Promise.all([
      fetch(`${baseUrl}/data/services.json${cacheBuster}`).then(res => {
        if (!res.ok) throw new Error('services.json file is missing on local server.');
        return res.json();
      }),
      fetch(`${baseUrl}/data/contact_info.json${cacheBuster}`).then(res => {
        if (!res.ok) throw new Error('contact_info.json file is missing on local server.');
        return res.json();
      })
    ])
      .then(([servicesPayload, contactPayload]) => {
        setServicesData(servicesPayload);
        setContactData(contactPayload);
      })
      .catch((error) => {
        console.error('Error fetching API metrics inside Home view:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ==========================================================
      GUARD LAYOUT RENDER STAGES
  ========================================================== */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 text-sm font-semibold max-w-7xl mx-auto animate-pulse select-none">
        🔄 Syncing system data layers from local server...
      </div>
    );
  }

  if (!servicesData || !contactData) {
    return (
      <div className="max-w-7xl mx-auto my-12 p-6 bg-red-50 text-red-800 rounded-2xl text-sm font-bold border border-red-100 shadow-sm">
        ⚠️ Environment Error: Failed to safely parse layout definitions from your server.
        <br />
        <span className="text-xs font-normal text-red-600 block mt-2">
          Verify that <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">services.json</code> and <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">contact_info.json</code> exist inside your <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">C:\xampp\htdocs\backend-project-ojt\public\data\</code> directory.
        </span>
      </div>
    );
  }

  // Safe fallback extractions for dynamic array rendering blocks
  const servicesCards = servicesData.cards || [];
  const contactEmails = contactData.emails || [];

  return (
    <div className="w-full bg-slate-50/50 py-12 animate-fadeIn">
      
      {/* SECTION 1: SERVICES RENDER MATRIX */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-xl md:text-2xl text-center mb-12 font-black text-[#002B5B] uppercase tracking-wide">
          {servicesData.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {servicesCards.map((service) => (
            <div key={service.id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-500 shadow-lg shadow-slate-500/40 flex flex-col transition-all duration-300 hover:shadow-xl">
              
              <h3 className="text-lg font-black text-[#002B5B] uppercase italic tracking-tight border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${service.accentColor || 'bg-blue-600'}`}></span>
                {service.title}
              </h3>

              <ul className="space-y-3 text-slate-600 font-medium text-sm md:text-base list-none pl-0">
                <li className="flex items-start gap-2 text-slate-700 font-semibold mb-4 leading-relaxed">
                  {service.mainDescription}
                </li>

                {(service.items || []).map((item, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start gap-3 ${index === 1 || index === 2 || index === 3 ? 'pl-4 text-slate-500 text-xs md:text-sm' : ''}`}
                  >
                    <span className={`${index === 1 || index === 2 || index === 3 ? 'text-slate-400' : service.bulletColor || 'text-blue-600'} mt-1 select-none`}>•</span>
                    <span>{item.text || item}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: OFFICE CONTACT INFORMATION */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#002B5B] to-[#001f42] text-white p-8 rounded-2xl shadow-xl shadow-slate-500/30 border border-white/10">
          
          <p className="text-xl md:text-base text-slate-200 font-large leading-relaxed mb-4">
            {contactData.heading} <strong>{contactData.roomNumber}</strong>, {contactData.floor}, {contactData.building}, {contactData.street}, {contactData.city}.
            <br /><br />
            {contactData.phoneLabel} <strong>{contactData.phoneNumber}</strong> {contactData.localLines} {contactData.emailLabel}:
            <br />
            {contactEmails.length >= 2 ? (
              <>
                <span className="underline text-white font-semibold">{contactEmails[0]}</span> or <span className="underline text-white font-semibold">{contactEmails[1]}</span>
              </>
            ) : (
              <span className="underline text-white font-semibold">{contactEmails[0] || ''}</span>
            )}
          </p>
          
        </div>
      </div>

    </div>
  );
}

export default Home;