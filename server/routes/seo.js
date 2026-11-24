const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// GET /api/seo
router.get('/', (req, res) => {
  try {
    const seo = db.getSeoData();
    res.json({ seo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch SEO settings' });
  }
});

// PUT /api/seo/page (Auth)
router.put('/page', requireAuth, (req, res) => {
  try {
    const { path, metadata } = req.body;
    if (!path || !metadata) {
      return res.status(400).json({ error: 'Path and metadata are required' });
    }

    const seo = db.getSeoData();
    if (!seo.pages) seo.pages = {};
    seo.pages[path] = { ...seo.pages[path], ...metadata };
    db.updateSeoData(seo);

    res.json({ message: 'Page SEO metadata updated', path, metadata: seo.pages[path] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update SEO' });
  }
});

module.exports = router;

