const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// GET /api/settings - public view (censors sensitive smtp password)
router.get('/', (req, res) => {
  try {
    const settings = { ...db.getSettings() };
    if (settings.smtp) {
      settings.smtp = {
        ...settings.smtp,
        pass: settings.smtp.pass ? '••••••••' : ''
      };
    }
    res.json({ settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/settings - update settings globally (Auth)
router.put('/', requireAuth, (req, res) => {
  try {
    const updates = req.body;
    // Don't overwrite password with masked value
    if (updates.smtp && updates.smtp.pass === '••••••••') {
      const current = db.getSettings();
      updates.smtp.pass = current.smtp ? current.smtp.pass : '';
    }

    const updated = db.updateSettings(updates);
    res.json({ message: 'Company settings updated globally', settings: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;

