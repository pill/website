import * as types from '../actions/action-types'

export default function user(state = [], action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.log('login success')
      const { username, token } = action.payload
      return {
        ... state,
        username: username,
        token: token
      }
    default:
      return state
  }
}