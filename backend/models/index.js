// models/index.js
const { Sequelize } = require('sequelize');
const createCategoryModel = require('./category');
const createSpecialtyModel = require('./specialty');
const createArtisanModel = require('./artisan');
const createMessageContactModel = require('./messageContact');

// � À adapter avec tes vraies variables d'env
const sequelize = new Sequelize(
  process.env.DB_NAME || 'trouve_ton_artisan',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};

// Initialisation des modèles
db.Category = createCategoryModel(sequelize);
db.Specialty = createSpecialtyModel(sequelize);
db.Artisan = createArtisanModel(sequelize);
db.MessageContact = createMessageContactModel(sequelize);

// Passage des modèles à leurs méthodes associate()
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
