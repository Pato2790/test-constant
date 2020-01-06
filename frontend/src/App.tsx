import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { defaultTheme } from './themes/defaultTheme';
import { BookSeatManager } from './components/BookSeatManager/BookSeatManager';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BookSeatManager />
    </ThemeProvider>
  )
}

export default App;