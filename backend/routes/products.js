const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, region, symbolism, personality, price, tier, image } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, region, symbolism, personality, price, tier, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, region, symbolism, personality, price, tier, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, region, symbolism, personality, price, tier, image } = req.body;
    const result = await pool.query(
      'UPDATE products SET name=$1, region=$2, symbolism=$3, personality=$4, price=$5, tier=$6, image=$7 WHERE id=$8 RETURNING *',
      [name, region, symbolism, personality, price, tier, image, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
