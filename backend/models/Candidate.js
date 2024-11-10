const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true,
  match: /.+\@.+\..+/
 },
 contact_details: {
  type: String,
  required: true
 },
 skills: {
  type: [String],
  required: true
 },
 experience: {
  type: String,
  required: true
 },
 status: {
  type: String,
  enum: [
   'Shortlisted',
   'Interviewed',
   'Offered',
   'Rejected',
   'Application Submitted',
   'Interview Scheduled',
   'Hired'
  ],
  required: true
 },
 resume: {
  type: String,
  required: true,
  match:
   /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view\?usp=drivesdk$/
 }
}); // _id is included from the data directly

module.exports = mongoose.model('Candidate', candidateSchema);
