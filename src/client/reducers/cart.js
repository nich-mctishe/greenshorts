import { each, filter, findIndex, assign, merge } from 'lodash'
import { ADD_TO_CART } from '../actions/cart'
import { REMOVE_FROM_CART } from '../actions/cart'
import { UPDATE_QUANTITY } from '../actions/cart'
import { EMPTY_CART } from '../actions/cart'

const INITIAL_STATE = {
    cookie: false, // false || cookie string
    items: [],
    value: 0
  }

// may need to think about removing faulty values
const itemTemplate = (data) => {
  return {
    product: {
      _id: data._id || null,
      sku: data.sku || null,
      name: data.name || null
    },
    size: data.size || null,
    quantity: data.quantity || 1,
    price: data.price || 0,
    'total-cost': data.price * (data.quantity || 1) || 0
  }
}

const getCartValue = (items) => {
  let value = 0

  each(items, item => {
    value = value + (Number(item.price) * Number(item.quantity))
  })

  return value
}

const emptyCart = (state) => {
  return {
    ...state,
    items: [],
    value: 0
  }
}

const updateState = (state, newState) => {
  return assign({}, state, newState)
}

// could run a cookie check here. <-- this request / result could also be cached if lots of use.
// will check speed and see what is affected.

// if cookie is ended could replace action.type with the empty session variable
// may need to display a session ended message <-- how to do thiss

export default function cartReducer (state, action) {
  if (typeof state === 'undefined') {
    return INITIAL_STATE
  }

  switch (action.type) {
    case ADD_TO_CART:
      let items = state.items
      items.push(action.item)

      return updateState(state, {
        items: items,
        value: getCartValue(items)
      })
    case REMOVE_FROM_CART:
      // search for product by sku and remove
      const cartItems = filter(state.items, (item) => {
        return item !== action.item
      })

      return updateState(state, {
        items: cartItems,
        value: getCartValue(cartItems)
      })
    case UPDATE_QUANTITY:
      // pass back htorugh entire cart or get and find product then amend
      const index = findIndex(state.items, { product: { _id: action.item.product._id } })
      let itemsToUpdate = state.items
      itemsToUpdate[index].quantity = action.item.quantity

      return updateState(state, {
        items: itemsToUpdate,
        value: getCartValue(itemsToUpdate)
      })
    case EMPTY_CART:
      // if just emptying cart contents
      return updateState(state, emptyCart(state))

      // remember to update server session

      // if cookie expired
      return INITIAL_STATE
  }

  return state
}
