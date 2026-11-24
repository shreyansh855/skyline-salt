import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@skylinesaltandminerals.com');
  const [password, setPassword] = useState('Admin@Skyline2026!');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-white">
            Skyline Admin Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise Website & Catalogue Management System
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@skylinesaltandminerals.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white outline-none"
              />
            </div>
          </div>

          {/* Quick Demo Helper Hint */}
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-[11px] text-blue-300 space-y-1">
            <div className="font-bold text-blue-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Default Administrator Credentials:</span>
            </div>
            <div>Email: <span className="text-white font-mono">admin@skylinesaltandminerals.com</span></div>
            <div>Pass: <span className="text-white font-mono">Admin@Skyline2026!</span></div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {submitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-800 text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            &larr; Return to Skyline Public Website
          </a>
        </div>
      </div>
    </div>
  );
}

