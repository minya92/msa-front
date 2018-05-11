import Vue from 'vue'
import axios from 'axios';

const baseURL = (process.env.NODE_ENV === 'development')
? 'https://msa.4rp.org'
: 'https://' + window.location.host;

export const api = axios.create({
	baseURL: baseURL + '/api',
  withCredentials: true,
  headers: {
  	'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
export const AUTH_URL = axios.create({
	baseURL: baseURL + '/auth',
  withCredentials: true,
  headers: {
  	'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
