import React from 'react';

// Import decoupled text content exclusively for ELAP layout
import elapContent from '../../data/services_elap.json';

function EmergencyLoanAssistance() {
  // Destructure Citizen's Charter datasets directly from the updated JSON schema
  const { serviceDetails, requirements, processingSteps } = elapContent;

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto">
      
      {/* ==========================================================
          SECTION HEADER (DYNAMIC REGION FROM CITIZEN'S CHARTER)
      ========================================================== */}
      <div className="border-b-2 border-amber-600 pb-4 mb-6">
        <span className="text-3xl mb-2 block">{elapContent.iconHeader}</span>
        <h2 className="text-2xl font-black text-gray-900 uppercase leading-tight">
          {serviceDetails.name}
        </h2>
        <p className="text-gray-600 text-sm mt-2 italic">
          <strong>Purpose:</strong> {serviceDetails.purpose}
        </p>
      </div>

      {/* ==========================================================
          METADATA DIRECTORY MATRIX GRID
      ========================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-xs mb-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-amber-700 font-bold uppercase tracking-wider text-[10px]">Office / Division</span>
          <span className="font-semibold text-gray-700">{serviceDetails.office}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-amber-700 font-bold uppercase tracking-wider text-[10px]">Classification</span>
          <span className="font-semibold text-gray-700">{serviceDetails.classification}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-amber-700 font-bold uppercase tracking-wider text-[10px]">Type of Transaction</span>
          <span className="font-semibold text-gray-700">{serviceDetails.transactionType}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-amber-700 font-bold uppercase tracking-wider text-[10px]">Who May Avail</span>
          <span className="font-semibold text-gray-700">{serviceDetails.eligibleUsers}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* ==========================================================
            REQUIRED DOCUMENTATION CHECKLIST PANEL
        ========================================================== */}
        <div className="md:col-span-1 bg-amber-50/30 border border-amber-100 p-5 rounded-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-2">
            📋 Required Documents
          </h3>
          <ul className="space-y-3 text-xs text-gray-700">
            {requirements.map((item, idx) => (
              <li key={idx} className="leading-relaxed flex gap-2">
                <span className="text-amber-600 select-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ==========================================================
            KEY PROCESSING TIMELINE STEPS CARD TRACK
        ========================================================== */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              ⚙️ Key Processing Steps
            </h3>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              Total: {serviceDetails.totalProcessingTime}
            </span>
          </div>

          <div className="space-y-2.5">
            {processingSteps.map((node) => (
              <div 
                key={node.step} 
                className="flex items-center justify-between bg-white border border-gray-100 p-3.5 rounded-xl shadow-sm hover:border-amber-500 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  {/* Step counter circle indicator */}
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-black shrink-0 transition-colors duration-200 group-hover:bg-amber-600 group-hover:text-white">
                    {node.step}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {node.action}
                  </span>
                </div>
                {/* Duration layout badge */}
                <span className="text-[11px] font-bold text-amber-700 shrink-0 bg-amber-50/50 px-2.5 py-1 rounded-md border border-amber-100 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all">
                  {node.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default EmergencyLoanAssistance;