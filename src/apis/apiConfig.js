import axios from 'axios';

const token = '45a72e1e98e1a5eb83615fda51652384c5ee892c3299e49fc42da31c7210f2ce';

export const loadUserApi = async (page, perPage) =>
  await axios.get(`https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const createUserApi = async (user) =>
  await axios.post('https://gorest.co.in/public/v2/users', user, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const editUserApi = async (userId, userInfo) =>
  await axios.put(`https://gorest.co.in/public/v2/users/${userId}`, userInfo, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteUserApi = async (userId) =>
  await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
