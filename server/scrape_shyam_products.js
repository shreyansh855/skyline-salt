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

const shyamPages = [
  { name: "China Clay Lumps", slug: "china-clay-lumps", group: "china-clay", url: "https://shyamclay.com/china-clay-lumps" },
  { name: "China Clay Powder", slug: "china-clay-powder", group: "china-clay", url: "https://shyamclay.com/china-clay-powder" },
  { name: "China Clay Noodles", slug: "china-clay-noodles", group: "china-clay", url: "https://shyamclay.com/china-clay-noodles" },
  { name: "Crude China Clay", slug: "crude-china-clay", group: "china-clay", url: "https://shyamclay.com/crude-china-clay" },
  { name: "Levigated China Clay", slug: "levigated-china-clay", group: "china-clay", url: "https://shyamclay.com/levigated-china-clay" },
  { name: "Calcined Kaolin Powder", slug: "calcined-kaolin-powder", group: "kaolin", url: "https://shyamclay.com/calcined-kaolin-powder" },
  { name: "Refractory Clay", slug: "refractory-clay", group: "other-minerals", url: "https://shyamclay.com/refractory-clay" },
  { name: "Kaolin Clay Noodles", slug: "kaolin-clay-noodles", group: "kaolin", url: "https://shyamclay.com/kaolin-clay-noodles-manufacturers-india" },
  { name: "Kaolin Clay Powder", slug: "kaolin-clay-powder", group: "kaolin", url: "https://shyamclay.com/kaolin-clay-powder-manufacturers-india" },
  { name: "Hydrous Kaolin Clay", slug: "hydrous-kaolin-clay", group: "kaolin", url: "https://shyamclay.com/hydrous-clay-manufacturer-in-india" }
];

async function parsePage(item) {
  console.log(`Parsing: ${item.name} (${item.url})`);
  try {
    const html = await fetchUrl(item.url);
    
    // H1 / title
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h1Match ? cleanText(h1Match[1]) : item.name;

    // Paragraphs
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => cleanText(m[1]))
      .filter(t => t.length > 50 && !t.includes('Copyright') && !t.includes('Vinayak') && !t.includes('+91') && !t.includes('Privacy'));

    // Images
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
      .map(m => m[1])
      .filter(src => (src.includes('.webp') || src.includes('.jpg') || src.includes('.png') || src.includes('.jpeg')))
      .filter(src => !src.includes('logo') && !src.includes('icon') && !src.includes('banner') && !src.includes('award') && !src.includes('certificate'))
      .map(src => src.startsWith('http') ? src : new URL(src, item.url).href);

    // Tables
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
            testMethod: cols[2] || 'IS / ASTM Method'
          });
        }
      }
    }

    return {
      name: item.name,
      slug: item.slug,
      group: item.group,
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
  for (const item of shyamPages) {
    const res = await parsePage(item);
    if (res) results.push(res);
  }

  fs.writeFileSync(path.join(__dirname, 'scraped_shyam_data.json'), JSON.stringify(results, null, 2));
  console.log(`Saved ${results.length} scraped Shyam Clay products to scraped_shyam_data.json`);
}

run();

