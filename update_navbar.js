const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Navbar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure max-w-[1600px]
content = content.replace(
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">',
  '<div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">'
);

// 2. Add margin to Logo
content = content.replace(
  '<Link to="/" className="flex items-center gap-3 group shrink-0">',
  '<Link to="/" className="flex items-center gap-3.5 group shrink-0 mr-6 xl:mr-8 2xl:mr-12">'
);

// 3. Update <nav className="hidden xl:flex items-center space-x-5">
const oldNavStart = `<nav className="hidden xl:flex items-center space-x-5">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>`;

const newNavStart = `<nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5">
            <NavLink 
              to="/" 
              className={({ isActive }) => \`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap \${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }\`}
            >
              Home
            </NavLink>

            {/* About Us (with rich dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/about" 
                className={({ isActive }) => \`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 \${
                  isActive || activeDropdown === 'about'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }\`}
              >
                <span>About Us</span>
                <ChevronDown className={\`w-3.5 h-3.5 transition-transform duration-200 \${activeDropdown === 'about' ? 'rotate-180 text-blue-700' : 'text-slate-400'}\`} />
              </NavLink>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-80 pt-2 animate-fade-in z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1">
                    <Link
                      to="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 text-slate-800 hover:text-blue-700 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:text-white transition shadow-2xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Company Overview</div>
                        <div className="text-[11px] text-slate-500 font-normal">Heritage & Est. 2011 Story in Kutch</div>
                      </div>
                    </Link>

                    <Link
                      to="/manufacturing"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 text-slate-800 hover:text-amber-800 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition shadow-2xs">
                        <Factory className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-amber-800">Manufacturing & Plant</div>
                        <div className="text-[11px] text-slate-500 font-normal">Gandhidham Hub & Seaport QA Lab</div>
                      </div>
                    </Link>

                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50/80 text-slate-800 hover:text-sky-800 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition shadow-2xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-sky-800">Industries Served</div>
                        <div className="text-[11px] text-slate-500 font-normal">Oilfield, Chemicals, Food & Ceramics</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>`;

content = content.replace(oldNavStart, newNavStart);

// 4. Update Industrial Salt trigger styling
content = content.replace(
  `to="/products/industrial-salt" 
                className="flex items-center gap-1 font-semibold text-sm transition-colors py-2 text-slate-700 hover:text-blue-700 whitespace-nowrap"`,
  `to="/products/industrial-salt" 
                className={\`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 \${
                  activeDropdown === 'industrial'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }\`}`
);

// 5. Update Edible Salt trigger styling
content = content.replace(
  `to="/products/edible-salt" 
                className="flex items-center gap-1 font-semibold text-sm transition-colors py-2 text-slate-700 hover:text-blue-700 whitespace-nowrap"`,
  `to="/products/edible-salt" 
                className={\`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 \${
                  activeDropdown === 'edible'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }\`}`
);

// 6. Update Bentonite trigger styling
content = content.replace(
  `to="/products/bentonite" 
                className="flex items-center gap-1 font-semibold text-sm transition-colors py-2 text-slate-700 hover:text-blue-700 whitespace-nowrap"`,
  `to="/products/bentonite" 
                className={\`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 \${
                  activeDropdown === 'bentonite'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }\`}`
);

// 7. Update China Clay & Kaolin trigger styling
content = content.replace(
  `to="/products/china-clay" 
                className="flex items-center gap-1 font-semibold text-sm transition-colors py-2 text-slate-700 hover:text-blue-700 whitespace-nowrap"`,
  `to="/products/china-clay" 
                className={\`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 \${
                  activeDropdown === 'clays'
                    ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                }\`}`
);

// 8. Update Nav End (Manufacturing, Industries, Contact Us)
const oldNavEnd = `<NavLink to="/manufacturing" className={navClass}>
              Manufacturing & Plant
            </NavLink>

            <NavLink to="/industries" className={navClass}>
              Industries Served
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact Us
            </NavLink>`;

const newNavEnd = `<NavLink 
              to="/manufacturing" 
              className={({ isActive }) => \`hidden 2xl:flex px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap \${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }\`}
            >
              Plant & QA
            </NavLink>

            <NavLink 
              to="/industries" 
              className={({ isActive }) => \`hidden 2xl:flex px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap \${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }\`}
            >
              Industries
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => \`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap \${
                isActive 
                  ? 'text-blue-700 bg-blue-50/90 font-bold border border-blue-200/60 shadow-2xs' 
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
              }\`}
            >
              Contact Us
            </NavLink>`;

content = content.replace(oldNavEnd, newNavEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Navbar.jsx!');

