import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt'
import reducers from '../reducers'

const middleware = applyMiddleware(promise(), thunk)

const persistConfig = {
  key: 'root',
  storage,
}

const encryptor = createEncryptor({
  secretKey: 'sljkdfh894wutnsfjoisdfjne89ty98w4-change-me',
  onError: function(error) {
    // Handle the error.
    console.error(error);
  }
})

const reducer = persistReducer(
  {
    transforms: [encryptor],
    key: 'root',
    storage,
  },
  reducers
)

export const store = createStore(reducer)
export const persistor = persistStore(store)
