import * as types from './actionType';

import { take, takeEvery, takeLatest, put, all, delay, call, fork } from 'redux-saga/effects';

import { loadUsersSuccess, loadUsersError } from './actions';

import { loadUserApi } from '../apis/apiConfig';

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUserApi);
    if (response.status === 200) {
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

export function* onLoadUser() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

const userSagas = [fork(onLoadUser)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
