const express = require('express');
const meetManagerRouter = require('./meetManager');
const employeesManagerRouter = require('./employeesManager');
const apiRouter = express.Router();

module.exports = app => {
    // Declare routes directories
    apiRouter.use('/meetManager', meetManagerRouter);

    apiRouter.use('/employeeManager', employeesManagerRouter);

    apiRouter.get('/', (req, res, next) => {
        res.json('Node Backend Running OK...');
    });

    // Return not found if API endpoint does not exist
    apiRouter.use((req, res) => res.sendStatus(404));

    return apiRouter;
}