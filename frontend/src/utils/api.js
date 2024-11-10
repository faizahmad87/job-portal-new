import axiosInstance from './axiosInstance'; // Import the Axios instance

const apiCall = async (method, url, data = null) => {
 try {
  let response;
  if (method === 'get') {
   response = await axiosInstance.get(url); // Use axiosInstance to make GET requests
  } else if (method === 'post') {
   response = await axiosInstance.post(url, data); // POST requests
  } else if (method === 'put') {
   response = await axiosInstance.put(url, data); // PUT requests
  } else if (method === 'delete') {
   response = await axiosInstance.delete(url); // DELETE requests
  }

  return response.data; // Return the response data from the API
 } catch (error) {
  console.error('API error:', error.response || error.message);
  alert(
   'Error occurred: ' +
    (error.response ? error.response.data.message : 'Please try again.')
  );
  throw error; // Throw the error to handle it where the function is called
 }
};

export default apiCall;
