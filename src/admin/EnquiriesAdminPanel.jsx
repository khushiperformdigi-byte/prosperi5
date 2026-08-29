import React, { useState, useEffect } from 'react';
import { fetchAdminEnquiries, deleteAdminEnquiry } from '../api/careers';

export default function EnquiriesAdminPanel({ onUnauthorized }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const loadEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminEnquiries({
        path: selectedPath !== 'all' ? selectedPath : '',
        search: search.trim(),
      });
      setEnquiries(data);
    } catch (err) {
      if (err.status === 401) onUnauthorized?.();
      setError(err.message || 'Failed to fetch user enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [selectedPath]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEnquiries();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteAdminEnquiry(id);
      await loadEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Unique Form Paths for Filter
  const uniquePaths = Array.from(new Set(enquiries.map((e) => e.formPath || '/'))).filter(Boolean);

  const formatDate = (val) => {
    if (!val) return 'N/A';
    try {
      const d = new Date(val);
      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return val;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase text-[#7C1FA8] tracking-wider">Total User Enquiries</p>
          <h3 className="text-3xl font-extrabold text-[#1E1B2E] mt-1">{enquiries.length}</h3>
          <p className="text-xs text-[#6F6A82] mt-1">Stored with full path & form details</p>
        </div>
        <div className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase text-emerald-600 tracking-wider">Form Sources</p>
          <h3 className="text-3xl font-extrabold text-[#1E1B2E] mt-1">{uniquePaths.length || 1}</h3>
          <p className="text-xs text-[#6F6A82] mt-1">Unique page URLs captured</p>
        </div>
        <div className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 shadow-sm">
          <p className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">Status</p>
          <h3 className="text-3xl font-extrabold text-[#1E1B2E] mt-1">Active Sync</h3>
          <p className="text-xs text-[#6F6A82] mt-1">WhatsApp & Database synced</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <form onSubmit={handleSearchSubmit} className="bg-white border border-[#EBE8EF] rounded-[20px] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, email, phone, form name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#EBE8EF] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C1FA8]"
          />
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#EBE8EF] text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7C1FA8]"
          >
            <option value="all">All Page Paths</option>
            {uniquePaths.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#7C1FA8] text-white text-sm font-bold hover:bg-[#68198c] cursor-pointer transition-all"
          >
            Search
          </button>
          <button
            type="button"
            onClick={loadEnquiries}
            className="px-4 py-2.5 rounded-xl border border-[#EBE8EF] text-sm font-bold text-[#544F66] hover:bg-[#FAF5FD] cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Enquiries List Table */}
      <div className="bg-white border border-[#EBE8EF] rounded-[20px] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-sm text-[#6F6A82]">Loading user enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#6F6A82]">
            No user enquiries found. Form submissions from website pages will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#FAF5FD] border-b border-[#EBE8EF] text-[#544F66] font-bold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Form Source & Path</th>
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Submitted At</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE8EF]">
                {enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <span className="font-bold text-[#1E1B2E] block">{item.formName || 'Website Form'}</span>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-[#7C1FA8]/10 text-[#7C1FA8] font-mono text-xs font-semibold">
                        {item.formPath || '/'}
                      </span>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <span className="font-bold text-[#1E1B2E] block">{item.name || 'Anonymous User'}</span>
                      {item.city && <span className="text-xs text-[#6F6A82]">City: {item.city}</span>}
                      {item.service && <span className="text-xs text-[#7C1FA8] block font-medium">Service: {item.service}</span>}
                    </td>
                    <td className="py-4 px-4 align-top">
                      {item.phone && (
                        <a href={`tel:${item.phone}`} className="text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] block">
                          📞 {item.phone}
                        </a>
                      )}
                      {item.email && (
                        <a href={`mailto:${item.email}`} className="text-xs text-[#6F6A82] hover:text-[#7C1FA8] block truncate max-w-[200px]">
                          ✉️ {item.email}
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top text-xs text-[#6F6A82] font-medium whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#7C1FA8] text-white text-xs font-bold hover:bg-[#68198c] cursor-pointer"
                        >
                          View Full Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Full Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#EBE8EF] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C1FA8]">Enquiry #{selectedEnquiry.id}</span>
                <h3 className="text-xl font-extrabold text-[#1E1B2E]">{selectedEnquiry.formName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-[#FAF5FD] text-[#1E1B2E] font-bold flex items-center justify-center hover:bg-[#EBE8EF] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#FAF5FD] p-4 rounded-xl border border-[#EBE8EF]">
              <div>
                <span className="text-xs text-[#6F6A82] block">Form Source Path</span>
                <span className="font-mono font-bold text-[#7C1FA8]">{selectedEnquiry.formPath || '/'}</span>
              </div>
              <div>
                <span className="text-xs text-[#6F6A82] block">Submitted Timestamp</span>
                <span className="font-semibold text-[#1E1B2E]">{formatDate(selectedEnquiry.createdAt)}</span>
              </div>
              <div>
                <span className="text-xs text-[#6F6A82] block">Full Name</span>
                <span className="font-bold text-[#1E1B2E]">{selectedEnquiry.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-[#6F6A82] block">Phone Number</span>
                <span className="font-bold text-[#1E1B2E]">{selectedEnquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-[#6F6A82] block">Email Address</span>
                <span className="font-semibold text-[#1E1B2E]">{selectedEnquiry.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-[#6F6A82] block">City / Location</span>
                <span className="font-semibold text-[#1E1B2E]">{selectedEnquiry.city || 'N/A'}</span>
              </div>
            </div>

            {selectedEnquiry.service && (
              <div>
                <h4 className="font-bold text-[#1E1B2E] text-xs uppercase tracking-wider mb-1">Service / Interest</h4>
                <p className="text-sm font-semibold text-[#7C1FA8] bg-purple-50 p-3 rounded-xl border border-purple-100">
                  {selectedEnquiry.service}
                </p>
              </div>
            )}

            {selectedEnquiry.message && (
              <div>
                <h4 className="font-bold text-[#1E1B2E] text-xs uppercase tracking-wider mb-1">User Message</h4>
                <div className="text-sm text-[#1E1B2E] bg-white p-3.5 rounded-xl border border-[#EBE8EF] whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>
            )}

            {selectedEnquiry.extra && Object.keys(selectedEnquiry.extra).length > 0 && (
              <div>
                <h4 className="font-bold text-[#1E1B2E] text-xs uppercase tracking-wider mb-2">Form Data & Extra Parameters</h4>
                <div className="bg-[#1E1B2E] text-white p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
                  {Object.entries(selectedEnquiry.extra).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-[#C4A5DC]">{k}:</span>
                      <span className="text-emerald-400">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EBE8EF]">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-[#7C1FA8] text-white font-bold text-sm cursor-pointer hover:bg-[#68198c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
