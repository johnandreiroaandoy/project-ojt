// React import removed (not required with the new JSX transform)

function ServiceGrid() {
  const services = [
    { title: "Financial Reporting", desc: "Preparation of annual and quarterly financial statements.", icon: "📊" },
    { title: "Internal Audit", desc: "Examination of city transactions and control systems.", icon: "🔍" },
    { title: "Processing of Claims", desc: "Review and processing of disbursements and payroll.", icon: "💳" },
    { title: "Barangay Affairs", desc: "Technical assistance for barangay financial management.", icon: "🏘️" },
  ];

  return (
    /* 1. Added id="services-section" to match your Header link */
    /* 2. Added scroll-mt-24 so the header doesn't cover the title when jumping */
    <section 
      id="services-section" 
      className="bg-gray-50/50 py-16 px-4 md:px-12 border-b border-gray-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Blue Accent matching the Hero */}
        <div className="mb-12 border-l-4 border-[#002B5B] pl-6">
          <h2 className="text-[#002B5B] text-2xl font-black uppercase tracking-tight">Core Services</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Davao City Accountant's Office Strategic Functions</p>
        </div>

        {/* 4-Column Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-blue-100"
            >
              <div>
                {/* Icon wrapper */}
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-[#002B5B] font-bold text-base mb-2 transition-colors duration-300 group-hover:text-blue-700">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
              
              {/* Capsule Button Container */}
              <div className="mt-8">
                <button className="w-full text-center text-[11px] font-bold text-blue-600 uppercase tracking-wider py-2.5 px-4 rounded-full border border-blue-200 bg-blue-50/30 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceGrid;