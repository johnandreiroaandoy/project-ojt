import React from 'react';
import "tailwindcss";

// Decoupled Structural Content Mapping Source
// Adjust path depth based on your exact file home directory
import footerData from '../data/footer_data.json';

function Footer() {
  return (
    <footer className="w-full font-sans antialiased bg-[#f8f9fa] border-t border-gray-200">

      {/* ==========================================================
          MAIN FOOTER CONTENT - TEMPLATE ROW GRID
      ========================================================== */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* COLUMN 1: OFFICE BRANDING */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={footerData.branding.sealSrc}
              alt={footerData.branding.sealAlt}
              className="h-16 w-16 object-contain"
            />
            <div className="h-12 w-[1.5px] bg-[#002B5B] opacity-20"></div>
            <img
              src={footerData.branding.logoSrc}
              alt={footerData.branding.logoAlt}
              className="h-14 w-40 object-contain"
            />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            {footerData.branding.description}
          </p>
        </div>

        {/* COLUMN 2: QUICK LINKS DIRECTORY */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            {footerData.quickLinks.heading}
          </h3>
          <ul className="space-y-3 text-sm font-bold text-gray-500">
            {footerData.quickLinks.links.map((link, idx) => (
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
            {footerData.contact.heading}
          </h3>
          <ul className="space-y-4 text-sm text-gray-600 font-medium">
            {/* Phone */}
            <li className="flex gap-3">
              <img src={footerData.contact.phone.icon} alt="Phone" className="w-6 h-6" />
              <span>{footerData.contact.phone.text}</span>
            </li>
            {/* Email Address */}
            <li className="flex gap-3">
              <img src={footerData.contact.email.icon} alt="Email" className="w-6 h-6" />
              <a
                href={footerData.contact.email.href}
                className="hover:text-blue-600 underline decoration-blue-200"
              >
                {footerData.contact.email.text}
              </a>
            </li>
            {/* Physical Location */}
            <li className="flex gap-3 text-xs leading-relaxed">
              <img src={footerData.contact.address.icon} alt="Location" className="w-6 h-6 mt-1" />
              <span>
                {footerData.contact.address.line1}
                <br />
                {footerData.contact.address.line2}
              </span>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: EXTERNAL PORTALS */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            {footerData.portals.heading}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {footerData.portals.logos.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
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
            {footerData.legal.copyright}
          </div>

          <div className="flex items-center space-x-2">
            {/* Privacy Policies Mapping */}
            {footerData.legal.policies.map((policy, idx) => (
              <React.Fragment key={idx}>
                <a href={policy.href} className="hover:text-blue-300 transition-colors uppercase">
                  {policy.label}
                </a>
                {idx < footerData.legal.policies.length - 1 && <span className="opacity-30">|</span>}
              </React.Fragment>
            ))}

            <span className="opacity-30">|</span>

            {/* Social Media Elements Loop */}
            {footerData.legal.socials.map((social, idx) => 
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
                    alt={social.alt}
                    className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition cursor-pointer"
                  />
                </a>
              ) : (
                <img
                  key={idx}
                  src={social.src}
                  alt={social.alt}
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