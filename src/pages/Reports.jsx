import React, { useState, useEffect } from 'react';

// Decoupled Structural Configurations (Layout Titles, Fallback messages)
import reportsUI from '../data/reports_config.json';

function Reports() {

  /* ==========================================================
     STATE VARIABLES
     Used to store database records and track system status
  ========================================================== */
  
  // Dynamic payload data array hydrated explicitly from the API network query
  const [reportCategories, setReportCategories] = useState([]);
  
  // System latency tracker
  const [loading, setLoading] = useState(true);

  /* ==========================================================
     FETCH REPORTS FROM BACKEND
     Runs automatically when the component loads
  ========================================================== */
  useEffect(() => {
    // Request raw database record vectors from the remote endpoint route
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((payload) => {
        // If the database responds with a successful processing code
        if (payload.status === 'success') {
          // Hydrate component state with database data records
          setReportCategories(payload.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching transparency reports:', error);
      })
      .finally(() => {
        // Drop the visual layout initialization flag block
        setLoading(false);
      });
  }, []); // Empty array guarantees thread runs exactly once on mount

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER SEPARATED INTO STATIC JSON SOURCE MAP */}
        <div className="mb-12">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter">
            {reportsUI.pageHeader.title}
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            {reportsUI.pageHeader.description}
          </p>
        </div>

        {/* ==========================================================
            CONDITIONAL RENDERING PIPELINE
            Switches component layout structures using data states
        ========================================================== */}

        {loading ? (
          /* LOADING STATE - String isolated to JSON file */
          <div className="text-center py-10 font-medium border border-blue-500 text-gray-400 animate-pulse">
            {reportsUI.states.loadingText}
          </div>
        ) : reportCategories.length === 0 ? (
          /* ERROR/FALLBACK STATE - String isolated to JSON file */
          <div className="text-center py-10 font-bold text-red-500">
            {reportsUI.states.errorText}
          </div>
        ) : (
          /* DYNAMIC RECORD MATRIX LOADED VIA DATABASE STREAMS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((report, index) => (
              <div
                key={report.id || index}
                className="bg-white p-6 rounded-2xl border border-blue-400 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-gray-600 group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-3xl bg-gray-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 inline-block shrink-0">
                      📄
                    </div>

                    <div>
                      {/* Database-driven parameters injected directly */}
                      <h4 className="text-[#002B5B] font-bold text-base line-clamp-2 transition-colors duration-300 group-hover:text-blue-700">
                        {report.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
                        Year: {report.year} • {report.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FILE DOWNLOAD CALL ELEMENT */}
                <div className="mt-4">
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block bg-blue-50/50 text-[#002B5B] border border-blue-100 py-2.5 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] shadow-sm"
                  >
                    {reportsUI.cardLabels.buttonText}
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