const allMeetByEmployeeQuery = require('../helpers/allMeetByEmployeeQuery');

const handler = async (req, res, next) => {

    const employeesIds = Array.isArray(req.query.employeeIds) ? req.query.employeeIds : new Array(req.query.employeeIds);

    const allMeetsByEmployees = await allMeetByEmployeeQuery(employeesIds);

    res.status(200).json(allMeetsByEmployees);
}

module.exports = handler;