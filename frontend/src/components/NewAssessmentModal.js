import React, {useState} from 'react';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import apiCall from '../utils/api';

const NewAssessmentModal = ({open, onClose, onSubmit}) => {
 const [name, setName] = useState('');

 const handleSubmit = () => {
  if (name) {
   CreateAssessment(name);
   setName('');
  }
 };

 const CreateAssessment = async name => {
  const response = await apiCall('post', '/assessments', {
   assessmentName: name
  });
  console.log(response);
  onSubmit();
  onClose();
 };

 return (
  <Modal open={open} onClose={onClose}>
   <Box
    sx={{
     padding: 3,
     backgroundColor: 'white',
     borderRadius: 2,
     margin: 'auto',
     width: {xs: '80%', sm: 400}, // 80% width for mobile, 400px for larger screens
     maxWidth: 600, // max width for larger screens
     mt: {xs: '20%', sm: 5}, // Center vertically on mobile, 5 for larger screens
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)' // subtle shadow for floating effect
    }}
   >
    <Typography
     variant="h6"
     align="center"
     sx={{
      fontWeight: 600,
      color: '#008080', // matching color from previous components
      marginBottom: 2
     }}
    >
     Create New Assessment
    </Typography>
    <TextField
     label="Assessment Name"
     fullWidth
     value={name}
     onChange={e => setName(e.target.value)}
     margin="normal"
     sx={{
      '& .MuiInputBase-root': {
       borderRadius: '8px' // rounded corners for text field
      },
      '& .MuiInputLabel-root': {
       fontWeight: 500,
       color: '#616161' // subtle label color
      },
      '& .MuiInputBase-input': {
       color: '#424242' // input text color
      }
     }}
    />
    <Button
     variant="contained"
     color="primary"
     onClick={handleSubmit}
     sx={{
      mt: 2,
      backgroundColor: '#008080', // consistent with previous button colors
      '&:hover': {
       backgroundColor: '#00796b' // darken on hover
      },
      padding: '8px 16px',
      textTransform: 'none',
      fontWeight: 500
     }}
    >
     Submit
    </Button>
   </Box>
  </Modal>
 );
};

export default NewAssessmentModal;
