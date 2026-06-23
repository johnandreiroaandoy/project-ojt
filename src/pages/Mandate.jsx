import React, { useState, useEffect } from 'react';

function Mandate() {
  /* ==========================================================
      STATE VARIABLES
  ========================================================== */
  const [mandateData, setMandateData] = useState(null);
  const [vmData, setVmData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Grab the base URL dynamically from your centralized configuration rules
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
      ASYNC DATA FETCH SYNC PIPELINE (XAMPP ENDPOINTS)
  ========================================================== */
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    // 🟢 FIXED: Concurrently pull configurations from your new public project layout path
    Promise.all([
      fetch(`${baseUrl}/data/mandate_data.json${cacheBuster}`).then((res) => {
        if (!res.ok) throw new Error('Mandate specifications file missing on server.');
        return res.json();
      }),
      fetch(`${baseUrl}/data/vision_mission.json${cacheBuster}`).then((res) => {
        if (!res.ok) throw new Error('Vision/Mission properties file missing on server.');
        return res.json();
      })
    ])
      .then(([mandatePayload, vmPayload]) => {
        setMandateData(mandatePayload);
        setVmData(vmPayload);
      })
      .catch((error) => {
        console.error('Error hydrating Mandate view dependencies:', error);
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
      <div className="flex items-center justify-center py-32 text-gray-400 text-sm font-semibold max-w-7xl mx-auto animate-pulse select-none">
        🔄 Accessing local asset server to populate compliance models...
      </div>
    );
  }

  if (!mandateData || !vmData) {
    return (
      <div className="max-w-7xl mx-auto my-12 p-6 bg-red-50 text-red-800 rounded-2xl text-sm font-bold border border-red-100 shadow-sm">
        ⚠️ Environment Error: Failed to cleanly mount remote configurations from local server.
        <br />
        <span className="text-xs font-normal text-red-600 block mt-2">
          Verify that your json targets exist inside: <code>C:\xampp\htdocs\backend-project-ojt\public\data\</code>
        </span>
      </div>
    );
  }

  // Safe default initialization fallbacks against missing object parameters
  const mandateInfo = mandateData.mandate || {};
  const powersInfo = mandateData.powers || {};
  const powersList = powersInfo.list || [];
  
  const visionInfo = vmData.vision || {};
  const missionInfo = vmData.mission || {};

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto">

        {/* DECOUPLED COMPONENT HEADER */}
        <div className="mb-16 border-l-8 border-[#002B5B] pl-8">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter leading-none">
            {mandateData.headerTitle} <br />
            <span className="text-blue-600">{mandateData.headerSubtitle}</span>
          </h2>
          <p className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-xs">
            {mandateData.legalBasis}
          </p>
        </div>

        {/* TWO-COLUMN CONTENT DISPATCHER MATRIX */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE: STATUTORY AND COMPLIANCE RULES */}
          <div className="space-y-8">
            
            {/* CARD 1: THE MANDATE QUOTE MODULE */}
            <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-[#002B5B] font-black text-xl mb-4 uppercase tracking-tight">
                {mandateInfo.title}
              </h3>
              <p className="text-gray-600 leading-relaxed italic font-medium">
                "{mandateInfo.quote}"
              </p>
              <p className="text-xs text-blue-600 font-black uppercase tracking-wider mt-6">
                {mandateInfo.citation}
              </p>
            </div>

            {/* CARD 2: DYNAMIC GENERAL POWERS POOL */}
            <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-[#002B5B] font-black text-xl uppercase tracking-tight mb-6">
                {powersInfo.title}
              </h3>
              <ul className="space-y-4">
                {powersList.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="bg-[#002B5B] text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shrink-0 min-w-[24px] text-center select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: STRATEGIC INSTITUTIONAL GOALS */}
          <div className="space-y-8">

            {/* CARD 3: VISION STATEMENT WRAPPER */}
            <div className="bg-gradient-to-br from-[#002B5B] to-[#001f42] text-white p-10 rounded-2xl shadow-md relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl">
              <div className="relative z-10">
                <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase block mb-1">
                  Strategic Horizon
                </span>
                <h3 className="text-white font-black text-2xl uppercase mb-4 tracking-tight">
                  {visionInfo.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-200 font-medium">
                  {visionInfo.statement}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-sm pointer-events-none"></div>
            </div>

            {/* CARD 4: MISSION STATEMENT WRAPPER */}
            <div className="bg-blue-50/40 border border-blue-100/70 p-10 rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block mb-1">
                Core Execution
              </span>
              <h3 className="text-blue-900 font-black text-2xl uppercase mb-4 tracking-tight">
                {missionInfo.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">
                {missionInfo.statement}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Mandate;