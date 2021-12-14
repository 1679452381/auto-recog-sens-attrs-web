import axios from 'axios'
const myAxios = axios.create({
    baseURL: '/mock',
    timeout: 5000,
  });

export default myAxios