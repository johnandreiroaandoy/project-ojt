import React, { useState, useEffect } from 'react';

/* ==========================================================
    COMPONENT IMPORT MATRIX (Matches file system exactly)
========================================================== */
import CertificationOfPayslip from './service/Certification_of_Payslip.jsx';
import CertificateOfRemittances from './service/Certificate_of_Remittances.jsx';
import PhotocopyOfDisbursement from './service/Photocopy_of_Disbursement.jsx';
import CertificationOnSalaryReceived from './service/Certification_on_Salary_Received.jsx';
import EmergencyLoanAssistance from './service/Emergency_Loan_Assistance.jsx';

// 🚀 NEW IMPORT: Reusable viewer handling all custom additions dynamically
import GenericServiceViewer from './service/GenericServiceViewer.jsx';

function ServiceGrid() {
  /* ==========================================================
      STATE VARIABLES
  ========================================================== */
  const [activeView, setActiveView] = useState(null);
  const [directoryData, setDirectoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
      FETCH THE DIRECTORY LAYOUT CONFIGURATION FROM XAMPP
  ========================================================== */
  useEffect(() => {
    fetch(`${baseUrl}/data/services_directory.json?v=${new Date().getTime()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Directory configuration missing on server. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDirectoryData(data);
      })
      .catch((error) => {
        console.error('Error fetching external services directory:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseUrl]);

  /* ==========================================================
      COMPONENT SWITCHER
  ========================================================== */
  const renderSelectedComponent = () => {
    const normalizedView = activeView ? activeView.trim() : '';

    switch (normalizedView) {
      case 'Certification of Payslip':
        return <CertificationOfPayslip />;
      case 'Certificate of Remittances':
        return <CertificateOfRemittances />;
      case 'Photocopy of Disbursement':
        return <PhotocopyOfDisbursement />;
      case 'Certification on Salary Received':
        return <CertificationOnSalaryReceived />;
      case 'elap': 
      case 'Emergency Loan Assistance': 
        return <EmergencyLoanAssistance />;

      // 🛠️ THE FIX: Render any newly added core services (like "TRIAL") dynamically!
      default:
        const safeJsonFilename = `services_${normalizedView.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
        return (
          <GenericServiceViewer 
            serviceId={normalizedView} 
            baseUrl={baseUrl} 
            targetFile={safeJsonFilename} 
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm font-semibold animate-pulse">
        🔄 Accessing server infrastructure and loading main directory layouts...
      </div>
    );
  }

  if (!directoryData) {
    return (
      <div className="max-w-5xl mx-auto my-10 p-4 bg-red-50 text-red-800 rounded-xl text-sm font-medium border border-red-200">
        ⚠️ Infrastructure Error: Unable to fetch external services directory parameters from local server.
      </div>
    );
  }

  return (
    <section id="services-section" className="bg-gray-50/50 py-16 px-4 md:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto w-full">

        {activeView ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-300">
            <div className="mb-8">
              <button
                onClick={() => setActiveView(null)}
                className="text-xs font-bold text-blue-600 hover:text-[#002B5B] uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                {directoryData.controls?.backButton || "← Return to Directory"}
              </button>
            </div>
            <div>{renderSelectedComponent()}</div>
          </div>
        ) : (
          <>
            <div className="mb-12 border-l-4 border-[#002B5B] pl-6">
              <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tight">
                {directoryData.header?.title || "Citizen's Charter Directory"}
              </h2>
              <p className="text-gray-500 text-sm font-medium mt-1">
                {directoryData.header?.subtitle || "Select an operational service node below to track required documentation paths."}
              </p>
            </div>

            {/* INTERACTIVE COMPONENT CARD MENU GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(directoryData.cards || [])
                .filter((service) => service.status !== 'disabled')
                .map((service, index) => (
                  <div
                    key={service.id || index}
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
                  >
                    <div>
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {service.icon || "📂"}
                      </div>
                      <h3 className="text-[#002B5B] font-bold text-base mb-2 transition-colors duration-300 group-hover:text-blue-700">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed font-medium">
                        {service.desc || "Processing transaction requests under city auditor service structures."}
                      </p>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => setActiveView(service.id)}
                        className="w-full text-center text-[11px] font-bold text-blue-600 uppercase tracking-wider py-2.5 px-4 rounded-full border border-blue-200 bg-blue-50/30 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm cursor-pointer"
                      >
                        {directoryData.controls?.actionButton || "View Requirements →"}
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