// app could get cookie value

import { SET_NETWORK_STATE } from '../actions/app'

const INITIAL_STATE = {
  online: true
}

const updateState = (state, newState) => {
  return assign({}, state, newState)
}

export default function appReducer (state, action) {
  if (typeof state === 'undefined') {
    return INITIAL_STATE
  }

  switch (action.type) {
    case SET_NETWORK_STATE:
      return updateState(state, {
        online: action.online
      })
  }
  return state
}
