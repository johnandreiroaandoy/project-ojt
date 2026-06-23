import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// 🔑 1. Synchronized Requirement Component (Using stable layout parameters)
const RequirementInputRow = ({ value, index, onChange, onRemove }) => {
  return (
    <div className="flex gap-2 items-center animate-fadeIn">
      <span className="text-xs font-mono font-bold text-slate-300 w-4">{index + 1}.</span>
      <input 
        type="text" 
        value={value || ''} 
        onChange={e => onChange(index, e.target.value)}
        className="w-full p-2 border rounded-lg text-xs text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none" 
        placeholder="Insert documentary requirement statement..." 
      />
      <button 
        type="button" 
        onClick={() => onRemove(index)} 
        className="text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};

// 🔑 2. Synchronized Step Component
const StepInputRow = ({ stepItem, index, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-12 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 items-center relative animate-fadeIn">
      <div className="col-span-1 text-center">
        <span className="text-[8px] font-black text-slate-400 uppercase block tracking-wider">Step</span>
        <span className="text-xs font-mono font-black text-[#002B5B]">#{stepItem.step}</span>
      </div>
      <div className="col-span-8">
        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Procedural Task Action Description</label>
        <input 
          type="text" 
          value={stepItem.action || ''} 
          onChange={e => onChange(index, 'action', e.target.value)}
          className="w-full p-2 border bg-white rounded-lg text-xs font-bold text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none" 
          placeholder="Describe tracking step operation..." 
        />
      </div>
      <div className="col-span-2">
        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Processing Duration Target</label>
        <input 
          type="text" 
          value={stepItem.duration || ''} 
          onChange={e => onChange(index, 'duration', e.target.value)}
          className="w-full p-2 border bg-white rounded-lg text-xs font-semibold text-slate-600 focus:ring-1 focus:ring-blue-500 outline-none" 
          placeholder="e.g. 5 minutes" 
        />
      </div>
      <div className="col-span-1 text-right">
        <button 
          type="button" 
          onClick={() => onRemove(index)} 
          className="text-rose-500 hover:bg-rose-100 p-1.5 rounded-lg text-xs transition-colors cursor-pointer" 
          title="Purge Workflow Matrix Row"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// 🏛️ Main Component
function CertificationOfPayslip({ onBack, baseUrl, targetFile }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    iconHeader: '📝',
    serviceDetails: {
      name: '',
      purpose: '',
      office: '',
      classification: '',
      transactionType: '',
      eligibleUsers: '',
      totalProcessingTime: ''
    },
    requirements: [],
    processingSteps: []
  });
  const [loading, setLoading] = useState(true);
  const fileName = targetFile || 'certification_payslip.json';

  // 🔄 1. Fetch file configuration from server database pipeline
  useEffect(() => {
    let isMounted = true;
    const cacheBuster = `?v=${new Date().getTime()}`;
    
    // 🚀 FIXED: Removed custom Cache-Control request headers to bypass CORS security block policies
    fetch(`${baseUrl}/data/${fileName}${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error("Could not find configuration profile on server.");
        return res.json();
      })
      .then(data => {
        if (isMounted && data) {
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            iconHeader: data.iconHeader || '📝',
            serviceDetails: {
              name: data.serviceDetails?.name || '',
              purpose: data.serviceDetails?.purpose || '',
              office: data.serviceDetails?.office || '',
              classification: data.serviceDetails?.classification || '',
              transactionType: data.serviceDetails?.transactionType || '',
              eligibleUsers: data.serviceDetails?.eligibleUsers || '',
              totalProcessingTime: data.serviceDetails?.totalProcessingTime || ''
            },
            requirements: Array.isArray(data.requirements) ? data.requirements : [],
            processingSteps: Array.isArray(data.processingSteps) ? data.processingSteps : []
          });
        }
      })
      .catch(err => {
        toast.error(`Error syncing from server: ${err.message}`);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [baseUrl, fileName]);

  // 📝 2. Spread-Operator Deep State Mutation Handlers
  const handleDetailChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [key]: value
      }
    }));
  };

  const handleRequirementChange = (index, value) => {
    setFormData(prev => {
      const nextRequirements = [...prev.requirements];
      nextRequirements[index] = value;
      return {
        ...prev,
        requirements: nextRequirements
      };
    });
  };

  const handleStepChange = (index, key, value) => {
    setFormData(prev => {
      const nextSteps = [...prev.processingSteps];
      if (nextSteps[index]) {
        nextSteps[index] = {
          ...nextSteps[index],
          [key]: value
        };
      }
      return {
        ...prev,
        processingSteps: nextSteps
      };
    });
  };

  // ➕/➖ 3. Array Spread Track Mutators
  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addStep = () => {
    setFormData(prev => {
      const nextStepNum = prev.processingSteps.length + 1;
      return {
        ...prev,
        processingSteps: [...prev.processingSteps, { step: nextStepNum, action: "", duration: "" }]
      };
    });
  };

  const removeStep = (index) => {
    setFormData(prev => {
      const filtered = prev.processingSteps.filter((_, i) => i !== index);
      const reindexed = filtered.map((item, idx) => ({ ...item, step: idx + 1 }));
      return {
        ...prev,
        processingSteps: reindexed
      };
    });
  };

  // 💾 4. Post payload request directly to backend node endpoint
  const handleSave = async () => {
    const loadingToast = toast.loading(`💾 Pushing updates to backend ${fileName}...`);
    try {
      const response = await fetch(`${baseUrl}/api/content/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetFile: fileName, data: formData })
      });
      if (response.ok) {
        toast.success("✨ Payslip certification configurations saved safely!", { id: loadingToast });
      } else {
        throw new Error("Server rejected request parameters.");
      }
    } catch (err) {
      toast.error(`❌ Save process aborted: ${err.message}`, { id: loadingToast });
    }
  };

  if (loading) return <div className="p-12 text-center text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">🔄 Querying server profile data matrix...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 animate-fadeIn">
      
      {/* Upper Control Row */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <button type="button" onClick={onBack} className="text-[10px] font-black text-slate-500 bg-slate-100 py-1.5 px-3 rounded-lg hover:bg-slate-200 uppercase tracking-wider cursor-pointer transition-colors">← Back</button>
          <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide mt-2 flex items-center gap-2">
            <span>{formData.iconHeader}</span> {formData.title || 'Payslip Management'} Node
          </h2>
        </div>
        <button type="button" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01]">
          💾 Commit File Updates
        </button>
      </div>

      {/* Main Header Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Division Branding Header</label>
          <input 
            type="text" 
            value={formData.title || ''} 
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} 
            className="w-full p-2 border rounded-lg text-xs font-bold bg-white mt-1 text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Operational Summary Scope Description</label>
          <input 
            type="text" 
            value={formData.subtitle || ''} 
            onChange={e => setFormData(prev => ({ ...prev, subtitle: e.target.value }))} 
            className="w-full p-2 border rounded-lg text-xs font-semibold bg-white mt-1 text-slate-600 focus:ring-1 focus:ring-blue-500 outline-none" 
          />
        </div>
      </div>

      {/* Service Specifications Block */}
      <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block border-b pb-1">📊 Service Schema Target Specifications</span>
        
        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Service Display Function Name</label>
          <input type="text" value={formData.serviceDetails?.name || ''} onChange={e => handleDetailChange('name', e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold mt-1 text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none" />
        </div>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">System Purpose Context</label>
          <textarea rows={2} value={formData.serviceDetails?.purpose || ''} onChange={e => handleDetailChange('purpose', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-600 mt-1 resize-none leading-relaxed focus:ring-1 focus:ring-blue-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Responsible Office Branch</label>
            <input type="text" value={formData.serviceDetails?.office || ''} onChange={e => handleDetailChange('office', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Operational Complexity Classification</label>
            <input type="text" value={formData.serviceDetails?.classification || ''} onChange={e => handleDetailChange('classification', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Transaction Handling Category Mapping</label>
            <input type="text" value={formData.serviceDetails?.transactionType || ''} onChange={e => handleDetailChange('transactionType', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Authorized Application End Users</label>
            <input type="text" value={formData.serviceDetails?.eligibleUsers || ''} onChange={e => handleDetailChange('eligibleUsers', e.target.value)} className="w-full p-2 border rounded-lg text-xs text-slate-700 mt-1 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Aggregated Processing Duration Budget</label>
          <input type="text" value={formData.serviceDetails?.totalProcessingTime || ''} onChange={e => handleDetailChange('totalProcessingTime', e.target.value)} className="w-full p-2 border border-blue-200 bg-blue-50/40 text-[#002B5B] rounded-lg text-xs font-black mt-1 max-w-xs focus:ring-1 focus:ring-blue-500 outline-none" />
        </div>
      </div>

      {/* Documentary Requirements List Builder */}
      <div className="space-y-3 border border-slate-100 p-4 rounded-xl">
        <div className="flex justify-between items-center border-b pb-1">
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider">📋 Frontline Documentary Requirements</span>
          <button type="button" onClick={addRequirement} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded cursor-pointer transition-colors">➕ Add Row</button>
        </div>
        <div className="space-y-2">
          {formData.requirements.map((req, index) => (
            <RequirementInputRow 
              key={`payslip-req-row-stable-${index}`}
              value={req}
              index={index}
              onChange={handleRequirementChange}
              onRemove={removeRequirement}
            />
          ))}
        </div>
      </div>

      {/* Processing Pipeline Sequence Step Array */}
      <div className="space-y-3 border border-slate-100 p-4 rounded-xl">
        <div className="flex justify-between items-center border-b pb-1">
          <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider">⛓️ Step-by-Step Processing Pipeline</span>
          <button type="button" onClick={addStep} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded cursor-pointer transition-colors">➕ Append Next Step</button>
        </div>
        <div className="space-y-3">
          {formData.processingSteps.map((stepItem, index) => (
            <StepInputRow 
              key={`payslip-step-row-${stepItem.step}`}
              stepItem={stepItem}
              index={index}
              onChange={handleStepChange}
              onRemove={removeStep}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default CertificationOfPayslip;