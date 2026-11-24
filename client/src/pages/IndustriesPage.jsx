import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Factory, FlaskConical, Droplet, Layers, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

const industriesData = [
  {
    id: "chlor-alkali",
    title: "Chlor-Alkali & Basic Chemicals",
    image: "/skyline-solar-salt-mountains.jpg",
    description: "The chemical sector requires ultra-high purity sodium chloride with near-zero calcium, magnesium, and sulfate levels to prevent cathode membrane fouling and reduce brine purification sludge.",
    products: [
      { name: "Industrial Sodium Chloride (99.5%+)", slug: "industrial-sodium-chloride", cat: "industrial-salt" },
      { name: "PDV Salt (Pure Dried Vacuum)", slug: "pdv-salt", cat: "industrial-salt" },
      { name: "Low Hardness Salt (Ca/Mg < 0.08%)", slug: "low-hardness-salt", cat: "industrial-salt" }
    ],
    benefits: [
      "Low calcium & magnesium (< 0.10%) extending electrolysis membrane cell life",
      "Minimal brine sludge generation lowering effluent handling costs",
      "High bulk dissolution rate for continuous saturated brine generation"
    ]
  },
  {
    id: "oilfield-drilling",
    title: "Oilfield & Geothermal Drilling",
    image: "/uploads/kbc-api-bentonite-1.jpg",
    description: "Deep well drilling operations depend on API 13A high-yield sodium bentonite for borehole stabilization, cuttings suspension, and fluid loss control under severe downhole temperatures.",
    products: [
      { name: "API Bentonite (API 13A Spec)", slug: "api-bentonite", cat: "bentonite" },
      { name: "Oil Drilling Bentonite", slug: "oil-drilling-bentonite", cat: "bentonite" },
      { name: "HDD Bentonite", slug: "hdd-bentonite", cat: "bentonite" }
    ],
    benefits: [
      "Complies with American Petroleum Institute (API) Spec 13A Section 9 & 11",
      "High yield point & thixotropic gel strength for effective hole cleaning",
      "Forms thin, impermeable filter cake preventing formation damage"
    ]
  },
  {
    id: "ceramics-sanitaryware",
    title: "Ceramics, Tiles & Sanitaryware",
    image: "/uploads/shyam-china-clay-noodles.webp",
    description: "Vitrified tiles, porcelain tableware, and vitreous sanitaryware demand high alumina, low-iron kaolin clays for superior plasticity, dry green strength, and high firing whiteness.",
    products: [
      { name: "China Clay Noodles (Extruded)", slug: "china-clay-noodles", cat: "china-clay" },
      { name: "China Clay Powder (300-500 Mesh)", slug: "china-clay-powder", cat: "china-clay" },
      { name: "Levigated China Clay", slug: "levigated-china-clay", cat: "china-clay" }
    ],
    benefits: [
      "Alumina content (Al2O3) up to 36-38% with low Fe2O3 (< 0.8%)",
      "Extruded noodle format dissolves rapidly in ball mills with zero dusting",
      "High fired brightness (82-88% GE at 1220°C) with broad vitrification range"
    ]
  },
  {
    id: "foundry-metal-casting",
    title: "Foundry & Metal Casting",
    image: "/uploads/kbc-foundry-bentonite-1.png",
    description: "Automotive ductile iron, gray iron, and steel casting foundries rely on high thermal durability sodium bentonite binders and pre-mixed ramming mass for induction furnace crucibles.",
    products: [
      { name: "Foundry Bentonite", slug: "foundry-bentonite", cat: "bentonite" },
      { name: "Refractory Bentonite", slug: "refractory-bentonite", cat: "bentonite" },
      { name: "Premix Acidic Ramming Mass", slug: "premix-ramming-mass", cat: "other-minerals" }
    ],
    benefits: [
      "High Green Compression Strength (GCS > 11 N/cm²) and Wet Tensile Strength",
      "Withstands molten metal thermal shock up to 1450°C without scabbing",
      "Optimized bonding matrix delivers 120-160 heat furnace campaigns"
    ]
  },
  {
    id: "paints-coatings",
    title: "Paints, Coatings & Inks",
    image: "/uploads/shyam-calcined-kaolin.webp",
    description: "High-whiteness calcined kaolin (92+ GE) and washed china clay act as premier titanium dioxide (TiO2) extenders, improving dry film opacity, scrub resistance, and rheology.",
    products: [
      { name: "Calcined Kaolin Powder (92+ GE)", slug: "calcined-kaolin-powder", cat: "kaolin" },
      { name: "Hydrous Kaolin Clay", slug: "hydrous-kaolin-clay", cat: "kaolin" },
      { name: "Kaolin Clay Powder", slug: "kaolin-clay-powder", cat: "kaolin" }
    ],
    benefits: [
      "Enables 20% to 30% substitution of expensive Titanium Dioxide (TiO2)",
      "High brightness (90-93% GE) with platy lamellar morphology",
      "Enhances film hardness, touch-up performance, and brush leveling"
    ]
  },
  {
    id: "water-softening",
    title: "Water Softening & Treatment",
    image: "/uploads/skc-tablet-salt.png",
    description: "Industrial boilers, commercial laundry facilities, and municipal softening systems require high-density, anti-mushing tablet salt for optimal cation resin regeneration.",
    products: [
      { name: "Salt Tablets (Water Softener Tablets)", slug: "salt-tablets", cat: "industrial-salt" },
      { name: "Water Softener Salt (Granular & Crystal)", slug: "water-softener-salt", cat: "industrial-salt" },
      { name: "PDV Salt (Pure Dried Vacuum)", slug: "pdv-salt", cat: "industrial-salt" }
    ],
    benefits: [
      "Compressed at extreme hydraulic pressure to prevent brine tank mushing",
      "99.8% pure sodium chloride leaving zero residue in brine reservoirs",
      "Controlled dissolution ensuring 100% saturated brine regeneration"
    ]
  },
  {
    id: "food-processing",
    title: "Food Processing, Bakeries & Consumer Salt",
    image: "/uploads/skc-edible-salt-table.jpg",
    description: "Food manufacturing, packaged snack foods, dairy processing, and bakeries require food-grade, vacuum-refined, micro-pulverized, or iodized salts meeting stringent FSSAI and Halal standards.",
    products: [
      { name: "Triple Refined Salt", slug: "triple-refined-salt", cat: "edible-salt" },
      { name: "Free Flow Iodized Salt", slug: "free-flow-iodized-salt", cat: "edible-salt" },
      { name: "Marine Salt (Ocean Sea Salt)", slug: "marine-salt", cat: "edible-salt" }
    ],
    benefits: [
      "FSSAI, Halal, and ISO certified food-grade purity with 99.5%+ NaCl",
      "Ultra-low heavy metals (lead, arsenic, mercury < 0.1 ppm)",
      "Controlled particle sizing for uniform blending in snack foods and seasonings"
    ]
  },
  {
    id: "construction-piling",
    title: "Construction, Civil Infrastructure & Piling",
    image: "/uploads/kbc-piling-bentonite-1.png",
    description: "Deep foundation engineering, diaphragm walls, micro-tunnelling, and environmental barrier systems depend on sodium bentonite slurries for trench stability and soil impermeability.",
    products: [
      { name: "Piling Bentonite", slug: "piling-bentonite", cat: "bentonite" },
      { name: "Micro Tunnelling Bentonite", slug: "micro-tunnelling-bentonite", cat: "bentonite" },
      { name: "GCL Bentonite (Geosynthetic Clay Liners)", slug: "gcl-bentonite", cat: "bentonite" }
    ],
    benefits: [
      "Rapid hydration and high viscosity preventing trench collapse in soft soils",
      "Forms impermeable low-hydraulic conductivity barrier for cutoff walls",
      "Superior slurry reusability through desanding and reconditioning cycles"
    ]
  }
];

