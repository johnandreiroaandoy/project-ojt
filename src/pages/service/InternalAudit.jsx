import React from 'react';

// Decoupled Structural Content Mapping Source
// Uses "../../" to exit service/ and pages/ folders to resolve your data directory
import auditContent from '../../data/services_internal.json';

function InternalAudit() {
  return (
    <div>

      {/* ==========================================================
          SECTION HEADER (DECOUPLED FROM DEDICATED FILE)
      ========================================================== */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        
        {/* Dynamic header rendering utilizing dedicated JSON state keys */}
        <h2 className="text-3xl font-bold text-gray-900">
          {auditContent.iconHeader} {auditContent.title}
        </h2>

        {/* Dynamic section description metadata */}
        <p className="text-gray-500 mt-2 text-lg">
          {auditContent.subtitle}
        </p>

      </div>

      {/* ==========================================================
          AUDIT OPERATIONS GRID MATRIX
      ========================================================== */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Automatically looping through localized services_internal dataset */}
        {auditContent.servicesList.map((service, index) => (
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

export default InternalAudit;