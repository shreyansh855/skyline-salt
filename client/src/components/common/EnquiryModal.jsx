import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, Building, Package } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function EnquiryModal({ isOpen, onClose, initialProduct = '', initialGrade = '' }) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: initialProduct || '',
    grade: initialGrade || '',
    quantity: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError('');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      product: '',
      grade: '',
      quantity: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-400 text-slate-900 mb-1">
              Direct Factory Quotation
            </div>
            <h3 className="text-xl font-bold font-heading">Request a Quote / Product Enquiry</h3>
            <p className="text-xs text-blue-100">Direct response from our Gandhidham commercial technical desk</p>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Successfully Received!</h4>
              <p className="text-slate-600 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our technical commercial team at Gandhidham will contact you at <span className="font-semibold">{formData.email}</span> / <span className="font-semibold">{formData.phone}</span> with complete batch analysis and best factory pricing.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto mb-6 text-sm text-left">
                <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Urgent Inquiries Call Directly:</div>
                <div className="font-bold text-blue-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <a href={`tel:${settings.phonePrimary}`} className="hover:underline">{settings.phonePrimary}</a>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Chemicals Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Product Interested In *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Refined Industrial Salt / API Bentonite"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Quantity Required / Monthly Requirement
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100 MT, 1 x 20ft Container"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Technical Requirements / Grade / Destination Port
                </label>
                <textarea
                  rows="3"
                  placeholder="Specify desired chemical purity, mesh size, packaging preference (25kg/50kg/Jumbo), delivery location or FOB/CIF port..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

