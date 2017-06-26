import Vue from 'vue'
import axios from 'axios';

//
export const apiHTTP = axios.create({
	baseURL: 'http://msa.4rp.org/api',
	timeout: 1000,
});
apiHTTP.install = function(){
  Object.defineProperty(Vue.prototype, '$apiHTTP', {
    get () { return apiHTTP }
 })
}
Vue.use(apiHTTP);

//
Vue.prototype.$authenticated = false

export default {
	check: function(context) {
		apiHTTP.get('/api/v1/user').then(response => {
			if (response.body.user != null) {
				this.authenticated = true
			}
		}).catch(e => {
			console.log('error api');
		});
	}
}