// test-db.js
require('dotenv').config();
const db = require('./models');

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Connexion à la base MySQL via Sequelize OK !');
    // Optionnel : vérifier qu'on voit les tables
    const tables = await db.sequelize.getQueryInterface().showAllTables();
    console.log('Tables présentes :', tables);
  } catch (error) {
    console.error('❌ Erreur de connexion Sequelize :', error.message);
    console.error(error);
  } finally {
    await db.sequelize.close();
  }
}

testConnection();
