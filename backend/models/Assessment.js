const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
 question: {type: String, required: true},
 options: [
  {type: String, required: true},
  {type: String, required: true},
  {type: String, required: true},
  {type: String, required: true}
 ],
 correctAnswer: {type: String, required: true}
});

const jobSchema = new mongoose.Schema({
 jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
 jobTitle: {type: String, required: true}
});

const assessmentSchema = new mongoose.Schema(
 {
  assessmentName: {type: String, required: true},
  job: {type: jobSchema, required: false}, // Store the entire job object here
  questions: {type: [questionSchema], required: false} // Optional initially
 },
 {
  timestamps: true // Automatically add createdAt and updatedAt fields
 }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);
module.exports = Assessment;
