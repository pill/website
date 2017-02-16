'use strict'

import * as types from './action-types'
// import { createAction } from '../lib/util'

export function createPost(post_data) {
  return {
    type: types.REQUEST_CREATE_POST,
    payload: { post_data }
  }
}

