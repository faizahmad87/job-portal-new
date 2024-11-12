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
    left: '50%', // Horizontally center on larger screens
    transform: 'translateX(-50%)', // Center the loader exactly
    '@media (max-width: 600px)': {
     left: '50%', // Ensures it remains centered on mobile
     top: '56px',
     transform: 'translateX(-50%)'
    }
   }}
  >
   <CircularProgress />
  </Box>
 );
};

export default CircularLoader;
