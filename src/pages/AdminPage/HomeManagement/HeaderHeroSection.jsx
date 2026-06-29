import React, { useEffect, useRef, useState } from 'react';

function HeaderHeroSection({ baseUrl, onSave }) {
  const [headerState, setHeaderState] = useState({ officialTagline: '', titleLine1: '', titleLine2: '', tagline: '' });
  const originalHeaderMock = useRef(null);

  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    fetch(`${baseUrl}/data/header_data.json${cacheBuster}`)
      .then(res => res.json())
      .catch(() => ({ topBar: {}, hero: {} }))
      .then(headerData => {
        const nextState = {
          officialTagline: headerData.topBar?.officialTagline || '',
          titleLine1: headerData.hero?.titleLine1 || '',
          titleLine2: headerData.hero?.titleLine2 || '',
          tagline: headerData.hero?.tagline || ''
        };
        setHeaderState(nextState);
        originalHeaderMock.current = JSON.parse(JSON.stringify(nextState));
      });
  }, [baseUrl]);

  const undoHeaderChanges = () => {
    if (originalHeaderMock.current) {
      setHeaderState(JSON.parse(JSON.stringify(originalHeaderMock.current)));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">🌐 1. Website Header & Hero Section</h2>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Top Bar Official Announcement Tagline</label>
          <input 
            type="text" 
            value={headerState?.officialTagline || ''} 
            onChange={e => setHeaderState(prev => ({ ...(prev || {}), officialTagline: e.target.value }))} 
            className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Hero Headline - Primary text row</label>
            <input 
              type="text" 
              value={headerState?.titleLine1 || ''} 
              onChange={e => setHeaderState(prev => ({ ...(prev || {}), titleLine1: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Hero Headline - Colored gradient accent row</label>
            <input 
              type="text" 
              value={headerState?.titleLine2 || ''} 
              onChange={e => setHeaderState(prev => ({ ...(prev || {}), titleLine2: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 pt-2">
        <button 
          type="button"
          onClick={() => onSave('header_data.json', headerState)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Header Changes
        </button>
        <button 
          type="button" 
          onClick={undoHeaderChanges} 
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
        >
          ↩️ Undo Header
        </button>
      </div>
    </div>
  );
}

export default HeaderHeroSection;
