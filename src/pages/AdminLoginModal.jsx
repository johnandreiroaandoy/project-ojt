import React, { useState } from 'react';

function AdminLoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Authentication Request:", { username, password });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Fallback Backdrop Layer (No custom animation classes needed) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Fallback Login Shell (Uses standard translate transitions instead of custom slideUp) */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-gray-100 z-10 flex flex-col transition-all duration-300 transform scale-100">
        
        {/* Close Button Cross Icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-lg p-1"
        >
          ✕
        </button>

        {/* Brand/Security Header */}
        <div className="text-center mb-6">
          <span className="text-3xl bg-blue-50 p-3 rounded-full inline-block mb-3">🔒</span>
          <h3 className="text-[#002B5B] text-xl font-black uppercase tracking-tight">Administrative Control Portal</h3>
          <p className="text-gray-400 text-xs font-semibold mt-1">Authorized Davao City Personnel Access Only</p>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Account Username
            </label>
            <input 
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. city_accountant_01"
              className="w-full text-xs font-medium border border-gray-200 focus:border-[#002B5B] bg-gray-50/50 p-3.5 rounded-xl outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Secure Security Password
            </label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs font-medium border border-gray-200 focus:border-[#002B5B] bg-gray-50/50 p-3.5 rounded-xl outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full text-center text-xs font-black uppercase tracking-wider text-white bg-[#002B5B] hover:bg-[#003d82] py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-900/10 cursor-pointer"
            >
              Sign In and Verify Credentials
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-[10px] font-bold text-gray-400 border-t border-gray-100 pt-4">
          Protected by standard server security environment layers.
        </div>
      </div>
    </div>
  );
}

export default AdminLoginModal;