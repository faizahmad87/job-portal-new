import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, Box, TextField, Button} from '@mui/material';
import apiCall from '../../utils/api';

const AddJobModal = ({open, onClose, job, fetchJobs}) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const {register, handleSubmit, setValue} = useForm();

 const createJob = async (title, description) => {
  console.log(title, description);
  const response = await apiCall('post', '/jobs', {
   title,
   description
  });
  console.log(response);
  fetchJobs();
 };

 const editJob = async (title, description) => {
  console.log(title, description);
  const response = await apiCall('put', `/jobs/${job._id}`, {
   title,
   description
  });
  console.log(response);
  fetchJobs();
 };

 useEffect(() => {
  console.log(job);
  if (job) {
   setValue('title', job.title);
   setValue('description', job.description);
  } else {
   setTitle('');
   setDescription('');
  }
 }, [job]);

 const handleSubmit2 = async data => {
  console.log(data);
  if (job) {
   // Update existing job (API call)
   // PUT /jobs/:id
   editJob(data.title, data.description);
  } else {
   // Add new job (API call)
   // POST /jobs
   createJob(data.title, data.description);
  }
  onClose();
  fetchJobs(); // Refresh the job list after adding/editing
 };

 return (
  <Modal open={open} onClose={onClose}>
   <Box
    sx={{
     padding: 3,
     backgroundColor: 'white',
     borderRadius: 2,
     margin: 'auto',
     width: 400,
     mt: 5
    }}
   >
    <h2>{job ? 'Edit Job' : 'Add New Job'}</h2>
    <form onSubmit={handleSubmit(handleSubmit2)}>
     <TextField
      label="Job Title"
      fullWidth
      //value={title}
      {...register('title', {required: true})}
      margin="normal"
     />
     <TextField
      label="Job Description"
      fullWidth
      //value={description}
      {...register('description', {required: true})}
      margin="normal"
     />
     <Button variant="contained" color="primary" type="submit" sx={{mt: 2}}>
      {job ? 'Save Changes' : 'Add Job'}
     </Button>
    </form>
   </Box>
  </Modal>
 );
};

export default AddJobModal;
