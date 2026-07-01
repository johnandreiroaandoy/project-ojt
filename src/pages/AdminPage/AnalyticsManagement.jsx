// AnalyticsManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsTablesTabs from './AnalyticsTablesTabs';

// The backend endpoints return 10 records per page for each analytics table.
const TABLE_ROWS_PER_PAGE = 10;

function AnalyticsManagement({ baseUrl, getAuthHeaders, onTotalInquiriesLoaded }) {
  const [timeframe, setTimeframe] = useState('day');
  const [analyticsRows, setAnalyticsRows] = useState([]);
  const [inquiryHours, setInquiryHours] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [userMatrix, setUserMatrix] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  // Current backend page for each analytics table tab.
  const [tablePages, setTablePages] = useState({
    inquiries: 1,
    activityLogs: 1,
    userMatrix: 1,
  });

  // Pagination metadata returned by PHP: current_page, per_page, total, total_pages.
  const [tablePagination, setTablePagination] = useState({
    inquiries: null,
    activityLogs: null,
    userMatrix: null,
  });
  
  // 🔍 Table Filter State
  const [tableSearchQuery, setTableSearchQuery] = useState('');

  useEffect(() => {
    const headers = getAuthHeaders();
    if (!headers) return;

    Promise.all([
      fetch(`${baseUrl}/api/analytics/metrics`, { headers }).then(res => res.json()).catch(() => ({ metrics: [], inquiryHours: [], totalInquiries: 0 })),
      // These three table endpoints are paginated in PHP, so React only receives one page at a time.
      fetch(`${baseUrl}/api/analytics/inquiries?page=${tablePages.inquiries}&per_page=${TABLE_ROWS_PER_PAGE}`, { headers }).then(res => res.json()).catch(() => ({ inquiries: [] })),
      fetch(`${baseUrl}/api/analytics/activity-logs?page=${tablePages.activityLogs}&per_page=${TABLE_ROWS_PER_PAGE}`, { headers }).then(res => res.json()).catch(() => ({ activityLogs: [] })),
      fetch(`${baseUrl}/api/analytics/user-matrix?page=${tablePages.userMatrix}&per_page=${TABLE_ROWS_PER_PAGE}`, { headers }).then(res => res.json()).catch(() => ({ userMatrix: [] })),
      fetch(`${baseUrl}/api/analytics/chart-timeline`, { headers }).then(res => res.json()).catch(() => ({ timelineData: [] }))
    ])
      .then(([metricsData, inquiriesData, logsData, matrixData, chartData]) => {
        if (metricsData.metrics) setAnalyticsRows(metricsData.metrics);
        if (metricsData.inquiryHours) setInquiryHours(metricsData.inquiryHours);
        if (metricsData.totalInquiries !== undefined) onTotalInquiriesLoaded(metricsData.totalInquiries);
        if (inquiriesData.inquiries) setInquiriesList(inquiriesData.inquiries);
        if (logsData.activityLogs) setActivityLogs(logsData.activityLogs); // 🌟 Automatically stores user_email, ip_address, browser, device_type
        if (matrixData.userMatrix) setUserMatrix(matrixData.userMatrix);
        // Store page totals separately so the table component can render Previous/Next buttons.
        setTablePagination({
          inquiries: inquiriesData.inquiriesPagination || null,
          activityLogs: logsData.activityLogsPagination || null,
          userMatrix: matrixData.userMatrixPagination || null,
        });
        if (chartData.timelineData) setTimelineData(chartData.timelineData);
      })
      .catch(err => {
        console.error(err);
      });
  }, [baseUrl, getAuthHeaders, onTotalInquiriesLoaded, tablePages]);

  // Called by AnalyticsTablesTabs when a user clicks Previous or Next.
  const handleTablePageChange = (key, page) => {
    setTablePages((current) => ({
      ...current,
      [key]: page,
    }));
  };

  // Helper to check if a route belongs to administrative/auth paths
  const isAdminOrAuthRoute = (pagename) => {
    return pagename === '/admin' || pagename === '/contact/admin' || pagename === '/login';
  };

  // 🟢 PARSING ENGINE: Processes actual database entries from dynamic server payloads
  const getProcessedTimelineData = () => {
    const parseLogDate = (dateStr) => {
      if (!dateStr) return null;
      const safeStr = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : dateStr.replace(' ', 'T');
      const d = new Date(safeStr);
      return isNaN(d.getTime()) ? new Date(dateStr) : d;
    };

    // 1. DAY VIEW (Hourly tracking)
    if (timeframe === 'day') {
      const hourBuckets = Array(24).fill(0).map((_, hour) => {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        return { label: `${displayHour} ${ampm}`, traffic: 0, inquiries: 0 };
      });

      if (activityLogs && activityLogs.length > 0) {
        activityLogs.forEach(log => {
          if (isAdminOrAuthRoute(log.pagename)) return;
          const dateObj = parseLogDate(log.accessed_at || log.created_at);
          if (dateObj) hourBuckets[dateObj.getHours()].traffic++;
        });
      }

      if (inquiriesList && inquiriesList.length > 0) {
        inquiriesList.forEach(inq => {
          const dateObj = parseLogDate(inq.created_at);
          if (dateObj) hourBuckets[dateObj.getHours()].inquiries++;
        });
      }

      if (inquiryHours && inquiryHours.length > 0) {
        inquiryHours.forEach(item => {
          const hour = item.hour_number !== undefined ? item.hour_number : item.hour;
          if (hour >= 0 && hour < 24) {
            hourBuckets[hour].inquiries += Number(item.message_count || item.count || item.counter || 0);
          }
        });
      }

      if (timelineData && timelineData.length > 0 && activityLogs.length === 0) {
        timelineData.forEach((item, idx) => {
          if (hourBuckets[idx]) {
            hourBuckets[idx].traffic += Number(item.visit_count || item.count || item.counter || 0);
          }
        });
      }
      return hourBuckets;
    }

    // 2. WEEK VIEW (Sun-Sat)
    if (timeframe === 'week') {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weekBuckets = daysOfWeek.map(day => ({ label: day, traffic: 0, inquiries: 0 }));
      
      if (activityLogs && activityLogs.length > 0) {
        activityLogs.forEach(item => {
          if (isAdminOrAuthRoute(item.pagename)) return;
          const dateObj = parseLogDate(item.accessed_at || item.created_at);
          if (dateObj) weekBuckets[dateObj.getDay()].traffic++;
        });
      }

      if (inquiriesList && inquiriesList.length > 0) {
        inquiriesList.forEach(item => {
          const dateObj = parseLogDate(item.created_at);
          if (dateObj) weekBuckets[dateObj.getDay()].inquiries++;
        });
      }
      return weekBuckets;
    }

    // 3. MONTH VIEW (Calendar Weeks)
    if (timeframe === 'month') {
      const labels = ['Week 1 (1-7)', 'Week 2 (8-14)', 'Week 3 (15-21)', 'Week 4 (22+)'];
      const monthBuckets = labels.map(lbl => ({ label: lbl, traffic: 0, inquiries: 0 }));

      const parseIntoBucket = (dateObj, metric) => {
        const date = dateObj.getDate();
        if (date <= 7) monthBuckets[0][metric]++;
        else if (date <= 14) monthBuckets[1][metric]++;
        else if (date <= 21) monthBuckets[2][metric]++;
        else monthBuckets[3][metric]++;
      };

      if (activityLogs && activityLogs.length > 0) {
        activityLogs.forEach(item => {
          if (isAdminOrAuthRoute(item.pagename)) return;
          const dateObj = parseLogDate(item.accessed_at || item.created_at);
          if (dateObj) parseIntoBucket(dateObj, 'traffic');
        });
      }

      if (inquiriesList && inquiriesList.length > 0) {
        inquiriesList.forEach(item => {
          const dateObj = parseLogDate(item.created_at);
          if (dateObj) parseIntoBucket(dateObj, 'inquiries');
        });
      }
      return monthBuckets;
    }

    // 4. YEAR VIEW (Months Jan-Dec)
    if (timeframe === 'year') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const yearBuckets = months.map(m => ({ label: m, traffic: 0, inquiries: 0 }));

      if (activityLogs && activityLogs.length > 0) {
        activityLogs.forEach(item => {
          if (isAdminOrAuthRoute(item.pagename)) return;
          const dateObj = parseLogDate(item.accessed_at || item.created_at);
          if (dateObj) yearBuckets[dateObj.getMonth()].traffic++;
        });
      }

      if (inquiriesList && inquiriesList.length > 0) {
        inquiriesList.forEach(item => {
          const dateObj = parseLogDate(item.created_at);
          if (dateObj) yearBuckets[dateObj.getMonth()].inquiries++;
        });
      }
      return yearBuckets;
    }

    return [];
  };

  // Filter out administrative / system routes from the charts stream
  const cleanBarChartData = useMemo(() => {
    return analyticsRows.filter(row => !isAdminOrAuthRoute(row.pagename));
  }, [analyticsRows]);

  // 🔍 ENHANCED FILTER ENGINE: Applies search query matches and sorts items highest to lowest
  const processedTableRows = useMemo(() => {
    return analyticsRows
      .filter(row => {
        const isNotAdminOrAuth = !isAdminOrAuthRoute(row.pagename);
        const matchesSearch = row.pagename.toLowerCase().includes(tableSearchQuery.toLowerCase());
        return isNotAdminOrAuth && matchesSearch;
      })
      .sort((a, b) => parseInt(b.counter) - parseInt(a.counter));
  }, [analyticsRows, tableSearchQuery]);

  const activeChartData = getProcessedTimelineData();

  return (
    <div className="space-y-12">
      
      {/* 📊 GLOBAL TIMEFRAME CONTROLLER */}
      <div className="flex justify-end bg-slate-100 p-2 rounded-2xl max-w-xs ml-auto border border-slate-200">
        {['day', 'week', 'month', 'year'].map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`py-1.5 px-4 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer w-full text-center ${
              timeframe === t ? 'bg-[#002B5B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 📊 SECTION 1: VISUALIZATION GRAPHS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART A */}
        <div className="bg-slate-50/60 p-5 border border-slate-200/80 rounded-2xl flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-tight m-0">User Hits Per Page Distribution</h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Popularity mapping across unique pages (Excludes Admin & Login)</p>
          </div>
          <div className="h-60 w-full">
            {cleanBarChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">📈 Awaiting metrics stream...</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cleanBarChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="pagename" stroke="#94A3B8" style={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'monospace' }} />
                  <YAxis stroke="#94A3B8" style={{ fontSize: '11px', fontWeight: 'bold' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }} cursor={{ fill: 'rgba(0, 43, 91, 0.02)' }} />
                  <Bar dataKey="counter" name="Total Hits" fill="#002B5B" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* CHART B */}
        <div className="bg-slate-50/60 p-5 border border-slate-200/80 rounded-2xl flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-sm font-black text-[#002B5B] uppercase tracking-tight m-0">User Traffic Timeline</h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Active end-user sequential page views ({timeframe} view)</p>
          </div>
          <div className="h-60 w-full">
            {activeChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">📜 Awaiting traffic streams...</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorTrafficOnly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="label" stroke="#94A3B8" style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <YAxis stroke="#94A3B8" style={{ fontSize: '11px', fontWeight: 'bold' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="traffic" name="End-User Page Views" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTrafficOnly)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* CHART C */}
        <div className="bg-slate-50/60 p-5 border border-slate-200/80 rounded-2xl flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-sm font-black text-[#10B981] uppercase tracking-tight m-0">Form Inquiries Timeline</h4>
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Direct conversion volume counts ({timeframe} view)</p>
          </div>
          <div className="h-60 w-full">
            {activeChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">📩 Awaiting message streams...</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorInquiriesOnly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="label" stroke="#94A3B8" style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <YAxis stroke="#94A3B8" style={{ fontSize: '11px', fontWeight: 'bold' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="inquiries" name="Messages Sent" stroke="#10B981" fillOpacity={1} fill="url(#colorInquiriesOnly)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* 📊 SECTION 2: TRAFFIC DISTRIBUTION BREAKDOWN TABLE */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg font-black text-[#002B5B] uppercase tracking-tight m-0">Traffic Distribution Breakdown</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Live metrics filtered down to end-user registry paths</p>
          </div>
          
          {/* 🔍 REAL-TIME SEARCH BOX FILTER */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="🔍 Filter endpoint name..."
              value={tableSearchQuery}
              onChange={(e) => setTableSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-[#002B5B] focus:bg-white transition-all shadow-sm"
            />
          </div>
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
              {processedTableRows.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-10 text-center font-bold text-slate-400 uppercase tracking-wider">
                    {tableSearchQuery ? "No matching registered routes found." : "No individual page activity logs collected yet."}
                  </td>
                </tr>
              ) : (
                processedTableRows.map((row, index) => (
                  <tr key={row.pagename} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-400">#{index + 1}</td>
                    <td className="py-4 px-6 font-semibold text-[#002B5B]">
                      <code className="bg-slate-100 py-1 px-2.5 rounded-md text-xs font-mono select-all">{row.pagename}</code>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-emerald-600">{parseInt(row.counter).toLocaleString()} hits</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🌟 📑 SECTION 3: RENDER SUB-TABBED TABLES */}
      {/* Passing down activityLogs here ensures the new user_email, ip_address, browser, and device_type metrics reach your display dashboard layout */}
      <AnalyticsTablesTabs
        inquiriesList={inquiriesList}
        activityLogs={activityLogs}
        userMatrix={userMatrix}
        pagination={tablePagination}
        onPageChange={handleTablePageChange}
      />

    </div>
  );
}

export default AnalyticsManagement;
