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
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await argon2.hash(password);

    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ user: result.rows[0], token });
  } catch (err) {
    console.error(err);
    if (err.message.includes('duplicate key')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: err.message });
  }
};
