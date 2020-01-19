import axios from 'axios';

const defaultHeaders = () => {
    let reqHeaders = {};
    reqHeaders['Content-Type'] = 'text/plain';
    return reqHeaders;
  }

export const get = (url) => {
    return axios.get((url), { headers: { ...defaultHeaders() } });
  }