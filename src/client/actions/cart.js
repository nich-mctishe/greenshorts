
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
export const EMPTY_CART = 'EMPTY_CART'

// possible shortcut
const cartAction = (data, action) => {
  return { type: action, data }
}

export function addToCart (item) {
  return { type: ADD_TO_CART, item }
}

export function removeFromCart (item) {
  return { type: REMOVE_FROM_CART, item }
}

export function updateQuantity (item) {
  return { type: UPDATE_QUANTITY, item }
}

export function emptyCart (item) {
  return { type: EMPTY_CART, item }
}
