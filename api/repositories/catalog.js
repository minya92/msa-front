import { api } from '../config';

const queryFormatted = data => {
  let query = Object.assign({}, data);

  let idModel = query.year || query.model || query.mark;
  if (!!idModel) {
    query.mark_model = idModel;
    delete query.year;
    delete query.model;
    delete query.mark;
  }

  for (let key in query) {
    if (query.hasOwnProperty(key) && query[key] === '') {
      delete query[key];
    }
  }

  let params = '';
  if (query) {
    params = '?' + new URLSearchParams(query).toString();
  }

  return params;
};

export default {
  async getMarksForBaner(id) {
    const r = await api.get(`getMarksForBaner/${id}`);
    return r.data.data;
  },
  async getMarks() {
    const r = await api.get(`getMarks`);
    return r.data.data;
  },
  async getModels(id) {
    const r = await api.get(`getModels/${id}`);
    return r.data.data;
  },
  async getYears(id) {
    const r = await api.get(`getYears/${id}`);
    return r.data.data;
  },
  async getItemsMaxMinCost(query = {}) {
    let params = queryFormatted(query);

    const r = await api.get(`getItemsMaxMinCost/${params}`);
    return r.data.data;
  },
  async getItemsCount(query = {}) {
    let params = queryFormatted(query);

    const r = await api.get(`getItemsCount/${params}`);
    return r.data.data;
  },
  async getItems(query = {}) {
    let params = queryFormatted(query);

    const r = await api.get(`getItems/${params}`);
    return r.data.data;
  },
  async getItem(id) {
    const r = await api.get(`getItem/${id}`);
    return r.data.data;
  },
  async getTypes() {
    const r = await api.get(`getTypes`);
    return r.data.data;
  }
};
