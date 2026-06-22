import React from 'react';

function ContactManagement({ state, setState, onSave }) {

  const updateEmailItem = (index, newValue) => {
    setState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy.emails) copy.emails = [];
      copy.emails[index] = newValue;
      return copy;
    });
  };

  const addEmailItem = () => {
    setState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy.emails) copy.emails = [];
      copy.emails.push("");
      return copy;
    });
  };

  const removeEmailItem = (index) => {
    setState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (copy.emails) {
        copy.emails = copy.emails.filter((_, i) => i !== index);
      }
      return copy;
    });
  };

  const emailList = state?.emails || [];

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">
        📞 Office Locations & Contact Gateways (contact_info.json)
      </h2>
      
      <div className="space-y-5">
        {/* Physical Address Parameters Block */}
        <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-200/60 space-y-4">
          <span className="text-[11px] font-black text-[#002B5B] uppercase tracking-wider block">📍 Location Meta Identifiers</span>
          
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Address Section Heading Context</label>
            <input 
              type="text" 
              value={state?.heading || ''} 
              onChange={e => setState({ ...state, heading: e.target.value })} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Room Designation</label>
              <input 
                type="text" 
                value={state?.roomNumber || ''} 
                onChange={e => setState({ ...state, roomNumber: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Floor Number</label>
              <input 
                type="text" 
                value={state?.floor || ''} 
                onChange={e => setState({ ...state, floor: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Facility / Building Name</label>
              <input 
                type="text" 
                value={state?.building || ''} 
                onChange={e => setState({ ...state, building: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Street / Block Avenue Address</label>
              <input 
                type="text" 
                value={state?.street || ''} 
                onChange={e => setState({ ...state, street: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">City / Province Jurisdiction</label>
              <input 
                type="text" 
                value={state?.city || ''} 
                onChange={e => setState({ ...state, city: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Telephone Telephony Parameters Block */}
        <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-200/60 space-y-4">
          <span className="text-[11px] font-black text-[#002B5B] uppercase tracking-wider block">☎ Telephony Gateway Routing</span>
          
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone Connection Context Label</label>
            <input 
              type="text" 
              value={state?.phoneLabel || ''} 
              onChange={e => setState({ ...state, phoneLabel: e.target.value })} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Telephone Number String</label>
              <input 
                type="text" 
                value={state?.phoneNumber || ''} 
                onChange={e => setState({ ...state, phoneNumber: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Local PBX Line Terminals</label>
              <input 
                type="text" 
                value={state?.localLines || ''} 
                onChange={e => setState({ ...state, localLines: e.target.value })} 
                className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Digital Mailboxes Matrix Arrays Block */}
        <div className="bg-slate-50/40 p-5 rounded-2xl border border-slate-200/60 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <span className="text-[11px] font-black text-[#002B5B] uppercase tracking-wider block">✉ Digital Messaging Accounts</span>
              <input 
                type="text"
                value={state?.emailLabel || ''}
                onChange={e => setState({ ...state, emailLabel: e.target.value })}
                className="p-1 border-none bg-transparent font-bold text-xs uppercase text-slate-400 tracking-wider outline-none focus:ring-0 mt-1"
                placeholder="or email them at Label Context"
              />
            </div>
            <button 
              type="button" 
              onClick={addEmailItem}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              + Add Email Address
            </button>
          </div>
          
          {emailList.map((emailString, idx) => (
            <div key={`email-node-${idx}`} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-2 rounded-lg">Inbox Vector #{idx + 1}</span>
              <input 
                type="email"
                value={emailString || ''}
                onChange={e => updateEmailItem(idx, e.target.value)}
                className="flex-1 p-2 border-none text-xs font-semibold text-slate-600 outline-none focus:ring-0"
                placeholder="example@domain.gov.ph"
              />
              <button type="button" onClick={() => removeEmailItem(idx)} className="text-rose-600 hover:text-rose-700 font-bold px-2 cursor-pointer transition-colors">✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button 
          onClick={() => onSave('contact_info.json', state)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Location Metadata
        </button>
      </div>
    </div>
  );
}

export default ContactManagement;