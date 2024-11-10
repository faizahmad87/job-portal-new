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
   <Typography variant="h4" gutterBottom>
    Candidates for {job.job?.title}
   </Typography>
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
