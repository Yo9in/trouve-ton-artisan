// models/specialty.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Specialty extends Model {
    static associate(models) {
      // Specialty N,1 Category
      Specialty.belongsTo(models.Category, {
        foreignKey: 'id_categorie',
        as: 'category',
      });

      // Specialty 1,N Artisan
      Specialty.hasMany(models.Artisan, {
        foreignKey: 'id_specialite',
        as: 'artisans',
      });
    }
  }

  Specialty.init(
    {
      id_specialite: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_specialite: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      id_categorie: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Specialty',
      tableName: 'specialite',
      timestamps: false,
      underscored: true,
    }
  );

  return Specialty;
};
