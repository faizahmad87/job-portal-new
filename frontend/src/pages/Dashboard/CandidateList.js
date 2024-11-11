// src/pages/Dashboard/CandidateList.js

import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
 Box,
 Typography,
 List,
 ListItem,
 ListItemText,
 Button
} from '@mui/material';
import {IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector} from 'react-redux';

const CandidateList = () => {
 const location = useLocation();
 const job = location.state?.job;
 const navigate = useNavigate();
 const candidateDetails = useSelector(state => state.candidateDetails); // Access state from Redux

 useEffect(() => {
  console.log(candidateDetails);
 }, []);

 const handleCandidateClick = candidate => {
  navigate(`/dashboard/job/${job.job._id}/candidate`, {
   state: {candidate}
  });
 };

 const handleResumePreview = candidate => {
  const link = candidate.resume;
  window.open(link, '_blank'); // Opens the link in a new tab
 };

 return (
  <Box>
   <Box sx={{display: 'flex', alignItems: 'left', padding: 0}}>
    <IconButton onClick={() => navigate(-1)} aria-label="back">
     <ArrowBackIcon />
    </IconButton>
    <Typography variant="h4">Candidates for {job.job?.title}</Typography>
   </Box>

   <List>
    {candidateDetails.map(candidate => (
     <ListItem key={candidate.id}>
      <ListItemText
       primary={
        <span
         onClick={() => handleCandidateClick(candidate)}
         style={{cursor: 'pointer'}}
        >
         {candidate.name}
        </span>
       }
       secondary={`Applied on: ${candidate?.appliedDate} - Status: ${candidate.status}`}
      />
      <Button onClick={() => handleResumePreview(candidate)} color="primary">
       Resume Link
      </Button>
     </ListItem>
    ))}
   </List>
  </Box>
 );
};

export default CandidateList;
