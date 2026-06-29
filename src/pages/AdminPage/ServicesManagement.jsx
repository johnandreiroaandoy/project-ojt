import React, { useEffect, useState } from 'react';

// 📂 Import the 5 separate service editor components from your ServicesEditor folder
import CertificationOfPayslip from './ServicesEditor/CertificationOfPayslip';
import CertificateOfRemittances from './ServicesEditor/CertificateOfRemittances';
import PhotocopyOfDisbursement from './ServicesEditor/PhotocopyOfDisbursement';
import CertificationOnSalaryReceived from './ServicesEditor/CertificationOnSalaryReceived';
import Elap from './ServicesEditor/Elap';

// 🚀 NEW IMPORT: Reusable template editor handling any custom additions automatically
import GenericServiceEditor from './ServicesEditor/GenericServiceEditor';

function ServicesManagement({ baseUrl, onSave }) {
  // Grab environmental URL context for inner dynamic fetch routines
  const [state, setState] = useState({ header: { title: '', subtitle: '' }, controls: { backButton: '', actionButton: '' }, cards: [] });
  
  // Local state tracker to swap between standard menu view and dedicated card config mode
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    fetch(`${baseUrl}/data/services_directory.json${cacheBuster}`)
      .then(res => res.json())
      .catch(() => ({ header: {}, controls: {}, cards: [] }))
      .then(directoryData => {
        setState({
          header: {
            title: directoryData.header?.title || '',
            subtitle: directoryData.header?.subtitle || ''
          },
          controls: {
            backButton: directoryData.controls?.backButton || '',
            actionButton: directoryData.controls?.actionButton || ''
          },
          cards: directoryData.cards || []
        });
      });
  }, [baseUrl]);

  const cardsList = state?.cards || [];
  const header = state?.header || { title: "Core Services", subtitle: "" };
  const controls = state?.controls || { backButton: "← Back", actionButton: "Read More" };

  // Immutably updates metadata headers or button control text fields
  const handleUpdateMeta = (section, field, value) => {
    setState(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  // Immutably updates an individual item embedded deep inside the cards array stack
  const handleUpdateCardField = (index, field, value) => {
    setState(prev => {
      const updatedCards = (prev?.cards || []).map((card, idx) => 
        idx === index ? { ...card, [field]: value } : card
      );
      return { ...prev, cards: updatedCards };
    });
  };

  // ➕ Appends an entirely fresh functional card instance with active configuration by default
  const handleAddCard = () => {
    const newCard = {
      id: "srv_" + Date.now(),
      title: "New Strategic Service Capability Function",
      icon: "💼",
      desc: "",
      status: "active" // 🟢 Default status parameter initialized
    };
    setState(prev => ({ ...prev, cards: [...(prev?.cards || []), newCard] }));
  };

  // 🔄 TOGGLE VISIBILITY STATUS (DISABLE / ENABLE CORE SERVICE)
  const handleToggleStatus = (index) => {
    setState(prev => {
      const updatedCards = (prev?.cards || []).map((card, idx) => {
        if (idx === index) {
          const currentStatus = card.status || 'active';
          return { ...card, status: currentStatus === 'active' ? 'disabled' : 'active' };
        }
        return card;
      });
      return { ...prev, cards: updatedCards };
    });
  };

  // 🗑️ Purges custom added service entries completely
  const handleDeleteCard = (index) => {
    if (!window.confirm("🚨 Permanently wipe this service entry out of the system directory dataset?")) return;
    setState(prev => ({ ...prev, cards: (prev?.cards || []).filter((_, idx) => idx !== index) }));
  };

  // 🔀 DIRECT ROUTING TO SUB-EDITORS (No EditorHub Wrapper Needed)
  if (selectedServiceId) {
    const handleBack = () => setSelectedServiceId(null);
    const cleanId = selectedServiceId.trim();

    switch (cleanId) {
      case "Certification of Payslip":
        return <CertificationOfPayslip onBack={handleBack} baseUrl={baseUrl} targetFile="certification_payslip.json" />;
      case "Certificate of Remittances":
        return <CertificateOfRemittances onBack={handleBack} baseUrl={baseUrl} targetFile="certificate_remittances.json" />;
      case "Photocopy of Disbursement":
        return <PhotocopyOfDisbursement onBack={handleBack} baseUrl={baseUrl} targetFile="photocopy_disbursement.json" />;
      case "Certification on Salary Received":
        return <CertificationOnSalaryReceived onBack={handleBack} baseUrl={baseUrl} targetFile="certification_salary.json" />;
      case "elap":
      case "Emergency Loan Assistance":
        return <Elap onBack={handleBack} baseUrl={baseUrl} targetFile="services_elap.json" />;
      
      // 🛠️ THE FIX: Pass the working onSave utility prop straight down into our generic editor blueprint
      default:
        const safeJsonFilename = `services_${cleanId.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
        
        return (
          <GenericServiceEditor 
            serviceId={cleanId}
            onBack={handleBack} 
            baseUrl={baseUrl} 
            targetFile={safeJsonFilename} 
            onSave={onSave} // 👈 REUSES YOUR DASHBOARD SAVE SYSTEM
          />
        );
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SECTION 1: CORE SERVICES MATRIX LINKAGE TILES */}
      <div className="bg-[#002B5B]/5 p-5 rounded-2xl border border-[#002B5B]/10 space-y-4">
        <div>
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">
            🎯 Core Services Registry Matrix
          </span>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Click any active matrix component to manage inner dynamic content data layer profiles. Grayed tiles represent disabled services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          {cardsList.map((card, idx) => {
            const isCardDisabled = card.status === 'disabled';
            const fallbackKey = card.id ? `matrix-node-${card.id}` : `matrix-node-idx-${idx}`;
            
            return (
              <button
                key={fallbackKey}
                type="button"
                onClick={() => setSelectedServiceId(card.id)}
                className={`p-4 rounded-xl border text-center transition-all hover:scale-[1.02] hover:shadow-sm cursor-pointer flex flex-col justify-between items-center group text-wrap w-full relative ${
                  isCardDisabled 
                    ? 'bg-gray-100/80 border-gray-200 text-gray-400 grayscale' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {isCardDisabled && (
                  <span className="absolute top-2 right-2 text-[7px] font-black tracking-widest uppercase bg-red-100 text-red-700 px-1 rounded">
                    OFFLINE
                  </span>
                )}
                <div>
                  <span className="text-xl block mb-2 group-hover:animate-bounce">{card.icon || '📄'}</span>
                  <span className="text-[10px] font-black uppercase tracking-tight line-clamp-3 block leading-tight">
                    {card.id || 'Unnamed ID'}
                  </span>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest py-1 px-2 rounded mt-3 block transition-colors ${
                  isCardDisabled 
                    ? 'bg-gray-200 text-gray-400 group-hover:bg-gray-300' 
                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                  ⚙️ Enter Editor
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: GLOBAL META CONFIG */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">🌍 Dashboard Layout Meta Configuration</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Main Section Heading Title</label>
            <input 
              type="text" 
              value={header.title} 
              onChange={e => handleUpdateMeta('header', 'title', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-bold text-slate-700 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Section Subtitle / Description</label>
            <input 
              type="text" 
              value={header.subtitle} 
              onChange={e => handleUpdateMeta('header', 'subtitle', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-semibold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: EDIT AND TOGGLE CAPABILITY REGISTRY WORKSPACE */}
      <div className="space-y-4">
        <div className="border-b pb-3 flex justify-between items-center">
          <div>
            <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide">📋 Manage Active Registry Cards ({cardsList.length})</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Toggle live display status or instantly add completely new system services.</p>
          </div>
          <button 
            type="button" 
            onClick={handleAddCard}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider py-2 px-3 rounded-md transition-colors cursor-pointer shadow-sm"
          >
            ➕ Add Core Service
          </button>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {cardsList.map((card, index) => {
            const rowStableKey = `card-block-row-idx-${index}`;
            const isCardActive = (card.status || 'active') === 'active';
            
            return (
              <div key={rowStableKey} className={`p-4 border rounded-xl space-y-3 relative group shadow-sm transition-all ${
                isCardActive ? 'bg-white border-slate-200' : 'bg-gray-50/50 border-gray-200 opacity-75'
              }`}>
                
                {/* RUNTIME OPTION PANEL CONTROLS */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(index)}
                    className={`py-1 px-2 text-[9px] font-black uppercase tracking-wider border rounded-lg transition-colors cursor-pointer ${
                      isCardActive 
                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200' 
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200'
                    }`}
                  >
                    {isCardActive ? "🛑 Disable" : "✅ Enable"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCard(index)}
                    className="text-rose-500 hover:text-rose-700 bg-white border border-slate-100 rounded-lg py-1 px-2 text-[9px] font-black uppercase tracking-wider cursor-pointer shadow-sm"
                  >
                    ✕ Wipe
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4">
                  <div className="md:col-span-3">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Tracking Primary Identifier (ID)</label>
                    <input 
                      type="text" 
                      value={card.id || ''} 
                      onChange={e => handleUpdateCardField(index, 'id', e.target.value)}
                      className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg mt-1 text-xs font-mono font-bold text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-7">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Strategic Function / Issuance Title</label>
                    <input 
                      type="text" 
                      value={card.title || ''} 
                      onChange={e => handleUpdateCardField(index, 'title', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg mt-1 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Emoji Icon</label>
                    <input 
                      type="text" 
                      value={card.icon || '💼'} 
                      onChange={e => handleUpdateCardField(index, 'icon', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg mt-1 text-sm text-center bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Additional Context Remarks</label>
                  <input 
                    type="text" 
                    value={card.desc || ''} 
                    onChange={e => handleUpdateCardField(index, 'desc', e.target.value)}
                    placeholder="Insert custom notes, timescales, or exceptions..."
                    className="w-full p-2 border border-slate-100 rounded-lg mt-1 text-xs text-slate-500 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* COMMIT ACTION PANEL BUTTON */}
      <button 
        type="button"
        onClick={() => onSave('services_directory.json', state)} 
        className="mt-4 bg-[#002B5B] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-widest py-3 px-8 rounded-xl transition-all shadow-md cursor-pointer"
      >
        💾 Save System Directory Changes
      </button>
    </div>
  );
}

export default ServicesManagement;
