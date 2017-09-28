import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from './middleware/logger'
import rootSaga from './sagas'

import * as reducers from './reducers'

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware,
    loggerMiddleware
  ]
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  const rootReducer = combineReducers(reducers)
  const store = createStoreWithMiddleware(rootReducer)
  // start redux saga
  sagaMiddleware.run(rootSaga)

  return store
}

export const initialState = {
  app: {
    loading: false
  },
  post: {
    error: '',
    success: '',
    post_form_data: {
      title: '',
      body: '',
      author: '',
      publish_status: ''
    },
    posts: []
  },
  user: {
    username: '',
    user_token: ''
  },
  graphql: {
    response: null
  }
}