import React, { useState, useEffect } from 'react'
import { SeatsInfo } from '../../types/SeatsInfo'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Seat } from '../../types/Seat'
import { SeatMapStyle } from './SeatMapStyle'

export interface SeatsMapProps {
  seatsInfo: SeatsInfo | undefined
}

export const SeatsMap: React.FC<SeatsMapProps> = ({ seatsInfo }) => {

  const classes = SeatMapStyle()

  const [seats, setSeats] = useState<Seat[]>([])

  useEffect(() => {
    createSeatsMap()
  }, [])

  const createSeatsMap = () => {
    if (seatsInfo) {
      const seatsMap: Seat[] = []
      for (var row = 1; row <= seatsInfo.rows; row++) {
        for (var column = 1; column <= seatsInfo.columns.cantSeats; column++) {
          const seatID = `${seatsInfo.columns.acronymSeats[column - 1]}${row}`
          seatsMap.push({
            seatID: seatID,
            booked: seatsInfo.bookedSeats.some((bookedSeat) => {
              return bookedSeat === seatID
            })
          })
        }
      }
      setSeats(seatsMap)
    }
  }

  return (
    <>
      <Typography variant='h3' color='primary'>Seats</Typography>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
          classes={{ root: classes.contSeats }}>
          {
            seats && seats.map((seat, index) => {
              return (<Grid item xs={2} key={index}>
                <Paper>{seat.seatID}</Paper>
              </Grid>)
            })
          }
        </Grid>
      </Grid>
    </>
  )
}