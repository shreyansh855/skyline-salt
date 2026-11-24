const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).href;
        }
        return resolve(fetchUrl(redirectUrl));
      }
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

const products = [
  { name: "Bentonite Powder", slug: "bentonite-powder", url: "https://www.kutchbentoclay.com/bentonite.php" },
  { name: "Sodium Bentonite", slug: "sodium-bentonite", url: "https://www.kutchbentoclay.com/sodiumbentonite.php" },
  { name: "Calcium Bentonite", slug: "calcium-bentonite", url: "https://www.kutchbentoclay.com/calciumbentonite.php" },
  { name: "Oil Drilling Bentonite", slug: "oil-drilling-bentonite", url: "https://www.kutchbentoclay.com/oildrillingbentonite.php" },
  { name: "Drilling Bentonite", slug: "drilling-bentonite", url: "https://www.kutchbentoclay.com/drillingbentonite.php" },
  { name: "Piling Bentonite", slug: "piling-bentonite", url: "https://www.kutchbentoclay.com/pilingbentonite.php" },
  { name: "HDD Bentonite", slug: "hdd-bentonite", url: "https://www.kutchbentoclay.com/hddbentonite.php" },
  { name: "API Bentonite", slug: "api-bentonite", url: "https://www.kutchbentoclay.com/apibentonite.php" },
  { name: "Micro Tunnelling Bentonite", slug: "micro-tunnelling-bentonite", url: "https://www.kutchbentoclay.com/microbentonite.php" },
  { name: "Foundry Bentonite", slug: "foundry-bentonite", url: "https://www.kutchbentoclay.com/foundrybentonite.php" },
  { name: "Iron Ore Pelletization Bentonite", slug: "iron-ore-pelletization-bentonite", url: "https://www.kutchbentoclay.com/ironorepelletizationbentonite.php" },
  { name: "Attapulgite", slug: "attapulgite-clay", url: "https://www.kutchbentoclay.com/attapulgite.php" },
  { name: "Refractory Bentonite", slug: "refractory-bentonite", url: "https://www.kutchbentoclay.com/refractorybentonite.php" },
  { name: "Ceramics Bentonite", slug: "ceramics-bentonite", url: "https://www.kutchbentoclay.com/ceramicsbentonite.php" },
  { name: "Earthing Bentonite", slug: "earthing-bentonite", url: "https://www.kutchbentoclay.com/earthingbentonite.php" },
  { name: "Fertilizers Bentonite", slug: "fertilizers-bentonite", url: "https://www.kutchbentoclay.com/fertilizersbentonite.php" },
  { name: "Animal Feed Bentonite", slug: "animal-feed-bentonite", url: "https://www.kutchbentoclay.com/animalfeedbentonite.php" },
  { name: "Paper Bentonite", slug: "paper-bentonite", url: "https://www.kutchbentoclay.com/paperindustrybentonite.php" },
  { name: "Pond Sealing Bentonite", slug: "pond-sealing-bentonite", url: "https://www.kutchbentoclay.com/pondliningbentonite.php" },
  { name: "Pharmaceutical Bentonite", slug: "pharmaceutical-bentonite", url: "https://www.kutchbentoclay.com/pharmaceuticalbentonite.php" },
  { name: "Cosmetics Bentonite", slug: "cosmetics-bentonite", url: "https://www.kutchbentoclay.com/cosmeticsbentonite.php" },
  { name: "Paints Bentonite", slug: "paints-bentonite", url: "https://www.kutchbentoclay.com/paintsbentonite.php" },
  { name: "GCL Bentonite", slug: "gcl-bentonite", url: "https://www.kutchbentoclay.com/gclbentonite.php" },
  { name: "Bentonite Granules", slug: "bentonite-granules", url: "https://www.kutchbentoclay.com/bentonitegranules.php" },
  { name: "Desiccant Granules", slug: "desiccant-granules", url: "https://www.kutchbentoclay.com/desiccantbentonite.php" },
  { name: "Cat Litter Bentonite", slug: "cat-litter-bentonite", url: "https://www.kutchbentoclay.com/catlitterbentonite.php" }
];

async function parsePage(item) {
  console.log(`Parsing: ${item.name} (${item.url})`);
  try {
    const html = await fetchUrl(item.url);
    
    // H1 or H2
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h1Match ? cleanText(h1Match[1]) : item.name;

    // Paragraphs
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => cleanText(m[1]))
      .filter(t => t.length > 40 && !t.includes('Copyright') && !t.includes('Reserved') && !t.includes('kutchbentoclay.com') && !t.includes('+91'));

    // Images
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
      .map(m => m[1])
      .filter(src => (src.includes('.jpg') || src.includes('.png') || src.includes('.jpeg') || src.includes('.webp')))
      .filter(src => !src.includes('logo') && !src.includes('banner') && !src.includes('icon') && !src.includes('whatsapp') && !src.includes('footer'))
      .map(src => src.startsWith('http') ? src : new URL(src, item.url).href);

    // Tables (Specifications)
    const tableMatches = [...html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)];
    const specs = [];
    for (const tm of tableMatches) {
      const rows = [...tm[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
      for (const row of rows) {
        const cols = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c => cleanText(c[1]));
        if (cols.length >= 2 && cols[0] && cols[1] && !cols[0].toLowerCase().includes('sr.') && !cols[0].toLowerCase().includes('parameter')) {
          specs.push({
            parameter: cols[0],
            value: cols[1],
            testMethod: cols[2] || 'IS / API Standard'
          });
        }
      }
    }

    return {
      name: item.name,
      slug: item.slug,
      title,
      paragraphs: paragraphs.slice(0, 6),
      images: Array.from(new Set(imgMatches)),
      specifications: specs
    };
  } catch (err) {
    console.error(`Error on ${item.name}:`, err.message);
    return null;
  }
}

async function run() {
  const results = [];
  for (const item of products) {
    const res = await parsePage(item);
    if (res) results.push(res);
  }

  fs.writeFileSync(path.join(__dirname, 'scraped_kbc_data.json'), JSON.stringify(results, null, 2));
  console.log(`Finished scraping ${results.length} Kutch Bento Clay products! Saved to scraped_kbc_data.json`);
}

run();

