const express = require('express');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const router = express.Router();

// POST /jobs
router.post('/jobs', async (req, res) => {
 const {title, description} = req.body;
 console.log(title, description);

 // Validate the input
 if (!title || !description) {
  return res.status(400).json({error: 'Title and description are required'});
 }
 try {
  // Create a new job instance
  const newJob = new Job({
   title: title,
   description: description
  });

  // Save the job to the database
  await newJob.save();

  // Send the created job back in the response
  res.status(201).json(newJob);
 } catch (error) {
  res
   .status(500)
   .json({error: 'Error creating the job', message: error.message});
 }
});

// GET /jobs
router.get('/jobs', async (req, res) => {
 const limit = Math.floor(Math.random() * 10) + 1;
 const candidates = await Candidate.find().limit(limit); // Adjust the limit as needed
 try {
  const jobs = await Job.find(); // This will retrieve all jobs from the database
  let jobDetails = [];
  for (let i = 0; i < jobs.length; i++) {
   const limit = Math.floor(Math.random() * 10) + 1;
   const candidates = await Candidate.find().limit(limit); // Adjust the limit as needed
   jobDetails = [
    ...jobDetails,
    {
     job: jobs[i],
     candidates: candidates
    }
   ];
  }
  res.status(200).json(jobDetails); // Send the jobs data back to the client
 } catch (error) {
  res.status(500).json({error: 'Error fetching jobs'});
 }
});
// GET /jobs/:id
router.get('/jobs/:id', async (req, res) => {
 try {
  const job = await Job.findById(req.params.id);
  res.status(200).json(job);
 } catch (error) {
  res.status(500).json({error: 'Error fetching job details'});
 }
});

// PUT /jobs/:id
router.put('/jobs/:id', async (req, res) => {
 const {title, description} = req.body;
 // Validate the input
 if (!title || !description) {
  return res.status(400).json({error: 'Title and description are required'});
 }

 try {
  // Find the job by ID and update the fields
  const updatedJob = await Job.findByIdAndUpdate(
   req.params.id,
   {
    title,
    description
   },
   {new: true} // This option ensures that the updated job is returned
  );

  if (!updatedJob) {
   return res.status(404).json({error: 'Job not found'});
  }

  // Send the updated job back in the response
  res.status(200).json(updatedJob);
 } catch (error) {
  res.status(500).json({error: 'Error updating the job'});
 }
});

// DELETE /jobs/:id
router.delete('/jobs/:id', async (req, res) => {
 try {
  // Find and delete the job by ID
  const deletedJob = await Job.findByIdAndDelete(req.params.id);

  if (!deletedJob) {
   return res.status(404).json({error: 'Job not found'});
  }

  // Send a success response
  res.status(200).json({message: 'Job deleted successfully'});
 } catch (error) {
  res.status(500).json({error: 'Error deleting the job'});
 }
});

module.exports = router;
