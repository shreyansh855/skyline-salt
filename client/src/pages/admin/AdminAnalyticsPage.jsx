import React, { useState, useEffect } from 'react';
import { BarChart3, Smartphone, Monitor, Tablet, Globe, Eye, User } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('skyline_token');

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/analytics/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const d = await res.json();
          setAnalytics(d.analytics);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading || !analytics) {
    return <div className="p-8 text-center text-slate-500">Loading website analytics...</div>;
  }

  const { totalVisits, totalEnquiries, chartData, topProducts, devices, recentVisits } = analytics;

  const totalDev = (devices.Desktop || 0) + (devices.Mobile || 0) + (devices.Tablet || 0) || 1;
  const desktopPct = Math.round(((devices.Desktop || 0) / totalDev) * 100);
  const mobilePct = Math.round(((devices.Mobile || 0) / totalDev) * 100);

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
          Website Visitor Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real traffic logs, product interest metrics, and device breakdowns.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Logged Views
          </div>
          <div className="text-3xl font-black font-heading text-slate-900">
            {totalVisits.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Across all product & content pages</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Customer Inquiries
          </div>
          <div className="text-3xl font-black font-heading text-emerald-700">
            {totalEnquiries}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Conversion: {((totalEnquiries / (totalVisits || 1)) * 100).toFixed(1)}% of visits
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Device Distribution
          </div>
          <div className="flex items-center gap-4 text-xs font-bold mt-2">
            <span className="flex items-center gap-1 text-slate-700">
              <Monitor className="w-4 h-4 text-blue-700" />
              <span>{desktopPct}% Desktop</span>
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>{mobilePct}% Mobile</span>
            </span>
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 font-heading">
          Daily Pageview Volume (Past 14 Days)
        </h3>

        <div className="h-48 flex items-end gap-2 pt-4">
          {chartData.map((d, i) => {
            const maxVal = Math.max(...chartData.map(c => c.views), 250);
            const heightPct = Math.min(100, Math.max(15, (d.views / maxVal) * 100));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full bg-blue-600/85 group-hover:bg-blue-700 rounded-t-md transition-all relative"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-10">
                    {d.views} views
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

      {/* Recent Raw Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 font-heading">
          Recent Visitor Traffic Logs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Target Path</th>
                <th className="py-2.5 px-3">Referrer</th>
                <th className="py-2.5 px-3">Device Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentVisits.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                    {new Date(v.timestamp).toLocaleTimeString()} • {v.timestamp.split('T')[0]}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-900 font-semibold">
                    {v.path}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {v.referrer}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {v.deviceType}
                    </span>
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

