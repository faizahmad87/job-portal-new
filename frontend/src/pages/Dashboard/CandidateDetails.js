// src/pages/Dashboard/CandidateDetails.js

import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Typography, Button, TextField, MenuItem} from '@mui/material';
import {IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import apiCall from '../../utils/api';

const CandidateDetails = () => {
 const location = useLocation();
 const candidate = location.state?.candidate;
 const [status, setStatus] = useState(candidate?.status || 'Under Review');
 const navigate = useNavigate();
 const handleStatusChange = event => {
  setStatus(event.target.value);
  console.log(event.target.value);
 };

 const handleButtonClick = () => {
  const link = candidate.resume;
  window.open(link, '_blank'); // Opens the link in a new tab
 };

 useEffect(() => {
  console.log(candidate);
  setStatus(candidate.status);
 }, []);

 return (
  <Box>
   <Box sx={{display: 'flex', alignItems: 'left', padding: 0}}>
    <IconButton onClick={() => navigate(-1)} aria-label="back">
     <ArrowBackIcon />
    </IconButton>
    <Typography variant="h4">Candidate Details: {candidate?.name}</Typography>
   </Box>

   <Typography variant="body1">Email: {candidate?.email}</Typography>
   <Typography variant="body1">
    Contact: {candidate?.contact_details}
   </Typography>
   <Typography variant="body1">
    Skills: {candidate?.skills?.join(', ') || ''}
   </Typography>
   <Typography variant="body1">
    Experience: {candidate?.experience} years
   </Typography>

   <Button
    variant="contained"
    color="primary"
    //href={candidate?.resumeLink}
    target="_blank"
    sx={{mt: 2}}
    onClick={handleButtonClick}
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
     <MenuItem value="Shortlisted">Shortlisted</MenuItem>
     <MenuItem value="Interviewed">Interviewed</MenuItem>
     <MenuItem value="Offered">Offered</MenuItem>
     <MenuItem value="Rejected">Rejected</MenuItem>
     <MenuItem value="Application Submitted">Application Submitted</MenuItem>
     <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
     <MenuItem value="Hired">Hired</MenuItem>
    </TextField>
   </Box>
  </Box>
 );
};

export default CandidateDetails;
