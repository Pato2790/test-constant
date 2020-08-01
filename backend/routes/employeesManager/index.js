const express = require('express');
const employeeManagerRouter = express.Router();

const getEmployees = require('./handlers/getEmployees');

// Get all employees
employeeManagerRouter.get('/', getEmployees);

module.exports = employeeManagerRouter;