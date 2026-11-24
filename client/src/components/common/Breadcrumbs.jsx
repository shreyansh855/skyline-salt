import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2">
        <Link to="/" className="flex items-center gap-1 hover:text-blue-700 transition">
          <Home className="w-4 h-4 text-slate-500" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast ? (
                <span className="font-semibold text-blue-900 truncate max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-blue-700 transition truncate max-w-xs">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

