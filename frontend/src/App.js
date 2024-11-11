// src/App.js
import React, {useEffect, useState} from 'react';
import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate
} from 'react-router-dom';
import {Box} from '@mui/material';
import Sidebar from './components/Sidebar';
import JobListings from './pages/Dashboard/JobListing';
import AssessmentList from './pages/CreateAssessment/AssessmentList';
import Questionnaire from './pages/CreateAssessment/Questionnaire';
import CandidateList from './pages/Dashboard/CandidateList';
import CandidateDetails from './pages/Dashboard/CandidateDetails';
import '../src/styles/Global.css';

function App() {
 //  useEffect(() => {
 //   setIsAuth(!!localStorage.getItem('token'));
 //  }, []);

 return (
  <Router>
   <Box sx={{display: 'flex'}}>
    {/* Conditionally render Sidebar and main content only if authenticated */}

    <Sidebar />
    <Box
     component="main"
     //sx={{padding: 3}}
     sx={{
      marginTop: {xs: '48px', sm: '12px'}, // 56px margin-top for mobile screens
      padding: 3,
      flexGrow: 1
     }}
    >
     <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<JobListings />} />
      <Route
       path="/dashboard/job/:jobId/candidates"
       element={<CandidateList />}
      />
      <Route
       path="/dashboard/job/:jobId/candidate"
       element={<CandidateDetails />}
      />
      <Route path="/create-assessment" element={<AssessmentList />} />
      <Route
       path="/create-assessment/:assessmentId/questionnaire"
       element={<Questionnaire />}
      />
     </Routes>
    </Box>
   </Box>
  </Router>
 );
}

export default App;
