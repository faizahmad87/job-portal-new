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
  <Card
   variant="outlined"
   onClick={onClick}
   sx={{
    cursor: 'pointer',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: 2,
    backgroundColor: '#fff',
    '&:hover': {
     boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)'
    }
   }}
  >
   <CardContent>
    <Typography
     variant="h6"
     onClick={() => {
      navigate(`/create-assessment/${assessment._id}/questionnaire`);
     }}
     sx={{
      fontWeight: 600,
      color: '#008080',
      marginBottom: 1,
      '&:hover': {textDecoration: 'underline'}
     }}
    >
     {assessment.assessmentName}
    </Typography>

    <Typography variant="subtitle1" sx={{color: '#616161', marginBottom: 1}}>
     Job: {assessment?.job?.jobTitle || 'Not Assigned'}
    </Typography>

    <Typography sx={{color: '#424242', marginBottom: 2}}>
     Questions: {assessment?.questions.length || 0}
    </Typography>

    <Button
     onClick={e => {
      e.stopPropagation(); // Prevents triggering the card's onClick event
      deleteAssessment(assessment._id);
     }}
     variant="outlined"
     color="error"
     sx={{
      borderColor: '#f44336',
      color: '#f44336',
      '&:hover': {
       borderColor: '#d32f2f',
       color: '#d32f2f'
      },
      fontWeight: 500,
      padding: '6px 16px',
      textTransform: 'none'
     }}
    >
     DELETE
    </Button>
   </CardContent>
  </Card>
 );
};

export default AssessmentCard;
