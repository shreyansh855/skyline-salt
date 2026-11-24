import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Layers, ArrowRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';

export default function ProductsPage({ onOpenQuote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ]);
        if (catRes.ok) {
          const c = await catRes.json();
          setCategories(c.categories || []);
        }
        if (prodRes.ok) {
          const p = await prodRes.json();
          setProducts(p.products || []);
        }
      } catch (e) {
        console.error('Failed to load products page data', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.applications && p.applications.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Complete Product Catalogue | Skyline Salt and Minerals"
        description="Browse all products from Skyline Salt and Minerals: Industrial Salt, Edible Salt, API 13A Bentonite, China Clay, Calcined Kaolin, and Refractory Minerals."
      />
      <Breadcrumbs items={[{ label: 'Product Catalogue', href: '/products' }]} />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300">
              Complete Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Industrial Salts & Mineral Catalogue
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our laboratory-tested industrial sodium chloride, culinary edible salts, API drilling bentonites, ceramic china clays, calcined kaolin, and induction furnace minerals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name, mineral, or application..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none bg-slate-50 focus:bg-white transition"
              />
            </div>

            {/* Product count */}
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search query or reset the category filters to browse our full product catalog.
            </p>
            <button
              onClick={() => { setSearchTerm(''); handleCategoryChange('all'); }}
              className="px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenQuote={onOpenQuote}
              />
            ))}
          </div>
        )}

        {/* Need Custom Specifications Banner */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-heading">
              Need a Customized Mesh Size, Purity, or Packing?
            </h3>
            <p className="text-xs text-blue-200 max-w-xl">
              We engineer tailored grain size spectrums, swelling indexes, whiteness thresholds, and custom private labeling in 25kg, 50kg, and jumbo bags.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote && onOpenQuote()}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition"
          >
            Request Custom Formulation
          </button>
        </div>

      </div>
    </div>
  );
}

