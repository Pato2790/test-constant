const Seat = require('../../../models/Seat');
const Flight = require('../../../models/Flight');
const Fleet = require('../../../models/Fleet');
const { bookSeatsAlgorithm } = require('../helpers/bookSeatsAlgorithm');

const handler = async (req, res, next) => {
  const { bookInfo, flightId } = req.query;

  console.info('flightID: ', flightId);

  const currentFlight = await Flight.find({ where: { id: flightId }, include: [Fleet] });

  // const bookedSeats = await Seat.findAll({
  //   where: { flightId },
  // })

  // bookSeatsAlgorithm()

  const bookedSeats = {
    columns: {
      aisle: 3,
      cantSeats: 6,
      acronymSeats: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    rows: 26,
    bookedSeats: [],
  }

  console.info(currentFlight);

  res.status(200).json(bookedSeats)
}

module.exports = handler;