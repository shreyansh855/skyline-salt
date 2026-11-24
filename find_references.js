const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f.endsWith('.log') || f === 'find_references.js') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full, pattern);
    } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      if (pattern.test(content)) {
        console.log('\nFILE: ' + full);
        const lines = content.split('\n');
        lines.forEach((l, idx) => {
          if (pattern.test(l)) {
            console.log('  L' + (idx+1) + ': ' + l.trim());
          }
        });
      }
    }
  }
}

console.log('=== 1. SEARCH FOR "reference" IN CLIENT/SRC ===');
searchDir('./client/src', /reference/i);

console.log('\n=== 2. SEARCH FOR "kutch bento" IN CLIENT/SRC ===');
searchDir('./client/src', /kutch\s*bento/i);

console.log('\n=== 3. SEARCH FOR "shyam" IN CLIENT/SRC ===');
searchDir('./client/src', /shyam/i);

console.log('\n=== 4. SEARCH FOR "skc" IN CLIENT/SRC ===');
searchDir('./client/src', /skc/i);

console.log('\n=== 5. SEARCH FOR COMPETITORS IN DATABASE.JSON ===');
searchDir('./server/data', /kutch\s*bento|shyam\s*clay|skc\s*salt|reference/i);

