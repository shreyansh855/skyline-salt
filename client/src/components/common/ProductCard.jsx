import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2, Layers } from 'lucide-react';

export default function ProductCard({ product, onOpenQuote }) {
  if (!product) return null;

  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/skyline-solar-salt-mountains.jpg';

  const categoryName = product.categorySlug 
    ? product.categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Mineral';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-blue-900 shadow-sm backdrop-blur-sm">
            {categoryName}
          </span>
        </div>

        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        <Link 
          to={`/products/${product.categorySlug}/${product.slug}`}
          className="hover:text-blue-700 transition"
        >
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-2 line-clamp-1 group-hover:text-blue-700">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 flex-1">
          {product.shortDescription || product.description}
        </p>

        {/* Grades Pill Tags */}
        {product.grades && product.grades.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-600" />
              <span>Available Grades</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.grades.slice(0, 2).map((grade, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium truncate max-w-[200px]"
                >
                  {grade}
                </span>
              ))}
              {product.grades.length > 2 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-semibold">
                  +{product.grades.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <Link
            to={`/products/${product.categorySlug}/${product.slug}`}
            className="text-xs font-semibold text-blue-800 hover:text-blue-950 flex items-center gap-1 transition"
          >
            <span>Technical Specs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => onOpenQuote && onOpenQuote(product.name)}
            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold transition"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
}

