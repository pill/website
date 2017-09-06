import * as types from '../actions/action-types'
import { initialState } from '../redux-store'

export default function posts(state = initialState.app, action) {
  switch (action.type) {
    case types.APP_INIT_STARTED:
      return {
        ...state,
        loading: true
      }
    case types.APP_INIT_COMPLETE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}