const pool = require('../db');
const { handleCors, verifyToken } = require('../middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  const { id } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (req.method === 'GET') {
      const result = await pool.query(
        'SELECT id, email, name, created_at FROM users WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      if (!token || !verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { name, email } = req.body;
      const result = await pool.query(
        'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, email, name',
        [name, email, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(result.rows[0]);
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
