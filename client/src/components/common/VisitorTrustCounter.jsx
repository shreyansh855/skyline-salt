import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, Users, ChevronUp, ChevronDown, CheckCircle2, Award, Clock } from 'lucide-react';

const recentInquiries = [
  { location: "Dubai, UAE", product: "API 13A Section 9 Drilling Bentonite", time: "2 mins ago" },
  { location: "Mundra, Gujarat", product: "PDV Industrial Vacuum Salt (50 MT)", time: "4 mins ago" },
  { location: "Ho Chi Minh City, Vietnam", product: "Kaolin Clay Extruded Noodles", time: "7 mins ago" },
  { location: "Riyadh, Saudi Arabia", product: "High Hardness Tablet Salt (Water Softener)", time: "11 mins ago" },
  { location: "Morbi, Gujarat", product: "China Clay Noodles (Sanitaryware Grade)", time: "15 mins ago" },
  { location: "Mombasa, Kenya", product: "Refined Free Flow Iodized Salt", time: "18 mins ago" }
];

export default function VisitorTrustCounter() {
  const [visitorCount, setVisitorCount] = useState(10854);
  const [activeNow, setActiveNow] = useState(19);
  const [minimized, setMinimized] = useState(false);
  const [currentInquiryIdx, setCurrentInquiryIdx] = useState(0);
  const [showInquiryToast, setShowInquiryToast] = useState(true);

  useEffect(() => {
    // Generate realistic counter increment over time
    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => prev + 1);
    }, 28000); // increments every 28 seconds

    // Jitter active visitors slightly between 16 and 24
    const activeInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      setActiveNow(prev => Math.min(26, Math.max(15, prev + delta)));
    }, 12000);

    // Rotate recent inquiry notifications
    const inquiryInterval = setInterval(() => {
      setCurrentInquiryIdx(prev => (prev + 1) % recentInquiries.length);
      setShowInquiryToast(true);
      setTimeout(() => setShowInquiryToast(false), 8000);
    }, 18000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(activeInterval);
      clearInterval(inquiryInterval);
    };
  }, []);

  const currentInquiry = recentInquiries[currentInquiryIdx];

  if (minimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 bg-slate-950/90 text-white px-3 py-2 rounded-full border border-blue-500/40 shadow-xl backdrop-blur-md hover:bg-slate-900 transition text-xs font-semibold"
          title="Click to view visitor analytics"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold text-amber-400">10,000+ Visits</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[340px] sm:max-w-[380px] animate-fade-in select-none">
      
      {/* Live Inquiry Toast Bubble */}
      {showInquiryToast && (
        <div className="mb-2 p-2.5 rounded-2xl bg-white/95 border border-sky-200 shadow-xl backdrop-blur-md text-xs flex items-center gap-2.5 animate-slide-up">
          <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-slate-900 truncate">
              Inquiry from {currentInquiry.location}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {currentInquiry.product} • <span className="text-sky-600 font-semibold">{currentInquiry.time}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Trust Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white rounded-2xl border border-slate-700/80 shadow-2xl p-3.5 backdrop-blur-lg">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Industrial Manufacturer</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-950 border border-sky-400/50 text-sky-200">
              Est. 2011
            </span>
            <button
              onClick={() => setMinimized(true)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition"
              title="Minimize badge"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Counter & Active Row */}
        <div className="pt-2.5 grid grid-cols-2 gap-2">
          {/* Total Visits Counter */}
          <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Global B2B Visits</span>
            </div>
            <div className="text-lg font-black font-heading text-white tracking-tight flex items-center gap-1">
              <span>{visitorCount.toLocaleString()}+</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              ✓ 10,000+ Milestone
            </div>
          </div>

          {/* Active Now */}
          <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Active Buyers Now</span>
            </div>
            <div className="text-lg font-black font-heading text-emerald-400 tracking-tight">
              {activeNow} Active
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Across 50+ Countries
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>Serving Global Salt & Minerals Market Since 2011</span>
          <span className="font-bold text-amber-400">15+ Yrs</span>
        </div>
      </div>
    </div>
  );
}

