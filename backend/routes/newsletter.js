const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Already subscribed' });
    }
    
    res.status(201).json({ message: 'Successfully subscribed', email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subscribers (admin only)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
