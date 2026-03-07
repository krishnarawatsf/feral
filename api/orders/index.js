const pool = require('../db');
const { handleCors, verifyToken } = require('../middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      if (!token || !verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { user_id, product_id, quantity, total_price } = req.body;

      if (!user_id || !product_id || !quantity || !total_price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await pool.query(
        'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, product_id, quantity, total_price]
      );

      return res.status(201).json(result.rows[0]);
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
