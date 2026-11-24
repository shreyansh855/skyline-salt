const fs = require('fs');
const path = require('path');

// 1. CLEAN NAVBAR.JSX
const navPath = path.join(__dirname, 'client', 'src', 'components', 'layout', 'Navbar.jsx');
let nav = fs.readFileSync(navPath, 'utf8');
nav = nav.replace(/Shyam Clay/g, 'Skyline Industrial Minerals');
nav = nav.replace(/Kutch Bento Clay/g, 'Skyline Bentonite Division');
nav = nav.replace(/SKC Salt/g, 'Skyline Salt Division');
nav = nav.replace(/reference/gi, 'portfolio');
fs.writeFileSync(navPath, nav, 'utf8');
console.log('Navbar.jsx sanitized!');

// 2. CLEAN DATABASE.JSON
const dbPath = path.join(__dirname, 'server', 'data', 'database.json');
let dbStr = fs.readFileSync(dbPath, 'utf8');

// Replace all occurrences of competitor names or reference phrases
dbStr = dbStr.replace(/,\s*skc\s*salt/gi, '');
dbStr = dbStr.replace(/skc\s*salt,?\s*/gi, '');
dbStr = dbStr.replace(/,\s*shyam\s*clay/gi, '');
dbStr = dbStr.replace(/shyam\s*clay,?\s*/gi, '');
dbStr = dbStr.replace(/,\s*kutch\s*bentoclay/gi, '');
dbStr = dbStr.replace(/kutch\s*bentoclay,?\s*/gi, '');
dbStr = dbStr.replace(/,\s*kutch\s*bentonite\s*clay/gi, '');
dbStr = dbStr.replace(/\s*\([^)]*reference[^)]*\)/gi, '');
dbStr = dbStr.replace(/reference:?\s*[^.,"\n]+/gi, '');

fs.writeFileSync(dbPath, dbStr, 'utf8');
console.log('database.json sanitized!');

// Also delete or overwrite database.backup.json
const backupPath = path.join(__dirname, 'server', 'data', 'database.backup.json');
if (fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, dbStr, 'utf8');
}

// 3. CLEAN SEEDDATA.JS
const seedPath = path.join(__dirname, 'server', 'data', 'seedData.js');
if (fs.existsSync(seedPath)) {
  let seedStr = fs.readFileSync(seedPath, 'utf8');
  seedStr = seedStr.replace(/,\s*skc\s*salt/gi, '');
  seedStr = seedStr.replace(/skc\s*salt,?\s*/gi, '');
  seedStr = seedStr.replace(/,\s*shyam\s*clay/gi, '');
  seedStr = seedStr.replace(/shyam\s*clay,?\s*/gi, '');
  seedStr = seedStr.replace(/,\s*kutch\s*bentoclay/gi, '');
  seedStr = seedStr.replace(/kutch\s*bentoclay,?\s*/gi, '');
  seedStr = seedStr.replace(/\s*\([^)]*reference[^)]*\)/gi, '');
  seedStr = seedStr.replace(/reference:?\s*[^.,"\n]+/gi, '');
  fs.writeFileSync(seedPath, seedStr, 'utf8');
  console.log('seedData.js sanitized!');
}

