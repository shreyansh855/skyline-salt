const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// GET /api/content
router.get('/', (req, res) => {
  try {
    const content = db.getContent();
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch website content' });
  }
});

// PUT /api/content/:section (Auth)
router.put('/:section', requireAuth, (req, res) => {
  try {
    const updated = db.updateContent(req.params.section, req.body);
    res.json({ message: `Content section '${req.params.section}' updated`, section: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update section content' });
  }
});

module.exports = router;

