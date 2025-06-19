// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

console.log('PostgreSQL Pool created successfully');

const query = async (sql, values) => {
  try {
    const result = await pool.query(sql, values);
    return result.rows; 
  } catch (err) {
    console.error('Query error:', err);
    throw err;
  }
};

module.exports = query;
