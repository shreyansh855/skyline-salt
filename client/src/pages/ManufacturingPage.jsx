import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, Award, ShieldCheck, Microscope, Ship, Truck, 
  MapPin, ExternalLink, CheckCircle2, ChevronRight, Phone, Mail
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useSettings } from '../context/SettingsContext';

export default function ManufacturingPage({ onOpenQuote }) {
  const { settings } = useSettings();
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          setContent(data.content);
        }
      } catch (e) {}
    }
    loadContent();
  }, []);

  const mfg = content?.manufacturing || {
    overview: "Our primary manufacturing and processing facility at Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch is engineered for high-throughput, contamination-free processing of industrial salts, bentonite, and kaolin clays.",
    processingCapacity: "350,000 Metric Tons aggregate annual capacity with multi-line redundancy.",
    qualityLab: "Our on-site Quality Assurance Laboratory conducts real-time testing of every batch for moisture, chemical assay (NaCl, Al2O3, SiO2, Fe2O3), sieve residue, brightness (GE), swelling index, and API drilling rheology before dispatch certificates of analysis (COA) are issued."
  };

  const facilities = mfg.facilities || [
    {
      title: "Mechanical Salt Washing & Refining Unit",
      description: "Multi-stage hydro-cyclone brine washing plants with automated centrifuge dewatering and fluidized bed dryers producing 99.2% to 99.8% pure dry salts."
    },
    {
      title: "Bentonite Activation & Micronizing Complex",
      description: "Heavy-duty Raymond roller mills and high-efficiency air classifiers capable of producing API 13A drilling clays and foundry bentonite down to 300-500 mesh."
    },
    {
      title: "Kaolin Calcination & Extrusion Lines",
      description: "Precision temperature-controlled rotary calciner (operating at up to 1050°C) and automated clay noodle extrusion lines for ceramic and paint grade kaolin."
    },
    {
      title: "Automated Packaging & Container Stuffing Bay",
      description: "Automated valve sack filling, heat-sealing, 1 MT jumbo bag stations, and dedicated dry-container loading ramps minimizing transit handling."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Manufacturing & Gandhidham Plant | Quality Testing Lab | Skyline Minerals"
        description="Take an inside look at Skyline Salt and Minerals Gandhidham processing plant: mechanical salt washing, bentonite activation, calcination, and in-house QA lab."
      />
      <Breadcrumbs items={[{ label: 'Manufacturing & Plant', href: '/manufacturing' }]} />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              Infrastructure & Quality
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Gandhidham Manufacturing & Processing Complex
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Precision engineering, captive raw material feeds, and modern mineral refining infrastructure engineered to satisfy stringent global tolerances.
            </p>
          </div>
        </div>
      </section>

      {/* Plant Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Strategic Gandhidham Processing Hub
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {mfg.overview}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-blue-700" />
                  <span>Factory Address:</span>
                </div>
                <div className="font-semibold text-blue-900">{settings.factoryAddress}</div>
                <a
                  href={settings.factoryMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold hover:underline"
                >
                  <span>Open Gandhidham Factory in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With an annual aggregate production capacity exceeding <strong>{mfg.processingCapacity}</strong>, our facility maintains multi-line redundancy to fulfill seasonal international bulk purchase orders and long-term domestic chemical supply agreements without interruption.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/skyline-forklift-loading.jpg"
                  alt="Gandhidham Processing Facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-2xl font-black text-blue-900 font-heading">350,000+</div>
                  <div className="text-[11px] text-slate-600 font-medium">MT Annual Output</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="text-2xl font-black text-amber-900 font-heading">24 / 7</div>
                  <div className="text-[11px] text-slate-600 font-medium">Continuous Production</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Processing Units Grid */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Key Plant Machinery & Processing Lines
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Advanced mechanical refining, calcining, and precision classification systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Laboratory */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/skyline-salt-pans-pyramids.jpg"
                  alt="Skyline QA Lab"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                In-House Testing Facility
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Rigorous In-House Quality Assurance Laboratory
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {mfg.qualityLab}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "X-Ray Fluorescence (XRF) Assay",
                  "Atomic Absorption Spectrophotometry (AAS)",
                  "API RP 13B-1 Fann 35 Viscometers",
                  "API High Pressure High Temp Filter Press",
                  "Laser Particle Size Analyzer (d10/d50/d90)",
                  "ISO Reflectance Whiteness Meter (GE)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Port Logistics Advantage */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Strategic Seaport Logistics Proximity
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Our Gandhidham complex is situated at the logistical crossroads of India's two most critical international maritime gateways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Deendayal Port Authority</span>
                <span className="text-2xl font-black text-white font-heading">22 KM</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Kandla Port Terminal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialized in deep-draft bulk carrier vessel loading, full rake railway siding despatches, and breakbulk maritime shipments across the GCC, Africa, and Southeast Asia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Adani Ports & SEZ</span>
                <span className="text-2xl font-black text-white font-heading">64 KM</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Mundra Port Terminal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                India's largest commercial port with daily direct container vessel sailings to Europe, the Americas, and the Far East for fast palletized ocean freight.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* Real Live Factory & Packaging Operations Showcase */}
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

      {/* Factory Visit CTA */}
      <section className="py-14 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold font-heading mb-2">
            Schedule an Audit Visit to our Gandhidham Plant
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mb-6">
            We welcome technical audits and plant inspections from domestic and multinational industrial clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenQuote && onOpenQuote("Plant Visit / Audit Request")}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition"
            >
              Request Plant Visit
            </button>
            <a
              href={`tel:${settings.phonePrimary}`}
              className="px-6 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition"
            >
              Contact Plant Manager
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

