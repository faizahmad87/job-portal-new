// src/pages/Dashboard/CandidateDetails.js

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Typography, Button, TextField, MenuItem} from '@mui/material';

const CandidateDetails = () => {
 const location = useLocation();
 const candidate = location.state?.candidate;
 const [status, setStatus] = useState(candidate?.status || 'Under Review');

 const handleStatusChange = event => {
  setStatus(event.target.value);
 };

 return (
  <Box>
   <Typography variant="h4" gutterBottom>
    Candidate Details: {candidate?.name}
   </Typography>
   <Typography variant="body1">Email: {candidate?.email}</Typography>
   <Typography variant="body1">Contact: {candidate?.contact}</Typography>
   <Typography variant="body1">
    Skills: {candidate?.skills?.join(', ') || ''}
   </Typography>
   <Typography variant="body1">
    Experience: {candidate?.experience} years
   </Typography>

   <Button
    variant="contained"
    color="primary"
    href={candidate?.resumeLink}
    target="_blank"
    sx={{mt: 2}}
   >
    Download Resume
   </Button>

   <Box mt={4}>
    <TextField
     select
     label="Application Status"
     value={status}
     onChange={handleStatusChange}
     fullWidth
    >
     <MenuItem value="Under Review">Under Review</MenuItem>
     <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
     <MenuItem value="Offer Extended">Offer Extended</MenuItem>
     <MenuItem value="Rejected">Rejected</MenuItem>
    </TextField>
   </Box>
  </Box>
 );
};

export default CandidateDetails;
