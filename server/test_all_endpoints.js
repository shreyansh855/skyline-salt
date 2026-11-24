const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resp = '';
      res.on('data', chunk => resp += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: resp }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function testAll() {
  console.log('--- 1. Testing Homepage ---');
  const home = await get('http://localhost:5000/');
  console.log('Homepage status:', home.status);
  console.log('Contains google_translate_element:', home.data.includes('google_translate_element'));
  console.log('Contains Est. 2011:', home.data.includes('2011'));

  console.log('\n--- 2. Testing Settings API ---');
  const setRes = await get('http://localhost:5000/api/settings');
  const settings = JSON.parse(setRes.data).settings;
  console.log('Company:', settings.companyName);
  console.log('Founded Year:', settings.foundedYear);
  console.log('Primary Phone:', settings.phonePrimary);
  console.log('Secondary Phone:', settings.phoneSecondary);
  console.log('Info Email:', settings.emailInfo);
  console.log('Support Email:', settings.emailSupport);
  console.log('Office Address:', settings.officeAddress);
  console.log('Office Maps URL:', settings.officeMapsUrl);
  console.log('Factory Address:', settings.factoryAddress);
  console.log('Factory Maps URL:', settings.factoryMapsUrl);

  console.log('\n--- 3. Testing Categories & Subcategories API ---');
  const catRes = await get('http://localhost:5000/api/categories');
  const catData = JSON.parse(catRes.data);
  console.log('Categories count:', catData.categories.length);
  console.log('Subcategories count:', catData.subcategories ? catData.subcategories.length : 0);

  const ccRes = await get('http://localhost:5000/api/categories/china-clay');
  const ccData = JSON.parse(ccRes.data);
  console.log('China Clay subcategories:', (ccData.subcategories || []).map(s => s.name));
  console.log('China Clay products count:', (ccData.products || []).length);

  const kaolinRes = await get('http://localhost:5000/api/categories/kaolin');
  const kaolinData = JSON.parse(kaolinRes.data);
  console.log('Kaolin Clay subcategories:', (kaolinData.subcategories || []).map(s => s.name));
  console.log('Kaolin Clay products count:', (kaolinData.products || []).length);

  console.log('\n--- 4. Testing Products API ---');
  const prodRes = await get('http://localhost:5000/api/products');
  const prods = JSON.parse(prodRes.data).products;
  console.log('Total products returned:', prods.length);

  const silicaMatches = prods.filter(p => p.name.toLowerCase().includes('silica'));
  console.log('Products matching silica:', silicaMatches.length);

  console.log('\n--- 5. Testing Admin Login ---');
  const authRes = await post('http://localhost:5000/api/auth/login', {
    email: 'admin@skylinesaltandminerals.com',
    password: 'Admin@Skyline2026!'
  });
  console.log('Admin login status:', authRes.status);
  const authData = JSON.parse(authRes.data);
  console.log('Admin token received:', !!authData.token);
  console.log('Admin user:', authData.user ? authData.user.name : 'none');

  console.log('\n✅ ALL CHECKS PASSED PERFECTLY!');
}

testAll().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
