import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Factory, Globe2, CheckCircle2, 
  MapPin, Phone, Mail, ArrowRight, ExternalLink, Ship, Compass
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useSettings } from '../context/SettingsContext';

export default function AboutPage({ onOpenQuote }) {
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

  const about = content?.about || {
    story: "Established in 2011 in Gujarat's prolific Kutch mineral corridor, Skyline Salt and Minerals has evolved over 15+ years into a premier integrated manufacturer and global exporter of high-grade salts and specialized industrial minerals. Operating modern processing hubs in Gandhidham and expansive extraction networks across Bhuj-Kutch, we blend geographical advantage with advanced refining technology.",
    mission: "To deliver consistently superior, laboratory-tested salt and mineral products that empower global industrial manufacturing, while adhering to sustainable mining practices and unmatched logistics reliability.",
    vision: "To be recognized globally as the most trusted and technically proficient industrial minerals partner from India, driving value through precision grading, customized formulations, and customer-first service."
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Us | Skyline Salt and Minerals | Manufacturing Facilities & Mining"
        description="Learn about Skyline Salt and Minerals: our captive Kutch salt works, mineral leases in Bhuj, modern refining plant in Gandhidham, and global export footprint."
      />
      <Breadcrumbs items={[{ label: 'About Us', href: '/about' }]} />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300">
              Company Overview & Heritage
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Integrated Mineral Mining & High-Purity Refining
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Operating at the intersection of abundant geological reserves in Kutch and advanced processing engineering in Gandhidham.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Heritage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              {/* Official Corporate Brand Card */}
              <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <img 
                  src="/skyline-emblem.png" 
                  alt="Skyline Salt & Minerals Emblem" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-sm hover:scale-105 transition-transform" 
                />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-2xl font-black font-heading tracking-tight text-slate-950">
                      SKYLINE
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-200">
                      Est. 2011
                    </span>
                  </div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-sky-700">
                    —  SALT & MINERALS  —
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    A Unit of Skyline Enterprises
                  </div>
                  <div className="text-xs font-serif italic text-blue-900 font-semibold pt-0.5">
                    “a way of exporting excellency”
                  </div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Pioneering the Kutch Mineral Belt
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {about.story}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The Kutch basin in Gujarat is uniquely endowed by nature with the world's most favorable climatological conditions for solar salt crystallization—long sunny dry periods, dry desert breezes, and high-salinity seawater—alongside deep sedimentary deposits of exceptional high-swelling montmorillonite bentonite and low-iron kaolinite clays.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Our Mission</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{about.mission}</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                  <h4 className="font-bold text-amber-950 text-sm mb-1">Our Vision</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{about.vision}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/skyline-sea-salt-crystallizers.jpg"
                  alt="Skyline Kutch Salt Harvesting"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 text-xs">
                <div className="font-bold text-sm text-amber-400 uppercase tracking-wider">
                  Corporate Registration & Verification
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Head Office:</span>
                    <span className="font-semibold text-white">Bhuj-Kutch, Gujarat</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Processing Plant:</span>
                    <span className="font-semibold text-white">Gandhidham, Kutch</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Annual Volume:</span>
                    <span className="font-semibold text-white">350,000+ MT</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Export Reach:</span>
                    <span className="font-semibold text-white">50+ Countries</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Infrastructure Pillars */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              The 4 Pillars of Skyline Quality
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              How our integrated supply chain delivers consistent value from the mine face to your plant silos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Direct Source Control", desc: "Captive coastal salt pans and verified Kutch mineral leases ensure absolute control over feed consistency.", icon: Compass },
              { title: "Gandhidham Refining Hub", desc: "Automated hydro-cyclone wash lines, fluidized bed dryers, and Raymond roller mills guarantee uniform specs.", icon: Factory },
              { title: "Batch Laboratory Testing", desc: "Every consignment is verified by XRF, AAS, and API rheology before Certificates of Analysis (COA) are released.", icon: ShieldCheck },
              { title: "Seaport Ocean Advantage", desc: "Located within 25km of Kandla Port and 60km of Mundra Port for swift breakbulk and container vessel sailings.", icon: Ship }
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 font-heading mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Addresses Card Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 text-center mb-10">
            Our Primary Operating Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bhuj Office */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-400 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-3">
                  <MapPin className="w-5 h-5" />
                  <span>Administrative Head Office (Bhuj)</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  {settings.officeAddress}
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div>Commercial administration, tender documentation, and domestic invoicing.</div>
                  <div>Office Hours: Mon - Sat, 9:00 AM - 7:30 PM IST</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={settings.officeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:${settings.phonePrimary}`}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-700"
                >
                  {settings.phonePrimary}
                </a>
              </div>
            </div>

            {/* Gandhidham Factory */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-3">
                  <Factory className="w-5 h-5" />
                  <span>Manufacturing & Quality Hub (Gandhidham)</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  {settings.factoryAddress}
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div>Salt washing refinery, bentonite roller mills, calcination units, and central testing laboratory.</div>
                  <div>Operational: 24/7 continuous industrial processing</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={settings.factoryMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:${settings.phoneSecondary}`}
                  className="text-xs font-semibold text-slate-700 hover:text-amber-700"
                >
                  {settings.phoneSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-14 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
            Looking for a Verified Salt & Mineral Supply Partner?
          </h3>
          <p className="text-blue-100 text-sm mb-6 max-w-xl mx-auto">
            Contact our technical team today for sample dispatches, batch test reports, and customized commercial tenders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow transition"
            >
              Request Commercial Quote
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

