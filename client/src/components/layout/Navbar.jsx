import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Sparkles, Shield, ArrowRight,
  Compass, PhoneCall, Layers, ChevronRight, Building2, Factory
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

// 10 Industrial Salt products
const industrialSaltItems = [
  { name: "Sodium Chloride", slug: "industrial-sodium-chloride", desc: "99.5%+ NaCl for chlor-alkali & chemical synthesis" },
  { name: "Fine Salt", slug: "fine-salt", desc: "Precision micro-granulated industrial salt (99.8%)" },
  { name: "PDV Salt (Pure dried vacuum)", slug: "pdv-salt", desc: "Ultra-pure vacuum crystallized cubic salt" },
  { name: "Salt Tablets", slug: "salt-tablets", desc: "Compacted tablets for water softener regeneration" },
  { name: "Coarse Salt", slug: "coarse-salt", desc: "Natural large crystalline solar salt for leather & oilfields" },
  { name: "Mesh Salt", slug: "mesh-salt", desc: "Calibrated 20-40, 40-60, 60-80 mesh salt" },
  { name: "Non Iodized Salt", slug: "non-iodized-salt", desc: "Additive-free pure sodium chloride for chemical reactors" },
  { name: "Low Hardness Salt", slug: "low-hardness-salt", desc: "Total Ca+Mg <30 ppm for membrane electrolysis" },
  { name: "Washery Salt", slug: "washery-salt", desc: "Mechanically washed coastal solar salt for bulk plants" },
  { name: "Water Softener Salt", slug: "water-softener-salt", desc: "Granular & crystal grade for boiler & RO pre-treatment" }
];

// 12 Edible Salt products
const edibleSaltItems = [
  { name: "Raw Salt", slug: "raw-salt", desc: "100% natural solar evaporated sea salt rich in ocean minerals" },
  { name: "Refined Salt", slug: "refined-salt", desc: "99.2%+ pure white refined salt for commercial food processors" },
  { name: "Marine Salt", slug: "marine-salt", desc: "Authentic ocean sea salt with natural electrolytes" },
  { name: "Pure Salt", slug: "pure-salt", desc: "High-purity 99.7% food salt for infant formula & beverages" },
  { name: "Crystal Salt", slug: "crystal-salt", desc: "2.0-5.0mm natural sea crystals for grinders & pickling" },
  { name: "Free Flow Salt", slug: "free-flow-salt", desc: "Non-iodized free-flowing salt for snack dusting & blends" },
  { name: "Free Flow Iodized Salt", slug: "free-flow-iodized-salt", desc: "Household table salt fortified with iodine (15-30 ppm)" },
  { name: "Iodized Salt", slug: "iodized-salt", desc: "Granular fortified food salt for daily culinary nutrition" },
  { name: "Iodized Refined Salt", slug: "iodized-refined-salt", desc: "Flagship consumer salt with micro-encapsulated iodine" },
  { name: "Double Refined Salt", slug: "double-refined-salt", desc: "Dual-refined salt with ultra-low magnesium for bakeries" },
  { name: "Triple Refined Salt", slug: "triple-refined-salt", desc: "Ultra-pure vacuum refined salt with >96% whiteness" },
  { name: "Table Salt", slug: "table-salt", desc: "Dispenser-ready non-caking table salt for dining service" }
];

