const pool = require('../db');
const { handleCors } = require('../middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
