import React, { useState, useEffect } from 'react'
import { BookInfo } from '../../types/BookInfo'
import { Grid, TextField, Paper, Button, Typography } from '@material-ui/core'
import { UserInfoStyle } from './UserInfoStyle';
import { SeatsInfo } from '../../types/SeatsInfo';
import { bookSeatsPost } from '../../api/bookSeats/bookSeatsPost';

export interface UserInfoProps {
  onBookStepChange: (bookStep: string) => void
  onUserBookSeat: (bookedSeats: SeatsInfo) => void
}

export const UserInfo: React.FC<UserInfoProps> = ({ onBookStepChange, onUserBookSeat }) => {

  const classes = UserInfoStyle()

  const [userInfo, setUserInfo] = useState<BookInfo>({ flightId: 1, firstName: '', lastName: '', seatsNumber: 0 })

  useEffect(() => {
    console.info(userInfo)
  }, [userInfo])

  const bookSeats = () => {
    bookSeatsPost(userInfo).then((response) => {
      debugger
      onUserBookSeat(response)
      onBookStepChange('seatsMap')
    }).catch((err) => {
      console.error('Api Response Error: ', err)
    })
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        classes={{ root: classes.contCenter }}
      >
        <Typography variant="h3" color='primary'>
          Reserva tus asientos.
        </Typography>
        <Paper classes={{ root: classes.contLogin }}>
          <Grid
            container
            item
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              id="firstName"
              label="First Name"
              onChange={e => {
                userInfo.firstName = e.currentTarget.value
                setUserInfo(userInfo)
              }}
              classes={{ root: classes.inputsMargin }} />
            <TextField
              id="lastName"
              label="Last Name"
              onChange={e => {
                userInfo.lastName = e.currentTarget.value
                setUserInfo(userInfo)
              }}
              classes={{ root: classes.inputsMargin }} />
            <TextField
              id="seatsNumber"
              label="Seats Number"
              type="number"
              onChange={e => {
                userInfo.seatsNumber = parseInt(e.currentTarget.value)
                setUserInfo(userInfo)
              }}
              classes={{ root: classes.inputsMargin }}
            />
            <Button variant="contained" color="primary" onClick={bookSeats}>
              Reservar
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
} 