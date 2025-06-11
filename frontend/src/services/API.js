import axios from '@/utils/defaultBaseURL';

export function createApiService(domain) {
  return {
    getAll() {
      return axios.get(domain);
    },
    create(data) {
      return axios.post(domain, data);
    },
    editAll(data) {
      return axios.patch(domain, data);
    },
    deleteAll() {
      return axios.delete(domain);
    },
    getById(id) {
        return axios.get(domain + '/' + id);
    },
    editById(id, data){
        return axios.patch(domain + '/' + id, data);
    },
    deleteById(id){
        return axios.delete(domain + '/' + id);
    }
  };
}


