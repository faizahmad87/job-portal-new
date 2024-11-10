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
     alignItems: 'center'
    }}
   >
    <Typography variant="h6" align="center">
     Create New Assessment
    </Typography>
    <TextField
     label="Assessment Name"
     fullWidth
     value={name}
     onChange={e => setName(e.target.value)}
     margin="normal"
    />
    <Button
     variant="contained"
     color="primary"
     onClick={handleSubmit}
     sx={{mt: 2}}
    >
     Submit
    </Button>
   </Box>
  </Modal>
 );
};

export default NewAssessmentModal;
