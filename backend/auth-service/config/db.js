import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = (text, params) => pool.query(text, params);
pool.on("connect", () => {
  console.log("Database connection successful");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export { pool };
