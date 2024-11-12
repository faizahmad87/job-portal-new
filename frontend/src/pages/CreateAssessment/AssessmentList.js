import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, Grid} from '@mui/material';
import AssessmentCard from '../../components/AssessmentCard';
import NewAssessmentModal from '../../components/NewAssessmentModal';
import {useNavigate} from 'react-router-dom';
import apiCall from '../../utils/api';
import {useSelector} from 'react-redux';
import CircularLoader from '../../components/CircularLoader';

const AssessmentList = () => {
 const [assessments, setAssessments] = useState([]);
 const [showModal, setShowModal] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
 const toggleFetchAssessment = useSelector(
  state => state.toggleFetchAssessment
 );

 const handleCreateAssessment = () => {
  getAssessments();
 };

 const getAssessments = async () => {
  setIsLoading(true);
  const response = await apiCall('get', '/assessments', {});
  setIsLoading(false);
  console.log(response);
  setAssessments(response);
 };

 useEffect(() => {
  getAssessments();
 }, [toggleFetchAssessment]);

 return (
  <Box
   sx={{
    padding: 3,
    //backgroundColor: '#f4f6f9',
    minHeight: '100vh'
   }}
  >
   <Typography
    variant="h4"
    sx={{color: '#008080', fontWeight: 600, marginBottom: 3}}
   >
    Assessments
   </Typography>

   <Box textAlign="center" mt={4} sx={{marginBottom: 3}}>
    <Button
     variant="contained"
     color="success"
     onClick={() => setShowModal(true)}
     sx={{
      fontWeight: 500,
      '&:hover': {backgroundColor: '#28b666'}
     }}
    >
     Create New Assessment
    </Button>
   </Box>

   <Grid container spacing={3} mt={2}>
    {isLoading && <CircularLoader />}

    {assessments.map(assessment => (
     <Grid item xs={12} sm={6} md={4} key={assessment._id}>
      <AssessmentCard
       assessment={assessment}
       sx={{
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
       }}
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
