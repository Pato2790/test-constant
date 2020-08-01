const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class Employee extends Model { }

Employee.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    employeeName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  }
);

module.exports = Employee;