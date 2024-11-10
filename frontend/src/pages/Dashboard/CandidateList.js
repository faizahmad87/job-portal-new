// src/pages/Dashboard/CandidateList.js

import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
 Box,
 Typography,
 List,
 ListItem,
 ListItemText,
 Button
} from '@mui/material';

const mockCandidates = [
 {
  id: 1,
  name: 'John Doe',
  resumeLink: '#',
  applicationDate: '2024-01-12',
  status: 'Under Review'
 },
 {
  id: 2,
  name: 'Jane Smith',
  resumeLink: '#',
  applicationDate: '2024-01-15',
  status: 'Interview Scheduled'
 }
];

const CandidateList = () => {
 const location = useLocation();
 const job = location.state?.job;
 const navigate = useNavigate();

 const handleCandidateClick = candidate => {
  navigate(`/dashboard/job/${job.id}/candidate/${candidate.id}`, {
   state: {candidate}
  });
 };

 return (
  <Box>
   <Typography variant="h4" gutterBottom>
    Candidates for {job?.title}
   </Typography>
   <List>
    {mockCandidates.map(candidate => (
     <ListItem key={candidate.id}>
      <ListItemText
       primary={candidate.name}
       secondary={`Applied on: ${candidate.applicationDate} - Status: ${candidate.status}`}
      />
      <Button onClick={() => handleCandidateClick(candidate)} color="primary">
       View Details
      </Button>
     </ListItem>
    ))}
   </List>
  </Box>
 );
};

export default CandidateList;
