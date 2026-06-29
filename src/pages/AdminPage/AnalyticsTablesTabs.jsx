// AnalyticsTablesTabs.jsx
import React, { useState, useMemo } from 'react';

export default function AnalyticsTablesTabs({ inquiriesList = [], activityLogs = [] }) {
  const [activeTab, setActiveTab] = useState('submissions');
  const [filterRange, setFilterRange] = useState('all'); // 'all' | 'today' | 'week' | 'month'

  // Helper date parsing framework to catch potential standard or non-standard SQL text values safely
  const parseTargetDate = (dateStr) => {
    if (!dateStr) return null;
    const safeStr = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : dateStr.replace(' ', 'T');
    const d = new Date(safeStr);
    return isNaN(d.getTime()) ? new Date(dateStr) : d;
  };

  // Helper evaluator checks if a target date object falls within the designated calendar timeline boundaries
  const isWithinTimeRange = (dateObj, range) => {
    if (!dateObj || range === 'all') return true;
    
    const now = new Date();
    const target = new Date(dateObj);

    switch (range) {
      case 'today':
        return target.toDateString() === now.toDateString();
      case 'week': {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return target >= oneWeekAgo && target <= now;
      }
      case 'month': {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return target >= oneMonthAgo && target <= now;
      }
      default:
        return true;
    }
  };

  // 📈 PROCESSED INQUIRIES ENGINE (Filtered & Sorted Descending)
  const processedInquiries = useMemo(() => {
    return inquiriesList
      .filter(inq => {
        const dateObj = parseTargetDate(inq.created_at);
        return isWithinTimeRange(dateObj, filterRange);
      })
      .sort((a, b) => {
        const dateA = parseTargetDate(a.created_at) || 0;
        const dateB = parseTargetDate(b.created_at) || 0;
        return dateB - dateA; // Newest entry first
      });
  }, [inquiriesList, filterRange]);

  // 📜 PROCESSED ACTIVITY LOGS ENGINE (Filtered & Sorted Descending)
  const processedLogs = useMemo(() => {
    return activityLogs
      .filter(log => {
        const dateObj = parseTargetDate(log.accessed_at || log.created_at);
        return isWithinTimeRange(dateObj, filterRange);
      })
      .sort((a, b) => {
        const dateA = parseTargetDate(a.accessed_at || a.created_at) || 0;
        const dateB = parseTargetDate(b.accessed_at || b.created_at) || 0;
        return dateB - dateA; // Newest entry first
      });
  }, [activityLogs, filterRange]);

  return (
    <div className="pt-4 border-t border-slate-100">
      
      {/* 📑 TABS & CONTROLLER ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 mb-6 gap-4">
        
        {/* TAB NAVIGATION HEADER */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative ${
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
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === 'logs' ? 'text-[#002B5B]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {`📜 System Logs (${processedLogs.length})`}
            {activeTab === 'logs' && (
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
                Live chronological tracking sequence mapping endpoint hits filtered down to your chosen active timeline
              </p>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6 w-1/5">Log Reference</th>
                    <th className="py-3.5 px-6 w-3/5">Target Endpoint Accessed</th>
                    <th className="py-3.5 px-6 text-right w-1/5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedLogs.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        📜 No diagnostic routing entries captured within this time boundary.
                      </td>
                    </tr>
                  ) : (
                    processedLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 text-xs text-slate-400 font-mono font-bold">
                          LOG-{String(log.id).padStart(5, '0')}
                        </td>
                        <td className="py-4 px-6 font-semibold">
                          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-mono select-all">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            {log.pagename}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-mono text-xs text-slate-400 font-bold">
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
      </div>

    </div>
  );
}