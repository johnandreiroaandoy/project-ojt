import React from 'react';

// Decoupled Structural Content Mapping Sources
import mandateData from '../data/mandate_data.json';
import vmData from '../data/vision_mission.json';

function Mandate() {
  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto">

        {/* DECOUPLED COMPONENT HEADER */}
        <div className="mb-16 border-l-8 border-[#002B5B] pl-8">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter leading-none">
            {mandateData.headerTitle} <br />
            <span className="text-blue-600">{mandateData.headerSubtitle}</span>
          </h2>
          <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-sm">
            {mandateData.legalBasis}
          </p>
        </div>

        {/* TWO-COLUMN CONTENT DISPATCHER MATRIX */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE: STATUTORY AND COMPLIANCE RULES */}
          <div className="space-y-8">
            
            {/* CARD 1: THE MANDATE QUOTE MODULE */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-[#002B5B] font-black text-xl mb-4 uppercase">
                {mandateData.mandate.title}
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                {mandateData.mandate.quote}
              </p>
              <p className="text-sm text-blue-600 font-bold mt-4">
                {mandateData.mandate.citation}
              </p>
            </div>

            {/* CARD 2: DYNAMIC GENERAL POWERS POOL */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-[#002B5B] font-black text-xl uppercase mb-4">
                {mandateData.powers.title}
              </h3>
              <ul className="space-y-4">
                {mandateData.powers.list.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: STRATEGIC INSTITUTIONAL GOALS */}
          <div className="flex flex-col gap-8">

            {/* CARD 3: VISION STATEMENT WRAPPER */}
            <div className="bg-[#002B5B] text-white p-11 rounded-2xl shadow-md relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-blue-400 font-black text-2xl uppercase mb-4">
                  {vmData.vision.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-90">
                  {vmData.vision.statement}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            </div>

            {/* CARD 4: MISSION STATEMENT WRAPPER */}
            <div className="bg-blue-50 border border-blue-800 p-11 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-blue-700 font-black text-2xl uppercase mb-4">
                {vmData.mission.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {vmData.mission.statement}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Mandate;