import * as types from './actionType';

// Load
export const loadUsersStart = (pageInfo) => ({
  type: types.LOAD_USERS_START,
  payload: pageInfo,
});

export const loadUsersSuccess = (users) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: users,
});

export const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

// Create
export const createUserStart = (user) => ({
  type: types.CREATE_USER_START,
  payload: user,
});

export const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

export const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

// Edit
export const editUserStart = (userInfo) => ({
  type: types.EDIT_USER_START,
  payload: userInfo,
});

export const editUserSuccess = (data) => ({
  type: types.EDIT_USER_SUCCESS,
  payload: data,
});

export const editUserError = (error) => ({
  type: types.EDIT_USER_ERROR,
  payload: error,
});

// Delete
export const deleteUserStart = (userId) => ({
  type: types.DELETE_USER_START,
  payload: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUserError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

// Detail
export const detailUserStart = (userId) => ({
  type: types.DETAIL_USER_START,
  payload: userId,
});

export const detailUserSuccess = (userId) => ({
  type: types.DETAIL_USER_SUCCESS,
  payload: userId,
});

export const detailUserError = (error) => ({
  type: types.DETAIL_USER_ERROR,
  payload: error,
});
