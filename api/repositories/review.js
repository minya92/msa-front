import { api } from '../config';

export default {
  get() {
    return api.get(`reviews`).then(r => r.data.data);
  },
  create(data) {
    return api.post(`reviews`, data);
  },
  feedback(data) {
    return post.get(`feedback`, data);
  }
};
