const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class UserMeet extends Model { }

UserMeet.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    meetId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    },
    startMeet: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endMeet: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'UserMeet',
    timestamps: true,
  }
);

module.exports = UserMeet;