import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'LMS-pfe',
});

export const query = (text, params) => pool.query(text, params);
pool.on('connect', () => {
  console.log('Database connection successful');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export { pool };