const Meet = require('../../../models/Meet');
const Employee = require('../../../models/Employee');
const EmployeeMeet = require('../../../models/EmployeeMeet');
var Sequelize = require('sequelize');

const handler = async (req, res, next) => {

    const employeesIds = Array.isArray(req.query.employeeIds) ? req.query.employeeIds : new Array(req.query.employeeIds);

    const allMeetsByEmployees = await Employee.findAll({
        where: {
            id: { [Sequelize.Op.in]: employeesIds }
        },
        include: [{
            model: Meet,
            required: false,
            attributes: ['id', 'meetName', 'meetDate', 'meetStart', 'meetEnd'],
            through: {
                // This block of code allows you to retrieve the properties of the join table
                model: EmployeeMeet,
                as: 'EmployeeMeets',
                attributes: ['qty'],
            }
        }]
    });

    res.status(200).json(allMeetsByEmployees);
}

module.exports = handler;