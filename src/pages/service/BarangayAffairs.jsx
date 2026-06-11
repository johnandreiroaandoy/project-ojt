import React from 'react';

function BarangayAffairs() {
  const services = [
    { name: 'Barangay Financial Records Custody', desc: 'Systematic indexing, tracking, and safekeeping of all financial journals, ledgers, and transactions submitted by Barangay Treasurers.' },
    { name: 'Technical Assistance & Accounting Guidance', desc: 'Conducting localized advisory sessions, workshops, and coaching clinics for Barangay Accountants and Treasurers.' },
    { name: 'Review of Barangay Budget Allocations', desc: 'Processing and reviewing the mathematical and procedural correctness of individual Barangay Appropriations and statutory fund transfers.' },
    { name: 'Clearance and Certificate Issuance', desc: 'Issuance of Accounting Clearances to outgoing barangay officials ensuring they have properly accounted for all assets.' }
  ];

  return (
    <div>
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">🏠 Barangay Affairs Section</h2>
        <p className="text-gray-500 mt-2 text-lg">Empowering and managing financial systems of micro-political units.</p>
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

export default BarangayAffairs;