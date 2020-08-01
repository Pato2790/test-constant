const Meet = require('../../../models/Meet');

const handler = async (req, res, next) => {

    const allWeekMeets = await Meet.findAll({});

    res.status(200).json(allWeekMeets);
}

module.exports = handler;