// src/pages/Dashboard/JobListings.js

import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
 Box,
 Typography,
 Button,
 Card,
 CardContent,
 CardActions
} from '@mui/material';
import AddJobModal from './AddJobModal';
import apiCall from '../../utils/api';

const JobListings = () => {
 const [jobs, setJobs] = useState([]);
 const [isModalOpen, setModalOpen] = useState(false);
 const [selectedjob, setSelectedjob] = useState({});
 const navigate = useNavigate();

 const handleOpenModal = () => setModalOpen(true);
 const handleCloseModal = () => setModalOpen(false);

 const handleEditJob = job => {
  setModalOpen(true);
  setSelectedjob(job);
  // Add logic to populate form with job data in the modal
 };

 const handleDeleteJob = jobId => {
  //setJobs(jobs.filter(job => job.id !== jobId));
  deleteJob(jobId);
 };

 const handleViewCandidates = job => {
  navigate(`/dashboard/job/${job.id}/candidates`, {state: {job}});
 };

 useEffect(() => {
  fetchjobs();
 }, []);

 const fetchjobs = async () => {
  const response = await apiCall('get', '/jobs', {});
  console.log(response);
  setJobs(response);
 };

 const deleteJob = async jobId => {
  const response = await apiCall('delete', `/jobs/${jobId}`, {});
  fetchjobs();
 };

 return (
  <Box>
   <Typography variant="h4" gutterBottom>
    Dashboard - Job Listings
   </Typography>
   <Button variant="contained" color="primary" onClick={handleOpenModal}>
    Add New Job
   </Button>
   {jobs.map(job => (
    <Card key={job.id} sx={{marginTop: 2}}>
     <CardContent>
      <Typography variant="h5">{job.title}</Typography>
      <Typography>{job.description}</Typography>
      <Typography variant="caption">Applicants: {job.applicants}</Typography>
     </CardContent>
     <CardActions>
      <Button
       size="small"
       color="primary"
       onClick={() => handleViewCandidates(job)}
      >
       View Candidates
      </Button>
      <Button size="small" color="secondary" onClick={() => handleEditJob(job)}>
       Edit
      </Button>
      <Button
       size="small"
       color="error"
       onClick={() => handleDeleteJob(job._id)}
      >
       Delete
      </Button>
     </CardActions>
    </Card>
   ))}
   <AddJobModal
    open={isModalOpen}
    onClose={handleCloseModal}
    fetchJobs={fetchjobs}
    job={selectedjob}
   />
  </Box>
 );
};

export default JobListings;
