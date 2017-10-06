'use strict'

import * as types from './action-types'
import { createAction } from '../lib/util'

export function graphqlQuery(query, success_action_type, error_action_type) {
  return createAction(
    types.GRAPHQL_QUERY, { query, success_action_type, error_action_type })
}
export function graphqlMutation(query, success_action_type, error_action_type) {
  return createAction(
    types.GRAPHQL_MUTATION, { query, success_action_type, error_action_type })
}
