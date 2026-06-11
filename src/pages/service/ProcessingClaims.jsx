import React from 'react';

// Processing Claims Component
// Displays the services offered by the Processing of Claims Section
function ProcessingClaims() {

  // Array containing all services handled by the
  // Processing of Claims Section.
  // Each object stores a service title and description.
  const services = [
    {
      name: 'Pre-Audit of Disbursement Vouchers',
      desc: 'Strict verification of supporting documents, pricing, calculations, and legal bases for all city expenditures before releasing checks.'
    },
    {
      name: 'Payroll and Personnel Benefit Processing',
      desc: 'Prompt verification and pre-audit of regular salaries, casual wages, allowances, bonuses, and terminal leave benefits.'
    },
    {
      name: 'Procurement and Supplier Settlement Review',
      desc: 'Review of documentation for infrastructure projects, goods delivery, and service contracts to clear vendor payouts.'
    },
    {
      name: 'Travel and Cash Advance Liquidations',
      desc: 'Processing and auditing the liquidation documents of official local/foreign travel expenses.'
    }
  ];

  return (
    <div>

      {/* Section Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">

        {/* Main title of the Processing of Claims Section */}
        <h2 className="text-3xl font-bold text-gray-900">
          💳 Processing of Claims Section
        </h2>

        {/* Brief description of the section's responsibility */}
        <p className="text-gray-500 mt-2 text-lg">
          Pre-auditing and clearing all city disbursements and payouts securely.
        </p>

      </div>

      {/* Responsive grid layout used to display service cards */}
      <div className="grid gap-8 md:grid-cols-2">

        {/* Loop through the services array and create a card for each service */}
        {services.map((service, index) => (

          <div
            key={index}
            className="border border-gray-100 bg-gray-50/50 p-6 rounded-xl hover:border-blue-500 hover:bg-white transition-all"
          >

            {/* Service title/name */}
            <h3 className="text-lg font-semibold text-gray-900 text-blue-600">
              {service.name}
            </h3>

            {/* Service description */}
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>

          </div>

        ))}
      </div>

    </div>
  );
}

// Export component so it can be imported and used
// in other pages such as Services.jsx or App.jsx
export default ProcessingClaims;