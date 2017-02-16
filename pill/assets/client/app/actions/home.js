'use strict'

import * as types from './action-types'
// import { createAction } from '../lib/util'

export function requestPosts() {
  return {
    type: types.POSTS_REQUESTED,
    payload: {}
  }
}

