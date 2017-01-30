import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import * as reducers from './reducers'

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware
  ]
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  const rootReducer = combineReducers(reducers)
  const store = createStoreWithMiddleware(rootReducer)
  return store
}

export function initialState() {
  posts: {}
}