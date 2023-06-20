import React from 'react';
import CathegoryWidget from '../components/HomeWidgets/CathegoryWidget';
import { Box } from '@mui/material';
import MainWidget from '../components/HomeWidgets/MainWidget';

function Home() {

  return (
    <Box display='flex'>
      <CathegoryWidget />
      <MainWidget />
    </Box>
  )
}

export default Home