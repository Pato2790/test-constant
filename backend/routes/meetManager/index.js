const express = require('express');
const meetManagerRouter = express.Router();

const getMeets = require('./handlers/getMeets');
const bookMeet = require('./handlers/bookMeet');
const getMeetsByEmployees = require('./handlers/getMeetsByEmployees');

// Get all Meets
meetManagerRouter.get('/', getMeets);

// Get all Meets by Employees
meetManagerRouter.get('/meetsByEmployees', getMeetsByEmployees);

// Post new Meet
meetManagerRouter.post('/', bookMeet);

module.exports = meetManagerRouter;