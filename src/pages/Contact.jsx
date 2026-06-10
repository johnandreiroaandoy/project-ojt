import React, { useState } from 'react';
import Button from '../components/Button.jsx';

function Contact() {
  // 1. React States to track form inputs dynamically
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Form submission handler that talks to your PHP Backend API smoothly
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = { name, email, message };

    try {
      // Send data to your custom PHP framework endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Safely read the JSON payload (whether it's a 200 Success, 400 Bad Request, or 429 Rate Limit)
      const data = await response.json();

      // Check if the backend returned an error HTTP status
      if (!response.ok) {
        // This prints your custom PHP rate-limiting message: "Too many submissions!..."
        alert(data.message || 'Submission Error.');
        return;
      }

      // Handle completely successful database entries
      if (data.status === 'success') {
        alert(data.message);
        
        // Clear inputs on success execution
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Submission Error: ' + data.message);
      }

    } catch (error) {
      // Triggers ONLY if Apache is completely turned off or network breaks entirely
      console.error('Error submitting form to PHP backend:', error);
      alert('Could not reach the server. Please check if XAMPP Apache is running.');
    } finally {
      setIsSubmitting(false);
    }
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
          
          <div className="flex flex-col gap-4 max-w-md w-full">
  
            {/* Capsule Card 1: Office Location */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">
              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                <img 
                  src="/icons/location.png" 
                  alt="Location" 
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <span className="text-xl hidden">📍</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Office Location</p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5 fallback-wrap">
                  3rd Floor, City Hall Building, Davao City
                </p>
              </div>
            </div>

            {/* Capsule Card 2: Phone Number */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">
              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                <img 
                  src="/icons/phone.png" 
                  alt="Phone" 
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <span className="text-xl hidden">📞</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Phone Number</p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5">
                  (082) 222-0888 loc. 234
                </p>
              </div>
            </div>

            {/* Capsule Card 3: Email Address */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">
              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                <img 
                  src="/icons/email.png" 
                  alt="Email" 
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <span className="text-xl hidden">✉️</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Email Address</p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5">
                  accountant@davaocity.gov.ph
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#f8f9fa] p-8 md:p-10 rounded-3xl border border-blue-800 shadow-2xl space-y-5"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Email Address</label>
            <input 
              type="type" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?" 
              rows="4" 
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Request...' : 'Send Message'}
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