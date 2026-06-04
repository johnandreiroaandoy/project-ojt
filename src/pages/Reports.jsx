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
          <div className="text-center py-10 font-medium border border-blue-500 text-gray-400 animate-pulse">
            Fetching secure document streams from City Accountant Engine...
          </div>
        ) : reportCategories.length === 0 ? (
          <div className="text-center py-10 font-bold text-red-500">
            Could not load reports. Please check if your XAMPP Apache module is operational.
          </div>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {reportCategories.map((report, index) => (
    <div 
      key={index} 
      className="bg-white p-6 rounded-2xl border border-blue-400 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-gray-600 group"
    >
      <div>
        {/* Top Section: Icon & Header Details */}
        <div className="flex items-start gap-4 mb-6">
          <div className="text-3xl bg-gray-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 inline-block shrink-0">
            📄
          </div>
          <div>
            <h4 className="text-[#002B5B] font-bold text-base line-clamp-2 transition-colors duration-300 group-hover:text-blue-700">
              {report.title}
            </h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
              Year: {report.year} • {report.size}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Explicit Download Button Action */}
      {/* 🟢 DYNAMIC VITE ENV VARIABLE APPLIED HERE FOR ASSET DOWNLOAD */}
      <div className="mt-4">
        <a 
          href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`} 
          download 
          className="w-full text-center block bg-blue-50/50 text-[#002B5B] border border-blue-100 py-2.5 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] shadow-sm"
        >
          Download PDF
        </a>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </section>
  );
}

export default Reports;