import axios from 'axios';

const bookingAPI = axios.create();

// bookingAPI.defaults.baseURL = "http://booking.test/api/v1";

bookingAPI.defaults.baseURL = "/api/v1";

export default bookingAPI;