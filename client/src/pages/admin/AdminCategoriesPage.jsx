import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Edit, Trash2, Check, X, Layers } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCat, setEditingCat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Subcategories text
  const [subcatsText, setSubcatsText] = useState('');

  const token = localStorage.getItem('skyline_token');

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const d = await res.json();
        setCategories(d.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCat({
      name: '',
      slug: '',
      description: '',
      bannerImage: '/skyline-solar-salt-mountains.jpg',
      subcategories: []
    });
    setSubcatsText('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat({ ...cat });
    const lines = (cat.subcategories || []).map(s => `${s.name} | ${s.slug} | ${s.description || ''}`).join('\n');
    setSubcatsText(lines);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? Products inside may become unassociated.`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Parse subcategories lines: Name | slug | description
    const subcategories = subcatsText.split('\n').map((line, idx) => {
      const parts = line.split('|').map(s => s.trim());
      if (!parts[0]) return null;
      return {
        id: `sub_${Date.now()}_${idx}`,
        name: parts[0],
        slug: parts[1] || parts[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: parts[2] || ''
      };
    }).filter(Boolean);

    const payload = {
      ...editingCat,
      subcategories
    };

    try {
      const isNew = !editingCat.id;
      const url = isNew ? '/api/categories' : `/api/categories/${editingCat.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(false);
        loadCategories();
      } else {
        alert('Failed to save category');
      }
    } catch (err) {
      alert('Error saving category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
            Categories & Subcategories Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure product taxonomies, banner imagery, and subcategory classifications.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-base">{cat.name}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[11px] font-bold">
                  {cat.slug}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {cat.description}
              </p>

              {/* Subcategories list */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-blue-600" />
                  <span>Subcategories ({cat.subcategories?.length || 0}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(cat.subcategories || []).map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={`/products/${cat.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 font-semibold hover:underline"
              >
                View Frontend Page &rarr;
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {editingCat.id ? `Edit: ${editingCat.name}` : 'New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCat.name}
                  onChange={e => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingCat.slug}
                  onChange={e => setEditingCat({ ...editingCat, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editingCat.description || ''}
                  onChange={e => setEditingCat({ ...editingCat, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={editingCat.bannerImage || ''}
                  onChange={e => setEditingCat({ ...editingCat, bannerImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Subcategories (Format: Name | slug | brief description)
                </label>
                <textarea
                  rows="4"
                  placeholder="Refined Industrial Salt | refined-salt | Ultra pure&#10;Raw Solar Sea Salt | raw-salt | Kutch pans"
                  value={subcatsText}
                  onChange={e => setSubcatsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition"
                >
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

