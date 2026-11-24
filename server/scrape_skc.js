const https = require('https');
const fs = require('fs');
const path = require('path');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function cleanText(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/\s+/g, ' ').trim();
}

const industrialPages = [
  { name: 'Sodium Chloride', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/sodium-chloride-manufacturer-in-gujarat/' },
  { name: 'Fine Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/fine-salt-manufacturer-in-gujarat/' },
  { name: 'PDV Salt (Pure dried vacuum)', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/pdv-salt-manufacturer-in-gujarat/' },
  { name: 'Salt Tablets', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/salt-tablets-manufacturer-in-gujarat/' },
  { name: 'Coarse Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/coarse-salt-manufacturer-in-gujarat/' },
  { name: 'Mesh Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/mesh-salt-manufacturer-in-gujarat/' },
  { name: 'Non Iodized Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/non-iodized-salt-manufacturer-in-gujarat/' },
  { name: 'Low Hardness Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/low-hardness-salt-manufacturer-in-gujarat/' },
  { name: 'Washery Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/washery-salt-manufacturer-in-gujarat/' },
  { name: 'Water Softener Salt', url: 'https://skcsalt.com/industrial-salt-manufacturer-in-gujarat/water-softener-salt-manufacturer-in-gujarat/' },
];

const ediblePages = [
  { name: 'Raw Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/raw-salt-manufacturer-in-gujarat/' },
  { name: 'Refined Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/refined-salt-manufacturer-in-gujarat/' },
  { name: 'Marine Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/marine-salt-manufacturer-in-gujarat/' },
  { name: 'Pure Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/pure-salt-manufacturer-in-gujarat/' },
  { name: 'Crystal Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/crystal-salt-manufacturer-in-gujarat/' },
  { name: 'Free Flow Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/free-flow-salt-manufacturer-in-gujarat/' },
  { name: 'Free Flow Iodized Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/free-flow-iodized-salt-manufacturer-in-gujarat/' },
  { name: 'Iodized Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/iodized-salt-manufacturer-in-gujarat/' },
  { name: 'Iodized Refined Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/iodized-refined-salt-manufacturer-in-gujarat/' },
  { name: 'Double Refined Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/double-refined-salt-manufacturer-in-gujarat/' },
  { name: 'Triple Refined Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/triple-refined-salt-manufacturer-in-gujarat/' },
  { name: 'Table Salt', url: 'https://skcsalt.com/edible-salt-manufacturer-in-gujarat/refined-salt-manufacturer-in-gujarat/' }, // Also check table salt page or alias
];

async function parsePage(item) {
  console.log(`Fetching: ${item.name} (${item.url})`);
  try {
    const html = await fetch(item.url);
    
    // Extract title / H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? cleanText(h1Match[1]) : item.name;

    // Extract paragraphs from entry-content or main area
    const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => cleanText(m[1]))
      .filter(t => t.length > 50 && !t.includes('Copyright') && !t.includes('cookie') && !t.includes('All rights reserved'));

    // Extract images
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
      .map(m => m[1])
      .filter(src => src.includes('skcsalt.com') && (src.includes('/uploads/') || src.includes('.jpg') || src.includes('.png') || src.includes('.webp')))
      .filter(src => !src.includes('logo') && !src.includes('svg') && !src.includes('icon') && !src.includes('avatar'));

    // Extract specifications table
    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    const specs = [];
    if (tableMatch) {
      const rowMatches = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
      for (const row of rowMatches) {
        const cols = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c => cleanText(c[1]));
        if (cols.length >= 2 && cols[0] && cols[1] && !cols[0].toLowerCase().includes('parameter') && !cols[0].toLowerCase().includes('sr')) {
          specs.push({
            parameter: cols[0],
            value: cols[1],
            testMethod: cols[2] || 'Standard Lab Method'
          });
        }
      }
    }

    return {
      name: item.name,
      title,
      paragraphs: pMatches.slice(0, 5),
      images: Array.from(new Set(imgMatches)),
      specifications: specs
    };
  } catch (err) {
    console.error(`Error on ${item.name}:`, err.message);
    return null;
  }
}

async function run() {
  const allResults = { industrial: [], edible: [] };

  for (const item of industrialPages) {
    const res = await parsePage(item);
    if (res) allResults.industrial.push(res);
  }

  for (const item of ediblePages) {
    const res = await parsePage(item);
    if (res) allResults.edible.push(res);
  }

  fs.writeFileSync(path.join(__dirname, 'scraped_skc_data.json'), JSON.stringify(allResults, null, 2));
  console.log('Finished scraping SKC products! Saved to scraped_skc_data.json');
}

run();

