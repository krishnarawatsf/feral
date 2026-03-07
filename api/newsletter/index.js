const pool = require('../db');
const { handleCors } = require('../middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  try {
    if (req.method === 'POST') {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if email already subscribed
      const existing = await pool.query(
        'SELECT id FROM newsletter_subscribers WHERE email = $1',
        [email]
      );

      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'Email already subscribed' });
      }

      const result = await pool.query(
        'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *',
        [email]
      );

      return res.status(201).json({
        message: 'Successfully subscribed to newsletter',
        subscriber: result.rows[0],
      });
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
