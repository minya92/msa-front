import Vue from 'vue'
import axios from 'axios';

//
export const API = axios.create({
	baseURL: 'http://msa.4rp.org/api',
  withCredentials: true,
  headers: {
  	'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
export const AUTH_URL = axios.create({
	baseURL: 'http://msa.4rp.org/auth',
	//baseURL: 'http://' + window.location.hostname + '/auth',
  withCredentials: true,
  headers: {
  	'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
API.install = function(){
  Object.defineProperty(Vue.prototype, '$API', {
    get () { return API }
 })
  Object.defineProperty(Vue.prototype, '$AUTH_URL', {
    get () { return AUTH_URL }
 })
}
Vue.use(API);

//
Vue.prototype.$SERVER_URL = 'http://msa.4rp.org/';

export default {
	check: function(context) {
		API.get('/api/v1/user').then(response => {
			if (response.body.user != null) {
				this.authenticated = true
			}
		}).catch(e => {
			console.log('error api');
		});
	}
}
