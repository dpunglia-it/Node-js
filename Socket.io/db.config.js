// db.js
import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dbforchat",
  password: "12345678",
  port: 5432,
});

// Test connection once
pool.query("SELECT 1")
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB connection error", err));

export default pool;
