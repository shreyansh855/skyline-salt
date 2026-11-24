import React, { useState } from 'react';
import { 
  MapPin, Factory, Phone, Mail, Clock, Send, CheckCircle2, 
  AlertCircle, ExternalLink, MessageSquare, Building2, HelpCircle
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useSettings } from '../context/SettingsContext';

export default function ContactPage() {
  const { settings } = useSettings();

  const officeAddress = settings.officeAddress || "Plot No. 92, Near Fateh Mamad Hajira, Lalshah Burhanshah Dargah, Bhuj-Kutch, 370001, Gujarat, India.";
  const officeMapsUrl = settings.officeMapsUrl || "https://www.google.com/maps/search/?api=1&query=Plot+No.+92,+Near+Fateh+Mamad+Hajira,+Lalshah+Burhanshah+Dargah,+Bhuj-Kutch,+370001,+Gujarat,+India";

  const factoryAddress = settings.factoryAddress || "Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India.";
  const factoryMapsUrl = settings.factoryMapsUrl || "https://www.google.com/maps/search/?api=1&query=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India";

  const phone1 = settings.phonePrimary || "+91 73839 39786";
  const phone2 = settings.phoneSecondary || "+91 96871 36559";
  const emailInfo = settings.emailInfo || "Info@skylinesaltandminerals.com";
  const emailSupport = settings.emailSupport || "support@skylinesaltandminerals.com";

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: 'Refined Industrial Salt',
    quantity: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        product: 'Refined Industrial Salt',
        quantity: '',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Contact Us | Official Bhuj Office & Gandhidham Factory | Skyline Minerals"
        description="Official contact details for Skyline Salt and Minerals. Office in Bhuj-Kutch, manufacturing plant in Jawahar Nagar Gandhidham. Call +91 73839 39786 or +91 96871 36559."
      />
      <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact' }]} />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-900/60 border border-blue-700 text-blue-300">
              Direct Business Communication
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Contact Skyline Salt and Minerals
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with our administrative office in Bhuj or our manufacturing processing plant in Gandhidham for quotations, technical specifications, and bulk tenders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Official Company Addresses & Direct Lines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Address Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:border-blue-400 transition-all space-y-3">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">Head Office (Bhuj)</h3>
                  <div className="text-[11px] text-slate-500 font-normal">Commercial Administration & Executive Desk</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-10">
                {officeAddress}
              </p>

              <div className="pl-10 pt-1">
                <a
                  href={officeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition"
                  title="Open exact Bhuj office location in Google Maps"
                >
                  <span>Open Bhuj Location in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Factory Address Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:border-amber-400 transition-all space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Factory className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">Processing Plant (Gandhidham)</h3>
                  <div className="text-[11px] text-slate-500 font-normal">Refining, Milling, Testing Lab & Logistics</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-10">
                {factoryAddress}
              </p>

              <div className="pl-10 pt-1">
                <a
                  href={factoryMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition"
                  title="Open exact Gandhidham factory location in Google Maps"
                >
                  <span>Open Gandhidham Plant in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Phone Numbers Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-slate-900">Direct Telephone / Mobile</h4>
                  <div className="text-[11px] text-slate-500 font-normal">Clickable phone links for instant dial</div>
                </div>
              </div>

              <div className="pl-10 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Primary Line:</span>
                  <a
                    href={`tel:${phone1.replace(/\s+/g, '')}`}
                    className="font-bold text-blue-800 hover:text-blue-950 hover:underline"
                  >
                    {phone1}
                  </a>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Secondary Line:</span>
                  <a
                    href={`tel:${phone2.replace(/\s+/g, '')}`}
                    className="font-bold text-blue-800 hover:text-blue-950 hover:underline"
                  >
                    {phone2}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Email Addresses Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-slate-900">Official Business Email</h4>
                  <div className="text-[11px] text-slate-500 font-normal">Clickable mailto links for quotation requests</div>
                </div>
              </div>

              <div className="pl-10 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Commercial & Inquiries:</span>
                  <a
                    href={`mailto:${emailInfo}`}
                    className="font-bold text-blue-800 hover:text-blue-950 hover:underline"
                  >
                    {emailInfo}
                  </a>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 font-medium">Customer Support:</span>
                  <a
                    href={`mailto:${emailSupport}`}
                    className="font-bold text-blue-800 hover:text-blue-950 hover:underline"
                  >
                    {emailSupport}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
              <div className="mb-6">
                <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 mb-1">
                  Online Enquiry Desk
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">
                  Send Us an Official Business Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  All submissions are logged into our enterprise database and dispatched to our sales desk.
                </p>
              </div>

              {success ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Successfully Dispatched!</h4>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you. Your quotation request has been securely registered in our system. Our technical commercial desk will reply promptly with full specifications and current FOB / CIF price schedules.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Industries Ltd"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 12345"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Product Interested In *
                      </label>
                      <select
                        value={formData.product}
                        onChange={e => setFormData({ ...formData, product: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      >
                        <option value="Refined Industrial Salt">Refined Industrial Salt (99.2%+ NaCl)</option>
                        <option value="Tablet Salt (Water Softener)">Tablet Salt (Water Softener Salt)</option>
                        <option value="Raw Solar Sea Salt">Raw Solar Sea Salt</option>
                        <option value="Pure Dried Vacuum (PDV) Salt">Pure Dried Vacuum (PDV) Salt</option>
                        <option value="Refined Free Flow Iodized Salt">Refined Free Flow Iodized Salt</option>
                        <option value="API 13A Section 9 & 11 Drilling Bentonite">API 13A Section 9 & 11 Drilling Bentonite</option>
                        <option value="Foundry Grade Sodium Bentonite">Foundry Grade Sodium Bentonite</option>
                        <option value="Piling & Civil Engineering Bentonite">Piling & Civil Engineering Bentonite</option>
                        <option value="China Clay Noodles (Extruded)">China Clay Noodles (Extruded)</option>
                        <option value="Washed China Clay Powder (300-500 Mesh)">Washed China Clay Powder (300-500 Mesh)</option>
                        <option value="Calcined Kaolin Powder (92+ GE)">Calcined Kaolin Powder (92+ GE)</option>
                        <option value="Hydrous Kaolin Powder">Hydrous Kaolin Powder</option>
                        <option value="Highly Reactive Metakaolin">Highly Reactive Metakaolin</option>
                        <option value="Silica Ramming Mass">Silica Ramming Mass</option>
                        <option value="Industrial Gypsum Granules">Industrial Gypsum Granules</option>
                        <option value="Potassium & Sodium Feldspar">Potassium & Sodium Feldspar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Quantity Required / Target Port
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 500 MT, FOB Mundra"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Detailed Message & Technical Specifications
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Specify required chemical purity, particle sizing, packaging preference (25kg/50kg/Jumbo bulk bags), delivery timeline..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-slate-50 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Submitting to Database...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Dual Embedded Maps Section */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold font-heading text-slate-900">
              Interactive Google Maps Locations
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click on either map location below to open interactive directions in Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bhuj Office Map */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Bhuj Administrative Office</span>
                </span>
                <a 
                  href={officeMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title="Bhuj Office Google Map"
                  src="https://maps.google.com/maps?q=Plot+No.+92,+Near+Fateh+Mamad+Hajira,+Lalshah+Burhanshah+Dargah,+Bhuj-Kutch,+370001,+Gujarat,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Gandhidham Factory Map */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-amber-600" />
                  <span>Gandhidham Manufacturing Factory</span>
                </span>
                <a 
                  href={factoryMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title="Gandhidham Factory Google Map"
                  src="https://maps.google.com/maps?q=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

