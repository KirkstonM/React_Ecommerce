import { Box } from '@mui/material'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
      }}
    >
      <TailSpin height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true} />
    </Box>
  )
}

export default Loader


