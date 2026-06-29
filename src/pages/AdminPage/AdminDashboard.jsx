import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// 📂 Sub-Tab Layout Panels (Local Sibling Page Components)
import HomeManagement from './HomeManagement/HomeManagementContainer'; 
import ServicesManagement from './ServicesManagement'; 
import ContactManagement from './ContactManagement';   
import ReportsManagement from './ReportsManagement';
import AnalyticsManagement from './AnalyticsManagement'; 

// Stacked configuration forms pointing inside local subfolders
import MandateConfig from './MandateManagement/MandateConfig';                  
import VisionMissionConfig from './MandateManagement/VisionMissionConfig';

function AdminDashboard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // 📊 Cleaned Analytics Tracker State Metrics
  const [visitorCount, setVisitorCount] = useState(0);
  const [contactInquiriesCount, setContactInquiriesCount] = useState(0); 

  const [reportForm, setReportForm] = useState({ title: '', year: '', month: '', file: null });

  // 🔒 SECURITY CHECK: Helper function to pull token and build authenticated headers
  const getAuthHeaders = useCallback((extraHeaders = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error("🛑 Unauthenticated access attempt. Redirecting...");
      navigate('/');
      return null;
    }
    return {
      'Authorization': `Bearer ${token}`,
      ...extraHeaders
    };
  }, [navigate]);

  // Sync dashboard-only summary counters. Each admin module loads its own editable file buffer.
  useEffect(() => {
    setLoading(true);

    const headers = getAuthHeaders();
    if (!headers) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`${baseUrl}/api/analytics/track-visit?pagename=admin_summary`).then(res => res.json()).catch(() => ({ total_visitors: 0 })),
      fetch(`${baseUrl}/api/analytics/metrics`, { headers }).then(res => res.json()).catch(() => ({ totalInquiries: 0 }))
    ])
    .then(([analyticsData, metricsData]) => {
      if (analyticsData && analyticsData.total_visitors) {
        setVisitorCount(analyticsData.total_visitors);
      }

      if (metricsData && metricsData.totalInquiries !== undefined) {
        setContactInquiriesCount(metricsData.totalInquiries);
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to load dashboard summary counters.");
    })
    .finally(() => setLoading(false));
  }, [baseUrl, getAuthHeaders]);

  // Secured: Save layout changes via config file controller.
  const handlePersistLayout = async (targetFileName, payloadData) => {
    const authHeaders = getAuthHeaders({ 'Content-Type': 'application/json' });
    if (!authHeaders) return;

    const loadingToast = toast.loading("⏳ Rewriting file configurations on Apache server...");
    try {
      const response = await fetch(`${baseUrl}/api/content/save-config`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ targetFile: targetFileName, data: payloadData })
      });
      const result = await response.json();
      if (result.status === 'success' || response.ok) {
        toast.success(result.message || "✨ Configurations written safely!", { id: loadingToast });
      } else {
        throw new Error(result.message || "Operation denied by server module.");
      }
    } catch (error) {
      toast.error(error.message || "✗ Failed to complete backend rewrite execution.", { id: loadingToast });
    }
  };

  // 🔒 SECURED: Modified to use real FormData targeting the active ReportController.php
  const handlePublishReport = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!reportForm.title || !reportForm.file) {
      return toast.error("Please provide both a description title and a valid PDF file.");
    }

    const authHeaders = getAuthHeaders();
    if (!authHeaders) return;

    const reportToast = toast.loading("Uploading PDF file and logging ledger database records...");
    
    try {
      const formData = new FormData();
      formData.append('title', reportForm.title);
      formData.append('year', reportForm.year || new Date().getFullYear());
      formData.append('month', reportForm.month || '1');
      formData.append('file', reportForm.file);

      const response = await fetch(`${baseUrl}/api/reports/upload`, {
        method: 'POST',
        headers: authHeaders,
        body: formData
      });
      
      const result = await response.json();

      if (result.status === 'success' || response.ok) {
        toast.success("📊 Transparencies cataloged safely inside the ledger matrix!", { id: reportToast });
        setReportForm({ title: '', year: '', month: '', file: null });
      } else {
        throw new Error(result.message || "Database interface dropped transaction execution.");
      }
    } catch (err) {
      toast.error(err.message || "✗ File upload exception occurred.", { id: reportToast });
    }
  };

  const handleSystemLogout = () => {
    localStorage.removeItem('adminToken'); 
    sessionStorage.clear();
    toast.success("🔓 Administrative Session Terminated. Redirecting...");
    navigate('/'); 
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        🔄 Accessing data layers. Syncing dynamic inputs matrix...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 select-none">
      {/* Upper Status Control Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight m-0">Centralized Asset Administration Matrix</h1>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Authorized Node Session: Verified OJT Developer Mode</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-1.5 px-4 flex items-center gap-3 shadow-sm">
            <span className="text-base">👥</span>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider m-0 leading-tight">Total Cumulative Views</p>
              <p className="text-sm font-black text-[#002B5B] m-0 leading-tight">{visitorCount} Hits</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-1.5 px-4 flex items-center gap-3 shadow-sm">
            <span className="text-base">📩</span>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider m-0 leading-tight">User Contact Messages</p>
              <p className="text-sm font-black text-[#002B5B] m-0 leading-tight">{contactInquiriesCount} Inquiries</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-full border border-emerald-200 shadow-sm">
              ● Secure Link Synced
            </span>
            <button onClick={handleSystemLogout} className="bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl border border-rose-200 shadow-sm cursor-pointer">
              🚪 Terminate Node Session (Logout)
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Menu Bar Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 max-w-max">
        {['home', 'mandate', 'services', 'contact', 'reports', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 px-6 font-black text-xs uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab 
                ? 'bg-[#002B5B] text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            {tab === 'home' && '🏠 Home Landing Elements'}
            {tab === 'mandate' && '⚖️ Mandate & Statements'}
            {tab === 'services' && '💼 Services Directory Catalog'}
            {tab === 'contact' && '📞 Contact Parameters'}
            {tab === 'reports' && '📊 Data Reports Log'}
            {tab === 'analytics' && '📈 Page Analytics'}
          </button>
        ))}
      </div>

      {/* Render Workspace Area */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        {activeTab === 'home' && (
          <HomeManagement 
            baseUrl={baseUrl}
            onSave={handlePersistLayout} 
          />
        )}
        
        {activeTab === 'mandate' && (
          <div className="space-y-12 divide-y divide-slate-100">
            <MandateConfig baseUrl={baseUrl} onSave={handlePersistLayout} />
            <div className="pt-10">
              <VisionMissionConfig baseUrl={baseUrl} onSave={handlePersistLayout} />
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <ServicesManagement baseUrl={baseUrl} onSave={handlePersistLayout} />
        )}
        {activeTab === 'contact' && (
          <ContactManagement baseUrl={baseUrl} onSave={handlePersistLayout} />
        )}
        {activeTab === 'reports' && (
          <ReportsManagement state={reportForm} setState={setReportForm} onPublish={handlePublishReport} />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsManagement 
            baseUrl={baseUrl}
            getAuthHeaders={getAuthHeaders}
            onTotalInquiriesLoaded={setContactInquiriesCount}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
