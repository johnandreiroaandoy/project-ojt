import React from 'react';

// Barangay Affairs Component
// Displays the services offered by the Barangay Affairs Section
function BarangayAffairs() {

  // Array of services provided by the Barangay Affairs Section.
  // Each object contains the service name and its description.
  const services = [
    {
      name: 'Barangay Financial Records Custody',
      desc: 'Systematic indexing, tracking, and safekeeping of all financial journals, ledgers, and transactions submitted by Barangay Treasurers.'
    },
    {
      name: 'Technical Assistance & Accounting Guidance',
      desc: 'Conducting localized advisory sessions, workshops, and coaching clinics for Barangay Accountants and Treasurers.'
    },
    {
      name: 'Review of Barangay Budget Allocations',
      desc: 'Processing and reviewing the mathematical and procedural correctness of individual Barangay Appropriations and statutory fund transfers.'
    },
    {
      name: 'Clearance and Certificate Issuance',
      desc: 'Issuance of Accounting Clearances to outgoing barangay officials ensuring they have properly accounted for all assets.'
    }
  ];

  return (
    <div>

      {/* Section Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900">
          🏠 Barangay Affairs Section
        </h2>

        {/* Short description of the section */}
        <p className="text-gray-500 mt-2 text-lg">
          Empowering and managing financial systems of micro-political units.
        </p>

      </div>

      {/* Grid layout for displaying service cards */}
      <div className="grid gap-8 md:grid-cols-2">

        {/* Loop through the services array and create a card for each service */}
        {services.map((service, index) => (

          <div
            key={index}
            className="border border-gray-100 bg-gray-50/50 p-6 rounded-xl hover:border-blue-500 hover:bg-white transition-all"
          >

            {/* Service Name */}
            <h3 className="text-lg font-semibold text-gray-900 text-blue-600">
              {service.name}
            </h3>

            {/* Service Description */}
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>

          </div>

        ))}
      </div>

    </div>
  );
}

// Export component so it can be used in other pages
export default BarangayAffairs;