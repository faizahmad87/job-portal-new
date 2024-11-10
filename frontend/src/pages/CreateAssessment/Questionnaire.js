// src/pages/CreateAssessment/Questionnaire.js

import React, {useEffect, useState} from 'react';
import {Box, Typography, Select, MenuItem, Button} from '@mui/material';
import QuestionForm from './QuestionForm';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import apiCall from '../../utils/api';

const Questionnaire = () => {
 const {assessmentId} = useParams();
 const navigate = useNavigate();
 const [jobs, setJobs] = useState([]);
 const [assessment, setAssessment] = useState({});
 const [assessmentJob, setAssessmentJob] = useState('');

 const fetchAssessment = async () => {
  const response = await apiCall('get', `/assessments/${assessmentId}`, {});
  console.log(response);
  setAssessment(response);
  setAssessmentJob(response.job.jobTitle);
 };

 useEffect(() => {
  console.log(assessmentId);
  fetchjobs();
  fetchAssessment();
 }, []);

 const updateAssessment = async (jobId, questions) => {
  console.log(jobId, questions);
  const reponse = await apiCall('put', `/assessments/${assessmentId}`, {
   jobId,
   questions
  });
  console.log(reponse);
  fetchAssessment();
 };

 const fetchjobs = async () => {
  const response = await apiCall('get', '/jobs', {});
  console.log(response);
  setJobs(response);
 };

 const handleJobSelect = jobId => {
  const questions = [];
  updateAssessment(jobId, questions);
 };

 const handleSaveAssessment = () => {
  navigate('/create-assessment');
 };

 return (
  <Box sx={{padding: 3}}>
   <Typography variant="h4">
    Edit Assessment: {assessment.assessmentName}
   </Typography>
   <Typography>Select Job for Assessment</Typography>
   <Select
    value={assessmentJob}
    onChange={e => handleJobSelect(e.target.value)}
    fullWidth
    sx={{marginBottom: 2}}
   >
    {jobs.map(job => (
     <MenuItem key={job._id} value={job._id}>
      {job.title}
     </MenuItem>
    ))}
   </Select>

   <Box>
    <Typography variant="h6">Questions</Typography>
    {assessment?.questions?.map((q, index) => (
     <Box
      key={index}
      sx={{marginBottom: 2, border: '1px solid #ddd', padding: 2}}
     >
      <Typography>
       Q{index + 1}: {q.question}
      </Typography>
      {q.options?.map((opt, index) => {
       return (
        <>
         <div style={{marginLeft: '12px'}}>
          {index + 1}:{opt}
         </div>
        </>
       );
      })}
      <Button
       onClick={() => {
        /* handleEditQuestion */
       }}
      >
       Edit
      </Button>
      <Button
       onClick={() => {
        /* handleDeleteQuestion */
       }}
      >
       Delete
      </Button>
     </Box>
    ))}

    <QuestionForm
     onAdd={question => {
      console.log(question);
      const currentQuestion = [
       ...assessment.questions,
       {
        question: question.text,
        correctAnswer: question.correctOption,
        options: question.options.map(item => item.text)
       }
      ];
      updateAssessment('672f465292385e65093c7cf5', currentQuestion);
     }}
    />
   </Box>

   <Button
    onClick={handleSaveAssessment}
    variant="contained"
    sx={{marginTop: 2}}
   >
    Save Assessment
   </Button>
  </Box>
 );
};

export default Questionnaire;
