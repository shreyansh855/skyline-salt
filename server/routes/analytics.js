const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// POST /api/analytics/track - Public track hit
router.post('/track', (req, res) => {
  try {
    const { path, referrer, productSlug, deviceType } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    db.logVisit({
      path: path || '/',
      referrer: referrer || 'direct',
      productSlug: productSlug || null,
      deviceType: deviceType || 'Desktop',
      ip: ip.replace(/:\d+$/, ''),
      userAgent: userAgent.substring(0, 150)
    });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Track failed' });
  }
});

// GET /api/analytics/dashboard (Auth)
router.get('/dashboard', requireAuth, (req, res) => {
  try {
    const summary = db.getAnalyticsSummary();
    res.json({ analytics: summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;

