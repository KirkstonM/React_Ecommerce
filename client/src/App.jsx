import React from 'react';
import Routes from './routes/Route';
import { CssBaseline, ThemeProvider, createTheme  } from '@mui/material';
import { useSelector } from 'react-redux';


function App() {

  const currenMode = useSelector(state => state.auth.mode);

  const theme = createTheme({
    palette : {
      mode : currenMode
    }
  })
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Routes />
    </ThemeProvider>
    </>
  )
}

export default App