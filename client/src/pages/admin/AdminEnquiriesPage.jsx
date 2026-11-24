import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Download, Trash2, CheckCircle2, 
  Clock, Phone, Mail, Building2, User, Search, Eye, Filter
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected enquiry for detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem('skyline_token');

  const loadEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const d = await res.json();
        setEnquiries(d.enquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id, status, note = '') => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, note })
      });
      if (res.ok) {
        const d = await res.json();
        setEnquiries(enquiries.map(e => e.id === id ? d.enquiry : e));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(d.enquiry);
        }
        setNewNote('');
      }
    } catch (e) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer enquiry record?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) setSelectedEnquiry(null);
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesSearch = !searchTerm ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.product && e.product.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
            Customer Inquiries & Quotation Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View real customer enquiries, update lead pipeline status, and log notes.
          </p>
        </div>

        <a
          href="/api/enquiries/export/csv"
          target="_blank"
          download
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-blue-700" />
          <span>Export All Enquiries (CSV)</span>
        </a>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by buyer name, company, email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {['all', 'new', 'contacted', 'in_progress', 'closed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'All Leads' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Product & Quantity</th>
                <th className="py-3 px-4">Lead Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 italic">
                    No customer enquiries found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {enq.createdAt.split('T')[0]}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{enq.name}</div>
                      <div className="text-[11px] text-slate-500">{enq.company || 'Direct Buyer'}</div>
                      <div className="text-[11px] text-blue-700 mt-0.5">{enq.email} • {enq.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-blue-900">{enq.product}</div>
                      <div className="text-[11px] text-slate-500">
                        {enq.quantity ? `Qty: ${enq.quantity}` : 'Standard Batch'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={e => handleUpdateStatus(enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer border ${
                          enq.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          enq.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          enq.status === 'in_progress' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-[11px] transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl p-6 text-xs space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Lead Reference ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Enquiry from {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                &times;
              </button>
            </div>

            {/* Buyer Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Company Name:</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.company || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Product Requested:</span>
                <span className="font-bold text-blue-900">{selectedEnquiry.product}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-blue-700 hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Phone / Mobile:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-semibold text-blue-700 hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
            </div>

            {/* Buyer Message */}
            <div>
              <div className="font-bold uppercase tracking-wider text-slate-500 text-[11px] mb-1">
                Customer Message / Technical Requirement:
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message || 'No additional text specified in enquiry.'}
              </div>
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-bold text-slate-700">Update Lead Status:</span>
              <div className="flex gap-2">
                {['new', 'contacted', 'in_progress', 'closed'].map(s => (
                  <button
                    key={s}
                    onClick={() => handleUpdateStatus(selectedEnquiry.id, s)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                      selectedEnquiry.status === s
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                Internal Notes & Follow-Up Log:
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                  selectedEnquiry.notes.map((n, i) => (
                    <div key={i} className="p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px]">
                      <span className="text-slate-700">{n.note}</span>
                      <span className="text-slate-400 text-[10px] block mt-0.5">{n.timestamp.split('T')[0]}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic text-[11px]">No notes logged yet.</p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add note (e.g. Sent sample via courier, quoted $72/MT)..."
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                />
                <button
                  onClick={() => {
                    if (newNote.trim()) {
                      handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status, newNote.trim());
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
                >
                  Log Note
                </button>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
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

