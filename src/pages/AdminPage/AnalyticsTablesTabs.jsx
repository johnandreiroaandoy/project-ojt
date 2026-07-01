// AnalyticsTablesTabs.jsx
import React, { useState, useMemo } from 'react';

export default function AnalyticsTablesTabs({
  inquiriesList = [],
  activityLogs = [],
  userMatrix = [],
  // Backend pagination metadata for each table tab.
  pagination = {},
  // Requests a new backend page from AnalyticsManagement.
  onPageChange = () => {},
}) {
  const [activeTab, setActiveTab] = useState('submissions');
  const [filterRange, setFilterRange] = useState('all'); // 'all' | 'today' | 'week' | 'month'
  const [submissionDateFilter, setSubmissionDateFilter] = useState({
    year: 'all',
    month: 'all',
    day: 'all',
    hour: 'all',
  });
  const [submissionSearch, setSubmissionSearch] = useState('');

  // Shared Previous/Next footer. It uses backend totals instead of slicing data in React.
  const PaginationControls = ({ meta, onPageChange }) => {
    if (!meta || Number(meta.total_pages || 1) <= 1) {
      return null;
    }

    const page = Number(meta.current_page || 1);
    const perPage = Number(meta.per_page || 10);
    const totalRows = Number(meta.total || 0);
    const totalPages = Number(meta.total_pages || 1);
    const startRow = totalRows === 0 ? 0 : ((page - 1) * perPage) + 1;
    const endRow = Math.min(page * perPage, totalRows);

    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
        <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Showing {startRow}-{endRow} of {totalRows}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-black uppercase tracking-wider text-[#002B5B] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Previous
          </button>
          <span className="min-w-[84px] text-center text-[11px] font-black uppercase tracking-wider text-slate-500">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-black uppercase tracking-wider text-[#002B5B] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // Helper date parsing framework to catch potential standard or non-standard SQL text values safely
  const parseTargetDate = (dateStr) => {
    if (!dateStr) return null;
    const safeStr = dateStr.includes('Z') || dateStr.includes('+') ? dateStr : dateStr.replace(' ', 'T');
    const d = new Date(safeStr);
    return isNaN(d.getTime()) ? new Date(dateStr) : d;
  };

  const formatTimelineDate = (dateStr) => {
    const date = parseTargetDate(dateStr);
    if (!date || isNaN(date.getTime())) return '---';

    const year = date.getFullYear();
    const month = date.toLocaleString(undefined, { month: 'long' });
    const day = date.getDate();
    const hour = date.toLocaleString(undefined, { hour: 'numeric', hour12: true }).replace(/\s/g, '');

    return `${year} ${month} > ${month} ${day} > ${hour}`;
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
    if (d.includes('mobile') || d.includes('phone') || d.includes('android') || d.includes('iphone')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (d.includes('tablet')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'; // Desktop default
  };

  const getOsBadgeStyles = (os) => {
    const value = String(os).toLowerCase();
    if (value.includes('windows')) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (value.includes('mac') || value.includes('ios') || value.includes('ipad')) return 'bg-slate-50 text-slate-700 border-slate-200';
    if (value.includes('android')) return 'bg-lime-50 text-lime-700 border-lime-200';
    if (value.includes('chrome')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (value.includes('linux')) return 'bg-zinc-50 text-zinc-700 border-zinc-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const inferMobileDeviceBrand = (model, userAgent) => {
    const normalizedModel = String(model || '').trim();
    const ua = String(userAgent || '');
    const modelLower = normalizedModel.toLowerCase();
    const uaLower = ua.toLowerCase();

    if (/iphone/i.test(ua) || modelLower.includes('iphone')) return 'Apple iPhone';
    if (/ipad/i.test(ua) || modelLower.includes('ipad')) return 'Apple iPad';
    if (modelLower.includes('pixel') || uaLower.includes('pixel')) return 'Google';
    if (/^(sm-|gt-|sch-|sgh-)/i.test(normalizedModel)) return 'Samsung';
    if (/^(redmi|poco|mi\s|m20|m21|m22|m23|m24|m25)/i.test(normalizedModel) || uaLower.includes('xiaomi')) return 'Xiaomi';
    if (/^(cph|p[a-z]{2,3}m|oppo)/i.test(normalizedModel) || uaLower.includes('oppo')) return 'OPPO';
    if (/^(rmx|realme)/i.test(normalizedModel) || uaLower.includes('realme')) return 'Realme';
    if (/^(vivo|v\d{4})/i.test(normalizedModel) || uaLower.includes('vivo')) return 'Vivo';
    if (/^(huawei|ane-|lya-|vog-|mar-|yal-)/i.test(normalizedModel) || uaLower.includes('huawei')) return 'Huawei';
    if (/^(honor|bkl-|col-|jsn-)/i.test(normalizedModel) || uaLower.includes('honor')) return 'Honor';
    if (/^(moto|xt\d+)/i.test(normalizedModel) || uaLower.includes('motorola')) return 'Motorola';
    if (/^(infinix|tecno|itel)/i.test(normalizedModel) || /(infinix|tecno|itel)/i.test(ua)) return normalizedModel.split(/\s+/)[0] || 'Mobile';

    return '';
  };

  const buildClientDeviceLabel = (model, userAgent) => {
    const normalizedModel = String(model || '').trim();
    const ua = String(userAgent || '');
    const isMobileOrTablet = /android|iphone|ipad|mobile|tablet/i.test(`${normalizedModel} ${ua}`);

    if (!isMobileOrTablet && !normalizedModel) return '';

    const brand = inferMobileDeviceBrand(normalizedModel, ua);
    if (brand && normalizedModel && !normalizedModel.toLowerCase().startsWith(brand.toLowerCase())) {
      return `${brand} ${normalizedModel}`.trim();
    }

    return brand || normalizedModel;
  };

  const isPlaceholderDeviceLabel = (device) => {
    const value = String(device || '').trim().toLowerCase();
    return value === ''
      || value === '?0'
      || value === 'k'
      || value === 'wv'
      || value === 'mobile'
      || value === 'tablet';
  };

  const getDeviceFallbackLabel = (row) => {
    const os = getOsLabel(row).toLowerCase();
    if (os.includes('android')) return 'Android Phone';
    if (os.includes('ipad')) return 'Apple iPad';
    if (os.includes('ios')) return 'Apple iPhone';

    const deviceCategory = String(row?.device_type || row?.device || '').toLowerCase();
    if (deviceCategory.includes('tablet')) return 'Tablet';
    if (deviceCategory.includes('mobile') || deviceCategory.includes('phone')) return 'Mobile Phone';

    return 'Desktop/Laptop';
  };

  const getDeviceLabel = (row) => {
    const rawDevice = row?.device_model
      || row?.device_name
      || row?.device_brand_version
      || row?.device_type
      || row?.device
      || 'Desktop';

    if (isPlaceholderDeviceLabel(rawDevice)) {
      return getDeviceFallbackLabel(row);
    }

    return buildClientDeviceLabel(rawDevice, row?.user_agent || row?.userAgent) || rawDevice;
  };

  const getOsLabel = (row) => {
    return row?.os
      || row?.operating_system
      || row?.platform
      || 'Unknown';
  };

  const submissionDateOptions = useMemo(() => ({
    years: Array.from({ length: 12 }, (_, index) => 2015 + index),
    months: [
      [0, 'January'],
      [1, 'February'],
      [2, 'March'],
      [3, 'April'],
      [4, 'May'],
      [5, 'June'],
      [6, 'July'],
      [7, 'August'],
      [8, 'September'],
      [9, 'October'],
      [10, 'November'],
      [11, 'December'],
    ],
    days: Array.from({ length: 31 }, (_, index) => index + 1),
    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0],
  }), []);

  const matchesSubmissionDateFilter = (dateObj) => {
    if (!dateObj) return false;

    const { year, month, day, hour } = submissionDateFilter;
    if (year !== 'all' && dateObj.getFullYear() !== Number(year)) return false;
    if (month !== 'all' && dateObj.getMonth() !== Number(month)) return false;
    if (day !== 'all' && dateObj.getDate() !== Number(day)) return false;
    if (hour !== 'all' && dateObj.getHours() !== Number(hour)) return false;
    return true;
  };

  const updateSubmissionDateFilter = (key, value) => {
    if (value !== 'all') setFilterRange('all');

    setSubmissionDateFilter((current) => ({
      ...current,
      [key]: value,
      ...(key === 'year' ? { month: 'all', day: 'all', hour: 'all' } : {}),
      ...(key === 'month' ? { day: 'all', hour: 'all' } : {}),
      ...(key === 'day' ? { hour: 'all' } : {}),
    }));
  };

  const resetSubmissionFilters = () => {
    setFilterRange('all');
    setSubmissionSearch('');
    setSubmissionDateFilter({
      year: 'all',
      month: 'all',
      day: 'all',
      hour: 'all',
    });
  };

  // 📈 PROCESSED INQUIRIES ENGINE
  const selectedSubmissionMonthName = submissionDateFilter.month === 'all'
    ? ''
    : (submissionDateOptions.months.find(([monthIndex]) => Number(monthIndex) === Number(submissionDateFilter.month))?.[1] || '');

  const getInquiryName = (inquiry) => {
    return inquiry.name
      || inquiry.full_name
      || inquiry.fullname
      || inquiry.sender_name
      || inquiry.user_name
      || inquiry.username
      || [inquiry.first_name, inquiry.last_name].filter(Boolean).join(' ')
      || 'Unknown Sender';
  };

  const processedInquiries = useMemo(() => {
    const searchTerm = submissionSearch.trim().toLowerCase();

    return inquiriesList
      .filter(inq => {
        const dateObj = parseTargetDate(inq.created_at);
        const searchableText = [
          getInquiryName(inq),
          inq.email,
          inq.subject,
          inq.message,
        ].filter(Boolean).join(' ').toLowerCase();

        return (
          isWithinTimeRange(dateObj, filterRange) &&
          matchesSubmissionDateFilter(dateObj) &&
          (!searchTerm || searchableText.includes(searchTerm))
        );
      })
      .sort((a, b) => {
        const dateA = parseTargetDate(a.created_at) || 0;
        const dateB = parseTargetDate(b.created_at) || 0;
        return dateB - dateA;
      });
  }, [inquiriesList, filterRange, submissionDateFilter, submissionSearch]);

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
    const latestLogByIp = activityLogs.reduce((latestLogs, log) => {
      const ip = log.ip_address || '127.0.0.1';
      const logDate = log.accessed_at || log.created_at;
      const currentLatestDate = latestLogs[ip]?.accessed_at || latestLogs[ip]?.created_at;

      if (!latestLogs[ip] || new Date(logDate) > new Date(currentLatestDate)) {
        latestLogs[ip] = log;
      }

      return latestLogs;
    }, {});

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
            device_type: getDeviceLabel(log),
            os: getOsLabel(log),
            last_active: logDate,
          };
        }

        // Keep the latest timestamp observed for this user client
        if (new Date(logDate) > new Date(matrixMap[ip].last_active)) {
          matrixMap[ip].last_active = logDate;
          matrixMap[ip].browser = log.browser || matrixMap[ip].browser;
          matrixMap[ip].device_type = getDeviceLabel(log);
          matrixMap[ip].os = getOsLabel(log);
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
    return userMatrix
      .map((row) => {
        const latestLog = latestLogByIp[row.ip_address];

        if (!latestLog) return row;

        return {
          ...row,
          browser: latestLog.browser || row.browser,
          device_type: getDeviceLabel(latestLog),
          os: getOsLabel(latestLog),
          last_active: latestLog.accessed_at || latestLog.created_at || row.last_active,
        };
      })
      .filter((row) => {
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
            {`📩 Submissions (${pagination.inquiries?.total ?? processedInquiries.length})`}
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
            {`📜 System Logs (${pagination.activityLogs?.total ?? processedLogs.length})`}
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
            {`👥 User Matrix (${pagination.userMatrix?.total ?? processedMatrix.length})`}
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
            <div className="mb-4 flex flex-col gap-4">
              <p className="text-xs text-slate-400 font-semibold uppercase m-0">
                Incoming direct inquiries and user messages sorted dynamically (newest records on top)
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={submissionDateFilter.year}
                  onChange={(e) => updateSubmissionDateFilter('year', e.target.value)}
                  className="bg-white border border-slate-200 text-[#002B5B] font-black text-[11px] uppercase tracking-wider py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Year</option>
                  {submissionDateOptions.years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={submissionDateFilter.month}
                  onChange={(e) => updateSubmissionDateFilter('month', e.target.value)}
                  className="bg-white border border-slate-200 text-[#002B5B] font-black text-[11px] uppercase tracking-wider py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Month</option>
                  {submissionDateOptions.months.map(([monthIndex, monthName]) => (
                    <option key={monthIndex} value={monthIndex}>{monthName}</option>
                  ))}
                </select>

                <select
                  value={submissionDateFilter.day}
                  onChange={(e) => updateSubmissionDateFilter('day', e.target.value)}
                  className="bg-white border border-slate-200 text-[#002B5B] font-black text-[11px] uppercase tracking-wider py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Day</option>
                  {submissionDateOptions.days.map((day) => (
                    <option key={day} value={day}>{selectedSubmissionMonthName ? `${selectedSubmissionMonthName} ${day}` : `Day ${day}`}</option>
                  ))}
                </select>

                <select
                  value={submissionDateFilter.hour}
                  onChange={(e) => updateSubmissionDateFilter('hour', e.target.value)}
                  className="bg-white border border-slate-200 text-[#002B5B] font-black text-[11px] uppercase tracking-wider py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Time</option>
                  {submissionDateOptions.hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {new Date(2025, 0, 1, hour).toLocaleString(undefined, { hour: 'numeric', hour12: true }).replace(/\s/g, '')}
                    </option>
                  ))}
                </select>

                <input
                  type="search"
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                  placeholder="Search submission"
                  className="bg-white border border-slate-200 text-[#002B5B] placeholder:text-slate-400 font-bold text-[11px] tracking-wide py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 min-w-[210px]"
                />

                <button
                  type="button"
                  onClick={resetSubmissionFilters}
                  className="bg-[#002B5B] hover:bg-blue-900 text-white border border-[#002B5B] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                >
                  View All
                </button>
              </div>
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
                          <p className="font-black text-[#002B5B] m-0 leading-tight">{getInquiryName(inquiry)}</p>
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
                          {formatTimelineDate(inquiry.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <PaginationControls
                meta={pagination.inquiries}
                onPageChange={(page) => onPageChange('inquiries', page)}
              />
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
                    <th className="py-3.5 px-6 w-[13%]">Browser</th>
                    <th className="py-3.5 px-6 w-[15%]">Device</th>
                    <th className="py-3.5 px-6 w-[12%]">OS</th>
                    <th className="py-3.5 px-6 text-right w-[15%]">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedLogs.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
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
                          <span
                            title={getDeviceLabel(log)}
                            className={`inline-block max-w-[180px] truncate border px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${getDeviceBadgeStyles(getDeviceLabel(log))}`}
                          >
                            {getDeviceLabel(log)}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span
                            title={getOsLabel(log)}
                            className={`inline-block max-w-[120px] truncate border px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${getOsBadgeStyles(getOsLabel(log))}`}
                          >
                            {getOsLabel(log)}
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
              <PaginationControls
                meta={pagination.activityLogs}
                onPageChange={(page) => onPageChange('activityLogs', page)}
              />
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
                    <th className="py-3 px-5 w-[10%]">Visitor IP Address</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Root</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Mandates</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Services</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Reports</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Contact</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">Browser</th>
                    <th className="py-3.5 px-4 text-center w-[13%]">Device</th>
                    <th className="py-3.5 px-4 text-center w-[9%]">OS</th>
                    <th className="py-3.5 px-6 text-right w-[15%]">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {processedMatrix.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-12 text-center font-bold text-slate-400 uppercase tracking-wider">
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
                          <span
                            title={getDeviceLabel(row)}
                            className={`inline-block max-w-[180px] truncate border px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${getDeviceBadgeStyles(getDeviceLabel(row))}`}
                          >
                            {getDeviceLabel(row)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span
                            title={getOsLabel(row)}
                            className={`inline-block max-w-[120px] truncate border px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${getOsBadgeStyles(getOsLabel(row))}`}
                          >
                            {getOsLabel(row)}
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
              <PaginationControls
                meta={pagination.userMatrix}
                onPageChange={(page) => onPageChange('userMatrix', page)}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
