import React from 'react';

function InternalAudit() {
  const services = [
    { name: 'Internal Control System Evaluation', desc: 'Regular assessment of office workflows, asset registries, and financial handling methods to identify system vulnerabilities.' },
    { name: 'Post-Audit of Financial Transactions', desc: 'Conducting comprehensive post-audits on high-value paid vouchers, payroll accounts, and procurement contracts.' },
    { name: 'Management & Operations Audit', desc: 'Reviewing local department operational workflows to ensure city programs are executed efficiently.' },
    { name: 'Compliance Verification Tracking', desc: 'Monitoring and assessing the implementation of Audit Observation Memorandums (AOM) issued by state auditors.' }
  ];

  return (
    <div>
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">🔍 Internal Audit Section</h2>
        <p className="text-gray-500 mt-2 text-lg">Evaluating internal controls and safeguarding local government assets.</p>
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

export default InternalAudit;