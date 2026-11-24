const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// POST /api/enquiries - Public enquiry submission
router.post('/', (req, res) => {
  try {
    const { name, company, email, phone, product, grade, quantity, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const newEnquiry = db.addEnquiry({
      name: name.trim(),
      company: (company || '').trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      product: product || 'General Enquiry',
      grade: grade || 'Standard',
      quantity: quantity || '',
      message: (message || '').trim(),
      ip
    });

    // Simulate sending email notification to company business inbox
    const settings = db.getSettings();
    console.log(`[EMAIL NOTIFICATION] New enquiry received from ${name} (${email}) for ${product}. Notification dispatched to ${settings.emailInfo || 'Info@skylinesaltandminerals.com'}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. Our commercial technical team will contact you promptly with complete specifications and quotations.',
      enquiryId: newEnquiry.id
    });
  } catch (err) {
    console.error('Enquiry error:', err);
    res.status(500).json({ error: 'Failed to submit enquiry. Please call us directly.' });
  }
});

// GET /api/enquiries - List all enquiries (Auth)
router.get('/', requireAuth, (req, res) => {
  try {
    const { status } = req.query;
    const enquiries = db.getEnquiries({ status });
    res.json({ enquiries, count: enquiries.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// PATCH /api/enquiries/:id/status - Update status and add notes (Auth)
router.patch('/:id/status', requireAuth, (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    
    const updated = db.updateEnquiryStatus(req.params.id, status, note);
    if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
    
    res.json({ message: 'Enquiry status updated', enquiry: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// DELETE /api/enquiries/:id - Delete enquiry (Auth)
router.delete('/:id', requireAuth, (req, res) => {
  try {
    db.deleteEnquiry(req.params.id);
    res.json({ message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

// GET /api/enquiries/export/csv - Export CSV of enquiries (Auth)
router.get('/export/csv', requireAuth, (req, res) => {
  try {
    const enquiries = db.getEnquiries();
    let csv = 'ID,Date,Name,Company,Email,Phone,Product,Grade,Quantity,Status,Message\n';
    enquiries.forEach(e => {
      const escape = (val) => `"${(val || '').replace(/"/g, '""')}"`;
      csv += `${e.id},${e.createdAt},${escape(e.name)},${escape(e.company)},${escape(e.email)},${escape(e.phone)},${escape(e.product)},${escape(e.grade)},${escape(e.quantity)},${e.status},${escape(e.message)}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment(`skyline_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

module.exports = router;

