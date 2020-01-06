module.exports = bookSeatsAlgorithm = (bookedSeats, seatsNumber, fleetColumnsNumber, fleetRowsNumber, fleetAcronymSeats, fleetAisle) => {

  const seatsMap = [];
  const seatsSectorNumber = fleetColumnsNumber / fleetAisle;

  // Creating seats map with booked seats
  for (var row = 1; row <= fleetRowsNumber; row++) {
    for (var column = 1; column <= fleetColumnsNumber; column++) {
      const seatName = `${fleetAcronymSeats[column - 1]}${row}`
      seatsMap.push({
        seatName,
        booked: bookedSeats.some((bookedSeat) => {
          return bookedSeat === seatName
        })
      })
    }
  }

  checkAllCases(seatsMap, seatsNumber, seatsSectorNumber);
}

// We will check all the cases separately
// We can check all the cases in one array iteration. For it, is neccesary make changes in the algorithm
const checkAllCases = (seatsMap, seatsNumber, seatsSectorNumber) => {
  const [resultCase1, seatsCase1] = checkCase1(seatsMap, seatsNumber, seatsSectorNumber);
  if (resultCase1) {
    return seatsCase1
  } else {
    const [resultCase2, seatsCase2] = checkCase2(seatsMap, seatsNumber, seatsSectorNumber);
    if (resultCase2) {
      return seatsCase2
    } else {
      const [resultCase3, seatsCase3] = checkCase3(seatsMap, seatsNumber, seatsSectorNumber);
      if (resultCase3) {
        return seatsCase3
      } else {
        const [resultCase4, seatsCase4] = checkCase4();
        if (resultCase4)
          return seatsCase4
      }
    }
  }
}

// For case 2 we need to book all seats in the same fleet side without any balance (without cross the aisle).
// EX1: for seatsNumber = 1 (['A1'] or ['B1'] or ['C1'] or etc...)
// EX2: for seatsNumber = 2 (['A1', 'B1'] or ['B1', 'C1'] or ['D1', 'E1'] or etc...)
// EX3: for seatsNumber = 3 (['A1', 'B1', 'C1'] or ['D1', 'E1', 'F1'])
const checkCase1 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let seatIndex = 0;
  let posibleSeats = [];
  let seatsSectorIndex = seatIndex;
  let reducedSeatsSectorNumber;

  // If the fleet has 3 seats for sector (['A1', 'B1', 'C1', AISLE, 'D1', 'E1', 'F1']), we can not book 4 or more seats in the same row sector.
  if (seatsNumber > seatsSectorNumber) {
    return [false, []]
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    posibleSeats = [];
    seatsSectorIndex = seatIndex;
    seatsSeactorEnough = true;
    reducedSeatsSectorNumber = seatsSectorNumber - seatIndex;

    // We check if we can book N seats in the same sector row
    // This while will finish if found some booked seats and the rest of them in the row are less than the N seats that we want to book.
    while (seatsSectorIndex < seatsSectorNumber && seatsNumber <= reducedSeatsSectorNumber) {
      if (!seatsMap[seatIndex].booked) {
        posibleSeats.push(seatsMap[seatIndex]);
      } else {
        newSeatsSectorNumber = seatsSectorNumber - (seatIndex + 1);
      }
      seatsSectorIndex++;
    }

    // We found N free seats, so we return this seats
    if (seatsNumber === posibleSeats.length) {
      return [true, posibleSeats]
    } else {
      // We move the index to the first seat to the next sector row
      seatIndex = seatIndex + seatsSectorNumber
    }
  }

  // We iterated on all seats in the fleet and we didn´t find any sector row to book all the seats.
  return [false, []];
}

// For case 2 we need to balance all seats in the same fleet side (without cross the aisle).
// EX1: for seatsNumber = 6, we should have rows = 2 and columns = 3 (['A1', 'B1', 'C1', 'A2', 'B2', 'C2'])
// EX2: for seatsNumber = 5, we should have rows = 5 and columns = 1 (['A1', 'A2', 'A3', 'A4', 'A5'])
// EX3: for seatsNumber = 4, we should have rows = 2 and columns = 2 (['A1', 'B1', 'A2', 'B2'])
const checkCase2 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let seatIndex = 0;
  let posibleSeats;
  let isBalanced = false;
  let balanceNumber = seatsSectorNumber;
  let balanceRows = 0;

  // Calculate the rows and columns to balance the seats
  while (!isBalanced) {
    isBalanced = seatsNumber % balanceNumber === 0;
    if (isBalanced) {
      balanceRows = seatsNumber / balanceNumber;
    } else {
      balanceNumber--;
    }
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    posibleSeats = [];

    // I can´t continue checking for free places, because we can´t balance the seats with the required N rows
    const posibleFleetOverflow = seatIndex + ((balanceRows - 1) * seatsSectorNumber * 2);
    if (posibleFleetOverflow > seatsMap.length) {
      return [false, []];
    }

    // Try to find some free seats
    for (const col = 0; col < balanceNumber; col++) {
      for (const row = 0; row < balanceRows; row++) {
        const mappedIndex = seatIndex + col + (seatsSectorNumber * 2 * row);
        if (!seatsMap[mappedIndex].booked) {
          posibleSeats.push(seatsMap[mappedIndex]);
        }
      }
    }

    // We found N free seats, so we return this seats
    if (posibleSeats.length === seatsNumber) {
      return [true, posibleSeats]
    } else {
      // We check if there are enough seats to continue checking if we can book seats in this row
      const newSeatsSectorNumber = seatsSectorNumber - (seatIndex + 1);
      if (balanceNumber > newSeatsSectorNumber) {
        seatIndex = seatIndex + seatsSectorNumber
      } else {
        seatIndex++;
      }
    }
  }
}

// For case 3, we only need to iterate on seats close to the aisle (EX: [C1, D1], [C2, D2]). This is because the others cases have been checked
// in the last cases
const checkCase3 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let balanceRows = seatsNumber / 2;
  let seatIndex = seatsSectorNumber - 1;
  let posibleSeats;

  // If the required seats to book are odd, we can not balance the seats.
  // EX1: for seatsNumber = 5, we should have rows = 3 and columns = 2 (['C1', 'D1', 'C2', 'D2', 'C3'])
  if (seatsNumber % 2 !== 0) {
    return [false, []];
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    posibleSeats = [];

    // I can´t continue checking for free places, because we can´t balance the seats in the required rows
    const posibleFleetOverflow = seatIndex + (balanceRows * seatsSectorNumber * 2);
    if (posibleFleetOverflow > seatsMap.length) {
      return [false, []];
    }

    // Try to find some free seats close to the aisle balanced by N rows
    for (const row = 0; row < balanceRows; row++) {
      const mappedIndex = seatIndex + (seatsSectorNumber * 2 * row);
      if (!seatsMap[mappedIndex].booked) {
        posibleSeats.push(seatsMap[mappedIndex]);
      }
      if (!seatsMap[mappedIndex + 1].booked) {
        posibleSeats.push(seatsMap[mappedIndex + 1]);
      }
    }

    // We found N free seats, so we return this seats
    if (posibleSeats.length === seatsNumber) {
      return [true, posibleSeats]
    } else {
      // Move the index to the seats row below
      seatIndex = seatIndex + (seatsSectorNumber + 2);
    }
  }
}
