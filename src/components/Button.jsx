import React from 'react';

// Using 'props' allows you to reuse this button for different texts and actions
function Button({ children, onClick, type = "button" }) {
    return (
        <button 
            type={type}
            onClick={onClick}
            className="w-full bg-[#002B5B] text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-md active:scale-95"
        > 
            {children} 
        </button>
    );
}

export default Button;