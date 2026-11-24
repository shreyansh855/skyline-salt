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

async function run() {
  console.log('Fetching https://shyamclay.com/ ...');
  const html = await fetchUrl('https://shyamclay.com/');

  // Look for nav links and dropdowns
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = cleanText(match[2]);
    if (text.length > 1 && !text.includes('Home') && !text.includes('About') && !text.includes('Contact') && !text.includes('Gallery') && !text.includes('Enquire')) {
      links.push({ href, text });
    }
  }

  console.log('Product menu links found on Shyam Clay:');
  links.forEach(l => console.log(`- "${l.text}" -> ${l.href}`));

  // Also check sitemap
  try {
    const sitemap = await fetchUrl('https://shyamclay.com/sitemap.xml');
    console.log('\nSitemap found! Length:', sitemap.length);
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    console.log('Sitemap URLs:');
    locs.forEach(u => console.log('  ' + u));
  } catch (e) {
    console.log('No sitemap.xml');
  }
}

run();

