import React, { useEffect, useRef } from 'react';

function CoreServicesSection({ servicesState, setServicesState, onSave }) {
  const originalServicesMock = useRef(null);

  useEffect(() => {
    if (servicesState && !originalServicesMock.current) {
      originalServicesMock.current = JSON.parse(JSON.stringify(servicesState));
    }
  }, [servicesState]);

  const cards = servicesState?.cards || [];
  const cityCard = cards.find(c => c.id === 'city') || {};
  const barangayCard = cards.find(c => c.id === 'barangay') || {};

  const cityItems = cityCard?.items || [];
  const barangayItems = barangayCard?.items || [];

  const updateMainDescription = (cardId, newValue) => {
    setServicesState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || { sectionTitle: '', cards: [] }));
      const idx = copy.cards?.findIndex(c => c.id === cardId);
      if (idx !== -1) copy.cards[idx].mainDescription = newValue;
      return copy;
    });
  };

  const updateStringItem = (cardId, itemIdx, newValue) => {
    setServicesState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || { sectionTitle: '', cards: [] }));
      const idx = copy.cards?.findIndex(c => c.id === cardId);
      if (idx !== -1 && copy.cards[idx].items) {
        copy.cards[idx].items[itemIdx] = newValue;
      }
      return copy;
    });
  };

  const addStringItem = (cardId) => {
    setServicesState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || { sectionTitle: '', cards: [] }));
      const idx = copy.cards?.findIndex(c => c.id === cardId);
      if (idx !== -1) {
        if (!copy.cards[idx].items) copy.cards[idx].items = [];
        copy.cards[idx].items.push("");
      }
      return copy;
    });
  };

  const removeStringItem = (cardId, itemIdx) => {
    setServicesState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || { sectionTitle: '', cards: [] }));
      const idx = copy.cards?.findIndex(c => c.id === cardId);
      if (idx !== -1 && copy.cards[idx].items) {
        copy.cards[idx].items = copy.cards[idx].items.filter((_, i) => i !== itemIdx);
      }
      return copy;
    });
  };

  const undoServicesChanges = () => {
    if (originalServicesMock.current) {
      setServicesState(JSON.parse(JSON.stringify(originalServicesMock.current)));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">💼 2. Core Competency Services Info</h2>
      
      <div className="space-y-5">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Main Structural Subsection Headline</label>
          <input 
            type="text" 
            value={servicesState?.sectionTitle || ''} 
            onChange={e => setServicesState(prev => ({ ...(prev || {}), sectionTitle: e.target.value }))} 
            className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">City Section Description</label>
            <input 
              type="text" 
              value={cityCard.mainDescription || ''} 
              onChange={e => updateMainDescription('city', e.target.value)} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Barangay Section Description</label>
            <input 
              type="text" 
              value={barangayCard.mainDescription || ''} 
              onChange={e => updateMainDescription('barangay', e.target.value)} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* City Items Form Row */}
      <div className="mt-6 space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">🏙️ City-Level Directory Transactions</h3>
          <button 
            type="button" onClick={() => addStringItem('city')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            + Add City Row
          </button>
        </div>
        {cityItems.map((stringText, idx) => (
          <div key={`city-item-${idx}`} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-2 rounded-lg">#{idx + 1}</span>
            <input 
              type="text" value={stringText || ''} onChange={e => updateStringItem('city', idx, e.target.value)}
              className="flex-1 p-2 border-none text-xs font-semibold text-slate-600 outline-none"
            />
            <button type="button" onClick={() => removeStringItem('city', idx)} className="text-rose-500 hover:text-rose-700 font-bold px-2 cursor-pointer">✕</button>
          </div>
        ))}
      </div>

      {/* Barangay Items Form Row */}
      <div className="mt-6 space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">🏡 Barangay-Level Directory Transactions</h3>
          <button 
            type="button" onClick={() => addStringItem('barangay')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            + Add Barangay Row
          </button>
        </div>
        {barangayItems.map((stringText, idx) => (
          <div key={`brgy-item-${idx}`} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-2 rounded-lg">#{idx + 1}</span>
            <input 
              type="text" value={stringText || ''} onChange={e => updateStringItem('barangay', idx, e.target.value)}
              className="flex-1 p-2 border-none text-xs font-semibold text-slate-600 outline-none"
            />
            <button type="button" onClick={() => removeStringItem('barangay', idx)} className="text-rose-500 hover:text-rose-700 font-bold px-2 cursor-pointer">✕</button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button 
          type="button" onClick={() => onSave('services.json', servicesState)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Services Changes
        </button>
        <button 
          type="button" onClick={undoServicesChanges} 
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
        >
          ↩️ Undo Services
        </button>
      </div>
    </div>
  );
}

export default CoreServicesSection;