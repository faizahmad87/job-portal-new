// src/pages/CreateAssessment/Questionnaire.js

import React, {useEffect, useState} from 'react';
import {
 Box,
 Typography,
 Select,
 MenuItem,
 Button,
 TextField
} from '@mui/material';
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
 const [jobID, setJobID] = useState('');
 const [selectedJob, setSelectedJob] = useState('');

 const fetchAssessment = async () => {
  const response = await apiCall('get', `/assessments/${assessmentId}`, {});
  console.log(response);
  setAssessment(response);
  setAssessmentJob(response.job?.jobTitle);
  setSelectedJob(response.job?.jobTitle);
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
  const questions = assessment?.questions || [];
  updateAssessment(jobId, questions);
  const result = jobs.find(item => item.job._id === jobId);
  setSelectedJob(result?.job.title);
  console.log(result?.job.title);
 };

 const handleSaveAssessment = () => {
  navigate('/create-assessment');
 };

 const handleStatusChange = value => {};

 return (
  <Box sx={{padding: 3}}>
   <Typography variant="h4">
    Edit Assessment: {assessment.assessmentName}
   </Typography>
   <Box mt={4} sx={{mb: 2}}>
    <TextField
     select
     label="Select Job for Assessment"
     value={selectedJob}
     onChange={e => handleJobSelect(e.target.value)}
     fullWidth
    >
     {jobs.map(job => (
      <MenuItem key={job.job._id} value={job.job._id}>
       {job.job.title}
      </MenuItem>
     ))}
    </TextField>
   </Box>

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
         <div style={{marginLeft: '12px'}} key={index}>
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
      updateAssessment(jobID, currentQuestion);
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
