import React from 'react';

// Decoupled Structural Content Mapping Source
// Uses "../../" to step out of service/ and pages/ to reach your data directory
import financialContent from '../../data/services_financial.json';

function FinancialReporting() {
  return (
    <div>

      {/* ==========================================================
          SECTION HEADER (DECOUPLED FROM DEDICATED FILE)
      ========================================================== */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        
        {/* Dynamic header title and icon rendering */}
        <h2 className="text-3xl font-bold text-gray-900">
          {financialContent.iconHeader} {financialContent.title}
        </h2>

        {/* Dynamic section subtitle */}
        <p className="text-gray-500 mt-2 text-lg">
          {financialContent.subtitle}
        </p>

      </div>

      {/* ==========================================================
          SERVICE CHECKLIST GRID MATRIX
      ========================================================== */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Iterating exclusively through the services_financial array */}
        {financialContent.servicesList.map((service, index) => (
          <div
            key={index}
            className="border border-gray-100 bg-gray-50/50 p-6 rounded-xl hover:border-blue-500 hover:bg-white transition-all"
          >
            {/* Service Name Parameter */}
            <h3 className="text-lg font-semibold text-blue-600">
              {service.name}
            </h3>

            {/* Service Body Description Text */}
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FinancialReporting;