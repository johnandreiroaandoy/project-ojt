import React, { useState, useEffect } from 'react';

function Header({ activeTab, setActiveTab }) {
  const navLinks = ['HOME', 'MANDATE', 'SERVICES', 'REPORTS', 'CONTACT US'];

  // State to hold the current time
  const [time, setTime] = useState(new Date());
  
  // 1. State to track mobile menu toggle visibility
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

  // Helper to change tab and auto-close mobile drawer
  const handleNavigation = (link) => {
    setActiveTab(link);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full font-sans antialiased">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-gradient-to-r from-[#002B5B] to-[#003d82] text-white py-2.5 px-4 md:px-12 flex justify-between items-center text-[10px] sm:text-[11px] font-semibold tracking-wide border-b border-white/10 shadow-sm">
        <div className="italic opacity-80 hidden lg:block uppercase tracking-widest">
          The Official Website of the City Government of Davao
        </div>
        <div className="flex items-center space-x-8 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex items-center space-x-3 bg-white/10 px-3 py-1 rounded-full border border-white/5">
            <img src="https://flagcdn.com/w20/ph.png" alt="PH Flag" className="h-3.5 rounded-sm" />
            <span className="opacity-90 tabular-nums">
              {formatDateTime(time)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 px-4 md:px-12 flex justify-between items-center shadow-sm border-b border-gray-200/50">
        <div className="flex items-center gap-4 group">
          <img src="dcplinado.png" alt="Logo" className="h-10 w-auto object-contain" />
          <div className="h-8 w-[2px] bg-[#002B5B] opacity-20"></div>
          <img src="davao.png" alt="Seal" className="h-14 w-14 object-contain" />
        </div>

        {/* DESKTOP NAV LINKS USING PROPS */}
        <div className="hidden lg:flex items-center space-x-8 text-[#2d3436] font-extrabold text-[13px] tracking-tight">
          {navLinks.map((link) => (
            <button 
              key={link} 
              onClick={() => setActiveTab(link)}
              className="relative group py-1 cursor-pointer outline-none"
            >
              <span className={`${activeTab === link ? 'text-blue-700' : 'group-hover:text-blue-600'} transition-colors uppercase`}>
                {link}
              </span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transition-transform duration-300 transform 
                ${activeTab === link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}>
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-all">
            <img src="icon.webp" alt="Search" className="w-5 h-5 opacity-60" />
          </button>
          <div className="hidden sm:block border-l pl-6 border-gray-200">
            <img src="iso.jpg" alt="ISO" className="h-11 grayscale opacity-70" />
          </div>

          {/* 2. HAMBURGER BUTTON (VISIBLE ON MOBILE/TABLET ONLY) */}
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

      {/* 3. MOBILE DROPDOWN MENU PANEL */}
      <div className={`lg:hidden w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 flex flex-col space-y-3 font-extrabold text-sm text-[#2d3436]">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavigation(link)}
              className={`w-full text-left py-2 border-b border-gray-50 last:border-none transition-colors ${activeTab === link ? 'text-blue-700 pl-2 border-l-2 border-l-blue-600' : 'hover:text-blue-600'}`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* 4. HERO BANNER - ONLY VISIBLE ON HOME */}
      {activeTab === 'HOME' && (
        <div 
          className="relative text-white py-24 px-4 md:px-12 overflow-hidden shadow-2xl animate-fadeIn bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('bg.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B5B]/90 to-[#001f42]/70 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform translate-x-20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-md border border-white/20 backdrop-blur-sm mb-6">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-blue-200">
                City Government of Davao
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                City Accountant's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Office</span>
            </h1>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;