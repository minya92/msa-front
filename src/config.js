import Vue from 'vue'
import axios from 'axios';

//
export const API = axios.create({
	baseURL: 'http://msa.4rp.org/api',
	timeout: 1000,
  withCredentials: true,
  headers: {
  	'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
});
API.install = function(){
  Object.defineProperty(Vue.prototype, '$API', {
    get () { return API }
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