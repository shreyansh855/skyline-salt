import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Package, Layers, 
  FileSpreadsheet, Award, Download, Send, Phone, Mail, Share2, 
  Check, ExternalLink, Factory
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import { useSettings } from '../context/SettingsContext';

export default function ProductDetailPage({ onOpenQuote }) {
  const { categorySlug, productSlug } = useParams();
  const { settings } = useSettings();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productSlug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);

          // Fetch related products in category
          if (data.product.categorySlug) {
            const relRes = await fetch(`/api/products?category=${data.product.categorySlug}`);
            if (relRes.ok) {
              const relData = await relRes.json();
              setRelatedProducts((relData.products || []).filter(p => p.slug !== productSlug).slice(0, 4));
            }
          }
        }
      } catch (e) {
        console.error('Failed to load product', e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    setActiveImageIndex(0);
  }, [productSlug, categorySlug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 text-sm mt-3">Loading product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The requested product could not be located in our mineral database.</p>
        <Link to="/products" className="px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-bold">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const categoryName = product.categorySlug 
    ? product.categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Mineral';

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/skyline-solar-salt-mountains.jpg'];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SEO 
        title={product.seoTitle || `${product.name} Manufacturer & Supplier`}
        description={product.seoDescription || product.shortDescription}
        keywords={product.seoKeywords}
        productData={product}
      />

      <Breadcrumbs 
        items={[
          { label: 'Products', href: '/products' },
          { label: categoryName, href: `/products/${product.categorySlug}` },
          { label: product.name, href: `/products/${product.categorySlug}/${product.slug}` }
        ]} 
      />

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Product Images Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-blue-900 shadow-sm">
                    {categoryName}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Manufacturing Assurance Box */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-blue-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Quality Assurance & Compliance</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Manufactured and laboratory tested at our Gandhidham facility. Every shipment accompanied by verified Certificate of Analysis (COA) specifying batch assay.
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                    Skyline Salt and Minerals • Gandhidham
                  </span>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-semibold"
                    title="Share Product Link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Available Grades */}
                {product.grades && product.grades.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Available Grades & Formulations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.grades.map((grade, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packaging Information */}
                {product.packaging && product.packaging.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-amber-600" />
                      <span>Packaging & Dispatch Options</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-3">
                      {product.packaging.map((pack, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{pack}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Real Plant Packaging Photo Previews */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] relative group shadow-2xs">
                        <img src="/skyline-packaging-lineup.jpg" alt="Skyline Factory Packaging Range" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-950/80 text-white backdrop-blur-2xs">500g to 50kg Bags</span>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] relative group shadow-2xs">
                        <img src="/skyline-container-jumbo.jpg" alt="Skyline 1 MT Export Jumbo Bags" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-950/80 text-white backdrop-blur-2xs">1 MT Jumbo Bags</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Request Quote / Instant Phone */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenQuote && onOpenQuote(product.name)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get a Quote / Request TDS</span>
                  </button>

                  <a
                    href={`tel:${settings.phonePrimary}`}
                    className="py-3.5 px-6 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-700" />
                    <span>Call Sales Desk</span>
                  </a>
                </div>

                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-4">
                  <span>Direct Factory Supply from Gandhidham</span>
                  <span>•</span>
                  <span>Export Bulk Vessels & Containers</span>
                  <span>•</span>
                  <span>Free Samples on Request</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                Laboratory Analysis
              </div>
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Technical Specifications & Chemical Analysis
              </h2>
            </div>
            <button
              onClick={() => onOpenQuote && onOpenQuote(`${product.name} (TDS Request)`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-blue-700" />
              <span>Download Technical Data Sheet (TDS)</span>
            </button>
          </div>

          {/* Specifications Table */}
          {product.specifications && product.specifications.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-white text-xs uppercase font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Test Parameter</th>
                    <th className="py-3.5 px-5">Guaranteed Value / Specification</th>
                    <th className="py-3.5 px-5 hidden sm:table-cell">Standard Test Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/70 hover:bg-blue-50/40'}>
                      <td className="py-3.5 px-5 font-semibold text-slate-800">
                        {spec.parameter}
                      </td>
                      <td className="py-3.5 px-5 font-bold text-blue-900">
                        {spec.value}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 text-xs hidden sm:table-cell">
                        {spec.testMethod || 'Standard Analysis'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Standard specifications available on request. Please contact our laboratory desk.
            </p>
          )}

          <div className="mt-4 text-[11px] text-slate-500 italic">
            * Note: Values represent typical batch production parameters tested under controlled laboratory conditions. Custom purities and sizing available upon specific customer agreement.
          </div>
        </div>

        {/* Applications and Industries Served */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Applications */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>Applications & Functions</span>
            </h3>
            {product.applications && product.applications.length > 0 ? (
              <ul className="space-y-3">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Universal industrial mineral application.</p>
            )}
          </div>

          {/* Key Features & Benefits */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Key Features & Benefits</span>
            </h3>
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Manufactured under strict ISO 9001 quality guidelines.</p>
            )}
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Related Products in {categoryName}
              </h3>
              <Link 
                to={`/products/${product.categorySlug}`}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onOpenQuote={onOpenQuote}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

