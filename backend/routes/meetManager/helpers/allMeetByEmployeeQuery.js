const Meet = require('../../../models/Meet');
const Employee = require('../../../models/Employee');
const EmployeeMeet = require('../../../models/EmployeeMeet');
const Sequelize = require('sequelize');

const allMeetByEmployeeQuery = async (employeesIds) => {
    return await Employee.findAll({
        where: {
            id: { [Sequelize.Op.in]: employeesIds }
        },
        include: [{
            model: Meet,
            required: false,
            attributes: ['id', 'meetName', 'meetDate', 'meetStart', 'meetEnd'],
            through: {
                model: EmployeeMeet,
                as: 'EmployeeMeets',
                attributes: ['qty'],
            }
        }]
    });
}

module.exports = allMeetByEmployeeQuery;