import React, { useState } from 'react';
// Import your sub-services components directly
import FinancialReporting from './service/FinancialReporting.jsx';
import InternalAudit from './service/InternalAudit.jsx';
import ProcessingClaims from './service/ProcessingClaims.jsx';
import BarangayAffairs from './service/BarangayAffairs.jsx';

function ServiceGrid() {
  // Local state to manage which view to display
  // null = Show the main core services list grid
  const [activeView, setActiveView] = useState(null);

  const services = [
    { id: 'financial', title: "Financial Reporting", desc: "Preparation of annual and quarterly financial statements.", icon: "📊" },
    { id: 'audit', title: "Internal Audit", desc: "Examination of city transactions and control systems.", icon: "🔍" },
    { id: 'claims', title: "Processing of Claims", desc: "Review and processing of disbursements and payroll.", icon: "💳" },
    { id: 'barangay', title: "Barangay Affairs", desc: "Technical assistance for barangay financial management.", icon: "🏘️" },
  ];

  // Helper switcher to figure out which component view to load
  const renderSelectedComponent = () => {
    switch (activeView) {
      case 'financial': return <FinancialReporting />;
      case 'audit': return <InternalAudit />;
      case 'claims': return <ProcessingClaims />;
      case 'barangay': return <BarangayAffairs />;
      default: return null;
    }
  };

  return (
    <section 
      id="services-section" 
      className="bg-gray-50/50 py-16 px-4 md:px-12 border-b border-gray-100 "
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* CONDITION 1: A subpage is active -> Hide the grid, show the target JSX file content directly */}
        {activeView ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-300">
            {/* Direct Back to Directory Controller Text Link */}
            <div className="mb-8">
              <button 
                onClick={() => setActiveView(null)}
                className="text-xs font-bold text-blue-600 hover:text-[#002B5B] uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                ← Back to Core Services List
              </button>
            </div>
            
            {/* Injected Content Area */}
            <div>
              {renderSelectedComponent()}
            </div>
          </div>
        ) : (
          
          /* CONDITION 2: No active subpage view -> Render the standard default directory dashboard grid */
          <>
            {/* Header section with blue accent line */}
            <div className="mb-12 border-l-4 border-[#002B5B] pl-6">
              <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tight">Core Services</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Davao City Accountant's Office Strategic Functions</p>
            </div>

            {/* 4-Column Directory Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
                >
                  <div>
                    {/* Icon display */}
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {service.icon}
                    </div>
                    
                    {/* Component Title Header */}
                    <h3 className="text-[#002B5B] font-bold text-base mb-2 transition-colors duration-300 group-hover:text-blue-700">
                      {service.title}
                    </h3>
                    
                    {/* Component Summary Description */}
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Action Link acting like an href target */}
                  <div className="mt-8">
                    <button 
                      onClick={() => setActiveView(service.id)}
                      className="w-full text-center text-[11px] font-bold text-blue-600 uppercase tracking-wider py-2.5 px-4 rounded-full border border-blue-200 bg-blue-50/30 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default ServiceGrid;