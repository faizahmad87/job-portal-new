import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
 baseURL: 'https://job-portal-back-blush.vercel.app/api', // This will be the base URL for all requests
 timeout: 50000 // Optional: set a timeout for requests
});

export default axiosInstance;
