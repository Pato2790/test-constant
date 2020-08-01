const Meet = require('../models/Meet');
const Employee = require('../models/Employee');
const EmployeeMeet = require('../models/EmployeeMeet');

const initModel = async () => {
  
  //  Relations
  Employee.belongsToMany(Meet, {
    through: 'EmployeeMeet',
    foreignKey: 'employeeId',
    otherKey: 'meetId'
  });

  Meet.belongsToMany(Employee, {
    through: 'EmployeeMeet',
    foreignKey: 'meetId',
    otherKey: 'employeeId'
  });

  await Employee.sync();
  await Meet.sync();
  await EmployeeMeet.sync();
}

module.exports = initModel