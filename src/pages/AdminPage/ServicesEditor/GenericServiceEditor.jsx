import React, { useState, useEffect } from 'react';
// 🌟 NEW IMPORT: Bringing in toast notifications to match the AdminDashboard layout
import toast from 'react-hot-toast';

// 🟢 FIX: De-structured 'onSave' from props so we can use your dashboard's built-in save pipeline
function GenericServiceEditor({ serviceId, onBack, baseUrl, targetFile, onSave }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔄 Fetch existing file data, or setup a default structure if it's missing (404)
  useEffect(() => {
    fetch(`${baseUrl}/data/${targetFile}?v=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) {
          // If the file doesn't exist yet, pass a clean template instead of crashing
          return {
            title: serviceId,
            description: "Custom management portal for tracking compliance protocols.",
            requirements: []
          };
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((err) => {
        console.error("Error loading service file:", err);
        toast.error("⚠️ Failed to download layout parameters from server.");
      })
      .finally(() => setLoading(false));
  }, [baseUrl, targetFile, serviceId]);

  // 📝 Update text configurations
  const handleUpdateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // ➕ Add a standard requirement point row
  const handleAddRequirement = () => {
    setData(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), { step: "", document: "", notes: "" }]
    }));
    toast.success("➕ Added new empty requirement row matrix slot.");
  };

  // 🗑️ Remove a requirement row
  const handleRemoveRequirement = (idx) => {
    setData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== idx)
    }));
    toast.error("✕ Removed operational requirement step index row.");
  };

  // 🚀 FIXED SAVE LOGIC: Using smooth react-hot-toast dynamic feedback pipelines
  const handleSave = async () => {
    if (!onSave) {
      toast.error("⚠️ System save handler (onSave prop) missing from framework link mapping layer.");
      return;
    }

    setSaving(true);
    // ⏳ Trigger dynamic loading toast state linked to the server save process
    const savingToast = toast.loading(`⏳ Processing changes for ${targetFile}...`);
    
    try {
      // 🌟 Using your dashboard's global save controller function
      await onSave(targetFile, data);
      
      // ✨ Dismiss loading status and replace with success feedback confirmation
      toast.success(`🎉 ${targetFile} written safely back into disk memory blocks!`, { id: savingToast });
    } catch (err) {
      console.error("Save Error:", err);
      // ✗ Dismiss loading status and replace with error feedback flag
      toast.error("✗ System pipeline rejected save data packet rewrite stream.", { id: savingToast });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-xs text-slate-400">🔄 Loading service configuration dataset...</div>;

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-100">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">← Cancel & Go Back</button>
          <h2 className="text-lg font-black text-[#002B5B] uppercase tracking-wide mt-2">🛠️ Managing: {serviceId}</h2>
          <p className="text-[10px] font-mono text-slate-400">Target File System Pointer: /data/{targetFile}</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#002B5B] hover:bg-blue-900 text-white text-xs font-bold py-2 px-4 rounded-lg shadow cursor-pointer transition-colors disabled:opacity-50"
        >
          {saving ? "💾 Saving..." : "💾 Save Changes"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase">Service Description / Purpose</label>
          <textarea
            value={data?.description || ""}
            onChange={(e) => handleUpdateField("description", e.target.value)}
            className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-400 uppercase">📋 Requirement Steps & Documentation Matrix</label>
            <button 
              type="button"
              onClick={handleAddRequirement}
              className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 py-1 px-2 rounded hover:bg-emerald-100 cursor-pointer transition-colors"
            >
              ➕ Add Row Requirement
            </button>
          </div>

          <div className="space-y-2">
            {data?.requirements?.map((req, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200 animate-fadeIn">
                <input 
                  type="text" 
                  placeholder="Step (e.g., Step 1)" 
                  value={req.step || ""}
                  onChange={(e) => {
                    const nextReqs = [...data.requirements];
                    nextReqs[idx].step = e.target.value;
                    handleUpdateField("requirements", nextReqs);
                  }}
                  className="w-1/4 p-1.5 border rounded text-xs bg-white outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                />
                <input 
                  type="text" 
                  placeholder="Document Required" 
                  value={req.document || ""}
                  onChange={(e) => {
                    const nextReqs = [...data.requirements];
                    nextReqs[idx].document = e.target.value;
                    handleUpdateField("requirements", nextReqs);
                  }}
                  className="w-3/4 p-1.5 border rounded text-xs bg-white outline-none focus:ring-1 focus:ring-blue-500 text-slate-600"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveRequirement(idx)}
                  className="text-rose-500 hover:text-rose-700 font-bold px-2 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenericServiceEditor;