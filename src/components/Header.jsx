import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Decoupled Structural Content Mapping Source
import headerData from '../data/header_data.json';

function Header() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Setup interval to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    return date.toLocaleString('en-US', options).replace(' at ', ' | ');
  };

  return (
    <header className="w-full font-sans antialiased">
      
      {/* ==========================================================
          1. TOP UTILITY BAR (DECOUPLED ASSETS)
      ========================================================== */}
      <div className="bg-gradient-to-r from-[#002B5B] to-[#003d82] text-white py-2.5 px-4 md:px-12 flex justify-between items-center text-[10px] sm:text-[11px] font-semibold tracking-wide border-b border-white/10 shadow-sm">
        <div className="italic opacity-80 hidden lg:block uppercase tracking-widest">
          {headerData.topBar.officialTagline}
        </div>
        <div className="flex items-center space-x-8 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex items-center space-x-3 bg-white/10 px-3 py-1 rounded-full border border-white/5">
            <img 
              src={headerData.topBar.flagUrl} 
              alt={headerData.topBar.flagAlt} 
              className="h-3.5 rounded-sm" 
            />
            <span className="opacity-90 tabular-nums">
              {formatDateTime(time)}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          2. MAIN NAVIGATION
      ========================================================== */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-12 flex justify-between items-center shadow-sm border-b border-gray-200/50">
        <div className="flex items-center gap-4 group">
          <img src={headerData.branding.logoSrc} alt={headerData.branding.logoAlt} className="h-10 w-auto object-contain" />
          <div className="h-8 w-[2px] bg-[#002B5B] opacity-20"></div>
          <img src={headerData.branding.sealSrc} alt={headerData.branding.sealAlt} className="h-14 w-14 object-contain" />
          <div className="h-8 w-[2px] bg-[#002B5B] opacity-20"></div>
          <img src={headerData.branding.officeSealSrc} alt={headerData.branding.officeSealAlt} className="h-14 w-14 object-contain" />
        </div>

        {/* DESKTOP LINKS STREAMED VIA JSON MAP */}
        <div className="hidden lg:flex items-center space-x-8 text-[#2d3436] font-extrabold text-[13px] tracking-tight">
          {headerData.navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => `relative group py-1 cursor-pointer outline-none transition-colors uppercase hover:scale-120 ${isActive ? 'text-yellow-700' : 'hover:text-blue-600'}`}
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-300 transition-transform duration-300 transform 
                    ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <button className="p-2.5 hover:scale-135 hover:bg-gray-100 rounded-full transition-all">
            <img src={headerData.branding.searchIconSrc} alt={headerData.branding.searchAlt} className="w-5 h-5 opacity-100" />
          </button>
          <div className="hidden sm:block border-l pl-6 border-gray-200">
            <img src={headerData.branding.isoSrc} alt={headerData.branding.isoAlt} className="h-11 grayscale opacity-80" />
          </div>

          {/* HAMBURGER BUTTON (MOBILE) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center lg:hidden w-8 h-8 space-y-1.5 focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-0.5 bg-[#002B5B] transition-transform duration-300 origin-center ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#002B5B] transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-[#002B5B] transition-transform duration-300 origin-center ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* ==========================================================
          3. MOBILE DROPDOWN PANEL
      ========================================================== */}
      <div className={`lg:hidden w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 flex flex-col space-y-3 font-extrabold text-sm text-[#2d3436]">
          {headerData.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `w-full text-left py-2 border-b border-gray-50 last:border-none transition-all ${isActive ? 'text-blue-700 pl-2 border-l-2 border-l-blue-600' : 'hover:text-blue-600'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* ==========================================================
          4. HERO BANNER (ONLY VISIBLE ON HOME /)
      ========================================================== */}
      {location.pathname === '/' && (
        <div 
          className="relative text-white py-30 px-6 md:px-16 overflow-hidden shadow-2xl animate-fadeIn bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${headerData.hero.bgImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B5B]/40 to-[#001f42]/70 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="text-left flex-1">
              <div className="inline-block px-10 py-2 bg-blue-500/20 rounded-md border border-white/50 backdrop-blur-sm mb-6">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-blue-200 m-0">
                  {headerData.hero.tagline}
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl m-0">
                {headerData.hero.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  {headerData.hero.titleLine2}
                </span>
              </h1>
            </div>
            
            <div className="flex shrink-0 items-center justify-center w-full md:w-auto animate-fadeIn pr-0 md:pr-4">
              <img 
                src={headerData.branding.officeSealSrc} 
                alt={headerData.branding.officeSealAlt} 
                className="h-36 w-36 md:h-80 md:w-80 object-contain drop-shadow-[0_10px_15px_rgba(255,255,255,85)] filter contrast-150 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;