'use strict'

import * as types from './action-types'

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

export function deletePost(post_id) {

}
export function deletePostSuccess(post_id) {

}
export function deletePostError(post_id) {

}

export function getPosts(page=1, rpp=10) {
  return {
    type: types.POSTS_GET_REQUESTED,
    payload: { page, rpp }
  }
}
export function getPostsSuccess(posts) {
  return {
    type: types.POSTS_GET_SUCCESS,
    payload: { posts }
  }
}
export function getPostsError(posts) {
  return {
    type: types.POSTS_GET_ERROR,
    payload: { posts }
  }
}