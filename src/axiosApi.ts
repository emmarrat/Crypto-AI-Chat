import axios from 'axios';
import { apiURL } from './utils/constants';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;
