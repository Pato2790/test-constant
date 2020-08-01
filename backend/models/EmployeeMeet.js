const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class EmployeeMeet extends Model { }

EmployeeMeet.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    employeeId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    meetId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    meetDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    meetStart: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    meetEnd: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'EmployeeMeet',
    timestamps: true,
  }
);

module.exports = EmployeeMeet;