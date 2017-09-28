'use strict'

import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import * as Api from '../lib/api'
import * as types from '../actions/action-types'
import {
  graphqlQuery,
  graphqlSuccess,
  graphqlError } from '../actions/graphql'

// === Watchers ===
const graphqlWatchers = [
  graphqlWatcher
]
export { graphqlWatchers }

export function* graphqlWatcher() {
  yield* takeEvery(types.GRAPHQL_QUERY, graphqlWorker)
}

// === Workers ===

export function* graphqlWorker(action) {
  const { query } = action.payload
  const response = yield call(Api.graphql, query)
  if (response.status == 200) {
    yield put(graphqlSuccess(response))
  }
  else {
    yield put(graphqlError(response))
  }
}