// 26 Bentonite Clay products
const bentoniteColumns = [
  {
    colTitle: "Drilling & Civil",
    items: [
      { name: "Bentonite Powder", slug: "bentonite-powder" },
      { name: "Sodium Bentonite", slug: "sodium-bentonite" },
      { name: "Calcium Bentonite", slug: "calcium-bentonite" },
      { name: "Oil Drilling Bentonite", slug: "oil-drilling-bentonite" },
      { name: "Drilling Bentonite", slug: "drilling-bentonite" },
      { name: "Piling Bentonite", slug: "piling-bentonite" },
      { name: "HDD Bentonite", slug: "hdd-bentonite" }
    ]
  },
  {
    colTitle: "Foundry & Industrial",
    items: [
      { name: "API Bentonite", slug: "api-bentonite" },
      { name: "Micro Tunnelling Bentonite", slug: "micro-tunnelling-bentonite" },
      { name: "Foundry Bentonite", slug: "foundry-bentonite" },
      { name: "Iron Ore Pelletization Bentonite", slug: "iron-ore-pelletization-bentonite" },
      { name: "Attapulgite", slug: "attapulgite-clay" },
      { name: "Refractory Bentonite", slug: "refractory-bentonite" },
      { name: "Ceramics Bentonite", slug: "ceramics-bentonite" }
    ]
  },
  {
    colTitle: "Agricultural & Technical",
    items: [
      { name: "Earthing Bentonite", slug: "earthing-bentonite" },
      { name: "Fertilizers Bentonite", slug: "fertilizers-bentonite" },
      { name: "Animal Feed Bentonite", slug: "animal-feed-bentonite" },
      { name: "Paper Bentonite", slug: "paper-bentonite" },
      { name: "Pond Sealing Bentonite", slug: "pond-sealing-bentonite" },
      { name: "Pharmaceutical Bentonite", slug: "pharmaceutical-bentonite" },
      { name: "Cosmetics Bentonite", slug: "cosmetics-bentonite" }
    ]
  },
  {
    colTitle: "Granules & Specialty",
    items: [
      { name: "Paints Bentonite", slug: "paints-bentonite" },
      { name: "GCL Bentonite", slug: "gcl-bentonite" },
      { name: "Bentonite Granules", slug: "bentonite-granules" },
      { name: "Desiccant Granules", slug: "desiccant-granules" },
      { name: "Cat Litter Bentonite", slug: "cat-litter-bentonite" }
    ]
  }
];

// China Clay & Kaolin products
const chinaClaySubItems = [
  { name: "China Clay Lumps", slug: "china-clay-lumps", desc: "35-38% Al2O3 natural white ceramic lumps" },
  { name: "China Clay Powder", slug: "china-clay-powder", desc: "300-500 mesh micro-pulverized kaolin" },
  { name: "China Clay Noodles", slug: "china-clay-noodles", desc: "36-39% Al2O3 levigated extruded noodles (<0.05% grit)" },
  { name: "Crude China Clay", slug: "crude-china-clay", desc: "Direct mine-run raw kaolin with high plasticity" },
  { name: "Levigated China Clay", slug: "levigated-china-clay", desc: "Hydro-washed beneficiated clay for casting slips" }
];

const kaolinSubItems = [
  { name: "Kaolin Clay Noodles", slug: "kaolin-clay-noodles", desc: "Refined extruded kaolin with >90% fired whiteness" },
  { name: "Kaolin Clay Powder", slug: "kaolin-clay-powder", desc: "Superfine 2-micron kaolin for paints & rubber" },
  { name: "Calcined Kaolin Powder", slug: "calcined-kaolin-powder", desc: "Anhydrous 90-93% GE brightness TiO2 extender" },
  { name: "Hydrous Kaolin Clay", slug: "hydrous-kaolin-clay", desc: "Ultra-fine water-washed kaolin for paper coating & inks" },
  { name: "Highly Reactive Metakaolin", slug: "reactive-metakaolin", desc: "Pozzolanic mineral for high-strength concrete" }
];

const refractoryMineralItems = [
  { name: "Refractory Clay", slug: "refractory-clay", desc: "High alumina fire clay withstanding up to 1730°C" },
  { name: "Premix Acidic Ramming Mass", slug: "premix-ramming-mass", desc: "High-grade acidic induction furnace refractory lining" },
  { name: "Industrial Gypsum Granules", slug: "industrial-gypsum-granules", desc: "Natural calcium sulfate for cement retardation" },
  { name: "Potassium & Sodium Feldspar", slug: "potassium-sodium-feldspar", desc: "Alkali flux mineral for ceramic vitrification" }
];

