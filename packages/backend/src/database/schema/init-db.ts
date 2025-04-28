const dotenv = require('dotenv');
const { readFile } = require('fs/promises');
const { join } = require('path');
const { Client } = require('pg');

dotenv.config();

async function resetDatabase() {
  const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : undefined,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  };

  const client = new Client(config);

  try {
    await client.connect();

    // 1) Drop & recreate public schema
    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

    // 2) Load and execute schema.sql
    const sql = await readFile(join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(sql);

    console.log('✅ Database reset and initialized!');
  } catch (err) {
    console.error('❌ Initialization failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetDatabase();
