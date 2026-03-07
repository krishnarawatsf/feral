const pool = require('../db');
const { handleCors } = require('../middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { name, region, symbolism, personality, price, tier, image } = req.body;
      const result = await pool.query(
        'UPDATE products SET name=$1, region=$2, symbolism=$3, personality=$4, price=$5, tier=$6, image=$7 WHERE id=$8 RETURNING *',
        [name, region, symbolism, personality, price, tier, image, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted' });
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
