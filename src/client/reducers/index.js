import { combineReducers } from 'redux'

import app from './app'
import users from './users'
import posts from './posts'

export default combineReducers({
  app: app,
  users: users,
  posts: posts
})
