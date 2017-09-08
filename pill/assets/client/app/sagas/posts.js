'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'

import * as types from '../actions/action-types'

// === Watchers ===
const postWatchers = [
  postsRequestedWatcher,
  createPostWatcher
]
export { postWatchers }

export function* postsRequestedWatcher() {
  // yield* takeEvery(types.APP_RESET, genErrorHandler(appResetWorker))
}

export function* createPostWatcher() {
  yield* takeEvery(types.POST_CREATE_REQUESTED, createPostWorker)
}

// === Workers ===

export function* postsRequestedWorker(action) {
  //
}

export function* createPostWorker(action) {
  console.log("requested create post", action.payload)
  const { post_data } = action.payload
  const response = yield call(Api.createPost, post_data)
}