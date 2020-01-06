const express = require('express');
const bookSeats = require('./bookSeats');
const apiRouter = express.Router();

module.exports = app => {
    // Declare routes directories
    apiRouter.use('/bookSeats', bookSeats);

    // Return not found if API endpoint does not exist
    apiRouter.use((req, res) => res.sendStatus(404));

    return apiRouter;
}