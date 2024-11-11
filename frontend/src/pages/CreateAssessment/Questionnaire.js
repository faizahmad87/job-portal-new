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
import QuestionForm from './QuestionForm';
import {useParams, useNavigate} from 'react-router-dom';
import apiCall from '../../utils/api';

const mockJobTitles = [
 'Software Engineer',
 'Product Manager',
 'Data Scientist',
 'UI/UX Designer',
 'Frontend Developer',
 'Backend Developer'
];

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

 //  const handleJobSelect = jobId => {
 //   const questions = assessment?.questions || [];
 //   updateAssessment(jobId, questions);
 //   const result = jobs.find(item => item.job._id === jobId);
 //   setSelectedJob(result?.job.title);
 //  };

 const handleSaveAssessment = () => {
  navigate('/create-assessment');
 };

 const handleEditQuestion = (question, index) => {
  setEditOpen(!editOpen);
  setEditingQuestionIndex(index); // Set the index of the question to be edited
 };

 const handleDeleteQuestion = index => {
  const updatedQuestions = assessment?.questions.filter((_, i) => i !== index);
  updateAssessment(jobID, updatedQuestions);
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
   <Typography variant="h4">
    Edit Assessment: {assessment.assessmentName}
   </Typography>
   <Typography variant="h7">
    selectedJob: {assessment?.job?.jobTitle}
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
        <div style={{marginLeft: '12px'}} key={index}>
         {index + 1}: {opt}
        </div>
       );
      })}
      <Button onClick={() => handleEditQuestion(q, index)}>Edit</Button>
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
     //  editingQuestion={editingQuestion} // Pass the editing question to the form
     //  onEdit={updatedQuestion => {
     //   const updatedQuestions = assessment?.questions.map(q =>
     //    q === editingQuestion ? updatedQuestion : q
     //   );
     //   console.log(updatedQuestions);
     //   if (Array.isArray(updatedQuestions)) {
     //    updatedQuestions.forEach(question => {
     //     // Check if options is an array of objects (which is the case for the last question)
     //     if (
     //      Array.isArray(question.options) &&
     //      typeof question.options[0] === 'object'
     //     ) {
     //      question.options = question.options.map(option => option.text); // Convert to an array of strings
     //      question.correctAnswer = question.correctOption; // Rename correctOption to correctAnswer
     //      delete question.correctOption; // Remove the old correctOption key
     //     }
     //    });
     //   } else {
     //    console.error('updatedQuestion is not an array');
     //   }
     //   console.log(updatedQuestions);

     //   updateAssessment(jobID, updatedQuestions);
     //   setEditingQuestion(null); // Reset the editing state
     //  }}
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
