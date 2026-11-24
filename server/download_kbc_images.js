const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const data = require('./scraped_kbc_data.json');

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).href;
        }
        return resolve(downloadFile(redirectUrl, dest));
      }
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: status ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  const uploadsDir = path.join(__dirname, 'uploads');
  const downloadedMap = {};

  for (const prod of data) {
    downloadedMap[prod.slug] = [];
    let count = 0;
    for (let i = 0; i < prod.images.length; i++) {
      const imgUrl = prod.images[i];
      const ext = path.extname(imgUrl).split('?')[0] || '.jpg';
      const filename = `kbc-${prod.slug}-${i + 1}${ext}`;
      const dest = path.join(uploadsDir, filename);

      const ok = await downloadFile(imgUrl, dest);
      if (ok && fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        downloadedMap[prod.slug].push(`/uploads/${filename}`);
        count++;
        console.log(`Saved ${filename} (${fs.statSync(dest).size} bytes)`);
      }
      if (count >= 2) break; // Keep up to 2 distinct images per product
    }

    // Fallback if none downloaded
    if (downloadedMap[prod.slug].length === 0) {
      downloadedMap[prod.slug].push('/uploads/kbc-drilling-bentonite.png');
    }
  }

  fs.writeFileSync(path.join(__dirname, 'kbc_downloaded_map.json'), JSON.stringify(downloadedMap, null, 2));
  console.log('Finished downloading KBC images!');
}

run();

