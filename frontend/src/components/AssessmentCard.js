// src/components/AssessmentCard.js

import React from 'react';
import {Card, CardContent, Typography, Button} from '@mui/material';
import apiCall from '../utils/api';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setToggleFetchAssessment} from '../redux/actions';
const AssessmentCard = ({assessment, onClick}) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const deleteAssessment = async id => {
  console.log(id);
  const response = await apiCall('delete', `/assessments/${id}`);
  dispatch(setToggleFetchAssessment());
  console.log(response);
 };

 return (
  <Card variant="outlined" onClick={onClick} sx={{cursor: 'pointer'}}>
   <CardContent>
    <Typography
     variant="h6"
     onClick={() => {
      navigate(`/create-assessment/${assessment._id}/questionnaire`);
     }}
    >
     {assessment.assessmentName}
    </Typography>
    <Typography variant="subtitle1">
     Job: {assessment?.job?.jobTitle || 'Not Assigned'}
    </Typography>
    <Typography>Questions: {assessment?.questions.length}</Typography>
    <Button
     onClick={() => {
      deleteAssessment(assessment._id);
     }}
    >
     DELETE
    </Button>
   </CardContent>
  </Card>
 );
};

export default AssessmentCard;
