import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AnalyticsManagement({ analyticsRows = [], inquiryHours = [], inquiriesList = [] }) {
  
  // Convert standard hour indexes (0-23) into clean readable timeline labels (e.g., "3 PM")
  const formattedInquiryData = inquiryHours.map(item => {
    const hour = item.hour_number;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return {
      ...item,
      timeLabel: `${displayHour} ${ampm}`
    };
  });

  return (
    <div className="space-y-12">
      
      {/* 📊 SECTION 1: TRAFFIC & INTERACTION VISUALIZATION GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART A: HITS PER PAGE DISTRIBUTION */}
        <div className="bg-slate-50/60 p-5 border border-slate-200/80 rounded-2xl">
          <div className="mb-4">
            <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-tight m-0">
              Hits Per Page Distribution
            </h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              Which pages pull the most overall traffic volume
            </p>
          </div>
          <div className="h-60 w-full">
            {analyticsRows.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                📈 Awaiting metrics stream...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsRows} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="pagename" 
                    stroke="#94A3B8" 
                    style={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    style={{ fontSize: '11px', fontWeight: 'bold' }} 
                    allowDecimals={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}
                    cursor={{ fill: 'rgba(0, 43, 91, 0.02)' }}
                  />
                  <Bar dataKey="counter" name="Total Hits" fill="#002B5B" radius={[4, 4, 0, 0]} maxBarSize={45} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* CHART B: INQUIRY SUBMISSION TIMING PEAKS */}
        <div className="bg-slate-50/60 p-5 border border-slate-200/80 rounded-2xl">
          <div className="mb-4">
            <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-tight m-0">
              Inquiry Peak Response Hours
            </h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
              Identifies exactly what hours users submit message items
            </p>
          </div>
          <div className="h-60 w-full">
            {inquiriesList.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                ✉️ Awaiting direct user message trends...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedInquiryData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="timeLabel" 
                    stroke="#94A3B8" 
                    style={{ fontSize: '9px', fontWeight: 'bold' }} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    style={{ fontSize: '11px', fontWeight: 'bold' }} 
                    allowDecimals={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="message_count" 
                    name="Inquiries Sent" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={{ r: 3, strokeWidth: 1, fill: '#10B981' }} 
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* 📊 SECTION 2: MASTER COUNTER ACCUMULATION TABLE */}
      <div>
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