// // Database configuration
// // This file provides configuration for both real and test databases

import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Optional: disables SQL query logging in console
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();


export default sequelize;

