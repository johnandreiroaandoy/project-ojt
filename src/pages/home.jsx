import React from 'react';

function Home () {
  return (
    <div className="w-full bg-slate-50/50 py-12 animate-fadeIn">
      {/* SECTION 1: SERVICES CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        {/* Header Section Title */}
        <h2 className="text-xl md:text-2xl text-center mb-12 font-black text-[#002B5B] uppercase tracking-wide">
          The services offered by the office includes:
        </h2>

        {/* Responsive Two-Column Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* 1. LEFT CARD: City Transactions */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-500 shadow-lg shadow-slate-500 flex flex-col transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-black text-[#002B5B] uppercase italic tracking-tight border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              City Transactions:
            </h3>
            
            <ul className="space-y-3 text-slate-600 font-medium text-sm md:text-base list-none pl-0">
              <li className="flex items-start gap-2 text-slate-700 font-semibold mb-4 leading-relaxed">
                ✨ Facilitates processing of documents (vouchers, payrolls, and contracts)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1 select-none">•</span>
                Issues Certifications
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Payslips (employees)
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Employee’s Remittances to GSIS and HDMF Loans & Premiums / Philhealth Premiums / BIR Withholding Tax / Cooperative and Bank Loans
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                BIR Forms 2316, 2306, 2307 (employees/suppliers)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1 select-none">•</span>
                Unappropriated Surplus
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1 select-none">•</span>
                Accountant’s Advice of Local Check Disbursement
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1 select-none">•</span>
                Availability of Funds
              </li>
            </ul>
          </div>

          {/* 2. RIGHT CARD: Barangay Transactions */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-500 shadow-lg shadow-slate-500 flex flex-col transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-black text-[#002B5B] uppercase italic tracking-tight border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Barangay Transactions:
            </h3>
            
            <ul className="space-y-3 text-slate-600 font-medium text-sm md:text-base list-none pl-0">
              <li className="flex items-start gap-2 text-slate-700 font-semibold mb-4 leading-relaxed">
                🗺️ Facilitates recording of barangay transactions (182 barangays)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1 select-none">•</span>
                Issues Certifications
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Statement of Income & Expenditures
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Unappropriated Surplus
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Accountant’s Certification for the cash and cash related accounts as per book balances
              </li>
              <li className="flex items-start gap-3 pl-4 text-slate-500 text-xs md:text-sm">
                <span className="text-slate-400">•</span>
                Status of Cash Advances
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1 select-none">•</span>
                Availability of Funds
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 2: OFFICE RESPONSIBILITY & MANDATE FOOTER CARD */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#002B5B] to-[#001f42] text-white p-8 rounded-2xl shadow-xl shadow-slate-500 border border-white/10">
          <p className="text-xl md:text-base text-slate-200 font-large leading-relaxed mb-4">
           The City Accountant’s Office is located at Rm. 27, 3rdFlr, City Hall Bldg., San Pedro St., Davao City. You may contact them through (082) 241-1000, local 51-55 or email them at caodavao@yahoo.com or at cao@davaocity.gov.ph
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home