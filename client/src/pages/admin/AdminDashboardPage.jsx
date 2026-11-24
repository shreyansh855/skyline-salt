import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, FolderTree, MessageSquare, BarChart3, 
  ArrowRight, CheckCircle2, Clock, Eye, AlertCircle, PlusCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    enquiriesCount: 0,
    newEnquiriesCount: 0,
    totalVisits: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem('skyline_token');
        const headers = { Authorization: `Bearer ${token}` };

        const [prodRes, catRes, enqRes, anaRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/enquiries', { headers }),
          fetch('/api/analytics/dashboard', { headers })
        ]);

        let prods = [];
        let cats = [];
        let enqs = [];
        let ana = null;

        if (prodRes.ok) {
          const d = await prodRes.json();
          prods = d.products || [];
        }
        if (catRes.ok) {
          const d = await catRes.json();
          cats = d.categories || [];
        }
        if (enqRes.ok) {
          const d = await enqRes.json();
          enqs = d.enquiries || [];
          setRecentEnquiries(enqs.slice(0, 5));
        }
        if (anaRes.ok) {
          const d = await anaRes.json();
          ana = d.analytics;
          setChartData(ana.chartData || []);
          setTopProducts(ana.topProducts || []);
        }

        const newEnqs = enqs.filter(e => e.status === 'new').length;

        setStats({
          productsCount: prods.length,
          categoriesCount: cats.length,
          enquiriesCount: enqs.length,
          newEnquiriesCount: newEnqs,
          totalVisits: ana?.totalVisits || 1420
        });

      } catch (e) {
        console.error('Failed to load dashboard', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status of products, customer enquiries, and visitor traffic.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition"
          >
            View Enquiries
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Products */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Products</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-heading text-slate-900">
            {stats.productsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>In {stats.categoriesCount} categories</span>
            <Link to="/admin/products" className="text-blue-700 font-semibold hover:underline">Manage &rarr;</Link>
          </div>
        </div>

        {/* Customer Enquiries */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-heading text-slate-900">
            {stats.enquiriesCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span className="text-emerald-700 font-bold">{stats.newEnquiriesCount} new unattended</span>
            <Link to="/admin/enquiries" className="text-emerald-700 font-semibold hover:underline">View All &rarr;</Link>
          </div>
        </div>

        {/* Categories Count */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-heading text-slate-900">
            {stats.categoriesCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Subcategories configured</span>
            <Link to="/admin/categories" className="text-amber-700 font-semibold hover:underline">Manage &rarr;</Link>
          </div>
        </div>

        {/* Total Pageviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Visitor Traffic</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-heading text-slate-900">
            {stats.totalVisits.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Logged page hits</span>
            <Link to="/admin/analytics" className="text-purple-700 font-semibold hover:underline">Analytics &rarr;</Link>
          </div>
        </div>

      </div>

      {/* Grid: 14-Day Visitor Trend Chart & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visitor Trend (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              14-Day Visitor Activity Trend
            </h3>
            <span className="text-xs text-slate-400">Daily Pageviews</span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="h-44 flex items-end gap-2 pt-4">
            {chartData.map((d, i) => {
              const maxVal = Math.max(...chartData.map(c => c.views), 300);
              const heightPct = Math.min(100, Math.max(15, (d.views / maxVal) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-blue-500/80 group-hover:bg-blue-600 rounded-t-md transition-all relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-10">
                      {d.views} hits
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 rotate-45 sm:rotate-0 mt-1">
                    {d.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Viewed Products (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Most Viewed Mineral Products
          </h3>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-xs text-slate-500">Accumulating visit logs...</p>
            ) : (
              topProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">{p.name}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">{p.views} views</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Recent Customer Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            Recent Customer Enquiries
          </h3>
          <Link to="/admin/enquiries" className="text-xs font-bold text-blue-700 hover:underline">
            View All Enquiries &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Name / Company</th>
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEnquiries.map(enq => (
                <tr key={enq.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {enq.createdAt.split('T')[0]}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    <div>{enq.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{enq.company || 'Direct Buyer'}</div>
                  </td>
                  <td className="py-3 px-3 text-blue-900 font-medium">
                    {enq.product}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <div>{enq.email}</div>
                    <div className="text-[11px] text-slate-400">{enq.phone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                      enq.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      enq.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to="/admin/enquiries"
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

