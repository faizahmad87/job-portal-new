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
 }, [candidate]);

 return (
  <Box
   sx={{
    padding: 3,
    //backgroundColor: '#f4f6f9',
    minHeight: '100vh'
   }}
  >
   <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
    <IconButton
     onClick={() => navigate(-1)}
     aria-label="back"
     sx={{color: '#008080'}}
    >
     <ArrowBackIcon />
    </IconButton>
    <Typography variant="h4" sx={{color: '#008080', fontWeight: 600}}>
     Candidate Details: {candidate?.name}
    </Typography>
   </Box>

   <Typography variant="body1" sx={{color: '#555', marginBottom: 1}}>
    <strong>Email:</strong> {candidate?.email}
   </Typography>
   <Typography variant="body1" sx={{color: '#555', marginBottom: 1}}>
    <strong>Contact:</strong> {candidate?.contact_details}
   </Typography>
   <Typography variant="body1" sx={{color: '#555', marginBottom: 1}}>
    <strong>Skills:</strong> {candidate?.skills?.join(', ') || ''}
   </Typography>
   <Typography variant="body1" sx={{color: '#555', marginBottom: 2}}>
    <strong>Experience:</strong> {candidate?.experience} years
   </Typography>

   <Button
    variant="contained"
    color="success"
    sx={{
     mb: 2,
     fontWeight: 500,
     '&:hover': {backgroundColor: '#28b666'}
    }}
    onClick={handleButtonClick}
   >
    Download Resume
   </Button>

   <Box mt={4} sx={{width: '100%'}}>
    <TextField
     select
     label="Application Status"
     value={status}
     onChange={handleStatusChange}
     fullWidth
     sx={{
      backgroundColor: '#fff',
      borderRadius: 1,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
     }}
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
