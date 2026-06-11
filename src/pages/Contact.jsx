import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import toast from 'react-hot-toast'; // Library used for popup notifications

function Contact() {

  // Store the values entered by the user in the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Tracks whether the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function that runs when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Disable the submit button while processing
    setIsSubmitting(true);

    // Collect form data into one object
    const formData = { name, email, message };

    try {
      // Send form data to the backend API
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      // Convert the response into JSON format
      const data = await response.json();

      // Handle HTTP errors returned by the backend
      if (!response.ok) {

        // Too many requests from the same user
        if (response.status === 429) {
          toast.error(data.message || 'Too many attempts.', {
            icon: '⏳',
            style: {
              border: '1px solid #F59E0B',
              background: '#FFFBEB',
              color: '#92400E'
            }
          });
        } else {

          // Validation or other server-side errors
          toast.error(data.message || 'Submission Error.', {
            style: {
              border: '1px solid #EF4444',
              background: '#FEF2F2',
              color: '#991B1B'
            }
          });
        }

        return;
      }

      // If the backend successfully saved the inquiry
      if (data.status === 'success') {

        // Show success notification
        toast.success(data.message, {
          icon: '✨',
          style: {
            border: '1px solid #10B981',
            background: '#ECFDF5',
            color: '#065F46'
          }
        });

        // Clear all input fields after successful submission
        setName('');
        setEmail('');
        setMessage('');

      } else {

        // Handle backend errors that are not HTTP errors
        toast.error('Submission Error: ' + data.message, {
          style: {
            border: '1px solid #EF4444',
            background: '#FEF2F2',
            color: '#991B1B'
          }
        });
      }

    } catch (error) {

      // Runs when the server cannot be reached
      // Example: Apache/XAMPP is stopped or internet connection is lost
      console.error('Error submitting form to PHP backend:', error);

      toast.error(
        'Could not reach the server. Please check if XAMPP Apache is running.',
        {
          style: {
            border: '1px solid #EF4444',
            background: '#FEF2F2',
            color: '#991B1B'
          }
        }
      );

    } finally {

      // Re-enable the submit button whether success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* ================= LEFT SIDE: CONTACT INFORMATION ================= */}
        <div>

          {/* Section Title */}
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter mb-6">
            Contact Us
          </h2>

          {/* Brief description for visitors */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have questions regarding city disbursements or financial records?
            Visit our office or send us a message through the form. We aim to
            respond to all inquiries within 24–48 business hours.
          </p>

          {/* Contact information cards */}
          <div className="flex flex-col gap-4 max-w-md w-full">

            {/* Office Location Card */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">

              {/* Icon Container */}
              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">

                {/* Location Icon */}
                <img
                  src="/icons/location.png"
                  alt="Location"
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"

                  // If image fails to load, show emoji instead
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />

                <span className="text-xl hidden">📍</span>
              </div>

              {/* Location Details */}
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                  Office Location
                </p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5 fallback-wrap">
                  3rd Floor, City Hall Building, Davao City
                </p>
              </div>
            </div>

            {/* Phone Number Card */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">

              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                <img
                  src="/icons/phone.png"
                  alt="Phone"
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-xl hidden">📞</span>
              </div>

              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                  Phone Number
                </p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5">
                  (082) 222-0888 loc. 234
                </p>
              </div>
            </div>

            {/* Email Address Card */}
            <div className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">

              <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                <img
                  src="/icons/email.png"
                  alt="Email"
                  className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-xl hidden">✉️</span>
              </div>

              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                  Email Address
                </p>
                <p className="text-xs font-bold text-[#002B5B] mt-0.5">
                  accountant@davaocity.gov.ph
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE: CONTACT FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#f8f9fa] p-8 md:p-10 rounded-3xl border border-blue-800 shadow-2xl space-y-5"
        >

          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Message Text Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              rows="4"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Request...' : 'Send Message'}
            </Button>
          </div>

          {/* Privacy Notice */}
          <p className="text-[10px] text-center text-gray-400 italic">
            By clicking send, you agree to our data privacy policy.
          </p>

        </form>
      </div>
    </section>
  );
}

export default Contact;