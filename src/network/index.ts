import axios from 'axios';

const bookingAPI = axios.create();

bookingAPI.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

export default bookingAPI;