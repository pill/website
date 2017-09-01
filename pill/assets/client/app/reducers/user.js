import * as types from '../actions/action-types'
import { initialState } from '../redux-store'

export default function user(state=initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.log('login success')
      const { username, user_token } = action.payload
      return {
        ... state,
        username: username,
        user_token: user_token
      }
    default:
      return state
  }
}