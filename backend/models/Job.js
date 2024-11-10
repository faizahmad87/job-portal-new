const mongoose = require('mongoose');

// const candidateSchema = new mongoose.Schema({
//  name: {type: String, required: true},
//  resumeLink: {type: String, required: true}, // URL or file path to the resume
//  applicationDate: {type: Date, default: Date.now},
//  status: {type: String, default: 'Under Review'} // e.g., "Under Review", "Interview Scheduled"
// });

const jobSchema = new mongoose.Schema({
 title: {type: String, required: true},
 description: {type: String, required: true}
});

module.exports = mongoose.model('Job', jobSchema);
