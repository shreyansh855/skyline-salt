import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Edit, Trash2, Search, Check, X, 
  ExternalLink, Image, Sliders, Layers, Sparkles, Upload
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal / Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  // Specifications rows state in modal
  const [specsRows, setSpecsRows] = useState([]);
  const [gradesInput, setGradesInput] = useState('');
  const [packagingInput, setPackagingInput] = useState('');
  const [applicationsInput, setApplicationsInput] = useState('');

  const token = localStorage.getItem('skyline_token');

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      if (prodRes.ok) {
        const p = await prodRes.json();
        setProducts(p.products || []);
      }
      if (catRes.ok) {
        const c = await catRes.json();
        setCategories(c.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setCurrentProduct({
      name: '',
      slug: '',
      categoryId: categories[0]?.id || 'cat_industrial_salt',
      categorySlug: categories[0]?.slug || 'industrial-salt',
      subcategoryId: '',
      shortDescription: '',
      description: '',
      images: ['/skyline-solar-salt-mountains.jpg'],
      grades: [],
      packaging: [],
      specifications: [
        { parameter: 'Chemical Purity', value: '99.0% Min', testMethod: 'Standard' },
        { parameter: 'Moisture', value: '< 0.5%', testMethod: 'Oven Drying' }
      ],
      applications: [],
      isFeatured: false,
      isActive: true,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ''
    });
    setSpecsRows([
      { parameter: 'Chemical Purity', value: '99.0% Min', testMethod: 'Standard' },
      { parameter: 'Moisture', value: '< 0.5%', testMethod: 'Oven Drying' }
    ]);
    setGradesInput('');
    setPackagingInput('');
    setApplicationsInput('');
    setIsEditing(true);
  };

  const handleOpenEdit = (prod) => {
    setCurrentProduct({ ...prod });
    setSpecsRows(prod.specifications || []);
    setGradesInput((prod.grades || []).join('\n'));
    setPackagingInput((prod.packaging || []).join('\n'));
    setApplicationsInput((prod.applications || []).join('\n'));
    setIsEditing(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (e) {
      alert('Error deleting product');
    }
  };

  const handleSpecChange = (index, field, val) => {
    const updated = [...specsRows];
    updated[index][field] = val;
    setSpecsRows(updated);
  };

  const handleAddSpecRow = () => {
    setSpecsRows([...specsRows, { parameter: '', value: '', testMethod: '' }]);
  };

  const handleRemoveSpecRow = (index) => {
    setSpecsRows(specsRows.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCurrentProduct(prev => ({
          ...prev,
          images: [data.url, ...(prev.images || [])]
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading image');
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    // Process inputs
    const grades = gradesInput.split('\n').map(s => s.trim()).filter(Boolean);
    const packaging = packagingInput.split('\n').map(s => s.trim()).filter(Boolean);
    const applications = applicationsInput.split('\n').map(s => s.trim()).filter(Boolean);
    const specifications = specsRows.filter(r => r.parameter.trim() !== '');

    const catObj = categories.find(c => c.id === currentProduct.categoryId);
    const categorySlug = catObj ? catObj.slug : currentProduct.categorySlug;

    const payload = {
      ...currentProduct,
      categorySlug,
      grades,
      packaging,
      applications,
      specifications
    };

    try {
      const isNew = !currentProduct.id || currentProduct.id.startsWith('prod_temp');
      const url = isNew ? '/api/products' : `/api/products/${currentProduct.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      setIsEditing(false);
      loadData();
    } catch (err) {
      setFormError(err.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
            Product Management System
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage catalogue, specifications tables, grades, and imagery.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white outline-none"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Grades & Specs</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img src={p.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold text-[11px]">
                      {p.categorySlug}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{p.grades?.length || 0}</span> grades
                      <span>•</span>
                      <span className="font-semibold">{p.specifications?.length || 0}</span> specs
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.isActive ? 'Active' : 'Draft'}
                      </span>
                      {p.isFeatured && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Live Page"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-slate-100 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        title="Edit Product"
                        className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        title="Delete Product"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Edit / Create Modal */}
      {isEditing && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading">
                  {currentProduct.id ? `Edit: ${currentProduct.name}` : 'Add New Mineral Product'}
                </h3>
                <p className="text-xs text-slate-400">Database-backed full catalogue editor</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
              
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {formError}
                </div>
              )}

              {/* Basic Details */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">1. Basic Information</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.name}
                      onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                    <input
                      type="text"
                      placeholder="auto-generated-if-blank"
                      value={currentProduct.slug}
                      onChange={e => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={currentProduct.categoryId}
                      onChange={e => {
                        const cat = categories.find(c => c.id === e.target.value);
                        setCurrentProduct({
                          ...currentProduct,
                          categoryId: e.target.value,
                          categorySlug: cat ? cat.slug : currentProduct.categorySlug
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-6 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentProduct.isActive}
                        onChange={e => setCurrentProduct({ ...currentProduct, isActive: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      <span className="font-semibold text-slate-700">Active on Website</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentProduct.isFeatured}
                        onChange={e => setCurrentProduct({ ...currentProduct, isFeatured: e.target.checked })}
                        className="rounded text-amber-600"
                      />
                      <span className="font-semibold text-slate-700">Featured Badge</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Description (for cards)</label>
                  <input
                    type="text"
                    value={currentProduct.shortDescription || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Comprehensive Description</label>
                  <textarea
                    rows="3"
                    value={currentProduct.description || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-600"
                  ></textarea>
                </div>
              </div>

              {/* Specifications Table Editor */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    2. Technical Specifications Table
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition"
                  >
                    + Add Parameter Row
                  </button>
                </div>

                <div className="space-y-2">
                  {specsRows.map((row, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Parameter (e.g. NaCl %, Swelling)"
                        value={row.parameter}
                        onChange={e => handleSpecChange(idx, 'parameter', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Guaranteed Value (e.g. 99.2% Min)"
                        value={row.value}
                        onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Test Method (e.g. IS:797)"
                        value={row.testMethod || ''}
                        onChange={e => handleSpecChange(idx, 'testMethod', e.target.value)}
                        className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grades, Packaging, Applications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Available Grades (1 per line)
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Grade A (99.5% NaCl)&#10;Grade B"
                    value={gradesInput}
                    onChange={e => setGradesInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Packaging Details (1 per line)
                  </label>
                  <textarea
                    rows="4"
                    placeholder="25 kg HDPE bags&#10;50 kg bags&#10;1 MT Jumbo bags"
                    value={packagingInput}
                    onChange={e => setPackagingInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Applications & Uses (1 per line)
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Chlor-Alkali synthesis&#10;Textile Dyeing"
                    value={applicationsInput}
                    onChange={e => setApplicationsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  ></textarea>
                </div>
              </div>

              {/* Images Management */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  4. Image Management
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer transition flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-700" />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <span className="text-slate-400">or provide image URL below</span>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={currentProduct.images?.[0] || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, images: [e.target.value] })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                  />
                </div>
              </div>

              {/* SEO Tags */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  5. Search Engine Optimization (SEO)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Refined Industrial Salt Manufacturer Gandhidham"
                      value={currentProduct.seoTitle || ''}
                      onChange={e => setCurrentProduct({ ...currentProduct, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      placeholder="industrial salt, sodium chloride"
                      value={currentProduct.seoKeywords || ''}
                      onChange={e => setCurrentProduct({ ...currentProduct, seoKeywords: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                  <input
                    type="text"
                    value={currentProduct.seoDescription || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition disabled:opacity-70"
                >
                  {saving ? 'Saving to Database...' : 'Save Product Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

