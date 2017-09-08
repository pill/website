'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'
import * as types from '../actions/action-types'
import { loginSuccess, loginError } from '../actions/login'

//==========
// Watchers
//==========

const loginWatchers = [
  loginRequestedWatcher
]
export { loginWatchers }

export function* loginRequestedWatcher() {
  yield* takeEvery(types.LOGIN_REQUESTED, loginRequestedWorker)
}

//==========
// Workers
//==========

export function* loginRequestedWorker(action) {
  const { username, password } = action.payload
  const response = yield call(Api.login, username, password)

  if (response.status === 200) {
    // set token
    const { username, user_token } = response.json
    yield put(loginSuccess(username, user_token))
  }

  if (response.status === 400) {
    const { error } = response.json
    yield put(loginError(error))
  }
}
