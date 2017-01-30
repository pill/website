'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'

import * as types from '../actions/action-types'

// === Watchers ===
const postWatchers = [
  postsRequestedWatcher
]
export { postWatchers }

export function* postsRequestedWatcher() {
  // yield* takeEvery(types.APP_RESET, genErrorHandler(appResetWorker))
}

// === Workers ===

export function* postsRequestedWorker(action) {
  //
}
