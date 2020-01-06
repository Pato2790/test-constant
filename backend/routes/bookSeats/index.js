const express = require('express');
const bookSeatsRouter = express.Router();
const bookSeats = require('./handlers/bookSeats')

bookSeatsRouter.get('/', (req, res, next) => res.json('OK'))
bookSeatsRouter.post('/', bookSeats)

module.exports = bookSeatsRouter;