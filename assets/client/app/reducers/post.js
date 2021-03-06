import * as types from '../actions/action-types'
import { initialState } from '../redux-store'

export default function posts(state=initialState.post, action) {
  console.log('post reducer ', action)
  const {
    post_form_data,
    gql_response,
    posts } = action.payload || {}

  const success = ''
  const error = ''
  console.log("that gql_response ", gql_response)

  switch (action.type) {

    case types.POST_CREATE_SUCCESS:
      const created_post = gql_response.json.create_post.post
      return {
        ...state,
        single_post: null,
        success: `Post created with id ${created_post._id}`,
        error: ''
      }
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        single_post: gql_response.json.post
      }
    case types.POST_UPDATE_SUCCESS:
      return {
        ...state,
        single_post: gql_response.json.update_post.post,
        success: `Post updated!`,
        error:''
      }
    case types.POST_DELETE_SUCCESS:
      const { post_id } = gql_response.json.delete_post
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== post_id),
        success: `Post ${post_id} deleted`,
        error: ''
      }
    case types.POST_CREATE_ERROR:
    case types.POST_UPDATE_ERROR:
    case types.POST_DELETE_ERROR:
    case types.POSTS_GET_ERROR:
    case types.POST_GET_ERROR:
      return {
        ...state,
        success: '',
        error: error
      }
    case types.POSTS_GET_SUCCESS:
      return {
        ...state,
        posts: gql_response.json.posts
      }
    default:
      return state
  }
}