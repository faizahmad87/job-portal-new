// src/components/NewAssessmentModal.js

import React, {useState} from 'react';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import apiCall from '../utils/api';

const NewAssessmentModal = ({open, onClose, onSubmit}) => {
 const [name, setName] = useState('');

 const handleSubmit = () => {
  if (name) {
   CreateAssessment(name);
   onSubmit(name);
   setName('');
  }
 };

 const CreateAssessment = async name => {
  const response = await apiCall('post', '/assessments', {
   assessmentName: name
  });
  console.log(response);
  onSubmit(name);
 };

 return (
  <Modal open={open} onClose={onClose}>
   <Box
    sx={{
     padding: 3,
     background: 'white',
     width: 400,
     margin: 'auto',
     marginTop: '10%'
    }}
   >
    <Typography variant="h6">Create New Assessment</Typography>
    <TextField
     label="Assessment Name"
     fullWidth
     value={name}
     onChange={e => setName(e.target.value)}
     margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSubmit}>
     Submit
    </Button>
   </Box>
  </Modal>
 );
};

export default NewAssessmentModal;
