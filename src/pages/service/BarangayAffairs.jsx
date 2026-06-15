import React from 'react';

// Decoupled Structural Content Mapping Source
// Uses "../../" to exit pages/service/ and resolve the root src/data directory
import serviceExtended from '../../data/services_extended.json';

function BarangayAffairs() {
  // Extract only the barangay data context block
  const content = serviceExtended.barangay;

  return (
    <div>

      {/* ==========================================================
          SECTION HEADER (DYNAMIC CONTENT REGION)
      ========================================================== */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        
        {/* Section Title reading emoji and header strings dynamically */}
        <h2 className="text-3xl font-bold text-gray-900">
          {content.iconHeader} {content.title}
        </h2>

        {/* Dynamic Section Subtitle Description */}
        <p className="text-gray-500 mt-2 text-lg">
          {content.subtitle}
        </p>

      </div>

      {/* ==========================================================
          DECOUPLED CARD GRID MATRIX
      ========================================================== */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Stream isolated arrays seamlessly via standard map iterators */}
        {content.servicesList.map((service, index) => (
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

export default BarangayAffairs;