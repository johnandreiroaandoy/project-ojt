import React from 'react';
import Button from '../components/Button.jsx'; // 1. Import your new component

function Contact() {
  // Prevent form refresh for now
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent to the City Accountant's Office!");
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* LEFT COLUMN: CONTACT INFO */}
        <div>
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have questions regarding city disbursements or financial records? 
            Visit our office or send us a message through the form. We aim to 
            respond to all inquiries within 24–48 business hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-center group">
              <span className="bg-blue-50 p-4 rounded-2xl text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                📍
              </span>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Office Location</p>
                <p className="text-sm font-bold text-[#002B5B]">2nd Floor, City Hall Building, Davao City</p>
              </div>
            </div>

            <div className="flex gap-4 items-center group">
              <span className="bg-blue-50 p-4 rounded-2xl text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                📞
              </span>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Phone Number</p>
                <p className="text-sm font-bold text-[#002B5B]">(082) 222-0888 loc. 234</p>
              </div>
            </div>

            <div className="flex gap-4 items-center group">
              <span className="bg-blue-50 p-4 rounded-2xl text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                ✉️
              </span>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-bold text-[#002B5B]">accountant@davaocity.gov.ph</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#f8f9fa] p-8 md:p-10 rounded-3xl border border-gray-100 shadow-2xl space-y-5"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Juan Dela Cruz" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Message</label>
            <textarea 
              placeholder="How can we help you?" 
              rows="4" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          {/* 2. Using your REUSABLE Button component here */}
          <div className="pt-2">
            <Button type="submit">
              Send Message
            </Button>
          </div>
          
          <p className="text-[10px] text-center text-gray-400 italic">
            By clicking send, you agree to our data privacy policy.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;