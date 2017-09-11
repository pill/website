import * as types from '../actions/action-types'
import { initialState } from '../redux-store'

export default function posts(state=initialState.post, action) {

  const { post_form_data, success, error, delete_post_id, posts } = action.payload || {}

  switch (action.type) {

    case types.POST_CREATE_REQUESTED:
      return {
        ...state,
        post_form_data: post_form_data,
        success: '',
        error: ''
      }
    case types.POST_CREATE_SUCCESS:
      return {
        ...state,
        success: success,
        error: ''
      }
    case types.POST_CREATE_ERROR:
      return {
        ...state,
        success: '',
        error: error
      }
    case types.POST_DELETE_REQUESTED:
      return {
        ...state,
        delete_post_id: delete_post_id
      }
    case types.POST_DELETE_SUCCESS:
      return {
        ...state,
        post_form_data: post_form_data,
        success: success,
        error: ''
      }
    case types.POSTS_GET_SUCCESS:
      return {
        ...state,
        posts: posts
      }

    case types.POST_DELETE_ERROR:
    case types.POST_GET_REQUESTED:
    case types.POST_GET_ERROR:
    case types.POSTS_GET_REQUESTED:
    case types.POSTS_GET_ERROR:

    default:
      return state
  }
}