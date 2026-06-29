// AnalyticsTablesTabs.jsx
import React, { useState } from 'react';

export default function AnalyticsTablesTabs({ inquiriesList = [], activityLogs = [] }) {
  const [activeTab, setActiveTab] = useState('submissions');

  return (
    <div className="pt-4 border-t border-slate-100">
      
      {/* 📑 TAB NAVIGATION HEADER */}
      <div className="flex border-b border-slate-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 text-sm font-black uppercase tracking-wider transition-all cursor-pointer relative ${
            activeTab === 'submissions' ? 'text-[#002B5B]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          📩 Recent Contact Submissions
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
          📜 Real-Time System Access Logs
          {activeTab === 'logs' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B5B] rounded-full" />
          )}
        </button>
      </div>

      {/* 📑 TAB CONDITIONAL PANELS */}
      <div>
        {/* PANEL 1: RECENT CONTACT FORM SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div>
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-semibold uppercase m-0">
                Incoming direct inquiries and user messages parsed dynamically from the contacts database table
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
                  {inquiriesList.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        📩 No user inquiries logged inside the database ledger yet.
                      </td>
                    </tr>
                  ) : (
                    inquiriesList.map((inquiry) => (
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
                Live historical trace sequence tracking individual page routing events out of visitor_activity_logs
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
                  {activityLogs.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
                        📜 No sequential routing trail entries captured yet.
                      </td>
                    </tr>
                  ) : (
                    activityLogs.map((log) => (
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