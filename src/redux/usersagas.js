import * as types from './actionType';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  editUserError,
  editUserSuccess,
  loadUsersError,
  loadUsersSuccess,
} from './actions';

import { createUserApi, deleteUserApi, editUserApi, loadUserApi } from '../apis/apiConfig';

function* onLoadUsersStartAsync({ payload: { page, perPage } }) {
  try {
    const response = yield call(loadUserApi, page, perPage);
    if (response.status === 200) {
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.message));
  }
}

function* onDeleteUserStartAsync(data) {
  try {
    const response = yield call(deleteUserApi, data.payload);
    if (response.status === 204) {
      yield put(deleteUserSuccess(data.payload));
    }
  } catch (error) {
    yield put(deleteUserError(error.message));
  }
}

function* onCreateUserStartAsync(data) {
  try {
    const response = yield call(createUserApi, data.payload);
    if (response.status === 201) {
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error.message));
  }
}

function* onEditUserStartAsync(data) {
  console.log('🚀 ~ data:', data);
  try {
    const response = yield call(editUserApi, data.payload.idUrl.id, data.payload.user);
    if (response.status === 200) {
      yield put(editUserSuccess());
    }
  } catch (error) {
    yield put(editUserError(error.message));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeEvery(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onEditUser() {
  yield takeEvery(types.EDIT_USER_START, onEditUserStartAsync);
}

function* onDeleteUser() {
  yield takeEvery(types.DELETE_USER_START, onDeleteUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUser), fork(onEditUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
