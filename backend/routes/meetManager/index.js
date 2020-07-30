const express = require('express');
const meetManagerRouter = express.Router();
const getMeets = require('./handlers/getMeets');

// const bookMeet = require('./handlers/bookMeet');

// Get all Meets
meetManagerRouter.get('/', getMeets);

// bookSeatsRouter.post('/', bookMeet)

module.exports = meetManagerRouter;