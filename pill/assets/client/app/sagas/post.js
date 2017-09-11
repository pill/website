'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'
import * as types from '../actions/action-types'
import { createPostSuccess, createPostError, getPostsSuccess } from '../actions/office'

// === Watchers ===
const postWatchers = [
  postsRequestedWatcher,
  createPostWatcher
]
export { postWatchers }

export function* postsRequestedWatcher() {
  yield* takeEvery(types.POSTS_GET_REQUESTED, postsRequestedWorker)
}

export function* createPostWatcher() {
  yield* takeEvery(types.POST_CREATE_REQUESTED, createPostWorker)
}

// === Workers ===

export function* postsRequestedWorker(action) {
  const response = yield call(Api.getPosts)
  const { posts } = response.json
  if (response.status == 200) {
    yield put(getPostsSuccess(posts))
  }

}

export function* createPostWorker(action) {
  const { post_form_data } = action.payload
  const response = yield call(Api.createPost, post_form_data)
  const { success, error } = response.json
  if (response.status == 200) {
    yield put(createPostSuccess(success))
  }
  else if (response.status == 400) {
    yield put(createPostError(error))
  }

}