import React, { useState, useEffect } from 'react';

function ReportsManagement() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ title: '', year: new Date().getFullYear().toString(), month: '1' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreviewUrl, setSelectedFilePreviewUrl] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
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

  const getReportPdfUrl = (report) => {
    if (!report?.href) return '';
    if (/^https?:\/\//i.test(report.href)) return report.href;
    return `http://localhost/backend-project-ojt/public/${report.href}`;
  };

  const getFileNameFromPath = (path) => {
    if (!path) return '';
    const cleanPath = String(path).split('?')[0].split('#')[0];
    const fileName = cleanPath.split('/').pop();
    return decodeURIComponent(fileName || '');
  };

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

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFilePreviewUrl('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setSelectedFilePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedFile]);

  // READ Lifecycle: Fetch active entries dynamically on initialization load
  useEffect(() => {
    fetchActiveReports();
  }, []);

  const fetchActiveReports = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  // 🔒 Async validation utility to inspect raw binary Magic Bytes header signatures
  const verifyGenuinePdf = (file) => {
    return new Promise((resolve) => {
      if (file.type !== 'application/pdf') {
        return resolve(false);
      }

      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (!e.target || !e.target.result) return resolve(false);
        
        const arr = new Uint8Array(e.target.result).subarray(0, 4);
        let headerSignature = "";
        for (let i = 0; i < arr.length; i++) {
          headerSignature += String.fromCharCode(arr[i]);
        }
        
        resolve(headerSignature === "%PDF");
      };

      const dynamicChunkBlob = file.slice(0, 4);
      reader.readAsArrayBuffer(dynamicChunkBlob);
    });
  };

  // SAVE/CREATE Dynamic Logic Handler Loop
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newReport.title || !selectedFile) {
      showNotification("⚠️ Fill out target category title parameters and attach a file binary.", "error");
      return;
    }

    const isVerifiedPdf = await verifyGenuinePdf(selectedFile);
    if (!isVerifiedPdf) {
      showNotification("❌ Upload Blocked: File signature verification mismatch. Falsified or corrupted PDF documents are prohibited.", "error");
      setSelectedFile(null);
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('title', newReport.title);
    formData.append('year', newReport.year);
    formData.append('month', newReport.month);
    formData.append('file', selectedFile); 

    try {
      // 🔒 SECURITY UPDATE: Pass administrative token inside upload handshakes
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/reports/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Note: Leave Content-Type blank so the browser binds the multi-part boundary string correctly
        },
        body: formData,
      });
      
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const result = await res.json();

      if (result.status === "success") {
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
      showNotification("❌ Communication loop broken. Confirm your token credentials or CORS permissions.", "error");
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
    setPendingDelete({ id: reportId, index: currentIndex, title: reports[currentIndex]?.title || 'this report' });
  };

  const executeDeleteItem = async () => {
    if (!pendingDelete) return;

    try {
      // 🔒 SECURITY UPDATE: Retrieve authorization token from your node session local buffer
      const token = localStorage.getItem('adminToken');

      const res = await fetch(`${API_BASE_URL}/reports/delete`, {
        method: 'DELETE', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Protects structural data state changes
        },
        body: JSON.stringify({ id: pendingDelete.id })
      });
      
      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
      const result = await res.json();

      if (result.status === "success") {
        setReports(prev => prev.filter((_, idx) => idx !== pendingDelete.index));
        showNotification("🗑️ Report eradicated from server system safely.", "success");
      } else {
        showNotification(`❌ Delete operational fault: ${result.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("❌ Access denied or network timeout executing database deletion loop.", "error");
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* FLOATING TOAST NOTIFICATION BANNER RENDER LAYER */}
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

      {pendingDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-emerald-50 border border-emerald-200 rounded-2xl shadow-2xl p-6 text-emerald-950">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-black shrink-0">
                !
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black uppercase tracking-wider m-0">Confirm Report Delete</h3>
                <p className="text-xs font-semibold text-emerald-800 mt-2 leading-relaxed">
                  Delete {pendingDelete.title} from the database and file repository?
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="px-4 py-2 rounded-lg border border-emerald-200 bg-white text-emerald-800 text-xs font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDeleteItem}
                className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
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
            <input 
              type="file" 
              accept="application/pdf" 
              name="file" 
              onChange={handleFileChange} 
              className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
            />
            {selectedFilePreviewUrl && (
              <span className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                {selectedFile.name}
              </span>
            )}
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
            reports.map((report, idx) => {
              const pdfUrl = getReportPdfUrl(report);

              return (
              <div key={report.id || `rep-${idx}`} className="bg-white p-4 rounded-xl border border-slate-200/80 flex justify-between items-center gap-4 shadow-sm hover:border-blue-200 transition-colors">
                <div className="min-w-0 flex-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 truncate transition-colors">
                      🔗 {report.title}
                    </h4>
                    {pdfUrl && (
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                        {getFileNameFromPath(report.href)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 text-[9px] font-black text-slate-400 uppercase mt-1 tracking-wider">
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">📅 Year: {report.year}</span>
                    <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">📦 Size: {report.size || 'N/A'}</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleDeleteItem(report.id, idx)} className="text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
                  ✕ Delete
                </button>
              </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsManagement;
