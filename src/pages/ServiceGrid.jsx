import React, { useState, useEffect } from 'react';

/* ==========================================================
    COMPONENT IMPORT MATRIX (Matches file system exactly)
========================================================== */
import CertificationOfPayslip from './service/Certification_of_Payslip.jsx';
import CertificateOfRemittances from './service/Certificate_of_Remittances.jsx';
import PhotocopyOfDisbursement from './service/Photocopy_of_Disbursement.jsx';
import CertificationOnSalaryReceived from './service/Certification_on_Salary_Received.jsx';
import EmergencyLoanAssistance from './service/Emergency_Loan_Assistance.jsx';

function ServiceGrid() {
  /* ==========================================================
      STATE VARIABLES
  ========================================================== */
  const [activeView, setActiveView] = useState(null);
  
  // Holds the server directory UI configuration and a latency tracker
  const [directoryData, setDirectoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Grab the centralized environment base API URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* ==========================================================
      FETCH THE DIRECTORY LAYOUT CONFIGURATION FROM XAMPP
      (Includes dynamic cache-busting timestamp string)
  ========================================================== */
  useEffect(() => {
    // 🟢 FIXED: Swapped static directory string for dynamic baseUrl integration
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
      🎯 CRITICAL: Ensure the "id" properties inside your 
      services_directory.json cards array match these strings exactly!
  ========================================================== */
  const renderSelectedComponent = () => {
    switch (activeView) {
      case 'Certification of Payslip':
        return <CertificationOfPayslip />;
      case 'Certificate of Remittances':
        return <CertificateOfRemittances />;
      case 'Photocopy of Disbursement':
        return <PhotocopyOfDisbursement />;
      case 'Certification on Salary Received':
        return <CertificationOnSalaryReceived />;
      case 'elap': // Fallback string token for Emergency Loan Assistance layout
      case 'Emergency Loan Assistance': 
        return <EmergencyLoanAssistance />;
      default:
        return (
          <div className="text-center py-6 text-xs text-gray-400 font-medium">
            ⚠️ View mapping error: Selected route "{activeView}" matches no structural component target.
          </div>
        );
    }
  };

  /* ==========================================================
      GUARD LAYOUT RENDER STAGES
  ========================================================== */
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
        <br />
        <span className="text-xs font-normal text-red-600 block mt-2">
          Verify that your configuration json asset is placed inside: <code className="font-mono bg-red-100/50 px-1 py-0.5 rounded">C:\xampp\htdocs\backend-project-ojt\public\data\services_directory.json</code>
        </span>
      </div>
    );
  }

  return (
    <section
      id="services-section"
      className="bg-gray-50/50 py-16 px-4 md:px-12 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* CONDITION 1: IF DETAILED SUB-VIEW COMPONENT IS ACTIVE */}
        {activeView ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-300">
            
            {/* Back button to drop state back to primary dashboard matrix view */}
            <div className="mb-8">
              <button
                onClick={() => setActiveView(null)}
                className="text-xs font-bold text-blue-600 hover:text-[#002B5B] uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                {directoryData.controls?.backButton || "← Return to Directory"}
              </button>
            </div>

            {/* Display selected decoupled sub-page tree node component */}
            <div>
              {renderSelectedComponent()}
            </div>

          </div>
        ) : (

          /* CONDITION 2: MAIN DIRECTORY GRID OVERVIEW */
          <>
            {/* COMPONENT TITLE ROW EXTRACTED FROM METADATA JSON */}
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
              {directoryData.cards?.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
                >
                  <div>
                    {/* Icon wrapper reading parameters dynamically */}
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {service.icon || "📂"}
                    </div>

                    {/* Card content title reading from JSON */}
                    <h3 className="text-[#002B5B] font-bold text-base mb-2 transition-colors duration-300 group-hover:text-blue-700">
                      {service.title}
                    </h3>

                    {/* Brief utility role description mapping */}
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                      {service.desc || "Processing transaction requests under city auditor service structures."}
                    </p>
                  </div>

                  {/* ACTION INTERFACE ANCHOR SELECTION BUTTON */}
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