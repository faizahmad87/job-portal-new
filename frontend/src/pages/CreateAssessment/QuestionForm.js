// src/pages/CreateAssessment/QuestionForm.js

import React, {useState} from 'react';
import {Box, TextField, Button, Typography, IconButton} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useForm} from 'react-hook-form';

const QuestionForm = ({onAdd}) => {
 const [questionText, setQuestionText] = useState('');
 const [correctOption, setCorrectOption] = useState('');
 const [options, setOptions] = useState([{id: 1, text: '', isCorrect: false}]);
 const {register, handleSubmit, setValue} = useForm();

 const handleAddOption = () => {
  setOptions([
   ...options,
   {id: options.length + 1, text: '', isCorrect: false}
  ]);
 };

 const handleRemoveOption = id => {
  setOptions(options.filter(option => option.id !== id));
 };

 const handleOptionChange = (id, text) => {
  setOptions(
   options.map(option => (option.id === id ? {...option, text} : option))
  );
 };

 const handleCorrectOptionChange = id => {
  setOptions(options.map(option => ({...option, isCorrect: option.id === id})));
 };

 const handleAddQuestion = () => {
  if (questionText && options.some(option => option.text) && correctOption) {
   onAdd({text: questionText, options, correctOption});
   setQuestionText('');
   setOptions([{id: 1, text: '', isCorrect: false}]);
   setCorrectOption('');
  }
 };

 return (
  <Box
   sx={{
    marginTop: 3,
    padding: 2,
    border: '1px solid #ddd',
    borderRadius: '5px'
   }}
  >
   <Typography variant="h6">Add New Question</Typography>
   <TextField
    label="Question Text"
    fullWidth
    margin="normal"
    value={questionText}
    onChange={e => setQuestionText(e.target.value)}
   />

   <Typography variant="subtitle1" sx={{marginTop: 2}}>
    Options
   </Typography>
   {options.map((option, index) => (
    <Box
     key={option.id}
     sx={{display: 'flex', alignItems: 'center', marginBottom: 1}}
    >
     <TextField
      label={`Option ${index + 1}`}
      value={option.text}
      onChange={e => handleOptionChange(option.id, e.target.value)}
      sx={{flex: 1}}
     />
     <IconButton
      color="primary"
      onClick={() => handleCorrectOptionChange(option.id)}
     >
      {option.isCorrect ? <AddCircleIcon color="success" /> : <AddCircleIcon />}
     </IconButton>
     <IconButton
      color="secondary"
      onClick={() => handleRemoveOption(option.id)}
     >
      <RemoveCircleIcon />
     </IconButton>
    </Box>
   ))}

   <Button
    variant="outlined"
    color="primary"
    onClick={handleAddOption}
    sx={{marginTop: 1, marginBottom: 1}}
   >
    Add Option
   </Button>
   <Typography variant="h6">Correct Option</Typography>
   <TextField
    label="Correct Option Text"
    fullWidth
    margin="normal"
    value={correctOption}
    onChange={e => setCorrectOption(e.target.value)}
   />

   <Button
    variant="contained"
    color="primary"
    onClick={handleAddQuestion}
    sx={{marginTop: 3}}
    disabled={
     !questionText || !correctOption || !options.some(option => option.text)
    }
   >
    Add Question
   </Button>
  </Box>
 );
};

export default QuestionForm;
