import { api } from '@/api/config'

export const getMarksForBaner = (id) => {
  return api.get(`getMarksForBaner/${id}`).then(r => {
    return r.data.data;
  });
}