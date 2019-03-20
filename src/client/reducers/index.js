import { combineReducers } from 'redux'

import app from './app'
import users from './users'
import posts from './posts'
import cart from './cart'
import checkout from './checkout'

export default combineReducers({
  app: app,
  users: users,
  posts: posts,
  cart: cart,
  checkout: checkout
})
