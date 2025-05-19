import axios from '@/utils/axios';

export const getUserById = (id) => {
  return axios.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return axios.put(`/users/${id}`, data);
};