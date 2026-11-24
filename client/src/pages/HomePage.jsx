import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Factory, Award, Truck, CheckCircle2,
  Layers, Phone, Mail, MapPin, ChevronRight, Download, Send, Globe2,
  Sparkles, Sliders, ExternalLink, FlaskConical, Drill, Shapes,
  Flame, Palette, Droplets, Utensils, Building2, Clock, Check,
  Star, Users, Globe
} from 'lucide-react';
import SEO from '../components/common/SEO';
import ProductCard from '../components/common/ProductCard';
import EnquiryModal from '../components/common/EnquiryModal';
import { useSettings } from '../context/SettingsContext';

export default function HomePage({ onOpenQuote }) {
  const { settings } = useSettings();
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Background images for hero section
  const heroBackgrounds = [
    { id: 'solar-mountains', name: 'Solar Salt Mountains', url: '/skyline-solar-salt-mountains.jpg' },
    { id: 'crystallizers', name: 'Coastal Crystallizers', url: '/skyline-salt-pans-pyramids.jpg' },
    { id: 'operations', name: 'Packaging & Loading', url: '/skyline-forklift-loading.jpg' }
  ];
  const [activeHeroBg, setActiveHeroBg] = useState(heroBackgrounds[0].url);

  // Quick enquiry form state on homepage
  const [homeEnquiry, setHomeEnquiry] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: 'Refined Industrial Salt',
    message: ''
  });
  const [enquiryStatus, setEnquiryStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products?featured=true')
        ]);

        if (catRes.ok) {
          const cData = await catRes.json();
          setCategories(cData.categories || []);
        }
        if (prodRes.ok) {
          const pData = await prodRes.json();
          setPopularProducts(pData.products || []);
        }
      } catch (e) {
        console.error('Home data load error', e);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleHomeEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryStatus({ submitting: true, success: false, error: '' });
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homeEnquiry)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
      setEnquiryStatus({ submitting: false, success: true, error: '' });
      setHomeEnquiry({
        name: '',
        company: '',
        email: '',
        phone: '',
        product: 'Refined Industrial Salt',
        message: ''
      });
    } catch (err) {
      setEnquiryStatus({ submitting: false, success: false, error: err.message });
    }
  };

  const phone1 = settings.phonePrimary || "+91 73839 39786";
  const phone2 = settings.phoneSecondary || "+91 96871 36559";
  const emailInfo = settings.emailInfo || "Info@skylinesaltandminerals.com";

  // 6-step work process matching Aapas Group flow
  const workProcessSteps = [
    {
      step: "01",
      title: "Understanding Your Requirements",
      desc: "We begin by analyzing your exact industry application, chemical purity tolerances, mesh particle size, moisture threshold, and monthly volume needs to recommend the ideal mineral grade."
    },
    {
      step: "02",
      title: "Product Consultation & Customization",
      desc: "Based on your technical specifications, our mineral engineers prepare customized Technical Data Sheets (TDS) and dispatch complimentary trial samples for laboratory evaluation."
    },
    {
      step: "03",
      title: "In-House Quality Assurance & COA",
      desc: "Every production batch undergoes stringent testing in our Gandhidham laboratory for NaCl purity, insolubles, hardness, and swelling index, accompanied by an official COA."
    },
    {
      step: "04",
      title: "Multi-Format Packaging Solutions",
      desc: "We offer flexible, export-ready packaging: 25 kg & 50 kg HDPE bags with moisture-proof liners, 1 MT / 1.25 MT UV-treated Jumbo Bags, or OEM private labeling."
    },
    {
      step: "05",
      title: "Port Logistics & Timely Dispatch",
      desc: "Located 22 km from Kandla Port and 60 km from Mundra Port, we handle factory container stuffing, customs clearance, fumigation, and prompt vessel loading."
    },
    {
      step: "06",
      title: "Long-Term Global Partnership",
      desc: "Beyond single shipments, we build lasting partnerships through guaranteed safety buffer stocks, transparent communication, and consistent contract pricing."
    }
  ];

  // 4 Core Mineral Pillars matching Aapas Group structure + our specialized salt strengths
  const coreProducts = [
    {
      title: "Industrial Salt",
      image: "/skyline-forklift-loading.jpg",
      purity: "Up to 99.8% NaCl",
      grades: "Pure Dried Vacuum (PDV), Micro-Fine, Compacted Tablets, Coarse Solar Crystals",
      applications: "Chlor-Alkali & Chemical Synthesis, Water Softening, Textile Dyeing, Leather Tanning, Oilfield Drilling, De-Icing",
      link: "/category/industrial-salt"
    },
    {
      title: "Edible Salt",
      image: "/skyline-packaging-lineup.jpg",
      purity: "> 99.5% NaCl | >96% Whiteness",
      grades: "Triple Refined Iodized, Double Refined, Free Flow Non-Iodized, Natural Sea Crystals",
      applications: "Food Processing Plants, Commercial Bakeries, Confectionery, Dairy & Cheese, Institutional & Household Dining",
      link: "/category/edible-salt"
    },
    {
      title: "Bentonite Clay",
      image: "/uploads/kbc-api-bentonite-1.jpg",
      purity: "Swelling Index 25-35+ ml/2g (IS / API Spec 13A)",
      grades: "API 13A Drilling Grade, Foundry Bentonite, HDD Boring Grade, Activated Calcium & Sodium",
      applications: "Oil & Gas Drilling Mud, Green Sand Foundry Casting, Civil Diaphragm Walls, HDD Micro-Tunnelling, GCL Waterproofing",
      link: "/category/bentonite"
    },
    {
      title: "China Clay (Kaolin)",
      image: "/uploads/shyam-calcined-kaolin.webp",
      purity: "Brightness 80-92+ GEB | Al2O3 35-39%",
      grades: "Calcined Kaolin (92+ GE), Levigated Extruded Noodles, 300-500 Mesh Micro Powder, Crude Lumps",
      applications: "Ceramic Tiles & Sanitaryware, Paper Coating & Filler, Architectural Paints, Rubber Compounding, Refractories",
      link: "/category/china-clay-kaolin"
    }
  ];

  // 4 Core Services matching Aapas Group
  const services = [
    {
      icon: Layers,
      title: "Industrial Minerals Supply",
      desc: "Reliable sourcing and refining of premium-grade solar salt, edible salt, bentonite clay, and china clay for domestic and global export markets, customized from coarse lumps to 2-micron powder."
    },
    {
      icon: Globe2,
      title: "Export & Global Maritime Supply",
      desc: "Seamless international shipping solutions with complete documentation (COA, BL, Certificate of Origin, Fumigation) with 20ft/40ft FCL containerized and breakbulk vessel dispatches via Kandla & Mundra ports."
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance & Laboratory Assay",
      desc: "Continuous quality verification in our Gandhidham laboratory meeting ISO 9001:2015 and API Spec 13A standards. Purity checks, moisture control, particle sizer analysis, and certified COA with every batch."
    },
    {
      icon: Award,
      title: "Industry Applications Support",
      desc: "Technical consultation from experienced chemical and mineral engineers. Custom formulation, specialized mesh classification, and complimentary sample dispatches worldwide for plant trial runs."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Skyline Salt and Minerals | Precision-Refined Salts & Engineered Minerals Manufacturer"
        description="Premier manufacturer of Refined Industrial Salt, Edible Salt, API Drilling Bentonite, Ceramic China Clay, and Calcined Kaolin from Gandhidham and Bhuj-Kutch, Gujarat."
      />

      {/* 1. HERO SECTION (With Full-Width Authentic Background Photo Behind Text) */}
      <section 
        className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center text-white overflow-hidden bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${activeHeroBg})`,
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Dark left-to-right gradient overlay matching Aapas style: ensures crisp text legibility while displaying the real salt works */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/30 sm:via-slate-950/75 sm:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30"></div>

        {/* Hero Content positioned directly over background */}
        <div className="relative max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Small Amber/Gold Subtitle matching screenshot */}
            <div className="text-amber-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm font-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>SKYLINE Salt and Minerals Pvt. Ltd.</span>
            </div>

            {/* Big H1 Title matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black font-heading tracking-tight text-white leading-[1.12]">
              Precision-Grade Industrial Minerals for Demanding Applications
            </h1>

            {/* Description Paragraph matching screenshot phrasing */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Skyline Salt and Minerals Private Limited is a trusted supplier of Industrial Salt, Bentonite, and China Clay — serving manufacturers, processors, and exporters with consistent quality and reliable supply chains.
            </p>

            {/* Dual Pill Action Buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/products"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenQuote && onOpenQuote()}
                className="px-8 py-4 rounded-full bg-transparent hover:bg-amber-400/10 text-white hover:text-amber-300 border-2 border-amber-400/90 hover:border-amber-400 font-extrabold text-sm sm:text-base transition-all backdrop-blur-xs flex items-center gap-2"
              >
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Verified Trust Badges */}
            <div className="pt-8 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">API Spec 13A Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">Gandhidham Plant & QA Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">Kandla (22km) & Mundra (60km) Seaports</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Floating Background Image Switcher (Bottom Right of Hero) */}
        <div className="hidden sm:flex absolute bottom-6 right-8 z-20 items-center gap-1.5 bg-slate-950/80 border border-slate-700/80 p-1.5 rounded-full backdrop-blur-md text-[11px] text-slate-300 shadow-2xl">
          <span className="text-slate-400 text-[10px] uppercase font-bold pl-2 pr-1">BG Views:</span>
          {heroBackgrounds.map(bg => (
            <button
              key={bg.id}
              onClick={() => setActiveHeroBg(bg.url)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                activeHeroBg === bg.url 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US / STATS & GLOBAL VISITS (Exact Reference Image 2 Style) */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Decorative Dash Line matching reference screenshot */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <span className="w-3.5 h-0.5 bg-blue-700/80 rounded-full"></span>
            <span className="w-8 h-0.5 bg-blue-700 rounded-full"></span>
            <span className="w-3.5 h-0.5 bg-blue-700/80 rounded-full"></span>
          </div>

          {/* Section Heading matching reference screenshot */}
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-blue-950 tracking-tight mb-10 sm:mb-12">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
            
            {/* Stat 1: 15+ Year Experience */}
            <div className="space-y-2 flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-blue-700 text-blue-700" />
              </div>
              <div className="text-4xl sm:text-5xl font-black font-heading text-blue-950 tracking-tight">
                15<span className="text-blue-700 font-bold">+</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
                Year Experience
              </div>
            </div>

            {/* Stat 2: 10,000+ Global Visits & Customers */}
            <div className="space-y-2 flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-700" />
              </div>
              <div className="text-4xl sm:text-5xl font-black font-heading text-blue-950 tracking-tight">
                10,000<span className="text-blue-700 font-bold">+</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
                Global Visits & Customers
              </div>
            </div>

            {/* Stat 3: 50+ Country We Provide Service */}
            <div className="space-y-2 flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-blue-700" />
              </div>
              <div className="text-4xl sm:text-5xl font-black font-heading text-blue-950 tracking-tight">
                50<span className="text-blue-700 font-bold">+</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
                Country We Provide Service
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. ABOUT US SECTION (Aapas Group Inspired Structure) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Real Crystallizer Pans Photo with Badge (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 group">
                <img 
                  src="/skyline-sea-salt-crystallizers.jpg" 
                  alt="Skyline Coastal Sea Salt Crystallizers by the Ocean" 
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Floating Experience Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Est. 2011 • Captive Mines & Refining Hub</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm font-bold font-heading">
                    Kutch Coastal Salt Crystallizers
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Geometric seawater evaporation pans yielding premium raw solar sea salt.
                  </div>
                </div>
              </div>

              {/* Quick Facility Indicators Below Photo */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                  <span className="text-[10px] font-bold text-sky-700 uppercase block">Head Office</span>
                  <span className="font-semibold text-slate-800">Plot 92, Bhuj-Kutch</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                  <span className="text-[10px] font-bold text-amber-600 uppercase block">Refinery & Plant</span>
                  <span className="font-semibold text-slate-800">Jawahar Nagar, Gandhidham</span>
                </div>
              </div>
            </div>

            {/* Right: About Company Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                <span>About Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                Trusted Industrial Mineral & Refined Salt Supplier
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong>Skyline Salt and Minerals</strong> was founded in 2011 with a vision to bridge the gap between natural mineral resources and exacting industrial specifications. Rooted in Gujarat — one of India’s foremost mineral corridors — we supply premium-grade Industrial Salt, Edible Salt, Bentonite, and China Clay with an uncompromising focus on chemical purity, particle consistency, large-scale availability, and reliable supply chains.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We partner with chemical manufacturing conglomerates, chlor-alkali producers, ceramic tile & sanitaryware manufacturers, deepwater drilling contractors, foundries, and international trading houses. Our commitment goes beyond supplying raw materials — we engineer long-term industrial reliability through quality verification and dependable seaport logistics.
              </p>

              {/* Checklist Matching Aapas Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Captive Coastal Salt Works & Mineral Leases
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Modern Hydro-Washing & Sifting Technology
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    In-House Quality Laboratory & Batch COA
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Seamless FCL & Breakbulk Maritime Exports
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-xs"
                >
                  <span>Learn More About Skyline</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/manufacturing"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                >
                  <span>Gandhidham Factory & QA Lab</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR CORE PRODUCTS (Aapas Group Inspired 4 Pillars) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              <span>Our Core Products</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Premium Minerals for Industrial Excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Precision-grade mineral raw materials engineered to exacting chemical purities, swelling indices, and particle gradations for domestic and international manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreProducts.map((prod, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
              >
                {/* Product Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block mb-0.5">
                      Flagship Division
                    </span>
                    <h3 className="text-xl font-bold font-heading text-white">
                      {prod.title}
                    </h3>
                  </div>
                </div>

                {/* Product Details matching Aapas specs layout */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Key Technical Spec */}
                    <div className="p-2.5 rounded-lg bg-sky-50/70 border border-sky-100 text-xs">
                      <span className="font-bold text-sky-900 block text-[11px] uppercase tracking-wider">
                        Key Specification:
                      </span>
                      <span className="font-semibold text-sky-700">
                        {prod.purity}
                      </span>
                    </div>

                    {/* Applications */}
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                        Key Applications:
                      </span>
                      <p className="text-slate-600 leading-relaxed line-clamp-3">
                        {prod.applications}
                      </p>
                    </div>

                    {/* Available Grades */}
                    <div className="text-xs space-y-1 pt-1 border-t border-slate-100">
                      <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                        Available Grades:
                      </span>
                      <p className="text-slate-500 leading-relaxed text-[11px]">
                        {prod.grades}
                      </p>
                    </div>
                  </div>

                  {/* View Products CTA */}
                  <div className="pt-2">
                    <Link
                      to={prod.link}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-sky-600 hover:text-white border border-slate-200 hover:border-transparent text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 group-hover:border-sky-600 shadow-2xs"
                    >
                      <span>Explore {prod.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Complete 62+ Product Catalog Link */}
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>View Full 62+ Product Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES (Aapas Group Inspired Section) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Reliable Mineral Supply. Trusted Quality.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              From captive harvesting and high-precision Gandhidham refining to export-grade packaging and global vessel logistics, we deliver end-to-end industrial mineral solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-2xs">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 mb-3 group-hover:text-sky-700 transition">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onOpenQuote && onOpenQuote(srv.title)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 transition flex items-center gap-1.5"
                    >
                      <span>Inquire Technical Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WORK PROCESS (Aapas Group Inspired 6-Step Workflow) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>Work Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Structured 6-Step Fulfillment Workflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              A transparent, quality-controlled execution model guaranteeing exact chemical compliance and timely delivery from first inquiry to port discharge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workProcessSteps.map((stepItem, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-sky-600/40 group-hover:text-sky-600 transition-colors">
                    {stepItem.step}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-amber-600 transition-colors">
                    Stage {stepItem.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 mb-3 group-hover:text-sky-700 transition">
                  {stepItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REAL OPERATIONS & PACKAGING GALLERY (Authentic User Photos) */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="relative max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-950 border border-sky-500/50 text-sky-300 mb-2">
                <span>Real Operations & Logistics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Authentic Manufacturing, Packaging & Port Dispatches
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                Direct glimpses from our Kutch coastal crystallizers, Gandhidham bagging line, and daily containerized ocean export loading.
              </p>
            </div>
            
            <Link
              to="/manufacturing"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Gandhidham Plant & QA Lab &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Photo 1: Forklift Loading 1 MT Jumbo Bag */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-sky-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-forklift-loading.jpg" 
                  alt="Forklift Loading 1 MT Jumbo Bag of Skyline Industrial Salt" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-sky-600/90 text-white backdrop-blur-xs">
                  Active Dispatch
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition">
                  1 MT Jumbo Bag Container Loading
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Forklift stuffing 1,000 kg Grade-A Triple Refined Industrial Salt into 20ft ocean containers at our Gandhidham facility.
                </p>
              </div>
            </div>

            {/* Photo 2: Stuffed Shipping Container */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-amber-500/50 transition-all duration-300">
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
                  Heavy-duty UV-stabilized woven polypropylene bags stuffed for international maritime transit to GCC, Africa, and Southeast Asia.
                </p>
              </div>
            </div>

            {/* Photo 3: Multi-Packaging Lineup */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-emerald-500/50 transition-all duration-300">
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
                  50kg Triple Refined Iodised, 25kg Softener Salt Tablets, and 1kg/500g consumer packets ready for prompt dispatch.
                </p>
              </div>
            </div>

            {/* Photo 4: Stacked Container with 50kg Bags */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-cyan-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-container-stacked.jpg" 
                  alt="50kg Skyline Triple Refined Salt Bags Stacked in Ocean Container" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-cyan-600/90 text-white backdrop-blur-xs">
                  High-Density Stacking
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition">
                  50kg Export Bag Container Stacking
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Secured high-density stacking of 50kg HDPE laminated bags inside 20ft ocean container ensuring zero moisture ingress during sea voyages.
                </p>
              </div>
            </div>

            {/* Photo 5: Coastal Crystallizer Pans with Salt Pyramids */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-sky-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-salt-pans-pyramids.jpg" 
                  alt="Coastal Sea Salt Crystallizer Pans with Salt Pyramids and Lighthouse" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-sky-600/90 text-white backdrop-blur-xs">
                  Solar Harvest
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition">
                  Coastal Salt Pans & Natural Crystallization
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Natural solar evaporation in pristine coastal pans producing high-purity crystalline sea salt before mechanical hydro-washing.
                </p>
              </div>
            </div>

            {/* Photo 6: Pure Salt Extraction Reflection Pan */}
            <div className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-amber-500/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/skyline-solar-salt-mountains.jpg" 
                  alt="Solar Salt Mountains Reflecting in Pure Oceanic Brine" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-amber-600/90 text-white backdrop-blur-xs">
                  Raw Salt Reserves
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">
                  Solar Salt Stockpiles & Brine Works
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strategic raw salt stockpiles maintained along deep brine canals to guarantee round-the-year refining continuity for global buyers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              <span>Global Industrial Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Industries We Serve Globally
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Reliable mineral supplies engineered to enhance manufacturing yields, reaction kinetics, and product durability across primary global sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Chlor-Alkali & Chemicals", desc: "High-purity sodium chloride for membrane cell electrolysis.", icon: FlaskConical },
              { title: "Oilfield & Gas Drilling", desc: "API 13A high-yield bentonite for borehole stabilization.", icon: Drill },
              { title: "Ceramics & Sanitaryware", desc: "High alumina extruded clay noodles and calcined kaolin.", icon: Shapes },
              { title: "Foundry & Metal Casting", desc: "High thermal durability green sand bentonite binders.", icon: Flame },
              { title: "Paints & Paper Coatings", desc: "Calcined kaolin 92+ GE and titanium dioxide extenders.", icon: Palette },
              { title: "Water Treatment Plants", desc: "Pure vacuum tablet salt for ion-exchange boiler softeners.", icon: Droplets },
              { title: "Edible & Food Processing", desc: "Refined free-flow iodized salt under FSSAI standards.", icon: Utensils },
              { title: "Civil Slurry & Piling", desc: "Thixotropic bentonite for diaphragm walls and tunnels.", icon: Building2 }
            ].map((ind, i) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-sky-50/50 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <IndIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading mb-1.5 group-hover:text-sky-700 transition">
                      {ind.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60">
                    <Link to="/industries" className="text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1">
                      <span>Explore Applications</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. HIGH-IMPACT CALL-TO-ACTION (Aapas Group Inspired Headline) */}
      <section className="py-20 bg-gradient-to-br from-sky-900 via-blue-950 to-slate-950 text-white relative">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Direct Commercial Desk */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                <span>Connect With Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                Looking for a Reliable Mineral Supplier?
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you require a trial shipment, containerized export, or a long-term annual supply agreement, our Gandhidham engineering and commercial desk is ready to discuss your technical specifications and logistics needs.
              </p>

              {/* Direct Calling & Emailing */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-sky-300 uppercase">Primary Sales Desk</div>
                    <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="text-sm font-bold text-white hover:text-sky-300 transition">
                      {phone1}
                    </a>
                  </div>
                  <a 
                    href={`tel:${phone1.replace(/\s+/g, '')}`} 
                    className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition"
                    title="Call Now"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-amber-300 uppercase">Secondary Desk</div>
                    <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="text-sm font-bold text-white hover:text-amber-300 transition">
                      {phone2}
                    </a>
                  </div>
                  <a 
                    href={`tel:${phone2.replace(/\s+/g, '')}`} 
                    className="p-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition"
                    title="Call Now"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Technical & Export Email</div>
                    <a href={`mailto:${emailInfo}`} className="text-xs sm:text-sm font-bold text-amber-300 hover:underline">
                      {emailInfo}
                    </a>
                  </div>
                  <a 
                    href={`mailto:${emailInfo}`} 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Verified Address Badges */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gandhidham Refinery & Plant Location:</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {settings.factoryAddress || "Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India."}
                </p>
              </div>
            </div>

            {/* Right: Quick On-Page Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                  Request a Fast Technical Specification & Quote
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill in your requirements below for prompt dispatch of Technical Data Sheets (TDS), pricing, and lab assay reports within 24 business hours.
                </p>

                {enquiryStatus.success ? (
                  <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <div className="text-base font-bold text-white">Inquiry Successfully Dispatched!</div>
                    <p className="text-xs text-emerald-300">
                      Thank you. Our Gandhidham engineering and export desk will contact you via email/phone shortly.
                    </p>
                    <button
                      onClick={() => setEnquiryStatus({ submitting: false, success: false, error: '' })}
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHomeEnquirySubmit} className="space-y-4">
                    {enquiryStatus.error && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-500 text-red-200 text-xs">
                        {enquiryStatus.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={homeEnquiry.name}
                          onChange={(e) => setHomeEnquiry({ ...homeEnquiry, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition"
                          placeholder="e.g. Rajesh Kumar"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={homeEnquiry.company}
                          onChange={(e) => setHomeEnquiry({ ...homeEnquiry, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition"
                          placeholder="e.g. Apex Chemical Industries Ltd."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={homeEnquiry.email}
                          onChange={(e) => setHomeEnquiry({ ...homeEnquiry, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition"
                          placeholder="e.g. procurement@apexchem.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Contact Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={homeEnquiry.phone}
                          onChange={(e) => setHomeEnquiry({ ...homeEnquiry, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Product of Interest *
                      </label>
                      <select
                        value={homeEnquiry.product}
                        onChange={(e) => setHomeEnquiry({ ...homeEnquiry, product: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition"
                      >
                        <option value="Industrial Sodium Chloride (99.5%+)">Industrial Sodium Chloride (99.5%+)</option>
                        <option value="Pure Dried Vacuum Salt (PDV)">Pure Dried Vacuum Salt (PDV)</option>
                        <option value="Salt Tablets (Water Softener)">Salt Tablets (Water Softener)</option>
                        <option value="Coarse Solar Salt">Coarse Solar Salt</option>
                        <option value="Triple Refined Iodized Edible Salt">Triple Refined Iodized Edible Salt</option>
                        <option value="Natural Ocean Marine Salt">Natural Ocean Marine Salt</option>
                        <option value="API Spec 13A Drilling Bentonite">API Spec 13A Drilling Bentonite</option>
                        <option value="Foundry Bentonite Clay">Foundry Bentonite Clay</option>
                        <option value="HDD & Civil Piling Bentonite">HDD & Civil Piling Bentonite</option>
                        <option value="China Clay Lumps & Extruded Noodles">China Clay Lumps & Extruded Noodles</option>
                        <option value="Calcined Kaolin Powder (92+ GE)">Calcined Kaolin Powder (92+ GE)</option>
                        <option value="Other Mineral / Custom Mesh Specification">Other Mineral / Custom Mesh Specification</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Requirement Details (Quantity, Packaging, Destination Port) *
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={homeEnquiry.message}
                        onChange={(e) => setHomeEnquiry({ ...homeEnquiry, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500 transition resize-none"
                        placeholder="Mention required tonnage (e.g. 500 MT), packing (25kg/50kg/Jumbo), and delivery location or FOB/CIF port..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={enquiryStatus.submitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{enquiryStatus.submitting ? 'Submitting Inquiry...' : 'Submit Technical Inquiry & Request Quote'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct from Skyline Salt and Minerals Commercial Office, Gandhidham.</span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
