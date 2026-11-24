import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle2 } from 'lucide-react';

export default function AdminContentPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const token = localStorage.getItem('skyline_token');

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const d = await res.json();
          setContent(d.content);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleSaveSection = async (sectionKey, sectionData) => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch(`/api/content/${sectionKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sectionData)
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      alert('Error updating content');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <div className="p-8 text-center text-slate-500">Loading website CMS content...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
          Website Pages & Section CMS
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Update homepage hero copy, About Us pillars, and Gandhidham manufacturing plant descriptions.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Content successfully saved! All updates now reflect live on the public frontend.</span>
        </div>
      )}

      {/* 1. Hero Section CMS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Homepage Hero Section
          </h3>
          <button
            onClick={() => handleSaveSection('hero', content.hero)}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Hero</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={content.hero?.headline || ''}
              onChange={e => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hero Subheadline</label>
            <textarea
              rows="2"
              value={content.hero?.subheadline || ''}
              onChange={e => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* 2. About Section CMS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Company Story, Mission & Vision
          </h3>
          <button
            onClick={() => handleSaveSection('about', content.about)}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save About</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Our Heritage & Story</label>
            <textarea
              rows="3"
              value={content.about?.story || ''}
              onChange={e => setContent({ ...content, about: { ...content.about, story: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mission Statement</label>
              <textarea
                rows="3"
                value={content.about?.mission || ''}
                onChange={e => setContent({ ...content, about: { ...content.about, mission: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Vision Statement</label>
              <textarea
                rows="3"
                value={content.about?.vision || ''}
                onChange={e => setContent({ ...content, about: { ...content.about, vision: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Gandhidham Manufacturing Plant CMS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Gandhidham Plant & QA Lab Description
          </h3>
          <button
            onClick={() => handleSaveSection('manufacturing', content.manufacturing)}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Manufacturing</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Plant Infrastructure Overview</label>
            <textarea
              rows="3"
              value={content.manufacturing?.overview || ''}
              onChange={e => setContent({ ...content, manufacturing: { ...content.manufacturing, overview: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">In-House QA Laboratory Details</label>
            <textarea
              rows="3"
              value={content.manufacturing?.qualityLab || ''}
              onChange={e => setContent({ ...content, manufacturing: { ...content.manufacturing, qualityLab: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
            ></textarea>
          </div>
        </div>
      </div>

    </div>
  );
}

