const pool = require('./db');
const { handleCors } = require('./middleware');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: 'ok',
      timestamp: result.rows[0].now,
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      error: 'Database connection failed',
      message: err.message,
    });
  }
};
