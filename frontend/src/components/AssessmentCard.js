// src/components/AssessmentCard.js

import React from 'react';
import {Card, CardContent, Typography, Button} from '@mui/material';

const AssessmentCard = ({assessment, onClick}) => {
 return (
  <Card variant="outlined" onClick={onClick} sx={{cursor: 'pointer'}}>
   <CardContent>
    <Typography variant="h6">{assessment.assessmentName}</Typography>
    <Typography variant="subtitle1">
     Job: {assessment?.job.jobTitle || 'Not Assigned'}
    </Typography>
    <Typography>Questions: {assessment?.questions.length}</Typography>
   </CardContent>
  </Card>
 );
};

export default AssessmentCard;
