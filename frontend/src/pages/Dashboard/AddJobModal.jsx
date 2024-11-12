import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, Box, TextField, Button, Typography} from '@mui/material';
import apiCall from '../../utils/api';

const AddJobModal = ({open, onClose, job, fetchJobs}) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const {register, handleSubmit, setValue} = useForm();

 const createJob = async (title, description) => {
  const response = await apiCall('post', '/jobs', {title, description});
  fetchJobs();
 };

 const editJob = async (title, description) => {
  const response = await apiCall('put', `/jobs/${job._id}`, {
   title,
   description
  });
  fetchJobs();
 };

 useEffect(() => {
  if (job && JSON.stringify(job) !== '{}') {
   setValue('title', job.title);
   setValue('description', job.description);
  } else {
   setTitle('');
   setDescription('');
  }
 }, [job]);

 const handleSubmit2 = async data => {
  if (job && JSON.stringify(job) !== '{}') {
   editJob(data.title, data.description);
  } else {
   createJob(data.title, data.description);
  }
  onClose();
  fetchJobs();
 };

 return (
  <Modal open={open} onClose={onClose}>
   <Box
    sx={{
     padding: 3,
     backgroundColor: 'white',
     borderRadius: 2,
     margin: 'auto',
     width: {xs: '80%', sm: '80%', md: 500},
     maxWidth: 600,
     mt: {xs: '20%', sm: '10%'},
     boxShadow: 24,
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     position: 'relative'
    }}
   >
    <Typography
     variant="h5"
     color="primary"
     sx={{mb: 2, color: '#008080', fontWeight: 'bold'}}
    >
     {job && JSON.stringify(job) !== '{}' ? 'Edit Job' : 'Add New Job'}
    </Typography>
    <form onSubmit={handleSubmit(handleSubmit2)} style={{width: '100%'}}>
     <TextField
      label="Job Title"
      fullWidth
      variant="outlined"
      {...register('title', {required: true})}
      margin="normal"
      sx={{
       backgroundColor: '#f9f9f9',
       borderRadius: 1
      }}
     />
     <TextField
      label="Job Description"
      fullWidth
      variant="outlined"
      {...register('description', {required: true})}
      margin="normal"
      sx={{
       backgroundColor: '#f9f9f9',
       borderRadius: 1
      }}
     />
     <Box display="flex" justifyContent="flex-end" sx={{mt: 2}}>
      <Button
       onClick={onClose}
       sx={{
        color: '#555',
        backgroundColor: '#e0e0e0',
        mr: 2,
        '&:hover': {backgroundColor: '#c0c0c0'}
       }}
      >
       Cancel
      </Button>
      <Button
       variant="contained"
       color="primary"
       type="submit"
       sx={{
        backgroundColor: '#2ECC71',
        color: 'white',
        '&:hover': {backgroundColor: '#28B463'}
       }}
      >
       {job && JSON.stringify(job) !== '{}' ? 'Save Changes' : 'Add Job'}
      </Button>
     </Box>
    </form>
   </Box>
  </Modal>
 );
};

export default AddJobModal;
