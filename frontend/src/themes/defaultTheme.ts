import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const primaryColor = {
  main: '#0288d1',
  light: '#349fda',
  dark: '#015f92',
  contrastText: '#fff',
};

const secondaryColor = {
  main: '#FF6B40',
  light: '#FF9273',
  dark: '#A62500',
  contrastText: '#fff',
};

const errorsColor = {
  light: red[300],
  main: red[500],
  dark: red[700],
  contrastText: '#fff',
};

export const defaultTheme = createMuiTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    error: errorsColor,
    background: {
      default: '#ffffff',
    },
  },
});