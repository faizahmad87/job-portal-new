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
 const [selectedJob, setSelectedJob] = useState({});
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleOpenModal = () => {
  setSelectedJob({});
  setModalOpen(true);
 };

 const handleCloseModal = () => {
  setSelectedJob({});
  setModalOpen(false);
 };

 const handleEditJob = job => {
  setModalOpen(true);
  setSelectedJob(job.job);
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
  setSelectedJob({});
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
    padding: 2,
    // backgroundColor: '#f4f6f9', // Light background color
    minHeight: '100vh'
   }}
  >
   <Typography
    variant="h4"
    gutterBottom
    sx={{color: '#008080', fontWeight: 600}}
   >
    Dashboard - Job Listings
   </Typography>
   <Button
    variant="contained"
    onClick={handleOpenModal}
    sx={{
     mb: 3,
     backgroundColor: '#2ECC71',
     '&:hover': {backgroundColor: '#28b666'},
     fontWeight: 500,
     paddingX: 3
    }}
   >
    Add New Job
   </Button>
   <Box
    sx={{
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: {xs: 'center', md: 'flex-start'},
     gap: 3,
     width: '100%'
    }}
   >
    {jobs.map(job => (
     <Card
      key={job.id}
      sx={{
       width: {xs: '100%', sm: '45%', md: '30%'},
       borderRadius: 2,
       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
       transition: 'transform 0.2s, box-shadow 0.2s',
       '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)'
       }
      }}
     >
      <CardContent>
       <Typography variant="h5" sx={{color: '#008080', fontWeight: 600}}>
        {job.job.title}
       </Typography>
       <Typography sx={{color: '#555', mt: 1}}>
        {job.job.description}
       </Typography>
       <Typography
        variant="caption"
        sx={{color: '#888', mt: 1, display: 'block'}}
       >
        Applicants: {job.candidates.length}
       </Typography>
      </CardContent>
      <CardActions>
       <Button
        size="small"
        sx={{
         color: '#008080',
         '&:hover': {backgroundColor: '#e0f7fa'},
         fontWeight: 500
        }}
        onClick={() => handleViewCandidates(job)}
       >
        View Candidates
       </Button>
       <Button
        size="small"
        sx={{
         color: '#FFA500',
         '&:hover': {backgroundColor: '#fff5e5'},
         fontWeight: 500
        }}
        onClick={() => handleEditJob(job)}
       >
        Edit
       </Button>
       <Button
        size="small"
        sx={{
         color: '#FF6347',
         '&:hover': {backgroundColor: '#ffe5e5'},
         fontWeight: 500
        }}
        onClick={() => handleDeleteJob(job.job._id)}
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
    job={selectedJob}
   />
  </Box>
 );
};

export default JobListings;
