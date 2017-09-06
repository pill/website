'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'
import * as types from '../actions/action-types'
import { appInit, appInitComplete } from '../actions/app'
import { authCheckSuccess } from '../actions/login'


//==========
// Watchers
//==========

const appWatchers = [ appInitWatcher ]
export { appWatchers }

export function* appInitWatcher() {
  yield* takeEvery(types.APP_INIT_STARTED, appInitWorker)
}

//==========
// Workers
//==========

export function* appInitWorker(action) {

  // check if user is authenticated
  // if yes update user state (user_token)
  const response = yield call(Api.authCheck)
  if (response.status === 200) {
    if (response.json.user) {
      // sets auth token
      const { username, user_token } = response.json.user
      yield put(authCheckSuccess(username, user_token))
    }
  }
  yield put(appInitComplete())

}

