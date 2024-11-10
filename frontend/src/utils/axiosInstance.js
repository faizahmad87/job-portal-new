import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
 baseURL: 'http://localhost:5000/api', // This will be the base URL for all requests
 timeout: 5000 // Optional: set a timeout for requests
});

export default axiosInstance;
