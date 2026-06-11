import React, { useState, useEffect } from 'react';

// Reports component
// This page retrieves report data from the PHP backend
// and displays downloadable transparency reports.
function Reports() {

  /* ==========================================================
     STATE VARIABLES
     Used to store data and track loading status
  ========================================================== */

  // Stores the list of reports received from the API
  const [reportCategories, setReportCategories] = useState([]);

  // Tracks whether data is still being loaded
  const [loading, setLoading] = useState(true);

  /* ==========================================================
     FETCH REPORTS FROM BACKEND
     Runs automatically when the component loads
  ========================================================== */
  useEffect(() => {

    // Request report data from the PHP MVC API
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports`)

      // Check if the server response is successful
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Convert JSON response into JavaScript object
        return response.json();
      })

      // Handle successful API response
      .then((payload) => {

        // If backend returns success status
        if (payload.status === 'success') {

          // Save report data into state
          setReportCategories(payload.data);
        }
      })

      // Handle errors such as API failure or network issues
      .catch((error) => {
        console.error('Error fetching transparency reports:', error);
      })

      // Runs whether request succeeds or fails
      .finally(() => {

        // Stop loading animation/message
        setLoading(false);
      });

  }, []); // Empty dependency array = runs only once on page load

  return (

    /* ==========================================================
       MAIN REPORTS SECTION
    ========================================================== */
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">

      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-12">

          {/* Main Title */}
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter">
            Transparency Reports
          </h2>

          {/* Description */}
          <p className="text-gray-500 mt-2 font-medium">
            Downloadable financial documents and city audit records.
          </p>

        </div>

        {/* ==========================================================
            CONDITIONAL RENDERING
            Shows different content depending on the state
        ========================================================== */}

        {loading ? (

          /* ------------------------------------------------------
             LOADING STATE
             Displayed while data is being fetched
          ------------------------------------------------------ */
          <div className="text-center py-10 font-medium border border-blue-500 text-gray-400 animate-pulse">
            Fetching secure document streams from City Accountant Engine...
          </div>

        ) : reportCategories.length === 0 ? (

          /* ------------------------------------------------------
             ERROR / NO DATA STATE
             Displayed when no reports are returned
          ------------------------------------------------------ */
          <div className="text-center py-10 font-bold text-red-500">
            Could not load reports. Please check if your XAMPP Apache module is operational.
          </div>

        ) : (

          /* ------------------------------------------------------
             REPORTS GRID
             Display all available reports
          ------------------------------------------------------ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Loop through each report and create a report card */}
            {reportCategories.map((report, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-blue-400 shadow-xl flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-gray-600 group"
              >

                {/* ==================================================
                    REPORT INFORMATION
                ================================================== */}
                <div>

                  {/* Icon + Report Details */}
                  <div className="flex items-start gap-4 mb-6">

                    {/* PDF Icon */}
                    <div className="text-3xl bg-gray-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 inline-block shrink-0">
                      📄
                    </div>

                    {/* Report Information */}
                    <div>

                      {/* Report Title */}
                      <h4 className="text-[#002B5B] font-bold text-base line-clamp-2 transition-colors duration-300 group-hover:text-blue-700">
                        {report.title}
                      </h4>

                      {/* Report Metadata */}
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">
                        Year: {report.year} • {report.size}
                      </p>

                    </div>
                  </div>
                </div>

                {/* ==================================================
                    DOWNLOAD BUTTON
                ================================================== */}
                <div className="mt-4">

                  <a
                    // Create complete file URL using Vite environment variable
                    href={`${import.meta.env.VITE_API_BASE_URL}${report.href}`}

                    // Download attribute tells browser to download the file
                    download

                    // Open file in a new browser tab
                    target="_blank"

                    // Security best practice when using target="_blank"
                    rel="noopener noreferrer"

                    className="w-full text-center block bg-blue-50/50 text-[#002B5B] border border-blue-100 py-2.5 px-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] shadow-sm"
                  >
                    Download PDF
                  </a>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

// Export component so it can be used in App.jsx or Routes
export default Reports;