import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // 🟢 Grab protected administrative credentials from environment variables
    const secureEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const securePassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    // Check input against env variables
    if (credentials.email === secureEmail && credentials.password === securePassword) {
      
      // 🚀 FIXED: Set 'adminToken' to align perfectly with your ProtectedRoute guard rules
      localStorage.setItem('adminToken', 'authenticated_admin_session_token_proxy'); 
      
      toast.success("✨ Welcome back, Administrator!");
      navigate('/admin'); 
    } else {
      toast.error("✗ Access Denied: Invalid security credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <h2 className="text-xl font-black text-[#002B5B] uppercase tracking-wider mb-6">Secure Portal Access</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
          <input 
            type="email" 
            value={credentials.email}
            onChange={e => setCredentials({...credentials, email: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none mt-1 text-sm font-semibold" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Password Identification</label>
          <input 
            type="password" 
            value={credentials.password}
            onChange={e => setCredentials({...credentials, password: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none mt-1 text-sm font-semibold" 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-[#002B5B] text-white py-3 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer">
          Authorize Session
        </button>
      </form>
    </div>
  );
}

export default Login;