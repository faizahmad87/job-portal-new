import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
 Box,
 Typography,
 List,
 ListItem,
 ListItemText,
 Button,
 Card,
 CardContent,
 CardActions
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
  <Box
   sx={{
    padding: 2,
    minHeight: '100vh'
    //backgroundColor: '#f4f6f9'
   }}
  >
   <Box sx={{display: 'flex', alignItems: 'center', padding: '8px 0'}}>
    <IconButton
     onClick={() => navigate(-1)}
     aria-label="back"
     sx={{color: '#008080'}}
    >
     <ArrowBackIcon />
    </IconButton>
    <Typography
     variant="h4"
     sx={{
      fontWeight: 600,
      color: '#008080',
      marginLeft: 1
     }}
    >
     Candidates for {job.job?.title}
    </Typography>
   </Box>

   <List>
    {candidateDetails.map(candidate => (
     <Card
      key={candidate.id}
      sx={{
       marginBottom: 2,
       borderRadius: 2,
       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
       transition: 'transform 0.2s, box-shadow 0.2s',
       '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)'
       }
      }}
     >
      <CardContent>
       <ListItemText
        primary={
         <span
          onClick={() => handleCandidateClick(candidate)}
          style={{
           cursor: 'pointer',
           color: '#008080',
           fontWeight: 500
          }}
         >
          {candidate.name}
         </span>
        }
        secondary={`Applied on: ${candidate?.appliedDate} - Status: ${candidate.status}`}
       />
      </CardContent>
      <CardActions>
       <Button
        size="small"
        sx={{
         color: '#008080',
         '&:hover': {backgroundColor: '#e0f7fa'},
         fontWeight: 500
        }}
        onClick={() => handleResumePreview(candidate)}
       >
        Resume Link
       </Button>
      </CardActions>
     </Card>
    ))}
   </List>
  </Box>
 );
};

export default CandidateList;
