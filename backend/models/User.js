const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class User extends Model { }

User.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

module.exports = User;