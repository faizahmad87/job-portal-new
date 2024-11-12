// config/db.js
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

console.log(mongoURI);
const connectDB = async () => {
 try {
  await mongoose.connect('mongodb+srv://faizahmad9608013206:G8noVovIRMJOjktt@job-portal.y7q25.mongodb.net/test');
  console.log('MongoDB Connected');
 } catch (err) {
  console.error(err.message);
  process.exit(1);
 }
};
module.exports = connectDB;
