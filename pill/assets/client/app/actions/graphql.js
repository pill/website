'use strict'

import * as types from './action-types'
import { createAction } from '../lib/util'

export function graphqlQuery(query) {
  return createAction(types.GRAPHQL_QUERY, { query })
}
export function graphqlSuccess(response) {
  return createAction(types.GRAPHQL_SUCCESS, { response })
}
export function graphqlError(response) {
  return createAction(types.GRAPHQL_ERROR, { response })
}