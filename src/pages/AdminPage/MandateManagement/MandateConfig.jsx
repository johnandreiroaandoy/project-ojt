import React, { useEffect, useState } from 'react';

function MandateConfig({ baseUrl, onSave }) {
  const [mandateState, setMandateState] = useState({ 
    headerTitle: '', headerSubtitle: '', legalBasis: '', 
    mandate: { title: '', quote: '', citation: '' }, 
    powers: { title: '', list: [] } 
  });

  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    fetch(`${baseUrl}/data/mandate_data.json${cacheBuster}`)
      .then(res => res.json())
      .catch(() => ({}))
      .then(mandateData => {
        setMandateState({
          headerTitle: mandateData.headerTitle || '',
          headerSubtitle: mandateData.headerSubtitle || '',
          legalBasis: mandateData.legalBasis || '',
          mandate: {
            title: mandateData.mandate?.title || '',
            quote: mandateData.mandate?.quote || '',
            citation: mandateData.mandate?.citation || ''
          },
          powers: {
            title: mandateData.powers?.title || '',
            list: mandateData.powers?.list || []
          }
        });
      });
  }, [baseUrl]);

  const updatePowerItem = (index, newValue) => {
    setMandateState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy.powers) copy.powers = { title: 'General Powers', list: [] };
      if (!copy.powers.list) copy.powers.list = [];
      copy.powers.list[index] = newValue;
      return copy;
    });
  };

  const addPowerItem = () => {
    setMandateState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy.powers) copy.powers = { title: 'General Powers', list: [] };
      if (!copy.powers.list) copy.powers.list = [];
      copy.powers.list.push("");
      return copy;
    });
  };

  const removePowerItem = (index) => {
    setMandateState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (copy.powers && copy.powers.list) {
        copy.powers.list = copy.powers.list.filter((_, i) => i !== index);
      }
      return copy;
    });
  };

  const powersList = mandateState?.powers?.list || [];

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">
        ⚖️ Legal Mandate Configurations 
      </h2>
      <div className="space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Header Title Row</label>
            <input 
              type="text" 
              value={mandateState?.headerTitle || ''} 
              onChange={e => setMandateState(prev => ({ ...(prev || {}), headerTitle: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Header Subtitle Row</label>
            <input 
              type="text" 
              value={mandateState?.headerSubtitle || ''} 
              onChange={e => setMandateState(prev => ({ ...(prev || {}), headerSubtitle: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Statutory Legal Basis Framework</label>
          <input 
            type="text" 
            value={mandateState?.legalBasis || ''} 
            onChange={e => setMandateState(prev => ({ ...(prev || {}), legalBasis: e.target.value }))} 
            className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mandate Block Section Title</label>
              <input 
                type="text" 
                value={mandateState?.mandate?.title || ''} 
                onChange={e => setMandateState(prev => {
                  const m = prev?.mandate || {};
                  return { ...prev, mandate: { ...m, title: e.target.value } };
                })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mandate Citation / Reference Tag</label>
              <input 
                type="text" 
                value={mandateState?.mandate?.citation || ''} 
                onChange={e => setMandateState(prev => {
                  const m = prev?.mandate || {};
                  return { ...prev, mandate: { ...m, citation: e.target.value } };
                })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Core Statutory Quote Body Text</label>
            <textarea 
              rows="3" 
              value={mandateState?.mandate?.quote || ''} 
              onChange={e => setMandateState(prev => {
                const m = prev?.mandate || {};
                return { ...prev, mandate: { ...m, quote: e.target.value } };
              })} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Powers Node List Block Title</label>
              <input 
                type="text"
                value={mandateState?.powers?.title || ''}
                onChange={e => setMandateState(prev => {
                  const p = prev?.powers || {};
                  return { ...prev, powers: { ...p, title: e.target.value } };
                })}
                className="p-1 border-none bg-transparent font-bold text-xs uppercase text-slate-500 tracking-wider outline-none focus:ring-0"
              />
            </div>
            <button 
              type="button" 
              onClick={addPowerItem}
              className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm cursor-pointer"
            >
              + Add Power Clause
            </button>
          </div>
          
          {powersList.map((itemText, idx) => (
            <div key={`power-clause-${idx}`} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-2 rounded-lg">Clause #{idx + 1}</span>
              <input 
                type="text"
                value={itemText || ''}
                onChange={e => updatePowerItem(idx, e.target.value)}
                className="flex-1 p-2 border-none text-xs font-semibold text-slate-600 outline-none focus:ring-0"
              />
              <button type="button" onClick={() => removePowerItem(idx)} className="text-rose-600 font-bold px-2 cursor-pointer">✕</button>
            </div>
          ))}
        </div>

      </div>
      
      <div className="flex gap-3 pt-2">
        <button 
          type="button"
          onClick={() => {
            const payload = {
              headerTitle: mandateState?.headerTitle || '',
              headerSubtitle: mandateState?.headerSubtitle || '',
              legalBasis: mandateState?.legalBasis || '',
              mandate: {
                title: mandateState?.mandate?.title || '',
                quote: mandateState?.mandate?.quote || '',
                citation: mandateState?.mandate?.citation || ''
              },
              powers: {
                title: mandateState?.powers?.title || 'General Powers',
                list: mandateState?.powers?.list || []
              }
            };
            onSave('mandate_data.json', payload);
          }} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Mandate File Changes
        </button>
      </div>
    </div>
  );
}

export default MandateConfig;
