'use strict'

import * as types from './action-types'

export function appInitComplete() {
  return {
    type: types.APP_INIT_COMPLETE,
    payload: {}
  }
}