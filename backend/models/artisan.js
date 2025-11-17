// models/artisan.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Artisan extends Model {
    static associate(models) {
      // Artisan N,1 Specialty
      Artisan.belongsTo(models.Specialty, {
        foreignKey: 'id_specialite',
        as: 'specialty',
      });

      // Artisan 1,N MessageContact
      Artisan.hasMany(models.MessageContact, {
        foreignKey: 'id_artisan',
        as: 'messages',
      });
    }
  }

  Artisan.init(
    {
      id_artisan: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_artisan: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      note: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
      },
      ville: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      site_web: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email_contact: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      artisan_du_mois: {
        type: DataTypes.BOOLEAN, // TINYINT(1) mappé en booléen
        allowNull: false,
        defaultValue: false,
      },
      id_specialite: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Artisan',
      tableName: 'artisan',
      timestamps: false,
      underscored: true,
    }
  );

  return Artisan;
};
