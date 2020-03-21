import axios from 'axios';

if (process.server) {
  const { URLSearchParams } = require('url');
  global.URLSearchParams = URLSearchParams;
}

const baseDomain =
  process.env.NODE_ENV === 'development'
    ? 'https://msa-motoplastic.ru'
    : 'https://' + window.location.host;

// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("access_token") || null;

export const api = axios.create({
  baseURL: `${baseDomain}/api`,
  withCredentials: true,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
export const authApi = axios.create({
  baseURL: `${baseDomain}/auth`,
  withCredentials: true,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
