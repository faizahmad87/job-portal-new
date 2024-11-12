import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
 baseURL: 'https://job-portal-new-4.onrender.com/api', // This will be the base URL for all requests
 timeout: 500000 // Optional: set a timeout for requests
});

export default axiosInstance;
