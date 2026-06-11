import React from 'react';

// Mandate component
// This page displays the legal basis, powers,
// vision, and mission of the City Accountant's Office.
function Mandate() {
  return (
    
    // Main section container
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto">

        {/* ==========================================================
            SECTION HEADER
            Displays the title and legal reference
        ========================================================== */}
        <div className="mb-16 border-l-8 border-[#002B5B] pl-8">

          {/* Main page title */}
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter leading-none">
            Legal Mandate & <br />
            <span className="text-blue-600">Core Mission</span>
          </h2>

          {/* Subtitle / Legal Reference */}
          <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-sm">
            Pursuant to the Local Government Code of 1991
          </p>
        </div>

        {/* ==========================================================
            TWO-COLUMN LAYOUT
            Left Side  : Mandate & General Powers
            Right Side : Vision & Mission
        ========================================================== */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* ==========================================================
              LEFT COLUMN
              Contains Mandate and General Powers
          ========================================================== */}
          <div className="space-y-8">

            {/* ------------------------------------------------------
                CARD 1: LEGAL MANDATE
                Shows the legal responsibility of the accountant
            ------------------------------------------------------ */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">

              {/* Card Title */}
              <h3 className="text-[#002B5B] font-black text-xl mb-4 uppercase">
                The Mandate
              </h3>

              {/* Legal quotation from Republic Act No. 7160 */}
              <p className="text-gray-600 leading-relaxed italic">
                "The accountant shall take charge of both the accounting and internal audit services
                of the local government unit concerned and shall install and maintain an internal
                audit system in the local government unit..."
              </p>

              {/* Legal citation */}
              <p className="text-sm text-blue-600 font-bold mt-4">
                — Section 474, Republic Act No. 7160
              </p>
            </div>

            {/* ------------------------------------------------------
                CARD 2: GENERAL POWERS
                Lists the major duties and responsibilities
            ------------------------------------------------------ */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">

              {/* Card Title */}
              <h3 className="text-[#002B5B] font-black text-xl uppercase mb-4">
                General Powers
              </h3>

              {/* List of responsibilities */}
              <ul className="space-y-4">

                {/* Array of powers automatically rendered using map() */}
                {[
                  "Prepare and submit financial statements to the governor or mayor.",
                  "Apprise the sanggunian and other local government officials on the financial condition and operations of the LGU.",
                  "Certify to the availability of budgetary allotment to which expenditures and obligations may be properly charged.",
                  "Review supporting documents before preparation of vouchers to determine completeness of requirements."
                ].map((item, index) => (

                  // Each responsibility is displayed as a numbered item
                  <li key={index} className="flex gap-4 items-start">

                    {/* Number badge */}
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mt-1">
                      {index + 1}
                    </span>

                    {/* Responsibility description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item}
                    </p>

                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ==========================================================
              RIGHT COLUMN
              Contains Vision and Mission Statements
          ========================================================== */}
          <div className="flex flex-col gap-8">

            {/* ------------------------------------------------------
                CARD 3: VISION
                Describes the future goal of the office
            ------------------------------------------------------ */}
            <div className="bg-[#002B5B] text-white p-11 rounded-2xl shadow-md relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">

              {/* Content Layer */}
              <div className="relative z-10">

                {/* Vision Title */}
                <h3 className="text-blue-400 font-black text-2xl uppercase mb-4">
                  Our Vision
                </h3>

                {/* Vision Statement */}
                <p className="text-lg leading-relaxed opacity-90">
                  To be a model of excellence in local government financial management,
                  driven by integrity, transparency, and technological innovation.
                </p>
              </div>

              {/* Decorative background circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            </div>

            {/* ------------------------------------------------------
                CARD 4: MISSION
                Describes the purpose and daily commitment
                of the office
            ------------------------------------------------------ */}
            <div className="bg-blue-50 border border-blue-800 p-11 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">

              {/* Mission Title */}
              <h3 className="text-blue-700 font-black text-2xl uppercase mb-4">
                Our Mission
              </h3>

              {/* Mission Statement */}
              <p className="text-gray-700 leading-relaxed">
                To provide accurate and timely financial information,
                ensure the effective protection of city assets through rigorous internal audit,
                and uphold the highest standards of fiscal accountability.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Export the component so it can be imported into routes or pages
export default Mandate;