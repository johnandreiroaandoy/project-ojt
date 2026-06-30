// AnalyticsTablesTabs.jsx
import React, { useState, useMemo } from 'react';

export default function AnalyticsTablesTabs({ inquiriesList = [], activityLogs = [], userMatrix = [] }) {
  const [activeTab, setActiveTab] = useState('submissions');
  const [filterRange, setFilterRange] = useState('all'); // 'all' | 'today' | 'week' | 'month'

  // Helper date parsing framework to catch potential standard or non-standard SQL text values safely
  const parseTargetDate = (dateStr) => {
    if (!dateStr) return null;
    const safeStr = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : dateStr.replace(' ', 'T');
    const d = new Date(safeStr);
    return isNaN(d.getTime()) ? new Date(dateStr) : d;
  };

  // 🟢 ENHANCED EVALUATOR: Timezone-normalized calendar boundary checking
  const isWithinTimeRange = (dateObj, range) => {
    if (!dateObj || range === 'all') return true;
    
    const targetTime = dateObj.getTime();

    // Establish dynamic reference anchors for "Today" at midnight local time
    const localTodayMidnight = new Date();
    localTodayMidnight.setHours(0, 0, 0, 0);

    const localTomorrowMidnight = new Date(localTodayMidnight);
    localTomorrowMidnight.setDate(localTomorrowMidnight.getDate() + 1);

    switch (range) {
      case 'today':
        return targetTime >= localTodayMidnight.getTime() && targetTime < localTomorrowMidnight.getTime();
        
      case 'week': {
        const sevenDaysAgoMidnight = new Date(localTodayMidnight);
        sevenDaysAgoMidnight.setDate(sevenDaysAgoMidnight.getDate() - 7);
        return targetTime >= sevenDaysAgoMidnight.getTime() && targetTime < localTomorrowMidnight.getTime();
      }
      
      case 'month': {
        const thirtyDaysAgoMidnight = new Date(localTodayMidnight);
        thirtyDaysAgoMidnight.setDate(thirtyDaysAgoMidnight.getDate() - 30);
        return targetTime >= thirtyDaysAgoMidnight.getTime() && targetTime < localTomorrowMidnight.getTime();
      }
      
      default:
        return true;
    }
  };

  // Helper function to render beautiful distinct pill colors for client browsers
  const getBrowserBadgeStyles = (browser) => {
    const b = String(browser).toLowerCase();
    if (b.includes('chrome')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (b.includes('firefox')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (b.includes('safari')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  // Helper function to render distinct icons/styles for device categories
  const getDeviceBadgeStyles = (device) => {
    const d = String(device).toLowerCase();
    if (d.includes('mobile')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (d.includes('tablet')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'; // Desktop default
  };

  // 📈 PROCESSED INQUIRIES ENGINE
  const processedInquiries = useMemo(() => {
    return inquiriesList
      .filter(inq => {
        const dateObj = parseTargetDate(inq.created_at);
        return isWithinTimeRange(dateObj, filterRange);
      })
      .sort((a, b) => {
        const dateA = parseTargetDate(a.created_at) || 0;
        const dateB = parseTargetDate(b.created_at) || 0;
        return dateB - dateA;
      });
  }, [inquiriesList, filterRange]);

  // 📜 PROCESSED ACTIVITY LOGS ENGINE
  const processedLogs = useMemo(() => {
    return activityLogs
      .filter(log => {
        const dateObj = parseTargetDate(log.accessed_at || log.created_at);
        return isWithinTimeRange(dateObj, filterRange);
      })
      .sort((a, b) => {
        const dateA = parseTargetDate(a.accessed_at || a.created_at) || 0;
        const dateB = parseTargetDate(b.accessed_at || b.created_at) || 0;
        return dateB - dateA;
      });
  }, [activityLogs, filterRange]);

  // 👥 PROCESSED USER PIVOT MATRIX ENGINE (Dynamically Aggregates Raw Logs to Matrix Rows)
  const processedMatrix = useMemo(() => {
    // Check if userMatrix contains true matrix rows (has hit counts). 
    // If it's unpopulated but we have raw activityLogs, we construct the grid on-the-fly!
    const hasValidMatrixData = userMatrix && userMatrix.length > 0 && ('root_hits' in userMatrix[0]);

    if (!hasValidMatrixData && activityLogs.length > 0) {
      const matrixMap = {};

      activityLogs.forEach((log) => {
        const ip = log.ip_address || '127.0.0.1';
        const page = String(log.pagename || 'root').toLowerCase();
        const logDate = log.accessed_at || log.created_at;

        if (!matrixMap[ip]) {
          matrixMap[ip] = {
            ip_address: ip,
            root_hits: 0,
            mandates_hits: 0,
            services_hits: 0,
            reports_hits: 0,
            contact_hits: 0,
            browser: log.browser || 'Chrome',
            device_type: log.device_type || 'Desktop',
            last_active: logDate,
          };
        }

        // Keep the latest timestamp observed for this user client
        if (new Date(logDate) > new Date(matrixMap[ip].last_active)) {
          matrixMap[ip].last_active = logDate;
        }

        // Standardized route increment matching your database /pagename targets
        if (page === 'root' || page === '/' || page === 'home') matrixMap[ip].root_hits++;
        else if (page.includes('mandate')) matrixMap[ip].mandates_hits++;
        else if (page.includes('service')) matrixMap[ip].services_hits++;
        else if (page.includes('report')) matrixMap[ip].reports_hits++;
        else if (page.includes('contact')) matrixMap[ip].contact_hits++;
      });

      return Object.values(matrixMap).filter((row) => {
        const dateObj = parseTargetDate(row.last_active);
        return isWithinTimeRange(dateObj, filterRange);
      });
    }

    // Direct fallback array loop if backend query was already serving matrix-pivoted models
    return userMatrix.filter((row) => {
      const dateObj = parseTargetDate(row.last_active || row.accessed_at);
      return isWithinTimeRange(dateObj, filterRange);
    });
  }, [userMatrix, activityLogs, filterRange]);

  return (
    <div className="pt-4 border-t border-slate-100">
      
      {/* 📑 TABS & CONTROLLER ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 mb-6 gap-4">
        
        {/* TAB NAVIGATION HEADER */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative whitespace-nowrap ${
              activeTab === 'submissions' ? 'text-[#002B5B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {`📩 Submissions (${processedInquiries.length})`}
            {activeTab === 'submissions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B5B] rounded-full" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative whitespace-nowrap ${
              activeTab === 'logs' ? 'text-[#002B5B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {`📜 System Logs (${processedLogs.length})`}
            {activeTab === 'logs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B5B] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative whitespace-nowrap ${
              activeTab === 'matrix' ? 'text-[#002B5B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {`👥 User Matrix (${processedMatrix.length})`}
            {activeTab === 'matrix' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B5B] rounded-full" />
            )}
          </button>
        </div>

        {/* 📅 SUB-FILTER PILLS CONTROLLER */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto mb-2 md:mb-0">
          {[
            { id: 'all', label: 'All Time' },
            { id: 'today', label: 'Today' },
            { id: 'week', label: '7 Days' },
            { id: 'month', label: '30 Days' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setFilterRange(r.id)}
              className={`py-1 px-3 text-[11px] font-bold uppercase tracking-wide rounded-lg transition-all cursor-pointer ${
                filterRange === r.id 
                  ? 'bg-white text-[#002B5B] shadow-sm font-black' 
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 📑 TAB CONDITIONAL PANELS */}
      <div>
        {/* PANEL 1: RECENT CONTACT FORM SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div>
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-semibold uppercase m-0">
                Incoming direct inquiries and user messages sorted dynamically (newest records on top)
              </p>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6 w-1/4">Sender Details</th>
                    <th className="py-3.5 px-6 w-1/2">Message Content Text</th>
                    <th className="py-3.5 px-6 text-right w-1/4">Date Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {processedInquiries.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        📩 No matching user inquiries logged inside this specific date frame.
                      </td>
                    </tr>
                  ) : (
                    processedInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-slate-50/60 transition-colors align-top">
                        <td className="py-4 px-6">
                          <p className="font-black text-[#002B5B] m-0 leading-tight">{inquiry.name}</p>
                          <span className="text-xs font-mono font-semibold text-slate-400 mt-1 block select-all">
                            {inquiry.email}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-slate-700 font-medium text-xs whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                            {inquiry.message}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-xs text-slate-400 pt-5">
                          {new Date(inquiry.created_at).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PANEL 2: REAL-TIME SYSTEM ACCESS LOG */}
        {activeTab === 'logs' && (
          <div>
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-semibold uppercase m-0">
                Live trace logs capturing incoming visitor endpoints, device metrics, and network routing telemetry
              </p>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 text-center w-[10%]">Ref</th>
                    <th className="py-3.5 px-6 w-[25%]">Page Target</th>
                    <th className="py-3.5 px-6 w-[18%]">IP Address</th>
                    <th className="py-3.5 px-6 w-[15%]">Browser</th>
                    <th className="py-3.5 px-6 w-[15%]">Device</th>
                    <th className="py-3.5 px-6 text-right w-[17%]">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedLogs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        📜 No diagnostic routing entries captured within this time boundary.
                      </td>
                    </tr>
                  ) : (
                    processedLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/60 transition-colors align-middle text-xs text-slate-600">
                        <td className="py-3.5 px-4 text-center text-[11px] text-slate-400 font-mono font-bold">
                          {String(log.id).padStart(5, '0')}
                        </td>
                        <td className="py-3.5 px-6 font-semibold">
                          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-mono select-all">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            {log.pagename || 'root'}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 font-mono text-slate-500 font-semibold select-all">
                          {log.ip_address || '—'}
                        </td>
                        <td className="py-3.5 px-6">
                          <span className={`inline-block border px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${getBrowserBadgeStyles(log.browser)}`}>
                            {log.browser || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className={`inline-block border px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${getDeviceBadgeStyles(log.device_type)}`}>
                            {log.device_type || 'Desktop'}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right font-mono text-[11px] text-slate-400 font-bold">
                          {new Date(log.accessed_at || log.created_at).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PANEL 3: SPREADSHEET USER PAGE HITS MATRIX */}
        {activeTab === 'matrix' && (
          <div>
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-semibold uppercase m-0">
                Aggregated visitor metrics grid mapping unique network clients horizontally to independent structural page hit views
              </p>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6 w-[18%]">Visitor IP Address</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Root</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Mandates</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Services</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Reports</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Contact</th>
                    <th className="py-3.5 px-4 text-center w-[10%]">Browser</th>
                    <th className="py-3.5 px-4 text-center w-[10%]">Device</th>
                    <th className="py-3.5 px-6 text-right w-[17%]">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedMatrix.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        👥 No visitor matrix telemetry calculated within this calendar range.
                      </td>
                    </tr>
                  ) : (
                    processedMatrix.map((row, idx) => (
                      <tr key={row.ip_address || idx} className="hover:bg-slate-50/60 transition-colors align-middle text-xs text-slate-600">
                        
                        {/* Visitor Identifier Address */}
                        <td className="py-3.5 px-6 font-mono font-bold text-slate-700 select-all">
                          {row.ip_address || '—'}
                        </td>
                        
                        {/* Page 1: Root Counter */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-600 bg-blue-50/20">
                          {parseInt(row.root_hits) || 0}
                        </td>

                        {/* Page 2: Mandates Counter */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-600 bg-indigo-50/20">
                          {parseInt(row.mandates_hits) || 0}
                        </td>

                        {/* Page 3: Services Counter */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-600 bg-emerald-50/20">
                          {parseInt(row.services_hits) || 0}
                        </td>

                        {/* Page 4: Reports Counter */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-600 bg-purple-50/20">
                          {parseInt(row.reports_hits) || 0}
                        </td>

                        {/* Page 5: Contact Counter */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-600 bg-amber-50/20">
                          {parseInt(row.contact_hits) || 0}
                        </td>

                        {/* Technical Agent Badging */}
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block border px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${getBrowserBadgeStyles(row.browser)}`}>
                            {row.browser || 'Unknown'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block border px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${getDeviceBadgeStyles(row.device_type)}`}>
                            {row.device_type || 'Desktop'}
                          </span>
                        </td>

                        {/* Activity Timestamp Signature */}
                        <td className="py-3.5 px-6 text-right font-mono text-[11px] text-slate-400 font-bold">
                          {row.last_active || row.accessed_at ? new Date(row.last_active || row.accessed_at).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          }) : '—'}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}