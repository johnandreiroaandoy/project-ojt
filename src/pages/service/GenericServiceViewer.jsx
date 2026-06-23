import React, { useState, useEffect } from 'react';

function GenericServiceViewer({ serviceId, baseUrl, targetFile }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/data/${targetFile}?v=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Data profile not initialized yet.");
        return res.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [baseUrl, targetFile]);

  if (loading) {
    return <div className="text-center py-6 text-xs text-gray-400 animate-pulse">🔄 Fetching citizen requirements matrix...</div>;
  }

  if (!data) {
    return (
      <div className="text-center py-8 bg-amber-50 rounded-xl border border-amber-100 p-4 text-amber-800 text-xs font-semibold">
        ⚠️ This service has been registered, but its requirements page has not been written by an administrator yet.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight">{data.title || serviceId}</h3>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">{data.description}</p>
      </div>

      {data.requirements && data.requirements.length > 0 ? (
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#002B5B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 w-1/4">Step Reference</th>
                <th className="p-4 w-3/4">Required Documents / Checklists</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {data.requirements.map((req, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-black text-[#002B5B] uppercase">{req.step || `Step ${idx + 1}`}</td>
                  <td className="p-4 text-gray-600 font-medium">{req.document}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xs font-medium text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center">
          No external document checklists are mapped to this pipeline node.
        </div>
      )}
    </div>
  );
}

export default GenericServiceViewer;