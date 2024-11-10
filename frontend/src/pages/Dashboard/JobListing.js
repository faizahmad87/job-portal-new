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
import {useDispatch} from 'react-redux';
import {setCandidateDetails} from '../../redux/actions';

const JobListings = () => {
 const [jobs, setJobs] = useState([]);
 const [candidates, setCandidates] = useState([]);
 const [isModalOpen, setModalOpen] = useState(false);
 const [selectedjob, setSelectedjob] = useState({});
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleOpenModal = () => {
  setSelectedjob({});
  setModalOpen(true);
 };

 const handleCloseModal = () => {
  setSelectedjob({});
  setModalOpen(false);
 };

 const handleEditJob = job => {
  setModalOpen(true);
  setSelectedjob(job);
  // Add logic to populate form with job data in the modal
 };

 const handleDeleteJob = jobId => {
  deleteJob(jobId);
 };

 const handleViewCandidates = job => {
  dispatch(setCandidateDetails(job.candidates));
  navigate(`/dashboard/job/${job.job._id}/candidates`, {state: {job}});
 };

 useEffect(() => {
  fetchJobs();
  setSelectedjob({});
 }, []);

 const fetchJobs = async () => {
  const response = await apiCall('get', '/jobs', {});
  setJobs(response);
  setCandidates(response);
 };

 const deleteJob = async jobId => {
  await apiCall('delete', `/jobs/${jobId}`, {});
  fetchJobs();
 };

 return (
  <Box
   sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: {xs: 'center', md: 'flex-start'},
    justifyContent: {xs: 'center', md: 'flex-start'},
    padding: 2
   }}
  >
   <Typography variant="h4" gutterBottom>
    Dashboard - Job Listings
   </Typography>
   <Button
    variant="contained"
    color="primary"
    onClick={handleOpenModal}
    sx={{mb: 2}}
   >
    Add New Job
   </Button>
   <Box
    sx={{
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: {xs: 'center', md: 'flex-start'},
     gap: 2,
     width: '100%'
    }}
   >
    {jobs.map(job => (
     <Card
      key={job.id}
      sx={{width: {xs: '100%', sm: '45%', md: '30%'}, marginTop: 2}}
     >
      <CardContent>
       <Typography variant="h5">{job.job.title}</Typography>
       <Typography>{job.job.description}</Typography>
       <Typography variant="caption">
        Applicants: {job.candidates.length}
       </Typography>
      </CardContent>
      <CardActions>
       <Button
        size="small"
        color="primary"
        onClick={() => handleViewCandidates(job)}
       >
        View Candidates
       </Button>
       <Button
        size="small"
        color="secondary"
        onClick={() => handleEditJob(job)}
       >
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
   </Box>
   <AddJobModal
    open={isModalOpen}
    onClose={handleCloseModal}
    fetchJobs={fetchJobs}
    job={selectedjob}
   />
  </Box>
 );
};

export default JobListings;
