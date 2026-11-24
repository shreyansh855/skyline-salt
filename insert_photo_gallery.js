const fs = require('fs');
const path = require('path');

// 1. UPDATE HOMEPAGE.JSX
const homePath = path.join(__dirname, 'client', 'src', 'pages', 'HomePage.jsx');
let homeContent = fs.readFileSync(homePath, 'utf8');

const galleryCode = `      {/* 6.5 REAL INDUSTRIAL DISPATCH & PACKAGING SHOWCASE */}
      <section className="py-16 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300 mb-2">
                Factory & Logistics Visual Tour
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Real Manufacturing, Packaging & Global Export Operations
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                Direct glimpses from our Gandhidham manufacturing plant, custom multi-layer bag packaging line, and daily containerized maritime dispatches.
              </p>
            </div>
            <Link
              to="/manufacturing"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Full Plant Infrastructure &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Photo 1: Forklift Container Loading */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-forklift-loading.jpg" 
                  alt="Forklift Loading 1 MT Jumbo Bag of Skyline Industrial Salt" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-blue-600/90 text-white backdrop-blur-xs">
                  Active Dispatch
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition">
                  1 MT Jumbo Bag Container Loading
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Forklift loading 1,000 kg Grade-A Triple Refined Industrial Salt into 20ft ocean containers at Gandhidham yard.
                </p>
              </div>
            </div>

            {/* Photo 2: Container Filled with Jumbo Bags */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-container-jumbo.jpg" 
                  alt="Skyline Industrial Salt 1000 kg Grade-A Bags Ready for Export" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-amber-600/90 text-white backdrop-blur-xs">
                  FCL Export Order
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">
                  Skyline Branded Export Bags
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Heavy-duty UV-stabilized woven polypropylene bags stuffed for international maritime transit to GCC and Europe.
                </p>
              </div>
            </div>

            {/* Photo 3: Skyline Multi-Packaging Lineup */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-packaging-lineup.jpg" 
                  alt="Skyline Packaging Range (500g, 1kg, 25kg, 50kg Salt & Tablets)" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-emerald-600/90 text-white backdrop-blur-xs">
                  Packaging Standards
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
                  Comprehensive Bag & Retail Range
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  50kg Triple Refined Iodised, 25kg Softener Salt Tablets, and 1kg/500g consumer packets ready in warehouse.
                </p>
              </div>
            </div>

            {/* Photo 4: 50kg Bags Fully Stacked Container */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-container-stacked.jpg" 
                  alt="Palletized 50kg Salt Bags Stacked Inside Ocean Container" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-purple-600/90 text-white backdrop-blur-xs">
                  Full Container Load
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-purple-400 transition">
                  High-Density Container Packing
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  25 to 28 Metric Ton payload per container, systematically stacked to prevent cargo shifting during high-seas transit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED */}`;

if (!homeContent.includes('REAL INDUSTRIAL DISPATCH & PACKAGING SHOWCASE')) {
  homeContent = homeContent.replace('{/* 7. INDUSTRIES SERVED */}', galleryCode);
  fs.writeFileSync(homePath, homeContent, 'utf8');
  console.log('HomePage updated with 4-photo showcase gallery!');
} else {
  console.log('HomePage already has gallery.');
}

// 2. UPDATE MANUFACTURINGPAGE.JSX
const mfgPath = path.join(__dirname, 'client', 'src', 'pages', 'ManufacturingPage.jsx');
let mfgContent = fs.readFileSync(mfgPath, 'utf8');

// Replace generic unsplash image with real forklift loading photo
mfgContent = mfgContent.replace(
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  '/skyline-forklift-loading.jpg'
);

const mfgGalleryCode = `      {/* Real Live Factory & Packaging Operations Showcase */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 mb-2">
              On-Site Operational Photography
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Packaging, Warehousing & Export Stuffing at Gandhidham
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Authentic glimpses of our daily industrial packing, high-tonnage jumbo bag handling, and containerized dispatch operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/skyline-forklift-loading.jpg" alt="Forklift Container Loading" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              <div className="p-3.5">
                <div className="font-bold text-xs text-white">Direct Container Stuffing</div>
                <div className="text-[11px] text-slate-400">1 MT Jumbo Bags loaded via plant forklift.</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/skyline-container-jumbo.jpg" alt="Skyline Export Bags" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              <div className="p-3.5">
                <div className="font-bold text-xs text-white">Grade-A Export Jumbo Bags</div>
                <div className="text-[11px] text-slate-400">Official Skyline branded export consignment.</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/skyline-packaging-lineup.jpg" alt="Skyline Packaging Range" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              <div className="p-3.5">
                <div className="font-bold text-xs text-white">Multi-Tier Packaging Line</div>
                <div className="text-[11px] text-slate-400">50kg, 25kg tablets & 1kg retail pouches.</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/skyline-container-stacked.jpg" alt="Stacked 50kg Bags Container" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              <div className="p-3.5">
                <div className="font-bold text-xs text-white">FCL Container Palletization</div>
                <div className="text-[11px] text-slate-400">High-density ocean container packing.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Visit CTA */}`;

if (!mfgContent.includes('On-Site Operational Photography')) {
  mfgContent = mfgContent.replace('{/* Factory Visit CTA */}', mfgGalleryCode);
  fs.writeFileSync(mfgPath, mfgContent, 'utf8');
  console.log('ManufacturingPage updated with real photographs!');
} else {
  console.log('ManufacturingPage already updated.');
}

