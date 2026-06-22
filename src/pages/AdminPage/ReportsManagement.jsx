import React, { useState, useEffect } from 'react';

function ReportsManagement() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ title: '', year: new Date().getFullYear().toString(), month: '1' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 🍞 State to manage native UI banner feedback alerts
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // 📂 Base URL configuration targeting your custom framework's clean structural API endpoints
  const API_BASE_URL = 'http://localhost/backend-project-ojt/api';

  const monthsList = [
    { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
    { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
    { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
    { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" }
  ];

  // Helper trigger function to emit real-time status banners
  const showNotification = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Close effect wrapper ensuring notification threads dissolve accurately after 4 seconds
  useEffect(() => {
    if (toast.visible) {
      const durationTimer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 4000);
      return () => clearTimeout(durationTimer);
    }
  }, [toast.visible]);

  // READ Lifecycle: Fetch active entries dynamically on initialization load
  useEffect(() => {
    fetchActiveReports();
  }, []);

  const fetchActiveReports = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reports`);
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const json = await res.json();
      
      if (json.status === "success") {
        setReports(json.data || []);
      }
    } catch (err) {
      console.error("Data tracking failure:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewReport(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // SAVE/CREATE Dynamic Logic Handler Loop
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newReport.title || !selectedFile) {
      showNotification("⚠️ Fill out target category title parameters and attach a file binary.", "error");
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('title', newReport.title);
    formData.append('year', newReport.year);
    formData.append('month', newReport.month);
    formData.append('file', selectedFile); 

    try {
      const res = await fetch(`${API_BASE_URL}/reports/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const result = await res.json();

      if (result.status === "success") {
        // 🚀 SUCCESS TOAST TRIGGERED HERE
        showNotification("🎉 Document file processed, saved to storage directory and cataloged successfully!", "success");
        
        const freshRecord = result.newRecord || result.data;
        if (freshRecord) {
          setReports(prev => [freshRecord, ...prev]);
        } else {
          fetchActiveReports();
        }

        setNewReport({ title: '', year: new Date().getFullYear().toString(), month: '1' });
        setSelectedFile(null);
        e.target.reset(); 
      } else {
        showNotification(`❌ Server validation fault: ${result.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("❌ Communication loop broken. Confirm your local XAMPP settings and CORS rules.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // DELETE Real-time Database Operation Handler Loop
  const handleDeleteItem = async (reportId, currentIndex) => {
    if (!reportId) {
      showNotification("❌ Cannot delete item: Missing valid database tracking identifier.", "error");
      return;
    }
    if (!window.confirm("🚨 Delete this item entirely from the live database and file repository disk?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reports/delete`, {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reportId })
      });
      
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const result = await res.json();

      if (result.status === "success") {
        setReports(prev => prev.filter((_, idx) => idx !== currentIndex));
        showNotification("🗑️ Report eradicated from server system safely.", "success");
      } else {
        showNotification(`❌ Delete operational fault: ${result.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("❌ Connection timed out executing database deletion loop.", "error");
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* 🟢 FLOATING TOAST NOTIFICATION BANNER RENDER LAYER */}
      {toast.visible && (
        <div className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-xl border max-w-md animate-slideIn transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="text-sm font-bold leading-tight flex-1">
            {toast.message}
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, visible: false }))} 
            className="ml-4 text-xs font-black opacity-60 hover:opacity-100 cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      )}

      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">
        📊 Real-Time Document Asset & Database Manager
      </h2>

      {/* SECTION 1: DYNAMIC UPLOAD FORM ENTRY */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">➕ Upload and Catalog New Document Row</span>
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Report Selection Title Category</label>
            <select value={newReport.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">-- Select Document Category Title Alignment --</option>
              <option value="Annual Audit Reports">Annual Audit Reports</option>
              <option value="Quarterly Financial Statements">Quarterly Financial Statements</option>
              <option value="Full Disclosure Policy Compliance Report">Full Disclosure Policy Compliance Report</option>
              <option value="Statement of Receipts and Expenditures">Statement of Receipts and Expenditures</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-xl border border-slate-100">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Filing Year Destination Folder</label>
              <input type="number" value={newReport.year} onChange={e => handleInputChange('year', e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-xs font-bold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Target Filing Month</label>
              <select value={newReport.month} onChange={e => handleInputChange('month', e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-xs font-bold text-slate-600 bg-white focus:ring-1 focus:ring-blue-500 outline-none">
                {monthsList.map(m => (
                  <option key={`opt-new-${m.value}`} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-200 bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg" name="file" onChange={handleFileChange} className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
          </div>

          <button type="submit" disabled={isUploading} className={`w-full text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-sm ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'}`}>
            {isUploading ? 'Saving Transcripts...' : '💾 Save to Database & Disk System'}
          </button>
        </form>
      </div>

      {/* SECTION 2: VIEW / DELETE RETRIEVED REAL-TIME DATABASE LISTS */}
      <div className="space-y-4">
        <span className="text-xs font-black text-[#002B5B] uppercase tracking-wider block">📋 Current Live Registered Rows ({reports.length})</span>
        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-xs text-slate-400 font-bold uppercase text-center py-4">Streaming database indexes...</p>
          ) : reports.length === 0 ? (
            <p className="text-xs text-slate-400 font-bold uppercase text-center py-4">No records cataloged inside MySQL table system storage.</p>
          ) : (
            reports.map((report, idx) => (
              <div key={report.id || `rep-${idx}`} className="bg-white p-4 rounded-xl border border-slate-200/80 flex justify-between items-center gap-4 shadow-sm hover:border-blue-200 transition-colors">
                <div className="min-w-0 flex-1">
                  <a href={report.href ? `http://localhost/backend-project-ojt/public/${report.href}` : '#'} target="_blank" rel="noopener noreferrer" className="group block focus:outline-none">
                    <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 group-hover:underline truncate transition-colors">
                      🔗 {report.title}
                    </h4>
                  </a>
                  <div className="flex gap-3 text-[9px] font-black text-slate-400 uppercase mt-1 tracking-wider">
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">📅 Year: {report.year}</span>
                    <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">📦 Size: {report.size || 'N/A'}</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleDeleteItem(report.id, idx)} className="text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
                  ✕ Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsManagement;