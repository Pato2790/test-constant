import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const SeatMapStyle = makeStyles((theme: Theme) =>
  createStyles({
    contSeats: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      width: '60%'
    },
  })
);