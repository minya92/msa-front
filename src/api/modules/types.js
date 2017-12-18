import { api } from '@/api/config'

/*
 * Get marks for banner
 * 
 * @param {integer} id
 *
 * @return {Promise}
*/
export const getMarksForBaner = (id) => {
  return api.get(`getMarksForBaner/${id}`).then(r => {
    return r.data.data;
  });
}