import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from '../reducers'

const middleware = applyMiddleware(promise(), thunk)

const makeStore = initialState => {
  return createStore(reducers, initialState, middleware)
}

export default makeStore
