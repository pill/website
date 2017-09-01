'use strict'

import * as types from './action-types'
import { createAction } from '../lib/util'

// === Action Creators ===
export function requestLogin(username, password) {
  return createAction(types.LOGIN_REQUESTED, { username, password })
}

export function loginSuccess(username, user_token) {
  return createAction(types.LOGIN_SUCCESS, { username, user_token })
}

export function loginError(error) {
  return createAction(types.LOGIN_ERROR, { error })
}