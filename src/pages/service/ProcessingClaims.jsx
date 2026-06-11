import React from 'react';

function ProcessingClaims() {
  const services = [
    { name: 'Pre-Audit of Disbursement Vouchers', desc: 'Strict verification of supporting documents, pricing, calculations, and legal bases for all city expenditures before releasing checks.' },
    { name: 'Payroll and Personnel Benefit Processing', desc: 'Prompt verification and pre-audit of regular salaries, casual wages, allowances, bonuses, and terminal leave benefits.' },
    { name: 'Procurement and Supplier Settlement Review', desc: 'Review of documentation for infrastructure projects, goods delivery, and service contracts to clear vendor payouts.' },
    { name: 'Travel and Cash Advance Liquidations', desc: 'Processing and auditing the liquidation documents of official local/foreign travel expenses.' }
  ];

  return (
    <div>
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">💳 Processing of Claims Section</h2>
        <p className="text-gray-500 mt-2 text-lg">Pre-auditing and clearing all city disbursements and payouts securely.</p>
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

export default ProcessingClaims;