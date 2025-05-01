const dotenv = require('dotenv');
const { readFile } = require('fs/promises');
const { join } = require('path');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

dotenv.config();

const initUsers = async (client) => {
  // Encode the password "password"
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync('password', salt);

  // Insert user with John Doe instead of John Smith
  const insertUserQuery = `
    INSERT INTO Staff (Contract_num, Staff_Name, Surname, Patronymic, Salary, Phone_num, Qualification_cert_number_of_coach, Email, Department_id, Login_password)
    VALUES ('C231', 'John', 'Doe', 'Doeich', 5000.00, '+380123456789', 'CERT-231', 'john.smith@gymdb.com', 1, $1)
  `;

  await client.query(insertUserQuery, [passwordHash]);
  console.log('✅ Initial user created!');
};

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

    // 3) Load and execute mock_data.sql
    const mockData = await readFile(join(__dirname, 'initData.sql'), 'utf-8');
    await client.query(mockData);

    // 4) Initialize users with our custom user
    await initUsers(client);

    console.log('✅ Database reset and initialized!');
  } catch (err) {
    console.error('❌ Initialization failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetDatabase();
