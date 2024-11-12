import React from 'react';
import {CircularProgress, Box} from '@mui/material';

const CircularLoader = () => {
 return (
  <Box
   sx={{
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 20, // Adjust this value to change the distance from the top
    left: '60%',
    transform: 'translateX(-50%)'
   }}
  >
   <CircularProgress />
  </Box>
 );
};

export default CircularLoader;