export default function Navbar({ onOpenQuote }) {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'industrial' | 'edible' | 'bentonite' | 'clays'
  const [mobileExpanded, setMobileExpanded] = useState({ 
    industrial: false, 
    edible: false, 
    bentonite: false, 
    chinaClay: false, 
    kaolin: false, 
    refractory: false 
  });

  const toggleMobileGroup = (group) => {
    setMobileExpanded(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const navClass = ({ isActive }) =>
    `font-semibold text-sm transition-colors py-2 whitespace-nowrap ${
      isActive 
        ? 'text-blue-700 font-bold' 
        : 'text-slate-700 hover:text-blue-700'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1680px] w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[76px] py-1">
          
          {/* Official Skyline Logo & Branding */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-2 xl:mr-4 py-1 cursor-pointer"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
              <img 
                src="/skyline-emblem.png" 
                alt="Skyline Salt & Minerals Official Emblem" 
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-lg sm:text-xl font-black font-heading tracking-tight text-slate-900 leading-none">
                SKYLINE
              </div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-900 leading-none mt-1">
                Salt & Minerals
              </div>
              <div className="text-[8px] sm:text-[8.5px] font-semibold text-slate-500 uppercase tracking-wide leading-none mt-0.5">
                A Unit of Skyline Enterprises
              </div>
              <div className="text-[9.5px] sm:text-[10px] font-serif italic text-sky-600 font-semibold tracking-normal leading-tight mt-0.5">
                a way of exporting excellency
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5">
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }`}
            >
              Home
            </NavLink>

            {/* About Us (with rich dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/about" 
                className={({ isActive }) => `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive || activeDropdown === 'about'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </NavLink>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1">
                    <Link
                      to="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 text-slate-800 hover:text-blue-700 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:text-white transition shadow-2xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Company Overview</div>
                        <div className="text-[11px] text-slate-500 font-normal">Heritage & Est. 2011 Story in Kutch</div>
                      </div>
                    </Link>

                    <Link
                      to="/manufacturing"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 text-slate-800 hover:text-amber-800 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition shadow-2xs">
                        <Factory className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-amber-800">Manufacturing & Plant</div>
                        <div className="text-[11px] text-slate-500 font-normal">Gandhidham Hub & Seaport QA Lab</div>
                      </div>
                    </Link>

                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50/80 text-slate-800 hover:text-sky-800 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition shadow-2xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-sky-800">Industries Served</div>
                        <div className="text-[11px] text-slate-500 font-normal">Oilfield, Chemicals, Food & Ceramics</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industrial Salt Dropdown (10 items) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('industrial')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/products/industrial-salt" 
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  activeDropdown === 'industrial'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }`}
              >
                <span>Industrial Salt</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'industrial' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {activeDropdown === 'industrial' && (
                <div className="absolute top-full left-0 w-[380px] pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 max-h-[80vh] overflow-y-auto">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 uppercase tracking-wider">
                      <span>Industrial Salt Portfolio</span>
                      <span className="text-[10px] text-blue-600 font-semibold">10 Products</span>
                    </div>
                    <div className="py-2 space-y-0.5">
                      {industrialSaltItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/products/industrial-salt/${item.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2 rounded-lg hover:bg-blue-50/80 border border-transparent hover:border-blue-100 transition flex items-center justify-between group/link text-slate-800"
                        >
                          <div>
                            <div className="font-semibold text-sm group-hover/link:text-blue-700 transition">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition" />
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-100 px-3">
                      <Link
                        to="/products/industrial-salt"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-between py-1"
                      >
                        <span>View All Industrial Salts &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Edible Salt Dropdown (12 items) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('edible')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/products/edible-salt" 
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  activeDropdown === 'edible'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }`}
              >
                <span>Edible Salt</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'edible' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {activeDropdown === 'edible' && (
                <div className="absolute top-full left-0 w-[390px] pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 max-h-[80vh] overflow-y-auto">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 uppercase tracking-wider">
                      <span>Edible Salt Portfolio</span>
                      <span className="text-[10px] text-blue-600 font-semibold">12 Products</span>
                    </div>
                    <div className="py-2 space-y-0.5">
                      {edibleSaltItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`/products/edible-salt/${item.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2 rounded-lg hover:bg-blue-50/80 border border-transparent hover:border-blue-100 transition flex items-center justify-between group/link text-slate-800"
                        >
                          <div>
                            <div className="font-semibold text-sm group-hover/link:text-blue-700 transition">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition" />
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-100 px-3">
                      <Link
                        to="/products/edible-salt"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-between py-1"
                      >
                        <span>View All Edible Salts &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bentonite Mega-Dropdown (26 items) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('bentonite')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/products/bentonite" 
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  activeDropdown === 'bentonite'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }`}
              >
                <span>Bentonite</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'bentonite' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {activeDropdown === 'bentonite' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5">
                    <div className="px-2 pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div className="font-bold text-blue-950 text-sm font-heading flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-700" />
                        <span>Bentonite Clay Portfolio (26 Specialized Mineral Grades)</span>
                      </div>
                      <Link 
                        to="/products/bentonite" 
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-blue-700 hover:underline"
                      >
                        View Full Bentonite Category &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-3">
                      {bentoniteColumns.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-1">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-50">
                            {col.colTitle}
                          </div>
                          {col.items.map((prod, pIdx) => (
                            <Link
                              key={pIdx}
                              to={`/products/bentonite/${prod.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-2 py-1.5 rounded-lg hover:bg-blue-50/80 text-xs font-medium text-slate-700 hover:text-blue-700 transition truncate"
                              title={prod.name}
                            >
                              • {prod.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* China Clay & Kaolin Mega-Dropdown (Skyline Industrial Minerals with subcategories) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('clays')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/products/china-clay" 
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  activeDropdown === 'clays'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }`}
              >
                <span>China Clay & Kaolin</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'clays' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {activeDropdown === 'clays' && (
                <div className="absolute top-full right-0 w-[780px] pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5">
                    <div className="px-2 pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div className="font-bold text-blue-950 text-sm font-heading flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-700" />
                        <span>China Clay & Kaolin Minerals Portfolio</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Direct Kutch Mining & Refining Hub</span>
                    </div>

                    <div className="grid grid-cols-3 gap-5 pt-3">
                      {/* Subcategory 1: China Clay (with sub-products) */}
                      <div className="space-y-1.5">
                        <Link 
                          to="/products/china-clay"
                          onClick={() => setActiveDropdown(null)}
                          className="font-bold text-xs uppercase tracking-wider text-blue-900 pb-1 border-b border-slate-100 flex items-center justify-between hover:text-blue-700"
                        >
                          <span>China Clay Portfolio</span>
                          <span className="text-[10px] text-blue-600 font-semibold">5 items &rarr;</span>
                        </Link>
                        {chinaClaySubItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={`/products/china-clay/${item.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2.5 py-1.5 rounded-lg hover:bg-blue-50/80 text-xs font-semibold text-slate-800 hover:text-blue-700 transition"
                          >
                            <div>{item.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal line-clamp-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>

                      {/* Subcategory 2: Kaolin Clay (with sub-products) */}
                      <div className="space-y-1.5">
                        <Link 
                          to="/products/kaolin"
                          onClick={() => setActiveDropdown(null)}
                          className="font-bold text-xs uppercase tracking-wider text-blue-900 pb-1 border-b border-slate-100 flex items-center justify-between hover:text-blue-700"
                        >
                          <span>Kaolin Clay Portfolio</span>
                          <span className="text-[10px] text-blue-600 font-semibold">5 items &rarr;</span>
                        </Link>
                        {kaolinSubItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={`/products/kaolin/${item.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2.5 py-1.5 rounded-lg hover:bg-blue-50/80 text-xs font-semibold text-slate-800 hover:text-blue-700 transition"
                          >
                            <div>{item.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal line-clamp-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>

                      {/* Subcategory 3: Refractory & Industrial Minerals */}
                      <div className="space-y-1.5">
                        <Link 
                          to="/products/other-minerals"
                          onClick={() => setActiveDropdown(null)}
                          className="font-bold text-xs uppercase tracking-wider text-blue-900 pb-1 border-b border-slate-100 flex items-center justify-between hover:text-blue-700"
                        >
                          <span>Refractory & Minerals</span>
                          <span className="text-[10px] text-blue-600 font-semibold">4 items &rarr;</span>
                        </Link>
                        {refractoryMineralItems.map((item, idx) => (
                          <Link
                            key={idx}
                            to={`/products/other-minerals/${item.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2.5 py-1.5 rounded-lg hover:bg-blue-50/80 text-xs font-semibold text-slate-800 hover:text-blue-700 transition"
                          >
                            <div>{item.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal line-clamp-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }`}
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Right Action: Get a Quote (Permanently prevented from truncation/congestion) */}
          <div className="hidden xl:flex items-center shrink-0 ml-2 xl:ml-3">
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs xl:text-sm shadow-md hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-bold shadow-sm"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-slate-800 hover:text-blue-700 border-b border-slate-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-slate-800 hover:text-blue-700 border-b border-slate-100"
          >
            About Us
          </NavLink>
          
          {/* Mobile: Industrial Salt */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('industrial')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>Industrial Salt (10 Products)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.industrial ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.industrial && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg">
                {industrialSaltItems.map((item, i) => (
                  <Link
                    key={i}
                    to={`/products/industrial-salt/${item.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Edible Salt */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('edible')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>Edible Salt (12 Products)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.edible ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.edible && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg">
                {edibleSaltItems.map((item, i) => (
                  <Link
                    key={i}
                    to={`/products/edible-salt/${item.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Bentonite (26 Products) */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('bentonite')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>Bentonite (26 Products)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.bentonite ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.bentonite && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg max-h-60 overflow-y-auto">
                {bentoniteColumns.flatMap(c => c.items).map((item, i) => (
                  <Link
                    key={i}
                    to={`/products/bentonite/${item.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: China Clay */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('chinaClay')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>China Clay (5 Products)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.chinaClay ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.chinaClay && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg">
                {chinaClaySubItems.map((c, i) => (
                  <Link
                    key={i}
                    to={`/products/china-clay/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Kaolin Clay */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('kaolin')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>Kaolin Clay (5 Products)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.kaolin ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.kaolin && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg">
                {kaolinSubItems.map((c, i) => (
                  <Link
                    key={i}
                    to={`/products/kaolin/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Refractory & Minerals */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleMobileGroup('refractory')}
              className="w-full flex items-center justify-between py-2 font-bold text-blue-900 text-left"
            >
              <span>Refractory & Industrial Minerals</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.refractory ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>
            {mobileExpanded.refractory && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/90 rounded-lg">
                {refractoryMineralItems.map((c, i) => (
                  <Link
                    key={i}
                    to={`/products/other-minerals/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-slate-700 hover:text-blue-700 py-1.5"
                  >
                    • {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-blue-700 border-b border-slate-100"
          >
            All Products (62+ Portfolio)
          </NavLink>

          <NavLink
            to="/manufacturing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-slate-800 hover:text-blue-700 border-b border-slate-100"
          >
            Manufacturing & Gandhidham Plant
          </NavLink>
          <NavLink
            to="/industries"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-slate-800 hover:text-blue-700 border-b border-slate-100"
          >
            Industries Served
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-slate-800 hover:text-blue-700"
          >
            Contact Us
          </NavLink>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-center shadow-md transition"
            >
              Request Factory Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
