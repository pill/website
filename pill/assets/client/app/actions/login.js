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

export function authCheckSuccess(username, user_token) {
    // ex. used if you refesh a page, so there's no explicit login action
    // to set the user state so we call this
    return createAction(types.AUTH_CHECK_SUCCESS, { username, user_token })
}