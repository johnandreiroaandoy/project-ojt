import React from 'react';
import "tailwindcss";

function Footer() {
  return (
    <footer className="w-full font-sans antialiased bg-[#f8f9fa] border-t border-gray-200">
      {/* 1. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Office Branding */}
       <div className="space-y-4">
  {/* Branding Wrapper */}
  <div className="flex items-center gap-4">
    {/* Left Logo: Davao City Seal */}
    <img 
      src="davao.png" 
      alt="Davao City Seal" 
      className="h-16 w-16 object-contain"
    />
    
    {/* Vertical divider line to keep things structured */}
    <div className="h-12 w-[1.5px] bg-[#002B5B] opacity-20"></div>

    {/* Right Logo: Your Brand/Office Image (Replaces DABAWENYO D.C.PLINADO text) */}
    <img 
      src="dcplinado.png" // Replace with your logo's filename or path (e.g., brand-logo.png)
      alt="Dabawenyo DCPlinado Logo" 
      className="h-14 w-40 object-contain" // h-14 matches the visual height of the city seal nicely
    />
  </div>

  {/* Description Text */}
  <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
    Ensuring fiscal integrity and transparent financial management for the City of Davao.
  </p>
</div>
        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm font-bold text-gray-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors uppercase">Know Davao City</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors uppercase">City Departments</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors uppercase">Online Services</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors uppercase">Transparency Seal</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm text-gray-600 font-medium">
            <li className="flex gap-3">
              <img src="phone.png" alt="" className="w-6 h-6 opacity-100" />
              <span>(082) 222-1234 / Local 505</span>
            </li>
            <li className="flex gap-3">
              <img src="at.png" alt="" className="w-6 h-6 opacity-100" />
              <a href="mailto:accountant@davaocity.gov.ph" className="hover:text-blue-600 underline decoration-blue-200">accountant@davaocity.gov.ph</a>
            </li>
            <li className="flex gap-3 text-xs leading-relaxed">
              <img src="ct.png" alt="" className="w-6 h-6 mt-1" />
              <span>3rd Floor, City Hall Building, <br />City Hall Drive, Davao City, 8000</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Government Agencies */}
        <div>
          <h3 className="text-[#002B5B] font-black text-sm uppercase tracking-widest mb-6">Government Portals</h3>
          <div className="grid grid-cols-2 gap-4">
            <img src="republic.png" alt="Republic of the Philippines" className="h-16 w-16 object-contain grayscale hover:scale-150 hover:grayscale-0 transition-all opacity-60 hover:opacity-100" />
            <img src="bagong.png" alt="Bagong Pilipinas" className="h-16 w-16 object-contain grayscale hover:scale-150 hover:grayscale-0 transition-all opacity-60 hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* 2. BOTTOM BAR - Davao Blue */}
      <div className="bg-[#002B5B] py-6 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white text-[10px] md:text-[11px] font-medium tracking-wider gap-4">
          <div className="text-center md:text-left opacity-80 uppercase">
            © 2026 City Government of Davao. All Rights Reserved.
          </div>
          
          <div className="flex items-center space-x-2">
            <a href="#" className="hover:text-blue-300 transition-colors uppercase">Privacy Policy</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-blue-300 transition-colors uppercase">Terms of Use</a>
            <span className="opacity-30">|</span>
            <div className="flex gap-1 border-l border-white/20 "></div>
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
            <div className="flex gap-1 border-l border-white/20 "></div>  
               <img src="X.png" alt="Twitter" className="h-7 w-7 opacity-70 hover:scale-150 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;