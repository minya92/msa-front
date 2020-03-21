import { api } from '../config';

export default {
  getFaq() {
    return api.get(`FAQ`).then(r => r.data.data);
  },
  getPage(path) {
    return api.get(`getPage/${path}`).then(r => r.data.data);
  }
};
