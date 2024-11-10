const express = require('express');
const Assessment = require('../models/Assessment');
const Job = require('../models/Job');
const router = express.Router();

// POST /assessments
router.post('/assessments', async (req, res) => {
 const {assessmentName} = req.body;

 try {
  const newAssessment = new Assessment({assessmentName});
  await newAssessment.save();
  res.status(201).json(newAssessment);
 } catch (error) {
  res.status(500).json({error: 'Error creating the assessment'});
 }
});

// GET /assessments
router.get('/assessments', async (req, res) => {
 try {
  const assessments = await Assessment.find().populate('job', 'jobTitle');
  res.status(200).json(assessments);
 } catch (error) {
  res.status(500).json({error: 'Error fetching assessments'});
 }
});

// GET /assessments/:id
router.get('/assessments/:id', async (req, res) => {
 try {
  const assessment = await Assessment.findById(req.params.id);
  if (!assessment) {
   return res.status(404).json({error: 'Assessment not found'});
  }
  res.status(200).json(assessment);
 } catch (error) {
  res.status(500).json({error: 'Error fetching the assessment'});
 }
});

// PUT /assessments/:id
router.put('/assessments/:id', async (req, res) => {
 const {jobId, questions} = req.body;

 try {
  const job = await Job.findById(jobId);
  let currentJob;
  if (!job) {
   return res.status(404).json({error: 'Job not found'});
  } else {
   currentJob = {
    jobId: jobId._id,
    jobTitle: job.title
   };
  }

  const updatedAssessment = await Assessment.findByIdAndUpdate(
   req.params.id,
   {job: currentJob, questions}, // Storing the full job object
   {new: true, runValidators: true}
  );
  if (!updatedAssessment) {
   return res.status(404).json({error: 'Assessment not found'});
  }
  res.status(200).json(updatedAssessment);
 } catch (error) {
  res.status(500).json({error: 'Error updating the assessment'});
 }
});

// DELETE /assessments/:id
router.delete('/assessments/:id', async (req, res) => {
 try {
  const deletedAssessment = await Assessment.findByIdAndDelete(req.params.id);
  if (!deletedAssessment) {
   return res.status(404).json({error: 'Assessment not found'});
  }
  res.status(200).json({message: 'Assessment deleted successfully'});
 } catch (error) {
  res.status(500).json({error: 'Error deleting the assessment'});
 }
});

module.exports = router;
