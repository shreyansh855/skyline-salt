const fs = require('fs');
const path = require('path');

// 1. UPDATE NAVBAR.JSX
const navbarPath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Navbar.jsx');
let navContent = fs.readFileSync(navbarPath, 'utf8');

const oldNavLogo = `          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0 mr-6 xl:mr-8 2xl:mr-12">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 12 22 2" fill="rgba(255,255,255,0.15)"/>
                <line x1="12" y1="2" x2="12" y2="22"/>
                <line x1="22" y1="8.5" x2="2" y2="15.5"/>
                <line x1="2" y1="8.5" x2="22" y2="15.5"/>
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 leading-none">
                SKYLINE
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 mt-0.5">
                Salt & Minerals
              </div>
            </div>
          </Link>`;

const newNavLogo = `          {/* Official Skyline Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 group shrink-0 mr-6 xl:mr-8 2xl:mr-10">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img 
                src="/skyline-emblem.png" 
                alt="Skyline Salt & Minerals Official Emblem" 
                className="w-12 h-12 object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 leading-none flex items-center gap-1.5">
                <span>SKYLINE</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1 py-0.5 rounded border border-blue-200/60 leading-none">
                  Est. 2011
                </span>
              </div>
              <div className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-blue-900 leading-none mt-1">
                Salt & Minerals
              </div>
              <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide leading-none mt-0.5">
                A Unit of Skyline Enterprises
              </div>
              <div className="text-[10.5px] font-serif italic text-sky-600 font-semibold tracking-normal leading-tight mt-0.5">
                a way of exporting excellency
              </div>
            </div>
          </Link>`;

navContent = navContent.replace(oldNavLogo, newNavLogo);
fs.writeFileSync(navbarPath, navContent, 'utf8');
console.log('Navbar logo updated!');

// 2. UPDATE FOOTER.JSX
const footerPath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Footer.jsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');

const oldFooterBrand = `            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="rgba(255,255,255,0.2)"/>
                  <line x1="12" y1="2" x2="12" y2="22"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-black font-heading tracking-tight text-white block">
                  SKYLINE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block -mt-1">
                  Salt and Minerals
                </span>
              </div>
            </div>`;

const newFooterBrand = `            <div className="flex items-center gap-3.5">
              <img 
                src="/skyline-emblem.png" 
                alt="Skyline Salt and Minerals Logo" 
                className="w-13 h-13 object-contain shrink-0 drop-shadow-md"
              />
              <div className="flex flex-col justify-center">
                <div className="text-xl font-black font-heading tracking-tight text-white flex items-center gap-2 leading-none">
                  <span>SKYLINE</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-blue-950/90 px-1.5 py-0.5 rounded border border-blue-800">
                    Est. 2011
                  </span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mt-1 leading-none">
                  Salt & Minerals
                </div>
                <div className="text-[9.5px] font-medium text-slate-400 uppercase tracking-wide leading-none mt-0.5">
                  A Unit of Skyline Enterprises
                </div>
                <div className="text-[11px] font-serif italic text-sky-300 font-medium tracking-normal mt-0.5">
                  a way of exporting excellency
                </div>
              </div>
            </div>`;

footerContent = footerContent.replace(oldFooterBrand, newFooterBrand);
footerContent = footerContent.replace(
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">',
  '<div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">'
);
fs.writeFileSync(footerPath, footerContent, 'utf8');
console.log('Footer logo & width updated!');

