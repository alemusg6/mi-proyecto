const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/restaurante_ordenes_db';
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
