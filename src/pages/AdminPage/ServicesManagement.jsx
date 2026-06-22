import React from 'react';

function ServicesManagement({ state, setState, onSave }) {
  // Extract cards safely by targeting the exact structural key in your JSON configuration file
  const cardsList = state?.cards || [];
  const header = state?.header || { title: "Core Services", subtitle: "" };
  const controls = state?.controls || { backButton: "← Back", actionButton: "Read More" };

  // Immutably updates metadata headers or button control text fields
  const handleUpdateMeta = (section, field, value) => {
    setState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Immutably updates an individual item embedded deep inside the cards array stack
  const handleUpdateCardField = (index, field, value) => {
    const updatedCards = cardsList.map((card, idx) => 
      idx === index ? { ...card, [field]: value } : card
    );

    setState(prev => ({
      ...prev,
      cards: updatedCards
    }));
  };

  // ➕ Appends an entirely fresh functional card instance without wiping out the system rulesets
  const handleAddCard = () => {
    const newCard = {
      id: "srv_" + Date.now(),
      title: "New Local Government Service Function Entry",
      icon: "💼"
    };

    setState(prev => ({
      ...prev,
      cards: [...cardsList, newCard]
    }));
  };

  // 🗑️ Purges an entry out of the live cards array array index tracking pipeline
  const handleDeleteCard = (index) => {
    if (!window.confirm("🚨 Delete this strategic service capability card from the live catalog mapping structure?")) return;

    setState(prev => ({
      ...prev,
      cards: cardsList.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: GLOBAL LAYOUT TEXT MANIFEST SETTINGS */}
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Section Subtitle / Description Description</label>
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

      {/* SECTION 2: INDIVIDUAL DEEP CORE SERVICE CARDS MAPPER LOOP */}
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
          {cardsList.map((card, index) => (
            <div key={card.id || `card-${index}`} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative group shadow-sm hover:border-slate-300 transition-colors">
              
              {/* Absoluted Top Right Corner Termination Switch */}
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
                    className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg mt-1 text-xs font-mono font-bold text-slate-500 outline-none"
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

              {/* Optional Field: Only shows input row if 'desc' parameter is present or being edited */}
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
          ))}
        </div>
      </div>

      {/* COMMIT ACTION PANEL BUTTON */}
      <button 
        onClick={() => onSave('services_directory.json', state)} 
        className="mt-4 bg-[#002B5B] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-widest py-3 px-8 rounded-xl transition-all shadow-md cursor-pointer"
      >
        💾 Save System Directory Changes
      </button>
    </div>
  );
}

export default ServicesManagement;