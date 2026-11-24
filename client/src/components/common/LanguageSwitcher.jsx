import React, { useState, useEffect } from 'react';
import { Globe, X, Search, Check, Sparkles, ArrowRight } from 'lucide-react';

// Comprehensive list of world languages with native labels and flags
const worldLanguages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', region: 'Global' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', region: 'India' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', region: 'India (Gujarat)' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇦🇪', region: 'Middle East & GCC' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', region: 'Europe & Americas' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', region: 'Europe & Africa' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', region: 'Europe' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', region: 'CIS & Eurasia' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳', region: 'East Asia' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文', flag: '🇹🇼', region: 'East Asia' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', region: 'East Asia' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', region: 'East Asia' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳', region: 'Southeast Asia' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Southeast Asia' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷', region: 'Americas & Europe' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷', region: 'Middle East & Europe' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', region: 'Europe' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', region: 'Europe' },
  { code: 'fa', name: 'Persian (Farsi)', native: 'فارسی', flag: '🇮🇷', region: 'Middle East' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭', region: 'Southeast Asia' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱', region: 'Europe' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾', region: 'Southeast Asia' },
  { code: 'tl', name: 'Filipino (Tagalog)', native: 'Tagalog', flag: '🇵🇭', region: 'Southeast Asia' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩', region: 'South Asia' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', region: 'South Asia' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', region: 'South Asia' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', region: 'South Asia' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', region: 'India' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪', region: 'East Africa' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦', region: 'Europe' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷', region: 'Europe' },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱', region: 'Middle East' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪', region: 'Europe' },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿', region: 'Europe' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴', region: 'Europe' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺', region: 'Europe' },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰', region: 'Europe' },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮', region: 'Europe' },
  { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴', region: 'Europe' }
];

export function applyLanguage(langCode) {
  try {
    const hostname = window.location.hostname;
    // Set cookies for Google Translate
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    localStorage.setItem('skyline_lang', langCode);

    // Try triggering the Google translate combo directly
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Refresh to reload with new cookie
      window.location.reload();
    }
  } catch (e) {
    console.error('Translation error:', e);
  }
}

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Read saved language or cookie
    const saved = localStorage.getItem('skyline_lang');
    if (saved) {
      setCurrentLang(saved);
    } else {
      const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
      }
    }
  }, []);

  const handleSelect = (code) => {
    setCurrentLang(code);
    applyLanguage(code);
    setIsOpen(false);
  };

  const handleReset = () => {
    setCurrentLang('en');
    const hostname = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem('skyline_lang');
    window.location.reload();
  };

  const filteredLanguages = worldLanguages.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase()) ||
    l.region.toLowerCase().includes(search.toLowerCase())
  );

  const activeLanguageObj = worldLanguages.find(l => l.code === currentLang) || worldLanguages[0];

  return (
    <>
      {/* Floating Side Language Button (Fixed on middle-right edge) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-l from-sky-900 to-slate-900 text-white pl-3.5 pr-2.5 py-2.5 rounded-l-2xl shadow-xl hover:shadow-2xl border-y border-l border-sky-400/40 hover:border-sky-300 transition-all transform hover:-translate-x-1"
          title="Change Website Language / भाषा बदलें / تغيير اللغة"
        >
          <div className="relative">
            <Globe className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="text-left leading-tight pr-1">
            <div className="text-[10px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1">
              <span>{activeLanguageObj.flag}</span>
              <span>Language</span>
            </div>
            <div className="text-xs font-bold text-white truncate max-w-[85px]">
              {activeLanguageObj.native}
            </div>
          </div>
        </button>
      </div>

      {/* Floating Bottom Button on Mobile */}
      <div className="fixed right-4 bottom-20 z-40 sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-sky-900 text-white px-3 py-2 rounded-full shadow-lg border border-sky-400/40 text-xs font-bold"
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>{activeLanguageObj.flag} {activeLanguageObj.native}</span>
        </button>
      </div>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-800/80 border border-blue-600/50 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <span>Select Language / भाषा चुनें</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Translate website instantly into 100+ global languages
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search your country or language (e.g. Hindi, Arabic, Spanish, Russian)..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              {currentLang !== 'en' && (
                <button
                  onClick={handleReset}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-blue-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition whitespace-nowrap"
                  title="Reset to Original English"
                >
                  Reset (English)
                </button>
              )}
            </div>

            {/* Language Grid */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredLanguages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center justify-between group ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{lang.flag}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 truncate">
                          {lang.native}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {lang.name} • <span className="text-[10px] text-slate-400">{lang.region}</span>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Notice */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Powered by Neural Multi-Language Translation. Instant live conversion.</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

