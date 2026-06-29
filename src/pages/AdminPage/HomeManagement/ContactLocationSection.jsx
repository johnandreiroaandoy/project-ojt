import React, { useEffect, useRef, useState } from 'react';

function ContactLocationSection({ baseUrl, onSave }) {
  const [contactState, setContactState] = useState({ heading: '', roomNumber: '', floor: '', building: '', street: '', city: '', phoneLabel: '', phoneNumber: '', localLines: '', emailLabel: '', emails: [] });
  const originalContactMock = useRef(null);

  useEffect(() => {
    const cacheBuster = `?v=${new Date().getTime()}`;

    fetch(`${baseUrl}/data/contact_info.json${cacheBuster}`)
      .then(res => res.json())
      .catch(() => ({}))
      .then(contactData => {
        const nextState = {
          heading: contactData.heading || '',
          roomNumber: contactData.roomNumber || '',
          floor: contactData.floor || '',
          building: contactData.building || '',
          street: contactData.street || '',
          city: contactData.city || '',
          phoneLabel: contactData.phoneLabel || '',
          phoneNumber: contactData.phoneNumber || '',
          localLines: contactData.localLines || '',
          emailLabel: contactData.emailLabel || '',
          emails: contactData.emails || []
        };
        setContactState(nextState);
        originalContactMock.current = JSON.parse(JSON.stringify(nextState));
      });
  }, [baseUrl]);

  const contactEmails = contactState?.emails || [];

  const updateEmailItem = (index, newValue) => {
    setContactState(prev => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy.emails) copy.emails = [];
      copy.emails[index] = newValue;
      return copy;
    });
  };

  const undoContactChanges = () => {
    if (originalContactMock.current) {
      setContactState(JSON.parse(JSON.stringify(originalContactMock.current)));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-md font-black text-[#002B5B] uppercase tracking-wide border-b pb-3">📞 3. Office Locations & Contact Gateways</h2>
      <div className="grid grid-cols-1 gap-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Heading Label</label>
            <input 
              type="text" value={contactState?.heading || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), heading: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone Introduction Label</label>
            <input 
              type="text" value={contactState?.phoneLabel || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), phoneLabel: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Room Number</label>
            <input 
              type="text" value={contactState?.roomNumber || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), roomNumber: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Floor Level</label>
            <input 
              type="text" value={contactState?.floor || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), floor: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Building Name</label>
            <input 
              type="text" value={contactState?.building || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), building: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Street Address</label>
            <input 
              type="text" value={contactState?.street || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), street: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">City</label>
            <input 
              type="text" value={contactState?.city || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), city: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Primary Phone Trunkline</label>
            <input 
              type="text" value={contactState?.phoneNumber || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), phoneNumber: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Local Lines Scope</label>
            <input 
              type="text" value={contactState?.localLines || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), localLines: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div className="space-y-3 bg-slate-50 p-4 rounded-xl border">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Email Label Description</label>
            <input 
              type="text" value={contactState?.emailLabel || ''} 
              onChange={e => setContactState(prev => ({ ...(prev || {}), emailLabel: e.target.value }))} 
              className="w-full p-3 border rounded-xl mt-1 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Office Email Addresses</label>
            {contactEmails.map((emailStr, idx) => (
              <div key={`email-${idx}`} className="flex items-center gap-2 bg-white p-2 border rounded-xl shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 px-2 bg-slate-50 py-1 rounded">Email #{idx+1}</span>
                <input 
                  type="email" value={emailStr || ''} onChange={e => updateEmailItem(idx, e.target.value)}
                  className="flex-1 text-xs font-semibold text-slate-700 border-none outline-none focus:ring-0"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="flex gap-3 pt-4">
        <button 
          type="button" onClick={() => onSave('contact_info.json', contactState)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Save Location Metadata
        </button>
        <button 
          type="button" onClick={undoContactChanges} 
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
        >
          ↩️ Undo Location
        </button>
      </div>
    </div>
  );
}

export default ContactLocationSection;
