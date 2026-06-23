import React, { useState, useEffect } from 'react';
import "tailwindcss";

function Footer() {
  /* ==========================================================
      STATE VARIABLES
  ========================================================== */
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Grab the centralized environment base API URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
      ASYNC XAMPP ENDPOINT FETCH CONNECTION
  ========================================================== */
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    // 🟢 FIXED: Swapped static directory string for dynamic baseUrl integration
    fetch(`${baseUrl}/data/footer_data.json${cacheBuster}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Footer schema properties file missing on server. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFooterData(data);
      })
      .catch((error) => {
        console.error('Error synchronizing layout layer data for Footer:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseUrl]);

  /* ==========================================================
      GUARD LAYOUT RENDER STAGES
  ========================================================== */
  if (loading) {
    return (
      <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 py-16 text-center text-sm font-semibold text-gray-400 select-none animate-pulse">
        🔄 Accessing local asset server to map structural footer nodes...
      </footer>
    );
  }

  if (!footerData) {
    return (
      <footer className="w-full bg-red-50 border-t border-red-100 py-8 text-center text-xs font-bold text-red-800">
        ⚠️ Environment Error: Failed to cleanly mount remote footer configurations from {baseUrl || "undefined environment base"}
        <br />
        <span className="text-[10px] font-normal text-red-600 block mt-2 font-mono">
          Target file path: C:\xampp\htdocs\backend-project-ojt\public\data\footer_data.json
        </span>
      </footer>
    );
  }

  // Deep structural objects data mapping with secure fallback layers
  const branding = footerData.branding || {};
  const quickLinks = footerData.quickLinks || { links: [] };
  const contact = footerData.contact || { phone: {}, email: {}, address: {} };
  const portals = footerData.portals || { logos: [] };
  const legal = footerData.legal || { policies: [], socials: [] };

  return (
    <footer className="w-full font-sans antialiased bg-[#f8f9fa] border-t border-gray-200">

      {/* ==========================================================
          MAIN FOOTER CONTENT - TEMPLATE ROW GRID
      ========================================================== */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* COLUMN 1: OFFICE BRANDING */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {branding.sealSrc && (
              <img
                src={branding.sealSrc}
                alt={branding.sealAlt || "Seal"}
                className="h-16 w-16 object-contain"
              />
            )}
            <div className="h-12 w-[1.5px] bg-[#002B5B] opacity-20"></div>
            {branding.logoSrc && (
              <img
                src={branding.logoSrc}
                alt={branding.logoAlt || "Logo"}
                className="h-14 w-40 object-contain"
              />
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            {branding.description}
          </p>
        </div>

        {/* COLUMN 2: QUICK LINKS DIRECTORY */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            {quickLinks.heading}
          </h3>
          <ul className="space-y-3 text-sm font-bold text-gray-500">
            {(quickLinks.links || []).map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-blue-600 transition-colors uppercase">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: DECOUPLED CONTACT CHANNELS */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            {contact.heading}
          </h3>
          <ul className="space-y-4 text-sm text-gray-600 font-medium">
            {/* Phone */}
            {contact.phone && (
              <li className="flex gap-3">
                <img src={contact.phone.icon} alt="Phone" className="w-6 h-6" />
                <span>{contact.phone.text}</span>
              </li>
            )}
            {/* Email Address */}
            {contact.email && (
              <li className="flex gap-3">
                <img src={contact.email.icon} alt="Email" className="w-6 h-6" />
                <a
                  href={contact.email.href}
                  className="hover:text-blue-600 underline decoration-blue-200"
                >
                  {contact.email.text}
                </a>
              </li>
            )}
            {/* Physical Location */}
            {contact.address && (
              <li className="flex gap-3 text-xs leading-relaxed">
                <img src={contact.address.icon} alt="Location" className="w-6 h-6 mt-1" />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* COLUMN 4: EXTERNAL PORTALS */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            {portals.heading}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {(portals.logos || []).map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt || "Portal logo"}
                className="h-16 w-16 object-contain grayscale hover:scale-150 hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              />
            ))}
          </div>
        </div>

      </div>

      {/* ==========================================================
          BOTTOM LEGAL & SOCIALS SUB-BAR
      ========================================================== */}
      <div className="bg-[#002B5B] py-6 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white text-[10px] md:text-[11px] font-medium tracking-wider gap-4">
          
          {/* Copyright Field */}
          <div className="text-center md:text-left opacity-80 uppercase">
            {legal.copyright}
          </div>

          <div className="flex items-center space-x-2">
            {/* Privacy Policies Mapping */}
            {(legal.policies || []).map((policy, idx) => (
              <React.Fragment key={idx}>
                <a href={policy.href} className="hover:text-blue-300 transition-colors uppercase">
                  {policy.label}
                </a>
                {idx < legal.policies.length - 1 && <span className="opacity-30">|</span>}
              </React.Fragment>
            ))}

            {(legal.policies || []).length > 0 && (legal.socials || []).length > 0 && (
              <span className="opacity-30">|</span>
            )}

            {/* Social Media Elements Loop */}
            {(legal.socials || []).map((social, idx) => 
              social.type === 'link' ? (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.aria}
                >
                  <img
                    src={social.src}
                    alt={social.alt || "Social platform icon"}
                    className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition cursor-pointer"
                  />
                </a>
              ) : (
                <img
                  key={idx}
                  src={social.src}
                  alt={social.alt || "Social graphic item"}
                  className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition-opacity cursor-pointer"
                />
              )
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;