import React from 'react';
import "tailwindcss";

// Footer Component
// Displays the website footer containing branding,
// quick links, contact information, government portals,
// and social media links.
function Footer() {
  return (
    <footer className="w-full font-sans antialiased bg-[#f8f9fa] border-t border-gray-200">

      {/* =========================
          MAIN FOOTER CONTENT
          ========================= */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* =========================
            COLUMN 1: OFFICE BRANDING
            Displays logos and office description
            ========================= */}
        <div className="space-y-4">

          {/* Logo Container */}
          <div className="flex items-center gap-4">

            {/* Davao City Seal */}
            <img
              src="davao.png"
              alt="Davao City Seal"
              className="h-16 w-16 object-contain"
            />

            {/* Decorative vertical divider */}
            <div className="h-12 w-[1.5px] bg-[#002B5B] opacity-20"></div>

            {/* Office Branding Logo */}
            <img
              src="dcplinado.png"
              alt="Dabawenyo DCPlinado Logo"
              className="h-14 w-40 object-contain"
            />
          </div>

          {/* Short description about the office */}
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            Ensuring fiscal integrity and transparent financial management for the City of Davao.
          </p>
        </div>

        {/* =========================
            COLUMN 2: QUICK LINKS
            Navigation shortcuts
            ========================= */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm font-bold text-gray-500">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors uppercase">
                Know Davao City
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-blue-600 transition-colors uppercase">
                City Departments
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-blue-600 transition-colors uppercase">
                Online Services
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-blue-600 transition-colors uppercase">
                Transparency Seal
              </a>
            </li>
          </ul>
        </div>

        {/* =========================
            COLUMN 3: CONTACT INFORMATION
            Displays office contact details
            ========================= */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm text-gray-600 font-medium">

            {/* Phone Number */}
            <li className="flex gap-3">
              <img src="phone.png" alt="Phone Icon" className="w-6 h-6" />
              <span>(082) 222-1234 / Local 505</span>
            </li>

            {/* Email Address */}
            <li className="flex gap-3">
              <img src="at.png" alt="Email Icon" className="w-6 h-6" />

              <a
                href="mailto:accountant@davaocity.gov.ph"
                className="hover:text-blue-600 underline decoration-blue-200"
              >
                accountant@davaocity.gov.ph
              </a>
            </li>

            {/* Office Address */}
            <li className="flex gap-3 text-xs leading-relaxed">
              <img src="ct.png" alt="Location Icon" className="w-6 h-6 mt-1" />

              <span>
                3rd Floor, City Hall Building,
                <br />
                City Hall Drive, Davao City, 8000
              </span>
            </li>
          </ul>
        </div>

        {/* =========================
            COLUMN 4: GOVERNMENT PORTALS
            Displays external government logos
            ========================= */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">
            Government Portals
          </h3>

          <div className="grid grid-cols-2 gap-4">

            {/* Republic of the Philippines Logo */}
            <img
              src="republic.png"
              alt="Republic of the Philippines"
              className="h-16 w-16 object-contain grayscale hover:scale-150 hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            />

            {/* Bagong Pilipinas Logo */}
            <img
              src="bagong.png"
              alt="Bagong Pilipinas"
              className="h-16 w-16 object-contain grayscale hover:scale-150 hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM FOOTER BAR
          Contains copyright,
          policies, and social links
          ========================= */}
      <div className="bg-[#002B5B] py-6 px-4 md:px-12">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white text-[10px] md:text-[11px] font-medium tracking-wider gap-4">

          {/* Copyright Notice */}
          <div className="text-center md:text-left opacity-80 uppercase">
            © 2026 City Government of Davao. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-2">

            {/* Privacy Policy Link */}
            <a href="#" className="hover:text-blue-300 transition-colors uppercase">
              Privacy Policy
            </a>

            <span className="opacity-30">|</span>

            {/* Terms of Use Link */}
            <a href="#" className="hover:text-blue-300 transition-colors uppercase">
              Terms of Use
            </a>

            <span className="opacity-30">|</span>

            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/davaocitygov/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our official Facebook page"
            >
              <img
                src="/fbl.png"
                alt="Facebook"
                className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition cursor-pointer"
              />
            </a>

            {/* X / Twitter Icon */}
            <img
              src="X.png"
              alt="Twitter"
              className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Export component so it can be used in App.jsx or other pages
export default Footer;