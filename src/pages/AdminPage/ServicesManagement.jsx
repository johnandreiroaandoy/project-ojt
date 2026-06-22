import React, { useState } from 'react';

// 📂 Import the 5 separate service editor components from your ServicesEditor folder
import CertificationOfPayslip from './ServicesEditor/CertificationOfPayslip';
import CertificateOfRemittances from './ServicesEditor/CertificateOfRemittances';
import PhotocopyOfDisbursement from './ServicesEditor/PhotocopyOfDisbursement';
import CertificationOnSalaryReceived from './ServicesEditor/CertificationOnSalaryReceived';
import Elap from './ServicesEditor/Elap';

function ServicesManagement({ state, setState, onSave }) {
  // Grab environmental URL context for inner dynamic fetch routines
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Local state tracker to swap between standard menu view and dedicated card config mode
  const [selectedServiceId, setSelectedServiceId] = useState(null);

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

  // ➕ Appends an entirely fresh functional card instance without wiping out the system rulesets
  const handleAddCard = () => {
    const newCard = {
      id: "srv_" + Date.now(),
      title: "New Local Government Service Function Entry",
      icon: "💼",
      desc: ""
    };
    setState(prev => ({ ...prev, cards: [...(prev?.cards || []), newCard] }));
  };

  // 🗑️ Purges an entry out of the live cards array tracking pipeline
  const handleDeleteCard = (index) => {
    if (!window.confirm("🚨 Delete this strategic service capability card from the live catalog mapping structure?")) return;
    setState(prev => ({ ...prev, cards: (prev?.cards || []).filter((_, idx) => idx !== index) }));
  };

  // 🔀 DIRECT ROUTING TO SUB-EDITORS (No EditorHub Wrapper Needed)
  if (selectedServiceId) {
    const handleBack = () => setSelectedServiceId(null);

    // Trim whitespace to protect router match stability
    switch (selectedServiceId.trim()) {
      case "Certification of Payslip":
        return <CertificationOfPayslip onBack={handleBack} baseUrl={baseUrl} targetFile="certification_payslip.json" />;
      case "Certificate of Remittances":
        return <CertificateOfRemittances onBack={handleBack} baseUrl={baseUrl} targetFile="certificate_remittances.json" />;
      case "Photocopy of Disbursement":
        return <PhotocopyOfDisbursement onBack={handleBack} baseUrl={baseUrl} targetFile="photocopy_disbursement.json" />;
      case "Certification on Salary Received":
        return <CertificationOnSalaryReceived onBack={handleBack} baseUrl={baseUrl} targetFile="certification_salary.json" />;
      case "elap":
        return <Elap onBack={handleBack} baseUrl={baseUrl} targetFile="services_elap.json" />;
      default:
        return (
          <div className="p-6 bg-amber-50 rounded-xl text-amber-800 text-xs font-bold text-center">
            ⚠️ No dedicated custom file configuration mapped for key ID: "{selectedServiceId}".
            <p className="text-[10px] text-slate-500 mt-1 font-normal">Ensure your Tracking ID exactly matches the router cases.</p>
            <button onClick={handleBack} className="block mx-auto mt-2 text-blue-600 underline cursor-pointer">Go Back</button>
          </div>
        );
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SECTION 1: CORE 5 SERVICES CLICKABLE REGISTRY MATRIX TARGET HUB */}
      <div className="bg-[#002B5B]/5 p-5 rounded-2xl border border-[#002B5B]/10 space-y-4">
        <div>
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">
            🎯 Core 5 Services Registry Matrix
          </span>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Click any active operational matrix card below to drop down into its isolated content data layer workspace.
          </p>
        </div>
        
        {/* Clickable Card Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          {cardsList.map((card, idx) => {
            // Guarantee a unique node rendering key identification point
            const fallbackKey = card.id ? `matrix-node-${card.id}` : `matrix-node-idx-${idx}`;
            return (
              <button
                key={fallbackKey}
                type="button"
                onClick={() => setSelectedServiceId(card.id)}
                className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-center transition-all hover:scale-[1.02] hover:shadow-sm cursor-pointer flex flex-col justify-between items-center group text-wrap w-full"
              >
                <div>
                  <span className="text-xl block mb-2 group-hover:animate-bounce">{card.icon || '📄'}</span>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight line-clamp-3 block leading-tight=none">
                    {card.id || 'Unnamed ID'}
                  </span>
                </div>
                <span className="text-[8px] font-black text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors uppercase tracking-widest py-1 px-2 rounded mt-3 block">
                  ⚙️ Enter Editor
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: GLOBAL LAYOUT TEXT MANIFEST SETTINGS */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">🌍 Dashboard Layout Meta Configuration</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Main Section Heading Title</label>
            <input 
              type="text" 
              value={header.title} 
              onChange={e => handleUpdateMeta('header', 'title', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-bold text-slate-700 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Section Subtitle / Description</label>
            <input 
              type="text" 
              value={header.subtitle} 
              onChange={e => handleUpdateMeta('header', 'subtitle', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-semibold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Back Button Text Display</label>
            <input 
              type="text" 
              value={controls.backButton} 
              onChange={e => handleUpdateMeta('controls', 'backButton', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-semibold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Card Action CTA text</label>
            <input 
              type="text" 
              value={controls.actionButton} 
              onChange={e => handleUpdateMeta('controls', 'actionButton', e.target.value)} 
              className="w-full p-2.5 border rounded-lg mt-1 text-xs font-semibold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: INDIVIDUAL DEEP CORE SERVICE CARDS MAPPER LOOP */}
      <div className="space-y-4">
        <div className="border-b pb-3 flex justify-between items-center">
          <div>
            <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide">📋 Active Office Service Cards ({cardsList.length})</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Edit or add cards which construct rows directly inside the public client interface.</p>
          </div>
          <button 
            type="button" 
            onClick={handleAddCard}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider py-2 px-3 rounded-md transition-colors cursor-pointer shadow-sm"
          >
            ➕ Append Fresh Card
          </button>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {cardsList.map((card, index) => {
            // ✨ STABLE RENDER KEYS LINKED DIRECTLY TO THE VALUE OBJECT
            const rowStableKey = card.id ? `card-block-id-${card.id}` : `card-block-idx-${index}`;
            
            return (
              <div key={rowStableKey} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative group shadow-sm hover:border-slate-300 transition-colors">
                
                <button
                  type="button"
                  onClick={() => handleDeleteCard(index)}
                  className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 bg-slate-50 hover:bg-rose-50 border rounded-lg py-1 px-2 text-[9px] font-black uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  ✕ Purge Entry
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
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

                  <div className="md:col-span-2 pr-16 md:pr-0">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Emoji Visual Glyph</label>
                    <input 
                      type="text" 
                      value={card.icon || '💼'} 
                      onChange={e => handleUpdateCardField(index, 'icon', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg mt-1 text-sm text-center bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Additional Context / Remarks Description (Optional)</label>
                  <input 
                    type="text" 
                    value={card.desc || ''} 
                    onChange={e => handleUpdateCardField(index, 'desc', e.target.value)}
                    placeholder="Insert custom notes, processing timescales, or department exceptions..."
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