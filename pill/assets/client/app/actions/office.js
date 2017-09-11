'use strict'

import * as types from './action-types'
import { createAction } from '../lib/util'

export function createPost(post_form_data) {
  return createAction(types.POST_CREATE_REQUESTED, { post_form_data })
}
export function createPostSuccess(success) {
  return createAction(types.POST_CREATE_SUCCESS, { success })
}
export function createPostError(error) {
  return createAction(types.POST_CREATE_ERROR, { error })
}

export function deletePost(delete_post_id) {
  return createAction(types.POST_DELETE_REQUESTED, { delete_post_id })
}
export function deletePostSuccess(delete_post_id) {
  return createAction(types.POST_DELETE_SUCCESS, { post_id })
}
export function deletePostError(error) {
  return createAction(types.POST_DELETE_ERROR, { error })
}

export function getPosts(page=1, rpp=10) {
  return createAction(types.POSTS_GET_REQUESTED, { page, rpp })
}
export function getPostsSuccess(posts) {
  return createAction(types.POSTS_GET_SUCCESS, { posts })
}
export function getPostsError(error) {
  return createAction(types.POSTS_GET_ERROR, { error })
}

export function getPost(post_id) {
  return createAction(types.POST_GET_REQUESTED, { post_id })
}
export function getPostSuccess(posts) {
  return createAction(types.POST_GET_SUCCESS, { posts })
}
export function getPostError(error) {
  return createAction(types.POST_GET_ERROR, { error })
}