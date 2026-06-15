// import React: Brings in the foundational library framework engine.
import React from 'react';

// Multi-Source Imports: Separates data contexts out into dedicated variable mappings
import servicesData from '../data/services.json'; 
import contactData from '../data/contact_info.json'; 

function Home() {
  return (
    <div className="w-full bg-slate-50/50 py-12 animate-fadeIn">
      
      {/* SECTION 1: SERVICES RENDER MATRIX */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-xl md:text-2xl text-center mb-12 font-black text-[#002B5B] uppercase tracking-wide">
          {servicesData.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {servicesData.cards.map((service) => (
            <div key={service.id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-500 shadow-lg shadow-slate-500 flex flex-col transition-all duration-300 hover:shadow-xl">
              
              <h3 className="text-lg font-black text-[#002B5B] uppercase italic tracking-tight border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${service.accentColor}`}></span>
                {service.title}
              </h3>

              <ul className="space-y-3 text-slate-600 font-medium text-sm md:text-base list-none pl-0">
                <li className="flex items-start gap-2 text-slate-700 font-semibold mb-4 leading-relaxed">
                  {service.mainDescription}
                </li>

                {service.items.map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 ${index === 1 || index === 2 || index === 3 ? 'pl-4 text-slate-500 text-xs md:text-sm' : ''}`}>
                    <span className={`${index === 1 || index === 2 || index === 3 ? 'text-slate-400' : service.bulletColor} mt-1 select-none`}>•</span>
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: OFFICE CONTACT INFORMATION */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#002B5B] to-[#001f42] text-white p-8 rounded-2xl shadow-xl shadow-slate-500 border border-white/10">
          
          {/* Fully decoupled text block assembling independent parameters mapped from contact_info.json */}
          <p className="text-xl md:text-base text-slate-200 font-large leading-relaxed mb-4">
            {contactData.heading} <strong>{contactData.roomNumber}</strong>, {contactData.floor}, {contactData.building}, {contactData.street}, {contactData.city}.
            <br /><br />
            {contactData.phoneLabel} <strong>{contactData.phoneNumber}</strong> {contactData.localLines} {contactData.emailLabel}:
            <br />
            <span className="underline text-white font-semibold">{contactData.emails[0]}</span> or <span className="underline text-white font-semibold">{contactData.emails[1]}</span>
          </p>
          
        </div>
      </div>

    </div>
  );
}

export default Home;