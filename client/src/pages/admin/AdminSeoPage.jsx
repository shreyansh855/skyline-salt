import React, { useState, useEffect } from 'react';
import { Globe, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const token = localStorage.getItem('skyline_token');

  useEffect(() => {
    async function loadSeo() {
      try {
        const res = await fetch('/api/seo');
        if (res.ok) {
          const d = await res.json();
          setSeo(d.seo);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSeo();
  }, []);

  const handleUpdatePageSeo = async (path, metadata) => {
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/seo/page', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ path, metadata })
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      alert('Error updating page SEO');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !seo) {
    return <div className="p-8 text-center text-slate-500">Loading SEO settings...</div>;
  }

  const pages = seo.pages || {};

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
          Search Engine Optimization (SEO) & Meta Tags
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure route-level titles, Open Graph descriptions, and search indexing parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>SEO Metadata updated successfully! Changes reflect immediately in page headers.</span>
        </div>
      )}

      {/* Pages List */}
      <div className="space-y-6">
        {Object.entries(pages).map(([path, meta]) => (
          <div key={path} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-slate-900 font-mono text-sm">{path}</span>
              </div>
              <button
                onClick={() => handleUpdatePageSeo(path, meta)}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Route SEO</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={meta.title || ''}
                  onChange={e => {
                    const updated = { ...seo };
                    updated.pages[path].title = e.target.value;
                    setSeo(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                <textarea
                  rows="2"
                  value={meta.description || ''}
                  onChange={e => {
                    const updated = { ...seo };
                    updated.pages[path].description = e.target.value;
                    setSeo(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={meta.keywords || ''}
                  onChange={e => {
                    const updated = { ...seo };
                    updated.pages[path].keywords = e.target.value;
                    setSeo(updated);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

