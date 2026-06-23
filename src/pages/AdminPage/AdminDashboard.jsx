import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// 📂 Sub-Tab Layout Panels (Local Sibling Page Components)
import HomeManagement from './HomeManagement/HomeManagementContainer'; 
import ServicesManagement from './ServicesManagement'; 
import ContactManagement from './ContactManagement';   
import ReportsManagement from './ReportsManagement';

// Stacked configuration forms pointing inside local subfolders
import MandateConfig from './MandateManagement/MandateConfig';                  
import VisionMissionConfig from './MandateManagement/VisionMissionConfig';

function AdminDashboard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // 📊 Analytics Tracker State Metric
  const [visitorCount, setVisitorCount] = useState(0);

  // States Matrix
  const [headerState, setHeaderState] = useState({ officialTagline: '', titleLine1: '', titleLine2: '', tagline: '' });
  
  const [mandateState, setMandateState] = useState({ 
    headerTitle: '', 
    headerSubtitle: '', 
    legalBasis: '', 
    mandate: { title: '', quote: '', citation: '' }, 
    powers: { title: '', list: [] } 
  });

  const [visionMissionState, setVisionMissionState] = useState({
    vision: { title: '', statement: '' },
    mission: { title: '', statement: '' }
  });

  const [servicesState, setServicesState] = useState({ miniTitle: '', sectionTitle: '', paragraphCopy: '', cards: [] });
  const [serviceDirectoryState, setServiceDirectoryState] = useState({ header: { title: '', subtitle: '' }, controls: { backButton: '', actionButton: '' }, cards: [] }); 
  const [contactState, setContactState] = useState({ heading: '', roomNumber: '', floor: '', building: '', street: '', city: '', phoneLabel: '', phoneNumber: '', localLines: '', emailLabel: '', emails: [] });
  const [reportForm, setReportForm] = useState({ title: '', category: '', downloadUrl: '' });

  // Sync all buffers simultaneously from local Apache server disk + Fetch live visitor count
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;
    setLoading(true);

    Promise.all([
      fetch(`${baseUrl}/data/header_data.json${cacheBuster}`).then(res => res.json()).catch(() => ({ topBar: {}, hero: {} })),
      fetch(`${baseUrl}/data/mandate_data.json${cacheBuster}`).then(res => res.json()).catch(() => ({})),
      fetch(`${baseUrl}/data/services.json${cacheBuster}`).then(res => res.json()).catch(() => ({})),
      fetch(`${baseUrl}/data/services_directory.json${cacheBuster}`).then(res => res.json()).catch(() => ({ header: {}, controls: {}, cards: [] })), 
      fetch(`${baseUrl}/data/contact_info.json${cacheBuster}`).then(res => res.json()).catch(() => ({})),
      fetch(`${baseUrl}/data/vision_mission.json${cacheBuster}`).then(res => res.json()).catch(() => ({})),
      // 👥 Fetch system reaching visitor stats directly from custom MVC endpoint
      fetch(`${baseUrl}/api/analytics/track-visit`).then(res => res.json()).catch(() => ({ total_visitors: 0 }))
    ])
    .then(([headerData, mandateData, servicesData, directoryData, contactData, visionMissionData, analyticsData]) => {
      setHeaderState({
        officialTagline: headerData.topBar?.officialTagline || '',
        titleLine1: headerData.hero?.titleLine1 || '',
        titleLine2: headerData.hero?.titleLine2 || '',
        tagline: headerData.hero?.tagline || ''
      });
      
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

      setServicesState({
        miniTitle: servicesData.miniTitle || '',
        sectionTitle: servicesData.sectionTitle || '',
        paragraphCopy: servicesData.paragraphCopy || '',
        cards: servicesData.cards || []
      });
      
      setServiceDirectoryState({
        header: {
          title: directoryData.header?.title || '',
          subtitle: directoryData.header?.subtitle || ''
        },
        controls: {
          backButton: directoryData.controls?.backButton || '',
          actionButton: directoryData.controls?.actionButton || ''
        },
        cards: directoryData.cards || []
      }); 
      
      setContactState({
        heading: contactData.heading || '',
        roomNumber: contactData.roomNumber || '',
        floor: contactData.floor || '',
        building: contactData.building || '',
        street: contactData.street || '',
        city: contactData.city || '',
        phoneLabel: contactData.phoneLabel || '',
        phoneNumber: contactData.phoneNumber || '',
        localLines: contactData.localLines || '',
        emailLabel: contactData.emailLabel || '',
        emails: contactData.emails || []
      });

      // Update analytics tracker value metric safely
      if (analyticsData && analyticsData.total_visitors) {
        setVisitorCount(analyticsData.total_visitors);
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("⚠️ Failed to load some resource buffers.");
    })
    .finally(() => setLoading(false));
  }, [baseUrl]);

  const handlePersistLayout = async (targetFileName, payloadData) => {
    const loadingToast = toast.loading("⏳ Rewriting file configurations on Apache server...");
    try {
      const response = await fetch(`${baseUrl}/api/content/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handlePublishReport = async (e) => {
    e.preventDefault();
    if (!reportForm.title || !reportForm.category) {
      return toast.error("Please provide necessary metadata descriptors.");
    }
    const reportToast = toast.loading("Injecting ledger configuration entries into database structure...");
    try {
      const response = await fetch(`${baseUrl}/api/reports/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm)
      });
      if (response.ok) {
        toast.success("📊 Transparencies cataloged safely inside the ledger matrix!", { id: reportToast });
        setReportForm({ title: '', category: '', downloadUrl: '' });
      } else {
        throw new Error("Database interface dropped serialization transaction step.");
      }
    } catch (err) {
      toast.error("✗ Database Exception occurred.", { id: reportToast });
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

        {/* 📊 Real-Time Visitor Metrics Card and Session Control */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-1.5 px-4 flex items-center gap-3 shadow-sm">
            <span className="text-base">👥</span>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider m-0 leading-tight">Total Unique Traffic</p>
              <p className="text-sm font-black text-[#002B5B] m-0 leading-tight">{visitorCount} Visitors</p>
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
        {['home', 'mandate', 'services', 'contact', 'reports'].map((tab) => (
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
          </button>
        ))}
      </div>

      {/* --- RENDER TARGET WORKSPACE WINDOWS MODULE --- */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        {activeTab === 'home' && (
          <HomeManagement 
            headerState={headerState} setHeaderState={setHeaderState}
            servicesState={servicesState} setServicesState={setServicesState}
            contactState={contactState} setContactState={setContactState}
            onSave={handlePersistLayout} 
          />
        )}
        
        {/* WORKSPACE PANELS */}
        {activeTab === 'mandate' && (
          <div className="space-y-12 divide-y divide-slate-100">
            <MandateConfig 
              mandateState={mandateState} 
              setMandateState={setMandateState} 
              onSave={handlePersistLayout} 
            />
            <div className="pt-10">
              <VisionMissionConfig 
                visionMissionState={visionMissionState} 
                setVisionMissionState={setVisionMissionState} 
                onSave={handlePersistLayout} 
              />
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <ServicesManagement 
            state={serviceDirectoryState} 
            setState={setServiceDirectoryState} 
            /* ✅ FIXED: Forwards dynamic file strings directly without overriding them */
            onSave={(fileName, data) => handlePersistLayout(fileName, data)} 
          />
        )}
        {activeTab === 'contact' && (
          <ContactManagement 
            state={contactState} 
            setState={setContactState} 
            onSave={handlePersistLayout} 
          />
        )}
        {activeTab === 'reports' && (
          <ReportsManagement state={reportForm} setState={setReportForm} onPublish={handlePublishReport} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;