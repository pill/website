'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'
import * as types from '../actions/action-types'
import {
  createPostSuccess,
  createPostError,
  getPostsSuccess,
  deletePostSuccess,
  deletePostError,
  updatePostSuccess,
  updatePostError } from '../actions/post'

// === Watchers ===
const postWatchers = [
  postsRequestedWatcher,
  createPostWatcher,
  updatePostWatcher,
  deletePostWatcher
]
export { postWatchers }

export function* postsRequestedWatcher() {
  yield* takeEvery(types.POSTS_GET_REQUESTED, postsRequestedWorker)
}

export function* createPostWatcher() {
  yield* takeEvery(types.POST_CREATE_REQUESTED, createPostWorker)
}

export function* updatePostWatcher() {
  yield* takeEvery(types.POST_UPDATE_REQUESTED, updatePostWorker)
}

export function* deletePostWatcher() {
  yield* takeEvery(types.POST_DELETE_REQUESTED, deletePostWorker)
}
// === Workers ===

export function* postsRequestedWorker(action) {
  const { page, rpp } = action.payload
  const response = yield call(Api.getPosts, page, rpp)
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

export function* updatePostWorker(action) {
  const { post_id, post_form_data } = action.payload
  const response = yield call(Api.updatePost, post_id, post_form_data)
  const { success, error } = response.json
  if (response.status == 200) {
    yield put(updatePostSuccess(success))
  }
  else if (response.status == 400) {
    yield put(updatePostError(error))
  }
}

export function* deletePostWorker(action) {
  const { post_id } = action.payload
  const response = yield call(Api.deletePost, post_id)
  const { success, error } = response.json
  if (response.status == 200) {
    yield put(deletePostSuccess(success, post_id))
  }
  else if (response.status == 400) {
    yield put(deletePostError(error))
  }
}