const express = require('express');
const meetManagerRouter = express.Router();

const getMeets = require('./handlers/getMeets');
const bookMeet = require('./handlers/bookMeet');

// Get all Meets
meetManagerRouter.get('/', getMeets);

// Post new Meet
meetManagerRouter.post('/', bookMeet);

module.exports = meetManagerRouter;