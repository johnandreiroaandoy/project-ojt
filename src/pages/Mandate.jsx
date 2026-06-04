import React from 'react';

function Mandate() {
  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 border-l-8 border-[#002B5B] pl-8">
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter leading-none">
            Legal Mandate & <br />
            <span className="text-blue-600">Core Mission</span>
          </h2>
          <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-sm">
            Pursuant to the Local Government Code of 1991
          </p>
        </div>

       <div className="grid lg:grid-cols-2 gap-16">
  {/* Left Column: The Mandate & General Powers */}
  <div className="space-y-8">
    {/* Card 1: The Mandate */}
    <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <h3 className="text-[#002B5B] font-black text-xl mb-4 uppercase">The Mandate</h3>
      <p className="text-gray-600 leading-relaxed italic">
        "The accountant shall take charge of both the accounting and internal audit services 
        of the local government unit concerned and shall install and maintain an internal 
        audit system in the local government unit..."
      </p>
      <p className="text-sm text-blue-600 font-bold mt-4">— Section 474, Republic Act No. 7160</p>
    </div>
  
    {/* Card 2: General Powers */}
    <div className="bg-gray-50 p-8 rounded-2xl border border-blue-800 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <h3 className="text-[#002B5B] font-black text-xl uppercase mb-4">General Powers</h3>
      <ul className="space-y-4">
        {[
          "Prepare and submit financial statements to the governor or mayor.",
          "Apprise the sanggunian and other local government officials on the financial condition and operations of the LGU.",
          "Certify to the availability of budgetary allotment to which expenditures and obligations may be properly charged.",
          "Review supporting documents before preparation of vouchers to determine completeness of requirements."
        ].map((item, index) => (
          <li key={index} className="flex gap-4 items-start">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mt-1">
              {index + 1}
            </span>
            <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Right Column: Vision & Mission Cards */}
  <div className="flex flex-col gap-8">
    {/* Card 3: Our Vision */}
    <div className="bg-[#002B5B] text-white p-11 rounded-2xl shadow-md relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
       <div className="relative z-10">
         <h3 className="text-blue-400 font-black text-2xl uppercase mb-4">Our Vision</h3>
         <p className="text-lg leading-relaxed opacity-90">
           To be a model of excellence in local government financial management, 
           driven by integrity, transparency, and technological innovation.
         </p>
       </div>
       <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
    </div>

    {/* Card 4: Our Mission */}
    <div className="bg-blue-50 border border-blue-800 p-11 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <h3 className="text-blue-700 font-black text-2xl uppercase mb-4">Our Mission</h3>
      <p className="text-gray-700 leading-relaxed">
        To provide accurate and timely financial information, ensure the 
        effective protection of city assets through rigorous internal audit, 
        and uphold the highest standards of fiscal accountability.
      </p>
    </div>
  </div>
</div>
</div>
    </section>
  );
}

export default Mandate;