import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Factory, Phone, Mail, ExternalLink, ShieldCheck, 
  Award, Globe, ArrowRight, Lock, Sparkles
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const officeAddress = settings.officeAddress || "Plot No. 92, Near Fateh Mamad Hajira, Lalshah Burhanshah Dargah, Bhuj-Kutch, 370001, Gujarat, India.";
  const officeMapsUrl = settings.officeMapsUrl || "https://www.google.com/maps/search/?api=1&query=Plot+No.+92,+Near+Fateh+Mamad+Hajira,+Lalshah+Burhanshah+Dargah,+Bhuj-Kutch,+370001,+Gujarat,+India";

  const factoryAddress = settings.factoryAddress || "Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India.";
  const factoryMapsUrl = settings.factoryMapsUrl || "https://www.google.com/maps/search/?api=1&query=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India";

  const phone1 = settings.phonePrimary || "+91 73839 39786";
  const phone2 = settings.phoneSecondary || "+91 96871 36559";
  const emailInfo = settings.emailInfo || "Info@skylinesaltandminerals.com";
  const emailSupport = settings.emailSupport || "support@skylinesaltandminerals.com";
  const gstNumber = settings.gstNumber || "24CHLPM4029D1ZJ";

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-14 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200/60 inline-flex items-center gap-3 group hover:shadow-md transition-all cursor-pointer w-full max-w-xs" 
              title="Skyline Home"
            >
              <img 
                src="/skyline-emblem.png" 
                alt="Skyline Salt and Minerals Logo" 
                className="w-12 h-12 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-center">
                <div className="text-base sm:text-lg font-black font-heading tracking-tight text-slate-950 flex items-center gap-1.5 leading-none group-hover:text-sky-700 transition-colors">
                  <span>SKYLINE</span>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded border border-sky-300 leading-none">
                    Est. 2011
                  </span>
                </div>
                <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-sky-700 mt-1 leading-none">
                  Salt & Minerals
                </div>
                <div className="text-[8.5px] font-semibold text-slate-500 uppercase tracking-wide leading-none mt-0.5">
                  A Unit of Skyline Enterprises
                </div>
                <div className="text-[9.5px] font-serif italic text-blue-900 font-semibold tracking-normal mt-0.5 leading-none">
                  a way of exporting excellency
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier manufacturer, refiner, and worldwide exporter of high-purity Industrial & Edible Salts, API Drilling Bentonite, Ceramic China Clay, and Engineered Kaolin.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span>ISO 9001:2015</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>API Spec 13A</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-sky-300 flex items-center gap-1 font-mono text-[10.5px]">
                <span className="text-slate-400 font-sans">GSTIN:</span>
                <span className="font-semibold text-white tracking-wider">{gstNumber}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core Products (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Product Catalogue
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/products/industrial-salt" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">Industrial Salt</span>
                </Link>
              </li>
              <li>
                <Link to="/products/edible-salt" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">Edible Salt</span>
                </Link>
              </li>
              <li>
                <Link to="/products/bentonite" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">Bentonite Clay</span>
                </Link>
              </li>
              <li>
                <Link to="/products/china-clay" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">China Clay Noodles</span>
                </Link>
              </li>
              <li>
                <Link to="/products/kaolin" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">Calcined Kaolin</span>
                </Link>
              </li>
              <li>
                <Link to="/products/other-minerals" className="text-slate-400 hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                  <span className="truncate">Ramming Mass</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">About Skyline</Link>
              </li>
              <li>
                <Link to="/manufacturing" className="text-slate-400 hover:text-white transition">Gandhidham Plant</Link>
              </li>
              <li>
                <Link to="/industries" className="text-slate-400 hover:text-white transition">Industries Served</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">Contact & Enquiries</Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" className="text-slate-400 hover:text-white transition">XML Sitemap</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ask AI & Certificates (2 cols) matching reference layout */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Ask AI Section */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-white font-heading flex items-center gap-1">
                <span>Ask AI</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                about Skyline Salt & Minerals
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <a 
                  href="https://chatgpt.com/?q=Tell+me+about+Skyline+Salt+and+Minerals+Gandhidham+Gujarat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Ask ChatGPT"
                  className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition text-[9px] font-bold"
                >
                  GPT
                </a>
                <a 
                  href="https://www.perplexity.ai/search?q=Skyline+Salt+and+Minerals+Gandhidham" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Ask Perplexity"
                  className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-400 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition text-[9px] font-bold"
                >
                  PPL
                </a>
                <a 
                  href="https://claude.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Ask Claude"
                  className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-400 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition text-[9px] font-bold"
                >
                  AI
                </a>
                <a 
                  href="https://gemini.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Ask Gemini"
                  className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-400 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition text-[9px] font-bold"
                >
                  ✦
                </a>
              </div>
            </div>

            {/* Certificates Heading & Official Logos (Directly from skcsalt.com) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                Certificates
              </h4>
              <div className="flex flex-col gap-2.5">
                <img 
                  src="/certificates.png" 
                  alt="IAF, FIEO, APEDA, Halal Export Certificates" 
                  className="w-full max-w-[200px] h-auto object-contain hover:scale-105 transition-transform" 
                />
                <img 
                  src="/iso-certificate.png" 
                  alt="ISO 9001:2015 Certified Company" 
                  className="w-16 sm:w-20 h-auto object-contain hover:scale-105 transition-transform" 
                />
              </div>
            </div>

          </div>

          {/* Col 5: Official Company Locations & Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Official Contact Details
            </h4>

            {/* Office Address - Clickable to Google Maps */}
            <div className="text-xs space-y-0.5">
              <div className="text-blue-400 font-semibold flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3 h-3" />
                <span>Head Office (Bhuj)</span>
              </div>
              <a
                href={officeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Bhuj Office in Google Maps"
                className="block text-slate-300 hover:text-amber-300 transition group leading-relaxed text-[11px]"
              >
                <span>{officeAddress}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium ml-1 group-hover:underline">
                  [Google Maps <ExternalLink className="w-2.5 h-2.5 inline" />]
                </span>
              </a>
            </div>

            {/* Factory Address - Clickable to Google Maps */}
            <div className="text-xs space-y-0.5 pt-1.5 border-t border-slate-900">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5 text-[11px]">
                <Factory className="w-3 h-3" />
                <span>Plant (Gandhidham)</span>
              </div>
              <a
                href={factoryMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Gandhidham Factory in Google Maps"
                className="block text-slate-300 hover:text-amber-300 transition group leading-relaxed text-[11px]"
              >
                <span>{factoryAddress}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium ml-1 group-hover:underline">
                  [Google Maps <ExternalLink className="w-2.5 h-2.5 inline" />]
                </span>
              </a>
            </div>

            {/* Direct Phone Numbers (Clickable tel:) */}
            <div className="pt-1.5 border-t border-slate-900 space-y-0.5 text-xs">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
                <Phone className="w-3 h-3 text-blue-400" />
                <span>Direct Mobile:</span>
              </div>
              <div className="pl-4 space-x-1.5 text-[11px]">
                <a
                  href={`tel:${phone1.replace(/\s+/g, '')}`}
                  className="text-white hover:text-blue-300 transition font-semibold hover:underline"
                >
                  {phone1}
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={`tel:${phone2.replace(/\s+/g, '')}`}
                  className="text-white hover:text-blue-300 transition font-semibold hover:underline"
                >
                  {phone2}
                </a>
              </div>
            </div>

            {/* Business Email Addresses (Clickable mailto:) */}
            <div className="space-y-0.5 text-xs">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>Inquiries Email:</span>
              </div>
              <div className="pl-4 space-y-0.5 text-[11px]">
                <a
                  href={`mailto:${emailInfo}`}
                  className="block text-amber-300 hover:text-amber-200 transition font-semibold hover:underline"
                >
                  {emailInfo}
                </a>
              </div>
            </div>

            {/* Official GSTIN Details */}
            <div className="pt-1.5 border-t border-slate-900 space-y-0.5 text-xs">
              <div className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3 h-3 text-sky-400" />
                <span>GST Identification:</span>
              </div>
              <div className="pl-4 text-[11px]">
                <span className="font-mono font-bold tracking-wider text-sky-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 inline-block">
                  GSTIN: {gstNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations & Certifications Strip (Clean transparent logos directly on dark background, NO white card) */}
        <div className="py-6 my-2 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified Accreditations & Quality Compliance</span>
            </div>
            <div className="text-xs text-slate-400">
              International compliance with IAF, FIEO, APEDA, Halal India, and ISO 9001:2015 standards.
            </div>
          </div>

          {/* Official Certificates directly from skcsalt.com */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <img 
              src="/certificates.png" 
              alt="Official IAF, FIEO, APEDA, Halal Export Certificates" 
              className="h-16 sm:h-20 w-auto object-contain hover:scale-105 transition-transform" 
            />
            <img 
              src="/iso-certificate.png" 
              alt="ISO 9001:2015 Certified Company" 
              className="h-14 sm:h-18 w-auto object-contain hover:scale-105 transition-transform" 
            />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()}{' '}
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-slate-300 hover:text-white font-semibold transition hover:underline cursor-pointer"
            >
              {settings.companyName}
            </Link>
            . All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="font-mono text-slate-300 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 text-[11px] flex items-center gap-1.5 shadow-2xs">
              <span className="text-slate-400 font-sans">GSTIN:</span>
              <span className="font-semibold text-sky-300 tracking-wider">24CHLPM4029D1ZJ</span>
            </span>
            <span>Gandhidham & Bhuj-Kutch, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

