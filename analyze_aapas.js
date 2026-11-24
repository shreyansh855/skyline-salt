const fs = require('fs');

const html = fs.readFileSync('aapas_homepage.html', 'utf8');

// Find all CSS styles or external stylesheet links
const cssLinks = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi)].map(m => m[1]);
console.log('CSS links:', cssLinks.slice(0, 10));

// Find sections and their structure
const sectionMatches = [...html.matchAll(/<section[^>]*class=["']([^"']*)["'][^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Sections count:', sectionMatches.length);
sectionMatches.forEach((m, idx) => {
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
  console.log(`\n--- Section ${idx + 1} [class: ${m[1]}] ---`);
  console.log(text);
});

// If not using <section>, find main container divs
if (sectionMatches.length === 0) {
  const elementorSections = [...html.matchAll(/class=["'][^"']*elementor-section[^"']*["']/gi)];
  console.log('Elementor sections found:', elementorSections.length);
}

