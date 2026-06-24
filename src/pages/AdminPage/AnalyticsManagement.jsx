import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AnalyticsManagement({ analyticsRows = [], recentLogs = [], timelineData = [], inquiriesList = [] }) {
  
  // Format the raw DB hourly time buckets into readable local system time strings for the graph
  const formattedChartData = timelineData.map(item => {
    // Appending " UTC" forces JS to read it as standard UTC time before translating to local timezone
    const localDate = new Date(item.time_bucket + " UTC");
    return {
      ...item,
      localTimeLabel: localDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + 
                      ' ' + localDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  });

  return (
    <div className="space-y-12">
      
      {/* 📈 SECTION 1: REAL-TIME ACCESS TIMELINE SURGE GRAPH */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#002B5B] uppercase tracking-tight m-0">
            User Access Activity Timeline
          </h3>
          <p className="text-xs text-slate-400 font-semibold uppercase mt-1">
            Chronological graph mapping exactly when traffic surges occur (Local System Time)
          </p>
        </div>

        <div className="w-full bg-slate-50/60 p-4 border border-slate-200/80 rounded-2xl h-72">
          {formattedChartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              📈 Awaiting real-time timestamp traffic vectors...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#002B5B" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#002B5B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="localTimeLabel" stroke="#94A3B8" style={{ fontSize: '9px', fontWeight: 'bold' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '11px', fontWeight: 'bold' }} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                <Area type="monotone" dataKey="hits" name="User Actions" stroke="#002B5B" strokeWidth={3} fillOpacity={1} fill="url(#chartColor)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* SECTION 2: METRIC MATRIX GRID SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📊 LEFT & CENTER COLUMN: MASTER COUNTER ACCUMULATION TABLE */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-black text-[#002B5B] uppercase tracking-tight m-0">
              Traffic Distribution Breakdown
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">
              Live metrics parsed directly from rows of website_visitors registry
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Rank</th>
                  <th className="py-3.5 px-6">System Registered Page Name</th>
                  <th className="py-3.5 px-6 text-right">Accumulated Hit Counter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {analyticsRows.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-10 text-center font-bold text-slate-400 uppercase tracking-wider">
                      No individual page activity logs collected yet.
                    </td>
                  </tr>
                ) : (
                  analyticsRows.map((row, index) => (
                    <tr key={row.pagename} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-black text-slate-400">#{index + 1}</td>
                      <td className="py-4 px-6 font-semibold text-[#002B5B]">
                        <code className="bg-slate-100 py-1 px-2.5 rounded-md text-xs font-mono select-all">
                          {row.pagename}
                        </code>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-600">
                        {parseInt(row.counter).toLocaleString()} hits
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⏱️ RIGHT COLUMN: EXACT VISUAL TIME HISTORY (LIVE EVENT AUDIT TRAIL) */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <h3 className="text-lg font-black text-[#002B5B] uppercase tracking-tight m-0">
              User Access Time Logs
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">
              Exact timestamp registry history feed
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl shadow-sm overflow-y-auto max-h-[22.5rem] divide-y divide-slate-100 bg-white">
            {recentLogs.length === 0 ? (
              <div className="py-16 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                No user access clocks caught yet.
              </div>
            ) : (
              recentLogs.map((log, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors text-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono bg-slate-100 text-[#002B5B] font-bold px-2 py-0.5 rounded text-xs select-all">
                      {log.pagename}
                    </span>
                  </div>
                  <span className="text-slate-500 font-semibold font-mono text-[11px] block">
                    {new Date(log.accessed_at + " UTC").toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 📩 SECTION 3: UNIFIED USER CONTACT INBOX MESSAGES MATRIX */}
      <div className="pt-2">
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#002B5B] uppercase tracking-tight m-0">
            Recent Contact Form Submissions Ledger
          </h3>
          <p className="text-xs text-slate-400 font-semibold uppercase mt-1">
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
                      {new Date(inquiry.created_at + " UTC").toLocaleString(undefined, {
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

    </div>
  );
}

export default AnalyticsManagement;