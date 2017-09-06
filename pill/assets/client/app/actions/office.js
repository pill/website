'use strict'

import * as types from './action-types'
// import { createAction } from '../lib/util'

export function createPost(post_data) {
  return {
    type: types.POST_CREATE_REQUESTED,
    payload: { post_data }
  }
}

export function createPostSuccess(post_data) {
  return {
    type: types.POST_CREATE_SUCCESS,
    payload: { post_data }
  }
}

export function createPostError(error) {
  return {
    type: types.POST_CREATE_ERROR,
    payload: { error }
  }
}



