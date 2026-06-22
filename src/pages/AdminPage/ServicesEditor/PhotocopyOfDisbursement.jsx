import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function PhotocopyDisbursement({ onBack, baseUrl, targetFile }) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileName = targetFile || 'photocopy_disbursement.json';

  // 🔄 1. Fetch file from the server dynamically on mount
  useEffect(() => {
    let isMounted = true;
    const cacheBuster = `?v=${new Date().getTime()}`;
    
    // ✨ FIXED: Adjusted to pull directly from flat /data/ layout
    fetch(`${baseUrl}/data/${fileName}${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error("Could not find configuration profile on server.");
        return res.json();
      })
      .then(data => {
        if (isMounted) setFormData(data);
      })
      .catch(err => {
        toast.error(`Error syncing from server: ${err.message}`);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [baseUrl, fileName]);

  // 📝 2. Change Mutation Handlers
  const handleDetailChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: { ...prev.serviceDetails, [key]: value }
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updatedReqs = [...formData.requirements];
    updatedReqs[index] = value;
    setFormData(prev => ({ ...prev, requirements: updatedReqs }));
  };

  const handleStepChange = (index, key, value) => {
    const updatedSteps = [...formData.processingSteps];
    updatedSteps[index] = { ...updatedSteps[index], [key]: value };
    setFormData(prev => ({ ...prev, processingSteps: updatedSteps }));
  };

  // ➕/➖ 3. Array Mutators (Add/Remove Rows)
  const addRequirement = () => {
    setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== index) }));
  };

  const addStep = () => {
    const nextStepNum = formData.processingSteps.length + 1;
    const newStep = { step: nextStepNum, action: "", duration: "" };
    setFormData(prev => ({ ...prev, processingSteps: [...prev.processingSteps, newStep] }));
  };

  const removeStep = (index) => {
    const filtered = formData.processingSteps.filter((_, i) => i !== index);
    const reIndexed = filtered.map((item, idx) => ({ ...item, step: idx + 1 }));
    setFormData(prev => ({ ...prev, processingSteps: reIndexed }));
  };

  // 💾 4. Post updated schema to your saving endpoint
  const handleSave = async () => {
    const loadingToast = toast.loading(`💾 Pushing updates to backend ${fileName}...`);
    try {
      const response = await fetch(`${baseUrl}/api/content/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ✨ FIXED: Stripped 'services/' prefix path token for persistence parameters
        body: JSON.stringify({ targetFile: fileName, data: formData })
      });
      if (response.ok) {
        toast.success("✨ Disbursement photocopy configurations saved safely!", { id: loadingToast });
      } else {
        throw new Error("Server rejected request parameters.");
      }
    } catch (err) {
      toast.error(`❌ Save process aborted: ${err.message}`, { id: loadingToast });
    }
  };

  if (loading) return <div className="p-12 text-center text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">🔄 Querying server profile data matrix...</div>;
  if (!formData) return <div className="p-8 text-xs font-bold text-rose-500 text-center">❌ Failed to communicate or sync state architecture from file server.</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
      
      {/* Upper Control Row */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <button type="button" onClick={onBack} className="text-[10px] font-black text-slate-500 bg-slate-100 py-1.5 px-3 rounded-lg hover:bg-slate-200 uppercase tracking-wider cursor-pointer">← Back</button>
          <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide mt-2 flex items-center gap-2">
            <span>{formData.iconHeader || '💵'}</span> {formData.title || 'Disbursement Records'} Node
          </h2>
        </div>
        <button type="button" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-xl shadow-md cursor-pointer transition-all">
          💾 Commit File Updates
        </button>
      </div>

      {/* Main Header Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Division Branding Header</label>
          <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg text-xs font-bold bg-white mt-1 text-slate-800" />
        </div>
        <div className="md:col-span-2">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Operational Summary Scope Description</label>
          <input type="text" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-2 border rounded-lg text-xs font-semibold bg-white mt-1 text-slate-600" />
        </div>
      </div>

      {/* Service Specifications Block */}
      <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block border-b pb-1">📊 Service Schema Target Specifications</span>
        
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Service Display Function Name</label>
          <input type="text" value={formData.serviceDetails?.name || ''} onChange={e => handleDetailChange('name', e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold mt-1 text-slate-800" />
        </div>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">System Purpose Context</label>
          <textarea rows={2} value={formData.serviceDetails?.purpose || ''} onChange={e => handleDetailChange('purpose', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-600 mt-1 resize-none leading-relaxed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Responsible Office Branch</label>
            <input type="text" value={formData.serviceDetails?.office || ''} onChange={e => handleDetailChange('office', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Operational Complexity Classification</label>
            <input type="text" value={formData.serviceDetails?.classification || ''} onChange={e => handleDetailChange('classification', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Transaction Handling Category Mapping</label>
            <input type="text" value={formData.serviceDetails?.transactionType || ''} onChange={e => handleDetailChange('transactionType', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Authorized Application End Users</label>
            <input type="text" value={formData.serviceDetails?.eligibleUsers || ''} onChange={e => handleDetailChange('eligibleUsers', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1" />
          </div>
        </div>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Aggregated Processing Duration Budget</label>
          <input type="text" value={formData.serviceDetails?.totalProcessingTime || ''} onChange={e => handleDetailChange('totalProcessingTime', e.target.value)} className="w-full p-2 border border-blue-200 bg-blue-50/40 text-[#002B5B] rounded-lg text-xs font-black mt-1 max-w-xs" />
        </div>
      </div>

      {/* Documentary Requirements List Builder */}
      <div className="space-y-3 border border-slate-100 p-4 rounded-xl">
        <div className="flex justify-between items-center border-b pb-1">
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider">📋 Frontline Documentary Requirements</span>
          <button type="button" onClick={addRequirement} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">➕ Add Row</button>
        </div>
        <div className="space-y-2">
          {formData.requirements?.map((req, index) => (
            <div key={`req-${index}`} className="flex gap-2 items-center">
              <span className="text-xs font-mono font-bold text-slate-300 w-4">{index + 1}.</span>
              <input type="text" value={req} onChange={e => handleRequirementChange(index, e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700" placeholder="Insert requirement description..." />
              <button type="button" onClick={() => removeRequirement(index)} className="text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 p-1.5 rounded-lg text-xs font-bold transition-colors">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Pipeline Sequence Step Array */}
      <div className="space-y-3 border border-slate-100 p-4 rounded-xl">
        <div className="flex justify-between items-center border-b pb-1">
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider">⛓️ Step-by-Step Processing Pipeline</span>
          <button type="button" onClick={addStep} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">➕ Append Next Step</button>
        </div>
        <div className="space-y-3">
          {formData.processingSteps?.map((stepItem, index) => (
            <div key={`step-${index}`} className="grid grid-cols-12 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 items-center relative">
              <div className="col-span-1 text-center">
                <span className="text-[8px] font-black text-slate-400 uppercase block tracking-wider">Step</span>
                <span className="text-xs font-mono font-black text-[#002B5B]">#{stepItem.step}</span>
              </div>
              <div className="col-span-8">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Procedural Task Action Description</label>
                <input type="text" value={stepItem.action || ''} onChange={e => handleStepChange(index, 'action', e.target.value)} className="w-full p-2 border bg-white rounded-lg text-xs font-bold text-slate-700" placeholder="Describe tracking step operation..." />
              </div>
              <div className="col-span-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Processing Duration Target</label>
                <input type="text" value={stepItem.duration || ''} onChange={e => handleStepChange(index, 'duration', e.target.value)} className="w-full p-2 border bg-white rounded-lg text-xs font-semibold text-slate-600" placeholder="e.g. 5 minutes" />
              </div>
              <div className="col-span-1 text-right">
                <button type="button" onClick={() => removeStep(index)} className="text-rose-500 hover:bg-rose-100 p-1.5 rounded-lg text-xs transition-colors" title="Purge Workflow Matrix Row">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default PhotocopyDisbursement;