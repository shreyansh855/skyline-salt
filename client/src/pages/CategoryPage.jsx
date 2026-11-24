import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Layers, FileText, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';

export default function CategoryPage({ onOpenQuote }) {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedSubcat, setSelectedSubcat] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategory() {
      setLoading(true);
      try {
        const res = await fetch(`/api/categories/${categorySlug}`);
        if (res.ok) {
          const data = await res.json();
          setCategory({
            ...data.category,
            subcategories: data.subcategories || data.category?.subcategories || []
          });
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to load category', e);
      } finally {
        setLoading(false);
      }
    }
    loadCategory();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 text-sm mt-3">Loading category details...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The category you requested does not exist or has been moved.</p>
        <Link to="/products" className="px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-bold">
          View All Products
        </Link>
      </div>
    );
  }

  const filteredProducts = selectedSubcat === 'all'
    ? products
    : products.filter(p => p.subcategoryId === selectedSubcat);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`${category.name} Manufacturer & Supplier Gujarat`}
        description={category.description}
      />
      <Breadcrumbs 
        items={[
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/products/${category.slug}` }
        ]} 
      />

      {/* Category Banner */}
      <section className="relative bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300">
              Product Category
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              {category.name}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Subcategory Navigation & Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Subcategories Filter Pills */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Filter by Subcategory:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcat('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedSubcat === 'all'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All {category.name} ({products.length})
              </button>
              {category.subcategories.map(sub => {
                const count = products.filter(p => p.subcategoryId === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcat(sub.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      selectedSubcat === sub.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenQuote={onOpenQuote}
            />
          ))}
        </div>

        {/* Category Overview & Technical Advantage */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold font-heading text-slate-900 mb-4">
            Quality Assurance & Processing for {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            All {category.name} batches produced at our Gandhidham facility undergo strict multi-stage testing covering chemical assay, granulo-metric sieve distribution, and physical parameters. Consignments are packed under controlled atmospheric humidity and palletized for export via Kandla and Mundra ports.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onOpenQuote && onOpenQuote(category.name)}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition"
            >
              Request Bulk Quotation
            </button>
            <Link
              to="/manufacturing"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              View Gandhidham Plant Details
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

