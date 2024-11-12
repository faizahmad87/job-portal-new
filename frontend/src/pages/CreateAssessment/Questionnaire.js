import React, {useEffect, useState} from 'react';
import {
 Box,
 Typography,
 Select,
 MenuItem,
 Button,
 TextField,
 FormControl,
 InputLabel
} from '@mui/material';
import {IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionForm from './QuestionForm';
import {useParams, useNavigate} from 'react-router-dom';
import apiCall from '../../utils/api';

const Questionnaire = () => {
 const {assessmentId} = useParams();
 const navigate = useNavigate();
 const [jobs, setJobs] = useState([]);
 const [assessment, setAssessment] = useState({});
 const [assessmentJob, setAssessmentJob] = useState('');
 const [jobID, setJobID] = useState('');
 const [selectedJob, setSelectedJob] = useState('');
 const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
 const [editOpen, setEditOpen] = useState(false);
 const [selectedJobTitle, setSelectedJobTitle] = useState('');

 const fetchAssessment = async () => {
  const response = await apiCall('get', `/assessments/${assessmentId}`, {});
  setAssessment(response);
  setAssessmentJob(response.job?.jobTitle);
  setSelectedJob(response.job?.jobTitle);
  setJobID(response.job?._id);
  console.log(response);
 };

 useEffect(() => {
  fetchjobs();
  fetchAssessment();
 }, []);

 useEffect(() => {
  const jobTitleToSearch = assessment?.job?.jobTitle;
  const foundJob = jobs?.find(item => item.job.title === jobTitleToSearch);
  setJobID(foundJob?.job?._id);
 }, [assessment, jobs]);

 const updateAssessment = async (jobId, questions) => {
  const response = await apiCall('put', `/assessments/${assessmentId}`, {
   jobId,
   questions
  });
  fetchAssessment();
 };

 const fetchjobs = async () => {
  const response = await apiCall('get', '/jobs', {});
  console.log(response);
  setJobs(response);
 };

 const handleSaveAssessment = () => {
  navigate('/create-assessment');
 };

 const handleEditQuestion = (question, index) => {
  setEditOpen(!editOpen);
  setEditingQuestionIndex(index); // Set the index of the question to be edited
 };

 const handleChange = event => {
  const selectID = event.target.value;
  const selectedJob = jobs.find(job => job.job._id === selectID);
  const selectedTitle = selectedJob.job.title;
  setSelectedJobTitle(selectedTitle);
  const questions = assessment?.questions || [];
  updateAssessment(selectID, questions);
 };

 return (
  <Box sx={{padding: 3}}>
   <Box sx={{display: 'flex', alignItems: 'left', padding: 0}}>
    <IconButton
     onClick={() => navigate(-1)}
     aria-label="back"
     sx={{color: '#008080'}}
    >
     <ArrowBackIcon />
    </IconButton>
    {/* <IconButton onClick={() => navigate(-1)} aria-label="back">
     <ArrowBackIcon />
    </IconButton> */}
    <Typography
     variant="h4"
     sx={{marginLeft: 1, fontWeight: 600, color: '#008080'}}
    >
     Edit Assessment: {assessment.assessmentName}
    </Typography>
   </Box>
   {/* <Typography variant="h4">
    Edit Assessment: {assessment.assessmentName}
   </Typography> */}
   <Typography variant="h7" sx={{color: '#555', mt: 1}}>
    selected Job: {assessment?.job?.jobTitle}
   </Typography>
   <FormControl fullWidth variant="outlined" sx={{mt: 2, mb: 2}}>
    <InputLabel>Job Title</InputLabel>
    <Select value={selectedJobTitle} onChange={handleChange} label="Job Title">
     {jobs.map((job, index) => (
      <MenuItem key={index} value={job.job._id}>
       {job.job.title}
      </MenuItem>
     ))}
    </Select>
   </FormControl>

   <Box>
    <Typography variant="h6" sx={{fontWeight: 600, color: '#008080', mb: 2}}>
     Questions
    </Typography>
    {assessment?.questions?.map((q, index) => (
     <Box
      key={index}
      //sx={{marginBottom: 2, border: '1px solid #ddd', padding: 2}}
      sx={{
       marginBottom: 2,
       borderRadius: 2,
       padding: 2,
       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}
     >
      <Typography>
       Q{index + 1}: {q.question}
      </Typography>
      {q.options?.map((opt, index) => {
       return (
        <div style={{marginLeft: '12px'}} key={index}>
         {index + 1}: {opt}
        </div>
       );
      })}
      <Button
       variant="outlined"
       sx={{
        marginTop: '4px',
        color: '#FFA500',
        borderColor: '#FFA500',
        '&:hover': {backgroundColor: '#fff5e5'}
       }}
       onClick={() => handleEditQuestion(q, index)}
      >
       Edit
      </Button>
      {/* <Button onClick={() => handleDeleteQuestion(index)}>Delete</Button> */}

      {editOpen === true && (
       <QuestionForm
        onAdd={newQuestion => {
         const updatedQuestions = [
          ...assessment.questions,
          {
           question: newQuestion.text,
           correctAnswer: newQuestion.correctOption,
           options: newQuestion.options.map(item => item.text)
          }
         ];
         updateAssessment(jobID, updatedQuestions);
        }}
        editingQuestion={assessment.questions[editingQuestionIndex]}
        onEdit={updatedQuestion => {
         const updatedQuestions = assessment?.questions.map((q, i) =>
          i === editingQuestionIndex ? updatedQuestion : q
         );
         if (Array.isArray(updatedQuestions)) {
          updatedQuestions.forEach(question => {
           // Check if options is an array of objects (which is the case for the last question)
           if (
            Array.isArray(question.options) &&
            typeof question.options[0] === 'object'
           ) {
            question.options = question.options.map(option => option.text); // Convert to an array of strings
            question.correctAnswer = question.correctOption; // Rename correctOption to correctAnswer
            delete question.correctOption; // Remove the old correctOption key
           }
          });
         } else {
          console.error('updatedQuestion is not an array');
         }
         console.log(updatedQuestions);
         updateAssessment(jobID, updatedQuestions);
         setEditingQuestionIndex(null); // Reset editing state
        }}
       />
      )}
     </Box>
    ))}

    <QuestionForm
     onAdd={question => {
      const currentQuestion = [
       ...assessment.questions,
       {
        question: question.question,
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
    sx={{
     marginTop: 2,
     backgroundColor: '#2ECC71',
     '&:hover': {backgroundColor: '#28b666'},
     fontWeight: 500,
     paddingX: 3
    }}
   >
    Save Assessment
   </Button>
  </Box>
 );
};

export default Questionnaire;
