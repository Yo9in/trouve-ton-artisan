// models/messageContact.js
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class MessageContact extends Model {
    static associate(models) {
      // MessageContact N,1 Artisan
      MessageContact.belongsTo(models.Artisan, {
        foreignKey: 'id_artisan',
        as: 'artisan',
      });
    }
  }

  MessageContact.init(
    {
      id_message: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_expediteur: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email_expediteur: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      objet: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contenu_message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date_envoi: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      id_artisan: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MessageContact',
      tableName: 'message_contact',
      timestamps: false,
      underscored: true,
    }
  );

  return MessageContact;
};
