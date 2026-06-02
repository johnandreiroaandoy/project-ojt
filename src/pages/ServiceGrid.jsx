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
      className="bg-white py-16 px-4 md:px-12 border-b border-gray-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Blue Accent matching the Hero */}
        <div className="mb-12 border-l-4 border-[#002B5B] pl-6">
          <h2 className="text-[#002B5B] text-2xl font-black uppercase tracking-tight">Core Services</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Davao City Accountant's Office Strategic Functions</p>
        </div>

        {/* Horizontal Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-100">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 group hover:bg-blue-50/50 transition-all duration-300 first:pl-0 last:pr-0"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {service.icon}
              </div>
              <h3 className="text-[#002B5B] font-bold text-base mb-2 group-hover:text-blue-700">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                {service.desc}
              </p>
              
              <div className="mt-6 overflow-hidden">
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More 
                  <span className="text-lg">→</span>
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