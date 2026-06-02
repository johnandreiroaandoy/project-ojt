import React from 'react';

function Reports() {
  const reportCategories = [
    { title: "Annual Audit Reports", year: "2025", size: "2.4 MB", href: "/reports/annual-audit-report.pdf" },
    { title: "Quarterly Financial Statements", year: "2026 - Q1", size: "1.1 MB", href: "/reports/quarterly-financial-statements-q1-2026.pdf" },
    { title: "Full Disclosure Policy Compliance", year: "2025", size: "4.5 MB", href: "/reports/full-disclosure-policy-compliance-2025.pdf" },
    { title: "Statement of Receipts and Expenditures", year: "2025", size: "3.2 MB", href: "/reports/statement-of-receipts-and-expenditures-2025.pdf" },
  ];

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter">Transparency Reports</h2>
          <p className="text-gray-500 mt-2 font-medium">Downloadable financial documents and city audit records.</p>
        </div>

        <div className="space-y-4">
          {reportCategories.map((report, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-6">
                <div className="text-4xl">📄</div>
                <div>
                  <h4 className="text-[#002B5B] font-bold text-lg">{report.title}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Year: {report.year} • {report.size}</p>
                </div>
              </div>
              <a href={report.href} download className="mt-4 md:mt-0 bg-white text-[#002B5B] border border-gray-200 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#002B5B] hover:text-white transition-all shadow-sm">
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reports;