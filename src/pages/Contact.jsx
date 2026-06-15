import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import toast from 'react-hot-toast'; // Library used for popup notifications

// Decoupled Structural Content Mapping Source
import contactStatic from '../data/contact_content.json';

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
    setIsSubmitting(true); // Disable the submit button while processing

    // Collect form data into one object
    const formData = { name, email, message };

    try {
      // Send form data to the backend API
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          key: 'contact_submit_payload',
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
      // Runs when the server cannot be reached (e.g., Apache/XAMPP stopped)
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
          {/* Section Title read dynamically from JSON */}
          <h2 className="text-[#002B5B] text-4xl font-black uppercase tracking-tighter mb-6">
            {contactStatic.title}
          </h2>

          {/* Description read dynamically from JSON */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {contactStatic.description}
          </p>

          {/* Contact information cards mapped systematically from JSON */}
          <div className="flex flex-col gap-4 max-w-md w-full">
            {contactStatic.infoCards.map((card) => (
              <div key={card.id} className="bg-white py-4 px-8 rounded-full border border-gray-100 shadow-sm flex items-center gap-5 transition-all duration-300 ease-in-out hover:translate-x-2 hover:shadow-md hover:border-blue-100 hover:bg-blue-50/20 group">
                
                {/* Icon Container */}
                <div className="bg-blue-50 p-3.5 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-blue-600">
                  <img
                    src={card.iconSrc}
                    alt={card.label}
                    className="h-5 w-5 object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-xl hidden">{card.fallbackEmoji}</span>
                </div>

                {/* Details Container */}
                <div>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                    {card.label}
                  </p>
                  <p className="text-xs font-bold text-[#002B5B] mt-0.5 fallback-wrap">
                    {card.value}
                  </p>
                </div>

              </div>
            ))}
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
              {contactStatic.formLabels.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={contactStatic.formLabels.namePlaceholder}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              {contactStatic.formLabels.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={contactStatic.formLabels.emailPlaceholder}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Message Text Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
              {contactStatic.formLabels.message}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={contactStatic.formLabels.messagePlaceholder}
              rows="4"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? contactStatic.formLabels.btnSending : contactStatic.formLabels.btnDefault}
            </Button>
          </div>

          {/* Privacy Notice */}
          <p className="text-[10px] text-center text-gray-400 italic">
            {contactStatic.privacyNotice}
          </p>
        </form>

      </div>
    </section>
  );
}

export default Contact;