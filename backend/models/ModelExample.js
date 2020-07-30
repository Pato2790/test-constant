const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class ModelExample extends Model { }

ModelExample.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    propExample: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'ModelExample',
    timestamps: true,
  }
);

module.exports = ModelExample;