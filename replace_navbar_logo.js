const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Navbar.jsx');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const newLogoBlock = [
  '        <div className="flex items-center justify-between min-h-[84px] py-1.5">',
  '          ',
  '          {/* Official Skyline Logo & Branding */}',
  '          <Link to="/" className="flex items-center gap-3.5 group shrink-0 mr-6 xl:mr-8 2xl:mr-10 py-1">',
  '            <div className="w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">',
  '              <img ',
  '                src="/skyline-emblem.png" ',
  '                alt="Skyline Salt & Minerals Official Emblem" ',
  '                className="w-13 h-13 sm:w-14 sm:h-14 object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-200" ',
  '              />',
  '            </div>',
  '            <div className="flex flex-col justify-center">',
  '              <div className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 leading-none flex items-center gap-1.5">',
  '                <span>SKYLINE</span>',
  '                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 leading-none">',
  '                  Est. 2011',
  '                </span>',
  '              </div>',
  '              <div className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-blue-900 leading-none mt-1">',
  '                Salt & Minerals',
  '              </div>',
  '              <div className="text-[9px] sm:text-[9.5px] font-semibold text-slate-500 uppercase tracking-wide leading-none mt-0.5">',
  '                A Unit of Skyline Enterprises',
  '              </div>',
  '              <div className="text-[11px] font-serif italic text-sky-600 font-semibold tracking-normal leading-tight mt-0.5">',
  '                a way of exporting excellency',
  '              </div>',
  '            </div>',
  '          </Link>'
];

// Replace lines 139 to 159 (inclusive)
lines.splice(139, 21, ...newLogoBlock);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully replaced logo in Navbar.jsx!');

