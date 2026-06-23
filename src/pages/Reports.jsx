import React, { useState, useEffect } from 'react';

// Keep this inside your local React asset folder for static structural UI parameters
import reportsUI from '../data/reports_config.json';

function Reports() {
  /* ==========================================================
      STATE VARIABLES
  ========================================================== */
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [loading, setLoading] = useState(true);

  /* ==========================================================
      DYNAMIC CHRONOLOGICAL DROPDOWN GENERATOR (2026 CALIBRATED)
  ========================================================== */
  const currentYear = new Date().getFullYear(); // Evaluates dynamically to 2026
  const availableYears = [];
  for (let year = currentYear; year >= 1999; year--) {
    availableYears.push(year);
  }

  /* ==========================================================
      FETCH REPORT ARRAYS FROM BACKEND API
  ========================================================== */
  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // Poll the reporting matrix collection over the active environment API base route
    fetch(`${baseUrl}/api/reports${cacheBuster}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Report ledger missing on server. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (payload && payload.status === 'success') {
          const rawData = payload.data || [];
          setAllReports(rawData);
          
          // 🟢 Calibrate focus metrics on 2026 parameters automatically on load
          setSelectedYear(currentYear);
          setSelectedMonth('all');
          setFilteredReports(rawData.filter((report) => report && Number(report.year) === currentYear));
        }
      })
      .catch((error) => {
        console.error('Error fetching transparency reports from network layer:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    // 🟢 FIXED: Removed currentYear loop tracking to ensure standard execution profiles
  }, []);

  /* ==========================================================
      DYNAMIC PROCESSING MULTI-AXIS FILTER ENGINE
  ========================================================== */
  const applyFilters = (year, month, masterData) => {
    const safeData = masterData || [];
    let output = safeData.filter((report) => report && Number(report.year) === Number(year));
    
    if (month !== 'all') {
      output = output.filter((report) => report && Number(report.month) === Number(month));
    }
    
    setFilteredReports(output);
  };

  /* ==========================================================
      INTERACTIVE INTERFACE LISTENERS
  ========================================================== */
  const handleYearChange = (e) => {
    const targetYear = Number(e.target.value);
    setSelectedYear(targetYear);
    applyFilters(targetYear, selectedMonth, allReports);
  };

  const handleMonthChange = (e) => {
    const targetMonth = e.target.value;
    setSelectedMonth(targetMonth);
    applyFilters(selectedYear, targetMonth, allReports);
  };

  // Safe fallback extractions for rendering states against config JSON
  const pageHeader = reportsUI.pageHeader || {};
  const uiStates = reportsUI.states || {};
  const dropdownMonths = reportsUI.months || [];
  const cardLabels = reportsUI.cardLabels || {};

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER SEPARATED INTO STATIC CONFIG MATRIX */}
        <div className="mb-12 border-l-4 border-[#002B5B] pl-6">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tight">
            {pageHeader.title || "Transparency Ledger Directory"}
          </h2>
          <p className="text-gray-400 mt-2 font-semibold text-xs md:text-sm uppercase tracking-wider">
            {pageHeader.description || "Review chronological file indexes detailing legal disclosure compliance audits."}
          </p>
        </div>

        {/* CONDITIONAL RENDERING PIPELINE */}
        {loading ? (
          <div className="text-center py-16 font-semibold border border-slate-100 text-gray-400 bg-slate-50/50 rounded-2xl animate-pulse text-sm select-none">
            {uiStates.loadingText || "🔄 Synchronizing relational database ledger entries..."}
          </div>
        ) : allReports.length === 0 ? (
          <div className="text-center py-12 font-bold text-red-800 bg-red-50 border border-red-100 rounded-2xl text-sm shadow-sm">
            {uiStates.errorText || "⚠️ Infrastructure Error: Unable to cleanly map active data fields from database."}
          </div>
        ) : (
          <>
            {/* CONTROL BAR PANELS */}
            <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-slate-100 pb-6">
              
              {/* FISCAL YEAR FILTER SELECTOR */}
              <div className="flex items-center gap-3">
                <label htmlFor="year-select" className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
                  Fiscal Year:
                </label>
                <div className="relative">
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="appearance-none bg-slate-50/50 border border-slate-200 text-[#002B5B] font-black text-xs uppercase tracking-wider py-2.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer shadow-sm transition-all min-w-[140px]"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        Year {year}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#002B5B] font-bold text-[9px] select-none">
                    ▼
                  </div>
                </div>
              </div>

              {/* MONTHLY FILTER DROPDOWN CONTROLLER */}
              <div className="flex items-center gap-3">
                <label htmlFor="month-select" className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
                  Reporting Month:
                </label>
                <div className="relative">
                  <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="appearance-none bg-slate-50/50 border border-slate-200 text-[#002B5B] font-black text-xs uppercase tracking-wider py-2.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer shadow-sm transition-all min-w-[140px]"
                  >
                    {dropdownMonths.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#002B5B] font-bold text-[9px] select-none">
                    ▼
                  </div>
                </div>
              </div>

            </div>

            {/* SECONDARY CONDITIONAL CHECK: Empty Search Output */}
            {filteredReports.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl text-gray-400 font-bold text-xs uppercase tracking-wider bg-slate-50/20 animate-fadeIn select-none">
                📭 No operational transparency records found on file for the chosen criteria.
              </div>
            ) : (
              /* DYNAMIC RECORD MATRIX LOADED VIA DATABASE STREAMS */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report, index) => (
                  <div
                    key={report.id || index}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md hover:border-slate-200 group animate-fadeIn"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="text-xl bg-slate-50 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 inline-block shrink-0 select-none">
                          📄
                        </div>

                        <div>
                          <h4 className="text-[#002B5B] font-bold text-sm md:text-base line-clamp-2 transition-colors duration-300 group-hover:text-blue-700 leading-snug">
                            {report.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">
                            Year: {report.year} • {report.size || "Unknown Size"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTION INTERFACE DISPATCHER LINK */}
                    <div className="mt-2">
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center block bg-slate-50/60 text-[#002B5B] border border-slate-100 py-3 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] shadow-sm"
                      >
                        {cardLabels.buttonText || "Preview Document"} ↗
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>  
  );
}

export default Reports;