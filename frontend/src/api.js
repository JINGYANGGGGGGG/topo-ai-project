import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/data';

export async function fetchData() {
  try {
    // Use Axios instead of fetch for better error handling
    const response = await axios.get(API_URL);

    console.log('Response Status:', response.status); // Debugging
    console.log('Response Headers:', response.headers);

    // Log the response data
    console.log('Parsed JSON:', response.data);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error('API Fetch Error:', error.message || error);
    return null;
  }
}
