// src/pages/CreateAssessment/AssessmentList.js

import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, Grid} from '@mui/material';
import AssessmentCard from '../../components/AssessmentCard';
import NewAssessmentModal from '../../components/NewAssessmentModal';
import {useNavigate} from 'react-router-dom';
import apiCall from '../../utils/api';
import {useSelector} from 'react-redux';
const AssessmentList = () => {
 const [assessments, setAssessments] = useState([]); // Mock or fetch from database
 const [showModal, setShowModal] = useState(false);
 const navigate = useNavigate();
 const toggleFetchAssessment = useSelector(
  state => state.toggleFetchAssessment
 );

 const handleCreateAssessment = () => {
  getAssessments();
 };

 const getAssessments = async () => {
  const response = await apiCall('get', '/assessments', {});
  console.log(response);
  setAssessments(response);
 };

 useEffect(() => {
  getAssessments();
 }, [toggleFetchAssessment]);
 return (
  <Box sx={{padding: 3}}>
   <Typography variant="h4">Assessments</Typography>
   <Box textAlign="center" mt={4}>
    <Button
     variant="contained"
     color="primary"
     onClick={() => setShowModal(true)}
    >
     Create New Assessment
    </Button>
   </Box>

   <Grid container spacing={2} mt={2}>
    {assessments.map(assessment => (
     <Grid item xs={12} sm={6} md={4} key={assessment._id}>
      <AssessmentCard
       assessment={assessment}
       //    onClick={() =>
       //     navigate(`/create-assessment/${assessment._id}/questionnaire`)
       //    }
      />
     </Grid>
    ))}
   </Grid>

   <NewAssessmentModal
    open={showModal}
    onClose={() => setShowModal(false)}
    onSubmit={handleCreateAssessment}
   />
  </Box>
 );
};

export default AssessmentList;
