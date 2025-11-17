// models/category.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // Category 1,N Specialty
      Category.hasMany(models.Specialty, {
        foreignKey: 'id_categorie',
        as: 'specialties',
      });
    }
  }

  Category.init(
    {
      id_categorie: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_categorie: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categorie',
      timestamps: false,
      underscored: true,
    }
  );

  return Category;
};
