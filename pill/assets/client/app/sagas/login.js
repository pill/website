'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'

import * as types from '../actions/action-types'

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
}
