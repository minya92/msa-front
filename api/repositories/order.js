import { api } from '../config';

export default {
  getOrder(id) {
    return api.get(`getOrder/${id}`).then(r => r.data.data);
  },
  getOrderHistory() {
    return api.get('getOrderHistory').then(r => r.data.data);
  }
};
