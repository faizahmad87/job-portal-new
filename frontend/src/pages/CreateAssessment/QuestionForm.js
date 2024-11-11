import React, {useState, useEffect} from 'react';
import {Box, TextField, Button, Typography, IconButton} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const QuestionForm = ({onAdd, editingQuestion, onEdit}) => {
 const [questionText, setQuestionText] = useState('');
 const [correctOption, setCorrectOption] = useState('');
 const [options, setOptions] = useState([{id: 1, text: '', isCorrect: false}]);

 useEffect(() => {
  if (editingQuestion) {
   setQuestionText(editingQuestion.question);
   setCorrectOption(editingQuestion.correctAnswer);
   setOptions(
    editingQuestion.options.map((opt, index) => ({
     id: index + 1,
     text: opt,
     isCorrect: opt === editingQuestion.correctAnswer
    }))
   );
  }
 }, [editingQuestion]);

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

 const handleSubmit = () => {
  if (questionText && options.some(option => option.text) && correctOption) {
   const questionData = {question: questionText, options, correctOption};
   if (editingQuestion) {
    onEdit(questionData); // Call the edit callback
   } else {
    onAdd(questionData); // Call the add callback
   }
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
   <Typography variant="h6">
    {editingQuestion ? 'Edit Question' : 'Add New Question'}
   </Typography>
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
   <Typography variant="h6" sx={{marginTop: 2}}>
    Correct Option
   </Typography>
   <TextField
    label="Correct Option"
    fullWidth
    value={correctOption}
    onChange={e => setCorrectOption(e.target.value)}
   />
   <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    sx={{marginTop: 2}}
   >
    {editingQuestion ? 'Save Changes' : 'Add Question'}
   </Button>
  </Box>
 );
};

export default QuestionForm;
