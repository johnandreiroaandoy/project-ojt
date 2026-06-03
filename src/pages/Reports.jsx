import React, { useState, useEffect } from 'react';

function Reports() {
  // 1. Setup state hooks to hold API values and track downloading state
  const [reportCategories, setReportCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data directly from your PHP MVC API endpoint on component mount
  useEffect(() => {
    // 🟢 DYNAMIC VITE ENV VARIABLE APPLIED HERE
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((payload) => {
        if (payload.status === 'success') {
          setReportCategories(payload.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching transparency reports:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter">Transparency Reports</h2>
          <p className="text-gray-500 mt-2 font-medium">Downloadable financial documents and city audit records.</p>
        </div>

        {/* 3. Handle Loading State / Server Downtime alerts gracefully */}
        {loading ? (
          <div className="text-center py-10 font-medium text-gray-400 animate-pulse">
            Fetching secure document streams from City Accountant Engine...
          </div>
        ) : reportCategories.length === 0 ? (
          <div className="text-center py-10 font-bold text-red-500">
            Could not load reports. Please check if your XAMPP Apache module is operational.
          </div>
        ) : (
          <div className="space-y-4">
            {reportCategories.map((report, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="text-4xl">📄</div>
                  <div>
                    <h4 className="text-[#002B5B] font-bold text-lg">{report.title}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Year: {report.year} • {report.size}</p>
                  </div>
                </div>
                {/* 🟢 DYNAMIC VITE ENV VARIABLE APPLIED HERE FOR ASSET DOWNLOAD */}
                <a 
                  href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`} 
                  download 
                  className="mt-4 md:mt-0 bg-white text-[#002B5B] border border-gray-200 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#002B5B] hover:text-white transition-all shadow-sm"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Reports;