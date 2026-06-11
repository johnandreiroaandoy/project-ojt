import React from 'react';

function FinancialReporting() {
  const services = [
    { name: 'Consolidation of Financial Statements', desc: 'Preparation and consolidation of the City’s Trial Balances, Statements of Financial Position, and Statements of Financial Performance across all funds.' },
    { name: 'Barangay & LGU Financial Review', desc: 'Technical evaluation and checking of financial reports submitted by component barangays to ensure uniformity and compliance with accounting rules.' },
    { name: 'Submission of Regulatory Accountability Reports', desc: 'Timely preparation and submission of monthly, quarterly, and annual financial disclosures to the COA and DBM.' },
    { name: 'Tax Remittance Management', desc: "Processing, reconciliation, and filing of the local government unit's withholding taxes to the Bureau of Internal Revenue (BIR)." }
  ];

  return (
    <div>
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">📊 Financial Reporting Section</h2>
        <p className="text-gray-500 mt-2 text-lg">Accountability, precision, and state auditing compliance.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <div key={index} className="border border-gray-100 bg-gray-50/50 p-6 rounded-xl hover:border-blue-500 hover:bg-white transition-all">
            <h3 className="text-lg font-semibold text-gray-900 text-blue-600">{service.name}</h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialReporting;