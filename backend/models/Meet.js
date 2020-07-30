const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class Meet extends Model { }

Meet.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    meetName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Meet',
    timestamps: true,
  }
);

module.exports = Meet;