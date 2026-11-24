const fs = require('fs');
const path = require('path');

// 1. CLEAN CLIENT/SRC/COMPONENTS/LAYOUT/NAVBAR.JSX
const navbarPath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Navbar.jsx');
let navContent = fs.readFileSync(navbarPath, 'utf8');

// Replace Bentonite title
navContent = navContent.replace(
  '<span>Bentonite Clay Catalogue (26 Products - Kutch Bento Clay Reference)</span>',
  '<span>Bentonite Clay Portfolio (26 Specialized Mineral Grades)</span>'
);

// Replace China Clay title
navContent = navContent.replace(
  '<span>China Clay & Kaolin Minerals (Shyam Clay Reference)</span>',
  '<span>China Clay & Kaolin Minerals Portfolio</span>'
);

// Replace subtitle
navContent = navContent.replace(
  '<span className="text-xs text-slate-500 font-medium">Excluding Silica Sand & Quartz</span>',
  '<span className="text-xs text-slate-500 font-medium">Direct Kutch Mining & Refining Hub</span>'
);

// Clean comments
navContent = navContent.replace(/\/\/ 10 items from SKC Salt Industrial Salt dropdown/g, '// 10 Industrial Salt products');
navContent = navContent.replace(/\/\/ 12 items from SKC Salt Edible Salt dropdown/g, '// 12 Edible Salt products');
navContent = navContent.replace(/\/\/ 26 items from Kutch Bento Clay \(organized in 4 columns\)/g, '// 26 Bentonite Clay products');
navContent = navContent.replace(/\/\/ China Clay & Kaolin products from Shyam Clay \(Excluding Silica Sand & Silica Quartz Powder\)/g, '// China Clay & Kaolin products');
navContent = navContent.replace(/\{ \/\* China Clay & Kaolin Mega-Dropdown \(Shyam Clay with subcategories\) \*\/ \}/g, '{/* China Clay & Kaolin Mega-Dropdown */}');

fs.writeFileSync(navbarPath, navContent, 'utf8');
console.log('Cleaned Navbar.jsx!');

// 2. CLEAN DATABASE.JSON
const dbPath = path.join(__dirname, 'server', 'data', 'database.json');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Regex patterns to remove references cleanly
function cleanText(str) {
  if (typeof str !== 'string') return str;
  return str
    // Remove parenthetical references like (Reference: SKC Salt), (SKC Salt reference), (Reference: Shyam Clay)
    .replace(/\s*\((?:Reference:?|ref:?)\s*[^)]+\)/gi, '')
    .replace(/\s*\([^)]*reference[^)]*\)/gi, '')
    .replace(/\s*\(Excluding Silica Sand[^\)]*\)/gi, '')
    // Remove inline phrases like "SKC Salt reference", "Shyam Clay reference"
    .replace(/,\s*skc\s*salt\s*reference/gi, '')
    .replace(/,\s*kutch\s*bentoclay\s*reference/gi, '')
    .replace(/,\s*shyam\s*clay\s*reference/gi, '')
    .replace(/skc\s*salt\s*reference/gi, 'industrial salt supplier')
    .replace(/kutch\s*bentoclay\s*reference/gi, 'bentonite manufacturer')
    .replace(/shyam\s*clay\s*reference/gi, 'kaolin manufacturer')
    // Remove "Reference: SKC Salt." or similar standalone sentences
    .replace(/Reference:\s*SKC\s*Salt\.?/gi, '')
    .replace(/Reference:\s*Kutch\s*Bento\s*Clay\.?/gi, '')
    .replace(/Reference:\s*Shyam\s*Clay\.?/gi, '')
    // Clean trailing periods or double spaces
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function deepClean(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClean);
  } else if (obj !== null && typeof obj === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = deepClean(v);
    }
    return res;
  } else if (typeof obj === 'string') {
    return cleanText(obj);
  }
  return obj;
}

const db = JSON.parse(dbContent);
const cleanedDb = deepClean(db);

fs.writeFileSync(dbPath, JSON.stringify(cleanedDb, null, 2), 'utf8');
console.log('Cleaned database.json!');

// Also clean seedData.js
const seedPath = path.join(__dirname, 'server', 'data', 'seedData.js');
if (fs.existsSync(seedPath)) {
  let seed = fs.readFileSync(seedPath, 'utf8');
  seed = seed
    .replace(/\s*\((?:Reference:?|ref:?)\s*[^)]+\)/gi, '')
    .replace(/\s*\([^)]*reference[^)]*\)/gi, '')
    .replace(/\s*\(Excluding Silica Sand[^\)]*\)/gi, '')
    .replace(/,\s*skc\s*salt\s*reference/gi, '')
    .replace(/,\s*kutch\s*bentoclay\s*reference/gi, '')
    .replace(/,\s*shyam\s*clay\s*reference/gi, '')
    .replace(/skc\s*salt\s*reference/gi, 'industrial salt supplier')
    .replace(/kutch\s*bentoclay\s*reference/gi, 'bentonite manufacturer')
    .replace(/shyam\s*clay\s*reference/gi, 'kaolin manufacturer')
    .replace(/Reference:\s*SKC\s*Salt\.?/gi, '')
    .replace(/Reference:\s*Kutch\s*Bento\s*Clay\.?/gi, '')
    .replace(/Reference:\s*Shyam\s*Clay\.?/gi, '');
  fs.writeFileSync(seedPath, seed, 'utf8');
  console.log('Cleaned seedData.js!');
}

