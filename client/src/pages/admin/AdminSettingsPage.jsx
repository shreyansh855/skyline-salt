import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Lock, ShieldCheck, MapPin, Factory, Phone, Mail } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettingsPage() {
  const { settings: globalSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwStatus, setPwStatus] = useState({ success: false, error: '', loading: false });

  const token = localStorage.getItem('skyline_token');

  useEffect(() => {
    if (globalSettings) {
      setFormData({ ...globalSettings });
    }
  }, [globalSettings]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        refreshSettings();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch (err) {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwStatus({ success: false, error: '', loading: true });

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password update failed');
      setPwStatus({ success: true, error: '', loading: false });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPwStatus({ success: false, error: err.message, loading: false });
    }
  };

  if (!formData) {
    return <div className="p-8 text-center text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
          Global Company Contact Details & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Changes made here automatically update across the topbar, footer, contact page, and structured schema markup.
        </p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Company contact details updated globally across the entire website!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 text-xs">
        
        {/* Company Name & Tagline */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">1. Company Identity</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Corporate Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">GST Identification (GSTIN)</label>
              <input
                type="text"
                value={formData.gstNumber || ''}
                onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                placeholder="24CHLPM4029D1ZJ"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Addresses & Google Maps Links */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            2. Official Addresses & Google Maps Coordinates
          </div>

          {/* Office Address */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Head Office Address (Bhuj)</span>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Postal Address</label>
              <textarea
                rows="2"
                required
                value={formData.officeAddress}
                onChange={e => setFormData({ ...formData, officeAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Maps Direct URL</label>
              <input
                type="text"
                required
                value={formData.officeMapsUrl}
                onChange={e => setFormData({ ...formData, officeMapsUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Factory Address */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Factory className="w-4 h-4 text-amber-700" />
              <span>Processing Plant Address (Gandhidham)</span>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Postal Address</label>
              <textarea
                rows="2"
                required
                value={formData.factoryAddress}
                onChange={e => setFormData({ ...formData, factoryAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Maps Direct URL</label>
              <input
                type="text"
                required
                value={formData.factoryMapsUrl}
                onChange={e => setFormData({ ...formData, factoryMapsUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Telephone & Email Numbers */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            3. Phones & Business Email Addresses
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Mobile Number (Clickable tel:)</label>
              <input
                type="text"
                required
                value={formData.phonePrimary}
                onChange={e => setFormData({ ...formData, phonePrimary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary Mobile Number (Clickable tel:)</label>
              <input
                type="text"
                required
                value={formData.phoneSecondary}
                onChange={e => setFormData({ ...formData, phoneSecondary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Commercial Inquiries Email (Clickable mailto:)</label>
              <input
                type="email"
                required
                value={formData.emailInfo}
                onChange={e => setFormData({ ...formData, emailInfo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Customer Support Email (Clickable mailto:)</label>
              <input
                type="email"
                required
                value={formData.emailSupport}
                onChange={e => setFormData({ ...formData, emailSupport: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Global Settings'}</span>
          </button>
        </div>

      </form>

      {/* Password Change Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 font-heading flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-700" />
          <span>Change Administrator Password</span>
        </h3>

        {pwStatus.success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl">
            Admin password updated successfully!
          </div>
        )}
        {pwStatus.error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl">
            {pwStatus.error}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password (at least 8 chars)</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={pwStatus.loading}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition"
          >
            {pwStatus.loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

    </div>
  );
}

