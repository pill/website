'use strict'

import { select, put, call, takeEvery } from 'redux-saga/effects'
import * as Api from '../lib/api'
import { createAction } from '../lib/util'
import * as types from '../actions/action-types'
import {
  graphqlQuery,
  graphqlMutation,
  graphqlSuccess,
  graphqlError } from '../actions/graphql'

// === Watchers ===

const graphqlWatchers = [
  graphqlQueryWatcher, graphqlMutationWatcher
]
export { graphqlWatchers }

export function* graphqlQueryWatcher() {
  yield takeEvery(types.GRAPHQL_QUERY, graphqlQueryWorker)
}

export function* graphqlMutationWatcher() {
  yield takeEvery(types.GRAPHQL_MUTATION, graphqlMutationWorker)
}

// === Workers ===

export function* graphqlQueryWorker(action) {
  const { query, success_action_type, error_action_type } = action.payload
  const gql_response = yield call(Api.graphqlQuery, query)
  if (gql_response.status == 200) {
    yield put(createAction(success_action_type, { gql_response }))
  }
  else {
    yield put(createAction(error_action_type, { gql_response }))
  }
}

export function* graphqlMutationWorker(action) {
  const { query, success_action_type, error_action_type } = action.payload
  const gql_response = yield call(Api.graphqlMutation, query)
  if (gql_response.status == 200) {
    yield put(createAction(success_action_type, { gql_response }))
  }
  else {
    yield put(createAction(error_action_type, { gql_response }))
  }
}
