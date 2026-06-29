import React, { useEffect, useState } from 'react';

function VisionMissionConfig({ baseUrl, onSave }) {
  const [visionMissionState, setVisionMissionState] = useState({
    vision: { title: '', statement: '' },
    mission: { title: '', statement: '' }
  });

  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    fetch(`${baseUrl}/data/vision_mission.json${cacheBuster}`)
      .then(res => res.json())
      .catch(() => ({}))
      .then(visionMissionData => {
        setVisionMissionState({
          vision: {
            title: visionMissionData.vision?.title || '',
            statement: visionMissionData.vision?.statement || ''
          },
          mission: {
            title: visionMissionData.mission?.title || '',
            statement: visionMissionData.mission?.statement || ''
          }
        });
      });
  }, [baseUrl]);

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">
        🌟 Strategic Objectives Configuration (vision_mission.json)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strategic Vision Inputs Panel */}
        <div className="bg-slate-50/40 p-4 rounded-2xl border space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Vision Section Header Title</label>
            <input 
              type="text" 
              value={visionMissionState?.vision?.title || ''} 
              onChange={e => setVisionMissionState(prev => ({
                ...prev,
                vision: {
                  ...(prev?.vision || {}),
                  title: e.target.value
                }
              }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Strategic Vision Statement Copy</label>
            <textarea 
              rows="4" 
              value={visionMissionState?.vision?.statement || ''} 
              onChange={e => setVisionMissionState(prev => ({
                ...prev,
                vision: {
                  ...(prev?.vision || {}),
                  statement: e.target.value
                }
              }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        {/* Operational Mission Inputs Panel */}
        <div className="bg-slate-50/40 p-4 rounded-2xl border space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mission Section Header Title</label>
            <input 
              type="text" 
              value={visionMissionState?.mission?.title || ''} 
              onChange={e => setVisionMissionState(prev => ({
                ...prev,
                mission: {
                  ...(prev?.mission || {}),
                  title: e.target.value
                }
              }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Operational Mission Statement Copy</label>
            <textarea 
              rows="4" 
              value={visionMissionState?.mission?.statement || ''} 
              onChange={e => setVisionMissionState(prev => ({
                ...prev,
                mission: {
                  ...(prev?.mission || {}),
                  statement: e.target.value
                }
              }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

      </div>
      
      {/* Control Action Trigger Group */}
      <div className="flex gap-3 pt-2">
        <button 
          type="button"
          onClick={() => {
            const payload = {
              vision: {
                title: visionMissionState?.vision?.title || 'Our Vision',
                statement: visionMissionState?.vision?.statement || ''
              },
              mission: {
                title: visionMissionState?.mission?.title || 'Our Mission',
                statement: visionMissionState?.mission?.statement || ''
              }
            };
            onSave('vision_mission.json', payload);
          }} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Vision & Mission Changes
        </button>
      </div>
    </div>
  );
}

export default VisionMissionConfig;
