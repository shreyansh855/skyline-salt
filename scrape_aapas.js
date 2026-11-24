const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const res = await fetchUrl('https://aapasgroup.com/');
    console.log('Status:', res.status);
    fs.writeFileSync('aapas_homepage.html', res.data, 'utf8');
    console.log('Saved to aapas_homepage.html, length:', res.data.length);

    const titleMatch = res.data.match(/<title>([^<]+)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');

    // Extract colors (hex colors, rgb, css classes)
    const hexColors = [...new Set(res.data.match(/#[0-9a-fA-F]{6}\b/g) || [])];
    console.log('Hex colors found:', hexColors.slice(0, 20));

    // Extract navigation / header links
    const navLinks = [...res.data.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
      .filter(l => l.text.length > 0 && l.text.length < 50);
    console.log('Sample Nav links:', navLinks.slice(0, 15));

    // Extract headings
    const headings = [...res.data.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)]
      .map(m => ({ tag: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
      .filter(h => h.text.length > 0);
    console.log('Headings count:', headings.length);
    console.log('Headings sample:', headings.slice(0, 25));
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

run();

