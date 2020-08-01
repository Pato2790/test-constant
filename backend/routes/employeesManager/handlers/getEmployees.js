const Employees = require('../../../models/Employee');

const handler = async (req, res, next) => {
    const employees = await Employees.findAll();

    res.status(200).json(employees);
}

module.exports = handler;