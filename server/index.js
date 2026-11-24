const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/content', require('./routes/content'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/seo', require('./routes/seo'));
app.use('/api/upload', require('./routes/upload'));

// Dynamic XML Sitemap
app.get('/sitemap.xml', (req, res) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const products = db.getProducts({ isActive: true });
  const categories = db.getCategories();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${host}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${host}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/products</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${host}/manufacturing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/industries</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${host}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;

  categories.forEach(cat => {
    xml += `
  <url>
    <loc>${host}/products/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  });

  products.forEach(prod => {
    xml += `
  <url>
    <loc>${host}/products/${prod.categorySlug}/${prod.slug}</loc>
    <lastmod>${prod.updatedAt ? prod.updatedAt.split('T')[0] : '2026-01-01'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Dynamic Robots.txt
app.get('/robots.txt', (req, res) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${host}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(txt);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Skyline Salt and Minerals API',
    productsCount: db.getProducts().length,
    categoriesCount: db.getCategories().length
  });
});

// Serve frontend in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
const indexPath = path.join(clientDist, 'index.html');

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  
  // SPA fallback for all frontend routes (including /admin, /products, etc.)
  app.use((req, res) => {
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
      if (fs.existsSync(indexPath)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(fs.readFileSync(indexPath, 'utf8'));
      }
    }
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Skyline Salt and Minerals Server Started`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📋 Admin URL: http://localhost:${PORT}/admin`);
  console.log(`====================================================`);
});
