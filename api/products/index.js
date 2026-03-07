const pool = require('../db');
const { handleCors } = require('../middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM products ORDER BY id');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { name, region, symbolism, personality, price, tier, image } = req.body;
      const result = await pool.query(
        'INSERT INTO products (name, region, symbolism, personality, price, tier, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, region, symbolism, personality, price, tier, image]
      );
      return res.status(201).json(result.rows[0]);
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
