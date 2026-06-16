import React, { useState, useEffect } from 'react';

// Decoupled Structural Configurations (Layout Titles, Fallback messages)
import reportsUI from '../data/reports_config.json';

function Reports() {

  /* ==========================================================
      STATE VARIABLES
      Used to store database records and track system status
  ========================================================== */
  
  // Dynamic payload master data array hydrated explicitly from the API network query
  const [allReports, setAllReports] = useState([]);
  
  // Dynamic array tracking only the records matching BOTH selected filtered year and month
  const [filteredReports, setFilteredReports] = useState([]);

  // Tracks which calendar year is actively chosen within the dropdown selector
  const [selectedYear, setSelectedYear] = useState('');

  // 🟢 NEW STATE: Tracks the actively targeted calendar month
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  // System latency tracker
  const [loading, setLoading] = useState(true);

  /* ==========================================================
      STATIC CALENDAR DROPDOWN MATRIX
      Generates the chronological descending options loop (2026 -> 1999)
  ========================================================== */
  const availableYears = [];
  for (let year = 2026; year >= 1999; year--) {
    availableYears.push(year);
  }

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
          const rawData = payload.data || [];
          setAllReports(rawData);
          
          // Default structural initialize: Focus display on modern year 2026 automatically
          setSelectedYear(2026);
          setSelectedMonth('all');
          setFilteredReports(rawData.filter((report) => Number(report.year) === 2026));
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

  /* ==========================================================
      DYNAMIC PROCESSING MULTI-AXIS FILTER ENGINE
  ========================================================== */
  const applyFilters = (year, month, masterData) => {
    let output = masterData.filter((report) => Number(report.year) === Number(year));
    
    // If a specific month is selected instead of 'all', filter deeper
    if (month !== 'all') {
      output = output.filter((report) => Number(report.month) === Number(month));
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
        ) : allReports.length === 0 ? (
          /* ERROR/FALLBACK STATE - String isolated to JSON file */
          <div className="text-center py-10 font-bold text-red-500">
            {reportsUI.states.errorText}
          </div>
        ) : (
          <>
            {/* COMPACT STYLED DUAL FILTER LAYER CONTROL PANEL */}
            <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-gray-100 pb-6">
              
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
                    className="appearance-none bg-gray-50 border border-gray-200 text-[#002B5B] font-black text-xs uppercase tracking-wider py-2.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm transition-all min-w-[140px]"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        Year {year}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#002B5B] font-bold text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* 🟢 ADDED: MONTHLY FILTER DROPDOWN COMPONENT CONTROLLER */}
              <div className="flex items-center gap-3">
                <label htmlFor="month-select" className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
                  Reporting Month:
                </label>
                <div className="relative">
                  <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="appearance-none bg-gray-50 border border-gray-200 text-[#002B5B] font-black text-xs uppercase tracking-wider py-2.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm transition-all min-w-[140px]"
                  >
                    {reportsUI.months.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#002B5B] font-bold text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

            </div>

            {/* SECONDARY CONDITIONAL CHECK: Empty Folder/Year/Month States Handling */}
            {filteredReports.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl text-gray-400 font-medium text-sm bg-gray-50/50 animate-fadeIn">
                📭 No operational transparency records found on file for the chosen criteria.
              </div>
            ) : (
              /* DYNAMIC RECORD MATRIX LOADED VIA DATABASE STREAMS */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report, index) => (
                  <div
                    key={report.id || index}
                    className="bg-white p-6 rounded-2xl border border-blue-400 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-gray-600 group animate-fadeIn"
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

                    {/* ACTION: PURE ONLINE PREVIEW DISPATCHER (NO LOCAL DOWNLOADING) */}
                    <div className="mt-4">
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center block bg-blue-50/50 text-[#002B5B] border border-blue-100 py-2.5 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] shadow-sm"
                      >
                        {reportsUI.cardLabels.buttonText} ↗
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