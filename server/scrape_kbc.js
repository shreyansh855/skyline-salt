const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
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

async function run() {
  console.log('Fetching kutchbentoclay.com/our-products.php...');
  const html = await fetchUrl('https://kutchbentoclay.com/our-products.php');
  console.log('Fetched HTML length:', html.length);

  // Extract all links
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = cleanText(match[2]);
    if (href.endsWith('.php') && !href.includes('index') && !href.includes('about') && !href.includes('contact') && !href.includes('gallery') && !href.includes('blog') && !href.includes('process') && !href.includes('policy') && !href.includes('research')) {
      links.push({ href, text });
    }
  }

  console.log(`Found ${links.length} potential product links:`);
  links.forEach(l => console.log(`- ${l.text} -> ${l.href}`));

  fs.writeFileSync(path.join(__dirname, 'kbc_links.json'), JSON.stringify(links, null, 2));
}

run();

