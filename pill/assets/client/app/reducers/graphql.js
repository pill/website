import * as types from '../actions/action-types'
import { initialState } from '../redux-store'

export default function posts(state=initialState.graphql, action) {

  const { response } = action.payload || {}

  switch (action.type) {

    case types.GRAPHQL_QUERY:
      return state
    case types.GRAPHQL_SUCCESS:
    case types.GRAPHQL_ERROR:
      return {
        ...state,
        response: response
      }
    default:
      return state
  }
}