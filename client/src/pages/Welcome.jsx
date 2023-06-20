import React, { useState } from 'react'
import Register from '../components/Credentials/Register';
import Login from '../components/Credentials/Login';
import { Box, Typography } from '@mui/material';

function Welcome() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <Box
      sx={{
        // background : "#fff",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          border: '1px solid white',
          width: '70%',
          height: '70%',
          display: 'flex'
        }}
      >
        <Box flex={1}
          sx={{
            transform: { sm: 'none', xl: hasAccount ? "none" : "translateX(100%)" },
            transition: 'transform 0.5s ease'
          }}
        >
          {
            hasAccount ? <Login account={setHasAccount} /> : <Register account={setHasAccount} />
          }
        </Box>

        <Box flex={1}
          sx={{
            transform: hasAccount ? "none" : "translateX(-100%)",
            transition: 'transform 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'cursive'
          }}
        >
          {
            hasAccount ?
              (
                <Typography variant='h2' fontFamily='cursive'> YOU'RE BACK ! </Typography>
              ) : (
                <Typography variant='h2' fontFamily='cursive'> WELCOME NEWBIE ! </Typography>
              )
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Welcome