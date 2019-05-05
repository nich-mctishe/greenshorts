import { assign } from 'lodash'

import {
  SET_FIRSTNAME,
  SET_LASTNAME,
  SET_EMAIL,
  SET_PHONE,
  SET_CONTACT_TIME,
  SET_BILLING_LINE_1,
  SET_BILLING_LINE_2,
  SET_BILLING_LINE_3,
  SET_BILLING_CITY,
  SET_BILLING_COUNTY,
  SET_BILLING_POSTCODE,
  SET_SAME_ADDRESS,
  SET_SHIPPING_NAME,
  SET_SHIPPING_LINE_1,
  SET_SHIPPING_LINE_2,
  SET_SHIPPING_LINE_3,
  SET_SHIPPING_CITY,
  SET_SHIPPING_COUNTY,
  SET_SHIPPING_POSTCODE,
  SET_READ_TANDC,
  IS_PAID,
  IS_SAVED_TO_DB,
  IS_EMAIL_SENT
} from '../actions/checkout'

// need to consider uploading this information to the db also for proseperity and to ensure session integrity

// need to also make sure cookie is checked to ensure we know when the session should expire

const INITIAL_STATE = {
  number: '',
  firstname: 'Nich',
  lastname: 'McTishe',
  email: '',
  phone: '',
  billingAddressLine1: '',
  billingAddressLine2: '',
  billingAddressLine3: '',
  billingCity: '',
  billingCounty: '',
  billingPostcode: '',
  shippingName: '',
  shippingAddressLine1: '',
  shippingAddressLine2: '',
  shippingAddressLine3: '',
  shippingCity: '',
  shippingCounty: '',
  shippingPostcode: '',
  contactTime: '',
  shippingIsBilling: true,
  paid: false,
  savedToDb: false,
  emailSent: false,
  tandc: false
}

// put this in lib helper?
const updateState = (state, newState) => {
  return assign({}, state, newState)
}

const handleDualUpdate = (state, label, value) => {
  let update = {}
  update[label] = value || ''

  if (state.shippingIsBilling) {
    update[label.replace('billing', 'shipping')] = value || ''
  }

  return updateState(state, update)
}

export default function checkoutReducer (state, action) {
  if (typeof state === 'undefined') {
    return INITIAL_STATE
  }

  switch (action.type) {
    case SET_FIRSTNAME:
      return updateState(state, {
        firstname: action.item
      })
    case SET_LASTNAME:
      return updateState(state, {
        lastname: action.item
      })
    case SET_EMAIL:
      return updateState(state, {
        email: action.item
      })
    case SET_PHONE:
      return updateState(state, {
        phone: action.item
      })
    case SET_CONTACT_TIME:
      return updateState(state, {
        contactTime: action.item
      })
    case SET_BILLING_LINE_1:
      return handleDualUpdate(state, 'billingAddressLine1', action.item)
    case SET_BILLING_LINE_2:
      return handleDualUpdate(state, 'billingAddressLine2', action.item)
    case SET_BILLING_LINE_3:
      return handleDualUpdate(state, 'billingAddressLine3', action.item)
    case SET_BILLING_CITY:
      return handleDualUpdate(state, 'billingCity', action.item)
    case SET_BILLING_COUNTY:
      return handleDualUpdate(state, 'billingCounty', action.item)
    case SET_BILLING_POSTCODE:
      return handleDualUpdate(state, 'billingPostcode', action.item)
    case SET_SHIPPING_NAME:
      return updateState(state, {
        shippingName: action.item
      })
    case SET_SHIPPING_LINE_1:
      return updateState(state, {
        shippingAddressLine1: action.item
      })
    case SET_SHIPPING_LINE_2:
      return updateState(state, {
        shippingAddressLine2: action.item
      })
    case SET_SHIPPING_LINE_3:
      return updateState(state, {
        shippingAddressLine3: action.item
      })
    case SET_SHIPPING_CITY:
      return updateState(state, {
        shippingCity: action.item
      })
    case SET_SHIPPING_COUNTY:
      return updateState(state, {
        shippingCounty: action.item
      })
    case SET_SHIPPING_POSTCODE:
      return updateState(state, {
        shippingPostcode: action.item
      })
    case SET_SAME_ADDRESS:
      return updateState(state, {
        shippingIsBilling: action.item
      })
    case IS_PAID:
      return updateState(state, {
        paid: action.item
      })
    case IS_SAVED_TO_DB:
      return updateState(state, {
        savedToDb: action.item
      })
    case IS_EMAIL_SENT:
      return updateState(state, {
        emailSent: action.item
      })
    case SET_READ_TANDC:
      return updateState(state, {
        tandc: action.item
      })
  }

  return state
}