export default function IndustriesPage({ onOpenQuote }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Industries Served | Chemicals, Drilling, Ceramics, Food & Construction"
        description="Skyline Salt and Minerals supplies specialized salts and minerals to Chlor-Alkali chemicals, oilfield drilling, foundries, ceramics, paints, food processing, and civil construction."
      />
      <Breadcrumbs items={[{ label: 'Industries Served', href: '/industries' }]} />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300">
              Applications & Sectors
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Industries Powered by Skyline Minerals
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From heavy petrochemical drilling and chlor-alkali synthesis to fine ceramics, civil engineering, and food processing, we supply tailored mineral grades engineered for maximum manufacturing efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Industries List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {industriesData.map((ind) => (
          <div 
            key={ind.id}
            id={ind.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-md">
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/skyline-solar-salt-mountains.jpg";
                  }}
                />
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Target Sector
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">
                  {ind.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ind.description}
                </p>

                {/* Key Benefits */}
                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Performance Advantages:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {ind.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Supplied Products */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-900">Supplied Products:</span>
                  {ind.products.map((p, pIdx) => (
                    <Link
                      key={pIdx}
                      to={`/products/${p.cat}/${p.slug}`}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60 transition flex items-center gap-1"
                    >
                      <span>{p.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                  <button
                    onClick={() => onOpenQuote && onOpenQuote(ind.title)}
                    className="ml-auto px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shadow-sm"
                  >
                    Get Sector Quotation
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
