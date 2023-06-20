import React from 'react';
import { Box } from '@mui/material';

function ImageWidget({ image, title }) {
  return (
    <Box flex={2} margin='auto auto'>
      <img src={image} alt={title}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '350px'
        }} />
    </Box>
  )
}

export default ImageWidget